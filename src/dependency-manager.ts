import { window } from "vscode";
import { Dependency, Request } from "./types";

export class DependencyManager {
    private entryPackage: string = "Example";
    private entryMethod: string = "main";

    private deps: Dependency[] = [];

    setEntry(_package: string, method: string): void {
        this.entryPackage = _package;
        this.entryMethod = method;
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
