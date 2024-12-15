import { Box, Network, PackageOpen, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandDialog
} from "./ui/command";
import { useContext, useEffect, useState } from "react";
import { InlineCode } from "./ui/inline-code";
import { Depth, RootContext } from "@/lib/state/context";
import { getCompleteID } from "@/lib/utils";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Index {
    packages: string[];
    classes: string[];
    methods: string[];
}

export function Search() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState<Index>({
        packages: [],
        classes: [],
        methods: []
    });

    const pan = (id: string, depth: Depth) => {
        root.update({ ...root, panTo: id, depth });
        setOpen(false);
    };

    // Toggle the search menu when ⌘F is pressed
    useEffect(() => {
        const down: (e: KeyboardEvent) => void = (e) => {
            if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // Update index
    useEffect(() => {
        const packages = new Set<string>();
        const classes = new Set<string>();
        const methods = new Set<string>();

        for (const node of root.graph.nodes) {
            packages.add(getCompleteID(node.id, "package"));
            classes.add(getCompleteID(node.id, "class"));
            methods.add(getCompleteID(node.id, "method"));
        }

        setIndex({
            packages: Array.from(packages).sort(),
            classes: Array.from(classes).sort(),
            methods: Array.from(methods).sort()
        });
    }, [root.graph]);

    return (
        <>
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                <SearchIcon />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <VisuallyHidden>
                    <DialogTitle>Search Dialog</DialogTitle>
                </VisuallyHidden>

                <CommandInput placeholder="Search for nodes..." />
                <CommandList>
                    <CommandEmpty>No nodes found. 😔</CommandEmpty>
                    <CommandGroup heading="Packages">
                        {index.packages.map((_package) => (
                            <CommandItem
                                key={_package}
                                value={_package}
                                onSelect={(id) => pan(id, "package")}
                            >
                                <PackageOpen />
                                <InlineCode>{_package}</InlineCode>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Classes">
                        {index.classes.map((_class) => (
                            <CommandItem
                                key={_class}
                                value={_class}
                                onSelect={(id) => pan(id, "class")}
                            >
                                <Network />
                                <InlineCode>{_class}</InlineCode>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Methods">
                        {index.methods.map((method) => (
                            <CommandItem
                                key={method}
                                value={method}
                                onSelect={(id) => pan(id, "method")}
                            >
                                <Box />
                                <InlineCode>{method}</InlineCode>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
