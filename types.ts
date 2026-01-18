export interface RuleItem {
  id: string;
  text: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  iconName: string;
  allowed: RuleItem[];
  prohibited: RuleItem[];
}

export interface Schedule {
  id: string;
  area: string;
  openTime: string; // Format HH:mm
  closeTime: string; // Format HH:mm
  days: string; // e.g., "Todos os dias" or "Terça a Domingo"
  maintenance?: string;
  image: string;
  description: string;
  specificRules: string[];
}

export interface Professional {
  id: string;
  name: string;
  category: string;
  phone: string;
  rating: number; // 1 to 5
  review: string;
  recommendedBy: string; // Unit or Name
}

export interface NearbyPlace {
  id: string;
  name: string;
  category: string;
  image: string;
  distance: string;
  address: string;
  googleMapsLink: string;
}

export enum View {
  HOME = 'HOME',
  RULES = 'RULES',
  PROFESSIONALS = 'PROFESSIONALS',
  NEARBY = 'NEARBY'
}