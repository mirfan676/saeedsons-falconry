import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowDown,ArrowRight,ChevronLeft,ChevronRight,Feather,Menu,Minus,Plus,Search,ShoppingBag,X}from'lucide-react';
import'./style.css';

const products=[
 {name:'Natural Leather Range',cat:'Natural',image:'/brand/gloves-natural-range.jpg',tag:'Five colours',desc:'Classic full-cuff falconry gloves'},
 {name:'Tri-Colour Field Series',cat:'Colour Block',image:'/brand/gloves-tricolor.jpg',tag:'Signature',desc:'Distinctive layered leather construction'},
 {name:'Numbered Field Series',cat:'Field Series',image:'/brand/gloves-field-series.jpg',tag:'Field ready',desc:'Dark leather with reinforced cuffs'},
 {name:'Classic Four',cat:'Natural',image:'/brand/gloves-classic-range.jpg',tag:'New range',desc:'Supple leather in natural tones'},
 {name:'Black Full-Cuff Glove',cat:'Field Series',image:'/brand/glove-black-detail.jpg',tag:'Detail',desc:'Full-grain texture and reinforced palm'},
 {name:'Colourblock Trio',cat:'Colour Block',image:'/brand/gloves-colorblock.jpg',tag:'Three styles',desc:'Hand-finished contrast leather panels'}
];
const collections=[
 {name:'Gloves',image:'/brand/gloves.png',note:'Protection, shaped by craft'},
 {name:'Blocks & Perches',image:'/brand/blocks-perches.png',note:'Stable form, distinguished craft'},
 {name:'Falcon Hoods',image:'/brand/hood.png',note:'Distinctive profiles, made by hand'},
 {name:'Bells & Swivels',image:'/brand/bells-swivels.png',note:'Precision field hardware'}
];

function StoryPage({type}){
 const data={history:{eyebrow:'01 — THE BEGINNING',title:'A tradition carried forward.',intro:'Falconry is more than a practice. It is a relationship measured in patience, trust and time.',image:'/brand/saeedsons-story.png',body:'Saeed Sons was built around that relationship. From the first glove cut to every field-tested fitting, the work is guided by respect for the bird and the person who carries it.'},craft:{eyebrow:'02 — THE MAKING',title:'Made slowly. Made to endure.',intro:'Every piece earns its place through material, hand and field.',image:'/brand/gloves-field-series.jpg',body:'We start with hides chosen for touch and strength, cut each panel with purpose, then finish the edge, stitch and fitting by hand. The result is equipment that becomes familiar in the hand instead of merely looking good on a shelf.'},products:{eyebrow:'03 — THE COLLECTIONS',title:'Tools for the open sky.',intro:'Explore gloves, hoods, perches, bells and swivels shaped for real falconry.',image:'/brand/blocks-collection.png',body:'Choose a collection to begin. Each item is available by direct enquiry so we can confirm the right size, finish, availability and delivery before your order is placed.'}}[type];
 return <main className="story-page"><header className="story-header"><a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a><a className="back-link" href="#top">BACK TO HOME <ArrowRight/></a></header><section className="story-hero"><div><span className="kicker">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p></div><img src={data.image}/></section><section className="story-body"><span className="section-no">THE FIELD NOTE</span><div><p>{data.body}</p><a className="cta dark" href="#shop">EXPLORE EQUIPMENT <ArrowRight/></a></div></section>{type==='craft'&&<section className="story-video"><video src="/brand/glove-craft-1.mp4" autoPlay muted loop playsInline/><div><span className="kicker">THE HAND BEHIND THE WORK</span><h2>Craft is a<br/><i>conversation.</i></h2></div></section>}{type==='products'&&<section className="story-tiles">{collections.map(c=><a href="#shop" key={c.name}><img src={c.image}/><b>{c.name}</b><ArrowRight/></a>)}</section>}<footer><a className="brand" href="#top"><span className="wing">S</span><b>SAEED SONS</b><small>FALCONRY</small></a><p>+92 324 784 8227</p></footer></main>;
}

