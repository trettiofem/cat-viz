import { useContext } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { CallGraph, RootContext } from "@/lib/state/context";
import { getCompleteID } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface StatItem {
    file: string;
    methods: number;
    edges: number;
}

function calculateStats(files: string[], graph: CallGraph): StatItem[] {
    if (files.length === 0) return [];

    const stats: StatItem[] = [];
    let otherMethods = 0;

    for (const file of files) {
        stats.push({ file, methods: 0, edges: 0 });
    }

    // Add all nodes (methods)
    const nodeIDs = new Map<string, string>(); // Save for the next step
    for (const node of graph.nodes) {
        const stat = stats.find((s) => s.file === node.path);

        if (!stat) {
            otherMethods++;
            continue;
        }

        stat.methods++;
        nodeIDs.set(getCompleteID(node.id, "method"), stat.file);
    }

    // Add all edges
    for (const edge of graph.edges) {
        const source = getCompleteID(edge.source, "method");
        const file = nodeIDs.get(source);
        const stat = stats.find((s) => s.file === file)!;

        stat.edges++;
    }

    // Add left over methods
    stats.push({ file: "(other)", methods: otherMethods, edges: 0 });

    // Clip file names
    for (const stat of stats) stat.file = stat.file.split("/").at(-1)!;

    return stats;
}

export function StatsDialog() {
    const root = useContext(RootContext);
    if (!root) throw new Error("Root context not initialized.");

    const stats = calculateStats(root.files, root.graph);
    const totalMethods = stats.reduce((a, stat) => stat.methods + a, 0);
    const totalEdges = stats.reduce((a, stat) => stat.edges + a, 0);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Statistics</DialogTitle>
                <ScrollArea className="w-full max-h-[384px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>File</TableHead>
                                <TableHead>Methods</TableHead>
                                <TableHead>Edges</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.map((stat) => (
                                <TableRow key={stat.file}>
                                    <TableCell className="font-mono">
                                        {stat.file}
                                    </TableCell>
                                    <TableCell className="font-mono">
                                        {stat.methods}
                                    </TableCell>
                                    <TableCell className="font-mono">
                                        {stat.edges}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell className="font-mono">
                                    {totalMethods}
                                </TableCell>
                                <TableCell className="font-mono">
                                    {totalEdges}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </ScrollArea>
            </DialogHeader>
        </DialogContent>
    );
}
