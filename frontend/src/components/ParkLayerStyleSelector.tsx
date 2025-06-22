import { useState } from "react";
import { parkLayerStyles } from "../data/layers";

type Props = {
  onStyleChange: (newPaint: Record<string, any>) => void;
};

export default function ParkLayerStylePanel({ onStyleChange }: Props) {
  const [selected, setSelected] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setSelected(index);
    onStyleChange(parkLayerStyles[index].paint);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 10,
        background: "white",
        color: "black",
        padding: "1em",
        borderRadius: "0.5em",
        zIndex: 1000,
      }}
    >
      <strong>Park Layer Style</strong>
      <div>
        <select value={selected} onChange={handleChange}>
          {parkLayerStyles.map((style, i) => (
            <option key={i} value={i}>
              {style.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
