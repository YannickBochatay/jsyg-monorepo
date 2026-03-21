const svg = (typeof document != "undefined") && document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg');

export default function Point(x, y) {

  if (typeof x == 'object' && y == null) {
    y = x.y;
    x = x.x;
  }

  this.x = (typeof x == "number") ? x : parseFloat(x);
  this.y = (typeof y == "number") ? y : parseFloat(y);
}

Point.prototype = {

  constructor: Point,

  /**
   * Apply a transformation matrix une matrice de transformation 
   * @param mtx @jsyg/matrix or SVGMatrix instance
   * @returns nouvelle instance
   */
  mtx: function (mtx) {

    if (mtx && typeof mtx == "object" && mtx.mtx) mtx = mtx.mtx;
    if (!mtx) return new Point(this.x, this.y);

    let point = svg.createSVGPoint();
    point.x = this.x;
    point.y = this.y;
    point = point.matrixTransform(mtx);

    return new this.constructor(point.x, point.y);
  },

  /**
   * Returns a native SVGPoint (useful for some native methods such as getCharNumAtPosition).
   */
  toSVGPoint: function () {

    const point = svg.createSVGPoint();
    point.x = this.x;
    point.y = this.y;

    return point;
  },

  toString: function () { return '{"x":' + this.x + ',"y":' + this.y + "}"; },

  toJSON: function () { return this.toString(); }
};
