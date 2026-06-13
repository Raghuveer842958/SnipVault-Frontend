export const THEMES = {
    LIGHT: "light",
    DARK: "dark",
};

export const getTheme = () => {
    return (
        localStorage.getItem("theme") ||
        THEMES.DARK
    );
};

export const setTheme = (theme) => {
    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    localStorage.setItem("theme", theme);
};

export const initializeTheme = () => {
    const theme = getTheme();

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    return theme;
};