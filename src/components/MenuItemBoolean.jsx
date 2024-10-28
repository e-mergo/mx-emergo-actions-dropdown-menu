import { createElement } from "react";
import classNames from "classnames";
import { MenuItem } from "./MenuItem";

/**
 * MenuItemBoolean element
 *
 * @since 1.6.0
 *
 * @param {String}   options.className        Menu item class name.
 * @param {Object}   options.booleanAttribute Boolean attribute.
 * @param {Function} options.onClick          Menu item onClick handler.
 */
export function MenuItemBoolean({ className, booleanAttribute: attr, onClick, ...props }) {
    /**
     * Return the callback for the onClick action
     *
     * @return {Function} Action callback
     */
    const setupBooleanActionCallback = () => () => {
        // Toggle the boolean value
        attr.setValue(!attr.value);

        // Execute action handler
        if ("function" === typeof onClick) {
            onClick();
        }
    };

    // Perhaps do not render component
    if (attr.readOnly) {
        return null;
    }

    return (
        <MenuItem
            className={classNames(className, {
                "boolean-item-active": attr.value,
                "boolean-item-inactive": !attr.value
            })}
            onClick={setupBooleanActionCallback()}
            {...props}
        />
    );
}
