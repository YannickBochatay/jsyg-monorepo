import Point from "@jsyg/point";

/**
 * Vector constructor
 * Can accept an object with x and y properties as argument.
 * @param x abscissa
 * @param y ordinate
 * @returns {Vect}
 * @link http://www.w3.org/TR/SVG/coords.html#InterfaceSVGPoint
 */
export default function Vect(x,y) {
    
    Point.apply(this,arguments);
}

Vect.prototype = new Point(0,0);

Vect.prototype.constructor = Vect;

/**
 * Vector length
 * @returns {Number}
 */
Vect.prototype.length = function() { return Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2) ); };

/**
 * Normalizes the vector
 * @returns {Vect} new instance of Vect
 */
Vect.prototype.normalize = function() {
    var length = this.length();
    return new Vect( this.x / length,this.y / length );
};

/**
 * Combines two vectors
 * @returns {Vect} new instance of Vect
 */
Vect.prototype.combine = function(pt,ascl,bscl) {
    return new Vect(
        (ascl * this.x) + (bscl * pt.x),
        (ascl * this.y) + (bscl * pt.y)
);
};

/**
 * Returns the dot product of two vectors
 * @param vect instance of Vect or any object with x and y properties.
 * @returns {Number}
 */
Vect.prototype.dot = function(vect) { return (this.x * vect.x) + (this.y * vect.y); };