import { useContext } from "react";
import { Button } from "./ui/button";
import { InlineCode } from "./ui/inline-code";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import { RootContext } from "@/lib/state/context";
import { vscode } from "@/lib/utils";

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
    type: "Return type",
    path: "Path",
    line: "Line",
    params: "Parameters",
    kind: "Kind",
    visibility: "Visibility"
};

export function NodePopover({ open, onClose, data }: NodePopoverProps) {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const highlight = () => {
        root.update({
            ...root,
            highlightedNode: data.node.id!,
            panTo: data.node.id!
        });
        onClose();
    };

    const expand = () => {
        if (root.depth === "method") {
            root.update({ ...root, panTo: data.node.id! });

            vscode.postMessage({
                type: "add-dependency",
                path: data.node.path,
                classpath: false
            });

            onClose();
            return;
        }

        const nextDepth = root.depth === "package" ? "class" : "method";
        root.update({
            ...root,
            depth: nextDepth,
            panTo: `parent(${data.node.id!})`
        });

        onClose();
    };

    const canExpand =
        root.depth === "method"
            ? data.node.path !== "<Unknown Source>" &&
              !(data.node.path as string)?.startsWith("jrt") &&
              !root.files.includes(data.node.path)
            : true;

    const formatParams = (params: { id: string; type: string }[]): string => {
        if (params.length === 0) {
            return "(empty)";
        }

        const list = params
            .map((param) => `${param.type} ${param.id}`)
            .join(", ");

        return `(${list})`;
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
                        Object.keys(labels).includes(key) ? (
                            <p key={key}>
                                {labels[key]}:{" "}
                                <span className="font-mono">
                                    {key === "params"
                                        ? formatParams(data.node[key])
                                        : data.node[key].toString() !== ""
                                          ? data.node[key].toString()
                                          : "(empty)"}
                                </span>
                            </p>
                        ) : (
                            <></>
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
                    <Button
                        variant="default"
                        className="grow"
                        onClick={expand}
                        disabled={!canExpand}
                    >
                        Expand
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
