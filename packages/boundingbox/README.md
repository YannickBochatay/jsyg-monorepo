# @jsyg/boundingbox
BoundingBox plugin for JSYG framework

[demo](http://yannickbochatay.github.io/jsyg-monorepo/boundingbox/)

### Installation
```shell
npm install @jsyg/boundingbox
```

### Usage
```javascript
import BoundingBox from "@jsyg/boundingbox";

var box = new BoundingBox("#myElement");
box.show();
box.hide();
```
Or as a plugin
```javascript
import JSYG from "@jsyg/core";
import "@jsyg/boundingbox";

new JSYG("#myElement").boundingBox("show");
```
