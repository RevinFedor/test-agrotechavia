import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map as MapIcon } from 'lucide-react';
import { FeatureGroup as LeafletFeatureGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import { Polygon } from '@/types';
import PolygonDetails from './components/PolygonDetails';
import MapComponent from './components/MapComponent';
import FileControls from './components/FileControls';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    const [polygons, setPolygons] = useState<Polygon[]>([]);
    const [currentPolygonIndex, setCurrentPolygonIndex] = useState(0);
    const featureGroupRef = useRef<LeafletFeatureGroup>(null);

    useEffect(() => {
        if (featureGroupRef.current) {
            featureGroupRef.current.clearLayers();
            polygons.forEach((polygon) => {
                if (polygon.layer && featureGroupRef.current) {
                    try {
                        polygon.layer.addTo(featureGroupRef.current);
                    } catch (error) {
                        console.error('Ошибка при добавлении слоя:', error);
                    }
                }
            });
        }
    }, [polygons]);

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapIcon className="h-6 w-6" />
                        Веб-приложение для обозначения границ поля на карте
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <FileControls 
                        setPolygons={setPolygons} 
                        polygons={polygons} 
                        setCurrentPolygonIndex={setCurrentPolygonIndex} 
                    />
                    <ErrorBoundary message="Ошибка при работе с картой">
                        <MapComponent
                            polygons={polygons}
                            setPolygons={setPolygons}
                            setCurrentPolygonIndex={setCurrentPolygonIndex}
                            featureGroupRef={featureGroupRef}
                        />
                    </ErrorBoundary>

                    {polygons.length > 0 && (
                        <ErrorBoundary message="Ошибка при отображении информации о полигоне">
                            <PolygonDetails
                                polygons={polygons}
                                currentPolygonIndex={currentPolygonIndex}
                                setCurrentPolygonIndex={setCurrentPolygonIndex}
                                featureGroupRef={featureGroupRef}
                            />
                        </ErrorBoundary>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default App;