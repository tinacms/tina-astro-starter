export declare const ReferenceField: (props: import("./wrap-field-with-meta").InputFieldType<import("../components/reference/model/reference-props").ReferenceProps, {}>) => import("react").JSX.Element;
export declare const ReferenceFieldPlugin: {
    name: string;
    type: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<import("../components/reference/model/reference-props").ReferenceProps, {}>) => import("react").JSX.Element;
    parse: (value?: string) => string;
    validate(value: any, values: any, meta: any, field: any): string;
};
