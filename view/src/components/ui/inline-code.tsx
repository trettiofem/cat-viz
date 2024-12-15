import { ReactNode } from "react";

export function InlineCode({ children }: { children?: ReactNode }) {
    return (
        <code className="relative rounded bg-accent border px-[0.3rem] py-[0.2rem] font-mono font-medium whitespace-pre-wrap">
            {children}
        </code>
    );
}
