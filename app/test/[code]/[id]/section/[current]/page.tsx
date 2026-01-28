import TestForm from "@/feature/submit-test/ui/TestForm";
import { getQuestions } from "@/feature/fetch-test/api/getQuestions";

const CurrentSectionPage = async ({ params }: { params: Promise<{ id: string, current: string, code: string }> }) => {
    const { id, current, code } = await params;
    const { data } = await getQuestions(id, current);

    return (
        <main>
            <h1>TestSectionPage</h1>
            <TestForm questions={data} testId={id} code={code} currentSection={current} />
        </main>
    )
}

export default CurrentSectionPage