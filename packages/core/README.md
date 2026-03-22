# @jsyg/core
Core of JSYG framework

It's just a pooling of modules :
* @jsyg/wrapper
* @jsyg/point
* @jsyg/vect
* @jsyg/matrix
* @jsyg/utils
* @jsyg/strutils
* @jsyg/events
* @jsyg/stdconstruct

Each of these modules can be used standalone if you don't need JSYG framework.

### Installation

##### with npm
```shell
npm install @jsyg/core
```

### Usage

##### with module loader
```javascript
import JSYG from "@jsyg/core"
JSYG("svg").attr({width:400,height:300}).appendTo("body")
```

##### without bundler
```html
<script type="importmap">
  {
    "imports": {
      "jquery": "./node_modules/jquery/dist-module/jquery.module.min.js",
      "@jsyg/wrapper": "./node_modules/@jsyg/wrapper/index.js",
      "@jsyg/point": "./node_modules/@jsyg/point/index.js",
      "@jsyg/vect": "./node_modules/@jsyg/vect/index.js",
      "@jsyg/matrix": "./node_modules/@jsyg/matrix/index.js",
      "@jsyg/utils": "./node_modules/@jsyg/utils/index.js",
      "@jsyg/strutils": "./node_modules/@jsyg/strutils/index.js",
      "@jsyg/events": "./node_modules/@jsyg/events/index.js",
      "@jsyg/stdconstruct": "./node_modules/@jsyg/stdconstruct/index.js"
    }
  }
</script>
<script>
  JSYG("svg").attr({width:400,height:300}).appendTo("body")
</script>
```