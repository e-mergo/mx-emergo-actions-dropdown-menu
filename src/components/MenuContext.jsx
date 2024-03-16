import { createContext } from "react";

/**
 * MenuContext object
 *
 * @since 1.0.0
 */
export const MenuContext = createContext({
    activeIndex: null,
    isOpen: false,
    getItemProps: () => {},
    setActiveIndex: () => {},
    setHasFocusInside: () => {}
});
