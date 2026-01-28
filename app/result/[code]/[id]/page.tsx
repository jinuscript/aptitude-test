
const ResultPage = async ({ params }: { params: Promise<{ id: string, code: string }> }) => {
    const { id, code } = await params;

    console.log(id);
    console.log(code);

    return <h1>ResultPage</h1>
}

export default ResultPage;