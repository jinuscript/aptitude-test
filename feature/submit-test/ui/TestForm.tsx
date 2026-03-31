import { testAction } from "../action/testAction";

const TestForm = ({ questions, options, testId, code, currentSection }: { questions: any, options: any, testId: string, code: string, currentSection: string }) => {

    return (
        <form action={testAction}>
            <input type="hidden" name="testId" value={testId} />
            <input type="hidden" name="code" value={code} />
            <input type="hidden" name="currentSection" value={currentSection} />
            {questions?.map((q: any) => (
                <div key={q.id}>
                    <p>{q.question}</p>
                    <div>
                        {options?.map((option: any) => (
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
            <button type="submit">답안 제출</button>
        </form>
    );
};

export default TestForm;
