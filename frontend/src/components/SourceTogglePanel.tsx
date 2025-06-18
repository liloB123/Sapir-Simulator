import { useState } from "react";
import type { SourceWithLayers } from "../types";

type Props = {
  sources: SourceWithLayers[];
  onChange: (visibleSources: SourceWithLayers[]) => void;
};

export default function SourceTogglePanel({ sources, onChange }: Props) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(
    new Set(sources.map((s) => s.id)) // all on by default
  );

  const toggleSource = (id: string) => {
    const updated = new Set(visibleIds);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setVisibleIds(updated);
    onChange(sources.filter((s) => updated.has(s.id)));
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: "white",
        color: "black", // Set text color to black
        padding: "1em",
        borderRadius: "0.5em",
        zIndex: 1000,
      }}
    >
      <strong>Toggle Sources</strong>
      {sources.map((source) => (
        <div key={source.id}>
          <label>
            <input
              type="checkbox"
              checked={visibleIds.has(source.id)}
              onChange={() => toggleSource(source.id)}
            />
            {source.id}
          </label>
        </div>
      ))}
    </div>
  );
}
