export interface Parfume {
  marka: string;
  adi: string;
  cinsiyet: 'Erkek' | 'Kadın' | 'Unisex';
  idealSezon: 'Yazlık' | 'Kışlık' | '4 Mevsim' | 'İlkbahar-Yaz';
  kisaAciklama: string;
  notalar: string[];
  ustNota?: string[];
  ortaNota?: string[];
  altNota?: string[];
}
