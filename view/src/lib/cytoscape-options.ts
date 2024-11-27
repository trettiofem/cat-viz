import cytoscape from "cytoscape";

export const CytoscapeOptions: cytoscape.CytoscapeOptions = {
    wheelSensitivity: 0.1,
    elements: [],
    style: [
        {
            selector: "node",
            style: {
                "background-color": "#f59e0b",
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
                "text-background-shape": "roundrectangle" // Shape of the background
            }
        },
        {
            selector: ".syn",
            style: {
                "background-color": "rgb(91, 154, 139)"
            }
        },
        {
            selector: ".inh",
            style: {
                "background-color": "rgb(247, 233, 135)"
            }
        },
        {
            selector: ".collection",
            style: {
                "border-color": "red",
                "border-width": "2px",
                "border-style": "solid"
            }
        },
        {
            selector: ".circular",
            style: {
                "background-color": "rgb(178, 6, 0)",
                color: "white",
                "border-color": "rgb(178, 6, 0)",
                "border-width": "2px",
                "border-style": "solid"
            }
        },
        {
            selector: ".bridge",
            style: {
                "background-color": "rgb(222, 2, 196)",
                color: "white",
                "border-color": "rgb(222, 2, 196)",
                "border-width": "2px",
                "border-style": "solid"
            }
        },
        {
            selector: "edge",
            style: {
                "line-color": "#bbb",
                "target-arrow-color": "#bbb",
                "target-arrow-shape": "chevron",
                width: 1,
                "curve-style": "straight",
                "arrow-scale": 0.5
            }
        },
        {
            selector: ".start-node",
            style: {
                "border-color": "pink",
                "border-width": "2px",
                "border-style": "solid",
                "border-position": "outside"
            }
        },
        {
            selector: ".highlighted",
            style: {
                "background-color": "red"
            }
        },
        {
            selector: ".unhighlighted",
            style: {
                "background-color": "#ddd"
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
