# @jsyg/selection
Mouse selection plugin for [JSYG library](https://github.com/YannickBochatay/jsyg-monorepo)

### Demo
[http://yannickbochatay.github.io/jsyg-monorepo/docs/selection](http://yannickbochatay.github.io/jsyg-monorepo/docs/selection)


### Installation
```shell
npm install @jsyg/selection
```

### Usage

```javascript
import Selection from "@jsyg/selection"

let selectArea = new Selection("#myContainer");
selectArea.enable({
    list : ".selectable",
    onselectedlist : function(e,liste) {
        console.log(liste.length+" elements selected");
    }
});
```
