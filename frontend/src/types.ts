export type LayerProp = {
  id: string;
  type: "circle" | "line" | "fill" | "symbol" | "custom";
  paint?: Record<string, any>;
  layout?: Record<string, any>;
};

export type SourceWithLayers = {
  id: string;
  type: "geojson";
  data: string;
  layers: LayerProp[];
};