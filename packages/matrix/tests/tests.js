import Matrix from "../index.js";

const { module, test } = QUnit

module("Matrix");

test("Création d'une matrice", assert => {     

    var mtx = new Matrix();
    
    assert.expect(6);
    assert.equal(mtx.a,1,"a");
    assert.equal(mtx.b,0,"b");
    assert.equal(mtx.c,0,"c");
    assert.equal(mtx.d,1,"d");
    assert.equal(mtx.e,0,"e");
    assert.equal(mtx.f,0,"f");
});

    test("Translation", assert => {     

    var mtx = new Matrix();
    
    mtx = mtx.translate(5,10);
    
    assert.expect(2);
    assert.equal(mtx.e,5,"x");
    assert.equal(mtx.f,10,"y");
});

test("Scale", assert => {     

    var mtx = new Matrix();
    
    mtx = mtx.scale(2);
    
    assert.expect(2);
    assert.equal(mtx.a,2,"scale x");
    assert.equal(mtx.d,2,"scale y");
});
