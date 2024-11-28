import cytoscape from "cytoscape";

const palette = {
    "default": "#fbbf24",
    "entry-point": "#a3e635",
    "constructor": "#34d399",
    "static-initializer": "#818cf8",

    "edge": "#d4d4d8",
    "unhighlighted": "#a1a1aa",
    "highlighted": "#f43f5e"
};

export const CytoscapeOptions: cytoscape.CytoscapeOptions = {
    wheelSensitivity: 0.1,
    elements: [],
    style: [
        {
            selector: "node",
            style: {
                "background-color": palette.default,
                width: "16px",
                height: "16px",
                label: "data(id)",
                "font-family": "monospace",
                "font-size": "4px",
                color: "white",
                "text-valign": "bottom",
                "text-margin-y": 2,
                "text-background-color": "black", // Set the background color for label
                "text-background-opacity": 0.5,
                "text-background-padding": "1px", // Padding around the label
                "text-background-shape": "roundrectangle", // Shape of the background
            },
        },
        {
            selector: ".entry-point",
            style: {
                "background-color": palette["entry-point"],
            },
        },
        {
            selector: ".constructor",
            style: {
                "background-color": palette.constructor,
            },
        },
        {
            selector: ".static-initializer",
            style: {
                "background-color": palette["static-initializer"],
            },
        },
        {
            selector: "edge",
            style: {
                "line-color": palette.edge,
                "target-arrow-color": palette.edge,
                "target-arrow-shape": "chevron",
                width: 1,
                "curve-style": "straight",
                "arrow-scale": 0.5,
            },
        },
        {
            selector: ".start-node",
            style: {
                "border-color": palette.highlighted,
                "border-opacity": 0.5,
                "border-width": "2px",
                "border-style": "solid",
                "border-position": "outside",
            },
        },
        {
            selector: ".highlighted",
            style: {
                "background-color": palette.highlighted,
            },
        },
        {
            selector: ".unhighlighted",
            style: {
                "background-color": palette.unhighlighted,
            },
        },
        {
            selector: ".hidden",
            style: {
                display: "none",
            },
        },
    ],
};
