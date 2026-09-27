# Beyond shop

- `/shop`: collection story with a CSS-animated photographic hero, detail photography, alien campaign, and planet links.
- `/shop/oxford`: product gallery, optional Three.js prototype, collar/planet configuration, local save, and text download.
- Both routes are lazy-loaded outside the portfolio shell; a Shop link lives in the portfolio footer.

## Replacing the model

Update `SHIRT_MODEL` in `shopConfig.js`. The current asset uses Z-up; `ShirtViewer.jsx` rotates it into Three.js Y-up and automatically centers/scales it. Adjust that rotation for a future Y-up export.

Keep these selectable nodes: `embroidery_left`, `embroidery_right`, and `planet_button_face`. The other mesh names are not required by the viewer. Supply the correct second-button placement in the asset itself.

Jupiter uses the embedded material. Other planets currently use procedural finish studies, which must be replaced with approved button artwork. The supplied model is visibly a structural prototype, so photography remains the default view. A new GLB alone cannot reproduce a cloth simulation; final garment animation needs its own clips or a rendered film.

## Release inputs still needed

Final garment/model and consistent product images, approved button artwork and magnetic construction, size chart, availability, checkout provider, shipping/returns, and applicable product information. There is deliberately no purchase or order submission in this preview. Saved configurations stay on the visitor's device.

`DESIGN_KEY` versions local storage; `readDesign` validates stored values. Ambient CSS motion honors reduced-motion and the footer pause control. The 3D viewer is loaded on demand, caps DPR, suspends offscreen, and disposes its GPU resources on unmount.

Pricing is configured in `SHOP_PRICE`: RUB 4,500 regular / RUB 4,000 current. The same values drive the homepage, product page, and downloaded configuration.
