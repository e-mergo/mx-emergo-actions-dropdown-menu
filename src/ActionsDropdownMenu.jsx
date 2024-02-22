import { createElement } from "react";
import { DropdownMenu } from "./components/DropdownMenu";
import "./ui/ActionsDropdownMenu.scss";

/**
 * ActionsDropdownMenu element
 *
 * @since 1.0.0
 *
 * @param {String} options.class             Mendix widget class name.
 * @param {Array}  options.items             Menu items attribute.
 * @param {String} options.label             Menu caption attribute.
 * @param {String} options.icon              Menu action icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String} options.dropdownIcon      Menu dropdown icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String} options.buttonStyle       Menu button style attribute.
 * @param {String} options.openOn            Menu interaction attribute.
 * @param {String} options.position          Menu position attribute.
 * @param {String} options.alignment         Menu alignment attribute.
 * @param {String} options.onClick           Menu onClick action.
 * @param {String} options.actionButtonStyle Menu action button style attribute.
 * @param {Number} options.tabIndex          Mendix widget element tabindex.
 */
export function ActionsDropdownMenu({
    class: className,
    items,
    label,
    icon,
    dropdownIcon,
    buttonStyle,
    openOn,
    position,
    alignment,
    onClick,
    actionButtonStyle,
    tabIndex
}) {
    console.log("ActionsDropdownMenu", arguments);

    return (
        <DropdownMenu
            className={className}
            items={items}
            label={label.value}
            icon={icon}
            dropdownIcon={dropdownIcon}
            buttonStyle={buttonStyle}
            interaction={openOn}
            position={position}
            alignment={alignment}
            onClick={onClick}
            actionButtonStyle={actionButtonStyle}
            tabIndex={tabIndex}
        />
    );
}
