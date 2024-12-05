import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { isPointInPolygon } from '../utils/polygonUtils';
import { Polygon } from '@/types';
import L, { FeatureGroup, Marker, DivIcon } from 'leaflet';

interface PointCheckerProps {
    polygon: Polygon;
    featureGroupRef: React.RefObject<FeatureGroup>;
}

const PointChecker: React.FC<PointCheckerProps> = ({ polygon, featureGroupRef }) => {
    const [pointInput, setPointInput] = useState<string>('');
    const [pointResult, setPointResult] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [tempMarker, setTempMarker] = useState<Marker | null>(null);

    const handleCheckPoint = () => {
        try {
            const [lat, lng] = pointInput.split(',').map((n) => parseFloat(n.trim()));
            const result = isPointInPolygon([lat, lng], polygon.coordinates);
            setPointResult(result ? 'внутри полигона' : 'вне полигона');

            if (tempMarker && featureGroupRef.current) {
                featureGroupRef.current.removeLayer(tempMarker);
            }

            const marker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="
                        width: 10px;
                        height: 10px;
                        background-color: ${result ? '#22c55e' : '#ef4444'};
                        border: 2px solid white;
                        border-radius: 50%;
                        box-shadow: 0 0 4px rgba(0,0,0,0.4);
                    "></div>`,
                }) as DivIcon
            });

            if (featureGroupRef.current) {
                marker.addTo(featureGroupRef.current);
                setTempMarker(marker);
            }

            setIsDialogOpen(true);
        } catch (error) {
            console.error('Ошибка при проверке точки:', error);
            setPointResult('Неверный формат координат');
            setIsDialogOpen(true);
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        if (tempMarker && featureGroupRef.current) {
            featureGroupRef.current.removeLayer(tempMarker);
            setTempMarker(null);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Проверка точки</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2">
                        <Input 
                            value={pointInput} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                setPointInput(e.target.value)
                            } 
                            placeholder="Введите координаты (lat, lng)" 
                        />
                        <Button onClick={handleCheckPoint}>Проверить</Button>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Результат проверки</DialogTitle>
                    </DialogHeader>
                    {pointResult && (
                        <Alert variant={pointResult === 'внутри полигона' ? 'default' : 'destructive'}>
                            <AlertDescription>Точка находится {pointResult}</AlertDescription>
                        </Alert>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PointChecker;