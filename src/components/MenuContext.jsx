import { createContext } from "react";

/**
 * Menu context object
 *
 * @since 1.0.0
 */
export const MenuContext = createContext({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    setHasFocusInside: () => {},
    isOpen: false
});
