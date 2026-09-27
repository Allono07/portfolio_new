import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DESIGN_KEY, PLANETS, SHOP_ASSETS, SHOP_PRICE, formatShopPrice, designSummary, readDesign } from '../components/shop/shopConfig.js';
import './ShopPage.css';

const productPath = '/shop/oxford';
const A = SHOP_ASSETS;
const phonePattern = Array.from({ length: 12 }, (_, index) => ({ image: index % 3 + 1, position: index + 1 }));
function Arrow({ down = false }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" style={down ? { transform: 'rotate(90deg)' } : undefined}><path d="M4 12h15M12 5l7 7-7 7" /></svg>;
}
function OrbitMark() {
  return <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="20" cy="20" r="9"/><ellipse cx="20" cy="20" rx="19" ry="7" transform="rotate(-35 20 20)"/><circle cx="31" cy="9" r="2" fill="currentColor" stroke="none"/></svg>;
}
function Planet({ id, className = '' }) { return <span aria-hidden="true" className={`shop-planet shop-planet--${id} ${className}`} />; }

function ShopPrice() {
  return <div className="shop-price" aria-label="Price in Russian rubles">
    <s><span className="shop-sr-only">Regular price: </span>{formatShopPrice(SHOP_PRICE.regular)}</s>
    <strong><span className="shop-sr-only">Current discounted price: </span>{formatShopPrice(SHOP_PRICE.current)}</strong>
    <span className="shop-price-saving">Save {formatShopPrice(SHOP_PRICE.regular - SHOP_PRICE.current)}</span>
  </div>;
}

