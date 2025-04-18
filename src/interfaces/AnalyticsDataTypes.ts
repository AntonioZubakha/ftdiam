export interface ButtonClickCount {
  id: string;
  name: string;
  clicks: number;
}

export interface VisitorCount {
  total: number;
  unique: number;
}

export interface AdminPageData {
  visitorStats: VisitorCount;
  buttonClicks: ButtonClickCount[];
} 