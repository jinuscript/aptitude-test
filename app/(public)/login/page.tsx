import LoginForm from "@/feature/login/ui/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex flex-col justify-center h-screen">
            <h1 className="text-2xl font-bold mb-10 max-w-[320px] w-full mx-auto">로그인</h1>
            <LoginForm />
        </main>
    );
}
