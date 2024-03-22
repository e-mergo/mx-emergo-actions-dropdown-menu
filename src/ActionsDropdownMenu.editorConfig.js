import { hidePropertiesIn, hideNestedPropertiesIn } from "@mendix/pluggable-widgets-tools";

// Define actionList specific properties for menu items
const actionListMenuItemKeys = [
    "actionListDatasource",
    "actionListLabel",
    "actionListOnClick",
    "actionListVisible",
    "actionListClassName"
];

// Define conditional properties for menu items
const keysToHideByMenuItemType = {
    action: [...actionListMenuItemKeys],
    actionList: ["label", "onClick", "visible", "className"],
    divider: [...actionListMenuItemKeys, "onClick", "icon", "buttonStyle", "border"],
    submenu: [...actionListMenuItemKeys, "onClick", "border"],
    submenuEnd: [...actionListMenuItemKeys, "label", "onClick", "icon", "buttonStyle", "border", "visible", "className"]
};

/**
 * Control visibility of properties in Studio Pro
 *
 * @param {Object}     values
 * @param {Properties} defaultProperties
 * @param {String}     target
 * @return {Properties} Widget properties
 */
export function getProperties(values, defaultProperties, target) {
    // Conditional event property
    if (!values.onClick) {
        hidePropertiesIn(defaultProperties, values, ["actionButtonStyle", "actionButtonBorder"]);
    }

    // Walk menu items
    values.items.forEach((item, index) => {
        // Conditional properties
        hideNestedPropertiesIn(defaultProperties, values, "items", index, [...keysToHideByMenuItemType[item.itemType]]);
    });

    return defaultProperties;
}

/**
 * Return the widget appearance definition
 *
 * @param {Object}  values
 * @param {Boolean} isDarkMode
 * @param {Array}   version
 * @return {Object} Preview definition
 */
export function getPreview(values, isDarkMode, version) {
    // return {
    //     type: "Image",
    //     document: decodeURIComponent(
    //         (isDarkMode ? StructurePreviewSvgDark : StructurePreviewSvg).replace("data:image/svg+xml,", "")
    //     ),
    //     height: 57,
    //     width: 250
    // };
}

/**
 * Return the custom widget caption
 *
 * @param {Object} values
 * @param {String} platform
 * @return {String} Custom caption
 */
export function getCustomCaption(values, platform) {
    return "Actions Dropdown Menu";
}
