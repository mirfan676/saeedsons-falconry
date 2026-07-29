import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowDown,ArrowRight,ChevronLeft,ChevronRight,Feather,Menu,Minus,Plus,Search,ShoppingBag,X}from'lucide-react';
import'./style.css';
import { supabase } from './lib/supabase';

const products=[
 {name:'Natural Leather Range',cat:'Gloves',image:'/brand/gloves-natural-range.jpg',tag:'Five colours',desc:'Classic full-cuff falconry gloves from the local range'},
 {name:'Tri-Colour Field Series',cat:'Gloves',image:'/brand/gloves-tricolor.jpg',tag:'Signature',desc:'Distinctive layered leather construction'},
 {name:'Numbered Field Series',cat:'Gloves',image:'/brand/gloves-field-series.jpg',tag:'Field ready',desc:'Dark leather with reinforced cuffs'},
 {name:'Classic Four',cat:'Gloves',image:'/brand/gloves-classic-range.jpg',tag:'Natural tones',desc:'Supple leather in natural colourways'},
 {name:'Black Full-Cuff Glove',cat:'Gloves',image:'/brand/glove-black-detail.jpg',tag:'Detail',desc:'Full-grain texture and reinforced palm'},
 {name:'Falcon Perch - Natural Finish',cat:'Blocks & Perches',image:'/brand/raw/perch-01.jpeg',tag:'Local range',desc:'A stable perch photographed from the Saeed Sons Falconry collection'},
 {name:'Falcon Perch - Field Finish',cat:'Blocks & Perches',image:'/brand/raw/perch-02.jpeg',tag:'Field equipment',desc:'Practical perch and block forms for the field'},
 {name:'Falcon Hood - Hand Finished',cat:'Falcon Hoods',image:'/brand/raw/hood-01.jpeg',tag:'Local range',desc:'Hand-finished hood from the Saeed Sons Falconry workshop'},
 {name:'Falcon Hood - Profile',cat:'Falcon Hoods',image:'/brand/raw/hood-02.jpeg',tag:'Craft detail',desc:'A close product view of the hood profile and stitching'},
 {name:'Falcon Hood - Classic',cat:'Falcon Hoods',image:'/brand/raw/hood-03.jpeg',tag:'Field ready',desc:'A classic hood style available by direct enquiry'}
];
const collections=[
 {name:'Gloves',image:'/brand/gloves-natural-range.jpg',note:'Protection, shaped by craft'},
 {name:'Blocks & Perches',image:'/brand/raw/perch-01.jpeg',note:'Stable form, photographed from the local range'},
 {name:'Falcon Hoods',image:'/brand/raw/hood-01.jpeg',note:'Distinctive profiles, made by hand'},

];
function StoryPage({type}){
 const data={history:{eyebrow:'01 - OUR STORY',title:'Established in 2010.',intro:'From Karachi, Pakistan, Saeed Sons Falconry has grown through patience, skilled hands and a deep respect for the bird.',image:'/brand/story-2010.png',body:'Founded by Saeed Ahmad in Karachi in 2010, Saeed Sons Falconry brings together experienced workers and craftspeople who make field equipment with care. Our work is rooted in the ancient bond between falconer and bird, and refined for the way falconry is practiced today.'},craft:{eyebrow:'02 - THE MAKING',title:'Made slowly. Made to endure.',intro:'Every piece earns its place through material, hand and field.',image:'/brand/gloves-field-series.jpg',body:'We start with hides chosen for touch and strength, cut each panel with purpose, then finish the edge, stitch and fitting by hand. The result is equipment that becomes familiar in the hand instead of merely looking good on a shelf.'},products:{eyebrow:'03 - THE COLLECTIONS',title:'Tools for the open sky.',intro:'Explore gloves, hoods and perches shaped for real falconry.',image:'/brand/raw/perch-01.jpeg',body:'Choose a collection to begin. Each item is available by direct enquiry so we can confirm the right size, finish, availability and delivery before your order is placed.'}}[type];
 return <main className="story-page"><header className="story-header"><a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a><a className="back-link" href="#top">BACK TO HOME <ArrowRight/></a></header><section className="story-hero"><div><span className="kicker">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p></div><img src={data.image}/></section><section className="story-body"><span className="section-no">THE FIELD NOTE</span><div><p>{data.body}</p><a className="cta dark" href="#shop">EXPLORE EQUIPMENT <ArrowRight/></a></div></section>{type==='craft'&&<section className="story-video"><video src="/brand/glove-craft-1.mp4" autoPlay muted loop playsInline/><div><span className="kicker">THE HAND BEHIND THE WORK</span><h2>Craft is a<br/><i>conversation.</i></h2></div></section>}{type==='products'&&<section className="story-tiles">{collections.map(c=><a href="#shop" key={c.name}><img src={c.image}/><b>{c.name}</b><ArrowRight/></a>)}</section>}{type==='history'&&<section className="story-origin"><div className="origin-stat"><b>2010</b><span>ESTABLISHED</span></div><div className="origin-stat"><b>KARACHI</b><span>PAKISTAN</span></div><div className="origin-copy"><span className="kicker">THE SAEED SONS FIELD NOTE</span><h2>Built by hand.<br/><i>Carried forward.</i></h2><p>Today, our team continues to develop gloves, hoods and perches for falconers who value dependable materials, thoughtful construction and direct support.</p><a className="cta dark" href="#shop">VIEW THE COLLECTION <ArrowRight/></a></div></section>}<footer><a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a><p>+92 324 784 8227</p></footer></main>;
}


