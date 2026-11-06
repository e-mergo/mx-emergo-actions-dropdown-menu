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
 * @param {Boolean} hideElement    Whether to not render the element.
 * @param {Boolean} isLink         Whether the button is rendered as a link.
 * @param {Boolean} isNested       Whether the button is nested inside a menu.
 * @param {Boolean} isOpen         Whether the button's menu is open.
 * @param {Boolean} hasFocusInside Whether the button's menu has focus.
 */
export const MenuButton = forwardRef(
    ({ children, className, hideElement, isLink, isNested, isOpen, hasFocusInside, ...props }, forwardedRef) => {
        // Conditional show
        if (hideElement) {
            return null;
        }

        return createElement(
            isLink ? "a" : "button",
            {
                ref: forwardedRef,
                href: isLink ? "#" : undefined,
                type: !isLink ? "button" : undefined,
                className: classNames(
                    {
                        "btn mx-button": !isLink,
                        "mx-link": isLink
                    },
                    className,
                    { active: isNested ? isOpen && hasFocusInside : isOpen },
                    isNested ? "menu-item" : "root-menu-trigger root-menu" /* Keep .root-menu for back-compat */
                ),
                role: isNested ? "menuitem" : isLink ? "button" : undefined,
                "data-open": isOpen ? "" : undefined,
                "data-nested": isNested ? "" : undefined,
                "data-focus-inside": hasFocusInside ? "" : undefined,
                ...props
            },
            children
        );
    }
);
