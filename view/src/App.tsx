import { CallGraphContainer } from "@/components/call-graph-container";
import { SettingsMenu } from "./components/settings-menu";
import { RootStateProvider } from "./lib/state/provider";
import { Search } from "./components/search";
import { DepthSelector } from "./components/depth-selector";
import { EntryDialog } from "./components/entry-dialog";
import { useState } from "react";
import cytoscape from "cytoscape";

function App() {
    // bodge job
    const [cy, initCytoscape] = useState<cytoscape.Core>(cytoscape({}));

    return (
        <RootStateProvider>
            <div className="relative">
                <CallGraphContainer cy={cy} initCytoscape={initCytoscape} />
                <div className="absolute top-0 left-0 m-4 flex flex-row gap-2">
                    <Search />
                    <DepthSelector />
                    <EntryDialog />
                    <SettingsMenu cy={cy} />
                </div>
            </div>
        </RootStateProvider>
    );
}

export default App;
