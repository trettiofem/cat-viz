import { InlineCode } from "./ui/inline-code";

export interface NodeTooltipProps {
    show: boolean;
    x: number;
    y: number;
    methodName: string;
    sccId: number;
    kind: string[]; // TODO: array?
    evaluation: number;
}

export function NodeTooltip({ show, x, y, methodName, sccId, kind, evaluation }: NodeTooltipProps) {
    return (
        <div
            style={{ top: y, left: x }}
            className={`fixed z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 pointer-events-none ${show ? "" : "hidden"}`}
        >
            <InlineCode>{methodName}</InlineCode>
            <p>SCC ID: <span className="font-mono">{sccId}</span></p>
            <p>Kind: <span className="font-mono">{`[${kind.join(", ")}]`}</span></p>
            <p>Evaluation: <span className="font-mono">{evaluation}</span></p>
        </div>
    );
}
