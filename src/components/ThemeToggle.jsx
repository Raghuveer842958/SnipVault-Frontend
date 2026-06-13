import { useEffect, useState } from "react";

import {
    THEMES,
    getTheme,
    setTheme,
} from "../utils/theme";

const ThemeToggle = () => {
    const [theme, setCurrentTheme] =
        useState(getTheme());

    useEffect(() => {
        setTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setCurrentTheme((prev) =>
            prev === THEMES.DARK
                ? THEMES.LIGHT
                : THEMES.DARK
        );
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
        >
            {theme === "dark" ? (
                <span className="text-lg">
                    ☀️
                </span>
            ) : (
                <span className="text-lg">
                    🌙
                </span>
            )}
        </button>
    );
};

export default ThemeToggle;