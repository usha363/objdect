
export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface DetectedItem {
  id: string;
  name: string;
  category: 'clothing' | 'footwear' | 'accessory' | 'other';
  confidence: number;
  color?: string;
  description: string;
  boundingBox: BoundingBox;
}

export interface AnalysisResult {
  items: DetectedItem[];
  summary: string;
  timestamp: string;
  imageUrl: string;
}

export enum AppRoute {
  Landing = '/',
  Dashboard = '/dashboard',
  History = '/history'
}
