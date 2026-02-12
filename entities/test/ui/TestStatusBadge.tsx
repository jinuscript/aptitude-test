import { Status } from "../type/TestType";
import { STATUS_COLOR, STATUS_BADGE } from "../constant/TestConstant";

const TestStatusBadge = ({ status }: { status: Status }) => {
    return (
        <div className={`py-1 px-2 rounded-lg text-sm font-semibold ${STATUS_COLOR[status]}`}>
            {STATUS_BADGE[status]}
        </div>
    );
};

export default TestStatusBadge;