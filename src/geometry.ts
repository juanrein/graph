export interface Point {
    x: number;
    y: number;
}

export interface Circle {
    point: Point;
    radius: number;
}

export interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export function contains(circle: Circle, point: Point): boolean {
    let {point: {x,y},radius} = circle;
    let {x:x2,y:y2} = point;
    return ((x2 - x)*(x2 - x) + (y2 - y)*(y2 - y) <= radius * radius)
}

/**
 * check if circles touch
 */
export function intersects(circleA: Circle, circleB: Circle) {
    let {radius:r1, point: {x:x1,y:y1}} = circleA;
    let {radius:r2, point: {x:x2,y:y2}} = circleB;

    let distance = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    return distance <= r1 + r2;
}

export function getLineBetween(p1: Point, p2: Point): Line {
    let {x,y} = p1;
    let {x:x2, y: y2} = p2;
    return {
        x1: x, 
        y1: y,
        x2: x2,
        y2: y2
    };
}