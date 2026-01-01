export interface Camera {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  previewUrl: string;
  streamUrl?: string;
  status: 'online' | 'offline';
}