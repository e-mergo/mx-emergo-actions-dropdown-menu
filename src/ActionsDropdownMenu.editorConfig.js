import { hidePropertiesIn, hideNestedPropertiesIn } from "@mendix/pluggable-widgets-tools";

// Define boolean specific properties for menu items
const booleanMenuItemKeys = ["booleanAttribute"];

// Define actionList specific properties for menu items
const actionListMenuItemKeys = [
    "actionListDatasource",
    "actionListLabel",
    "actionListSubtitle",
    "actionListOnClick",
    "actionListCloseOnClick",
    "actionListVisible",
    "actionListClassName"
];

// Define enumeration specific properties for menu items
const enumerationMenuItemKeys = ["enumerationAttribute", "enumerationAttributeHideSelected"];

// Define submenu specific properties for menu items
const submenuItemKeys = ["submenuClassName", "inheritMenuClassName"];

// Define widgets specific properties for menu items
const widgetsItemKeys = ["itemContent"];

// Define conditional properties for menu items
const keysToHideByMenuItemType = {
    action: [
        ...booleanMenuItemKeys,
        ...actionListMenuItemKeys,
        ...enumerationMenuItemKeys,
        ...submenuItemKeys,
        ...widgetsItemKeys
    ],
    actionList: [
        ...booleanMenuItemKeys,
        ...enumerationMenuItemKeys,
        ...submenuItemKeys,
        ...widgetsItemKeys,
        "label",
        "subtitle",
        "onClick",
        "closeOnClick",
        "visible",
        "className"
    ],
    enumeration: [
        ...booleanMenuItemKeys,
        ...actionListMenuItemKeys,
        ...submenuItemKeys,
        ...widgetsItemKeys,
        "label",
        "subtitle"
    ],
    boolean: [...actionListMenuItemKeys, ...enumerationMenuItemKeys, ...submenuItemKeys, ...widgetsItemKeys],
    divider: [
        ...booleanMenuItemKeys,
        ...actionListMenuItemKeys,
        ...enumerationMenuItemKeys,
        ...submenuItemKeys,
        ...widgetsItemKeys,
        "subtitle",
        "onClick",
        "closeOnClick",
        "icon",
        "buttonStyle",
        "border"
    ],
    submenu: [
        ...booleanMenuItemKeys,
        ...actionListMenuItemKeys,
        ...enumerationMenuItemKeys,
        ...widgetsItemKeys,
        "onClick",
        "closeOnClick",
        "border"
    ],
    submenuEnd: [
        ...booleanMenuItemKeys,
        ...actionListMenuItemKeys,
        ...enumerationMenuItemKeys,
        ...submenuItemKeys,
        ...widgetsItemKeys,
        "label",
        "subtitle",
        "onClick",
        "closeOnClick",
        "icon",
        "buttonStyle",
        "border",
        "visible",
        "className"
    ],
    widgets: [
        ...booleanMenuItemKeys,
        ...actionListMenuItemKeys,
        ...enumerationMenuItemKeys,
        ...submenuItemKeys,
        "subtitle",
        "onClick",
        "icon",
        "buttonStyle",
        "border"
    ]
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
    // Conditional event properties
    if (!values.onClick) {
        hidePropertiesIn(defaultProperties, values, ["actionButtonStyle", "actionButtonBorder", "actionButtonVisible"]);
    }

    // Links cannot do actions AND menus
    if ("link" === values.renderMode) {
        hidePropertiesIn(defaultProperties, values, [
            "buttonStyle",
            "border",
            "actionButtonStyle",
            "actionButtonBorder",
            "actionButtonVisible"
        ]);

        if ("click" === values.openOn) {
            hidePropertiesIn(defaultProperties, values, ["onClick"]);
        }
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
