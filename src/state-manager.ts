import { window } from "vscode";
import { Dependency } from "./types";

export interface State {
    entryPackage: string; // TODO: split into package and class?
    entryMethod: string;
    classPath: string[];
    files: string[];
}

export class StateManager {
    private entryPackage: string = "";
    private entryMethod: string = "";

    private dependencies: Dependency[] = [];

    ready(): boolean {
        return this.entryPackage !== "" && this.entryMethod !== "" && this.dependencies.length !== 0;
    }

    setEntry(entryPackage: string, entryMethod: string): void {
        this.entryPackage = entryPackage;
        this.entryMethod = entryMethod;
    }

    addDependency(path: string, classpath: boolean): void {
        if (this.hasDependency(path)) {
            window.showErrorMessage("Path already added as dependency.");
            return;
        }

        this.dependencies.push({ path, classpath });
    }

    removeDependency(path: string): void {
        this.dependencies = this.dependencies.filter((dep) => dep.path !== path);
    }

    hasDependency(path: string): boolean {
        return this.dependencies.find((d) => d.path === path) !== undefined;
    }

    getDependencies(): Dependency[] {
        return [...this.dependencies];
    }

    getState(): State {
        return {
            entryPackage: this.entryPackage,
            entryMethod: this.entryMethod,
            files: this.dependencies
                .filter((d) => d.classpath === false)
                .map((d) => d.path),
            classPath: this.dependencies
                .filter((d) => d.classpath === true)
                .map((d) => d.path)
        };
    }
}
