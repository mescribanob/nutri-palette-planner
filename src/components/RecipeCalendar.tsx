import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Users, Flame } from "lucide-react";
import type { NutritionData } from "./NutritionForm";

interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: string;
  servings: number;
  type: "breakfast" | "lunch" | "dinner" | "snack";
}

interface RecipeCalendarProps {
  nutritionData: NutritionData;
}

const generateRecipes = (nutritionData: NutritionData): Recipe[] => {
  const recipes: { [key: string]: Recipe[] } = {
    balanceada: [
      { id: "1", name: "Avena con frutas y nueces", calories: 350, protein: 12, carbs: 45, fats: 15, prepTime: "10 min", servings: 1, type: "breakfast" },
      { id: "2", name: "Pollo a la plancha con quinoa", calories: 450, protein: 35, carbs: 40, fats: 12, prepTime: "25 min", servings: 1, type: "lunch" },
      { id: "3", name: "Salmón con verduras al vapor", calories: 400, protein: 30, carbs: 15, fats: 25, prepTime: "20 min", servings: 1, type: "dinner" },
      { id: "4", name: "Yogur griego con almendras", calories: 200, protein: 15, carbs: 12, fats: 10, prepTime: "5 min", servings: 1, type: "snack" },
    ],
    keto: [
      { id: "5", name: "Huevos revueltos con aguacate", calories: 380, protein: 18, carbs: 8, fats: 32, prepTime: "8 min", servings: 1, type: "breakfast" },
      { id: "6", name: "Ensalada de pollo con aceite de oliva", calories: 420, protein: 32, carbs: 6, fats: 30, prepTime: "15 min", servings: 1, type: "lunch" },
      { id: "7", name: "Salmón con brócoli y mantequilla", calories: 450, protein: 35, carbs: 8, fats: 32, prepTime: "18 min", servings: 1, type: "dinner" },
      { id: "8", name: "Nueces mixtas", calories: 180, protein: 6, carbs: 4, fats: 16, prepTime: "0 min", servings: 1, type: "snack" },
    ],
    vegana: [
      { id: "9", name: "Bowl de acai con granola", calories: 320, protein: 8, carbs: 55, fats: 12, prepTime: "10 min", servings: 1, type: "breakfast" },
      { id: "10", name: "Curry de lentejas con arroz integral", calories: 380, protein: 18, carbs: 65, fats: 8, prepTime: "30 min", servings: 1, type: "lunch" },
      { id: "11", name: "Tofu salteado con vegetales", calories: 350, protein: 20, carbs: 25, fats: 20, prepTime: "20 min", servings: 1, type: "dinner" },
      { id: "12", name: "Hummus con vegetales", calories: 150, protein: 6, carbs: 15, fats: 8, prepTime: "5 min", servings: 1, type: "snack" },
    ],
    mediterranea: [
      { id: "13", name: "Tostada de aguacate y tomate", calories: 280, protein: 8, carbs: 25, fats: 18, prepTime: "8 min", servings: 1, type: "breakfast" },
      { id: "14", name: "Ensalada griega con pescado", calories: 420, protein: 28, carbs: 20, fats: 25, prepTime: "15 min", servings: 1, type: "lunch" },
      { id: "15", name: "Pescado al horno con aceitunas", calories: 380, protein: 32, carbs: 12, fats: 22, prepTime: "25 min", servings: 1, type: "dinner" },
      { id: "16", name: "Aceitunas y queso feta", calories: 170, protein: 8, carbs: 5, fats: 14, prepTime: "2 min", servings: 1, type: "snack" },
    ],
  };

  return recipes[nutritionData.dietType] || recipes.balanceada;
};

export const RecipeCalendar = ({ nutritionData }: RecipeCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const recipes = generateRecipes(nutritionData);

  const getWeekDays = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + currentWeek * 7);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const getDayRecipes = (dayIndex: number) => {
    const recipeIndex = (dayIndex + currentWeek * 7) % recipes.length;
    return [
      recipes[recipeIndex % recipes.length],
      recipes[(recipeIndex + 1) % recipes.length],
      recipes[(recipeIndex + 2) % recipes.length],
    ];
  };

  const weekDays = getWeekDays();
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getTypeColor = (type: Recipe["type"]) => {
    switch (type) {
      case "breakfast": return "bg-secondary text-secondary-foreground";
      case "lunch": return "bg-primary text-primary-foreground";
      case "dinner": return "bg-accent text-accent-foreground";
      case "snack": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeLabel = (type: Recipe["type"]) => {
    switch (type) {
      case "breakfast": return "Desayuno";
      case "lunch": return "Almuerzo";
      case "dinner": return "Cena";
      case "snack": return "Snack";
      default: return "Comida";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card className="shadow-[var(--shadow-card)] border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold">
              Tu Plan de Alimentación
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(prev => prev - 1)}
                className="border-border/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-3 py-1 bg-muted rounded-md">
                Semana {currentWeek + 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(prev => prev + 1)}
                className="border-border/70"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Dieta {nutritionData.dietType} • {nutritionData.calories} cal/día • {nutritionData.proteins}g proteínas
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            {weekDays.map((date, dayIndex) => (
              <div key={dayIndex} className="space-y-3">
                <div className="text-center">
                  <p className="font-medium text-foreground">
                    {dayNames[date.getDay()]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {date.getDate()}/{date.getMonth() + 1}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {getDayRecipes(dayIndex).map((recipe, recipeIndex) => (
                    <Card key={`${dayIndex}-${recipeIndex}`} className="p-3 border-border/50 hover:shadow-md transition-shadow">
                      <div className="space-y-2">
                        <Badge className={`text-xs ${getTypeColor(recipe.type)}`}>
                          {getTypeLabel(recipe.type)}
                        </Badge>
                        <h4 className="font-medium text-sm leading-tight">
                          {recipe.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            <span>{recipe.calories} cal</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{recipe.prepTime}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          P: {recipe.protein}g • C: {recipe.carbs}g • G: {recipe.fats}g
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};