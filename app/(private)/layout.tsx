import PrivateNavigation from "@/widget/PrivateNavigation/ui/PrivateNavigation";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <PrivateNavigation />
            {children}
        </>
    );
};

export default PrivateLayout;