import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
export declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
export declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
export declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const TooltipPortal: React.FC<TooltipPrimitive.TooltipPortalProps>;
export declare const TooltipContent: React.ForwardRefExoticComponent<Omit<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare function withTooltip<T extends React.ComponentType<any> | keyof HTMLElementTagNameMap>(Component: T): React.ForwardRefExoticComponent<React.PropsWithoutRef<{
    tooltip?: React.ReactNode;
    tooltipContentProps?: Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "children">;
    tooltipProps?: Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>, "children">;
} & React.PropsWithoutRef<React.ComponentProps<T>>> & React.RefAttributes<React.ElementRef<T>>>;
