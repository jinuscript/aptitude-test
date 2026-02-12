const TestInfo = ({ label, value }: { label: string, value: string | number}) => {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-gray-700">{label}</h3>
            <p className="text-sm text-gray-600">{value}</p>
        </div>
    );
};

export default TestInfo;