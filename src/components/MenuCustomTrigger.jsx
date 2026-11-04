import { forwardRef, createElement } from "react";
import classNames from "classnames";

/**
 * MenuCustomTrigger element
 *
 * Separate element to allow for conditional show while supporting refs.
 *
 * @since 1.12.0
 *
 * @param {Array}   children       Element children.
 * @param {String}  className      Element class name.
 * @param {Boolean} hideElement    Whether to not render the element.
 * @param {Boolean} isOpen         Whether the button's menu is open.
 * @param {Boolean} hasFocusInside Whether the button's menu has focus.
 */
export const MenuCustomTrigger = forwardRef(
    ({ children, className, hideElement, isOpen, hasFocusInside, ...props }, forwardedRef) => {
        // Conditional show
        if (hideElement) {
            return null;
        }

        return createElement(
            "div",
            {
                ref: forwardedRef,
                className: classNames(className, { active: isOpen }, "custom-root-menu"),
                role: "button",
                "data-open": isOpen ? "" : undefined,
                "data-focus-inside": hasFocusInside ? "" : undefined,
                ...props
            },
            children
        );
    }
);
