import { createElement } from "react";
import classNames from "classnames";
import { Menu } from "./Menu";
import { MenuDivider } from "./MenuDivider";
import { MenuItem } from "./MenuItem";

/**
 * DropdownMenu element
 *
 * @since 1.0.0
 *
 * @param {String} options.className   Element class name.
 * @param {Array}  options.items       Menu items attribute.
 * @param {String} options.label       Menu caption attribute.
 * @param {String} options.icon        Menu icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String} options.buttonStyle Menu button style attribute.
 * @param {String} options.interaction Menu interaction attribute.
 * @param {String} options.position    Menu position attribute.
 * @param {String} options.alignment   Menu alignment attribute.
 * @param {String} options.onClick     Menu onClick action.
 * @param {Number} options.tabIndex    Element tabindex.
 */
export function DropdownMenu({
    className,
    items,
    label,
    icon,
    buttonStyle,
    interaction,
    position,
    alignment,
    onClick,
    tabIndex
}) {
    /**
     * Setup callback for an action
     *
     * @param  {Object}   action Mendix action object
     * @return {Function}        Action callback
     */
    const setupActionCallback = action => {
        if (!action) {
            return null;
        }

        return () => {
            if (action && action.isAuthorized && action.canExecute && !action.isExecuting) {
                action.execute();
            }
        };
    };

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

                // Add other items (action, divider) to the list
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

            // Remove leading dividers without label and trailing dividers
            .filter((item, index, arr) =>
                "divider" === item.itemType ? (0 !== index || item.label.value) && index !== arr.length - 1 : true
            )

            // Setup elements
            .map(item => {
                // Prepare props
                const props = {
                    label: item.label.value,
                    icon: item.icon,
                    buttonStyle: "divider" !== item.itemType ? item.buttonStyle : false,
                    border: item.border,
                    onClick: setupActionCallback(item.onClick)
                };

                // Add submenu, require visible items
                if ("submenu" === item.itemType) {
                    const children = createMenuItems(item.list);

                    return children.length ? <Menu {...props}>{children}</Menu> : null;

                    // Add divider item
                } else if ("divider" === item.itemType) {
                    return <MenuDivider {...props} />;

                    // Add generic menu item
                } else {
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
            buttonStyle={buttonStyle}
            interaction={interaction}
            position={position}
            alignment={alignment}
            onClick={setupActionCallback(onClick)}
            tabIndex={tabIndex}
        >
            {createMenuItems(createHierarchyFromFlatList(items))}
        </Menu>
    );
}
