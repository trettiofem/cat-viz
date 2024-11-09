import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand(
		"cat-viz.openCallGraph",
		() => {
			const panel = vscode.window.createWebviewPanel(
				"call-graph-view",
				"Call Graph",
				vscode.ViewColumn.Beside,
				{},
			);
			panel.webview.html = "<p>Hello, World.</p>";
		},
	));
}

export function deactivate(): Thenable<void> | undefined {
	return;
}
