# Actions Dropdown Menu

Mendix custom widget for listing a set of action buttons in a dropdown menu

**Actions Dropdown Menu** is a Mendix widget created by [E-mergo](https://www.e-mergo.nl). Use this widget to list any number of action buttons into a dropdown menu. Using custom actions you can set dynamic naming, visibility, button style, and action type of each menu item. Creating submenus is also possible. The widget uses the [Floating UI library](https://floating-ui.com/) for creating the interactive dropdown menu, which supports keyboard interaction. The widget supports RTL layouts.

In contrast with similar solutions within Mendix (like Menus or the Pop-up menu widget), this widget provides a combination of:

-   Submenus
-   Dynamic lists of menu items
-   Dividers with optional caption
-   Conditional visibility per menu item
-   Style options per menu item

This widget is [hosted on GitHub](https://github.com/e-mergo/mx-emergo-actions-dropdown-menu). You can report bugs and discuss features on the [issues page](https://github.com/e-mergo/mx-emergo-actions-dropdown-menu/issues).

## Disclaimer

This widget is created free of charge for Mendix developers, personal or professional. E-mergo developers aim to maintain the functionality of this widget with each new release of Mendix. However, this product does not ship with any warranty of support. If you require any updates to the widget or would like to request additional features, please inquire for E-mergo's commercial plans for supporting your widget needs at support@e-mergo.nl.

## Features

Below is a detailed description of the available features of this widget.

### Caption

Set the menu button label with plain text or use parameters to create a dynamic menu label.

### Icon

Set the menu button icon with a icon or image from the icon library.

### Button style

Set the button style of the menu button with a choice from the familiar set of styles.

### Border

Set whether the button is decorated with a border.

### Interaction

Set the interaction method of the menu: open the menu on click or on hover.

### Position

Set the position of the menu relative to the horizontal dimension of the menu button: above or below.

### Alignment

Set the position of the menu relative to the vertical side of the menu button: start or end. In common layouts start means left and end means right, while in RTL layouts start means right and end means left.

### Visibility

Set the visibility of the dropdown menu like any other widget.

### Events: On click

Optionally set the menu button click action. When set, the menu button is split into a button group combining an action button and a dropdown button. Additionally set a separate button style and border decoration for the action button.

### Menu dropdown icon

Set the menu dropdown icon with a icon or image from the icon library. By default a downward facing caret is used.

### Menu items

Set the menu items of the dropdown menu. Choose from the following types of menu items:

-   Action. This item defines a single actionable menu item.
-   Action list. This item defines multiple actionable menu items based on objects from a data source.
-   Divider. This item defines a dividing line with an optional caption.
-   Submenu. This item indicates the start of a subset of menu items.
-   Submenu end. This item indicates the end of a submenu.

The list of menu items is a flat list, which means that submenus are not defined in a visual hierarchy. Submenus are defined as menu items just like actions. Start a submenu of actions with a menu item of type 'Submenu' and end a submenu with a menu item of type 'Submenu end'. Submenus without a subsequent 'Submenu end' will contain all subsequent actions. There is no limit to the amount of nested submenus.

The following attributes may be set on a menu item:

-   Data source
-   Caption
-   Icon
-   Button style
-   Border
-   On click event
-   Visible
-   Class

### Hide empty menu

Select whether to hide the button when the menu does not show any items: hide, hide the dropdown icon only, do not hide.

## Usage

Follow these steps to add the widget to your Mendix project:

1. Download the Widget from the Mendix Marketplace in Studio Pro.
2. Insert the Widget in a page.
3. Configure the Widget. The Caption attribute and Menu items are required.
4. Run the app and interact with the dropdown menu.

## Styling

The widget is styled to blend in with the default styling of other button widgets in Mendix' Atlas UI. Also the action and submenu menu items are button elements with the default 'btn' class, which makes them behave and look like other Mendix buttons. The widget can be styled through CSS in your project's theme styles.

-   'actions-dropdown-menu-button' is the class name of the menu button element.
-   'actions-dropdown-menu' is the class name of the popup root menu of actions.
-   'actions-dropdown-submenu' is the class name of each popup submenu of actions.
-   'root-menu' is the class name of the root menu button.
-   'menu-item' is the class name of each menu item.
-   'menu-divider' is the class name of a menu divider.

## FAQ

### Can I get support for this widget?

E-mergo provides paid support through standard support contracts. For other scenarios, you can post your bugs or questions in the widget's GitHub repository.

### Can you add feature X?

Requests for additional features can be posted in the widget's GitHub repository. Depending on your own code samples and the availability of E-mergo developers your request may be considered and included.

## Changelog

#### 1.3.0 - 20240317

-   Added the Action list menu item type. Action lists generate multiple menu items based on objects from a data source.
-   Added attribute for the menu item class name.
-   Added attribute grouping for the menu item configuration.
-   Fixed missing tabindex for the action menu button element.

#### 1.2.1 - 20240226

-   Fixed missing classnames for the dropdown menu button element.

#### 1.2.0 - 20240225

-   Added attribute for hiding the button when the menu is empty.
-   Fixed removing unauthorized actions from the menu.

#### 1.1.0 - 20240224

-   Added attribute for the dropdown menu icon.
-   Added attribute for the dropdown button border.
-   Added attribute for the action button style.
-   Added attribute for the action button border.

#### 1.0.0 - 20231123 - Mendix 9.24.3

Initial release.