function AdminPage(){
 const[password,setPassword]=useState(''),[session,setSession]=useState(null),[orders,setOrders]=useState([]),[error,setError]=useState(''),[loading,setLoading]=useState(false);
 const adminEmail='admin@saeedsonsfalconry.com';
 const loadOrders=async()=>{if(!supabase)return;const{data,error}=await supabase.from('orders').select('*').order('created_at',{ascending:false});if(error)setError(error.message);else setOrders(data||[])};
 useEffect(()=>{if(!supabase){setError('Supabase is not configured.');return}supabase.auth.getSession().then(({data})=>{setSession(data.session);if(data.session)loadOrders()});const{data}=supabase.auth.onAuthStateChange((_event,next)=>{setSession(next);if(next)loadOrders()});return()=>data.subscription.unsubscribe()},[]);
 const login=async(e)=>{e.preventDefault();setLoading(true);setError('');const{data,error}=await supabase.auth.signInWithPassword({email:adminEmail,password});if(error)setError(error.message);else setSession(data.session);setLoading(false)};
 const updateStatus=async(id,status)=>{const{error}=await supabase.from('orders').update({status}).eq('id',id);if(error)setError(error.message);else loadOrders()};
 if(!session)return <main className="admin-page"><div className="admin-card"><a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a><span className="kicker">PRIVATE WORKSHOP</span><h1>Admin access.</h1><p>Sign in to manage Falconry order requests.</p><form onSubmit={login} className="admin-login"><label>USERNAME<input value="admin" readOnly/></label><label>PASSWORD<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your admin password"/></label><button className="checkout" disabled={loading}>{loading?'SIGNING IN...':'SIGN IN'}</button></form>{error&&<p className="admin-error">{error}</p>}</div></main>;
 return <main className="admin-page"><div className="admin-shell"><header className="admin-bar"><a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a><div><span>ORDER CONTROL</span><button onClick={()=>supabase.auth.signOut()}>SIGN OUT</button></div></header><section className="admin-heading"><div><span className="kicker">PRIVATE WORKSHOP</span><h1>Order control.</h1><p>{orders.length} order request{orders.length===1?'':'s'} in Supabase.</p></div><button onClick={loadOrders}>REFRESH</button></section><section className="order-table">{orders.length?orders.map(order=><article className="order-row" key={order.id}><div><span className="order-id">{new Date(order.created_at).toLocaleString()}</span><h2>{order.customer_name}</h2><p>{order.phone}  /  {order.city}</p><p>{order.address}</p></div><div className="order-items">{(order.items||[]).map((item,i)=><div key={i}><b>{item.name}</b><span>Qty {item.quantity}  /  {item.price===null?'Price to confirm':'PKR '+Number(item.price).toLocaleString()}</span></div>)}</div><div className="order-actions"><strong>{order.subtotal?'PKR '+Number(order.subtotal).toLocaleString():'To confirm'}</strong><select value={order.status} onChange={e=>updateStatus(order.id,e.target.value)}><option value="whatsapp_pending">WhatsApp pending</option><option value="contacted">Contacted</option><option value="confirmed">Confirmed</option><option value="shipped">Shipped</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div></article>):<div className="admin-empty">No orders yet.</div>}</section>{error&&<p className="admin-error">{error}</p>}</div></main>
}

