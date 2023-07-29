export const toStartCase = (str: string) => {
    return str
        .split(/(?=[A-Z])/)
        .map((s) => s[0]?.toUpperCase() + s.slice(1))
        .join(" ");
};
