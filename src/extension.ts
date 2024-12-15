import { commands, ExtensionContext, window, workspace } from "vscode";
import { ViewPanel } from "./viewpanel";
import { TreeListProvider } from "./treelist";
import { StateManager } from "./statemanager";
import { CallGraph } from "./types";
import { api } from "./api";

async function refreshGraph(state: StateManager) {
    if (!state.ready()) {
        // Send empty graph
        ViewPanel.currentPanel?.sendMessage({
            type: "set-state",
            graph: { nodes: [], edges: [] },
            ...state.getState()
        });

        return;
    }

    try {
        const currentState = state.getState();
        const graph = (await api("/callgraph", currentState)) as CallGraph;

        ViewPanel.currentPanel?.sendMessage({
            type: "set-state",
            graph,
            ...currentState
        });
    } catch (e) {
        window.showErrorMessage(`Call Graph Error: ${(e as Error).message}`);
    }
}

export function activate(context: ExtensionContext) {
    const state = new StateManager();
    const treeList = new TreeListProvider();

    const onMessage = (data: any) => {
        switch (data.type) {
            case "set-entry":
                state.setEntry(data.entryPackage, data.entryMethod);
                refreshGraph(state);
                return;
            case "add-dependency":
                state.addDependency(data.path, data.classpath);
                treeList.refresh(state.getDependencies());
                refreshGraph(state);
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
                    ViewPanel.render(context.extensionUri, onMessage);
                    refreshGraph(state);
                } else {
                    window.showErrorMessage("Unknown server error.");
                }
            } catch (e) {
                window.showErrorMessage((e as Error).message);
            }
        }),
        commands.registerCommand("cat-viz.addFile", (args) => {
            const path = args.path as string;
            state.addDependency(path, false);

            treeList.refresh(state.getDependencies());
            refreshGraph(state);
        }),
        commands.registerCommand("cat-viz.addClasspath", (args) => {
            const path = args.path as string;
            state.addDependency(path, true);

            treeList.refresh(state.getDependencies());
            refreshGraph(state);
        }),
        commands.registerCommand("cat-viz.remove", (args) => {
            const path = args.path as string;
            state.removeDependency(path);

            treeList.refresh(state.getDependencies());
            refreshGraph(state);
        }),
        window.createTreeView("cat-viz.dependencies", {
            treeDataProvider: treeList
        }),
        workspace.onDidSaveTextDocument((document) => {
            const path = document.fileName;
            if (state.hasDependency(path)) {
                refreshGraph(state);
            }
        })
    );
}

export function deactivate() {}
