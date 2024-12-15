import { ArrowDownToDot } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InlineCode } from "./ui/inline-code";
import { useContext, useRef, useState } from "react";
import { RootContext } from "@/lib/state/context";
import { vscode } from "@/lib/utils";

export function EntryDialog() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const entryPackageField = useRef<HTMLInputElement>(null);
    const entryMethodField = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);

    const setEntry = () => {
        const entryPackage = entryPackageField.current?.value ?? "";
        const entryMethod = entryMethodField.current?.value ?? "";

        // Not needed since "set-entry" will refresh the shared state
        // root.update({ ...root, entryPackage, entryMethod });
        vscode.postMessage({
            type: "set-entry",
            entryMethod, entryPackage
        });

        // Close dialog
        setOpen(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-3">
                    <ArrowDownToDot />
                    Entry Point
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit entry point</DialogTitle>
                    <DialogDescription>
                        The entry point tells the analyzer where to start
                        building the call graph from. It does not have to be the{" "}
                        <InlineCode>main()</InlineCode> function.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Package
                        </Label>
                        <Input
                            ref={entryPackageField}
                            defaultValue={root.entryPackage}
                            className="col-span-3 font-mono"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Method
                        </Label>
                        <Input
                            ref={entryMethodField}
                            defaultValue={root.entryMethod}
                            className="col-span-3 font-mono"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={setEntry}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
