import PageHead from "./PageHead";
import { ReactNode } from "react";
interface PropTypes {
    title?: string;
    children: ReactNode;
}
const AuthLayout = (props: PropTypes) => {
    const {title, children} = props;
    return (
        <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
            <PageHead title={title}></PageHead>
            <section className="max-w-screen-3xl 3xl:container p-6">
                {children}
            </section>
        </div>
    )
}
export default AuthLayout;