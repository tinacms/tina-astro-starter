import type { PropsWithChildren, NamedExoticComponent, ComponentType, ComponentProps, MemoExoticComponent } from 'react';
export declare function memo<P extends Record<string, unknown>>(Component: ComponentType<P>, propsAreEqual?: (prevProps: Readonly<PropsWithChildren<P>>, nextProps: Readonly<PropsWithChildren<P>>) => boolean): NamedExoticComponent<P>;
export declare function memo<T extends ComponentType<any>>(Component: T, propsAreEqual?: (prevProps: Readonly<ComponentProps<T>>, nextProps: Readonly<ComponentProps<T>>) => boolean): MemoExoticComponent<T>;
