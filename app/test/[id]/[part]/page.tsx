import { serverClient } from "@/shared/api/serverClient";
import TestForm from "@/feature/submit-test/ui/TestForm";

const TestPartPage = async ({ params }: { params: Promise<{ id: string, part: string }> }) => {
    const { id, part } = await params;

    const response = await serverClient(`/test/${part}`);
    const data = await response.json();


    return (
        <main>
            <h1>TestPartPage</h1>
            <TestForm test_id={id} part={part} questions={data.questionsByPart} />
        </main>
    )
}

export default TestPartPage