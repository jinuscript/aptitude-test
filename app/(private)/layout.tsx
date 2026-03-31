import PrivateNavigation from "@/widget/PrivateNavigation/ui/PrivateNavigation";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-[240px_1fr] h-screen">
            <PrivateNavigation />
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};

export default PrivateLayout;