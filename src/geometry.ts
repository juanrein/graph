/**
 * geometry related structures and functions
 */

export interface Point {
    x: number;
    y: number;
}

export interface Circle {
    point: Point;
    radius: number;
}

export interface EdgeText {
    text: string;
    point: Point;
}

export function middle(line: Line): Point {
    return {
        x: (line.x1 + line.x2)/2.0,
        y: (line.y1 + line.y2)/2.0
    }
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

/**
 * Direct line between centers of circles excluding parts that are inside circles
 */
export function getLineBetween(circle1: Circle, circle2: Circle): Line {
    let x1 = circle1.point.x;
    let y1 = circle1.point.y;
    let x2 = circle2.point.x;
    let y2 = circle2.point.y;
    let radius1 = circle1.radius;
    let radius2 = circle2.radius;

    let dx1 = x2 - x1;
    let dy1 = y2 - y1;

    let dx2 = x1 - x2;
    let dy2 = y1 - y2;

    let len1 = Math.sqrt(dx1*dx1 + dy1*dy1);   
    let len2 = Math.sqrt(dx2*dx2 + dy2*dy2);   

    let dx1n = dx1 / len1;
    let dy1n = dy1 / len1;
    
    let dx2n = dx2 / len2;
    let dy2n = dy2 / len2;

    return {
        x1: x1 + dx1n * radius1,
        y1: y1 + dy1n * radius1,
        x2: x2 + dx2n * radius2,
        y2: y2 + dy2n * radius2
    };
}