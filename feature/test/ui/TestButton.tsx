'use client';

import testAction from '../action/testAction';

const TestButton = () => {
    const onClick = async () => {
        await testAction();
    };

    return <button onClick={onClick}>테스트 버튼</button>;
};

export default TestButton;