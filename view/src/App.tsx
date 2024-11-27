import { CallGraphContainer } from "@/components/call-graph-container";
import { SettingsMenu } from "./components/settings-menu";
import { fetchCallGraph } from "./lib/call-graph";
import { RootStateProvider } from "./lib/state/provider";
import { Search } from "./components/search";
import { DepthSelector } from "./components/depth-selector";


function App() {
    return (
        <RootStateProvider>
            <div className="relative">
                <CallGraphContainer
                    graph={fetchCallGraph()}
                    className="w-dvw h-dvh"
                />
                <div className="absolute top-0 left-0 m-4 flex flex-row gap-2">
                    <Search />
                    <SettingsMenu />
                    <DepthSelector />
                </div>
            </div>
        </RootStateProvider>
    );
}

export default App;
