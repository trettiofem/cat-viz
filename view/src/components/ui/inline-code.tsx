import { ReactNode } from "react";

export function InlineCode({ children }: { children?: ReactNode }) {
    return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-medium">
            {children}
        </code>
    );
}
