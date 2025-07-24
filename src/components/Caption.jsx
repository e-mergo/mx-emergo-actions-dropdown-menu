import { Fragment, createElement } from "react";
import classNames from "classnames";

/**
 * Caption element
 *
 * @since 1.8.0
 *
 * @param {String} className Caption class name.
 * @param {String} label     Caption label.
 * @param {String} subtitle  Caption subtitle.
 */
export function Caption({ className, label, subtitle }) {
    return (
        <Fragment>
            {(label || subtitle) && (
                <div className={classNames("menu-item-caption", className)}>
                    {label && <span className="menu-item-label">{label}</span>}
                    {subtitle && <span className="menu-item-subtitle">{subtitle}</span>}
                </div>
            )}
        </Fragment>
    );
}
