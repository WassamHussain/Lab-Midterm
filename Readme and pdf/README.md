# Midterm Lab: Upgrade Your E-commerce Navigation, Checkout and Cart

- **Name:** Wassam Hussain
- **Roll number:** FA24-BCS-131
- **N** = 31
- **BP** = 600 + 31 = **631px**
- **H** = (31 x 7) mod 360 = **217** (accent colour `hsl(217, 70%, 45%)`, stored in `--accent`)
- **K** = (31 mod 3) + 3 = **4** columns
- Max adds per product = (31 mod 4) + 2 = **5**
- Exam date used for the delivery window: 2026-10-29, so `min="2026-10-29"` and `max="2026-11-29"` (N = 31 days later)

## Files changed

| File | Status |
|---|---|
| `index.html` | changed (navbar, cart icon and mini cart, script link) |
| `product.html` | changed (same navbar as index.html) |
| `checkout.html` | new |
| `styles.css` | changed (header rules rewritten, Task 1 to 3 sections added at the end) |
| `script.js` | new |
| `README.md` | new |
| `FA24-BCS-131-midterm.pdf` | new |
| `images/` | copied from assignment-2, unchanged |

## Task 1: Mega-menu

- Added a "Shop by Category" item to the navbar in `index.html` and `product.html` (and `checkout.html`, which reuses the same header). Its panel has 4 columns (Roasts, Flavors, Brew methods, Gear and merch), 5 links each, one `<h3>` per column, each column is a `<ul>`.
- Bootstrap's `navbar-expand-lg` cannot switch at 631px, so I removed it and wrote the switch in CSS with `@media (min-width: 631px)`: below it the hamburger works, from it up the links are always visible.
- The panel is `position: absolute` under `.navbar`, so it does not push the page down. It sits inside the sticky header (z-index 1030) so it is above the grid and everything else. `:hover` and `:focus-within` open it, so Tab alone works. A small invisible bridge and a 0.3s close delay keep it open while the pointer crosses the gap.
- Below BP the same 4 groups appear inside the hamburger as `<details>` / `<summary>` (closed by default, each opens independently). The desktop panel is hidden there and the accordion is hidden from BP up.
- The big centred logo now starts at 1200px (it was 992px) because the extra link did not fit next to it any earlier.

## Task 2: Checkout form

- New `checkout.html`, linked from the cart icon. Two `<fieldset>` + `<legend>` (Contact, Delivery), every input has a `<label for>` matching its `id`, city is a `<select>`.
- Phone uses `pattern="03[0-9]{2}-[0-9]{7}"`. The date uses `min` / `max`. Email, name and address use `required` / `type`.
- Red border and message use `:user-invalid`, so nothing is red on page load. The message is a `<span class="error">` that only shows after the input is `:user-invalid`.
- From 631px the form is a CSS Grid with 2 columns (fieldsets side by side) and each fieldset is a grid with a label column and an input column. Below that it is one column. The submit button is `w-100` and spans the whole grid. No JavaScript on this page. I left the newsletter box out of this page so every input on it has a label.

## Task 3: Cart badge and mini cart

- `script.js` (plain JavaScript) is linked only from `index.html`. "Add to Cart" pushes `{ name, price }` into an array, reading the name and price from the card itself.
- The cart icon shows a badge with the array length. Clicking the icon toggles the mini-cart panel under it. Each row has a Remove button (`splice`), and the total is calculated with `reduce()`. The list, total and badge are redrawn by one `render()` function.
- Limit: `MAX_PER_PRODUCT = 5`. When a product has been added 5 times its button says "Limit reached" and is disabled, and it is enabled again when one is removed.
- On `index.html` the icon opens the panel (the panel has a "Go to checkout" link). On the other pages, and when JavaScript is off, the icon links to `checkout.html`.

## AI tools used

Claude (Anthropic).
