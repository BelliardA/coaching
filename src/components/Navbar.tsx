import "../styles/Navbar.css"
import { Affichage } from '../constants/Constants'

type NavbarProps = {
    setPage: (page: Affichage) => void; // Définir que `setPage` est une fonction qui prend un string
  };
  
  function Navbar({ setPage }: NavbarProps) {

    const handleClick = (page: Affichage) => {
        setPage(page)
    }

    return (
        <section className="navbar">
            <div className="contain-btn-nav">
                <button onClick={() => handleClick(Affichage.Aliments)} className="btn-nav" >Aliments</button>
                <button onClick={() => handleClick(Affichage.Recettes)} className="btn-nav">Recettes</button>
                {/* <button onClick={() => handleClick(Affichage.Exercices)} className="btn-nav">Exercices</button> */}
                <button onClick={() => handleClick(Affichage.Clients)} className="btn-nav">Clients</button>
            </div>
            <button className="btn-creer-programme">Créer un programme</button>
        </section>
    )
}

export default Navbar