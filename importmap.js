(()=>{
  // inspired by https://lea.verou.me/blog/2026/external-import-maps-today/

  const DIR = "node_modules";

  const jsygModules = ["alignment", "boundingbox", "container", "core","draggable", "events",
    "matrix","path","pathdrawer", "point","polylinedrawer","resizable", "rotatable", "selection",
    "shapedrawer", "stdconstruct", "strutils", "texteditor", "undoredo", "utils","vect","wrapper",
    "zoomandpan"];

  const map = { imports : {
    jquery : DIR + "/jquery/dist-module/jquery.module.min.js",
    pathseg : DIR + "/pathseg/pathseg.js"
  } };
	
  for (const module of jsygModules) {
    map.imports[`@jsyg/${module}`] = `${DIR}/@jsyg/${module}/index.js`;
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