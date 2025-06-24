import os
import time

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from datashader.utils import lnglat_to_meters
import mercantile
import io
import uvicorn
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image  # check time improvement with other png image maker packages
from shapely import LineString, Point, distance


app = FastAPI()


def colorize_raster(raster: np.ndarray):
    cmap = plt.get_cmap("inferno")
    rgba = cmap(raster)
    rgb = (rgba[:, :, :3] * 255).astype("uint8")
    return rgb


def dists_from_points_layer(grid_x, grid_y, dist_from_points_is_linear: bool,
                            dist_from_points_linear_decay_factor: int = None,
                            dist_from_points_exp_decay_factor: int = None,
                            use_cache: bool = True, cache_dir: str = ""):
    cache_file_path = os.path.join(cache_dir, "points_dists.npy")
    if not use_cache or not os.path.isfile(cache_file_path):
        number_of_source_points = 10
        lons = np.random.uniform(33.75, 39.375, number_of_source_points)
        lats = np.random.uniform(27.1, 31.9, number_of_source_points)

        refs = [lnglat_to_meters(lon, lat) for lon, lat in zip(lons, lats)]
        ref_xs, ref_ys = np.transpose(np.array(refs))

        grid_x_exp = np.expand_dims(grid_x, 0)  # (1, 256, 256)
        grid_y_exp = np.expand_dims(grid_y, 0)  # (1, 256, 256)

        ref_xs = ref_xs[:, np.newaxis, np.newaxis]  # (number_of_source_points, 1, 1)
        ref_ys = ref_ys[:, np.newaxis, np.newaxis]  # (number_of_source_points, 1, 1)

        dists = np.sqrt((grid_x_exp - ref_xs) ** 2 + (grid_y_exp - ref_ys) ** 2)

        os.makedirs(cache_dir, exist_ok=True)
        np.save(cache_file_path, dists)
    else:
        print("Got points-dists from cache")
        dists = np.load(cache_file_path)

    if dist_from_points_is_linear:
        values = dists / dist_from_points_linear_decay_factor
        values[values > 1] = 1
        values = 1 - values
    else:
        values = np.exp(-dists / dist_from_points_exp_decay_factor)

    # result = np.mean(values, axis=0)
    result = np.max(values, axis=0)

    return result


# TODO: make it one-sided linestring
def dists_from_line_layer(grid_x, grid_y, dist_from_line_is_linear: bool,
                          dist_from_line_linear_decay_factor: int = None, dist_from_line_exp_decay_factor: int = None,
                          use_cache: bool = True, cache_dir: str = ""):
    cache_file_path = os.path.join(cache_dir, "line_dists.npy")
    if not use_cache or not os.path.isfile(cache_file_path):
        source_line = [(35, 28.5), (36, 28), (39, 31)]
        mercator_line = [lnglat_to_meters(lon, lat) for lon, lat in source_line]
        line = LineString(mercator_line)

        flat_x = grid_x.ravel()
        flat_y = grid_y.ravel()
        points = np.array([Point(x, y) for x, y in zip(flat_x, flat_y)])

        dists = distance(points, line)

        os.makedirs(cache_dir, exist_ok=True)
        np.save(cache_file_path, dists)
    else:
        print("Got line-dists from cache")
        dists = np.load(cache_file_path)

    if dist_from_line_is_linear:
        values = dists / dist_from_line_linear_decay_factor
        values[values > 1] = 1
        values = 1 - values
    else:
        values = np.exp(-dists / dist_from_line_exp_decay_factor)

    values = values.reshape((256, 256))

    return values


def join_layers(layers: list):
    joined_layer = np.max(layers, axis=0)
    return joined_layer


