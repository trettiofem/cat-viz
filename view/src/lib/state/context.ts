import { createContext } from "react";

export type Layout =
    | "cose"
    | "breadthfirst"
    | "circle"
    | "grid";
export type HighlightMode = "reachability" | "scc";

export interface RootState {
    layout: Layout;
    highlightMode: HighlightMode;
    highlightNode: string;
    update: (next: RootState) => void;
}

export const RootContext = createContext<RootState | null>(null);