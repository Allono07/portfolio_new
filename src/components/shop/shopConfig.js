export const SHOP_ASSETS = '/assets/shop/';
export const SHIRT_MODEL = `${SHOP_ASSETS}visualization-master/oxford_shirt_visualization_master.glb`;
export const SHOP_PRICE = { currency: 'RUB', regular: 4500, current: 4000 };
export function formatShopPrice(amount) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency', currency: SHOP_PRICE.currency, maximumFractionDigits: 0,
  }).format(amount);
}
export const PLANETS = [
  { id: 'jupiter', name: 'Jupiter', caption: 'A world of warm bands.', color: '#bb8960' },
  { id: 'mars', name: 'Mars', caption: 'For a little rebellion.', color: '#a34e30' },
  { id: 'earth', name: 'Earth', caption: 'A reminder of home.', color: '#417583' },
  { id: 'saturn', name: 'Saturn', caption: 'Quietly extraordinary.', color: '#c1ab78' },
  { id: 'neptune', name: 'Neptune', caption: 'Into the unknown.', color: '#405bb4' },
];
export const DESIGN_KEY = 'beyond-orbit-oxford-v1';
export function readDesign(storage) {
  try {
    const value = JSON.parse(storage.getItem(DESIGN_KEY));
    if (value && PLANETS.some(p => p.id === value.planet) && typeof value.wings === 'boolean') {
      return { planet: value.planet, wings: value.wings };
    }
  } catch { /* Storage may be unavailable in private browsing. */ }
  return { planet: 'jupiter', wings: true };
}
export function designSummary({ planet, wings }) {
  const name = PLANETS.find(p => p.id === planet)?.name || 'Jupiter';
  return `AFTER LIFE THEORY LABS — THE ORBIT OXFORD\n\nCurrent price: ${formatShopPrice(SHOP_PRICE.current)}\nRegular price: ${formatShopPrice(SHOP_PRICE.regular)}\nSavings: ${formatShopPrice(SHOP_PRICE.regular - SHOP_PRICE.current)}\nCurrency: ${SHOP_PRICE.currency}\n\nColor: Forest green\nFit direction: Regular / relaxed\nCollar: ${wings ? 'Ivory angel-wing embroidery' : 'Plain'}\nMagnetic button: ${name}\nPlacement: Second button, counting the collar-band button as first\n\nConcept configuration only. This is not an order.\nSizing, availability, and final construction are to be confirmed.\n`;
}
