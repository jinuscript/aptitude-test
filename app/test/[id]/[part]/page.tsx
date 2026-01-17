import { serverClient } from "@/shared/api/serverClient";

const TestPartPage = async ({ params }: { params: Promise<{ part: string }> }) => {
    const { part } = await params;

    const response = await serverClient(`/test/${part}`);
    const data = await response.json();
    console.log(data)

    return <h1>TestPartPage</h1>
}

export default TestPartPage