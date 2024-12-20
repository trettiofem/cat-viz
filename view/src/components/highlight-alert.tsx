import { useContext, useEffect, useState } from "react";
import { InlineCode } from "./ui/inline-code";
import { RootContext } from "@/lib/state/context";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export function HighlightAlert() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const [showAlert, setAlert] = useState<boolean>(false);

    useEffect(() => {
        setAlert(root.highlightedNode !== "" && !root.highlightedNode.startsWith("parent("));

        const down: (e: KeyboardEvent) => void = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                root.update({ ...root, highlightedNode: "", panTo: "" });
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [root]);

    return (
        <div
            className={`fixed flex items-center gap-2 bottom-4 right-4 z-50 overflow-hidden rounded-md border bg-popover p-1.5 pl-3 text-sm text-popover-foreground shadow-md animate-in slide-in-from-bottom-full fade-in-0 ${showAlert ? "" : "hidden"}`}
        >
            <p className="">
                Currently highlighting{" "}
                <InlineCode>{root.highlightedNode}</InlineCode>
            </p>
            <Button onClick={() => root.update({ ...root, highlightedNode: "", panTo: "" })} size="icon" variant="ghost">
                <X />
            </Button>
        </div>
    );
}
