import Link from "next/link";
import UserProfile from "./UserProfile";
import LogoutButton from "@/feature/logout/ui/LogoutButton";

const PrivateNavigation = () => {
    return (
        <nav className="flex justify-between items-center max-w-[1140px] mx-auto px-4 md:px-6 lg:px-8 py-2">
            {/* 대시보드 */}
            <Link href="/dashboard" className="inline-block text-lg font-medium px-3 py-2">AI TEST</Link>

            {/* 유저 프로필 */}
            <UserProfile />

            {/* 로그아웃 버튼 */}
            <LogoutButton />
        </nav>
    );
};

export default PrivateNavigation;
