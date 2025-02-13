export interface ColorRGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}
export declare enum ColorFormat {
    Hex = "hex",
    RGB = "rgb"
}
interface ColorFormatHandler {
    getLabel(color: ColorRGBA): string;
    getValue(color: ColorRGBA): string;
    parse(color?: string): ColorRGBA | null;
}
interface ColorFormatHandlers {
    [key: string]: ColorFormatHandler;
}
export declare const ColorFormatter: ColorFormatHandlers;
export {};
