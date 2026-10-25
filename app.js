'use strict';
const maps={
  name(query){return query.startsWith('上海')?query:'上海 '+query;},
  place(query){return 'https://maps.apple.com/search?'+new URLSearchParams({query:this.name(query)});},
  pin(lat,lon,name){return 'https://maps.apple.com/place?'+new URLSearchParams({coordinate:lat+','+lon,name});},
  walk(from,to,waypoints=[],mode='walking'){const p=new URLSearchParams({source:this.name(from),destination:this.name(to),mode});waypoints.forEach(w=>p.append('waypoint',this.name(w)));return 'https://maps.apple.com/directions?'+p;}
};
const photoBase='https://whb-oss.oss-cn-shanghai.aliyuncs.com/zhuzhan/rd/20221231/501871.html';
const spots={
 north:{name:'北外滩 / 三件套远景',short:'北外滩小巨蛋',poi:'北外滩滨江绿地小巨蛋',subtitle:'第一晚起点 · 江面与陆家嘴整体',image:'https://wenhui.whb.cn/u/cms/www/202212/31163738vx1u.jpg',credit:'文汇网 · 范家乐 · 2022-07-04',source:photoBase,caption:'北外滩看陆家嘴的实景构图参考。不是小巨蛋正后方的精确复拍坐标。',bearing:'面向江对岸，朝南至东南找陆家嘴',arrow:'↘',stand:'从国客中心滨江进入，在小巨蛋附近开放平台、靠江的公共步道站定。小巨蛋拍完，再沿岸微移，找三栋楼遮挡较少的角度。',face:'先肉眼找到东方明珠，再辨认开瓶器形的环球金融、层层收尖的金茂和扭转的上海中心。不要把东方明珠误当成三件套之一。',frame:'横屏保住天际线和一层水面，近处只留少量栏杆或路人。三件套若与东方明珠重叠，就横向移动几步；不强求与参考图每栋楼的相对位置完全一致。',sequence:'通道走出江景 → 停住看整体 → 等一条船完整通过 → 补人和小巨蛋的尺度 → 回到天际线。',next:'沿滨江公共通道向西接外白渡桥北桥头。苹果地图已查最快约1公里 / 18分钟，边拍留25分钟。',note:'17:00先拍天色，18:00后补亮灯。邮轮若挡视线，用相邻开放平台。参考照片的云和水面效果不作为普通视频效果。'},
 bridge:{name:'外白渡桥',short:'外白渡桥',poi:'外白渡桥',subtitle:'桥名近景 + 钢架纵深 + 走入桥内',image:'https://sghimages.shobserver.com/img/catch/2023/08/02/fe04263b-8206-49a2-90b8-0ee9a2c09485.jpg',credit:'上观号 · 绿色上海 · 2023-08-02',source:'https://sghexport.shobserver.com/html/baijiahao/2023/08/02/1087956.html',caption:'以桥名石构为近景、桥架斜向延伸的实景。桥灯颜色以当天为准。',bearing:'北桥头西侧，沿桥身朝南偏东',arrow:'↘',stand:'到北桥头后，找靠上海大厦一侧、桥西侧的开放公共步道。先在桥外把“外白渡桥”桥名石构与钢架排在一起，再走入桥上人行道。',face:'桥外建议朝南偏东，让桥身往画面深处延伸；走进桥内后顺桥朝南拍。这里的具体朝向根据实景建筑关系判断，落脚点按当天通行空间调整。',frame:'桥名放一侧近景，钢架沿对角线伸出去，水面留在下方。第二条镜头改用桥架的重复线条，让行人从画面里走完。',sequence:'桥外整体 → 桥名与钢架 → 连续走进桥内 → 定住等行人经过 → 一处铆钉或桥名细节 → 离桥。',next:'两晚第1晚：从北岸沿北苏州路公共步道向西去乍浦路桥；一晚版：向南离桥，进入圆明园路 / 外滩源。',note:'通行中保持向前看。等走到宽处再停机位；参考照片不意味着需要站在机动车道里。'},
 creek:{name:'乍浦路桥',short:'乍浦路桥',poi:'乍浦路桥',subtitle:'苏州河在前，外白渡桥在中，陆家嘴在后',image:'https://wenhui.whb.cn/u/cms/www/202212/31163744qjb8.jpg',credit:'文汇网 · 范家乐 · 2022-07-10',source:photoBase,caption:'桥上朝东的三层空间。两岸建筑自然形成左右边框。',bearing:'桥面东侧人行道，朝东至东南',arrow:'→',stand:'站在乍浦路桥朝东一侧的公共人行道，面向苏州河口。先找到外白渡桥，再把陆家嘴放在它后面。',face:'镜头朝东到东南，面向外白渡桥和陆家嘴；朝西回看则是邮政大楼等苏州河建筑，是另一组镜头。',frame:'下方留水面，中间留桥，后面留高楼；不要只裁成一排楼顶。先固定整体，等水纹、船或前景人物完整经过。',sequence:'走上桥 → 停住看三层空间 → 等动作发生 → 回看邮政大楼外观 → 沿河离开。',next:'一晚版：沿北岸公共步道向东回外白渡桥，约300米 / 6分钟为已查地图参考。两晚第1晚：由桥南端接虎丘路、南苏州路，转入圆明园路，保留少量折返。',note:'夜间只拍邮政馆外观，不把室内门框机位列为必拍。'},
 origin:{name:'圆明园路 / 外滩源',short:'外滩源 / 圆明园路',poi:'圆明园路',subtitle:'桥与外滩之间，保留一段老街走拍',stand:'进入圆明园路步行段，在街口、建筑转角或近处墙边找前景。',face:'沿街向南推进，最后由开放街口转向江边。',frame:'近墙或门窗在一边，行人在中间，街道往远处延伸。',sequence:'走入街口 → 沿立面前进 → 等人经过门窗 → 一处街牌细节 → 走出江边。',next:'经北京东路或开放街口接中山东一路，再向南京东路东端的和平饭店走。',note:'这一站用于连接空间；不为补机位走进居民门厅。'},
 peace:{name:'和平饭店',short:'和平饭店',poi:'和平饭店',subtitle:'站在江边平台回看，保留绿顶与完整立面',image:'https://upload.wikimedia.org/wikipedia/commons/5/53/Peace_Hotel_Shanghai_%2820191113200111%29.jpg',credit:'N509FZ · Wikimedia Commons · 2019-11-13',source:'https://commons.wikimedia.org/wiki/File:Peace_Hotel_Shanghai_(20191113200111).jpg',license:'https://creativecommons.org/licenses/by-sa/4.0/',caption:'作者公开了拍摄坐标和约305°朝向。照片原样引用，CC BY-SA 4.0。',bearing:'江边公共平台，朝西北约305°',arrow:'↖',pin:[31.240647,121.486083],stand:'南京东路东端、陈毅广场附近的外滩公共平台，站在中山东一路靠江一侧，隔街回看和平饭店。定位按钮使用参考照片作者公开坐标，抵达后在开放平台内微调。',face:'大致朝西北，作者记录约305°。绿顶是和平饭店；右侧较高、平顶的是中国银行大楼。拍完回身朝东，可接浦东天际线。',frame:'绿顶与立面上下留全，底部留行人和一点路口；把两侧建筑当陪衬。先拍整体，再补路人经过和门口，避免一直贴墙仰拍。',sequence:'从南京东路走向江边 → 平台上回看饭店整体 → 定住等人车经过 → 屋顶或招牌一处细节 → 回身露出黄浦江。',next:'沿外滩平台向南，去海关钟楼、浦发银行大楼对应位置；移动预算7 - 10分钟，停留拍摄另算。',note:'作者坐标31.240647, 121.486083；坐标来自照片说明，作为附近定位，不代表当天通行边界。'},
 customs:{name:'海关大楼 / 浦发银行大楼',short:'海关 / 浦发银行大楼',poi:'上海海关大楼',subtitle:'外滩老建筑组收尾，再回身看江',stand:'在海关大楼、浦发银行大楼对应的外滩公共平台，隔中山东一路站定。',face:'朝西看钟楼、穹顶与立面；收尾回身朝东看浦东。',frame:'先保两栋建筑关系，再选择钟楼或穹顶作主体，底部留一层人。',sequence:'两栋整体 → 主体中景 → 等一个人走过 → 钟楼或穹顶细节 → 回到江面。',next:'21:30前拍齐主要灯光，之后沿平台短段补漏、步行离开核心人流，再在实际允许停靠的路段叫车。',note:'这张是沿途拍摄说明，没有把其他岸线的照片冒充本机位实景。'},
 wukang:{name:'武康大楼 / 武康路南段',short:'武康大楼',poi:'武康大楼',subtitle:'先看楼尖，再沿楼边进入街道',image:'https://x0.ifengimg.com/ucms/2023_42/92798E49733D3CF6A909E814419836AE78AD8452_size268_w1080_h1620.jpg',credit:'凤凰网转载 · 来源南风窗 · 2023-10-16',source:'https://travel.ifeng.com/c/8TvH9FqBfFm',caption:'原图为竖幅和长曝光；视频借构图关系，不照搬光轨。',bearing:'源点广场附近，面向武康大楼楼尖',arrow:'↑',stand:'楼尖对面的源点广场附近公共人行空间，先隔街找角度。完成整体后按人行过街线到大楼一侧，再向北沿武康路走。',face:'以楼尖为方向参照，把长立面留在画面左侧；具体朝向跟着现场楼尖，而不是只看手机罗盘。',frame:'横屏把楼尖放中线偏右，左边保留长立面，下方留一层街道、人车。',sequence:'隔街整体 → 定住等一组人车经过 → 过街到达 → 沿楼边走入武康路 → 一个门窗或橱窗细节。',next:'沿武康路向北短走到武康庭附近。两晚第2晚17:45左右、一晚版17:40左右结束这一片区，再一次打车转场。',note:'最初40 - 45分钟优先拍武康路，不依赖建筑一定亮灯。'},
 court:{name:'武康路南段 / 武康庭附近',short:'武康庭附近',poi:'武康庭',subtitle:'短走街道，到这里结束武康路片区',stand:'沿武康路公共人行道，选树、老建筑和一家营业店面有前后关系的位置。',face:'沿武康路向北走；偶尔停住看街侧门窗，再回到行进方向。',frame:'保留街道环境和人进出的中景，不连续拍一排孤立店招。',sequence:'沿街前进 → 看一次人进出 → 门窗细节 → 回到路上 → 上车转场。',next:'按路线中的虚线转场：去上海中心附近或乍浦路桥附近。上下客以现场实际允许停靠地点为准。',note:'不继续加安福路等更远街区，给后半晚留出拍摄时间。'},
 towers:{name:'三件套 / 地面仰拍',short:'三件套地面机位',poi:'花园石桥路与东泰路交叉口',subtitle:'第二晚陆家嘴片区起点 · 高楼脚下的尺度',image:'https://ak-d.tripcdn.com/images/0EQ4w12000rq8629h6522.jpg?proc=source%2Ftrip',credit:'Trip.com · Shanghai Tower visiting guide',source:'https://us.trip.com/guide/attraction/shanghai-tower-tickets.html',caption:'地面三塔仰拍关系参考。来源未公开精确落脚点，下面给的是已报道的公共机位区域。',bearing:'朝上仰拍，以环球金融为中间参照',arrow:'↑',stand:'花园石桥路与东泰路路口，金茂大厦东面、南面附近的公共人行道。先正常站立走一圈观察，找三栋楼之间有天空间隙的位置。',face:'这组是向上仰拍，不是水平朝一个方向。用“开瓶器”环球金融作中间参照，微调到金茂在左、上海中心在右的关系；拍不全就各拍一栋。',frame:'先用人和楼底交代尺度，再停住仰拍。三塔全入镜需视镜头视角与站位而定；Pocket 3不必硬复刻超广角竖幅。完整天际线已经在北外滩拍过。',sequence:'下车走到路口 → 人与高楼底部 → 选择一栋主体走近 → 停住抬头 → 回到道路，向明珠环走。',next:'沿公共人行道向西北，按地图步行去明珠环周边街口。上海中心直达街口此前已查约800米 / 15分钟；本路口出发和登桥另计。',note:'机位区域依据东方网转澎湃新闻现场报道：金茂东、南侧人行道。不要把照片中的整组视野当成精确保证。',positionSource:'https://j.eastday.com/p/1727703119040642'},
 ring:{name:'明珠环 / 东方明珠',short:'明珠环 / 环形天桥',poi:'明珠环岛与陆家嘴环路交叉口',subtitle:'先在桥下框景，再上桥拍行人与曲线',image:'https://www.whb.cn/u/cms/www/202107/01170304bg2m.jpg',credit:'文汇网 · 袁婧摄 · 2021-07-01',source:'https://www.whb.cn/zhuzhan/hsttupian/20210701/412271.html',caption:'桥下弧线框住塔身；参考图挡住塔尖，需要另补完整主镜头。活动花坛不作现状保证。',bearing:'桥下朝东方明珠，约西北方向',arrow:'↖',stand:'导航到街口后，在桥下开放人行道找弧线；然后从当天开放的扶梯或楼梯上桥。不要把环岛街口定位当成天桥入口。',face:'桥下以东方明珠为目标，约朝西北；桥上顺着连廊曲线前进，遇到合适位置再转向塔。',frame:'桥弧作上方前景，塔在开口里，下面留车流。上桥后另拍扶手曲线和行人。',sequence:'桥下框景 → 找入口 → 上桥完整动作 → 桥上走拍 → 等人经过 → 离桥补塔身完整画面。',next:'步行到东方明珠公共外围，再向西去浦东美术馆与滨江。',note:'普通视频保留真实车流、脚步和现场声，不把旧照片灯色当作当晚效果。'},
 pearl:{name:'东方明珠外围',short:'东方明珠外围',poi:'东方明珠广播电视塔',subtitle:'补一条塔身完整主镜头',stand:'塔外围公共人行空间，退到能看见较完整塔身的位置。',face:'正对塔身，以塔为方向参照；拍完沿公共路径向西去浦东美术馆。',frame:'主体留完整，底部留人作为尺度，避免近处只有一张仰天的塔身局部。',sequence:'人和塔 → 完整主镜头 → 等人走过 → 顺路转弯，让塔从画面里退开。',next:'向西步行去浦东美术馆外，移动预算15 - 20分钟。',note:'不安排登塔，也不依赖收费区域。'},
 museum:{name:'浦东美术馆外 / 滨江',short:'美术馆外 / 滨江',poi:'浦东美术馆',subtitle:'回看第一晚的外滩老建筑',stand:'浦东美术馆西门外、靠黄浦江的开放公共平台，或相邻开放滨江步道。',face:'朝西至西北，隔江看外滩万国建筑群。',frame:'近处留一点美术馆白墙，走出来让江面与对岸建筑打开。',sequence:'白墙和行人 → 缓慢走出江景 → 定住等船通过 → 水面灯光 → 开阔江面收尾。',next:'21:30前保住主要亮灯画面，之后短段补漏，步行到可停靠路段叫车。',note:'“日落长廊”是地点名，此时拍夜景；只依赖室外公共区域，不依赖室内、镜厅或屋顶。'}
};
const plans={
 night1:{title:'北外滩 → 桥 → 外滩',summary:'17:00已到北外滩。全程步行约3 - 4公里，含取景与少量折返的预算。',stops:[['north','17:00 - 18:10'],['bridge','18:35 - 18:55'],['creek','18:55 - 19:25'],['origin','19:25 - 20:00'],['peace','20:00 - 20:40'],['customs','20:40 - 22:00']],links:[['整晚步行路线','北外滩滨江绿地小巨蛋','上海海关大楼',['外白渡桥','乍浦路桥','圆明园路','和平饭店']]]},
 night2:{title:'武康路 → 陆家嘴 → 滨江',summary:'两个片区各自步行，只有武康路→陆家嘴一次打车。跨区预留45 - 55分钟，为预算而非实时车程。',taxi:1,stops:[['wukang','17:00 - 17:25'],['court','17:25 - 17:45'],['towers','18:40 - 19:15'],['ring','19:15 - 20:00'],['pearl','20:00 - 20:35'],['museum','20:35 - 22:00']],links:[['武康路步行段','武康大楼','武康庭',[]],['陆家嘴步行段','花园石桥路与东泰路交叉口','浦东美术馆',['明珠环岛与陆家嘴环路交叉口','东方明珠广播电视塔']]]},
 one:{title:'武康路 → 苏州河 → 外滩',summary:'武康路短走后，一次打车进入苏州河。后半晚连续步行，东方明珠和三件套拍隔江远景；想近拍高楼就选择“两晚·第2晚”。',taxi:1,stops:[['wukang','17:00 - 17:25'],['court','17:25 - 17:40'],['creek','18:30 - 19:05'],['bridge','19:05 - 19:25'],['origin','19:25 - 20:00'],['peace','20:00 - 20:40'],['customs','20:40 - 22:00']],links:[['武康路步行段','武康大楼','武康庭',[]],['苏州河至外滩步行段','乍浦路桥','上海海关大楼',['外白渡桥','圆明园路','和平饭店']]]}
};
function make(tag,attrs={},text){const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;}
function link(text,url,cls=''){return make('a',{href:url,...(cls?{class:cls}:{}),target:'_blank',rel:'noopener'},text);}
function field(dl,label,value){dl.append(make('dt',{},label),make('dd',{},value));}
function render(planKey){
 const plan=plans[planKey];document.querySelectorAll('[data-plan]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.plan===planKey)));
 document.getElementById('route-title').textContent=plan.title;document.getElementById('route-summary').textContent=plan.summary;
 const whole=document.getElementById('whole-links');whole.replaceChildren();plan.links.forEach(([label,from,to,waypoints],i)=>whole.append(link(label+' ↗',maps.walk(from,to,waypoints),'action'+(i===0?' primary':''))));
 const list=document.getElementById('route-list'),cards=document.getElementById('spot-cards');list.replaceChildren();cards.replaceChildren();
 plan.stops.forEach(([id,time],i)=>{
  const s=spots[id],next=plan.stops[i+1],taxi=plan.taxi===i;
  const li=make('li'),num=make('span',{class:'route-num'},i+1),rt=make('div',{class:'route-text'}),jump=make('a',{href:'#spot-'+id},s.short);
  rt.append(jump,make('div',{class:'route-time'},time));
  if(next){const leg=make('div',{class:'leg'+(taxi?' taxi':'')});leg.append(make('div',{class:'leg-names'},maps.name(s.poi)+' → '+maps.name(spots[next[0]].poi)),link(taxi?'跨区打车进入下一片区 ↗':'步行去下一站 ↗',maps.walk(s.poi,spots[next[0]].poi,[],taxi?'driving':'walking')));rt.append(leg);}
  li.append(num,rt);list.append(li);
  const article=make('article',{class:'spot',id:'spot-'+id}),header=make('div',{class:'spot-header'});
  header.append(make('p',{class:'spot-kicker'},'第'+(i+1)+'站 · '+time),make('h3',{},s.name),make('p',{class:'spot-sub'},s.subtitle));article.append(header);
  if(s.image){
   const sizes={north:[3600,1800],bridge:[1080,721],creek:[3000,2000],peace:[6711,4474],wukang:[1080,1620],towers:[1500,2000],ring:[750,514]};
   const [width,height]=sizes[id];
   const fig=make('figure',{class:'photo'}),img=make('img',{src:s.image,width,height,alt:s.name+'实景构图参考',loading:i===0?'eager':'lazy',decoding:'async',referrerpolicy:'no-referrer'});
   img.addEventListener('error',()=>{img.remove();fig.prepend(make('p',{class:'photo-failure'},'原图暂时未加载。可点下方图片来源查看，站位与地图照常使用。'));},{once:true});
   const cap=make('figcaption');cap.append(document.createTextNode(s.caption+' '),link('图片来源：'+s.credit,s.source));if(s.license)cap.append(document.createTextNode(' · '),link('CC BY-SA 4.0',s.license));fig.append(img,cap);article.append(fig);
  }
  const body=make('div',{class:s.image?'spot-body':'mini-stop'});
  if(s.bearing){const bearing=make('div',{class:'bearing'}),text=make('div');text.append(make('small',{},'拍摄朝向'),make('strong',{},s.bearing));bearing.append(make('span',{class:'bearing-mark','aria-hidden':'true'},s.arrow),text);body.append(bearing);}
  const actions=make('div',{class:'actions'}),pin=s.pin?maps.pin(...s.pin,'和平饭店外滩平台参考站位'):maps.place(s.poi);
  actions.append(link(s.pin?'打开作者标注站位 ↗':'苹果地图 · 站位附近 ↗',pin,'action primary'));
  if(next)actions.append(link(taxi?'打车进入下一片区 ↗':'步行去下一站 ↗',maps.walk(s.poi,spots[next[0]].poi,[],taxi?'driving':'walking'),'action'+(taxi?' taxi':'')));
  body.append(actions);
  if(next){
   const manual=make('div',{class:'manual-nav'}),dl=make('dl');
   field(dl,'手动导航起点',maps.name(s.poi));field(dl,'手动导航终点',maps.name(spots[next[0]].poi));
   const copy=make('button',{type:'button',class:'copy-button'},'复制本段起终点');
   const status=make('span',{class:'copy-status','aria-live':'polite'});
   copy.addEventListener('click',async()=>{const text=(taxi?'打车转场':'步行段')+'\n起点：'+maps.name(s.poi)+'\n终点：'+maps.name(spots[next[0]].poi);try{await navigator.clipboard.writeText(text);status.textContent='已复制';}catch{status.textContent='请长按上方名称复制';}});
   manual.append(dl,copy,status);body.append(manual);
  }else{body.append(make('p',{class:'small'},'本片区终点：'+maps.name(s.poi)+'。收机后步行离开核心人流，再导航回程。'));}
  [['站哪儿',s.stand],['朝哪儿',s.face],['怎么构图',s.frame],['怎么拍、怎么接',s.sequence],['接着走',s.next]].forEach(([a,b])=>{const dl=make('dl',{class:'field'});field(dl,a,b);body.append(dl);});
  body.append(make('p',{class:'small'},s.note));
  if(s.positionSource){const p=make('p',{class:'source-detail'});p.append(link('查看机位区域的现场报道',s.positionSource));body.append(p);}
  if(!s.image)body.append(make('p',{class:'no-photo'},'沿途连接站：本卡提供走法与取景任务，没有用其他机位的照片代替实景。'));
  article.append(body);cards.append(article);
 });
}
let selected='night1';try{const q=new URLSearchParams(location.search).get('plan');if(plans[q])selected=q;}catch{}
document.querySelectorAll('[data-plan]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.plan;render(selected);const url=new URL(location.href);url.searchParams.set('plan',selected);url.hash='';history.replaceState(null,'',url);}));
render(selected);
