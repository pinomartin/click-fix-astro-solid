import type { ImageMetadata } from "astro";

// Importar todas las imágenes del directorio usando Vite's glob import
const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/img/sites/*.webp",
  { eager: true }
);

// Helper para obtener la imagen importada por nombre de archivo
function getImage(filename: string): ImageMetadata {
  const imagePath = `../assets/img/sites/${filename}`;
  const image = images[imagePath];

  if (!image) {
    throw new Error(`Image not found: ${imagePath}`);
  }

  return image.default;
}

const PORTFOLIO = [
  {
    key: "alinails",
    name: "Ali Nails",
    description: "Landing page for a nails salon.",
    color: "var(--color-pastel-beige)",
    logo: "AN",
    image: getImage("alinails.webp"),
    url: "https://alinails.netlify.app",
  },
  {
    key: "maktub",
    name: "Maktub Aesthetics",
    description: "Landing page for a beauty and aesthetics products.",
    color: "var(--color-pastel-green)",
    logo: "MTA",
    image: getImage("maktub.webp"),
    url: "https://maktubaesthetics.netlify.app",
  },
  {
    key: "misCositas",
    name: "Mis Cositas",
    description: "Landing page for a online store.",
    color: "var(--color-pastel-beige)",
    logo: "MC",
    image: getImage("mis_cositas.webp"),
    url: "https://miscositas.netlify.app",
  },
  {
    key: "kaHache",
    name: "KaHache",
    description: "Landing page for a beauty and aesthetics products.",
    color: "var(--color-pastel-purple)",
    logo: "KH",
    image: getImage("ka_hache.webp"),
    url: "https://kahache.netlify.app",
  },
  {
    key: "prod1080",
    name: "1080 Productora Audiovisual",
    description: "Modern online store with seamless checkout experience",
    color: "var(--color-pastel-beige)",
    logo: "1080",
    image: getImage("1080_prod.webp"),
    url: "https://1080prod.netlify.app",
  },
  {
    key: "yourDriver",
    name: "Your Driver",
    description: "Modern online store with seamless checkout experience",
    color: "var(--color-pastel-purple)",
    logo: "YD",
    image: getImage("your_driver.webp"),
    url: "https://yourdriver.netlify.app",
  },
  {
    key: "gonpinoDJ",
    name: "Gonpino DJ",
    description: "Landing page for a DJ and music producer.",
    color: "var(--color-pastel-green)",
    logo: "GPDJ",
    image: getImage("djgonpino.webp"),
    url: "https://gonpinodj.netlify.app",
  },
  {
    key: "morenoAsoc",
    name: "Moreno y Asociados",
    description: "Professional website for a leading finance company",
    color: "var(--color-pastel-purple)",
    logo: "MYA",
    image: getImage("moreno.webp"),
    url: "https://morenoyasociados.ar",
  },
];

export default PORTFOLIO;
