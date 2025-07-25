import { createElement, forwardRef, Fragment, useContext, useRef, useState, useEffect } from "react";
import {
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    useFloating,
    useInteractions,
    useHover,
    useClick,
    useDismiss,
    useListNavigation,
    useRole,
    useTypeahead,
    useMergeRefs,
    offset,
    flip,
    shift,
    autoUpdate,
    safePolygon,
    useFloatingTree,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useListItem
} from "@floating-ui/react";
import classNames from "classnames";
import { ButtonGroup } from "./ButtonGroup";
import { Caption } from "./Caption";
import { Icon } from "./Icon";
import { MenuButton } from "./MenuButton";
import { MenuContext } from "./MenuContext";

/**
 * MenuComponent element
 *
 * Wrapped in `forwardRef()` for accepting external refs.
 *
 * @since 1.0.0
 *
 * @param {Array}   options.children              Element children.
 * @param {String}  options.className             Element class name.
 * @param {String}  options.label                 Menu label attribute.
 * @param {Object}  options.icon                  Menu action icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {Object}  options.renderMode            Menu render mode attribute.
 * @param {Object}  options.dropdownIcon          Menu dropdown icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {Object}  options.menuClassName         Menu menu class name attribute.
 * @param {String}  options.buttonStyle           Menu button style attribute.
 * @param {Boolean} options.border                Whether the menu has a border.
 * @param {String}  options.interaction           Menu interaction attribute.
 * @param {String}  options.position              Menu position attribute.
 * @param {String}  options.alignment             Menu alignment attribute.
 * @param {String}  options.onClick               Menu onClick action.
 * @param {String}  options.actionButtonStyle     Menu action button style attribute.
 * @param {Boolean} options.actionButtonBorder    Whether the action button has a border.
 * @param {String}  options.hideDropdownWhenEmpty Enumeration of how to hide the dropdown when the menu is empty.
 * @param {Number}  options.tabIndex              Element tabindex.
 */
