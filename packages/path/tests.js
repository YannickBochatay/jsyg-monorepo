import Path from "@jsyg/path";

const { module, test } = QUnit

module("JSYG.Path");

test("Création d'un chemin", assert => {     

    var path = new Path();
    path.moveTo(0,0).lineTo(30,50).lineTo(80,80);
    
    assert.equal( path.nbSegs(), 3 ,"nombre de segments");
});