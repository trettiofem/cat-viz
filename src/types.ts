export interface Dependency {
    path: string;
    classpath: boolean;
}

export interface Identifier {
    package: string;
    class: string;
    method: string;
}

export interface Node {
    id: Identifier;
    path: string;
    line: number;
    params: { [key in string]: string };
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