export const noteTranslations: Record<string, string> = {
  // Meyveler
  "Pear": "Armut",
  "Lemon": "Limon",
  "Bergamot": "Bergamot",
  "Orange Blossom": "Portakal Çiçeği",
  "Candied Almond": "Şekerli Badem",

  // Çiçekler
  "Lavender": "Lavanta",
  "Violet": "Menekşe",
  "Iris": "İris",

  // Baharatlar
  "Mint": "Nane",
  "Cinnamon": "Tarçın",
  "Cardamom": "Kakule",
  "Caraway": "Kimyon",

  // Otlar ve Yeşillikler
  "Clary Sage": "Ada Çayı",

  // Reçineler ve Balsam
  "Amber": "Amber",
  "elemi": "Elemi",

  // Odunlar
  "Cedar": "Sedir",
  "Sandalwood": "Sandal Ağacı",
  "Patchouli": "Paçuli",
  "Guaiac Wood": "Guaiac Ağacı",
  "Virginia Cedar": "Virginia Sediri",
  "Papyrus": "Papirüs",

  // Tatlı Notalar
  "Black Vanilla Husk": "Siyah Vanilya Kabuğu",
  "Bourbon Vanilla": "Bourbon Vanilyası",
  "Praline": "Pralin",
  "Tonka": "Tonka",

  // Misk ve Hayvansal Notalar
  "Musk": "Misk",
  "Leather": "Deri",

  // Sentetik / Modern Notalar
  "Ambroxan": "Ambroxan"
};

export function translateNote(note: string): string {
  return noteTranslations[note] || note;
}