function ShopShell({ children, product }) {
  const { pathname } = useLocation();
  const root = useRef(null);
  const [motion, setMotion] = useState(true);
  useEffect(() => {
    const previous = document.title;
    document.title = product ? 'The Orbit Oxford — After Life Theory Labs' : 'After Life Theory Labs — The Orbit Oxford';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, [pathname, product]);
  useEffect(() => {
    const nodes = root.current.querySelectorAll('[data-shop-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);
  return <div className={`shop ${motion ? '' : 'shop-motion-paused'}`} ref={root}>
    <a className="shop-skip" href="#shop-main">Skip to content</a>
    <header className="shop-header">
      <Link to="/shop" className="shop-brand" aria-label="After Life Theory Labs shop home"><OrbitMark/><span>AFTER LIFE THEORY LABS</span></Link>
      <nav aria-label="Shop navigation"><Link to="/shop" aria-current={!product ? 'page' : undefined}>The collection</Link><Link to={productPath} className="shop-nav-cta">Make it yours <Arrow/></Link></nav>
    </header>
    <main id="shop-main">{children}</main>
    <footer className="shop-footer"><div className="shop-footer-top"><Link to="/shop" className="shop-brand"><OrbitMark/><span>AFTER LIFE THEORY LABS</span></Link><p>For those who never quite<br/>felt from around here.</p><Link to={productPath}>Find your orbit <Arrow/></Link></div><div className="shop-footer-bottom"><Link to="/">An exploration by Allen Thomson <span>↗</span></Link><span>COLLECTION 001 / CONCEPT EDITION</span><button onClick={() => setMotion(!motion)} aria-pressed={!motion}>{motion ? 'Pause' : 'Resume'} ambient motion</button></div></footer>
  </div>;
}

function Collection() {
  return <ShopShell>
    <section className="shop-hero"><div className="shop-hero-phone-pattern" aria-hidden="true">{phonePattern.map(({ image, position }) => <img key={position} className={`phone-pattern-${position}`} src={`${A}phone${image}.png`} alt="" width="1122" height="1402"/>)}</div>
      <div className="shop-hero-copy"><p className="shop-eyebrow"><span className="shop-dot"/> COLLECTION 001 — THE ORBIT OXFORD</p><h1>Earthly form.<br/><em>Otherworldly</em><br/>details.</h1><p className="shop-intro">A different kind of energy.<br/>Angel wings and a world of your own.</p><ShopPrice/><Link className="shop-button shop-button-dark" to={productPath}>Discover yours <Arrow/></Link><div className="shop-hero-edition"><span>01 / 01</span><span>ONE SHIRT.<br/>YOUR UNIVERSE.</span></div></div>
      <div className="shop-hero-stage"><span className="shop-stage-top shop-eyebrow">OBJECT OF CURIOSITY — 001</span><div className="shop-floating-shirt shop-hero-reel" role="img" aria-label="The forest-green Oxford, shown alone and worn by an otherworldly model"><img className="shop-reel-frame shop-reel-shirt" src={`${A}shirt.png`} alt="" fetchpriority="high"/><img className="shop-reel-frame shop-reel-model" src={`${A}aliendModel1.png`} alt="" loading="eager"/><span className="shop-shirt-label shop-shirt-label-shirt"><i/> FOREST GREEN / OXFORD</span><span className="shop-shirt-label shop-shirt-label-model"><i/> THE OXFORD / WORN IN ORBIT</span></div><div className="shop-orbit-dot shop-orbit-dot--jupiter"><Planet id="jupiter"/></div><div className="shop-orbit-dot shop-orbit-dot--saturn"><Planet id="saturn"/></div><div className="shop-orbit-dot shop-orbit-dot--mars"><Planet id="mars"/></div><div className="shop-orbit-dot shop-orbit-dot--earth"><Planet id="earth"/></div><div className="shop-orbit-dot shop-orbit-dot--neptune"><Planet id="neptune"/></div><div className="shop-orbit-dot shop-orbit-dot--moon"><Planet id="moon"/></div><span className="shop-stage-cross">+</span><span className="shop-stage-bottom shop-eyebrow">FAMILIAR, UNTIL YOU LOOK CLOSER.</span><a href="#shop-details" className="shop-scroll" aria-label="Explore the details"><Arrow down/></a></div>
    </section>
    <div className="shop-manifesto-strip"><span>A CLASSIC, REIMAGINED.</span><span>EMBROIDERED WINGS</span><OrbitMark/><span>YOUR PLANET. YOUR SIGNATURE.</span><span>AFTER THE ORDINARY.</span></div>
    <section className="shop-details" id="shop-details">
      <div className="shop-section-heading" data-shop-reveal><p className="shop-eyebrow">01 / A CLOSER ENCOUNTER</p><h2>The difference<br/>is in the <em>details.</em></h2><p>Some things belong to you<br/>before they ever have your name on them.</p></div>
      <div className="shop-detail-grid">
        <article className="shop-detail-card" data-shop-reveal><div className="shop-detail-photo"><img src={`${A}closeup.png`} loading="lazy" alt="Raised ivory angel-wing embroidery on the green Oxford collar"/><span className="shop-image-index">01 — THE WINGS</span></div><div className="shop-detail-copy"><h3>A little closer<br/>to the extraordinary.</h3><p>Ivory wings, embroidered into the collar. A small detail with a presence of its own. Choose your wings, or keep it understated.</p></div></article>
        <article className="shop-detail-card shop-detail-card-offset" data-shop-reveal><div className="shop-detail-photo"><img src={`${A}jupiterbuttonshirt.png`} loading="lazy" alt="Jupiter-inspired button on a forest-green shirt placket"/><span className="shop-image-index">02 — YOUR PLANET</span></div><div className="shop-detail-copy"><h3>Your world.<br/>Close to your heart.</h3><p>A magnetic planet button at the second position. From Jupiter’s warm bands to Neptune’s deep blue, find the world that feels like you.</p></div></article>
      </div>
    </section>
    <section className="shop-campaign"><img src={`${A}aliendModel1.png`} loading="lazy" alt="Alien fashion model wearing the forest-green Oxford and black trousers"/><div className="shop-campaign-copy" data-shop-reveal><p className="shop-eyebrow">02 / NO ORDINARY EARTHLING</p><h2>For the<br/><em>outsiders.</em></h2><p>The curious. The quietly different.<br/>The ones who see a little further.</p><Link className="shop-text-link" to={productPath}>You’re in the right orbit <Arrow/></Link></div><span className="shop-campaign-caption shop-eyebrow">AN OTHERWORLDLY PERSPECTIVE.</span></section>
    <section className="shop-worlds" data-shop-reveal><p className="shop-eyebrow">03 / A PERSONAL GRAVITY</p><h2>Which world<br/>speaks to <em>you?</em></h2><div className="shop-world-list">{PLANETS.map(p => <Link key={p.id} to={`${productPath}?planet=${p.id}`} className="shop-world"><Planet id={p.id}/><span>{p.name}</span><small>{p.caption}</small><Arrow/></Link>)}</div><p className="shop-worlds-note">Five planet-inspired finish studies. One signature detail.</p></section>
    <section className="shop-closing"><p className="shop-eyebrow">THE ORBIT OXFORD / FOREST GREEN</p><h2>Classic by nature.<br/><em>Yours by design.</em></h2><Link className="shop-button shop-button-light" to={productPath}>Make it yours <Arrow/></Link><span className="shop-closing-orbit" aria-hidden="true"/></section>
  </ShopShell>;
}

const gallery = [
  { src: 'shirt.png', name: 'The Oxford', alt: 'Full forest-green Oxford, with embroidered wings and Jupiter button' },
  { src: 'closeup.png', name: 'The embroidery', alt: 'Ivory wing embroidery close-up' },
  { src: 'jupiterbuttonshirt.png', name: 'The button', alt: 'Jupiter planet button close-up' },
  { src: 'aliendModel1.png', name: 'On another world', alt: 'Alien model wearing the Oxford' },
];
function Product() {
  const location = useLocation();
  const [design, setDesign] = useState(() => {
    let saved;
    try { saved = readDesign(window.localStorage); } catch { saved = { planet: 'jupiter', wings: true }; }
    const planet = new URLSearchParams(location.search).get('planet');
    return PLANETS.some(p => p.id === planet) ? { ...saved, planet } : saved;
  });
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('');
  const selected = PLANETS.find(p => p.id === design.planet);
  const choose = change => { setDesign(d => ({ ...d, ...change })); setStatus(''); };
  const save = () => {
    try { window.localStorage.setItem(DESIGN_KEY, JSON.stringify(design)); setStatus('Your configuration is saved on this device.'); }
    catch { setStatus('This browser could not save your design. You can download it below.'); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([designSummary(design)], { type: 'text/plain' }));
    const link = document.createElement('a'); link.href = url; link.download = 'after-life-theory-labs-orbit-oxford.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <ShopShell product>
    <div className="shop-product-topline"><Link to="/shop">← The collection</Link><span>OBJECT 001 / THE ORBIT OXFORD</span></div>
    <section className="shop-product">
      <div className="shop-gallery"><div className="shop-gallery-main">
        <img key={active} src={`${A}${gallery[active].src}`} alt={gallery[active].alt} fetchpriority="high"/>
        <span className="shop-gallery-label shop-eyebrow">{String(active + 1).padStart(2, '0')} / {gallery[active].name.toUpperCase()}</span>
      </div><div className="shop-thumbnails" role="group" aria-label="Product photographs">{gallery.map((photo, index) => <button key={photo.src} onClick={() => setActive(index)} aria-pressed={active === index} aria-label={`Show ${photo.name.toLowerCase()}`}><img src={`${A}${photo.src}`} alt=""/><span>{photo.name}</span></button>)}</div><p className="shop-gallery-note">Product photographs show the Wings + Jupiter concept; explore the gallery for the embroidery and button details.</p></div>
      <div className="shop-config"><p className="shop-eyebrow"><span className="shop-dot"/> COLLECTION 001 / DESIGN PREVIEW</p><h1>The Orbit<br/><em>Oxford.</em></h1><ShopPrice/><p className="shop-product-description">An everyday silhouette with a universe of its own. Forest-green Oxford, an easy regular-to-relaxed fit, and details that make it unmistakably yours.</p><div className="shop-color-line"><i/> Forest green <span>01 / 01</span></div>
        <fieldset className="shop-option"><legend><span>01</span> The collar</legend><div className="shop-wings-options"><button aria-pressed={design.wings} onClick={() => choose({ wings: true })}><span>Angel wings</span><small>Ivory embroidery</small></button><button aria-pressed={!design.wings} onClick={() => choose({ wings: false })}><span>Keep it classic</span><small>Plain collar</small></button></div></fieldset>
        <fieldset className="shop-option"><legend><span>02</span> Your planet <strong>{selected.name}</strong></legend><div className="shop-planet-options">{PLANETS.map(p => <button key={p.id} aria-pressed={design.planet === p.id} aria-label={`${p.name} button`} onClick={() => choose({ planet: p.id })}><Planet id={p.id}/><span>{p.name}</span></button>)}</div><p className="shop-option-caption">{selected.caption} <span>Magnetic detail · Second button position.</span></p></fieldset>
        <div className="shop-design-receipt"><span className="shop-eyebrow">YOUR SIGNATURE</span><p>{design.wings ? 'Angel wings' : 'Classic collar'} <span>+</span> {selected.name}</p><small>Forest green / Regular-relaxed silhouette</small></div>
        <button className="shop-button shop-button-dark shop-save" onClick={save}>Save my configuration <Arrow/></button><div className="shop-save-status" role="status" aria-live="polite">{status}</div><button className="shop-download" onClick={download}>Download your design notes <Arrow down/></button><p className="shop-availability">A collection in the making. Size measurements and release details are coming. Saving a design does not place an order.</p>
        <div className="shop-accordions"><details open><summary>The design <span>+</span></summary><p>Forest-green Oxford with an easy silhouette and a gently curved hem. Optional ivory wing embroidery on both collar points. A planet-inspired magnetic detail replaces the second button, counting the collar-band button as the first.</p></details><details><summary>Fit & sizing <span>+</span></summary><p>The intended fit sits between regular and relaxed, with room through the body. The size chart and final garment measurements will be published before ordering opens.</p></details><details><summary>The planet detail <span>+</span></summary><p>Choose from five planet-inspired finishes. These are concept previews; final artwork and the magnetic attachment are still being developed. The remaining buttons stay ivory.</p></details></div>
      </div>
    </section>
    <section className="shop-product-story"><img src={`${A}closeup.png`} alt="Detail of textured ivory embroidery" loading="lazy"/><div data-shop-reveal><p className="shop-eyebrow">SMALL DETAILS. A DIFFERENT WORLD.</p><h2>Some things<br/>are felt.<br/><em>Not explained.</em></h2><Link className="shop-text-link" to="/shop">Explore the story <Arrow/></Link></div></section>
  </ShopShell>;
}
export default function ShopPage() { const { pathname } = useLocation(); return pathname.replace(/\/+$/, '') === productPath ? <Product/> : <Collection/>; }
