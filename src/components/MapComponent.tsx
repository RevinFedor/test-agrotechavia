import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { mapConfig } from '../config/mapConfig';
import { calculateArea, calculatePerimeter } from '../utils/calculations';
import { Polygon } from '@/types';
import { Polygon as LeafletPolygon, FeatureGroup as LeafletFeatureGroup, LatLng } from 'leaflet';
import { memo, useCallback } from 'react';


interface CreateEvent {
    layer: LeafletPolygon;
    layerType: string;
}

interface EditEvent {
    layers: {
        eachLayer: (callback: (layer: LeafletPolygon) => void) => void;
    };
}
interface MapComponentProps {
    polygons: Polygon[];
    setPolygons: React.Dispatch<React.SetStateAction<Polygon[]>>;
    setCurrentPolygonIndex: (index: number) => void;

    featureGroupRef: React.RefObject<LeafletFeatureGroup>;
}

const MapComponent = ({ polygons, setPolygons, setCurrentPolygonIndex, featureGroupRef }: MapComponentProps) => {
 
    const handleCreated = useCallback((e: CreateEvent) => {
        const layer = e.layer;
        const latLngs = layer.getLatLngs()[0] as LatLng[];
        const coords = latLngs.map((latLng) => [latLng.lat, latLng.lng] as [number, number]);

        const areaInSqMeters = calculateArea(coords);
        const totalPerimeter = calculatePerimeter(coords);

        const newPolygon: Polygon = {
            id: Date.now(),
            layer: layer,
            coordinates: coords,
            area: areaInSqMeters / 10000,
            perimeter: totalPerimeter,
        };

        setPolygons((prev) => [...prev, newPolygon]);
        setCurrentPolygonIndex(polygons.length);
    }, [polygons.length, setPolygons, setCurrentPolygonIndex]);

    const handleEdited = useCallback((e: EditEvent) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            const latLngs = layer.getLatLngs()[0] as LatLng[];
            const coords = latLngs.map((latLng) => [latLng.lat, latLng.lng] as [number, number]);

            setPolygons((prev) =>
                prev.map((polygon) => {
                    if (polygon.layer === layer) {
                        return {
                            ...polygon,
                            coordinates: coords,
                            area: calculateArea(coords) / 10000,
                            perimeter: calculatePerimeter(coords),
                        };
                    }
                    return polygon;
                })
            );
        });
    }, [setPolygons]);

    const handleDeleted = useCallback((e: EditEvent) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            setPolygons((prev) => prev.filter((polygon) => polygon.layer !== layer));
        });
    }, [setPolygons]);

 
    const drawOptions = mapConfig.drawOptions;

    return (
        <div className="h-96 mb-4 rounded-lg overflow-hidden border">
            <MapContainer center={mapConfig.center} zoom={mapConfig.zoom} className="h-full">
                <TileLayer url={mapConfig.tileLayer.url} attribution={mapConfig.tileLayer.attribution} />
                <FeatureGroup ref={featureGroupRef}>
                    <EditControl
                        position="topright"
                        onCreated={handleCreated}
                        onDeleted={handleDeleted}
                        onEdited={handleEdited}
                        draw={drawOptions}
                    />
                </FeatureGroup>
            </MapContainer>
        </div>
    );
};

export default memo(MapComponent);
