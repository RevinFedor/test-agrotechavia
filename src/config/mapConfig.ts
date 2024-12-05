import { LatLngTuple } from 'leaflet';

interface MapTileLayer {
    url: string;
    attribution: string;
}

interface MapDrawOptions {
    polygon: {
        allowIntersection: boolean;
        drawError: {
            color: string;
            timeout: number;
        };
        shapeOptions: {
            color: string;
        };
    };
    rectangle: boolean;
    circle: boolean;
    circlemarker: boolean;
    marker: boolean;
    polyline: boolean;
}

interface MapConfig {
    center: LatLngTuple;
    zoom: number;
    tileLayer: MapTileLayer;
    drawOptions: MapDrawOptions;
}

export const mapConfig: MapConfig = {
    center: [55.7522, 37.6156], // Москва
    zoom: 10,
    tileLayer: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    drawOptions: {
        polygon: {
            allowIntersection: false,
            drawError: {
                color: '#e1e4e8',
                timeout: 1000,
            },
            shapeOptions: {
                color: '#0969da',
            },
        },
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
    },
};
