# cat-viz
![Banner](res/banner.png)

`cat-viz` is an extension for Visual Studio Code that displays call graphs. It uses [cat-server](https://github.com/trettiofem/cat-server) as its backend, which in turn is based on [CAT](https://github.com/IdrissRio/cat/), a call graph analysis tool created by [Idriss Riouak](https://github.com/IdrissRio). CAT and by extension, cat-server is built on top of the [ExtendJ](https://extendj.org/) Java compiler.

## Table of Contents

- [Features](#features)
- [License](#license)

## Features

### Follow the flow of execution

`cat-viz` highlights the flow of execution, allowing the user to get a good grasp of how the analyzed program is structured. Round nodes represent methods in files which are included in the analysis, while rhombus-shaped nodes represent methods in files which are not included in the analysis.

![Dependencies](res/highlight.png)

### Zoom in and out

`cat-viz` allows the user to "zoom" in and out of the graph, which shows the relationships, not only between methods, but also between classes and packages.

![Dependencies](res/method.png)

### Selective analysis

`cat-viz` allows for fine-tuning of its call graph analysis. Analyzing every file in a large project can take a long time to compute, and can result in a very large and unwieldy graph.

![Dependencies](res/deps.png)

### Search

`cat-viz` has a built-in search function, allowing the user to search for methods, classes and packages.

![Dependencies](res/search.png)

## License

`cat-viz` is released under the BSD 3-Clause License.