import { createElement, forwardRef, useContext } from "react";
import { useFloatingTree, useListItem, useMergeRefs } from "@floating-ui/react";
import classNames from "classnames";
import { Icon } from "./Icon";
import { MenuContext } from "./MenuContext";

/**
 * MenuItem element
 *
 * Wrapped in `forwardRef()` for accepting external refs.
 *
 * @since 1.0.0
 *
 * @param {String}  options.className   Menu item class name.
 * @param {String}  options.label       Menu item label attribute.
 * @param {String}  options.subtitle    Menu item subtitle attribute.
 * @param {Object}  options.icon        Menu item icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String}  options.buttonStyle Menu item button style attribute.
 * @param {Boolean} options.border      Whether the menu item has a border.
 * @param {Boolean} options.disabled    Whether the menu item is disabled.
 */
export const MenuItem = forwardRef(
    ({ className, label, subtitle, icon, buttonStyle, border, disabled, ...props }, forwardedRef) => {
        // Using the menu context
        const { getItemProps, activeIndex, setHasFocusInside } = useContext(MenuContext);

        // Using the floating tree context
        const tree = useFloatingTree();

        // Define item in the floating list
        const { ref, index } = useListItem({ label: disabled ? null : label });

        // Define whether this is the active item
        const isActive = index === activeIndex;

        return (
            <button
                ref={useMergeRefs([ref, forwardedRef])}
                type="button"
                role="menuitem"
                className={classNames(
                    "btn mx-button",
                    className,
                    { "btn-bordered": border },
                    `btn-${buttonStyle}`,
                    "menu-item"
                )}
                {...getItemProps({
                    ...props,
                    onClick(event) {
                        props.onClick?.(event);
                        tree?.events.emit("click");
                    },
                    onFocus(event) {
                        props.onFocus?.(event);
                        setHasFocusInside(true);
                    }
                })}
                tabIndex={isActive ? 0 : -1}
                disabled={disabled}
            >
                <Icon icon={icon} />
                <div className="menu-item-caption">
                    <span className="menu-item-label">{label}</span>
                    {subtitle && <span className="menu-item-subtitle">{subtitle}</span>}
                </div>
            </button>
        );
    }
);
