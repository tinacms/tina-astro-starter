export type NextTemplateTypes = 'demo-post-page';
export declare const templates: {
    [key in NextTemplateTypes]: (opts?: {
        nextAuthCredentialsProviderName?: string;
        usingSrc?: boolean;
        dataLayer?: boolean;
    }) => string;
};
