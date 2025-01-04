import { supabase } from "../../supabaseClient";

const fetchAliments = async () => {
    // Appel à la base de données
    let { data, error } = await supabase.from("aliments").select("*");

    if (error) {
      console.log(error); // Stocke l'erreur dans l'état
        data = null;
      return;
    }

    return data, error;
  };