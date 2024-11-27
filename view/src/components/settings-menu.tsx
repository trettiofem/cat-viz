import { Button } from "@/components/ui/button";
import {
    Menu,
    ChartNetwork,
    Search,
    Table,
    RotateCw,
    FileDown,
    FileJson,
    FileImage
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import {
    RootContext,
    type Layout,
    type HighlightMode
} from "@/lib/state/context";

export function SettingsMenu() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const [visibility, setVisibility] = useState("none"); // TODO: type

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem>
                    <Search />
                    <span>Search</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Attributes</DropdownMenuLabel>

                <DropdownMenuRadioGroup
                    value={visibility}
                    onValueChange={setVisibility}
                >
                    <DropdownMenuRadioItem value="none">
                        Hide Attributes
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="non-cachable">
                        Show Non-Cachable Attributes
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="heat-map">
                        Show Heatmap
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Highlighting</DropdownMenuLabel>

                <DropdownMenuRadioGroup
                    value={root.highlightMode}
                    onValueChange={(value: string) =>
                        root.update({ ...root, highlightMode: value as HighlightMode })
                    }
                >
                    <DropdownMenuRadioItem value="reachability">
                        Reachability
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="scc">
                        SCC
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <ChartNetwork />
                        <span>Layout</span>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                                value={root.layout}
                                onValueChange={(value: string) =>
                                    root.update({ ...root, layout: value as Layout })
                                }
                            >
                                <DropdownMenuRadioItem value="cose">
                                    Cose Layout
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="breadthfirst">
                                    Breadth-first Layout
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="circle">
                                    Circle Layout
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="grid">
                                    Grid Layout
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem>
                    <Table />
                    <span>Show Statistics</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <RotateCw />
                    <span>Refresh</span>
                </DropdownMenuItem>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <FileDown />
                        <span>Export</span>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                                <FileImage />
                                <span>Image</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <FileJson />
                                <span>JSON</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
