import { testAction } from "../action/testAction";

const TestForm = ({ questions, part }: { questions: { id: number; question: string }[], part: string }) => {
    return (
        <form action={testAction}>
            <input type="hidden" name="part" value={part} />
            {questions.map((q) => (
                <div key={q.id}>
                    <p>{q.question}</p>
                    <div>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <label key={num}>
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    value={num}
                                    required
                                />
                                <span>{num}</span>
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
