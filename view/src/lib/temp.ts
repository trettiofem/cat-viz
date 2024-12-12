import { CallGraph } from "./state/context";

const cg: CallGraph = {
	"nodes": [
		{
			"id": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"path": "example/Shelter.java",
			"line": 2,
			"params": {
				"args": "String[]"
			},
			"kind": "entry-point",
			"visibility": "static"
		},
		{
			"id": {
				"package": "",
				"class": "Fish",
				"method": "Fish()"
			},
			"path": "example/Fish.java",
			"line": 0,
			"params": {
			},
			"kind": "constructor",
			"visibility": "public"
		},
		{
			"id": {
				"package": "",
				"class": "Animal",
				"method": "Animal()"
			},
			"path": "example/Animal.java",
			"line": 0,
			"params": {
			},
			"kind": "constructor",
			"visibility": "public"
		},
		{
			"id": {
				"package": "java.lang",
				"class": "Object",
				"method": "<init>()"
			},
			"path": "jrt:/java.base/java/lang/Object.class",
			"line": 0,
			"params": {
			},
			"kind": "constructor",
			"visibility": "public"
		},
		{
			"id": {
				"package": "",
				"class": "Dog",
				"method": "Dog()"
			},
			"path": "example/Dog.java",
			"line": 0,
			"params": {
			},
			"kind": "constructor",
			"visibility": "public"
		},
		{
			"id": {
				"package": "java.io",
				"class": "PrintStream",
				"method": "println(java.lang.String)"
			},
			"path": "jrt:/java.base/java/io/PrintStream.class",
			"line": 0,
			"params": {
				"p0": "String"
			},
			"kind": "method",
			"visibility": "public"
		},
		{
			"id": {
				"package": "",
				"class": "Animal",
				"method": "noise()"
			},
			"path": "example/Animal.java",
			"line": 2,
			"params": {
			},
			"kind": "method",
			"visibility": "protected"
		},
		{
			"id": {
				"package": "",
				"class": "Fish",
				"method": "noise()"
			},
			"path": "example/Fish.java",
			"line": 2,
			"params": {
			},
			"kind": "method",
			"visibility": "public"
		},
		{
			"id": {
				"package": "",
				"class": "Dog",
				"method": "noise()"
			},
			"path": "example/Dog.java",
			"line": 2,
			"params": {
			},
			"kind": "method",
			"visibility": "public"
		},
		{
			"id": {
				"package": "",
				"class": "Animal",
				"method": "hello()"
			},
			"path": "example/Animal.java",
			"line": 6,
			"params": {
			},
			"kind": "method",
			"visibility": "public"
		},
		{
			"id": {
				"package": "",
				"class": "Animal",
				"method": "hello(int)"
			},
			"path": "example/Animal.java",
			"line": 10,
			"params": {
				"a": "int"
			},
			"kind": "method",
			"visibility": "public"
		}
	],
	"edges": [
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "",
				"class": "Fish",
				"method": "Fish()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "",
				"class": "Dog",
				"method": "Dog()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "java.io",
				"class": "PrintStream",
				"method": "println(java.lang.String)"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "",
				"class": "Animal",
				"method": "noise()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "",
				"class": "Fish",
				"method": "noise()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "",
				"class": "Dog",
				"method": "noise()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "",
				"class": "Animal",
				"method": "hello()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Shelter",
				"method": "main(String[])"
			},
			"target": {
				"package": "",
				"class": "Animal",
				"method": "hello(int)"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Fish",
				"method": "Fish()"
			},
			"target": {
				"package": "",
				"class": "Animal",
				"method": "Animal()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Animal",
				"method": "Animal()"
			},
			"target": {
				"package": "java.lang",
				"class": "Object",
				"method": "<init>()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Dog",
				"method": "Dog()"
			},
			"target": {
				"package": "",
				"class": "Animal",
				"method": "Animal()"
			}
		},
		{
			"source": {
				"package": "",
				"class": "Animal",
				"method": "hello()"
			},
			"target": {
				"package": "java.io",
				"class": "PrintStream",
				"method": "println(java.lang.String)"
			}
		}
	]
};

export function fetchCallGraph(): CallGraph {
    // TODO: implement fetch() call
    return cg;
}
