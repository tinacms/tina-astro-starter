/**

*/
import * as React from 'react';
interface ImageUploadProps {
    onDrop: (files: any, fileRejections: any) => Promise<void>;
    onClear?: () => void;
    onClick?: () => void;
    value?: string;
    src?: string;
    loading?: boolean;
}
export declare const StyledImage: ({ src }: {
    src: any;
}) => React.JSX.Element;
export declare const StyledFile: ({ src }: {
    src: any;
}) => React.JSX.Element;
export declare const ImageUpload: React.ForwardRefExoticComponent<ImageUploadProps & React.RefAttributes<HTMLButtonElement>>;
export declare const DeleteImageButton: ({ onClick, }: {
    onClick: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => React.JSX.Element;
export {};
