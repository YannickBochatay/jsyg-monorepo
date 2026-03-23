import JSYG from "@jsyg/core";
import ZoomAndPan from "@jsyg/zoomandpan";

const container = new JSYG("#content");

const zap = new ZoomAndPan(container);

zap.scaleMin = 0.1;
zap.resizable.keepViewBox = false;
zap.resizable.keepRatio = false;
zap.overflow = "auto";
                
zap.enable();

zap.marqueeZoom.on("end",function() {
    zap.marqueeZoom.disable(); 
    zap.mousePan.enable();
});

zap.mousePan.enable();
zap.mouseWheelZoom.enable();

zap.resizable.enable();

zap.cookie.read();
zap.cookie.remove();

new JSYG("form").trigger("reset");

new JSYG("[name=overflow]").on("change",function() {
    if (this.checked) zap.overflow = this.value;
});

new JSYG("[name=marqueeZoom]").on("click",function() {
    zap.mousePan.disable();
    zap.marqueeZoom.enable();
});

new JSYG("[name=resetZoom]").on("click",function() {
    zap.scaleTo(1);
});

new JSYG("[name=fitToCanvas]").on("click",function() {
    zap.fitToCanvas();
});

new JSYG("[name=fitToWidth]").on("click",function() {
    zap.fitToWidth();
});

new JSYG("[name=fitToHeight]").on("click",function() {
    zap.fitToHeight();
});

new JSYG("[name=cookie]").on("change",function() {
    zap.cookie[ (this.checked ? "en" : "dis") + "able" ]();
});