function App(){
 const[menu,setMenu]=useState(false),[cart,setCart]=useState(false),[count,setCount]=useState(0),[active,setActive]=useState('All'),[scroll,setScroll]=useState(0),[route,setRoute]=useState(window.location.hash);
 useEffect(()=>{const h=()=>{setRoute(window.location.hash);scrollTo(0,0)};addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[]);
 if(route==='#history') return <StoryPage type="history"/>;
 if(route==='#craft-story') return <StoryPage type="craft"/>;
 if(route==='#collections') return <StoryPage type="products"/>;
 useEffect(()=>{const f=()=>setScroll(scrollY);addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 const filtered=active==='All'?products:products.filter(p=>p.cat===active);
 const inquire=(name)=>window.open(`https://wa.me/923247848227?text=${encodeURIComponent(`Hello Saeed Sons Falconry, I would like to inquire about ${name}.`)}`,'_blank');
 return <main>
  <header className={scroll>40?'solid':''}>
   <button className="icon mobile" onClick={()=>setMenu(1)} aria-label="Menu"><Menu/></button>
   <a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a>
   <nav><a href="#collections">Collections</a><a href="#craft-story">The making</a><a href="#history">Our story</a></nav>
   <div className="tools"><button className="icon" aria-label="Search"><Search/></button><button className="bag" onClick={()=>setCart(1)}><ShoppingBag/><span>{count}</span></button></div>
  </header>
  <section className="hero" id="top">
   <div className="hero-bg" style={{transform:`translateY(${scroll*.12}px) scale(1.04)`}}/>
   <div className="flight-lines"><i/><i/><i/></div>
   <div className="eyebrow"><span/> Born above the ordinary</div>
   <div className="hero-copy"><h1>MASTER<br/><em>THE SKY.</em></h1><p>Purpose-built falconry equipment, shaped by tradition and refined for the modern field.</p><a href="#shop" className="cta">Explore the collection <ArrowRight/></a></div>
   <div className="altitude"><span>ALT</span><b>2,460</b><small>METERS</small></div>
   <a className="scroll" href="#shop">SCROLL TO DESCEND <ArrowDown/></a>
  </section>
  <section className="manifesto" id="story">
   <div className="section-no">01</div><p>BETWEEN EARTH<br/>AND INSTINCT</p>
   <h2>Equipment that feels<br/>like <i>second nature.</i></h2>
   <div className="manifest-body"><p>Every piece begins with a simple question: will it earn its place in the field? We pair generations of falconry knowledge with exacting modern craftsmanship.</p><a href="#craft">OUR CRAFT <ArrowRight/></a></div>
  </section>
  <section className="category-flight" id="shop"><div className="category-intro"><span className="kicker">02 — COLLECTIONS</span><h2>Choose your<br/><i>field craft.</i></h2><p>Explore the complete Saeed Sons range. Individual products are available by direct enquiry.</p></div><div className="category-grid">{collections.map(c=><a href="#gloves" className="category-card" key={c.name}><img src={c.image}/><span><small>{c.note}</small><b>{c.name}</b><ArrowRight/></span></a>)}</div></section>
  <section className="collection" id="gloves">
   <div className="collection-top"><div><span className="kicker">03 — REAL PRODUCT PHOTOGRAPHY</span><h2>The glove<br/><i>collection.</i></h2></div><p>Hand-finished protection in multiple<br/>leathers, lengths and colourways.</p></div>
   <div className="filters">{['All','Natural','Colour Block','Field Series'].map(x=><button className={active===x?'active':''} onClick={()=>setActive(x)} key={x}>{x}</button>)}</div>
   <div className="products">{filtered.map((p,i)=><article key={p.name}>
    <div className="product-image"><img src={p.image}/><span>{p.tag}</span><button onClick={()=>inquire(p.name)} aria-label={'Inquire about '+p.name}><ArrowRight/></button></div>
    <div className="product-meta"><div><small>{p.cat}</small><h3>{p.name}</h3><p>{p.desc}</p></div><button className="price-link" onClick={()=>inquire(p.name)}>INQUIRE</button></div>
   </article>)}</div>
  </section>
  <section className="craft" id="craft"><img src="/brand/saeedsons-story.png"/><div><span className="kicker">03 — TRADITION · PASSION · HERITAGE</span><h2>More than equipment.<br/><i>A living tradition.</i></h2><p>Saeed Sons preserves the timeless art of falconry through experienced support, premium field equipment and a deep respect for the bond between falconer and bird.</p><div className="stats"><span><b>Field</b><small>TESTED EQUIPMENT</small></span><span><b>Global</b><small>FALCONRY SUPPORT</small></span></div></div></section>
  <section className="field-reels"><div className="reel-heading"><span className="kicker">04 — FROM THE WORKSHOP</span><h2>Craft in<br/><i>motion.</i></h2><p>Real materials. Real hands. Equipment made for the field.</p></div>{['glove-craft-1.mp4','glove-craft-2.mp4','glove-craft-3.mp4'].map((v,i)=><figure key={v}><video src={'/brand/'+v} autoPlay muted loop playsInline preload="metadata"/><figcaption>FIELD CUT / 0{i+1}</figcaption></figure>)}</section>
  <section className="dispatch"><Feather/><span>FIELD NOTES / 01</span><h2>Stories from<br/>the <i>open sky.</i></h2><p>Craft notes, field wisdom and dispatches from falconers around the world.</p><form onSubmit={e=>e.preventDefault()}><input placeholder="YOUR EMAIL ADDRESS"/><button>JOIN THE FLIGHT <ArrowRight/></button></form></section>
  <footer><a className="brand" href="#top"><span className="wing">S</span><b>SAEED SONS</b><small>FALCONRY</small></a><p>Tools for the ancient bond<br/>between falconer and sky.<br/><br/>+92 324 784 8227</p><div><a href="#shop">SHOP</a><a href="#story">OUR STORY</a><a href="#craft">CRAFT</a><a href="https://wa.me/923247848227">WHATSAPP</a></div><small>© 2026 SAEED SONS FALCONRY — ALL RIGHTS RESERVED</small></footer>
  <div className={'overlay '+(menu||cart?'show':'')} onClick={()=>{setMenu(false);setCart(false)}}/>
  <aside className={'drawer '+(cart?'open':'')}><button className="close" onClick={()=>setCart(0)}><X/></button><span className="kicker">YOUR FIELD KIT</span><h2>The carry.</h2>{count?<><div className="cart-item"><img src="/falconry-collection.png"/><div><b>Selected equipment</b><small>Field-ready / Brown</small><div><button><Minus/></button><span>{count}</span><button onClick={()=>setCount(c=>c+1)}><Plus/></button></div></div></div><button className="checkout">CHECKOUT — ${count*145} <ArrowRight/></button></>:<p className="empty">Your kit is empty.<br/>Choose something built for the field.</p>}</aside>
  <aside className={'drawer navdraw '+(menu?'open':'')}><button className="close" onClick={()=>setMenu(0)}><X/></button>{[['Collections','#collections'],['The making','#craft-story'],['Our story','#history'],['Contact','https://wa.me/923247848227']].map(([x,href])=><a onClick={()=>setMenu(0)} href={href} key={x}>{x}<ArrowRight/></a>)}</aside>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
