import { useState } from "react";
import { NutritionForm, type NutritionData } from "@/components/NutritionForm";
import { RecipeCalendar } from "@/components/RecipeCalendar";
import { Leaf, Sparkles } from "lucide-react";

const Index = () => {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleFormSubmit = (data: NutritionData) => {
    setNutritionData(data);
    setShowCalendar(true);
  };

  const handleBackToForm = () => {
    setShowCalendar(false);
    setNutritionData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105" 
              onClick={showCalendar ? handleBackToForm : undefined}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">NutriPlanner</h1>
                <p className="text-xs text-muted-foreground">Alimentación saludable</p>
              </div>
            </div>
            
            {showCalendar && (
              <button
                onClick={handleBackToForm}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Nuevo Plan
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!showCalendar ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Planificación personalizada
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Tu plan de alimentación
                <span className="block text-primary">perfecto te espera</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Crea un plan nutricional personalizado basado en tus objetivos, 
                preferencias dietéticas y estilo de vida. Recibe recetas saludables 
                organizadas en un calendario semanal.
              </p>
            </div>

            {/* Form */}
            <NutritionForm onSubmit={handleFormSubmit} />
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Planes Personalizados</h3>
                <p className="text-sm text-muted-foreground">
                  Recetas adaptadas a tu tipo de dieta y objetivos nutricionales
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
                <div className="inline-flex p-3 rounded-full bg-secondary/60 mb-4">
                  <Sparkles className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Calendario Visual</h3>
                <p className="text-sm text-muted-foreground">
                  Organiza tus comidas semanalmente con un calendario claro y fácil
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
                <div className="inline-flex p-3 rounded-full bg-accent/60 mb-4">
                  <Leaf className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Variedad Saludable</h3>
                <p className="text-sm text-muted-foreground">
                  Disfruta de recetas deliciosas sin sacrificar tus objetivos de salud
                </p>
              </div>
            </div>
          </div>
        ) : (
          nutritionData && <RecipeCalendar nutritionData={nutritionData} />
        )}
      </main>
    </div>
  );
};

export default Index;
