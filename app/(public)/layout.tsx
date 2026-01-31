import NavigationBar from "@/widget/NavigationBar/ui/NavigationBar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    );
};

export default PublicLayout;