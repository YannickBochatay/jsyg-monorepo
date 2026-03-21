@jsyg/wrapper
====

@jsyg/wrapper is a jQuery wrapper to work on svg elements.

```javascript
import $ from "@jsyg/wrapper";

var svg = $("<svg>").attr({"width":400,"height":500}).appendTo("body");

var rect = $("<rect>")
.attr({"x":50,"y":50,"width":100,"height":50})
.css("fill","red")
.addClass("MyClass");
.appendTo(svg);

rect.position(); // {left:50,top:50}
rect.offsetParent()[0] === svg[0]; // true

svg.constructor === $; // true
svg instanceof jQuery; // true
```

It doesn't work with html strings, only with single tags :
```javascript
var rect = $("<rect>").attr({width:500,height:200});
rect.isSVG(); //true;

var rect = $("<rect width='500' height='200'/>");
rect.isSVG(); //false;
```

##### Installation

```shell
npm install @jsyg/wrapper
```
```html
<script type="importmap">
  {
    "imports": {
      "jquery": "node_modules/jquery/dist-module/jquery.module.js",
      "@jsyg/wrapper": "node_modules/jsyg-monorepo/wrapper/index.js"
    }
  }
</script>
```