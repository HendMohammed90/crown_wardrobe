import Header from "../Header/Header";

type BaseLayoutProps = {
    children: React.ReactNode;
};

/**
 * Base layout can be used to wrap all pages
 */
export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}