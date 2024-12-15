import { LucideIcon, Box, Network, PackageOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { Depth, RootContext } from "@/lib/state/context";

interface DepthOption {
    value: Depth;
    label: string;
    icon: LucideIcon;
}

const depthOptions: DepthOption[] = [
    {
        value: "package",
        label: "Package",
        icon: PackageOpen
    },
    {
        value: "class",
        label: "Class",
        icon: Network
    },
    {
        value: "method",
        label: "Method",
        icon: Box
    }
];

export function DepthSelector() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const [open, setOpen] = useState(false);
    const [depth, setDepth] = useState<DepthOption>(depthOptions[2]);

    useEffect(() => {
        const next = depthOptions.find((d) => d.value === root.depth) ?? depthOptions[2];
        setDepth(next);
    }, [root.depth]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="px-3 w-[150px] justify-start"
                >
                    <depth.icon className="mr-2 shrink-0" />
                    {depth.label}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput placeholder="Change depth..." />
                    <CommandList>
                        <CommandEmpty>No results found. 😔</CommandEmpty>
                        <CommandGroup>
                            {depthOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(next) => {
                                        root.update({ ...root, highlightedNode: "", panTo: "", depth: next as Depth });
                                        setOpen(false);
                                    }}
                                >
                                    <option.icon
                                        className={cn(
                                            "mr-2",
                                            option.value === root.depth
                                                ? "opacity-100"
                                                : "opacity-40"
                                        )}
                                    />
                                    <span>{option.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
