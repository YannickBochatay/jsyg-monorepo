# @jysg/container
Container plugin for [JSYG framework](https://github.com/YannickBochatay/jsyg-monorepo)

### Demo
[http://yannickbochatay.github.io/jsyg-monorepo/container/](http://yannickbochatay.github.io/jsyg-monorepo/container/)

### Installation
```shell
npm install @jsyg/container
```

### Example
```
import Container from "@jsyg/container"

let container = new Container()
container.appendTo('svg') //it's actually a g element

container.addItems("svg > *") //put elements inside the g element
container.translate(50,50).rotate(30) // apply transformation on group
container.freeItems() //free elements. They keep the transformation
```