
  import { Polygon as LeafletPolygon } from 'leaflet';

export interface Polygon {
    id: number;
    layer: LeafletPolygon; 
    coordinates: [number, number][]; 
    area: number;
    perimeter: number;
}

