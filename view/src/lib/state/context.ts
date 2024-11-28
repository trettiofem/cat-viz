import { createContext } from "react";

export type Layout = "cose" | "breadthfirst" | "circle" | "grid";
export type Depth = "package" | "class" | "method";

export interface Identifier {
    package: string;
    class: string;
    method: string;
}

export interface Node {
    id: Identifier;
    path: string;
    line: number;
    paramTypes: string[];
    kind: "entry-point" | "constructor" | "method" | "static-initializer"; // TODO: any more?
    visibility: "public" | "private" | "protected" | "static";
}

export interface Edge {
    source: Identifier;
    target: Identifier;
}

export interface CallGraph {
    nodes: Node[];
    edges: Edge[];
}

export interface RootState {
    graph: CallGraph;
    layout: Layout;
    highlightedNode: string;
    panViewport: boolean;
    depth: Depth;
    update: (next: RootState) => void;
}

export const RootContext = createContext<RootState | null>(null);