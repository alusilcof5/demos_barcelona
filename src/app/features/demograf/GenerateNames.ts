/* // Script auxiliar para generar los nombres de archivo de las imágenes
// Ejecuta con: ts-node generar-nombres-imagenes.ts
// O compila primero: tsc generar-nombres-imagenes.ts && node generar-nombres-imagenes.js

const barrios: string[] = [
  // Distrito 1 - Ciutat Vella
  "el Raval",
  "el Gòtic", 
  "la Barceloneta",
  "Sant Pere, Santa Caterina i la Ribera",
  
  // Distrito 2 - Eixample
  "el Fort Pienc",
  "la Sagrada Família",
  "la Dreta de l'Eixample",
  "l'Antiga Esquerra de l'Eixample",
  "la Nova Esquerra de l'Eixample",
  "Sant Antoni",
  
  // Distrito 3 - Sants-Montjuïc
  "el Poble-sec",
  "la Marina de Port",
  "la Marina del Prat Vermell",
  "la Font de la Guatlla",
  "Hostafrancs",
  "la Bordeta",
  "Sants-Badal",
  "Sants",
  "la Maternitat i Sant Ramon",
  "Montjuïc",
  
  // Distrito 4 - Les Corts
  "les Corts",
  "la Maternitat i Sant Ramon",
  "Pedralbes",
  
  // Distrito 5 - Sarrià-Sant Gervasi
  "Vallvidrera, el Tibidabo i les Planes",
  "Sarrià",
  "les Tres Torres",
  "Sant Gervasi - la Bonanova",
  "Sant Gervasi - Galvany",
  "el Putxet i el Farró",
  
  // Distrito 6 - Gràcia
  "Vallcarca i els Penitents",
  "el Coll",
  "la Salut",
  "Vila de Gràcia",
  "el Camp d'en Grassot i Gràcia Nova",
  
  // Distrito 7 - Horta-Guinardó
  "el Baix Guinardó",
  "Can Baró",
  "el Guinardó",
  "la Font d'en Fargues",
  "el Carmel",
  "la Teixonera",
  "Sant Genís dels Agudells",
  "Montbau",
  "la Vall d'Hebron",
  "la Clota",
  "Horta",
  
  // Distrito 8 - Nou Barris
  "Vilapicina i la Torre Llobeta",
  "Porta",
  "el Turó de la Peira",
  "Can Peguera",
  "la Guineueta",
  "Canyelles",
  "les Roquetes",
  "Verdun",
  "la Prosperitat",
  "la Trinitat Nova",
  "Torre Baró",
  "Ciutat Meridiana",
  "Vallbona",
  
  // Distrito 9 - Sant Andreu
  "la Trinitat Vella",
  "Baró de Viver",
  "el Bon Pastor",
  "Sant Andreu",
  "la Sagrera",
  "el Congrés i els Indians",
  "Navas",
  
  // Distrito 10 - Sant Martí
  "el Camp de l'Arpa del Clot",
  "el Clot",
  "el Parc i la Llacuna del Poblenou",
  "la Vila Olímpica del Poblenou",
  "el Poblenou",
  "Diagonal Mar i el Front Marítim del Poblenou",
  "el Besòs i el Maresme",
  "Provençals del Poblenou",
  "Sant Martí de Provençals",
  "la Verneda i la Pau"
];

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]/g, '-') // Reemplazar caracteres especiales por guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones por uno solo
    .replace(/^-|-$/g, ''); // Eliminar guiones al inicio y final
}

console.log("=".repeat(60));
console.log("LISTA DE ARCHIVOS DE IMÁGENES NECESARIOS");
console.log("=".repeat(60));
console.log("\nCopia estos nombres para tus archivos JPG:\n");

barrios.forEach((barrio: string, index: number) => {
  const filename: string = normalizeName(barrio) + '.jpg';
  console.log(`${(index + 1).toString().padStart(2, '0')}. ${filename.padEnd(50)} ← "${barrio}"`);
});

console.log("\n" + "=".repeat(60));
console.log(`Total de imágenes necesarias: ${barrios.length}`);
console.log("=".repeat(60));

console.log("\n📁 Guarda todas estas imágenes en:");
console.log("   public/images/barrios/\n");

console.log("🖼️  No olvides también crear:");
console.log("   public/images/placeholder-barrio.jpg\n"); */