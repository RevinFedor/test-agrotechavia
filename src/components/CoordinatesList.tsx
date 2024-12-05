import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Binary } from 'lucide-react';
import { Polygon } from '@/types';


interface CoordinatesListProps {
    polygons: Polygon[];
    currentPolygonIndex: number;
    setCurrentPolygonIndex: (index: number) => void;
}

const CoordinatesList = ({ polygons, currentPolygonIndex, setCurrentPolygonIndex }: CoordinatesListProps) => {
    return (
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
                        {polygons[0].coordinates.map((coord, idx) => (
                            <li key={idx}>
                                {coord[0].toFixed(6)}, {coord[1].toFixed(6)}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};

export default CoordinatesList;
