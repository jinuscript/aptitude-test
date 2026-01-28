import { testAction } from "../action/testAction";

interface Question {
    id: string;
    section: "strength" | "interest" | "characteristic" | "value" | "knowledge";
    question: "string";
    options: {
        value: number;
        label: string;
    }[];
}

const TestForm = ({ questions, testId, code, currentSection }: { questions: Question[], testId: string, code: string, currentSection: string }) => {

    return (
        <form action={testAction}>
            <input type="hidden" name="testId" value={testId} />
            <input type="hidden" name="code" value={code} />
            <input type="hidden" name="currentSection" value={currentSection} />
            {questions.map((q) => (
                <div key={q.id}>
                    <p>{q.question}</p>
                    <div>
                        {q.options.map((option) => (
                            <label key={`${q.id}-${option.value}`}>
                                <input
                                    type="radio"
                                    name={`${q.id}`}
                                    value={option.value}
                                    required
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button type="submit">제출하기</button>
        </form>
    );
};

export default TestForm;
