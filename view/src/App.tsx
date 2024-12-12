import { CallGraphContainer } from "@/components/call-graph";
import { SettingsMenu } from "./components/settings-menu";
import { RootStateProvider } from "./lib/state/provider";
import { Search } from "./components/search";
import { DepthSelector } from "./components/depth-selector";
import { EntryDialog } from "./components/entry-dialog";
function App() {
    return (
        <RootStateProvider>
            <div className="relative">
                <CallGraphContainer />
                <div className="absolute top-0 left-0 m-4 flex flex-row gap-2">
                    <Search />
                    <DepthSelector />
                    <EntryDialog />
                    <SettingsMenu />
                </div>
            </div>
        </RootStateProvider>
    );
}

export default App;
