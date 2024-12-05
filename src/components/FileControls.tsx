import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import { savePolygons, loadPolygonData } from '../utils/fileHandlers';
import { Polygon } from '@/types';


interface FileControlsProps {
    setPolygons: React.Dispatch<React.SetStateAction<Polygon[]>>;
    polygons: Polygon[];
    setCurrentPolygonIndex: (index: number) => void;
}

const FileControls = ({ setPolygons, polygons, setCurrentPolygonIndex }: FileControlsProps) => {
    const handleLoad = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const newPolygons = await loadPolygonData(file);
                setPolygons((prev) => [...prev, ...newPolygons]);
                const finalIndex = polygons.length + newPolygons.length - 1;
                setCurrentPolygonIndex(finalIndex);
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
    };

    const handleSave = () => {
        savePolygons(polygons);
    }

    return (
        <div className="flex gap-4 mb-4">
            <div className="flex-1">
                <Input type="file" onChange={handleLoad} accept=".json" className="mb-4" />
            </div>
            {polygons.length > 0 && (
                <Button onClick={handleSave} variant="outline" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Сохранить контур
                </Button>
            )}
        </div>
    );
};

export default FileControls;
