import { createElement, useContext } from "react";
import { useFloatingTree, useListItem } from "@floating-ui/react";
import classNames from "classnames";
import { MenuContext } from "./MenuContext";

/**
 * MenuItemWidgets element
 *
 * @since 1.11.0
 *
 * @param {String}  options.className    Menu item class name.
 * @param {String}  options.label        Optional. Menu item label attribute.
 * @param {String}  options.itemContent  Menu item widgets.
 * @param {String}  options.closeOnClick Whether the menu closes on clicking the menu item.
 */
export function MenuItemWidgets({ className, label, itemContent: children, closeOnClick, ...props }) {
    // Using the menu context
    const { getItemProps, activeIndex, setHasFocusInside } = useContext(MenuContext);

    // Using the floating tree context
    const tree = useFloatingTree();

    // Define item in the floating list
    const { ref, index } = useListItem({ label: label });

    // Define whether this is the active item
    const isActive = index === activeIndex;

    return (
        <div
            ref={ref}
            role="menuitem"
            className={classNames(className, "menu-item", "widgets-item")}
            {...getItemProps({
                ...props,
                onClick(event) {
                    if (closeOnClick) tree?.events.emit("click");
                },
                onFocus(event) {
                    props.onFocus?.(event);
                    setHasFocusInside(true);
                }
            })}
            tabIndex={isActive ? 0 : -1}
        >
            {children}
        </div>
    );
}
