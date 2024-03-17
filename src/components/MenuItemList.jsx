import { createElement, Fragment } from "react";
import { MenuItem } from "./MenuItem";
import { setupActionCallback } from "../util";

/**
 * MenuItemList element
 *
 * @since 1.0.0
 *
 * @param {String}  options.actionListClassName  Menu item class name.
 * @param {Object}  options.actionListDatasource Datasource for menu items.
 * @param {Object}  options.actionListLabel      Menu item label handler.
 * @param {Object}  options.actionListOnClick    Menu item onClick handler.
 * @param {Object}  options.icon                 Menu item icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String}  options.buttonStyle          Menu item button style attribute.
 * @param {Boolean} options.border               Whether the menu item has a border.
 * @param {Boolean} options.disabled             Whether the menu item is disabled.
 * @param {Object}  options.actionListVisible    Menu item visibility handler.
 */
export function MenuItemList({
    actionListClassName: className,
    actionListDatasource: { items },
    actionListLabel: label,
    actionListOnClick: onClick,
    icon,
    buttonStyle,
    border,
    actionListVisible: visible
}) {
    /**
     * Return the dynamic or static value for the data item
     *
     * @param  {Object} handler Value handler
     * @param  {Object} obj     Data item object
     * @return {Mixed}          Dynamic data item value
     */
    const getDynamicDataItemValue = (handler, obj) => {
        if (handler && obj) {
            return handler.get ? handler.get(obj) : handler;
        }

        return undefined;
    };

    /**
     * Create menu item elements from a list of datasource objects
     *
     * @param  {Array} list List of datsource objects
     * @return {Array}      Menu item elements
     */
    const createMenuItems = list =>
        list
            // Setup item properties with calculated attributes
            .map(item => ({
                id: item.id,
                className: getDynamicDataItemValue(className, item),
                label: getDynamicDataItemValue(label, item),
                icon: icon,
                buttonStyle: buttonStyle,
                border: border,
                onClick: getDynamicDataItemValue(onClick, item),
                visible: getDynamicDataItemValue(visible, item)
            }))

            // Remove invisible items
            .filter(item => item.visible.value)

            // Remove unauthorized actions
            .filter(item => !item.onClick || item.onClick.isAuthorized)

            // Parse calculated attributes
            .map(item => ({
                ...item,
                className: item.className ? item.className.value : undefined,
                label: item.label ? item.label.value : undefined,
                onClick: setupActionCallback(item.onClick),
                visible: item.visible ? item.visible.value : undefined
            }))

            // Setup elements
            .map(props => <MenuItem key="props.id" {...props} />);

    return <Fragment>{createMenuItems(items)}</Fragment>;
}
