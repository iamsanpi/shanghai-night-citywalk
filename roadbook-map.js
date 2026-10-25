'use strict';
window.CitywalkOverview=(()=>{
 let map,layer,state,markers={},tileErrors=0;
 const data=()=>window.CITYWALK_MAP_DATA;
 const brief={north:'小巨蛋附近开放滨江平台，靠江公共步道；朝南至东南看陆家嘴。',bridge:'北桥头靠上海大厦一侧、桥西侧公共步道，沿桥朝南偏东拍。',creek:'桥面东侧公共人行道，朝外白渡桥与陆家嘴看。',origin:'圆明园路步行段的街口或建筑转角，沿街向南走。',peace:'南京东路东端的外滩公共平台，隔街朝西北看绿顶。',customs:'海关、浦发银行大楼对应的靠江平台，隔街朝西看建筑。',wukang:'源点广场附近公共人行空间，面向武康大楼楼尖。',court:'武康路南段公共人行道，向北短走到武康庭附近。',towers:'东泰路与花园石桥路路口，金茂东、南侧公共人行道，停住仰拍。',ring:'街口附近桥下公共人行道，朝东方明珠找框景；上桥入口按现场找。',pearl:'塔外围公共人行空间，退到能拍完整塔身的位置。',museum:'浦东美术馆西门外开放滨江平台，朝西看外滩。'};
 const n=(tag,cls,text)=>{const a=document.createElement(tag);if(cls)a.className=cls;if(text!==undefined)a.textContent=text;return a;};
 function statusText(){
  const status=document.getElementById('map-status');
  if(tileErrors){status.textContent='地图底图暂不可用。编号和步行规划线仍可点选；可用机位卡片里的苹果地图导航查看街道。';return;}
  status.textContent=Number.isInteger(state.plan.taxi)?'可拖动、双指缩放。跨区总览中编号较密，可点片区名称放大，再点编号看实景和导航。':'可拖动、双指缩放。点编号看实景、站位和导航；绿色连线沿步行路网绘制。';
 }
 function ensureMap(){
  if(map)return true;
  if(location.protocol==='file:'){
   document.getElementById('overview-map').hidden=true;
   document.getElementById('map-areas').hidden=true;
   document.getElementById('map-pick').disabled=true;
   const link=n('a','map-online-link','打开在线地图总览 ↗');
   link.href=window.CitywalkEntry?.onlineUrl(state.planKey,'#map-overview')||'https://iamsanpi.github.io/shanghai-night-citywalk/#map-overview';
   document.getElementById('map-status').replaceChildren(n('span','','本地文件不加载在线底图，请使用在线路书。 '),link);
   return false;
  }
  if(!window.L||!data()){document.getElementById('map-status').textContent='地图组件暂未加载，下面的实景卡片和苹果地图导航仍可使用。';return false;}
  map=L.map('overview-map',{scrollWheelZoom:false,zoomControl:false,attributionControl:true});
  L.control.zoom({position:'bottomright'}).addTo(map);
  const errorTileUrl='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#e3eae4"/></svg>');
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,minZoom:10,errorTileUrl,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',referrerPolicy:'strict-origin-when-cross-origin'}).on('tileerror',()=>{tileErrors++;statusText();}).addTo(map);
  layer=L.layerGroup().addTo(map);
  return true;
 }
 function fit(ids){
  if(!map)return;
  const bounds=L.latLngBounds(ids.map(id=>data().points[id].latlng));
  Object.values(data().walks).forEach(r=>{if(ids.includes(r.from)&&ids.includes(r.to))r.geometry.coordinates.forEach(([lon,lat])=>bounds.extend([lat,lon]));});
  map.invalidateSize();map.fitBounds(bounds,{padding:[35,35],maxZoom:17,animate:false});
 }
 function popup(id,index){
  const s=state.spots[id],p=n('div','map-popover');
  p.append(n('strong','',`${index+1} · ${s.short}`));
  if(s.image){const img=n('img');img.src=s.image;img.alt=s.name+'实景参考';img.referrerPolicy='no-referrer';img.addEventListener('error',()=>img.remove(),{once:true});p.append(img);}else{p.append(n('span','map-no-photo','连接站 · 完整走法见卡片'));}
  p.append(n('p','',brief[id]));
  const actions=n('div','map-popup-actions'),full=n('a','map-popup-full','实景与站位 ↓');full.href='#spot-'+id;
  full.addEventListener('click',()=>{document.getElementById('spot-'+id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
  const nav=n('a','','苹果地图 ↗');
  nav.href='https://maps.apple.com/directions?'+new URLSearchParams({destination:s.pin?s.pin.join(','):state.maps.name(s.poi),mode:'walking'});nav.target='_blank';nav.rel='noopener';
  actions.append(full,nav);p.append(actions);return p;
 }
 function selectMarker(id){
  Object.values(markers).forEach(m=>m.getElement()?.classList.remove('map-selected'));
  markers[id]?.getElement()?.classList.add('map-selected');
 }
 function focus(id){
  if(!map||!markers[id])return;
  document.getElementById('map-overview').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  map.invalidateSize();map.setView(data().points[id].latlng,Math.max(map.getZoom(),16),{animate:false});markers[id].openPopup();selectMarker(id);
  document.getElementById('map-pick').value=id;
 }
 function render(planKey,plan,spots,maps){
  state={planKey,plan,spots,maps};if(!ensureMap())return;
  layer.clearLayers();markers={};
  plan.stops.forEach(([id],i)=>{
   if(i<plan.stops.length-1){
    const next=plan.stops[i+1][0],taxi=plan.taxi===i;
    if(taxi){L.polyline([data().points[id].latlng,data().points[next].latlng],{color:'#ba482d',weight:3,dashArray:'7 8',opacity:.85,interactive:false}).addTo(layer);}
    else{
     const route=data().walks[id+'>'+next];
     if(route)L.geoJSON(route.geometry,{style:{color:'#176b55',weight:5,opacity:.92},interactive:false}).addTo(layer);
    }
   }
  });
  plan.stops.forEach(([id],i)=>{
   const icon=L.divIcon({className:'numbered-map-marker',html:`<button type="button" aria-label="机位${i+1} ${spots[id].short}">${i+1}</button>`,iconSize:[44,44],iconAnchor:[22,22],popupAnchor:[0,-17]});
   const popupWidth=Math.max(180,Math.min(265,map.getSize().x-54));
   const marker=L.marker(data().points[id].latlng,{icon,keyboard:false,riseOnHover:true,zIndexOffset:1000-i}).bindPopup(()=>popup(id,i),{maxWidth:popupWidth,minWidth:Math.min(205,popupWidth),autoPanPadding:[12,12],closeButton:true}).on('click',()=>{selectMarker(id);document.getElementById('map-pick').value=id;}).addTo(layer);
   markers[id]=marker;
  });
  const area=document.getElementById('map-areas');area.replaceChildren();
  const all=plan.stops.map(x=>x[0]),choices=[['全程',all]];
  if(Number.isInteger(plan.taxi)){choices.push(['武康路',all.slice(0,plan.taxi+1)],[planKey==='night2'?'陆家嘴':'苏州河 / 外滩',all.slice(plan.taxi+1)]);}
  const controls=[];
  choices.forEach(([label,ids],i)=>{const b=n('button','',label);b.type='button';b.setAttribute('aria-pressed',String(i===0));b.addEventListener('click',()=>{controls.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));fit(ids);});controls.push(b);area.append(b);});
  const picker=document.getElementById('map-pick');picker.replaceChildren();const placeholder=n('option','','选择编号机位');placeholder.value='';picker.append(placeholder);plan.stops.forEach(([id],i)=>{const option=n('option','',`${i+1} · ${spots[id].short}`);option.value=id;picker.append(option);});picker.onchange=()=>{if(picker.value)focus(picker.value);};
  statusText();
  requestAnimationFrame(()=>fit(all));
 }
 return{render,focus};
})();
