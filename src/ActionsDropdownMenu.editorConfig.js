import { hidePropertiesIn, hideNestedPropertiesIn } from "@mendix/pluggable-widgets-tools";
import { keysToHideByMenuItemType } from "./mappings";

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

    // Buttons
    if ("button" === values.renderMode) {
        hidePropertiesIn(defaultProperties, values, ["customTrigger"]);
    }

    // Links cannot do actions AND menus
    if ("link" === values.renderMode) {
        hidePropertiesIn(defaultProperties, values, [
            "buttonStyle",
            "border",
            "actionButtonStyle",
            "actionButtonBorder",
            "actionButtonVisible",
            "customTrigger"
        ]);

        if ("click" === values.openOn) {
            hidePropertiesIn(defaultProperties, values, ["onClick"]);
        }
    }

    // Custom triggers cannot have captions or do actions
    if ("custom" === values.renderMode) {
        hidePropertiesIn(defaultProperties, values, [
            "label",
            "icon",
            "buttonStyle",
            "border",
            "actionButtonStyle",
            "actionButtonBorder",
            "actionButtonVisible",
            "onClick",
            "dropdownIcon"
        ]);
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
