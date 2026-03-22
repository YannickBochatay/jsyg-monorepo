import StdConstruct from "@jsyg/stdconstruct";

const { module, test } = QUnit

module("StdConstruct");

test("Gestion des fonction standard", assert => {     
    
    var obj = new StdConstruct();
    
    obj.enable();
    
    assert.expect(2);
    
    assert.equal(obj.enabled, true, "activation du plugin");
    
    assert.equal(typeof obj.on, "function", "héritage de Events");
});
