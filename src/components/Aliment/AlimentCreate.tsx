import { useState } from "react";
import { TypeAliment } from "../../constants/Constants";
import { supabase } from "../../supabaseClient";
import "../../styles/pop-up.css";

interface AlimentCreateProps {
  setIsCreating: (isCreating: boolean) => void;
}

function AlimentCreate({ setIsCreating }: AlimentCreateProps) {
  const [currentAliment, setCurrentAliment] = useState<any>({
    nom: "",
    type: "",
    calories: 0,
    proteines: 0,
    glucides: 0,
    lipides: 0,
  });
  const [error, setError] = useState<any>();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("aliments")
      .insert([
        {
          nom: currentAliment.nom,
          type: currentAliment.type,
          calories: currentAliment.calories,
          proteines: currentAliment.proteines,
          glucides: currentAliment.glucides,
          lipides: currentAliment.lipides,
        },
      ]);

    if (error) {
      setError(error);
      return;
    }

    setIsCreating(false); // Fermer le formulaire après création
    setCurrentAliment({
      nom: "",
      type: "",
      calories: 0,
      proteines: 0.0,
      glucides: 0.0,
      lipides: 0.0,
    }); // Réinitialiser l'aliment créé
  };

  if(error) {
    return <div>{error.message}</div>;
  }

  return (
    <div
      className="popup-overlay"
      onClick={(e) => {
        // Ferme le popup uniquement si on clique sur l'arrière-plan
        if (e.target === e.currentTarget) {
          setIsCreating(false);
        }
      }}
    >
      <div className="popup">
        <h2>Créer un Aliment</h2>
        <p>Pour 100g</p>
        <form onSubmit={handleCreate}>
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={currentAliment.nom || ""}
            onChange={(e) =>
              setCurrentAliment({ ...currentAliment, nom: e.target.value })
            }
          />
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={currentAliment.type}
            onChange={(e) =>
              setCurrentAliment({ ...currentAliment, type: e.target.value })
            }
          >
            <option value="" disabled>
              Sélectionnez un type
            </option>
            {Object.values(TypeAliment).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={currentAliment.calories || ""}
            onChange={(e) =>
              setCurrentAliment({
                ...currentAliment,
                calories: Number(e.target.value),
              })
            }
          />
          <label htmlFor="proteines">Protéines:</label>
          <input
            type="number"
            id="proteines"
            name="proteines"
            value={currentAliment.proteines || ""}
            onChange={(e) =>
              setCurrentAliment({
                ...currentAliment,
                proteines: Number(e.target.value),
              })
            }
          />
          <label htmlFor="glucides">Glucides:</label>
          <input
            type="number"
            id="glucides"
            name="glucides"
            value={currentAliment.glucides || ""}
            onChange={(e) =>
              setCurrentAliment({
                ...currentAliment,
                glucides: Number(e.target.value),
              })
            }
          />
          <label htmlFor="lipides">Lipides:</label>
          <input
            type="number"
            id="lipides"
            name="lipides"
            value={currentAliment.lipides || ""}
            onChange={(e) =>
              setCurrentAliment({
                ...currentAliment,
                lipides: Number(e.target.value),
              })
            }
          />
          <button className="btn" type="submit">Créer</button>
        </form>
      </div>
    </div>
  );
}

export default AlimentCreate;