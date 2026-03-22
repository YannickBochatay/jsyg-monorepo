import Point from "@jsyg/point";

const { module, test } = QUnit;

module("Point");

const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');

test("Création d'un point", assert => {

    const point = new Point(5,10);

    assert.expect(2);
    assert.equal(point.x,5,"abcisse");
    assert.equal(point.y,10,"ordonnée");
});

test("Translation d'un point", assert => {

    let point = new Point(5,10);
    const mtx = svg.createSVGMatrix();

    mtx.e = 5;
    mtx.f = 10;

    point = point.mtx(mtx);

    assert.expect(2);
    assert.equal(point.x,10,"abcisse");
    assert.equal(point.y,20,"ordonnée");

});

test("Echelle d'un point", assert => {

    let point = new Point(5,10);
    const mtx = svg.createSVGMatrix();

    mtx.a = 2;
    mtx.d = 2;

    point = point.mtx(mtx);

    assert.expect(2);
    assert.equal(point.x,10,"abcisse");
    assert.equal(point.y,20,"ordonnée");
});


test("Transformation en chaine", assert => {
    
    const point = new Point(5,10);

    assert.equal(point.toString(), '{"x":5,"y":10}', "Méthode toString" );
    assert.equal(point.toJSON(), '{"x":5,"y":10}', "Méthode toJSON" );
});
