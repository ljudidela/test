import { Camera } from '../types';

export const cameras: Camera[] = [
  {
    id: '1',
    title: 'Морской порт',
    location: 'Центральный район',
    coordinates: [43.5806, 39.7191],
    thumbnail: 'https://images.unsplash.com/photo-1565625434690-092523298c7d?q=80&w=600&auto=format&fit=crop',
    isLive: true,
    views: 1240
  },
  {
    id: '2',
    title: 'Роза Хутор, Ратуша',
    location: 'Красная Поляна',
    coordinates: [43.6712, 40.2974],
    thumbnail: 'https://images.unsplash.com/photo-1612456225451-bb8d10d0131d?q=80&w=600&auto=format&fit=crop',
    isLive: true,
    views: 856
  },
  {
    id: '3',
    title: 'Олимпийский парк',
    location: 'Сириус',
    coordinates: [43.4044, 39.9545],
    thumbnail: 'https://images.unsplash.com/photo-1575276369206-8e547343d3b7?q=80&w=600&auto=format&fit=crop',
    isLive: false,
    views: 3200
  },
  {
    id: '4',
    title: 'Пляж Ривьера',
    location: 'Центральный район',
    coordinates: [43.5867, 39.7135],
    thumbnail: 'https://images.unsplash.com/photo-1596306499300-0b7b1689b9e6?q=80&w=600&auto=format&fit=crop',
    isLive: true,
    views: 543
  },
  {
    id: '5',
    title: 'Скайпарк',
    location: 'Ахштырское ущелье',
    coordinates: [43.5248, 39.9954],
    thumbnail: 'https://images.unsplash.com/photo-1544473244-f6895e672d1a?q=80&w=600&auto=format&fit=crop',
    isLive: true,
    views: 99
  },
  {
    id: '6',
    title: 'ЖД Вокзал',
    location: 'Адлер',
    coordinates: [43.4485, 39.9118],
    thumbnail: 'https://images.unsplash.com/photo-1530272638848-2616d0004128?q=80&w=600&auto=format&fit=crop',
    isLive: false,
    views: 412
  }
];