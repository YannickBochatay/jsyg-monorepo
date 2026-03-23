# @jsyg/selection
Mouse selection plugin for [JSYG framework](https://github.com/YannickBochatay/jsyg-monorepo)

### Demo
[http://yannickbochatay.github.io/jsyg-monorepo/selection](http://yannickbochatay.github.io/jsyg-monorepo/selection)


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
