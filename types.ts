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

export interface NearbyPlace {
  id: string;
  name: string;
  category: string; // 'Shopping' | 'Food' | 'Service' | 'Health'
  distance: string;
  address: string;
  image: string;
  googleMapsLink: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum View {
  HOME = 'HOME',
  RULES = 'RULES',
  ASSISTANT = 'ASSISTANT',
  NEARBY = 'NEARBY'
}