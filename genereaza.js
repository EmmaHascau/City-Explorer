const fs = require('fs')

const oraseDisponibile = [
  { oras: 'Lisabona', tara: 'Portugalia' },
  { oras: 'Cluj-Napoca', tara: 'Romania' },
  { oras: 'Porto', tara: 'Portugalia' },
  { oras: 'Brasov', tara: 'Romania' },
  { oras: 'Kyoto', tara: 'Japonia' },
  { oras: 'Tokyo', tara: 'Japonia' },
  { oras: 'Madrid', tara: 'Spania' },
  { oras: 'Barcelona', tara: 'Spania' },
  { oras: 'Praga', tara: 'Cehia' },
  { oras: 'Viena', tara: 'Austria' },
  { oras: 'Umbria', tara: 'Italia' },
  { oras: 'Vejle', tara: 'Danemarca' },
  { oras: 'Heidelberg', tara: 'Germania' },
  { oras: 'Hallstatt', tara: 'Austria' },
  { oras: 'Eindhoven', tara: 'Olanda' }
]

const destinatii = []

for (let i = 1; i <= 2000; i++) {
  const template = oraseDisponibile[(i - 1) % oraseDisponibile.length]
  destinatii.push({
    id: String(i),
    oras: `${template.oras} ${i}`,
    tara: template.tara,
    zile: (i % 5) + 1,
    vizitat: i % 2 === 0
  })
}

const db = {
  orase: [
    { id: "1", oras: "Madrid", tara: "Spania", pret: 520 },
    { id: "2", oras: "Barcelona", tara: "Spania", pret: 480 },
    { id: "3", oras: "Praga", tara: "Cehia", pret: 310 },
    { id: "4", oras: "Viena", tara: "Austria", pret: 390 }
  ],
  destinatii: destinatii
}

fs.writeFileSync('db-mare.json', JSON.stringify(db, null, 2))
console.log('S-a generat fisierul db-mare.json cu 2000 de destinatii!')