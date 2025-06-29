import { useEffect, type FC } from "react";
import { useLayers } from "../../hooks/useLayers";
import type { LayerName } from "../../contexts/LayersMenuContext";
import Slider from "../Slider";

const defaultBase = 3;
const rangeMin = 1;
const rangeMax = 10;
const stepSize = 0.5;

type Props = {
  name: LayerName;
};

const ExponentialBaseSlider: FC<Props> = ({ name }) => {
  const [layers, setLayers] = useLayers();


  const handleBaseChange = (value: number) => {
    setLayers((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        base: value,
      },
    }));
  };

  useEffect(() => {
    if (layers[name].selectedOption === "אקספוננציאלי" && typeof layers[name].base !== "number") {
      handleBaseChange(defaultBase);
    }
  });

  if (layers[name].selectedOption !== "אקספוננציאלי") {
    return
  } else {

    return (
      <Slider
        value={layers[name].base}
        onChange={handleBaseChange}
        min={rangeMin}
        max={rangeMax}
        step={stepSize}
      />
    );
  }
};

export default ExponentialBaseSlider;
