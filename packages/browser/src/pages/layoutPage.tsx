import { type ReactElement, Suspense } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import css from "./layoutPage.css";
import LogoGraphic from "../graphics/logoGraphic.svg";

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
    return (
        <header className={css["header"]}>
            <div className={css["header-box"]}>
                <Link to="/" className={css["header-link"]}>
                    <LogoGraphic className={css["header-graphic"]} />
                </Link>
                <nav className={css["header-nav"]}>
                    <ul className={css["header-nav-list"]}>
                        <li>
                            <NavLink to="/tattoo" className={() => css["header-nav-link"]}>
                                Tatuajes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/artist" className={() => css["header-nav-link"]}>
                                Artistas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/studio" className={() => css["header-nav-link"]}>
                                Estudios
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={css["header-box"]}></div>
        </header>
    );
}

function Footer(): ReactElement {
    return (
        <footer className={css["footer"]}>
            <div className={css["footer-box"]}>
                <small>© {new Date().getFullYear()} Tattoo</small>
            </div>
        </footer>
    );
}
