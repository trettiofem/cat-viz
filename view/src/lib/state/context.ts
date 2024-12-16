import { createContext } from "react";

export type Layout = "breadthfirst" | "cose" | "circle" | "grid";
export type Depth = "package" | "class" | "method";

export interface Identifier {
    package: string;
    class: string;
    method: string;
}

export interface Node {
    id: Identifier;
    type: string;
    path: string;
    line: number;
    params: { id: string; type: string }[];
    kind:
        | "entry-point"
        | "constructor"
        | "method"
        | "static-initializer"
        | "instance-initializer";
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

    entryPackage: string;
    entryMethod: string;
    files: string[];
    classpath: string[];

    layout: Layout;
    highlightedNode: string;
    panTo: string;
    panViewport: boolean;
    depth: Depth;

    update: (next: RootState) => void;
}

export const RootContext = createContext<RootState | null>(null);
