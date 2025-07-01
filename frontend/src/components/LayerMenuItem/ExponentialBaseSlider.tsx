import { type ChangeEvent, type FC } from "react";
import { useLayers } from "../../hooks/useLayers";
import type { LayerName } from "../../contexts/LayersMenuContext";
import Slider from "../Slider";

const rangeMin = 1;
const rangeMax = 10;
const stepSize = 0.5;

type ExponentialBaseSliderProps = {
  name: LayerName;
};

const ExponentialBaseSlider: FC<ExponentialBaseSliderProps> = ({ name }) => {
  const [layers, setLayers] = useLayers();


  const handleBaseChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLayers(prev => {
      const value = parseFloat(e.target.value);

      return prev[name].selectedOption === "אקספוננציאלי"
        ? {
          ...prev,
          [name]: { ...prev[name], base: value }
        }
        : prev;
    });

  if (layers[name].selectedOption !== "אקספוננציאלי") return null;
  else {
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
