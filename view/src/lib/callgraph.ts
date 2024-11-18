export interface Node {
    methodName: string;
    sccId: number;
    uniqueSCCAndNoSelfLoop: boolean;
    path: string;
    // line: number; // TODO: implement
    bridge: boolean;
    paramTypes: unknown; // TODO: ?
    kind: string[]; // TODO: string array or just string?
}

export interface Edge {
    source: string;
    target: string;
}

export interface CallGraph {
    nodes: Node[];
    edges: Edge[];    
}

const cg: CallGraph = {
    "nodes": [
      {
        "methodName": ".Example::main()",
        "sccId": 0,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:4",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "entry-point"
        ]
      },
      {
        "methodName": ".H::H()",
        "sccId": 5,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:0",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "constructor"
        ]
      },
      {
        "methodName": ".F::F()",
        "sccId": 6,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:0",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "constructor"
        ]
      },
      {
        "methodName": ".C::C()",
        "sccId": 7,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:0",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "constructor"
        ]
      },
      {
        "methodName": ".A::A()",
        "sccId": 10,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:0",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "constructor"
        ]
      },
      {
        "methodName": "java.lang.Object::<init>()",
        "sccId": 11,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "jrt:/java.base/java/lang/Object.class:0",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "constructor"
        ]
      },
      {
        "methodName": ".C::clinit<>",
        "sccId": 8,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:33",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "static-initializer"
        ]
      },
      {
        "methodName": ".G::G()",
        "sccId": 9,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:0",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "constructor"
        ]
      },
      {
        "methodName": ".C::m()",
        "sccId": 4,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:34",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "method"
        ]
      },
      {
        "methodName": ".E::m()",
        "sccId": 3,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:24",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "method"
        ]
      },
      {
        "methodName": ".A::m()",
        "sccId": 2,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:46",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "method"
        ]
      },
      {
        "methodName": ".B::m()",
        "sccId": 1,
        "uniqueSCCAndNoSelfLoop": true,
        "path": "examples/Example.java:40",
        "bridge": false,
        "paramTypes": {
  
        },
        "kind": [
          "method"
        ]
      }
    ],
    "edges": [
          {
        "source": ".Example::main()",
        "target": ".H::H()"
      }
     ,    {
        "source": ".Example::main()",
        "target": ".C::m()"
      }
     ,    {
        "source": ".Example::main()",
        "target": ".E::m()"
      }
     ,    {
        "source": ".Example::main()",
        "target": ".C::C()"
      }
     ,    {
        "source": ".Example::main()",
        "target": ".A::m()"
      }
     ,    {
        "source": ".Example::main()",
        "target": ".B::m()"
      }
     ,    {
        "source": ".H::H()",
        "target": ".F::F()"
      }
     ,    {
        "source": ".F::F()",
        "target": ".C::C()"
      }
     ,    {
        "source": ".C::C()",
        "target": ".A::A()"
      }
     ,    {
        "source": ".C::C()",
        "target": ".C::clinit<>"
      }
     ,    {
        "source": ".A::A()",
        "target": "java.lang.Object::<init>()"
      }
     ,    {
        "source": ".C::clinit<>",
        "target": ".G::G()"
      }
     ,    {
        "source": ".G::G()",
        "target": ".F::F()"
      }
    ]
  };
  

export function fetchCallGraph(): CallGraph {
    // TODO: implement fetch() call
    return cg;
}