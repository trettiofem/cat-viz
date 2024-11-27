import { Box, Network, PackageOpen } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function DepthSelector() {
    return (
        <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem value="package">
                <PackageOpen />
            </ToggleGroupItem>
            <ToggleGroupItem value="class">
                <Network />
            </ToggleGroupItem>
            <ToggleGroupItem value="method">
                <Box />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}