def render_tile(z: int, x: int, y: int, dist_from_points: bool, dist_from_line: bool,
                dist_from_points_is_linear: bool = None, dist_from_points_linear_decay_factor: int = None,
                dist_from_points_exp_decay_factor: int = None, dist_from_line_is_linear: bool = None,
                dist_from_line_linear_decay_factor: int = None, dist_from_line_exp_decay_factor: int = None,
                use_cache: bool = True):
    cache_dir = os.path.join("cache", str(z), str(x), str(y))
    grid_x, grid_y = None, None
    if not use_cache or not os.path.isfile(os.path.join(cache_dir, "points_dists.npy")) or not os.path.isfile(os.path.join(cache_dir, "line_dists.npy")):
        tile = mercantile.tile(x, y, z)
        bbox = mercantile.bounds(tile)
        west_utm, south_utm = lnglat_to_meters(bbox.west, bbox.south)
        east_utm, north_utm = lnglat_to_meters(bbox.east, bbox.north)

        xs = np.linspace(west_utm, east_utm, 256)
        ys = np.linspace(south_utm, north_utm, 256)
        grid_x, grid_y = np.meshgrid(xs, ys)

    layers = []
    if dist_from_points:
        layers.append(dists_from_points_layer(grid_x, grid_y, dist_from_points_is_linear,
                                              dist_from_points_linear_decay_factor, dist_from_points_exp_decay_factor,
                                              use_cache, cache_dir))
    if dist_from_line:
        layers.append(dists_from_line_layer(grid_x, grid_y, dist_from_line_is_linear,
                                            dist_from_line_linear_decay_factor, dist_from_line_exp_decay_factor,
                                            use_cache, cache_dir))

    joined_layer = join_layers(layers)

    rgb_img = colorize_raster(joined_layer)

    return Image.fromarray(rgb_img, mode='RGB')


def validate_input(z: int, x: int, y: int, dist_from_points: bool, dist_from_line: bool,
                   dist_from_points_is_linear: bool = None, dist_from_points_linear_decay_factor: int = None,
                   dist_from_points_exp_decay_factor: int = None, dist_from_line_is_linear: bool = None,
                   dist_from_line_linear_decay_factor: int = None, dist_from_line_exp_decay_factor: int = None):
    # check that x, y, and z is in lebanon area, if not intersecting at all, return black image (?)

    if dist_from_points:
        if dist_from_points_is_linear is None:
            raise HTTPException(
                status_code=400,
                detail="`dist_from_points_is_linear` must be provided when `dist_from_points=True`"
            )
        if dist_from_points_is_linear and dist_from_points_linear_decay_factor is None:
            raise HTTPException(
                status_code=400,
                detail="`dist_from_points_linear_decay_factor` must be provided when `dist_from_points_is_linear=True`"
            )
        if not dist_from_points_is_linear and dist_from_points_exp_decay_factor is None:
            raise HTTPException(
                status_code=400,
                detail="`dist_from_points_exp_decay_factor` must be provided when `dist_from_points_is_linear=False`"
            )
    if dist_from_line:
        if dist_from_line_is_linear is None:
            raise HTTPException(
                status_code=400,
                detail="`dist_from_line_is_linear` must be provided when `dist_from_line=True`"
            )
        if dist_from_line_is_linear and dist_from_line_linear_decay_factor is None:
            raise HTTPException(
                status_code=400,
                detail="`dist_from_line_linear_decay_factor` must be provided when `dist_from_line_is_linear=True`"
            )
        if not dist_from_line_is_linear and dist_from_line_exp_decay_factor is None:
            raise HTTPException(
                status_code=400,
                detail="`dist_from_line_exp_decay_factor` must be provided when `dist_from_line_is_linear=False`"
            )


@app.get("/tiles/{z}/{x}/{y}/{dist_from_points}/{dist_from_line}.png")
def get_tile(z: int, x: int, y: int, dist_from_points: bool, dist_from_line: bool,
             dist_from_points_is_linear: bool = None, dist_from_points_linear_decay_factor: int = None,
             dist_from_points_exp_decay_factor: int = None, dist_from_line_is_linear: bool = None,
             dist_from_line_linear_decay_factor: int = None, dist_from_line_exp_decay_factor: int = None):
    start = time.perf_counter()

    validate_input(z, x, y, dist_from_points, dist_from_line, dist_from_points_is_linear,
                   dist_from_points_linear_decay_factor, dist_from_points_exp_decay_factor, dist_from_line_is_linear,
                   dist_from_line_linear_decay_factor, dist_from_line_exp_decay_factor)

    image = render_tile(z, x, y, dist_from_points, dist_from_line, dist_from_points_is_linear,
                        dist_from_points_linear_decay_factor, dist_from_points_exp_decay_factor,
                        dist_from_line_is_linear, dist_from_line_linear_decay_factor, dist_from_line_exp_decay_factor)
    img_io = io.BytesIO()
    image.save(img_io, format="PNG")
    img_io.seek(0)

    duration = time.perf_counter() - start
    print(f"[TILE] request took {duration:.3f} seconds")

    return StreamingResponse(img_io, media_type="image/png")


if __name__ == "__main__":
    uvicorn.run("raster_provider:app", host="0.0.0.0", port=8000, reload=True)
