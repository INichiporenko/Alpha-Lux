export const company = {
  name: "Alphalux",
  logo: "/photos/logo/onefon.png",
  logoHeader: "/photos/logo/onefonlogo.png",
  phone: "+49 176 66660904",
  phoneHref: "tel:+4917666660904",
  email: "info@alphalux-innenausbau.de",
  contactPerson: "Nazarii Shaban",
  socials: {
    instagram: "https://www.instagram.com/alphalux_innenausbau/",
    email: "mailto:info@alphalux-innenausbau.de",
    whatsapp: "https://wa.me/4917666660904",
    tiktok: "https://www.tiktok.com/@alphalux.innenausbau",
    check24: "https://handwerk.check24.de/craftsmen/cs/profile/ojj3l",
    google:
      "https://www.google.com/search?q=alphalux-innenausbau&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_xTyw7EoetEVEjqr4IyB7yCmP1BoElfp9mTXyv96M-HwVpCGWGikXIqA94ChG_pgVxo9Tas%3D",
  },
};

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: "/photos/hero/baustelle-wide.jpg",
  heroFinished: "/photos/hero/wohnen-wide.jpg",
  living: unsplash("photo-1600607687939-ce8a6c25118c"),
  kitchen: unsplash("photo-1556912173-46c336c7fd55"),
  bathroom: unsplash("photo-1600566753086-00f18fb6b3ea"),
  bedroom: unsplash("photo-1616594039964-ae9021a400a0"),
  office: unsplash("photo-1497366216548-37526070297c"),
  house: unsplash("photo-1600585154340-be6161a56a0c"),
  penthouse: unsplash("photo-1600607687920-4e2a09cf159d"),
  dining: unsplash("photo-1616486338812-3dadae4b4ace"),
  hallway: unsplash("photo-1600489000022-c2086d310d13"),
  facade: unsplash("photo-1600047509807-ba8f99d2cdbc"),
  detail: unsplash("photo-1600210491892-03d54c0aaf87"),
  process: "/photos/content/about-work-far.jpg",
  aboutActivity: "/photos/content/9.jpg",
  materials: unsplash("photo-1615874959474-d453339d4d56"),
};

export const servicesSlideshow = [
  "/photos/content/8.jpg",
  "/photos/content/9.jpg",
  "/photos/content/5.jpg",
  "/photos/content/3.jpg",
  "/photos/content/14.jpg",
] as const;

export const onSitePhotos = [
  "/photos/content/before-after-01.jpg",
  "/photos/content/before-after-02.jpg",
  "/photos/content/before-after-03.jpg",
  "/photos/content/before-after-04.jpg",
] as const;

export const servicePhotos = [
  "/photos/content/kuche3e.jpg",
  "/photos/content/raume8b.jpg",
  "/photos/content/hero-content.jpg",
  "/photos/content/wand3.jpg",
  "/photos/content/img4262.jpg",
  "/photos/content/raum3.jpg",
  "/photos/content/img5486.jpg",
  "/photos/content/img1250.jpg",
  "/photos/content/boden6.jpg",
  "/photos/content/img9228.jpg",
  "/photos/content/14.jpg",
  "/photos/content/raum2.jpg",
] as const;

export const galleryLayout = [
  { key: "kitchen", src: "/photos/content/kuche3e.jpg", span: "lg" },
  { key: "office", src: "/photos/content/off4.jpg", span: "sm" },
  { key: "hallway", src: "/photos/content/raum2.jpg", span: "sm" },
  { key: "bathroom", src: "/photos/content/bade4.jpg", span: "md" },
  { key: "living", src: "/photos/content/raume8b.jpg", span: "md" },
] as const;

export type ProjectCategoryId = "kitchen" | "bathroom" | "office" | "floor" | "walls";
export type ProjectFilterId = "all" | ProjectCategoryId;

export const projectFilters: ProjectFilterId[] = [
  "all",
  "kitchen",
  "bathroom",
  "office",
  "floor",
  "walls",
];

export const projects = [
  {
    id: "patriarshi",
    year: "2025",
    area: "186 m²",
    category: "kitchen" as const,
    image: "/photos/content/kuche3e.jpg",
    gallery: [
      "/photos/content/kuche3e.jpg",
      "/photos/content/img5184.jpg",
      "/photos/content/img5186.jpg",
      "/photos/content/kuche2.jpg",
      "/photos/content/wand3.jpg",
    ],
  },
  {
    id: "barvikha",
    year: "2024",
    area: "420 m²",
    category: "floor" as const,
    image: "/photos/content/boden6.jpg",
    gallery: [
      "/photos/content/boden6.jpg",
      "/photos/content/9.jpg",
      "/photos/content/14.jpg",
      "/photos/content/19.jpg",
      "/photos/content/boden5.jpg",
      "/photos/content/boden7.jpg",
      "/photos/content/boden8.jpg",
      "/photos/content/img0996.jpg",
      "/photos/content/img7641.jpg",
      "/photos/content/img9195.jpg",
      "/photos/content/img9228.jpg",
      "/photos/content/off.jpg",
      "/photos/content/off4.jpg",
      "/photos/content/off6.jpg",
      "/photos/content/off7.jpg",
      "/photos/content/raum1.jpg",
      "/photos/content/raum4.jpg",
      "/photos/content/raume6.jpg",
      "/photos/content/raume8.jpg",
      "/photos/content/wand4.jpg",
      "/photos/content/wand6.jpg",
      "/photos/content/wand7.jpg",
    ],
  },
  {
    id: "city",
    year: "2025",
    area: "240 m²",
    category: "walls" as const,
    image: "/photos/content/wand5.jpg",
    gallery: [
      "/photos/content/wand5.jpg",
      "/photos/content/9.jpg",
      "/photos/content/raum3.jpg",
      "/photos/content/off7.jpg",
      "/photos/content/14.jpg",
      "/photos/content/wand3.jpg",
      "/photos/content/boden7.jpg",
      "/photos/content/kuche.jpg",
      "/photos/content/raum1.jpg",
      "/photos/content/off.jpg",
      "/photos/content/19.jpg",
      "/photos/content/wand.jpg",
      "/photos/content/off4.jpg",
      "/photos/content/boden3.jpg",
      "/photos/content/raum2.jpg",
      "/photos/content/img5186.jpg",
      "/photos/content/raume5.jpg",
      "/photos/content/off6.jpg",
      "/photos/content/wand03.jpg",
      "/photos/content/raum5.jpg",
      "/photos/content/wand4.jpg",
      "/photos/content/img9228.jpg",
    ],
  },
  {
    id: "ostozhenka",
    year: "2024",
    area: "92 m²",
    category: "office" as const,
    image: "/photos/content/off7.jpg",
    gallery: [
      "/photos/content/off7.jpg",
      "/photos/content/9.jpg",
      "/photos/content/19.jpg",
      "/photos/content/boden3.jpg",
      "/photos/content/off.jpg",
      "/photos/content/off4.jpg",
      "/photos/content/off6.jpg",
      "/photos/content/raum3.jpg",
      "/photos/content/raum6.jpg",
      "/photos/content/raume5.jpg",
      "/photos/content/wand4.jpg",
    ],
  },
  {
    id: "frunzenskaya",
    year: "2023",
    area: "128 m²",
    category: "bathroom" as const,
    image: "/photos/content/bade4.jpg",
    gallery: [
      "/photos/content/bade4.jpg",
      "/photos/content/bade2.jpg",
      "/photos/content/raum6.jpg",
    ],
  },
] as const;

export type ProjectId = (typeof projects)[number]["id"];
