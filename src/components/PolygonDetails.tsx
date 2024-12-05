import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Maximize2, Binary } from 'lucide-react';
import PointChecker from './PointChecker';

import { Polygon } from '@/types';
import { FeatureGroup } from 'leaflet';

interface PolygonDetailsProps {
    polygons: Polygon[];
    currentPolygonIndex: number;
    featureGroupRef: React.RefObject<FeatureGroup>;

    setCurrentPolygonIndex: (index: number) => void;
}

const PolygonDetails = ({ polygons, currentPolygonIndex, setCurrentPolygonIndex, featureGroupRef }: PolygonDetailsProps) => {
    const currentPolygon = polygons[currentPolygonIndex];

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Maximize2 className="h-5 w-5" />
                        Информация о поле
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Площадь: {currentPolygon.area.toFixed(2)} га</p>
                    <p>Периметр: {currentPolygon.perimeter.toFixed(2)} м</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Binary className="h-5 w-5" />
                        Координаты вершин
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {polygons.length > 1 ? (
                        <Tabs defaultValue={`polygon-${currentPolygonIndex}`} className="mb-4">
                            <TabsList>
                                {polygons.map((_, index) => (
                                    <TabsTrigger key={index} value={`polygon-${index}`} onClick={() => setCurrentPolygonIndex(index)}>
                                        Полигон {index + 1}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {polygons.map((polygon, index) => (
                                <TabsContent key={index} value={`polygon-${index}`}>
                                    <ul className="space-y-1">
                                        {polygon.coordinates.map((coord, idx) => (
                                            <li key={idx}>
                                                {coord[0].toFixed(6)}, {coord[1].toFixed(6)}
                                            </li>
                                        ))}
                                    </ul>
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <ul className="space-y-1">
                            {currentPolygon.coordinates.map((coord, idx) => (
                                <li key={idx}>
                                    {coord[0].toFixed(6)}, {coord[1].toFixed(6)}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>

            <PointChecker polygon={currentPolygon} featureGroupRef={featureGroupRef} />
        </div>
    );
};

export default PolygonDetails;

