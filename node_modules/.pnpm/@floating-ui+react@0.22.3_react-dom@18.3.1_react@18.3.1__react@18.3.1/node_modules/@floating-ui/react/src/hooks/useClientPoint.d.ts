import * as React from 'react';
import type { ContextData, ElementProps, FloatingContext, ReferenceType } from '../types';
export interface Props {
    enabled: boolean;
    axis: 'x' | 'y' | 'both';
    x: number | null;
    y: number | null;
}
/**
 * Positions the floating element relative to a client point (in the viewport),
 * such as the mouse position. By default, it follows the mouse cursor.
 * @see https://floating-ui.com/docs/useClientPoint
 */
export declare const useClientPoint: <RT extends ReferenceType = ReferenceType>({ open, refs, dataRef, elements: { floating } }: {
    x: number | null;
    y: number | null;
    placement: import("@floating-ui/core/src/types").Placement;
    strategy: import("@floating-ui/core/src/types").Strategy;
    middlewareData: import("@floating-ui/core/src/types").MiddlewareData;
    reference: (node: RT | null) => void;
    floating: (node: HTMLElement | null) => void;
    isPositioned: boolean;
    update: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    events: import("../types").FloatingEvents;
    dataRef: React.MutableRefObject<ContextData>;
    nodeId: string | undefined;
    floatingId: string;
    refs: import("../types").ExtendedRefs<RT>;
    elements: import("../types").ExtendedElements<RT>;
}, { enabled, axis, x, y }?: Partial<Props>) => ElementProps;
