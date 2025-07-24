import { Fragment, createElement } from "react";
import classNames from "classnames";

/**
 * Icon element
 *
 * @since 1.0.0
 *
 * @param {String} className Icon class name.
 * @param {Object} icon      Icon object. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 */
export function Icon({ className, icon }) {
    return (
        <Fragment>
            {icon && icon.value.iconClass && (
                <span
                    aria-hidden
                    className={classNames(
                        className,
                        {
                            glyphicon: "glyph" === icon.value.type
                        },
                        icon.value.iconClass
                    )}
                ></span>
            )}
            {icon && icon.value.iconUrl && <img className={className} aria-hidden src={icon.value.iconUrl} />}
        </Fragment>
    );
}
