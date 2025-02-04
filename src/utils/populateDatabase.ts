import { supabase } from "@/integrations/supabase/client";
import { samplePlans, sampleAccessories, sampleNews } from "@/data/sampleData";

export const populateDatabase = async () => {
  try {
    // Add plans
    const { error: plansError } = await supabase
      .from('plans')
      .insert(samplePlans);

    if (plansError) throw plansError;

    // Add accessories
    const { error: accessoriesError } = await supabase
      .from('accessories')
      .insert(sampleAccessories);

    if (accessoriesError) throw accessoriesError;

    // Add news
    const { error: newsError } = await supabase
      .from('news')
      .insert(sampleNews);

    if (newsError) throw newsError;

    return { success: true };
  } catch (error) {
    console.error('Error populating database:', error);
    return { success: false, error };
  }
};