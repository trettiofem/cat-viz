import { ReactNode, useState } from "react";
import { RootState, RootContext } from "./context";

export function RootStateProvider({ children }: { children?: ReactNode }) {
    const [rootState, setRootState] = useState<RootState>({
        graph: { edges: [], nodes: [] },

        entryPackage: "",
        entryMethod: "",
        files: [],
        classpath: [],

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