export const MenuComponent = forwardRef(
    (
        {
            children,
            className,
            label,
            icon,
            renderMode,
            dropdownIcon,
            menuClassName,
            buttonStyle,
            border,
            interaction,
            position,
            alignment,
            actionButtonStyle,
            actionButtonBorder,
            hideDropdownWhenEmpty,
            tabIndex,
            ...props
        },
        forwardedRef
    ) => {
        // Define state for showing/hiding the menu
        const [isOpen, setIsOpen] = useState(false);

        // Define state for focussing inside the menu
        const [hasFocusInside, setHasFocusInside] = useState(false);

        // Define state for the active item index
        const [activeIndex, setActiveIndex] = useState(null);

        // Define reference list for the menu elements
        const elementsRef = useRef([]);

        // Define reference list for the menu labels elements
        const labelsRef = useRef([]);

        // Using the parent menu context
        const parent = useContext(MenuContext);

        // Using the floating tree context
        const tree = useFloatingTree();

        // Get the current node id in the floating tree
        const nodeId = useFloatingNodeId();

        // Get the parent node's id in the floating tree
        const parentId = useFloatingParentNodeId();

        // Define item in the floating list
        const { ref, index } = useListItem();

        // Check whether the current node is nested
        const isNested = parentId !== null;

        // Check whether to render the element as a link
        const isLink = !isNested && "link" === renderMode;

        // Check whether the root button also triggers actions. Not for links.
        const isActionTrigger = !isNested && !!props.onClick && !isLink;

        // Check whether to show the root menu button
        const showDropdown = !isNested && "yes" === hideDropdownWhenEmpty ? !!children.length : true;

        // Check whether to show the root menu button
        const showDropdownIcon = !isNested && "icon" === hideDropdownWhenEmpty ? !!children.length : true;

        // Check whether the UI is in RTL
        const isRtl = "rtl" === window.mx.session.sessionData.uiconfig.direction; // Mx global

        // Configuration of Floating UI
        const {
            // References for the trigger and menu element
            refs,

            // Styles for the menu element
            floatingStyles,

            // Floating UI context
            context
        } = useFloating({
            // Node identifier
            nodeId,

            // Open/close menu
            open: isOpen,

            // Change open/close menu
            onOpenChange: setIsOpen,

            // Menu placement
            placement: isNested ? (isRtl ? "left-start" : "right-start") : `${position}-${alignment}`, // "bottom-start", "top-end", etc.

            // Menu transforms
            middleware: [
                // Add distance between trigger and menu
                offset({
                    mainAxis: isNested ? 2 : 4,
                    alignmentAxis: 0
                }),

                // Flip menu when lacking space
                flip(),

                // Shift menu when lacking space
                shift({ padding: 10 })
            ],

            // Update menu position when interacting with the page
            whileElementsMounted: autoUpdate
        });

        // Define interactions
        const hover = useHover(context, {
            enabled: isNested || "hover" === interaction,
            delay: { open: 75 },
            handleClose: safePolygon({ blockPointerEvents: true })
        });
        const click = useClick(context, {
            enabled: isNested || "click" === interaction,
            event: "mousedown",
            toggle: !isNested,
            ignoreMouse: isNested
        });
        const dismiss = useDismiss(context, { bubbles: true });
        const role = useRole(context, { role: "menu" });
        const listNavigation = useListNavigation(context, {
            listRef: elementsRef,
            activeIndex,
            nested: isNested,
            onNavigate: setActiveIndex,
            rtl: isRtl
        });
        const typeahead = useTypeahead(context, {
            listRef: labelsRef,
            onMatch: isOpen ? setActiveIndex : undefined,
            activeIndex
        });
        const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
            hover,
            click,
            dismiss,
            role,
            listNavigation,
            typeahead
        ]);

        // Trigger 'menuopen' event when the menu is opened
        useEffect(() => {
            if (isOpen && tree) {
                tree.events.emit("menuopen", { nodeId, parentId });
            }
        }, [tree, isOpen, nodeId, parentId]);

        // Close all menus when clicking in the tree
        useEffect(() => {
            // Bail when no tree is found
            if (!tree) return () => {};

            /**
             * Close the menu when clicking in the tree
             *
             * @return {Void}
             */
            function onTreeClick() {
                setIsOpen(false);
            }

            /**
             * Close the menu when opening a sibling node
             *
             * @param  {Object} event Event data
             * @return {Void}
             */
            function onTreeMenuOpen(event) {
                if (event.nodeId !== nodeId && event.parentId === parentId) {
                    setIsOpen(false);
                }
            }

            // Register events
            tree.events.on("click", onTreeClick);
            tree.events.on("menuopen", onTreeMenuOpen);

            return () => {
                // Unregister events
                tree.events.off("click", onTreeClick);
                tree.events.off("menuopen", onTreeMenuOpen);
            };
        }, [tree, nodeId, parentId]);

        return (
            <FloatingNode id={nodeId}>
                <ButtonGroup className={className}>
                    {isActionTrigger && showDropdown && (
                        <button
                            type="button"
                            className={classNames(
                                "btn mx-button action-button",
                                { "btn-bordered": actionButtonBorder },
                                `btn-${actionButtonStyle}`
                            )}
                            tabIndex={tabIndex}
                            {...props}
                        >
                            {(icon || label) && (
                                <div className="root-label">
                                    <Icon icon={icon} />
                                    <Caption label={label} />
                                </div>
                            )}
                        </button>
                    )}
                    <MenuButton
                        ref={useMergeRefs([refs.setReference, ref, forwardedRef])}
                        className={classNames({
                            [className || ""]: !isActionTrigger,
                            "btn-bordered": border,
                            [`btn-${buttonStyle}`]: !isLink
                        })}
                        hideButton={!showDropdown || (isActionTrigger && !showDropdownIcon)}
                        isLink={isLink}
                        isNested={isNested}
                        isOpen={isOpen}
                        hasFocusInside={hasFocusInside}
                        tabIndex={!isNested ? tabIndex : parent.activeIndex === index ? 0 : -1}
                        {...getReferenceProps({
                            ...parent.getItemProps({
                                ...(!isActionTrigger && props),
                                onFocus(event) {
                                    if (!isActionTrigger) props.onFocus?.(event);
                                    setHasFocusInside(false);
                                    parent.setHasFocusInside(true);
                                }
                            }),
                            onClick(event) {
                                if (isLink) {
                                    // Ignore anchor href link
                                    event.preventDefault();

                                    // Allow links to execute onClick action when clicking the dropdown.
                                    // The link's onClick event is only exposed when using hover interaction
                                    // so the link is actionable while the menu still opens. For click
                                    // interaction no action should run when clicking to open the menu.
                                    if ("hover" === interaction) {
                                        props.onClick?.(event);
                                        tree.events.emit("click");
                                    }
                                }
                            }
                        })}
                    >
                        {!isActionTrigger && (icon || label || props.subtitle) && (
                            <div className={classNames(isNested ? "submenu-label" : "root-label")}>
                                <Icon className="menu-item-icon" icon={icon} />
                                <Caption label={label} subtitle={props.subtitle} />
                            </div>
                        )}
                        {showDropdownIcon && (
                            <Fragment>
                                <Icon className="menu-item-open" icon={dropdownIcon} />
                                {!dropdownIcon && <span aria-hidden className="menu-item-open caret"></span>}
                            </Fragment>
                        )}
                    </MenuButton>
                </ButtonGroup>
                <MenuContext.Provider
                    value={{
                        getItemProps,
                        activeIndex,
                        setActiveIndex,
                        setHasFocusInside,
                        isOpen
                    }}
                >
                    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                        {isOpen && (
                            <FloatingPortal>
                                <FloatingFocusManager
                                    context={context}
                                    modal={false}
                                    initialFocus={isNested ? -1 : 0}
                                    returnFocus={!isNested}
                                >
                                    <div
                                        ref={refs.setFloating}
                                        className={classNames({
                                            "actions-dropdown-menu": !isNested,
                                            "actions-dropdown-submenu": isNested,
                                            [menuClassName || ""]: !isNested
                                        })}
                                        style={floatingStyles}
                                        {...getFloatingProps()}
                                    >
                                        {children}
                                    </div>
                                </FloatingFocusManager>
                            </FloatingPortal>
                        )}
                    </FloatingList>
                </MenuContext.Provider>
            </FloatingNode>
        );
    }
);

/**
 * Menu element
 *
 * Wrapped in `forwardRef()` for accepting external refs.
 *
 * @since 1.0.0
 */
export const Menu = forwardRef((props, ref) => {
    // Get the parent node's id in the floating tree
    const parentId = useFloatingParentNodeId();

    // Wrap the root menu in a floating tree
    if (parentId === null) {
        return (
            <FloatingTree>
                <MenuComponent {...props} ref={ref} />
            </FloatingTree>
        );
    }

    return <MenuComponent {...props} ref={ref} />;
});
