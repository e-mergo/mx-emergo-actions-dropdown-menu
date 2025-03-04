import { forwardRef, createElement } from "react";
import classNames from "classnames";

/**
 * MenuButton element
 *
 * Separate element to allow for conditional show while supporting refs.
 *
 * @since 1.2.0
 *
 * @param {Array}   children       Element children.
 * @param {String}  className      Element class name.
 * @param {Boolean} hideButton     Whether to hide the button.
 * @param {Boolean} isLink         Whether the button is rendered as a link.
 * @param {Boolean} isNested       Whether the button is nested inside a menu.
 * @param {Boolean} isOpen         Whether the button's menu is open.
 * @param {Boolean} hasFocusInside Whether the button's menu has focus.
 */
export const MenuButton = forwardRef(
    ({ children, className, hideButton, isLink, isNested, isOpen, hasFocusInside, ...props }, forwardedRef) => {
        // Conditional show
        if (hideButton) {
            return null;
        }

        return createElement(
            isLink ? "a" : "button",
            {
                ref: forwardedRef,
                type: !isLink ? "button" : undefined,
                className: classNames(
                    isNested ? "menu-item" : "root-menu",
                    {
                        "btn mx-button": !isLink,
                        "mx-link": isLink,
                        active: isNested ? isOpen && hasFocusInside : isOpen
                    },
                    className
                ),
                role: isNested ? "menuitem" : undefined,
                "data-open": isOpen ? "" : undefined,
                "data-nested": isNested ? "" : undefined,
                "data-focus-inside": hasFocusInside ? "" : undefined,
                ...props
            },
            children
        );
    }
);
