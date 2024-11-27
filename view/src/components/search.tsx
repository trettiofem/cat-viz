import { Box, Network, PackageOpen, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandDialog } from "./ui/command";
import { useState } from "react";
import { InlineCode } from "./ui/inline-code";

export function Search() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                <SearchIcon />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search for methods..." />
                <CommandList>
                    <CommandEmpty>No methods found 😔</CommandEmpty>
                    <CommandGroup heading="Methods">
                        <CommandItem>
                            <Box />
                            <InlineCode>Calendar</InlineCode>
                        </CommandItem>
                        <CommandItem>
                            <Box />
                            <InlineCode>{".G::main()"}</InlineCode>
                        </CommandItem>
                        <CommandItem>
                            <Box />
                            <InlineCode>Calculator</InlineCode>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Classes">
                        <CommandItem>
                            <Network />
                            <InlineCode>Bruh</InlineCode>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Packages">
                        <CommandItem>
                            <PackageOpen />
                            <InlineCode>{"(default package)"}</InlineCode>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
