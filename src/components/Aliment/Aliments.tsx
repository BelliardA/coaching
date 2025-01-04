import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { TypeAliment } from "../../constants/Constants";
import "../../styles/tableau.css";
import "../../styles/pop-up.css";
import "../../styles/Aliment.css";
import AlimentCreate from "./AlimentCreate";

function Aliments() {
  const [aliments, setAliments] = useState<any>([]); // État pour stocker les aliments
  const [loading, setLoading] = useState(true); // État pour indiquer si le chargement est en cours
  const [error, setError] = useState<any>();
  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'affichage du formulaire d'édition
  const [isCreating, setIsCreating] = useState(false); // État pour gérer l'affichage du formulaire de création
  const [currentAliment, setCurrentAliment] = useState<any>(null); //aliment selectionner pour modification
  const [filteredAliments, setFilteredAliments] = useState<any>(); //aliment filtré pour affichage après traitement

  const [criteres, setCritres] = useState({
    nom: "",
    type: "",
    calories: 0,
    proteines: 0,
    glucides: 0,
    lipides: 0,
    gram: 0,
  });

  useEffect(() => {
    const fetchAliments = async () => {
      // Appel à la base de données
      const { data, error } = await supabase.from("aliments").select("*");

      if (error) {
        setError(error); // Stocke l'erreur dans l'état
        setLoading(false); // Fin du chargement
        return;
      }

      setAliments(data || []); // Met à jour les aliments
      setFilteredAliments(data || []); // Met à jour les aliments filtrés
      setLoading(false); // Fin du chargement
    };

    fetchAliments();
  }, [isCreating]); // Exécute une fois au montage du composant

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("aliments").delete().eq("id", id);
    if (error) {
      setError(error);
      return;
    }
    setAliments((prevState: any) =>
      prevState.filter((aliment: any) => aliment.id !== id)
    );
  };

  const handleEdit = (aliment: any) => {
    setCurrentAliment(aliment); // Remplir l'état avec l'aliment à modifier
    setIsEditing(true); // Afficher le formulaire d'édition
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("aliments")
      .update({
        nom: currentAliment.nom,
        type: currentAliment.type,
        calories: currentAliment.calories,
        proteines: currentAliment.proteines,
        glucides: currentAliment.glucides,
        lipides: currentAliment.lipides,
      })
      .eq("id", currentAliment.id);

    if (error) {
      setError(error);
      return;
    }

    setIsEditing(false); // Fermer le formulaire
    setCurrentAliment(null); // Réinitialiser l'aliment sélectionné
  };

  const handleSearchChange = (e: any) => {
    const { name, value } = e.target;
    setCritres({
      ...criteres,
      [name]: value, // Met à jour uniquement le champ modifié
    });
  };

  const filtrerAliments = (criteres: any) => {
    let multiplicateur = 1;

    return aliments
      .filter((aliment) => {
        if (criteres.calories) {
          multiplicateur = criteres.calories / aliment.calories;
        }
        const caloriesCorrespondent = criteres.calories
          ? aliment.calories * multiplicateur ===
            Math.round(Number(criteres.calories))
          : true;

        const proteinesCorrespondent = criteres.proteines
          ? Math.abs(
              aliment.proteines * multiplicateur - Number(criteres.proteines)
            ) <= 0.1
          : true;
        const lipidesCorrespondent = criteres.lipides
          ? Math.abs(
              aliment.lipides * multiplicateur - Number(criteres.lipides)
            ) <= 0.1
          : true;

        const glucidesCorrespondent = criteres.glucides
          ? Math.abs(
              aliment.glucides * multiplicateur - Number(criteres.glucides)
            ) <= 0.1
          : true;

        return (
          (criteres.nom
            ? aliment.nom.toLowerCase().includes(criteres.nom.toLowerCase())
            : true) &&
          (criteres.type ? aliment.type === criteres.type : true) &&
          caloriesCorrespondent &&
          proteinesCorrespondent &&
          lipidesCorrespondent &&
          glucidesCorrespondent
        );
      })
      .map((aliment) => {
        // Ajout du multiplicateur au résultat final
        return {
          ...aliment,
          multiplicateur: criteres.calories
            ? criteres.calories / aliment.calories
            : 1,
        };
      });
  };

  useEffect(() => {
    setFilteredAliments(filtrerAliments(criteres));
  }, [criteres, aliments]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  return (
    <section className="table-container">
      <h1 className="table-title">Aliments</h1>
      <div className="interaction">
          <form className="search-zone">
            {/* Label associé à l'input */}
            <input
              className="name-search input-search"
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom"
              value={criteres.nom}
              onChange={handleSearchChange} // Lors de chaque modification du champ, l'état est mis à jour
            />
            <select
              className="type-search input-search"
              id="type"
              name="type"
              value={criteres.type}
              onChange={handleSearchChange}
            >
              <option value="">Pas de type selectionner</option>
              {Object.values(TypeAliment).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              className="calories-search input-search"
              type="number"
              id="calories"
              name="calories"
              placeholder="Calories"
              value={criteres.calories || ""}
              onChange={handleSearchChange} // Lors de chaque modification du champ, l'état est mis à jour
            />
            <input
              className="proteines-search input-search"
              type="number"
              id="proteines"
              name="proteines"
              placeholder="Protéines"
              value={criteres.proteines || ""}
              onChange={handleSearchChange} // Lors de chaque modification du champ, l'état est mis à jour
            />
            <input
              className="glucides-search input-search"
              type="number"
              id="glucides"
              name="glucides"
              placeholder="Glucides"
              value={criteres.glucides || ""}
              onChange={handleSearchChange} // Lors de chaque modification du champ, l'état est mis à jour
            />
            <input
              className="lipides-search input-search"
              type="number"
              id="lipides"
              name="lipides"
              placeholder="Lipides"
              value={criteres.lipides || ""}
              onChange={handleSearchChange} // Lors de chaque modification du champ, l'état est mis à jour
            />
          </form>

        <button onClick={() => setIsCreating(true)} className="btn create-aliment">
          Créer un aliment
        </button>
      </div>

      {isCreating && <AlimentCreate setIsCreating={setIsCreating} />}

      {isEditing && (
        <div
          className="popup-overlay"
          onClick={(e) => {
            // Ferme le popup uniquement si on clique sur l'arrière-plan
            if (e.target === e.currentTarget) {
              setIsEditing(false);
            }
          }}
        >
          <div className="popup">
            <h2>Modifier Aliment</h2>
            <form onSubmit={handleUpdate}>
              <label htmlFor="nom">Nom:</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={currentAliment?.nom}
                onChange={(e) =>
                  setCurrentAliment({ ...currentAliment, nom: e.target.value })
                }
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                value={currentAliment?.type || ""}
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
                value={currentAliment?.calories}
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
                value={currentAliment?.proteines}
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
                value={currentAliment?.glucides}
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
                value={currentAliment?.lipides}
                onChange={(e) =>
                  setCurrentAliment({
                    ...currentAliment,
                    lipides: Number(e.target.value),
                  })
                }
              />
              <button className="btn" type="submit">
                Mettre à jour
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="aliment-table">
        <thead>
          <tr>
            <th className="table-header">Nom</th>
            <th className="table-header">Quantité</th>
            <th className="table-header">Type</th>
            <th className="table-header">Calories</th>
            <th className="table-header">Protéines</th>
            <th className="table-header">Glucides</th>
            <th className="table-header">Lipides</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAliments.map((aliment: any) => (
            <tr key={aliment.id} className="table-row">
              <td className="table-cell">{aliment.nom}</td>
              <td className="table-cell">
                {Math.round(100 * aliment.multiplicateur * 10) / 10}g
              </td>
              <td className="table-cell">{aliment.type}</td>
              <td className="table-cell">
                {aliment.calories * aliment.multiplicateur}kcal
              </td>
              <td className="table-cell">
                {Math.round(aliment.proteines * aliment.multiplicateur * 10) /
                  10}
                g
              </td>
              <td className="table-cell">
                {Math.round(aliment.glucides * aliment.multiplicateur * 10) /
                  10}
                g
              </td>
              <td className="table-cell">
                {Math.round(aliment.lipides * aliment.multiplicateur * 10) / 10}
                g
              </td>
              <td className="table-cell actions-row">
                <button
                  onClick={() => handleEdit(aliment)}
                  className="btn-edit btn-table"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(aliment.id)}
                  className="btn-delete btn-table"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Aliments;
