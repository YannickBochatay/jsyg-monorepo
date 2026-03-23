import Draggable from "@jsyg/draggable";

const { module, test } = QUnit

module("draggable");

test("Constructeur", assert => {
    
    const drag = new Draggable();

    assert.expect(1);
    
    assert.equal(drag.type,"attributes","abcisse");
});
