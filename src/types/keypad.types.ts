export type Button = {
    label: string;
    isDigit?: boolean;
    isFunction?: boolean;
    color?: "normal" | "special" | "red";
    colSpan?: number;
}
