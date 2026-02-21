import PrivateNavigation from "@/widget/PrivateNavigation/ui/PrivateNavigation";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-[240px_1fr]">
            <PrivateNavigation />
            <div className="p-4 h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default PrivateLayout;