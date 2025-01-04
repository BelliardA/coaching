import { useState } from 'react'
import './App.css'
import {Affichage} from './constants/Constants'

import Navbar from './components/Navbar'
import ClientDashboard from './components/ClientDahsboard'
import Aliments from './components/Aliment/Aliments'
import Recettes from './components/Recettes'

function App() {
const [page, setPage] = useState<Affichage>(Affichage.Aliments)

switch (page) {
  case Affichage.Aliments:
    return (
      <>
        <Navbar setPage={setPage}/>
        <Aliments />
      </>
    )
    case Affichage.Recettes:
    return (
      <>
        <Navbar setPage={setPage}/>
        <Recettes />
      </>
    )
  case Affichage.Clients:
    return (
      <>
        <Navbar setPage={setPage}/>
        <ClientDashboard />
      </>
    )
  default:
    return (
      <>
        <Navbar setPage={setPage}/>
        <Aliments />
      </>
    )
}

}

export default App;
