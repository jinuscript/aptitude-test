import Link from "next/link";
import UserProfile from "./UserProfile";
import LogoutButton from "@/feature/logout/ui/LogoutButton";

const PrivateNavigation = () => {
    return (
        <nav className="flex flex-col justify-between p-4 border-r border-gray-200">
            {/* 대시보드 */}
            <div className="flex flex-col gap-4">
                <Link href="/dashboard" className="inline-block text-2xl font-bold">AI TEST</Link>

                <ul className="flex flex-col gap-2">
                    <li className="py-2 px-2 rounded-lg cursor-pointer hover:bg-amber-50">프로필</li>
                    <li className="py-2 px-2 rounded-lg cursor-pointer hover:bg-amber-50">대시보드</li>
                    <li className="py-2 px-2 rounded-lg cursor-pointer hover:bg-amber-50">검사구매</li>
                </ul>
            </div>

            <ul className="flex flex-col gap-2">
                <li className="py-2 px-2 rounded-lg cursor-pointer hover:bg-amber-50">환경설정</li>
                <li className="py-2 px-2 rounded-lg cursor-pointer">
                    <LogoutButton />
                </li>
            </ul>

            {/* 유저 프로필 */}
            {/* <UserProfile /> */}

            {/* 로그아웃 버튼 */}
        </nav>
    );
};

export default PrivateNavigation;
