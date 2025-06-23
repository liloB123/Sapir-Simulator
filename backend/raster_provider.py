from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from datashader.utils import lnglat_to_meters
import mercantile
import io
import uvicorn
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from shapely import LineString, Point, distance
import random


app = FastAPI()


def colorize_raster(raster: np.ndarray):
    cmap = plt.get_cmap("inferno")
    rgba = cmap(raster)
    rgb = (rgba[:, :, :3] * 255).astype("uint8")
    return rgb


def dists_from_points_layer(grid_x, grid_y):
    values = np.zeros_like(grid_x)

    lons = [random.uniform(33.75, 39.375) for _ in range(10)]
    lats = [random.uniform(27.1, 31.9) for _ in range(10)]
    print(lons)
    print(lats)
    # source_points = [(35, 30), (36, 28.7), (38.6, 30.2)]
    list_of_dists = []
    for ref_lon, ref_lat in zip(lons, lats):
        ref_x, ref_y = lnglat_to_meters(ref_lon, ref_lat)
        dists = np.sqrt((grid_x - ref_x)**2 + (grid_y - ref_y)**2)
        normalized_dists = np.exp(-dists / 50000)
        list_of_dists.append(normalized_dists)

    # values = np.mean(list_of_dists, axis=0)
    values = np.max(list_of_dists, axis=0)
    return values


def dists_from_line_layer(grid_x, grid_y):
    source_line = [(35, 28.5), (36, 28), (39, 31)]
    mercator_line = [lnglat_to_meters(lon, lat) for lon, lat in source_line]
    line = LineString(mercator_line)

    flat_x = grid_x.ravel()
    flat_y = grid_y.ravel()
    points = np.array([Point(x, y) for x, y in zip(flat_x, flat_y)])

    distances = distance(points, line)
    values_flat = np.exp(-distances / 50000)
    values = values_flat.reshape(grid_x.shape)

    return values


def join_layers(layers: list):
    joined_layer = np.max(layers, axis=0)
    return joined_layer


def render_tile(x, y, z):
    tile = mercantile.tile(x, y, z)
    bbox = mercantile.bounds(tile)
    print(bbox)
    west_utm, south_utm = lnglat_to_meters(bbox.west, bbox.south)
    east_utm, north_utm = lnglat_to_meters(bbox.east, bbox.north)

    xs = np.linspace(west_utm, east_utm, 256)
    ys = np.linspace(south_utm, north_utm, 256)
    grid_x, grid_y = np.meshgrid(xs, ys)

    layer1 = dists_from_points_layer(grid_x, grid_y)
    layer2 = dists_from_line_layer(grid_x, grid_y)

    joined_layer = join_layers([layer1, layer2])

    rgb_img = colorize_raster(joined_layer)

    return Image.fromarray(rgb_img, mode='RGB')


@app.get("/tiles/{z}/{x}/{y}.png")
def get_tile(z: int, x: int, y: int):
    image = render_tile(x, y, z)
    img_io = io.BytesIO()
    image.save(img_io, format="PNG")
    img_io.seek(0)
    return StreamingResponse(img_io, media_type="image/png")


if __name__ == "__main__":
    uvicorn.run("raster_provider:app", host="0.0.0.0", port=8000, reload=True)
