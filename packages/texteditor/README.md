# @jsyg/texteditor
svg text editor with [JSYG framework](https://github.com/YannickBochatay/jsyg-monorepo).

### Demo
[http://yannickbochatay.github.io/jsyg-monorepo/texteditor/](http://yannickbochatay.github.io/jsyg-monorepo/texteditor/)

### Installation
```shell
npm install @jsyg/texteditor
```

### Example with module bundler
```javascript
import TextEditor from "@jsyg/texteditor"
import $ from "jquery"

let editor = new TextEditor('#mySVGContainer')
           
$('#mySVGContainer').on("click",function(e) {

  if ( e.target.tagName == "text") {
    editor.target(e.target)
    editor.show()
  }
})
```