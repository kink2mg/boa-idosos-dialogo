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
      {/* Cores Principais */}
      <div className="col-span-2">
        <h3 className="font-semibold mb-2">Cores Principais</h3>
      </div>
      <div>
        <Label htmlFor="primary">Roxo Primário (Elementos principais)</Label>
        <Input
          id="primary"
          type="color"
          value={themeColors.primary || "#9b87f5"}
          onChange={(e) => handleChange("primary", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="secondary">Roxo Secundário</Label>
        <Input
          id="secondary"
          type="color"
          value={themeColors.secondary || "#7E69AB"}
          onChange={(e) => handleChange("secondary", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="tertiary">Roxo Terciário</Label>
        <Input
          id="tertiary"
          type="color"
          value={themeColors.tertiary || "#6E59A5"}
          onChange={(e) => handleChange("tertiary", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="darkPurple">Roxo Escuro</Label>
        <Input
          id="darkPurple"
          type="color"
          value={themeColors.darkPurple || "#1A1F2C"}
          onChange={(e) => handleChange("darkPurple", e.target.value)}
        />
      </div>

      {/* Cores Suaves */}
      <div className="col-span-2 mt-4">
        <h3 className="font-semibold mb-2">Cores Suaves</h3>
      </div>
      <div>
        <Label htmlFor="softGreen">Verde Suave</Label>
        <Input
          id="softGreen"
          type="color"
          value={themeColors.softGreen || "#F2FCE2"}
          onChange={(e) => handleChange("softGreen", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="softYellow">Amarelo Suave</Label>
        <Input
          id="softYellow"
          type="color"
          value={themeColors.softYellow || "#FEF7CD"}
          onChange={(e) => handleChange("softYellow", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="softPurple">Roxo Suave</Label>
        <Input
          id="softPurple"
          type="color"
          value={themeColors.softPurple || "#E5DEFF"}
          onChange={(e) => handleChange("softPurple", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="softBlue">Azul Suave</Label>
        <Input
          id="softBlue"
          type="color"
          value={themeColors.softBlue || "#D3E4FD"}
          onChange={(e) => handleChange("softBlue", e.target.value)}
        />
      </div>

      {/* Cores Vibrantes */}
      <div className="col-span-2 mt-4">
        <h3 className="font-semibold mb-2">Cores Vibrantes</h3>
      </div>
      <div>
        <Label htmlFor="vividPurple">Roxo Vibrante</Label>
        <Input
          id="vividPurple"
          type="color"
          value={themeColors.vividPurple || "#8B5CF6"}
          onChange={(e) => handleChange("vividPurple", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="brightOrange">Laranja Brilhante</Label>
        <Input
          id="brightOrange"
          type="color"
          value={themeColors.brightOrange || "#F97316"}
          onChange={(e) => handleChange("brightOrange", e.target.value)}
        />
      </div>

      {/* Cores de Interface */}
      <div className="col-span-2 mt-4">
        <h3 className="font-semibold mb-2">Cores de Interface</h3>
      </div>
      <div>
        <Label htmlFor="background">Fundo Principal</Label>
        <Input
          id="background"
          type="color"
          value={themeColors.background || "#FFFFFF"}
          onChange={(e) => handleChange("background", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="text">Texto Principal</Label>
        <Input
          id="text"
          type="color"
          value={themeColors.text || "#333333"}
          onChange={(e) => handleChange("text", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ThemeColorsForm;