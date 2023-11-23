import { createElement } from "react";
import classNames from "classnames";

/**
 * MenuDivider element
 *
 * @since 1.0.0
 *
 * @param {String} options.className Element class name.
 * @param {String} options.label     Optional. Menu label attribute.
 */
export function MenuDivider({ className, label, ...props }) {
    return (
        <div className={classNames(className, "menu-item menu-divider")} {...props}>
            {label}
        </div>
    );
}
