import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { WebviewApi } from "vscode-webview";
import { Depth, Identifier } from "./state/context";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getCompleteID(id: Identifier, depth: Depth): string {
    let completeID: string;
    switch (depth) {
        case "package":
            completeID = id.package === "" ? "(default)" : id.package;
            break;
        case "class":
            completeID = id.package === "" ? "" : id.package + ".";
            completeID += id.class;
            break;
        case "method":
            completeID = id.package === "" ? "" : id.package + ".";
            completeID += `${id.class}::${id.method}`;
            break;
    }

    return completeID;
}

class VSCodeAPIWrapper {
    private readonly vsCodeApi: WebviewApi<unknown> | undefined;

    constructor() {
        if (typeof acquireVsCodeApi === "function") {
            this.vsCodeApi = acquireVsCodeApi();
        }
    }

    public postMessage(message: unknown) {
        if (this.vsCodeApi) {
            this.vsCodeApi.postMessage(message);
        } else {
            console.log(message);
        }
    }
}

export const vscode = new VSCodeAPIWrapper();
