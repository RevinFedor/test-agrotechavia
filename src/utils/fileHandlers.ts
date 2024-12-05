import { Polygon } from '@/types';
import L, { Polygon as LeafletPolygon } from 'leaflet';

interface PolygonData {
    coordinates: [number, number][];
    area: number;
    perimeter: number;
}

interface GeoJSONFeature {
    type: 'Feature';
    properties: Record<string, unknown>;
    geometry: {
        type: 'Polygon';
        coordinates: number[][][];
    };
}

export const savePolygons = (polygons: Polygon[]): void => {
    if (polygons.length > 0) {
        const data: PolygonData[] = polygons.map((polygon) => ({
            coordinates: polygon.coordinates,
            area: polygon.area,
            perimeter: polygon.perimeter,
        }));

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'polygons.json';
        a.click();
        URL.revokeObjectURL(url);
    }
};

export const loadPolygonData = async (file: File): Promise<Polygon[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                const result = e.target?.result;
                if (typeof result !== 'string') {
                    throw new Error('Неверный формат файла');
                }

                const data = JSON.parse(result) as PolygonData | PolygonData[];
                let newPolygons: Polygon[] = [];

                const createPolygonLayer = (coords: [number, number][]): LeafletPolygon => {
                    const geoJSON: GeoJSONFeature = {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coords.map((coord) => [coord[1], coord[0]])],
                        },
                    };
                    const geoJSONLayer = L.geoJSON(geoJSON);
                    const polygonLayer = geoJSONLayer.getLayers()[0] as LeafletPolygon;
                    return polygonLayer;
                };

                if (Array.isArray(data)) {
                    newPolygons = data.map(
                        (polygonData: PolygonData): Polygon => ({
                            id: Date.now() + Math.random(),
                            layer: createPolygonLayer(polygonData.coordinates),
                            coordinates: polygonData.coordinates,
                            area: polygonData.area,
                            perimeter: polygonData.perimeter,
                        })
                    );
                } else if ('coordinates' in data) {
                    newPolygons = [
                        {
                            id: Date.now(),
                            layer: createPolygonLayer(data.coordinates),
                            coordinates: data.coordinates,
                            area: data.area,
                            perimeter: data.perimeter,
                        },
                    ];
                }

                resolve(newPolygons);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => reject(new Error('Ошибка чтения файла'));
        reader.readAsText(file);
    });
};