function App(){
 const[menu,setMenu]=useState(false),[cart,setCart]=useState(false),[cartItems,setCartItems]=useState(()=>JSON.parse(localStorage.getItem('falconry-cart')||'[]')),[checkout,setCheckout]=useState(false),[active,setActive]=useState('All'),[scroll,setScroll]=useState(0),[route,setRoute]=useState(window.location.hash);
 useEffect(()=>{localStorage.setItem('falconry-cart',JSON.stringify(cartItems))},[cartItems]);
 const addToCart=(product)=>setCartItems(items=>{const found=items.find(x=>x.name===product.name);return found?items.map(x=>x.name===product.name?{...x,qty:x.qty+1}:x):[...items,{...product,qty:1}]});
 const updateQty=(name,delta)=>setCartItems(items=>items.map(x=>x.name===name?{...x,qty:Math.max(0,x.qty+delta)}:x).filter(x=>x.qty>0));
 const cartCount=cartItems.reduce((sum,x)=>sum+x.qty,0);
 const total=cartItems.reduce((sum,x)=>sum+(typeof x.price==='number'?x.price*x.qty:0),0);
 const formatPrice=(p)=>typeof p==='number'?'PKR '+p.toLocaleString():'Price to confirm';
 const placeWhatsAppOrder=async(event)=>{event.preventDefault();const f=new FormData(event.currentTarget);const countryValue=String(f.get('country'));const[country,code]=countryValue.split('|');const localPhone=String(f.get('local_phone')).replace(/[^0-9]/g,'');const phone=code+localPhone;const order={customer_name:String(f.get('name')),phone,country,city:String(f.get('city')),address:String(f.get('address')),items:cartItems.map(x=>({name:x.name,category:x.cat,quantity:x.qty,price:typeof x.price==='number'?x.price:null})),subtotal:total,status:'whatsapp_pending'};if(supabase){const{error}=await supabase.from('orders').insert(order);if(error)console.warn('Order could not be saved to Supabase:',error.message)}const lines=cartItems.map(x=>'- '+x.name+' | Qty: '+x.qty+' | Price: '+formatPrice(x.price)).join('\n');const text='NEW SAEED SONS FALCONRY ORDER\n\nCustomer: '+f.get('name')+'\nPhone: '+phone+'\nCountry: '+country+'\nCity: '+f.get('city')+'\nAddress: '+f.get('address')+'\n\nITEMS\n'+lines+'\n\nSubtotal: '+(total?'PKR '+total.toLocaleString():'To confirm')+'\nPlease confirm availability, shipping and payment.';window.open('https://wa.me/923247848227?text='+encodeURIComponent(text),'_blank');setCheckout(false);setCart(false)};
 useEffect(()=>{const h=()=>setRoute(window.location.hash);addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[]);
 useEffect(()=>{const pageRoutes=['#history','#craft-story','#collections','#admin'];if(route&&route!=='#top'&&!pageRoutes.includes(route)){requestAnimationFrame(()=>document.getElementById(route.slice(1))?.scrollIntoView({behavior:'smooth',block:'start'}))}else if(pageRoutes.includes(route)){scrollTo(0,0)}},[route]);
 useEffect(()=>{const f=()=>setScroll(scrollY);addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 if(route==='#history') return <StoryPage type="history"/>;
 if(route==='#craft-story') return <StoryPage type="craft"/>;
 if(route==='#collections') return <StoryPage type="products"/>;
 if(route==='#admin') return <AdminPage/>;

 const filtered=active==='All'?products:products.filter(p=>p.cat===active);
 const inquire=(name)=>window.open(`https://wa.me/923247848227?text=${encodeURIComponent(`Hello Saeed Sons Falconry, I would like to inquire about ${name}.`)}`,'_blank');
 return <main>
  <header className={scroll>40?'solid':''}>
   <button className="icon mobile" onClick={()=>setMenu(1)} aria-label="Menu"><Menu/></button>
   <a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a>
   <nav><a href="#collections">Collections</a><a href="#craft-story">The making</a><a href="#history">Our story</a></nav>
   <div className="tools"><button className="icon" aria-label="Search"><Search/></button><button className="bag" onClick={()=>setCart(1)}><ShoppingBag/><span>{cartCount}</span></button></div>
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
  <section className="category-flight" id="shop"><div className="category-intro"><span className="kicker">02 - COLLECTIONS</span><h2>Choose your<br/><i>field craft.</i></h2><p>Explore the complete Saeed Sons range. Individual products are available by direct enquiry.</p></div><div className="category-grid">{collections.map(c=><a href="#gloves" className="category-card" key={c.name}><img src={c.image}/><span><small>{c.note}</small><b>{c.name}</b><ArrowRight/></span></a>)}</div></section>
  <section className="collection" id="gloves">
   <div className="collection-top"><div><span className="kicker">03 - REAL PRODUCT PHOTOGRAPHY</span><h2>The glove<br/><i>collection.</i></h2></div><p>Hand-finished protection in multiple<br/>leathers, lengths and colourways.</p></div>
   <div className="filters">{['All','Gloves','Blocks & Perches','Falcon Hoods'].map(x=><button className={active===x?'active':''} onClick={()=>setActive(x)} key={x}>{x}</button>)}</div>
   <div className="products">{filtered.map(p=><article key={p.name}>
    <div className="product-image"><img src={p.image}/><span>{p.tag}</span><button onClick={()=>addToCart(p)} aria-label={'Add '+p.name+' to cart'}><ShoppingBag/></button></div>
    <div className="product-meta"><div><small>{p.cat}</small><h3>{p.name}</h3><p>{p.desc}</p><strong>{formatPrice(p.price)}</strong></div><button className="price-link" onClick={()=>addToCart(p)}>ADD TO CART</button></div>
   </article>)}</div>
  </section>
  <section className="craft" id="craft"><img src="/brand/saeedsons-story.png"/><div><span className="kicker">03 - TRADITION  /  PASSION  /  HERITAGE</span><h2>More than equipment.<br/><i>A living tradition.</i></h2><p>Saeed Sons preserves the timeless art of falconry through experienced support, premium field equipment and a deep respect for the bond between falconer and bird.</p><div className="stats"><span><b>Field</b><small>TESTED EQUIPMENT</small></span><span><b>Global</b><small>FALCONRY SUPPORT</small></span></div></div></section>
  <section className="field-reels"><div className="reel-heading"><span className="kicker">04 - FROM THE WORKSHOP</span><h2>Craft in<br/><i>motion.</i></h2><p>Real materials. Real hands. Equipment made for the field.</p></div>{['glove-craft-1.mp4','glove-craft-2.mp4','glove-craft-3.mp4'].map((v,i)=><figure key={v}><video src={'/brand/'+v} autoPlay muted loop playsInline preload="metadata"/><figcaption>FIELD CUT / 0{i+1}</figcaption></figure>)}</section>
  <section className="dispatch"><Feather/><span>FIELD NOTES / 01</span><h2>Stories from<br/>the <i>open sky.</i></h2><p>Craft notes, field wisdom and dispatches from falconers around the world.</p><form onSubmit={e=>e.preventDefault()}><input placeholder="YOUR EMAIL ADDRESS"/><button>JOIN THE FLIGHT <ArrowRight/></button></form></section>
  <footer><a className="brand official" href="#top"><span className="logo-crop"><img src="/brand/main-logo.png"/></span><span className="brand-words"><b>SAEED SONS</b><small>FALCONRY</small></span></a><p>Tools for the ancient bond<br/>between falconer and sky.<br/><br/>+92 324 784 8227</p><div><a href="#shop">SHOP</a><a href="#story">OUR STORY</a><a href="#craft">CRAFT</a><a href="https://wa.me/923247848227">WHATSAPP</a></div><small>(c) 2026 SAEED SONS FALCONRY - ALL RIGHTS RESERVED</small></footer>
  <div className={'overlay '+(menu||cart?'show':'')} onClick={()=>{setMenu(false);setCart(false)}}/>
  <aside className={'drawer '+(cart?'open':'')}><button className="close" onClick={()=>{setCart(0);setCheckout(false)}}><X/></button><span className="kicker">YOUR FIELD KIT</span><h2>{checkout?'Order details':'The carry.'}</h2>{checkout?<form className="order-form" onSubmit={placeWhatsAppOrder}><input name="name" required placeholder="YOUR NAME"/><select name="country" required aria-label="Select country"><option value="Pakistan|+92">🇵🇰 Pakistan (+92)</option><option value="United Arab Emirates|+971">🇦🇪 UAE (+971)</option><option value="Saudi Arabia|+966">🇸🇦 Saudi Arabia (+966)</option><option value="Qatar|+974">🇶🇦 Qatar (+974)</option><option value="Kuwait|+965">🇰🇼 Kuwait (+965)</option><option value="United Kingdom|+44">🇬🇧 United Kingdom (+44)</option><option value="United States|+1">🇺🇸 United States (+1)</option><option value="Other|+">🌐 Other country</option></select><input name="local_phone" required inputMode="numeric" pattern="[0-9]{6,12}" title="Enter the phone number without the country code" placeholder="PHONE NUMBER"/><input name="city" required placeholder="CITY"/><textarea name="address" required placeholder="DELIVERY ADDRESS"/><button className="checkout" type="submit">SEND ORDER ON WHATSAPP <ArrowRight/></button></form>:cartItems.length?<><div className="cart-list">{cartItems.map(item=><div className="cart-item" key={item.name}><img src={item.image}/><div><b>{item.name}</b><small>{formatPrice(item.price)}</small><div className="qty"><button onClick={()=>updateQty(item.name,-1)}><Minus/></button><span>{item.qty}</span><button onClick={()=>updateQty(item.name,1)}><Plus/></button></div></div></div>)}</div><p className="cart-total">Subtotal: <b>{total?'PKR '+total.toLocaleString():'Price to confirm'}</b></p><button className="checkout" onClick={()=>setCheckout(true)}>CHECKOUT ON WHATSAPP <ArrowRight/></button></>:<p className="empty">Your kit is empty.<br/>Choose something built for the field.</p>}</aside>
  <aside className={'drawer navdraw '+(menu?'open':'')}><button className="close" onClick={()=>setMenu(0)}><X/></button>{[['Collections','#collections'],['The making','#craft-story'],['Our story','#history'],['Contact','https://wa.me/923247848227']].map(([x,href])=><a onClick={()=>setMenu(0)} href={href} key={x}>{x}<ArrowRight/></a>)}</aside>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);


