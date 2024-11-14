import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn } from "vscode";
import { getNonce, getUri } from "./util";

export class CallGraphPanel {
  public static currentPanel: CallGraphPanel | undefined;

  private readonly panel: WebviewPanel;
  private disposables: Disposable[] = [];

  /**
   * The CallGraphPanel class private constructor (called only from the render method).
   */
  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this.panel = panel;

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    this.panel.webview.html = this.getWebviewContent(this.panel.webview, extensionUri);

    this.setWebviewMessageListener(this.panel.webview);
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   */
  public static render(extensionUri: Uri) {
    if (CallGraphPanel.currentPanel) {
      // If the webview panel already exists reveal it
      CallGraphPanel.currentPanel.panel.reveal(ViewColumn.Beside);
    } else {
      // If a webview panel does not already exist create and show a new one
      const panel = window.createWebviewPanel(
        "call-graph-view",
        "Call Graph",
        ViewColumn.Beside,
        {
          enableScripts: true,
          localResourceRoots: [Uri.joinPath(extensionUri, "out"), Uri.joinPath(extensionUri, "view/build")],
        }
      );

      CallGraphPanel.currentPanel = new CallGraphPanel(panel, extensionUri);
    }
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    CallGraphPanel.currentPanel = undefined;
    this.panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   */
  private getWebviewContent(webview: Webview, extensionUri: Uri) {
    const stylesURI = getUri(webview, extensionUri, ["view", "build", "assets", "index.css"]);
    const scriptURI = getUri(webview, extensionUri, ["view", "build", "assets", "index.js"]);

    const nonce = getNonce();

    return`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesURI}">
          <title>Hello World</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptURI}"></script>
        </body>
      </html>
    `;
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   */
  private setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case "hello":
            // Code that should run in response to the hello message command
            window.showInformationMessage(text);
            return;
          // Add more switch case statements here as more webview message commands
          // are created within the webview context (i.e. inside media/main.js)
        }
      },
      undefined,
      this.disposables
    );
  }
}