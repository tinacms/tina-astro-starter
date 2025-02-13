/**
 * If the DOM wrapped by Tina contains an element with a
 * `data-tinafield` attribute matching `fieldName`,
 * `useFieldReference` will find it by querying the dom and return
 * the matched DOM element.
 *
 * `useFieldReference` is connected to a MutationObserver higher in the DOM,
 * and will cause components that use it to rerender any time content in the DOM
 * changes. This ensures reliable tracking of the referenced DOM element, but
 * may cause problems if `useFieldReference` is called in expensive renders.
 */
export declare const useFieldReference: (fieldName: string | null) => HTMLElement;
