import { useContext } from "react";
import { Button } from "./ui/button";
import { InlineCode } from "./ui/inline-code";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import { RootContext } from "@/lib/state/context";

export interface NodePopoverData {
    coords: { x: number; y: number };
    node: cytoscape.NodeDataDefinition;
}

export interface NodePopoverProps {
    open: boolean;
    onClose: () => void;
    data: NodePopoverData;
}

const labels: { [key in string]: string } = {
    parent: "Parent",
    id: "ID",
    path: "Path",
    line: "Line",
    paramTypes: "Parameter types",
    kind: "Kind",
    visibility: "Visibility"
};

export function NodePopover({ open, onClose, data }: NodePopoverProps) {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const highlight = () => {
        root.update({ ...root, highlightedNode: data.node.id! });
        onClose();
    };
    const expand = () => {
        if (root.depth === "method") {
            return console.error("Not implemented.");
        }

        const nextDepth = root.depth === "package" ? "class" : "method";
        root.update({
            ...root,
            depth: nextDepth,
            highlightedNode: `parent(${data.node.id!})`
        });

        onClose();
    };    

    return (
        <Popover open={open} onOpenChange={onClose} modal>
            <PopoverAnchor asChild>
                <div
                    className="fixed"
                    style={{ left: data.coords.x, top: data.coords.y }}
                />
            </PopoverAnchor>
            <PopoverContent
                align="start"
                className="min-w-80 w-fit flex flex-col gap-2 items-start"
            >
                <InlineCode>{data.node.id}</InlineCode>

                <div className="flex flex-col items-start">
                    {Object.keys(data.node).map((key) =>
                        key === "id" || key === "label" ? (
                            <></> // TODO: key?
                        ) : (
                            <p key={key}>
                                {labels[key] ? labels[key] : key}:{" "}
                                <span className="font-mono">
                                    {data.node[key].toString() !== ""
                                        ? data.node[key].toString()
                                        : "(empty)"}
                                </span>
                            </p>
                        )
                    )}
                </div>

                <div className="flex flex-row gap-2 self-stretch">
                    <Button
                        variant="secondary"
                        className="grow"
                        onClick={highlight}
                    >
                        Highlight
                    </Button>
                    <Button variant="default" className="grow" onClick={expand}>
                        Expand
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
