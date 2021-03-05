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

export function topOfCurve(curve: Curve): Point {
    return {
        x: (curve.cp1x + curve.cp2x) / 2,
        y: (curve.cp1y + curve.cp2y) / 2
    }
}

export enum ConnectorType {
    Curve, Line
}

export interface Line {
    type: ConnectorType;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}



export interface Curve {
    type: ConnectorType;
    x1: number;
    y1: number;
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    x2: number;
    y2: number;
}


export type Connector =
    | Line
    | Curve

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

function degreeToRadian(degree: number) {
    return degree * (Math.PI / 180);
}

export function getCurve(circle: Circle): Curve {
    let {point:{x,y}, radius} = circle;
    return {
        type: ConnectorType.Curve,
        x1: x + radius * Math.cos(degreeToRadian(-5)),
        y1: y + radius * Math.sin(degreeToRadian(-5)),
        cp1x: x + 2 * radius,
        cp1y: y - radius,
        cp2x: x + 2 * radius,
        cp2y: y + radius,
        x2: x + radius * Math.cos(degreeToRadian(5)),
        y2: y + radius * Math.sin(degreeToRadian(5))
    }
    
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
        type: ConnectorType.Line,
        x1: x1 + dx1n * radius1,
        y1: y1 + dy1n * radius1,
        x2: x2 + dx2n * radius2,
        y2: y2 + dy2n * radius2
    };
}