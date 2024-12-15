import cytoscape, { NodeSingular } from "cytoscape";
import { useContext, useEffect, useRef, useState } from "react";
import { CallGraph, RootContext } from "@/lib/state/context";
import { HighlightAlert } from "./highlight-alert";
import { CytoscapeOptions } from "@/lib/cytoscape-options";
import { getCompleteID } from "@/lib/utils";
import { NodePopover, NodePopoverData } from "./node-popover";

const visibilitySymbols: {
    [key in "public" | "private" | "protected" | "static"]: string;
} = {
    public: "+",
    private: "-",
    protected: "#",
    static: "$"
};

// TODO: rename file
// TODO: when updating graph, unhighlight nodes that don't exist anymore!
export function CallGraphContainer() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const container = useRef(null);
    const [cy, initCytoscape] = useState<cytoscape.Core>(cytoscape({}));

    // i hate react
    const [popoverOpen, showPopover] = useState<boolean>(false);
    const [popoverData, setPopoverData] = useState<NodePopoverData>({
        coords: { x: 0, y: 0 },
        node: {}
    });

    cy.on("tap", "node", (e) => {
        const node = e.target as cytoscape.NodeSingular;

        if (!node.hasClass("parent-node")) {
            root.update({ ...root, highlightedNode: node.id() });
        }
    });

    cy.on("cxttap", "node", (e) => {
        const node = e.target as cytoscape.NodeSingular;

        if (!node.hasClass("parent-node")) {
            setPopoverData({
                coords: {
                    x: e.originalEvent.clientX,
                    y: e.originalEvent.clientY
                },
                node: node.data()
            });

            showPopover(true);
        }
    });

    // Re-render entire graph
    // Graph will render when either the depth, layout or the graph itself changes
    useEffect(() => {
        const cy = cytoscape({
            container: container.current,
            ...CytoscapeOptions
        });

        // Add parent nodes (if applicable)
        const parents = new Set<string>();
        switch (root.depth) {
            case "method":
                root.graph.nodes.forEach((node) =>
                    parents.add(getCompleteID(node.id, "class"))
                );
                break;
            case "class":
                root.graph.nodes.forEach((node) =>
                    parents.add(getCompleteID(node.id, "package"))
                );
                break;
        }
        parents.forEach((node) =>
            cy.add({
                data: { id: `parent(${node})`, label: node },
                classes: ["parent-node"]
            })
        );

        // Add nodes
        const nodes = new Set<string>();
        for (const node of root.graph.nodes) {
            // Skip if node already exists
            const id = getCompleteID(node.id, root.depth);
            if (nodes.has(id)) continue;

            let next: cytoscape.ElementDefinition;
            switch (root.depth) {
                case "package":
                    next = { data: { id, label: id }, classes: ["node"] };
                    break;
                case "class":
                    next = {
                        data: {
                            id,
                            label: id,
                            parent: `parent(${getCompleteID(node.id, "package")})`,
                            path: node.path
                        },
                        classes: ["node"]
                    };
                    break;
                case "method":
                    next = {
                        data: {
                            id,
                            label: `${visibilitySymbols[node.visibility]}${id}`,
                            parent: `parent(${getCompleteID(node.id, "class")})`,
                            path: node.path,
                            line: node.line,
                            params: node.params,
                            kind: node.kind,
                            visibility: node.visibility
                        },
                        classes: ["node", node.kind, node.visibility]
                    };
                    break;
            }

            cy.add(next);
            nodes.add(id);
        }

        // Add edges
        const edges = new Set<string>();
        for (const edge of root.graph.edges) {
            // Skip if edge already exists
            const source = getCompleteID(edge.source, root.depth);
            const target = getCompleteID(edge.target, root.depth);
            const id = `${source}->${target}`;

            // Skip self-referential nodes (whenever depth !== "method")
            if (source === target && root.depth !== "method") continue;
            if (edges.has(id)) continue;

            cy.add({ data: { id, source, target } });
            edges.add(id);
        }

        cy.layout({
            name: root.layout,
            spacingFactor: 0.5,
            animate: false
        }).run();
        initCytoscape(cy);
    }, [root.graph, root.depth, root.layout]);

    // Update highlighting
    useEffect(() => {
        // Reset colors
        const resetAll = (c: string) =>
            cy.nodes("." + c).forEach((n) => n.removeClass(c) && true);

        resetAll("start-node");
        resetAll("highlighted");
        resetAll("unhighlighted");

        if (root.highlightedNode !== "") {
            const startNode = cy.nodes(`[id="${root.highlightedNode}"]`)[0];
            if (!startNode) return;

            const isParent = startNode.hasClass("parent-node");

            // If the start node is a normal node, we perform a recursive reachability search
            // before we pan the viewport over to the start node.
            // If the start node is a parent node, we just pan the viewport.
            if (!isParent) {
                // Unhighlight all nodes first
                cy.nodes(".node").forEach((node) => {
                    node.addClass("unhighlighted");
                });

                const visited = new Set<NodeSingular>();

                const visit = (node: NodeSingular) => {
                    visited.add(node);

                    // Highlight node
                    node.removeClass("unhighlighted");
                    node.addClass("highlighted");

                    // Get edges and visit them
                    node.connectedEdges().forEach((edge) => {
                        const candidate = edge.target();
                        if (!visited.has(candidate)) {
                            visit(candidate);
                        }
                    });
                };

                visit(startNode);
                startNode.addClass("start-node");
            }

            // Pan viewport to the start node
            if (root.panViewport || isParent) {
                cy.animate({
                    center: { eles: startNode },
                    duration: 250,
                    easing: "ease-in-out"
                });
            }
        }
    }, [cy, root.highlightedNode, root.panViewport]);

    const updateCallGraph = (msg: MessageEvent) => {
        const data = msg.data;

        switch (data.type) {
            case "set-state":
                return root.update({
                    ...root,
                    graph: data.graph as CallGraph,
                    entryMethod: data.entryMethod,
                    entryPackage: data.entryPackage,
                    files: data.files,
                    classpath: data.classpath
                });
        }
    };

    // Get data from vscode
    useEffect(() => {
        window.addEventListener("message", updateCallGraph);
        return () => window.removeEventListener("message", updateCallGraph);
    });
    
    return (
        <>
            <div className="w-dvw h-dvh" id="id" ref={container}></div>
            <HighlightAlert />
            <NodePopover
                open={popoverOpen}
                onClose={() => showPopover(false)}
                data={popoverData}
            />

            {root.graph.nodes.length === 0 ? (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center opacity-25 pointer-events-none">
                    <p className="text-4xl">{"¯\\_(ツ)_/¯"}</p>
                    <p className="text-2xl">No graph.</p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
