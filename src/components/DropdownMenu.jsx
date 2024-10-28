import { createElement } from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { Menu } from "./Menu";
import { MenuDivider } from "./MenuDivider";
import { MenuItem } from "./MenuItem";
import { MenuItemBoolean } from "./MenuItemBoolean";
import { MenuItemEnum } from "./MenuItemEnum";
import { MenuItemList } from "./MenuItemList";
import { setupActionCallback } from "../util";

/**
 * DropdownMenu element
 *
 * @since 1.0.0
 *
 * @param {String}  options.className             Element class name.
 * @param {Array}   options.items                 Menu items attribute.
 * @param {String}  options.label                 Menu caption attribute.
 * @param {String}  options.icon                  Menu action icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String}  options.dropdownIcon          Menu dropdown icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String}  options.buttonStyle           Menu button style attribute.
 * @param {Boolean} options.border                Whether the menu button has a border.
 * @param {String}  options.interaction           Menu interaction attribute.
 * @param {String}  options.position              Menu position attribute.
 * @param {String}  options.alignment             Menu alignment attribute.
 * @param {String}  options.onClick               Menu onClick action.
 * @param {String}  options.actionButtonStyle     Menu action button style attribute.
 * @param {Boolean} options.actionButtonBorder    Whether the action button has a border.
 * @param {String}  options.hideDropdownWhenEmpty Enumeration of how to hide the dropdown when the menu is empty.
 * @param {Number}  options.tabIndex              Element tabindex.
 */
export function DropdownMenu({
    className,
    items,
    label,
    icon,
    dropdownIcon,
    buttonStyle,
    border,
    interaction,
    position,
    alignment,
    onClick,
    actionButtonStyle,
    actionButtonBorder,
    hideDropdownWhenEmpty,
    tabIndex
}) {
    // Holds the menu levels
    const levels = [0];

    /**
     * Create list of items in hierarchy from flat list
     *
     * @param  {Array} _items Flat list of items to parse
     * @param  {Array} list   Optional. List to add items to.
     * @return {Array}        Items in hierarchy
     */
    const createHierarchyFromFlatList = (_items, list) => {
        list = list || [];

        // Iterate over list up to a submenu end
        _items.every((item, index) => {
            // Skip item if it was part of a submenu
            if (levels[levels.length - 1]) {
                levels[levels.length - 1]--;
                return true;
            }

            // Indicate number of items to skip in previous levels
            if (levels.length > 1) {
                levels.every((i, ix, j) => {
                    if (ix < j.length - 1) {
                        levels[ix] = i + 1;
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            // Start new submenu in the list
            if ("submenu" === item.itemType) {
                levels.push(0);
                list.push({ ...item, list: createHierarchyFromFlatList(_items.slice(index + 1)) });

                // End iteration for submenu
            } else if ("submenuEnd" === item.itemType) {
                // Only end submenu when one is started
                if (levels.length > 1) {
                    levels.pop();
                    return false;
                }

                // Add other items (action, actionList, divider) to the list
            } else {
                list.push(item);
            }

            // Always end submenu on the last item
            if (index === _items.length - 1) {
                levels.pop();
            }

            return true;
        });

        return list;
    };

    /**
     * Create menu item elements from a list of items in hierarchy
     *
     * @param  {Array} list List of items in hierarchy to parse
     * @return {Array}      Menu item elements
     */
    const createMenuItems = list =>
        list
            // Remove invisible items
            .filter(item => item.visible.value)

            // Remove unauthorized actions
            .filter(item => !item.onClick || item.onClick.isAuthorized)

            // Remove leading dividers without label and trailing dividers
            .filter((item, index, arr) =>
                "divider" === item.itemType ? (0 !== index || item.label.value) && index !== arr.length - 1 : true
            )

            // Setup elements
            .map(item => {
                // Prepare props
                const props = {
                    ...item,
                    key: uuid(),
                    className: item.className ? item.className.value : undefined,
                    label: item.label.value,
                    subtitle: item.subtitle.value,
                    icon: item.icon,
                    buttonStyle: "divider" !== item.itemType ? item.buttonStyle : false,
                    border: item.border,
                    onClick: setupActionCallback(item.onClick),
                    visible: item.visible.value
                };

                switch (item.itemType) {
                    // Add list of menu items
                    case "actionList":
                        return <MenuItemList {...props} />;

                    // Add boolean menu item
                    case "boolean":
                        return <MenuItemBoolean {...props} />;

                    // Add divider item
                    case "divider":
                        return <MenuDivider {...props} />;

                    // Add menu items from enumeration
                    case "enumeration":
                        return <MenuItemEnum {...props} />;

                    // Add submenu, require visible items
                    case "submenu": {
                        const children = createMenuItems(item.list);
                        return children.length ? <Menu {...props}>{children}</Menu> : null;
                    }

                    // Add generic menu item
                    default:
                        return <MenuItem {...props} />;
                }
            })

            // Remove empty entries
            .filter(Boolean);

    return (
        <Menu
            className={classNames(className, "actions-dropdown-menu-button")}
            label={label}
            icon={icon}
            dropdownIcon={dropdownIcon}
            buttonStyle={buttonStyle}
            border={border}
            interaction={interaction}
            position={position}
            alignment={alignment}
            onClick={setupActionCallback(onClick)}
            actionButtonStyle={actionButtonStyle}
            actionButtonBorder={actionButtonBorder}
            hideDropdownWhenEmpty={hideDropdownWhenEmpty}
            tabIndex={tabIndex}
        >
            {createMenuItems(createHierarchyFromFlatList(items))}
        </Menu>
    );
}
