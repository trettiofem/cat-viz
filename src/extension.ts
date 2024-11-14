import { commands, ExtensionContext } from "vscode";
import { CallGraphPanel } from "./panel";

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand(
		"cat-viz.openCallGraph",
		() => {
			CallGraphPanel.render(context.extensionUri);
		},
	));
}

export function deactivate() {}
