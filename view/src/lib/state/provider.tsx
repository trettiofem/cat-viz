import { ReactNode, useState } from "react";
import { RootState, RootContext } from "./context";
import { fetchCallGraph } from "../temp";

export function RootStateProvider({ children }: { children?: ReactNode }) {
    const [rootState, setRootState] = useState<RootState>({
        graph: fetchCallGraph(),
        layout: "cose",
        highlightedNode: "",
        panViewport: true,
        depth: "method",
        update: (next: RootState) => {
            setRootState(next);
        }
    });

    return (
        <RootContext.Provider value={rootState}>
            {children}
        </RootContext.Provider>
    );
}
