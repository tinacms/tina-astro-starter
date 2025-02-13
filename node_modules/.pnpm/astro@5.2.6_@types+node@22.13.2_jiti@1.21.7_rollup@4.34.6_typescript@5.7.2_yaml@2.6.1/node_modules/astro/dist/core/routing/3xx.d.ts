export type RedirectTemplate = {
    from?: string;
    location: string | URL;
    status: number;
};
export declare function redirectTemplate({ status, location, from }: RedirectTemplate): string;
