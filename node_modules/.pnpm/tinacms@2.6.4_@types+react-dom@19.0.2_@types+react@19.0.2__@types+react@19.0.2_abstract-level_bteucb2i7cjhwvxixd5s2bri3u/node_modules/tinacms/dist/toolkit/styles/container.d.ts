import * as React from 'react';
interface ContainerPropse {
    size?: 'medium' | 'large';
    children?: any;
}
export declare const Container: ({ children, size, ...props }: ContainerPropse) => React.JSX.Element;
export {};
