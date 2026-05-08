(()=>{
  // inspired by https://lea.verou.me/blog/2026/external-import-maps-today/

  const jsygModules = ["alignment", "boundingbox", "container", "core","draggable", "editor",
    "events", "fulleditor", "matrix","path","pathdrawer", "point","polylinedrawer","resizable",
    "rotatable", "selection", "shapedrawer", "stdconstruct", "strutils", "texteditor",
    "undoredo", "utils", "vect","wrapper", "zoomandpan"];

  const map = { imports : {
    jquery : "lib/jquery.module.min.js",
    pathseg : "lib/pathseg.js"
  } };
	
  for (const module of jsygModules) {
    map.imports[`@jsyg/${module}`] = `packages/${module}/index.js`;
  }

  const mapUrl = document.currentScript?.src;

  if (mapUrl) {
    // transform relative urls to absolute
    for (const name in map.imports) {
      map.imports[name] = new URL(map.imports[name], mapUrl);
    }

    const script = Object.assign(document.createElement("script"), {
      type: "importmap",
      textContent: JSON.stringify(map)
    });

    document.currentScript?.after(script);

  } else {
    console.error("Import map injector script must be a classic (non-module) script");
  }

})();