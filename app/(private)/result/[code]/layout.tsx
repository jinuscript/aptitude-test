const ResultLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ code: string }> }) => {
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
        case "HIGH":
            return <>
                <h1>HIGH</h1>
                {children}
            </>
    }
}

export default ResultLayout;