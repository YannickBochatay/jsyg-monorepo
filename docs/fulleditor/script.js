import FullEditor from "@jsyg/fulleditor";
import $ from "@jsyg/core";

const svgEditor = new FullEditor('svg');

svgEditor.editableShapes = "> *";

svgEditor.enable();

svgEditor.newDocument(500, 500);

svgEditor.enableDropFiles();

svgEditor.enableMouseWheelZoom();

svgEditor.keepShapesRatio = true
svgEditor.autoSmoothPaths = true

svgEditor.on("load", () => {
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
  "ArrowUp" : (e) => { e.preventDefault(); svgEditor.dim("y","-=1"); },
  "ArrowDown" : (e) => { e.preventDefault(); svgEditor.dim("y","+=1"); },
  "ArrowLeft" : (e) => { e.preventDefault(); svgEditor.dim("x","-=1"); },
  "ArrowRight" : (e) => { e.preventDefault(); svgEditor.dim("x","+=1"); }
});

////////////////////////////////
// Menu File
const dialogDimensions = $("#dimensions")[0];

$("#newDocument").on("click", () => {
  dialogDimensions.showModal();
});

const dimensionsForm = $("#dimensions form");

dimensionsForm.on("submit", e => {
  e.preventDefault();
  svgEditor.newDocument($('#width').val(), $('#height').val());
  dialogDimensions.close();
})

$("#openDocument").on("click", () => {
  svgEditor.chooseFile().then(svgEditor.loadFile).catch(alert);
});

$("#openImage").on("click", () => {
  svgEditor.chooseFile().then(svgEditor.loadImageAsDoc).catch(alert);
});

const dialogExample = $('#exampleChoice')[0];

$('#openExample').on("click",() => {
    dialogExample.showModal();
});

$('#example-field').on("change", e => {
  dialogExample.close();
  svgEditor.loadURL(`img/${e.target.value}.svg`);
})

$("#downloadSVG").on("click",() => {
  svgEditor.download("svg");
});

$("#downloadPNG").on("click",() => {
  svgEditor.download("png");
});

$('#print').on("click",() => { svgEditor.print(); });

////////////////////////////////
// Menu Edition

["remove","copy","cut","paste","undo","redo","group","ungroup"].forEach((action) => {

    $('#'+action).on("click",() => {
        svgEditor[action]();
    });
});

////////////////////////////////
// Menu View

$('#marqueeZoom').on("click",() => {
    svgEditor.marqueeZoom();
    menuBar.close();
});

$('#fitToCanvas').on("click",() => {
    svgEditor.zoomTo('canvas');
});

$('#fitToDoc').on("click",() => {
    svgEditor.fitToDoc();
});

$('#realSize').on("click",() => {
    svgEditor.zoomTo(100);
});

$('#zoomIn').on("click",() => {
    svgEditor.zoom(+10);
});

$('#zoomOut').on("click",() => {
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

["editPathMainPoints", "editPathCtrlPoints",
  "keepShapesRatio", "autoSmoothPaths", "useTransformAttr",
  "editPosition", "editSize", "editRotation", "editText"].forEach((property) => {

    $('#' + property).on("change", function() {
      svgEditor[property] = this.checked;
      $(this).blur();
    }).trigger("change");
  });

////////////////////////////////
// Menu Position
["left","center","right","top","middle","bottom"].forEach((type) => {
  $('#align'+$.ucfirst(type)).on("click",() => {
    svgEditor.align(type);
  })
});

["Forwards","Backwards","Front","Back"].forEach((type) => {
  $('#move'+type).on("click",() => {
    svgEditor["move"+type]();
  });
});

/////////////////////////////////
// Menu Insert

$("#insertText").on("click", e => {
  const text = $("<text>").text("Bonjour le monde");
  svgEditor.enableInsertElement(text);
  menuBar.close();
});

$("#insertImage").on("click",() => {
  svgEditor.chooseFile().then(svgEditor.insertImageFile).catch(alert);
});

async function drawShape() {
  let type = this.id;
  if (type.includes("path")) {
    svgEditor.drawingPathMethod = (type == "path") ? "point2point" : "freehand";
    type = "path";
  }
  const shape = $("<"+type+">").addClass("perso");
  menuBar.close();
  await svgEditor.drawShape(shape);
  svgEditor.enableSelection();
}

["rect", "circle", "ellipse", "line", "polyline", "polygon", "path", "freehand-path"].forEach(type => {
  $("#"+type).on("click", drawShape);
});

svgEditor.on("change", () => {
  if (svgEditor.undoRedo.hasUndo()) {
    $("#undo").removeAttr("disabled")
  } else {
    $("#undo").attr("disabled", "")
  }
  if (svgEditor.undoRedo.hasRedo()) {
    $("#redo").removeAttr("disabled")
  } else {
    $("#redo").attr("disabled", "")
  }
})

const alignItems = $("#alignLeft,#alignCenter,#alignRight,#alignTop,#alignMiddle,#alignBottom")
const moveItems = $("#moveBack,#moveBackwards,#moveForwards,#moveFront");

svgEditor.on("changetarget", () => {
  switch (svgEditor.target()?.length) {
    case 0: case undefined:
      $("#copy,#cut,#group,#ungroup").attr("disabled", "");
      alignItems.attr("disabled", "");
      moveItems.attr("disabled", "");
      break;
    case 1:
      $("#copy,#cut,#group").removeAttr("disabled");
      alignItems.attr("disabled", "");
      moveItems.removeAttr("disabled");
      break;
    default:
      $("#copy,#cut,#group").removeAttr("disabled");
      $("#ungroup").attr("disabled", "");
      alignItems.removeAttr("disabled");
      moveItems.attr("disabled", "");
  }
})

/*


$('#width').on("change",() => {
    svgEditor.dimDocument({width:this.value});
});

$('#height').on("change",() => {
    svgEditor.dimDocument({height:this.value});
});

*/