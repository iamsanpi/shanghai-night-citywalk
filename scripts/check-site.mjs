import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const js=fs.readFileSync('app.js','utf8');
const context={URLSearchParams};
vm.createContext(context);
vm.runInContext(js.slice(0,js.indexOf('function make('))+'\nglobalThis.data={spots,plans,maps,fixedShots};',context);
const {spots,plans,maps,fixedShots}=context.data;
const mapContext={window:{}};
vm.createContext(mapContext);
vm.runInContext(fs.readFileSync('map-data.js','utf8'),mapContext);
new vm.Script(fs.readFileSync('roadbook-map.js','utf8'));
const mapData=mapContext.window.CITYWALK_MAP_DATA;
assert.equal(Object.values(spots).filter(s=>s.image).length,8,'Eight real composition references are required');
for(const id of ['north','bridge','peace','towers','customs'])assert.ok(spots[id].image&&spots[id].stand&&spots[id].face,'Missing requested landmark content: '+id);
for(const [id,plan]of Object.entries(plans)){
  assert.equal(id==='night1'?0:1,Number.isInteger(plan.taxi)?1:0,'Incorrect taxi transition count');
  for(const [spot]of plan.stops)assert.ok(spots[spot],'Unknown route stop '+spot);
  for(const stop of plan.stops){const s=spots[stop[0]],shot=fixedShots[stop[0]];assert.ok(s.poi&&s.stand&&s.face&&s.sequence&&s.next,'Incomplete field instructions');assert.ok(shot?.frame&&shot.wait&&shot.end&&shot.next&&shot.fallback,'Missing fixed-shot field task: '+stop[0]);}
  for(let i=0;i<plan.stops.length-1;i++){
    if(plan.taxi===i)continue;
    const key=plan.stops[i][0]+'>'+plan.stops[i+1][0];
    const route=mapData.walks[key];
    assert.equal(route?.mode,'walking','Missing foot route '+key);
    assert.equal(route.geometry.type,'LineString');
    assert.ok(route.geometry.coordinates.length>2,'Unrouted straight line '+key);
    assert.ok(route.source.includes('/routed-foot/'),'Wrong routing profile '+key);
    assert.ok(route.distance_m/route.duration_s*3.6<10,'Implausible walking speed '+key);
    assert.ok(route.distance_m<2500,'Unexpected walking detour '+key);
  }
}
for(const s of Object.values(spots)){
 if(s.image){assert.equal(new URL(s.image).protocol,'https:');assert.equal(new URL(s.source).protocol,'https:');}
 assert.equal(new URL(maps.place(s.poi)).hostname,'maps.apple.com');
}
for(const id of Object.keys(spots)){
 const [lat,lon]=mapData.points[id].latlng;
 assert.ok(lat>31.19&&lat<31.26&&lon>121.42&&lon<121.52,'Point outside filming areas: '+id);
 assert.ok(mapData.points[id].source,'Missing point source '+id);
}
for(const path of ['index.html','app.js','style.css','README.md','entry.js','roadbook-map.js']){
 const text=fs.readFileSync(path,'utf8');
 assert.ok(!text.includes('/Users/haibo/')&&!text.includes('localhost')&&!text.includes('127.0.0.1'),'Local/private path in public file '+path);
}
const entrySource=fs.readFileSync('entry.js','utf8');
function entryEnvironment(protocol,search,hash,blocked=false){
 const redirects=[],events={},anchor={},notice={hidden:true,querySelector:()=>anchor};
 const env={URL,URLSearchParams,window:{},location:{protocol,search,hash,replace:url=>{if(blocked)throw new Error('Navigation blocked');redirects.push(url);}},document:{addEventListener:(name,fn)=>{events[name]=fn;},getElementById:()=>notice}};
 vm.createContext(env);vm.runInContext(entrySource,env);
 return{env,redirects,events,anchor,notice};
}
for(const plan of ['night1','night2','one']){
 const r=entryEnvironment('file:','?plan='+plan+'&ignored=value','#fixed-peace');
 assert.equal(r.redirects[0],'https://iamsanpi.github.io/shanghai-night-citywalk/?plan='+plan+'#fixed-peace','Local entry must preserve plan and filming position without forwarding unknown parameters');
}
for(const protocol of ['http:','https:'])assert.equal(entryEnvironment(protocol,'?plan=one','#map-overview').redirects.length,0,'Web entry must not redirect');
const blockedEntry=entryEnvironment('file:','?plan=one','#map-overview',true);
blockedEntry.events.DOMContentLoaded();
assert.equal(blockedEntry.notice.hidden,false,'Blocked local redirect needs a visible online link');
assert.equal(blockedEntry.anchor.href,'https://iamsanpi.github.io/shanghai-night-citywalk/?plan=one#map-overview');
const localNodes={};
const localMapContext={location:{protocol:'file:'},window:{CitywalkEntry:blockedEntry.env.window.CitywalkEntry},L:{map:()=>assert.fail('Local file must never initialize an online tile map')},document:{getElementById:id=>localNodes[id]??=( {replaceChildren(...children){this.children=children;}} ),createElement:tag=>({tag})}};
vm.createContext(localMapContext);vm.runInContext(fs.readFileSync('roadbook-map.js','utf8'),localMapContext);
localMapContext.window.CitywalkOverview.render('one',{},spots,maps);
assert.equal(localNodes['overview-map'].hidden,true);
assert.equal(localNodes['map-status'].children[1].href,'https://iamsanpi.github.io/shanghai-night-citywalk/?plan=one#map-overview');
console.log('Public content, foot routes, fixed-shot tasks, local-file redirect and no-local-tile regressions checked.');
