import FullEditor from "@jsyg/fulleditor";
import $ from "@jsyg/core";

const svgEditor = new FullEditor('svg');

svgEditor.editableShapes = "> *";

svgEditor.enable();

svgEditor.newDocument(500, 500);

svgEditor.enableDropFiles();

svgEditor.enableMouseWheelZoom();

svgEditor.on("load", function () {
  const dim = svgEditor.dimDocument();
  $('#width').val(dim.width);
  $('#height').val(dim.height);
});

const menuBar = document.querySelector("menu-bar");

svgEditor.registerKeyShortCut({
  "ctrl+c": svgEditor.copy,
  "ctrl+x": svgEditor.cut,
  "ctrl+v": svgEditor.paste,
  "ctrl+z": svgEditor.undo,
  "ctrl+y": svgEditor.redo,
  "ctrl+a":svgEditor.selectAll,
  "del": svgEditor.remove,
  "up" : function(e) { e.preventDefault(); svgEditor.dim("y","-=1"); },
  "down" : function(e) { e.preventDefault(); svgEditor.dim("y","+=1"); },
  "left" : function(e) { e.preventDefault(); svgEditor.dim("x","-=1"); },
  "right" : function(e) { e.preventDefault(); svgEditor.dim("x","+=1"); }
});

////////////////////////////////
// Menu File

$("#newDocument").on("click", function () {
  svgEditor.newDocument($('#width').val(), $('#height').val());
});

$("#openDocument").on("click", function () {
  svgEditor.chooseFile().then(svgEditor.loadFile).catch(alert);
});

$("#openImage").on("click", function () {
  svgEditor.chooseFile().then(svgEditor.loadImageAsDoc).catch(alert);
});

$("#downloadSVG").on("click",function() {
  svgEditor.download("svg");
});

$("#downloadPNG").on("click",function() {
  svgEditor.download("png");
});

////////////////////////////////
// Menu View

$('#marqueeZoom').on("click",function() {
    svgEditor.marqueeZoom();
    menuBar.close();
});

$('#fitToCanvas').on("click",function() {
    svgEditor.zoomTo('canvas');
});

$('#fitToDoc').on("click",function() {
    svgEditor.fitToDoc();
});

$('#realSize').on("click",function() {
    svgEditor.zoomTo(100);
});

$('#zoomIn').on("click",function() {
    svgEditor.zoom(+10);
});

$('#zoomOut').on("click",function() {
    svgEditor.zoom(-10);
});

////////////////////////////////
// Menu Options

["canvasResizable", "editPathMainPoints", "editPathCtrlPoints",
  "keepShapesRatio", "autoSmoothPaths", "useTransformAttr",
  "editPosition", "editSize", "editRotation", "editText"].forEach(function (property) {

    $('#' + property).on("change", function () {
      svgEditor[property] = this.checked;
      $(this).blur();
    }).trigger("change");
  });

////////////////////////////////
// Menu Disposition
["left","center","right","top","middle","bottom"].forEach(function(type) {
  $('#align'+$.ucfirst(type)).on("click",function() {
    svgEditor.align(type);
  })
});

["Forwards","Backwards","Front","Back"].forEach(function(type) {
  $('#move'+type).on("click",function() {
    svgEditor["move"+type]();
  });
});

$("#insertText").on("click",function() {
  const text = $("<text>").text("Bonjour le monde");
  svgEditor.enableInsertElement(text);
  menuBar.close();
});

/*
const dialog = document.querySelector('#exampleChoice');

$('#openExample').on("click",function() {
    dialog.showModal();
});







$("#insertImage").on("click",function() {

    svgEditor.chooseFile().then(svgEditor.insertImageFile).catch(alert);
});





$('#confirmExample').on("click",function() {
    dialog.close();
    svgEditor.loadURL('img/' + $('#examples').val() + '.svg');
});



$('#width').on("change",function() {
    svgEditor.dimDocument({width:this.value});
});

$('#height').on("change",function() {
    svgEditor.dimDocument({height:this.value});
});

$('#viewPanel').on("hide.bs.collapse",function() {
    svgEditor.disableMousePan();
    $('#mousePan').removeClass("active");
});

$('#mousePan').on("click",function() {
    svgEditor.enableMousePan();
    $(this).addClass("active");
});

$('#drawShapes').on({
    "show.bs.collapse":function () {
        $('#shape').trigger("change");
    },
    "hide.bs.collapse":function() {
        svgEditor.disableShapeDrawer();
        svgEditor.disableInsertElement();
        svgEditor.enableSelection();
    }
});

$('#shape').on("change",function() {

    const type = this.value;

    if (type.includes("path")) {
        svgEditor.drawingPathMethod = (type == "path") ? "point2point" : "freehand";
        type = "path";
    }

    const shape = $("<"+type+">").addClass("perso");

    if (type == "text") svgEditor.enableInsertElement(shape);
    else svgEditor.enableShapeDrawer(shape);
});


["remove","copy","cut","paste","undo","redo","group","ungroup"].forEach(function(action) {

    $('#'+action).on("click",function() {
        svgEditor[action]();
    });
});



$('#print').on("click",function() { svgEditor.print(); });



 */