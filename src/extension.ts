import { commands, ExtensionContext, window, workspace } from "vscode";
import { CallGraphPanel } from "./panel";
import { DependencyProvider } from "./dependency-provider";
import { DependencyManager } from "./dependency-manager";
import { normalizePath } from "./util";
import { CallGraph, Request } from "./types";

const HOST = "localhost";
const PORT = 8080;

async function fetchGraph(req: Request): Promise<CallGraph> {
    const res = await fetch(`http://${HOST}:${PORT}/callgraph`, {
        method: "POST",
        body: JSON.stringify(req)
    });
    const data = (await res.json()) as CallGraph; // TODO: change to Response type
    return data;
}

export function activate(context: ExtensionContext) {
    const depman = new DependencyManager(); // TODO: rename
    const deppro = new DependencyProvider();

    let lastGraph: CallGraph = { edges: [], nodes: [] };

    context.subscriptions.push(
        commands.registerCommand("cat-viz.open", async () => {
            const res = await fetch(`http://${HOST}:${PORT}/status`);
            const data = (await res.json()) as { status: string };

            if (data.status && data.status === "ok") {
                // Server works!
                if (lastGraph.nodes.length === 0) {
                    lastGraph = await fetchGraph(depman.getRequest());
                }

                console.log(lastGraph);

                CallGraphPanel.render(context.extensionUri);
            }
        }),
        commands.registerCommand("cat-viz.addFile", (args) => {
            const path = normalizePath(args.path as string);
            depman.add(path, false);
            deppro.refresh(depman.getList());
        }),
        commands.registerCommand("cat-viz.addClasspath", (args) => {
            const path = normalizePath(args.path as string);
            depman.add(path, true);
            deppro.refresh(depman.getList());
        }),
        commands.registerCommand("cat-viz.remove", (args) => {
            const path = normalizePath(args.path as string);
            depman.remove(path);
            deppro.refresh(depman.getList());
        }),
        window.createTreeView("cat-viz.dependencies", {
            treeDataProvider: deppro
        }),
        workspace.onDidSaveTextDocument((document) => {
            const path = normalizePath(document.fileName);
            if (depman.has(path)) {
                CallGraphPanel.currentPanel?.sendMessage({ path });
            }
        })
    );
}

export function deactivate() {}
