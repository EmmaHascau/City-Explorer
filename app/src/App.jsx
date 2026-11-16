import { useState, useEffect } from 'react'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import { getDestinatii, postDestinatie, patchVizitat } from './api/destinatii.js'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Rezumat from './components/Rezumat.jsx'
import Cautare from './components/Cautare.jsx'
import PanouStatistici from './components/PanouStatistici.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')

  useEffect(() => {
    async function incarcaDate() {
      try {
        const data = await getDestinatii()
        setDestinatii(data)
      } catch (err) {
        setEroare(err.message)
      } finally {
        setIncarcare(false)
      }
    }
    incarcaDate()
  }, [])

  async function handleToggle(id) {
    const target = destinatii.find((d) => d.id === id)
    if (!target) return
    try {
      const salvata = await patchVizitat(id, !target.vizitat)
      setDestinatii((curent) => curent.map((d) => (d.id === id ? salvata : d)))
    } catch (err) {
      console.error('Eroare la actualizare:', err.message)
    }
  }

  async function handleAdd(nouaDestinatie) {
    setSeTrimite(true)
    try {
      const salvata = await postDestinatie(nouaDestinatie)
      setDestinatii((curent) => [...curent, salvata])
    } catch (err) {
      console.error('Eroare la adăugare:', err.message)
    } finally {
      setSeTrimite(false)
    }
  }

  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(cautare.trim().toLowerCase()) ||
      d.tara.toLowerCase().includes(cautare.trim().toLowerCase())
  )

  const nevizitate = getNevizitate(destinatii)

  if (incarcare) return <p className="stare">Se încarcă destinațiile...</p>
  if (eroare) return <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>

  return (
    <main>
      <h1>City Explorer</h1>
      <PanouStatistici />
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <Cautare valoare={cautare} onChange={setCautare} />
      <ListaDestinatii
        destinatii={afisate}
        onToggle={handleToggle}
        totalDestinatii={destinatii.length}
        cautare={cautare}
      />
    </main>
  )
}