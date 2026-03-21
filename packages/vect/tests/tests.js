import Vect from "../index.js";

const { module, test } = QUnit

module("Vect");

test("Création d'un vecteur", assert => {
    
    const vect = new Vect(2,5);

    assert.expect(2);
    assert.ok(vect instanceof Vect,"instance de Vect");
    assert.ok(vect instanceof Vect.prototype.constructor,"instance de Point");
});

test("Longueur d'un vecteur", assert => {
    
    const vect = new Vect(5,5);

    assert.expect(1);
    
    assert.equal( Math.round(vect.length()) , 7 ,"longueur de vect");
});