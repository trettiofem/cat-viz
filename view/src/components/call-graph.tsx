import cytoscape, { NodeSingular } from "cytoscape";
import { useContext, useEffect, useRef, useState } from "react";
import { NodeTooltip, type NodeTooltipProps } from "./node-tooltip";
import { RootContext } from "@/lib/state/context";
import { HighlightAlert } from "./highlight-alert";
import { CytoscapeOptions } from "@/lib/cytoscape-options";
import { getCompleteID } from "@/lib/utils";

export function CallGraph() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const container = useRef(null);
    const [cy, initCytoscape] = useState<cytoscape.Core>(cytoscape({}));

    const [tooltip, setTooltip] = useState<NodeTooltipProps>({
        show: false,
        x: 0,
        y: 0,
        data: {}
    });

    // Events for tooltips and highlighting
    const nodeMouseMove = (e: cytoscape.EventObject) => {
        setTooltip({
            show: true,
            x: e.originalEvent.clientX,
            y: e.originalEvent.clientY,
            data: e.target.data()
        });
    };

    const nodeMouseOut = () => {
        setTooltip({ show: false, x: 0, y: 0, data: {} });
    };

    cy.on("click", "node", (e) =>
        root.update({ ...root, highlightedNode: e.target.id() })
    );

    // Re-render entire graph
    // Graph will render when either the depth, layout or the graph itself changes
    useEffect(() => {
        const cy = cytoscape({
            container: container.current,
            ...CytoscapeOptions
        });

        // Add event handlers for tooltips
        cy.on("mousemove", "node", nodeMouseMove);
        cy.on("mouseout", "node", nodeMouseOut);

        // Add nodes
        const nodes: string[] = [];
        for (const node of root.graph.nodes) {
            // Skip if node already exists
            const id = getCompleteID(node.id, root.depth);
            if (nodes.includes(id)) continue;

            let next: cytoscape.ElementDefinition;
            switch (root.depth) {
                case "package":
                    next = { data: { id } };
                    break;
                case "class":
                    next = { data: { id, path: node.path } };
                    break;
                case "method":
                    next = {
                        data: {
                            id,
                            path: node.path,
                            line: node.line,
                            paramTypes: node.paramTypes,
                            kind: node.kind,
                            visibility: node.visibility
                        },
                        classes: [node.kind, node.visibility]
                    };
                    break;
            }

            cy.add(next);
            nodes.push(id);
        }

        // Add edges
        const edges: string[] = [];
        for (const edge of root.graph.edges) {
            // Skip if edge already exists
            const source = getCompleteID(edge.source, root.depth);
            const target = getCompleteID(edge.target, root.depth);
            const id = `${source}->${target}`;

            // Skip self-referential nodes (whenever depth !== "method")
            //if (source === target && root.depth !== "method") continue;
            if (edges.includes(id)) continue;

            cy.add({ data: { id, source, target } });
            edges.push(id);
        }

        cy.layout({ name: root.layout, spacingFactor: 0.25, animate: false }).run();
        initCytoscape(cy);
    }, [root.graph, root.depth, root.layout]);

    // Update highlighting
    useEffect(() => {
        // Reset colors
        cy.$(".start-node").forEach((node) => {
            node.removeClass("start-node");
        });
        cy.$(".highlighted").forEach((node) => {
            node.removeClass("highlighted");
        });
        cy.$(".unhighlighted").forEach((node) => {
            node.removeClass("unhighlighted");
        });

        if (root.highlightedNode !== "") {
            const startNode = cy.nodes(`[id="${root.highlightedNode}"]`)[0];
            if (!startNode) return;

            // Unhighlight all nodes first
            cy.nodes().forEach((node) => {
                node.addClass("unhighlighted");
            });

            const visited: NodeSingular[] = [startNode];

            const visit = (node: NodeSingular) => {
                node.removeClass("unhighlighted");
                node.addClass("highlighted");
                visited.push(node);

                // Get edges and visit them
                node.connectedEdges().forEach((edge) => {
                    const candidate = edge.target();
                    if (!visited.includes(candidate)) {
                        visit(candidate);
                    }
                });
            };

            visit(startNode);
            startNode.addClass("start-node");

            // TODO: Add setting for this
            if (root.panViewport) {
                cy.animate({
                    center: { eles: startNode },
                    duration: 250,
                    easing: "ease-in-out"
                });
            }
        }
    }, [cy, root.highlightedNode, root.panViewport]);

    return (
        <>
            <div className="w-dvw h-dvh" id="id" ref={container}></div>
            <NodeTooltip {...tooltip} />
            <HighlightAlert />
        </>
    );
}
