const EARTH_RADIUS = 6371000; // радиус Земли в метрах
const METERS_PER_DEGREE = 111319.9; // приблизительное количество метров в одном градусе

type Coordinates = [number, number];

// Вычисляет площадь полигона на сферической поверхности Земли через гаверсинусы
export const calculateArea = (coordinates: Coordinates[]): number => {
    let area = 0;

    if (coordinates.length < 3) return 0;

    for (let i = 0; i < coordinates.length; i++) {
        const j = (i + 1) % coordinates.length;
        const p1 = coordinates[i];
        const p2 = coordinates[j];

        const phi1 = (p1[0] * Math.PI) / 180;
        const phi2 = (p2[0] * Math.PI) / 180;
        const deltaPhi = ((p2[0] - p1[0]) * Math.PI) / 180;
        const deltaLambda = ((p2[1] - p1[1]) * Math.PI) / 180;

        const a =
            Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = EARTH_RADIUS * c;

        area += d;
    }

    return Math.abs(area);
};

// Вычисляет периметр полигона умножая разницу координат на количество метров в одном градусе.

export const calculatePerimeter = (coordinates: Coordinates[]): number => {
    let totalPerimeter = 0;

    for (let i = 0; i < coordinates.length; i++) {
        const j = (i + 1) % coordinates.length;
        const p1 = coordinates[i];
        const p2 = coordinates[j];

        const latDiff = p2[0] - p1[0];
        const lonDiff = p2[1] - p1[1];
        const dist = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * METERS_PER_DEGREE;

        totalPerimeter += dist;
    }

    return totalPerimeter;
};
