import { InlineCode } from "./ui/inline-code";

export interface NodeTooltipProps {
    show: boolean;
    x: number;
    y: number;
    data: cytoscape.NodeDataDefinition;
}

const labels: { [key in string]: string } = {
    id: "ID",
    path: "Path",
    line: "Line",
    paramTypes: "Parameter types",
    kind: "Kind",
    visibility: "Visibility"
};

export function NodeTooltip({ show, x, y, data }: NodeTooltipProps) {
    return (
        <div
            style={{ top: y, left: x }}
            className={`fixed z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 pointer-events-none ${show ? "" : "hidden"}`}
        >
            <div className="flex flex-col items-start">
                <InlineCode>{data.id}</InlineCode>

                {Object.keys(data).map((key) =>
                    key === "id" ? (
                        <></> // TODO: key?
                    ) : (
                        <p key={key}>
                            {labels[key] ? labels[key] : key}:{" "}
                            <span className="font-mono">
                                {data[key].toString() !== ""
                                    ? data[key]
                                    : "(empty)"}
                            </span>
                        </p>
                    )
                )}
            </div>
        </div>
    );
}
