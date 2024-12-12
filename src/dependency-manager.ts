import { window } from "vscode";
import { Dependency, Request } from "./types";

export class DependencyManager {
    private entryPackage: string = "";
    private entryMethod: string = "";

    private deps: Dependency[] = [];

    setEntry(entryPackage: string, entryMethod: string): void {
        this.entryPackage = entryPackage;
        this.entryMethod = entryMethod;
    }

    noEntry(): boolean {
        return this.entryPackage === "" && this.entryMethod === "";
    }

    add(path: string, classpath: boolean): void {
        if (this.has(path)) {
            window.showErrorMessage("File already added as dependency.");
            return;
        }

        this.deps.push({ path, classpath });
    }

    remove(path: string): void {
        this.deps = this.deps.filter((dep) => dep.path !== path);
    }

    has(path: string): boolean {
        return this.deps.find((d) => d.path === path) !== undefined;
    }

    getList(): Dependency[] {
        return [...this.deps];
    }

    getRequest(): Request {
        return {
            entryPackage: this.entryPackage,
            entryMethod: this.entryMethod,
            files: this.deps
                .filter((d) => d.classpath === false)
                .map((d) => d.path),
            classPath: this.deps
                .filter((d) => d.classpath === true)
                .map((d) => d.path)
        };
    }
}
