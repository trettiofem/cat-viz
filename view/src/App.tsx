import { CallGraphContainer } from "@/components/call-graph-container";
import { SettingsMenu } from "./components/settings-menu";
import { fetchCallGraph } from "./lib/call-graph";
import { RootStateProvider } from "./lib/state/provider";

function App() {
    return (
        <RootStateProvider>
            <div className="relative">
                <CallGraphContainer
                    graph={fetchCallGraph()}
                    className="w-dvw h-dvh"
                />
                <div className="absolute top-0 left-0 m-4">
                    <SettingsMenu />
                </div>
            </div>
        </RootStateProvider>
    );
}

export default App;
