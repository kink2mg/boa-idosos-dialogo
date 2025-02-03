import { ThemeColors } from "@/types/site-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ThemeColorsFormProps {
  themeColors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
}

const ThemeColorsForm = ({ themeColors, onChange }: ThemeColorsFormProps) => {
  const handleChange = (key: keyof ThemeColors, value: string) => {
    onChange({ ...themeColors, [key]: value });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="text-color">Cor do Texto</Label>
        <Input
          id="text-color"
          type="color"
          value={themeColors.text}
          onChange={(e) => handleChange("text", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="buttons-color">Cor dos Botões</Label>
        <Input
          id="buttons-color"
          type="color"
          value={themeColors.buttons}
          onChange={(e) => handleChange("buttons", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="primary-color">Cor Primária</Label>
        <Input
          id="primary-color"
          type="color"
          value={themeColors.primary}
          onChange={(e) => handleChange("primary", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="container-color">Cor do Container</Label>
        <Input
          id="container-color"
          type="color"
          value={themeColors.container}
          onChange={(e) => handleChange("container", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="background-color">Cor do Fundo</Label>
        <Input
          id="background-color"
          type="color"
          value={themeColors.background}
          onChange={(e) => handleChange("background", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ThemeColorsForm;