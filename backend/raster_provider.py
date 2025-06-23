from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from datashader.utils import lnglat_to_meters
import mercantile
import io
import uvicorn
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

app = FastAPI()


def normalize_raster(rstr: np.ndarray, number_of_sources: int):
    cmap = plt.get_cmap("inferno")

    print(np.min(rstr), np.max(rstr))
    # normalized = (rstr - np.min(rstr)) / (np.max(rstr) - np.min(rstr))

    # min_dist, max_dist = 1, 1200000
    # normalized = (rstr - min_dist) / (max_dist - min_dist)

    # values: np.ndarray = np.copy(rstr)
    # values[values < 1] = 1
    # normalized = 1 / values

    # normalized = np.exp(-rstr / 50000)

    normalized = rstr / number_of_sources

    rgba = cmap(normalized)
    rgb = (rgba[:, :, :3] * 255).astype("uint8")
    return rgb


def render_tile(x, y, z):
    tile = mercantile.tile(x, y, z)
    bbox = mercantile.bounds(tile)
    print(bbox)
    x0, y0 = lnglat_to_meters(bbox.west, bbox.south)
    x1, y1 = lnglat_to_meters(bbox.east, bbox.north)

    xs = np.linspace(x0, x1, 256)
    ys = np.linspace(y0, y1, 256)
    grid_x, grid_y = np.meshgrid(xs, ys)

    values = np.zeros_like(grid_x)

    source_points = [(35, 28.5), (36, 28), (39, 31)]
    for ref_lon, ref_lat in source_points:
        ref_x, ref_y = lnglat_to_meters(ref_lon, ref_lat)
        dists = np.sqrt((grid_x - ref_x)**2 + (grid_y - ref_y)**2)
        values += np.exp(-dists / 50000)

    rgb_img = normalize_raster(values, len(source_points))

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
