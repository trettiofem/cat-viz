import { CallGraph } from "./state/context";

const cg: CallGraph = {
    nodes: [
        {
            id: { package: "", class: "Example", method: "main()" },
            path: "examples/Example.java",
            line: 4,
            paramTypes: [],
            kind: "entry-point",
            visibility: "public",
        },
        {
            id: { package: "", class: "H", method: "H()" },
            path: "examples/Example.java",
            line: 0,
            paramTypes: [],
            kind: "constructor",
            visibility: "public",
        },
        {
            id: { package: "", class: "F", method: "F()" },
            path: "examples/Example.java",
            line: 0,
            paramTypes: [],
            kind: "constructor",
            visibility: "public",
        },
        {
            id: { package: "", class: "C", method: "C()" },
            path: "examples/Example.java",
            line: 0,
            paramTypes: [],
            kind: "constructor",
            visibility: "public",
        },
        {
            id: { package: "", class: "A", method: "A()" },
            path: "examples/Example.java",
            line: 0,
            paramTypes: [],
            kind: "constructor",
            visibility: "public",
        },
        {
            id: { package: "java.lang", class: "Object", method: "<init>()" },
            path: "jrt:/java.base/java/lang/Object.class",
            line: 0,
            paramTypes: [],
            kind: "constructor",
            visibility: "public",
        },
        {
            id: { package: "", class: "C", method: "clinit<>" },
            path: "examples/Example.java",
            line: 33,
            paramTypes: [],
            kind: "static-initializer",
            visibility: "static",
        },
        {
            id: { package: "", class: "G", method: "G()" },
            path: "examples/Example.java",
            line: 0,
            paramTypes: [],
            kind: "constructor",
            visibility: "public",
        },
        {
            id: { package: "", class: "C", method: "m()" },
            path: "examples/Example.java",
            line: 34,
            paramTypes: [],
            kind: "method",
            visibility: "public",
        },
        {
            id: { package: "", class: "E", method: "m()" },
            path: "examples/Example.java",
            line: 24,
            paramTypes: [],
            kind: "method",
            visibility: "public",
        },
        {
            id: { package: "", class: "A", method: "m()" },
            path: "examples/Example.java",
            line: 46,
            paramTypes: [],
            kind: "method",
            visibility: "public",
        },
        {
            id: { package: "", class: "B", method: "m()" },
            path: "examples/Example.java",
            line: 40,
            paramTypes: [],
            kind: "method",
            visibility: "public",
        },
    ],
    edges: [
        {
            source: { package: "", class: "Example", method: "main()" },
            target: { package: "", class: "H", method: "H()" },
        },
        {
            source: { package: "", class: "Example", method: "main()" },
            target: { package: "", class: "C", method: "m()" },
        },
        {
            source: { package: "", class: "Example", method: "main()" },
            target: { package: "", class: "E", method: "m()" },
        },
        {
            source: { package: "", class: "Example", method: "main()" },
            target: { package: "", class: "C", method: "C()" },
        },
        {
            source: { package: "", class: "Example", method: "main()" },
            target: { package: "", class: "A", method: "m()" },
        },
        {
            source: { package: "", class: "Example", method: "main()" },
            target: { package: "", class: "B", method: "m()" },
        },
        {
            source: { package: "", class: "H", method: "H()" },
            target: { package: "", class: "F", method: "F()" },
        },
        {
            source: { package: "", class: "F", method: "F()" },
            target: { package: "", class: "C", method: "C()" },
        },
        {
            source: { package: "", class: "C", method: "C()" },
            target: { package: "", class: "A", method: "A()" },
        },
        {
            source: { package: "", class: "C", method: "C()" },
            target: { package: "", class: "C", method: "clinit<>" },
        },
        {
            source: { package: "", class: "A", method: "A()" },
            target: {
                package: "java.lang",
                class: "Object",
                method: "<init>()",
            },
        },
        {
            source: { package: "", class: "C", method: "clinit<>" },
            target: { package: "", class: "G", method: "G()" },
        },
        {
            source: { package: "", class: "G", method: "G()" },
            target: { package: "", class: "F", method: "F()" },
        },
    ],
};

export function fetchCallGraph(): CallGraph {
    // TODO: implement fetch() call
    return cg;
}
