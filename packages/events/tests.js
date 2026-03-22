import Events from "@jsyg/events";

const { module, test } = QUnit

module("Events");

test("Manipulation des événements", assert => {     
    
    let cpt = 0;
    
    const events = new Events();
    
    function incremente() { cpt++; }
    
    events.ontest = null;
    
    assert.expect(4);
    
    events.on("test",incremente);
    events.trigger("test");
    assert.equal(cpt,1,"Déclenchement de l'événement");
    
    events.on("test",incremente);
    events.trigger("test");
    assert.equal(cpt,2,"Non prise en compte des doublons");
    
    events.off("test",incremente);
    events.trigger("test");
    assert.equal(cpt,2,"Suppression d'un événement");
    
    events.one("test",incremente);
    events.trigger("test");
    events.trigger("test");
    events.trigger("test");
    assert.equal(cpt,3,"Méthode one qui retire aussitot l'événement");
    
});