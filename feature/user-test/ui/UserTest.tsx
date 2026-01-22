import { getUserTest } from "../api/getUserTest";

const UserTest = async () => {
    const result = await getUserTest();

    return (
        <div>
            <h1>UserTest</h1>
        </div>
    );
};

export default UserTest;
