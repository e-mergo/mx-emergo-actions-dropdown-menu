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
export const keysToHideByMenuItemType = {
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
