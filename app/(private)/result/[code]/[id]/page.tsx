import { getResult } from "@/feature/result/api/getResult";

const ResultPage = async ({ params }: { params: Promise<{ id: string, code: string }> }) => {
    const { id } = await params;

    const { data } = await getResult(id);

    console.log(data);

    return <h1>ResultPage</h1>
}

export default ResultPage;