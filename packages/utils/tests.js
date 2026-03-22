import $ from "@jsyg/utils";

const { module, test } = QUnit

module("jsyg-utils", () => {

    test("Dimensions d'un élement", function(assert) {

        var container = $("#qunit-fixture");
        
        var svg = $('<svg width="500" height="500">').appendTo(container);
        var rect = $('<rect>').attr({width:200,height:200,x:50,y:50}).appendTo(svg);
                
        var dimRect = rect.getDim();
        
        assert.equal(svg.attr("width"),"500","largeur");
        assert.equal(svg.attr("height"),"500","hauteur");
        
        svg.width(400);
        assert.equal(svg.attr("width"),"400px","largeur par l'attribut");
        assert.equal(svg.css("width"),"400px","largeur par css");
        assert.equal(svg.getDim().width,400,"largeur par la méthode getDim");
        
        svg.height(400);
        assert.equal(svg.attr("height"),"400px","hauteur par l'attribut");
        assert.equal(svg.css("height"),"400px","hauteur par css");
        assert.equal(svg.getDim().height,400,"hauteur par la méthode getDim");
        
        
        svg.css("width","550px");
        assert.equal(svg.attr("width"),"550px","largeur par attribut");
        assert.equal(svg.css("width"),"550px","largeur par css");
        assert.equal(svg.getDim().width,550,"largeur par la méthode getDim");
        
        svg.css("height","550px");
        assert.equal(svg.attr("height"),"550px","hauteur par l'attribut");
        assert.equal(svg.css("height"),"550px","hauteur par css");
        assert.equal(svg.getDim().height,550,"hauteur par la méthode getDim");
        
        svg.setDim("width",600);
        assert.equal(svg.attr("width"),"600px","largeur par l'attribut");
        assert.equal(svg.css("width"),"600px","largeur par css");
        assert.equal(svg.getDim().width,600,"largeur par la méthode getDim");
        
        svg.setDim("height",600);
        assert.equal(svg.attr("height"),"600px","hauteur par l'attribut");
        assert.equal(svg.css("height"),"600px","hauteur par css");
        assert.equal(svg.getDim().height,600,"hauteur par la méthode getDim");
        
        assert.equal(svg.parent()[0],container[0],"hierarchie DOM");
        
        assert.ok(svg.isSVG(),"reconnaissance d'un élément SVG");
        assert.ok(rect.isSVG(),"reconnaissance d'un élément SVG");
                
        assert.equal(dimRect.x,50,"abcisse");
        assert.equal(dimRect.y,50,"ordonnée");
        
        rect.setDim({
            width:20,
            height:30,
            x:0,
            y:0
        });
        
        dimRect = rect.getDim();
        
        assert.equal(dimRect.x,0,"abcisse");
        assert.equal(dimRect.width,20,"ordonnée");
    });
    
    test("ViewBox", function(assert) {

        var container = $("#qunit-fixture");

        var svg = $('<svg width="500" height="400">').appendTo(container);
        
        assert.deepEqual(svg.viewBox(),{x:0,y:0,width:500,height:400},"Récupération de la viewbox");
        
        assert.deepEqual(
            svg.viewBox({x:50,y:50,width:1000,height:80}).viewBox(),
            {x:50,y:50,width:1000,height:80},
            "Modification de la viewbox"
        );
        
    });

    test("getMtx", function(assert) {
        var container = $("#qunit-fixture");

        var svg = $('<svg width="500" height="400">').appendTo(container);
        var innerSvg = $('<svg x="10" y="10" width="100" height="100">').appendTo(svg);
        var mtx = innerSvg.getMtx(svg)

        assert.equal(mtx.e,0,"Récupération de la translation horizontale d'un svg inclus dans un svg");
        assert.equal(mtx.f,0,"Récupération de la translation verticale d'un svg inclus dans un svg");
    })
    
    test("strutils", function(assert) {
    
        assert.ok( $.urlencode(" "), "%20", "Encodage d'url" );        
    });
});
