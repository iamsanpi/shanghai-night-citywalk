'use strict';
window.CitywalkEntry=(()=>{
 const base='https://iamsanpi.github.io/shanghai-night-citywalk/';
 function onlineUrl(plan=new URLSearchParams(location.search).get('plan'),hash=location.hash){
  const url=new URL(base);
  if(['wed','night1','night2','one'].includes(plan))url.searchParams.set('plan',plan);
  url.hash=/^#(?:map-overview|route-title|fixed-[a-z]+|spot-[a-z]+)$/.test(hash)?hash:'#map-overview';
  return url.href;
 }
 function updateLocalNotice(plan){
  if(location.protocol!=='file:')return;
  const notice=document.getElementById('local-file-notice');
  if(notice){notice.hidden=false;notice.querySelector('a').href=onlineUrl(plan);}
 }
 if(location.protocol==='file:'){
  document.addEventListener('DOMContentLoaded',()=>updateLocalNotice(),{once:true});
  try{location.replace(onlineUrl());}catch{/* The visible link remains available if this viewer blocks navigation. */}
 }
 return{onlineUrl,updateLocalNotice};
})();
