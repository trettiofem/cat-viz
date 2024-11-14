import { createRef, useEffect } from 'react';
import cytoscape from "cytoscape"; // TODO: import errors??
function App() {
    const cy = createRef();
    useEffect(() => {
        const cy = document.getElementById("id"); // TODO: fix!
        cytoscape({
            container: cy,
            elements: [
                {
                    group: 'nodes', // 'nodes' for a node, 'edges' for an edge
                    // NB the group field can be automatically inferred for you but specifying it
                    // gives you nice debug messages if you mis-init elements
                    data: {
                        id: 'n1', // mandatory (string) id for each element, assigned automatically on undefined
                        parent: 'nparent', // indicates the compound node parent id; not defined => no parent
                        // (`parent` can be effectively changed by `eles.move()`)
                    },
                    // scratchpad data (usually temp or nonserialisable data)
                    scratch: {
                        _foo: 'bar' // app fields prefixed by underscore; extension fields unprefixed
                    },
                    position: {
                        x: 100,
                        y: 100
                    },
                    selected: false, // whether the element is selected (default false)
                    selectable: true, // whether the selection state is mutable (default true)
                    locked: false, // when locked a node's position is immutable (default false)
                    grabbable: true, // whether the node can be grabbed and moved by the user
                    pannable: false, // whether dragging the node causes panning instead of grabbing
                    classes: ['foo', 'bar'], // an array (or a space separated string) of class names that the element has
                    // DO NOT USE THE `style` FIELD UNLESS ABSOLUTELY NECESSARY
                    // USE THE STYLESHEET INSTEAD
                    style: {
                        'background-color': 'blue'
                    }
                },
                {
                    data: { id: 'n2' },
                    renderedPosition: { x: 200, y: 200 } // can alternatively specify position in rendered on-screen pixels
                },
                {
                    data: { id: 'n3', parent: 'nparent' },
                    position: { x: 123, y: 234 }
                },
                {
                    data: { id: 'nparent' }
                },
                {
                    data: {
                        id: 'e1',
                        // inferred as an edge because `source` and `target` are specified:
                        source: 'n1', // the source node id (edge comes from this node)
                        target: 'n2' // the target node id (edge goes to this node)
                        // (`source` and `target` can be effectively changed by `eles.move()`)
                    },
                    pannable: true // whether dragging on the edge causes panning
                }
            ],
            layout: {
                name: 'preset'
            },
            // so we can see the ids
            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(id)'
                    }
                }
            ]
        });
    }, [cy]);
    return (<>
    <div style={{ width: "100vw", height: "100vh" }} id="id" ref={cy}></div>
    </>);
}
export default App;
//# sourceMappingURL=App.js.map