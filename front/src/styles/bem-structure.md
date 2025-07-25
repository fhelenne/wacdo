# BEM Structure for Wacdo Admin App

## BEM Methodology Overview
- **Block**: Independent component (e.g., `nav`, `search-bar`, `data-table`)
- **Element**: Part of a block (e.g., `nav__logo`, `search-bar__input`)
- **Modifier**: Variation of block/element (e.g., `nav--mobile`, `button--primary`)

## Component BEM Structure

### Navigation (nav)
- `nav` - Main navigation block
- `nav__container` - Navigation container
- `nav__brand` - Logo/brand area
- `nav__menu` - Navigation menu
- `nav__item` - Navigation item
- `nav__item--active` - Active navigation item
- `nav__user` - User section
- `nav__logout` - Logout button

### Page Header (page-header)
- `page-header` - Main header block
- `page-header__title` - Page title
- `page-header__actions` - Action buttons area

### Search Bar (search-bar)
- `search-bar` - Main search block
- `search-bar__input` - Search input field
- `search-bar__filters` - Filters container
- `search-bar__filter` - Individual filter

### Data Table (data-table)
- `data-table` - Main table block
- `data-table__header` - Table header
- `data-table__row` - Table row
- `data-table__cell` - Table cell
- `data-table__actions` - Actions column

### Button (button)
- `button` - Main button block
- `button--primary` - Primary button style
- `button--secondary` - Secondary button style
- `button--danger` - Danger button style

### Pagination (pagination)
- `pagination` - Main pagination block
- `pagination__info` - Information text
- `pagination__controls` - Navigation controls
- `pagination__button` - Pagination button
- `pagination__button--disabled` - Disabled button

## Role Attributes Mapping
- Navigation: `role="navigation"`
- Search: `role="search"`
- Table: `role="table"`
- Buttons: `role="button"`
- Main content: `role="main"`
- Headers: `role="banner"`