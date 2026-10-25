import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const js=fs.readFileSync('app.js','utf8');
const context={URLSearchParams};
vm.createContext(context);
vm.runInContext(js.slice(0,js.indexOf('function make('))+'\nglobalThis.data={spots,plans,maps};',context);
const {spots,plans,maps}=context.data;
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
  for(const stop of plan.stops){const s=spots[stop[0]];assert.ok(s.poi&&s.stand&&s.face&&s.sequence&&s.next,'Incomplete field instructions');}
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
for(const path of ['index.html','app.js','style.css','README.md']){
 const text=fs.readFileSync(path,'utf8');
 assert.ok(!text.includes('/Users/haibo/')&&!text.includes('localhost')&&!text.includes('127.0.0.1'),'Local/private path in public file '+path);
}
console.log('Public content, requested landmarks, numbered map points, foot-route geometry and map links checked.');
