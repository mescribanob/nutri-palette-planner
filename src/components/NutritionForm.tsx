import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Target, Scale, Flame, Apple, Activity } from "lucide-react";

export interface NutritionData {
  age: number;
  weight: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  dietType: string;
}

interface NutritionFormProps {
  onSubmit: (data: NutritionData) => void;
}

export const NutritionForm = ({ onSubmit }: NutritionFormProps) => {
  const [formData, setFormData] = useState<Partial<NutritionData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.age &&
      formData.weight &&
      formData.calories &&
      formData.proteins &&
      formData.carbs &&
      formData.fats &&
      formData.dietType
    ) {
      onSubmit(formData as NutritionData);
    }
  };

  const updateField = (field: keyof NutritionData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-[var(--shadow-card)] border-border/50">
      <CardHeader className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Configura tu Plan Nutricional
        </CardTitle>
        <p className="text-muted-foreground">
          Cuéntanos sobre tus objetivos para crear un plan personalizado
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-sm font-medium">
                <Activity className="h-4 w-4 text-primary" />
                Edad (años)
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age || ""}
                onChange={(e) => updateField("age", parseInt(e.target.value))}
                className="border-border/70 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2 text-sm font-medium">
                <Scale className="h-4 w-4 text-primary" />
                Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight || ""}
                onChange={(e) => updateField("weight", parseInt(e.target.value))}
                className="border-border/70 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories" className="flex items-center gap-2 text-sm font-medium">
                <Flame className="h-4 w-4 text-accent" />
                Calorías diarias
              </Label>
              <Input
                id="calories"
                type="number"
                placeholder="2000"
                value={formData.calories || ""}
                onChange={(e) => updateField("calories", parseInt(e.target.value))}
                className="border-border/70 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proteins" className="flex items-center gap-2 text-sm font-medium">
                <Target className="h-4 w-4 text-primary" />
                Proteínas (g)
              </Label>
              <Input
                id="proteins"
                type="number"
                placeholder="120"
                value={formData.proteins || ""}
                onChange={(e) => updateField("proteins", parseInt(e.target.value))}
                className="border-border/70 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs" className="flex items-center gap-2 text-sm font-medium">
                <Apple className="h-4 w-4 text-secondary" />
                Carbohidratos (g)
              </Label>
              <Input
                id="carbs"
                type="number"
                placeholder="200"
                value={formData.carbs || ""}
                onChange={(e) => updateField("carbs", parseInt(e.target.value))}
                className="border-border/70 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fats" className="flex items-center gap-2 text-sm font-medium">
                <Target className="h-4 w-4 text-accent" />
                Grasas (g)
              </Label>
              <Input
                id="fats"
                type="number"
                placeholder="60"
                value={formData.fats || ""}
                onChange={(e) => updateField("fats", parseInt(e.target.value))}
                className="border-border/70 focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietType" className="flex items-center gap-2 text-sm font-medium">
              <Leaf className="h-4 w-4 text-primary" />
              Tipo de dieta
            </Label>
            <Select
              value={formData.dietType || ""}
              onValueChange={(value) => updateField("dietType", value)}
              required
            >
              <SelectTrigger className="border-border/70 focus:border-primary">
                <SelectValue placeholder="Selecciona tu tipo de dieta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanceada">Balanceada</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="mediterranea">Mediterránea</SelectItem>
                <SelectItem value="vegana">Vegana</SelectItem>
                <SelectItem value="vegetariana">Vegetariana</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
                <SelectItem value="dash">DASH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium py-3 transition-all duration-300 shadow-[var(--shadow-soft)]"
          >
            Generar Plan de Alimentación
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};