import { Button } from "@/components/ui/button";
import {
    ChartNetwork,
    Table,
    FileDown,
    FileJson,
    FileImage,
    Settings2
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { RootContext, type Layout } from "@/lib/state/context";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { StatsDialog } from "./stats-dialog";
import { vscode } from "@/lib/utils";

export interface SettingsMenuProps {
    cy: cytoscape.Core;
}

export function SettingsMenu({ cy }: SettingsMenuProps) {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const saveImage = async () => {
        const blob = await cy.png({
            output: "blob-promise",
            full: true,
            scale: 4
        });

        vscode.postMessage({
            type: "save-file",
            filters: {
                "Image File": ["png"]
            },
            bytes: new Uint8Array(await blob.arrayBuffer())
        });
    };

    const saveJSON = () => {
        const bytes = new TextEncoder().encode(JSON.stringify(root.graph, null, "    "));
        vscode.postMessage({
            type: "save-file",
            filters: {
                "JSON File": ["json"]
            },
            bytes
        });
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Settings2 />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuSub>
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuSubTrigger>
                            <ChartNetwork />
                            <span>Layout</span>
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={root.layout}
                                    onValueChange={(value: string) =>
                                        root.update({
                                            ...root,
                                            layout: value as Layout
                                        })
                                    }
                                >
                                    <DropdownMenuRadioItem value="breadthfirst">
                                        Breadth-first Layout
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="cose">
                                        Cose Layout
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

                    <DropdownMenuCheckboxItem
                        checked={root.panViewport}
                        onCheckedChange={(value) =>
                            root.update({ ...root, panViewport: value })
                        }
                    >
                        Pan Viewport
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Other</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Table />
                            <span>Show Statistics</span>
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <FileDown />
                            <span>Export</span>
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={saveImage}>
                                    <FileImage />
                                    <span>Image</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={saveJSON}>
                                    <FileJson />
                                    <span>JSON</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>

            <StatsDialog />
        </Dialog>
    );
}
