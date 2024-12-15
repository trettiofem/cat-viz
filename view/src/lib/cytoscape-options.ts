import cytoscape from "cytoscape";

const palette = {
    entryPoint: "#a3e635", // lime-400
    constructor: "#34d399", // emerald-400
    method: "#fbbf24", // amber-400
    staticInitializer: "#818cf8", // indigo-400
    instanceInitializer: "#38bdf8", // sky-400
    grey: "#a1a1aa", // zinc-400
    highlighted: "#f43f5e" // rose-500
};

export const CytoscapeOptions: cytoscape.CytoscapeOptions = {
    wheelSensitivity: 0.1,
    elements: [],
    style: [
        {
            selector: ".node",
            style: {
                "background-color": palette.method,
                width: "16px",
                height: "16px",
                label: "data(label)",
                "font-family": "monospace",
                "font-size": "4px",
                color: "white",
                "text-valign": "bottom",
                "text-margin-y": 2,
                "text-background-color": "black",
                "text-background-opacity": 0.5,
                "text-background-padding": "1px",
                "text-background-shape": "roundrectangle"
            }
        },
        {
            selector: ".parent-node",
            style: {
                "background-color": "#000000",
                "background-opacity": 0.10,
                "border-style": "dashed",
                "border-color": "#000000",
                "border-opacity": 0.10,
                "border-position": "inside",
                shape: "round-rectangle",
                label: "data(label)",
                "font-family": "monospace",
                "font-size": "8px",
                "font-weight": "bold",
                color: palette.grey,
                "text-valign": "top",
                "text-margin-y": -2,
                "text-background-opacity": 0
            }
        },
        {
            selector: ".entry-point",
            style: {
                "background-color": palette.entryPoint
            }
        },
        {
            selector: ".constructor",
            style: {
                "background-color": palette.constructor
            }
        },
        {
            selector: ".static-initializer",
            style: {
                "background-color": palette.staticInitializer
            }
        },
        {
            selector: ".instance-initializer",
            style: {
                "background-color": palette.instanceInitializer
            }
        },
        {
            selector: ".unanalyzed",
            style: {
                shape: "round-diamond"
            }
        },
        {
            selector: "edge",
            style: {
                "line-color": palette.grey,
                "target-arrow-color": palette.grey,
                "target-arrow-shape": "chevron",
                width: 1,
                "curve-style": "straight",
                "arrow-scale": 0.5
            }
        },
        {
            selector: ".start-node",
            style: {
                "border-color": palette.highlighted,
                "border-opacity": 0.5,
                "border-width": "2px",
                "border-style": "solid",
                "border-position": "outside"
            }
        },
        {
            selector: ".highlighted",
            style: {
                "background-color": palette.highlighted
            }
        },
        {
            selector: ".unhighlighted",
            style: {
                "background-color": palette.grey
            }
        },
        {
            selector: ".hidden",
            style: {
                display: "none"
            }
        }
    ]
};
