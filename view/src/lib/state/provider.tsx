import { ReactNode, useState } from "react";
import { RootState, RootContext } from "./context";

export function RootStateProvider({ children }: { children?: ReactNode }) {
    const [rootState, setRootState] = useState<RootState>({
        layout: "cose",
        highlightMode: "reachability",
        highlightNode: "",
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
