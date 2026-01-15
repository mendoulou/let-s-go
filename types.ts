
export enum View {
  HOME = 'HOME',
  TRACKING = 'TRACKING',
  DISCOVERY = 'DISCOVERY',
  COMMUNITY = 'COMMUNITY',
  PUBLISH = 'PUBLISH',
  SETTINGS = 'SETTINGS',
  ROUTE_DETAIL = 'ROUTE_DETAIL',
  REPORTS = 'REPORTS'
}

export interface UserStats {
  progress: number;
  distance: number;
  time: string;
  calories: string;
}

export interface Route {
  id: string;
  name: string;
  surface: string;
  rating: number;
  distance: string;
  elevation: string;
  difficulty: string;
  isFavorite: boolean;
  image?: string;
}
