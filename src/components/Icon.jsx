import { Fragment, createElement } from "react";
import classNames from "classnames";

/**
 * Icon element
 *
 * @since 1.0.0
 *
 * @param {Object} icon Icon object. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 */
export function Icon({ icon }) {
    return (
        <Fragment>
            {icon && icon.value.iconClass && (
                <span
                    aria-hidden
                    className={classNames(
                        {
                            glyphicon: "glyph" === icon.value.type
                        },
                        icon.value.iconClass
                    )}
                ></span>
            )}
            {icon && icon.value.iconUrl && <img aria-hidden src={icon.value.iconUrl} />}
        </Fragment>
    );
}
