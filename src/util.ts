import { Uri, Webview } from "vscode";

export function getNonce() {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

// TODO: is needed?
export function normalizePath(path: string): string {
    return path;
    return path.split(/[\/\\]/g)
        .filter((a) => a !== "")
        .join("/");
}

export function getUri(
    webview: Webview,
    extensionUri: Uri,
    pathList: string[]
) {
    return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

// TODO: https://code.visualstudio.com/api/extension-guides/tree-view#activation
// "activationEvents": [
//     "onView:nodeDependencies",
// ]
