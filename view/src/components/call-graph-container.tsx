import { CallGraph } from "@/lib/call-graph";
import cytoscape, { NodeSingular } from "cytoscape";
import { useContext, useEffect, useRef, useState } from "react";
import { NodeTooltip, type NodeTooltipProps } from "./node-tooltip";
import { RootContext } from "@/lib/state/context";
import { HighlightAlert } from "./highlight-alert";
import { CytoscapeOptions } from "@/lib/cytoscape-options";

export interface CallGraphProps {
    graph: CallGraph;
    className: string; // TODO: move?
}

export function CallGraphContainer({ graph, className }: CallGraphProps) {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const container = useRef(null);
    const [cy, initCytoscape] = useState<cytoscape.Core>(cytoscape({}));

    const [tooltip, setTooltip] = useState<NodeTooltipProps>({
        show: false,
        x: 0,
        y: 0,
        methodName: "",
        sccId: 0,
        kind: [],
        evaluation: 0
    });

    // Events for tooltips and highlighting
    const nodeMouseMove = (e: cytoscape.EventObject) => {
        setTooltip({
            show: true,
            x: e.originalEvent.clientX,
            y: e.originalEvent.clientY,
            methodName: e.target.id(),
            sccId: e.target.data("sccId"),
            kind: e.target.data("kind"),
            evaluation: e.target.data("evaluation")
        });
    };

    const nodeMouseOut = () => {
        setTooltip({
            show: false,
            x: 0,
            y: 0,
            methodName: "",
            sccId: 0,
            kind: [],
            evaluation: 0
        });
    };

    cy.on("click", "node", (e) =>
        root.update({ ...root, highlightNode: e.target.id() })
    );

    // Update cytoscape
    useEffect(() => {
        const cy = cytoscape({
            container: container.current,
            ...CytoscapeOptions
        });

        cy.on("mousemove", "node", nodeMouseMove);
        cy.on("mouseout", "node", nodeMouseOut);
        // Add nodes
        for (const node of graph.nodes) {
            cy.add({
                data: {
                    id: node.methodName,
                    sccId: node.sccId,
                    kind: node.kind,
                    evaluation: 0 // TODO: fix?
                }
            });
            // Apply the appropriate class to the node based on its kind
            cy.$(`[id="${node.methodName}"]`).addClass(node.kind);
        }

        // Add edges
        for (const edge of graph.edges) {
            cy.add({
                data: {
                    id: `${edge.source}->${edge.target}`,
                    source: edge.source,
                    target: edge.target
                }
            });
        }

        cy.layout({ name: root.layout, spacingFactor: 0.25 }).run();
        initCytoscape(cy);
    }, [graph, root.layout]);

    // Update highlighting
    useEffect(() => {
        // Reset colors
        cy.$(".start-node").forEach(
            (node) => node.removeClass("start-node") && true
        );
        cy.$(".highlighted").forEach(
            (node) => node.removeClass("highlighted") && true
        );
        cy.$(".unhighlighted").forEach(
            (node) => node.removeClass("unhighlighted") && true
        );

        if (root.highlightNode !== "") {
            const startNode = cy.nodes(
                `[id="${root.highlightNode}"]`
            )[0];

            switch (root.highlightMode) {
                case "reachability": {
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
                    break;
                }
                case "scc": {
                    const sccId = startNode.data("sccId");
                    cy.nodes().forEach((node) => {
                        if (node.data("sccId") === sccId) {
                            node.addClass("highlighted");
                        } else {
                            node.addClass("unhighlighted");
                        }
                    });
                    break;
                }
            }

            startNode.addClass("start-node");
        }
    }, [cy, root]);

    return (
        <>
            <div className={className} id="id" ref={container}></div>
            <NodeTooltip {...tooltip} />
            <HighlightAlert />
        </>
    );
}
