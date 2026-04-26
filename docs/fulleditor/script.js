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

svgEditor.loadURL('img/linux.svg')

const menuBar = document.querySelector("menu-bar");

svgEditor.registerKeyShortCut({
  "Ctrl+c": svgEditor.copy,
  "Ctrl+x": svgEditor.cut,
  "Ctrl+v": svgEditor.paste,
  "Ctrl+z": svgEditor.undo,
  "Ctrl+y": svgEditor.redo,
  "Ctrl+a":svgEditor.selectAll,
  "Delete": svgEditor.remove,
  "ArrowUp" : function(e) { e.preventDefault(); svgEditor.dim("y","-=1"); },
  "ArrowDown" : function(e) { e.preventDefault(); svgEditor.dim("y","+=1"); },
  "ArrowLeft" : function(e) { e.preventDefault(); svgEditor.dim("x","-=1"); },
  "ArrowRight" : function(e) { e.preventDefault(); svgEditor.dim("x","+=1"); }
});

////////////////////////////////
// Menu File
const dialogDimensions = $("#dimensions")[0];

$("#newDocument").on("click", function () {
  dialogDimensions.showModal();
});

const dimensionsForm = $("#dimensions form");

dimensionsForm.on("submit", e => {
  e.preventDefault();
  svgEditor.newDocument($('#width').val(), $('#height').val());
  dialogDimensions.close();
})

$("#openDocument").on("click", function () {
  svgEditor.chooseFile().then(svgEditor.loadFile).catch(alert);
});

$("#openImage").on("click", function () {
  svgEditor.chooseFile().then(svgEditor.loadImageAsDoc).catch(alert);
});

const dialogExample = $('#exampleChoice')[0];

$('#openExample').on("click",function() {
    dialogExample.showModal();
});

$('#example-field').on("change", e => {
  dialogExample.close();
  svgEditor.loadURL(`img/${e.target.value}.svg`);
})

$("#downloadSVG").on("click",function() {
  svgEditor.download("svg");
});

$("#downloadPNG").on("click",function() {
  svgEditor.download("png");
});

$('#print').on("click",function() { svgEditor.print(); });

////////////////////////////////
// Menu Edition

["remove","copy","cut","paste","undo","redo","group","ungroup"].forEach(function(action) {

    $('#'+action).on("click",function() {
        svgEditor[action]();
    });
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

$('#mousePan').on("change",function() {
  if (this.checked) svgEditor.enableMousePan()
  else {
    svgEditor.disableMousePan();
    svgEditor.enableSelection();
  }
  menuBar.close();
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
// Menu Position
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

/////////////////////////////////
// Menu Insert

$("#insertText").on("click",function() {
  const text = $("<text>").text("Bonjour le monde");
  svgEditor.enableInsertElement(text);
  menuBar.close();
});

$("#insertImage").on("click",function() {
  svgEditor.chooseFile().then(svgEditor.insertImageFile).catch(alert);
});

function drawShape() {
  let type = this.id;
  if (type.includes("path")) {
    svgEditor.drawingPathMethod = (type == "path") ? "point2point" : "freehand";
    type = "path";
  }
  const shape = $("<"+type+">").addClass("perso");
  svgEditor.drawShape(shape);
  menuBar.close();
}

["rect", "circle", "ellipse", "line", "polyline", "polygon", "path", "freehand-path"].forEach(type => {
  $("#"+type).on("click", drawShape);
});
  

/*


$('#width').on("change",function() {
    svgEditor.dimDocument({width:this.value});
});

$('#height').on("change",function() {
    svgEditor.dimDocument({height:this.value});
});

*/