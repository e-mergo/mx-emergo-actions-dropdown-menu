import { Fragment, createElement } from "react";
import classNames from "classnames";

/**
 * ButtonGroup element
 *
 * @since 1.0.0
 *
 * @param {Array}  children  Element children.
 * @param {String} className Element class name.
 */
export function ButtonGroup({ children, className, ...props }) {
    return children.filter(Boolean).length > 1 ? (
        <div className={classNames("mx-buttongroup", className)} {...props}>
            {children}
        </div>
    ) : (
        <Fragment>{children}</Fragment>
    );
}
