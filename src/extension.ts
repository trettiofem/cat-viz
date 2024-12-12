import { commands, ExtensionContext, window, workspace } from "vscode";
import { CallGraphPanel } from "./panel";
import { DependencyProvider } from "./dependency-provider";
import { DependencyManager } from "./dependency-manager";
import { CallGraph } from "./types";

const HOST = "localhost";
const PORT = 8080; // TODO: prompt for port if server can't be found

async function api(path: string, body?: any): Promise<any> {
    const _res = await fetch(`http://${HOST}:${PORT}${path}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : ""
    });
    const res = (await _res.json()) as any;

    if (!res.status) {
        throw new Error("Internal server error.");
    }

    if (res.status !== "ok") {
        throw new Error(res.message);
    }

    return res.data;
}

export function activate(context: ExtensionContext) {
    const depman = new DependencyManager(); // TODO: rename
    const deppro = new DependencyProvider();

    const refreshGraph = async () => {
        if (depman.noEntry()) {
            return;
        }

        try {
            const graph = (await api(
                "/callgraph",
                depman.getRequest()
            )) as CallGraph;

            CallGraphPanel.currentPanel?.sendMessage({
                type: "set-graph",
                graph,
                files: depman.getList(),
                classpath: [] // TODO: remove classpath, and rename files to list or smth
            });
        } catch (e) {
            window.showErrorMessage(
                `Call Graph Error: ${(e as Error).message}`
            );
        }
    };

    const onMessage = (msg: any) => {
        switch (msg.type) {
            case "set-entry":
                depman.setEntry(msg.entryPackage, msg.entryMethod);
                refreshGraph();
                return;
        }
    };

    context.subscriptions.push(
        commands.registerCommand("cat-viz.open", async () => {
            try {
                // Check server status
                const res = (await api("/status")) as number;

                if (res === 0) {
                    // Server works!
                    CallGraphPanel.render(context.extensionUri, onMessage);
                }
            } catch (e) {
                window.showErrorMessage(
                    `Call Graph Error: ${(e as Error).message}`
                );
            }
        }),
        commands.registerCommand("cat-viz.addFile", (args) => {
            const path = args.path as string;
            depman.add(path, false);

            deppro.refresh(depman.getList());
            refreshGraph();
        }),
        commands.registerCommand("cat-viz.addClasspath", (args) => {
            const path = args.path as string;
            depman.add(path, true);

            deppro.refresh(depman.getList());
            refreshGraph();
        }),
        commands.registerCommand("cat-viz.remove", (args) => {
            const path = args.path as string;
            depman.remove(path);

            deppro.refresh(depman.getList());
            refreshGraph();
        }),
        window.createTreeView("cat-viz.dependencies", {
            treeDataProvider: deppro
        }),
        workspace.onDidSaveTextDocument((document) => {
            const path = document.fileName;
            if (depman.has(path)) {
                refreshGraph();
            }
        })
    );
}

export function deactivate() {}
