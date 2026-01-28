import { type ReactNode } from "react";

const Layout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ code: string }> }) => {
    const { code } = await params;

    switch (code) {
        case "ELM":
            return <>
                <h1>ELM</h1>
                {children}
            </>
        case "MID":
            return <>
                <h1>MID</h1>
                {children}
            </>
        case "HIG":
            return <>
                <h1>HIG</h1>
                {children}</>
        default:
            return <div>code not found</div>
    }
};

export default Layout;