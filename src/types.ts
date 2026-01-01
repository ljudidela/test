export interface Camera {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number];
  thumbnail: string;
  streamUrl?: string;
  isLive: boolean;
  views: number;
}