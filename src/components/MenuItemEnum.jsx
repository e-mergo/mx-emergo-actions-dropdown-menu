import { createElement, Fragment } from "react";
import classNames from "classnames";
import { MenuItem } from "./MenuItem";

/**
 * MenuItemEnum element
 *
 * @since 1.4.0
 *
 * @param {String}   options.className                        Menu item class name.
 * @param {Object}   options.enumerationAttribute             Enumeration attribute.
 * @param {Boolean}  options.enumerationAttributeHideSelected Whether to hide the selected enumeration item.
 * @param {Function} options.onClick                          Menu item onClick handler.
 * @param {Object}   options.icon                             Menu item icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String}   options.buttonStyle                      Menu item button style attribute.
 * @param {Boolean}  options.border                           Whether the menu item has a border.
 */
export function MenuItemEnum({
    className,
    enumerationAttribute: attr,
    enumerationAttributeHideSelected: hideSelected,
    onClick,
    icon,
    buttonStyle,
    border
}) {
    /**
     * Return the callback for the onClick action of the item
     *
     * @param  {String}   item Enum key
     * @return {Function}      Action callback
     */
    const setupEnumActionCallback = item => () => {
        // Set the enum value
        attr.setValue(item);

        // Execute action handler
        if ("function" === typeof onClick) {
            onClick();
        }
    };

    /**
     * Create menu item elements from a list of enumeration keys
     *
     * @param  {Array} list List of enumeration keys
     * @return {Array}      Menu item elements
     */
    const createMenuItems = list =>
        list
            // Filter list of items
            .filter(item => !hideSelected || attr.value !== item)

            // Setup item properties with calculated attributes
            .map(item => ({
                key: item,
                className: classNames(className, "enum-item__".concat(item), {
                    "enum-item-selected": attr.value === item
                }),
                label: attr.formatter.format(item),
                icon,
                buttonStyle,
                border,
                onClick: setupEnumActionCallback(item)
            }))

            // Setup elements
            // Explicit key attribution to satisfy linter react/jsx-key
            .map(props => <MenuItem key={props.key} {...props} />);

    // Perhaps do not render component
    if (attr.readOnly) {
        return null;
    }

    return <Fragment>{createMenuItems(attr.universe)}</Fragment>;
}
