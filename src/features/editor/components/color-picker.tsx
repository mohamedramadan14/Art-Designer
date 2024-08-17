import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "@/features/editor/constants";
import { rgbaToString } from "@/features/editor/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        className="border rounded-lg"
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaToString(color.rgb);
          onChange(formattedValue);
        }}
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};
