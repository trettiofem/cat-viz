import { useContext, useEffect } from "react";
import { InlineCode } from "./ui/inline-code";
import { RootContext } from "@/lib/state/context";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export function HighlightAlert() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    useEffect(() => {}, [root.highlightNode, root.highlightMode]);

    return (
        <div
            className={`fixed flex items-center gap-2 bottom-4 right-4 z-50 overflow-hidden rounded-md border bg-popover p-1.5 pl-3 text-sm text-popover-foreground shadow-md animate-in slide-in-from-bottom-full fade-in-0 ${root.highlightNode === "" ? "hidden" : ""}`}
        >
            <p className="">
                Currently highlighting{" "}
                <InlineCode>{root.highlightNode}</InlineCode>
            </p>
            <Button onClick={() => root.update({ ...root, highlightNode: "" })} size="icon" variant="ghost">
                <X />
            </Button>
        </div>
    );
}
