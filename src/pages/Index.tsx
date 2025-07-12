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
                <p className="text-xs text-muted-foreground">Healthy nutrition</p>
              </div>
            </div>
            
            {showCalendar && (
              <button
                onClick={handleBackToForm}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                New Plan
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
                Personalized planning
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Your perfect nutrition
                <span className="block text-primary">plan awaits</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create a personalized nutrition plan based on your goals, 
                dietary preferences and lifestyle. Get healthy recipes 
                organized in a weekly calendar.
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
                <h3 className="font-semibold mb-2">Personalized Plans</h3>
                <p className="text-sm text-muted-foreground">
                  Recipes adapted to your diet type and nutritional goals
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
                <div className="inline-flex p-3 rounded-full bg-secondary/60 mb-4">
                  <Sparkles className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Visual Calendar</h3>
                <p className="text-sm text-muted-foreground">
                  Organize your meals weekly with a clear and easy calendar
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
                <div className="inline-flex p-3 rounded-full bg-accent/60 mb-4">
                  <Leaf className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Healthy Variety</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy delicious recipes without sacrificing your health goals
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
