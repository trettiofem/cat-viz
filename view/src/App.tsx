import { CallGraph } from "@/components/call-graph";
import { SettingsMenu } from "./components/settings-menu";
import { RootStateProvider } from "./lib/state/provider";
import { Search } from "./components/search";
import { DepthSelector } from "./components/depth-selector";
import { useEffect, useState } from "react";

function App() {
    const [a, b] = useState("bruh");

    useEffect(() => {
        window.addEventListener("message", (msg) => {
            const data = msg.data;
            b(JSON.stringify(data));
        });
    });

    return (
        <RootStateProvider>
            <div className="relative">
                <p>{a}</p>
                <CallGraph />
                <div className="absolute top-0 left-0 m-4 flex flex-row gap-2">
                    <Search />
                    <DepthSelector />
                    <SettingsMenu />
                </div>
            </div>
        </RootStateProvider>
    );
}

export default App;
