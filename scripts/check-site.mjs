import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const js=fs.readFileSync('app.js','utf8');
const context={URLSearchParams};
vm.createContext(context);
vm.runInContext(js.slice(0,js.indexOf('function make('))+'\nglobalThis.data={spots,plans,maps};',context);
const {spots,plans,maps}=context.data;
assert.equal(Object.values(spots).filter(s=>s.image).length,7,'Seven real composition references are required');
for(const id of ['north','bridge','peace','towers'])assert.ok(spots[id].image&&spots[id].stand&&spots[id].face,'Missing requested landmark content: '+id);
for(const [id,plan]of Object.entries(plans)){
  assert.equal(id==='night1'?0:1,Number.isInteger(plan.taxi)?1:0,'Incorrect taxi transition count');
  for(const [spot]of plan.stops)assert.ok(spots[spot],'Unknown route stop '+spot);
  for(const stop of plan.stops){const s=spots[stop[0]];assert.ok(s.poi&&s.stand&&s.face&&s.sequence&&s.next,'Incomplete field instructions');}
}
for(const s of Object.values(spots)){
 if(s.image){assert.equal(new URL(s.image).protocol,'https:');assert.equal(new URL(s.source).protocol,'https:');}
 assert.equal(new URL(maps.place(s.poi)).hostname,'maps.apple.com');
}
for(const path of ['index.html','app.js','style.css','README.md']){
 const text=fs.readFileSync(path,'utf8');
 assert.ok(!text.includes('/Users/haibo/')&&!text.includes('localhost')&&!text.includes('127.0.0.1'),'Local/private path in public file '+path);
}
console.log('Public content, requested landmarks, route continuity and map links checked.');
