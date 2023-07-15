import { type ReactElement, Suspense } from "react";
import { Outlet } from "react-router-dom";
import css from "./layoutPage.css";

export default function LayoutPage(): ReactElement {
    return (
        <div className={css["page"]}>
            <Header />
            <main className={css["main"]}>
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

function Header(): ReactElement {
    return <header>header</header>;
}

function Footer(): ReactElement {
    return <footer>footer</footer>;
}
