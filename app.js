'use strict';
const maps={
  name(query){return query.startsWith('上海')?query:'上海 '+query;},
  place(query){return 'https://maps.apple.com/search?'+new URLSearchParams({query:this.name(query)});},
  pin(lat,lon,name){return 'https://maps.apple.com/place?'+new URLSearchParams({coordinate:lat+','+lon,name});},
  walk(from,to,waypoints=[],mode='walking'){const p=new URLSearchParams({source:this.name(from),destination:this.name(to),mode});waypoints.forEach(w=>p.append('waypoint',this.name(w)));return 'https://maps.apple.com/directions?'+p;}
};
const photoBase='https://whb-oss.oss-cn-shanghai.aliyuncs.com/zhuzhan/rd/20221231/501871.html';
const spots={
 north:{name:'北外滩 / 三件套远景',short:'北外滩小巨蛋',poi:'北外滩滨江绿地小巨蛋',subtitle:'第一晚起点 · 江面与陆家嘴整体',image:'https://wenhui.whb.cn/u/cms/www/202212/31163738vx1u.jpg',credit:'文汇网 · 范家乐 · 2022-07-04',source:photoBase,caption:'北外滩看陆家嘴的实景构图参考。不是小巨蛋正后方的精确复拍坐标。',bearing:'面向江对岸，朝南至东南找陆家嘴',arrow:'↘',stand:'从国客中心滨江进入，在小巨蛋附近开放平台、靠江的公共步道站定。小巨蛋拍完，再沿岸微移，找三栋楼遮挡较少的角度。',face:'先肉眼找到东方明珠，再辨认开瓶器形的环球金融、层层收尖的金茂和扭转的上海中心。不要把东方明珠误当成三件套之一。',frame:'横屏建议：水面放下方约1/4至1/3，东方明珠与高楼组放中间，塔尖留余量。栏杆只占很少一条；沿开放岸线微移，找遮挡较少的位置。这张借建筑与水面的比例，视频保留真实水纹。',sequence:'通道走出江景 → 停住看整体 → 等一条船完整通过 → 补人和小巨蛋的尺度 → 回到天际线。',next:'沿滨江公共通道向西接外白渡桥北桥头。苹果地图已查最快约1公里 / 18分钟，边拍留25分钟。',note:'17:00先拍天色，18:00后补亮灯。邮轮若挡视线，用相邻开放平台。参考照片的云和水面效果不作为普通视频效果。'},
 bridge:{name:'外白渡桥',short:'外白渡桥',poi:'外白渡桥',subtitle:'桥名近景 + 钢架纵深 + 走入桥内',image:'https://sghimages.shobserver.com/img/catch/2023/08/02/fe04263b-8206-49a2-90b8-0ee9a2c09485.jpg',credit:'上观号 · 绿色上海 · 2023-08-02',source:'https://sghexport.shobserver.com/html/baijiahao/2023/08/02/1087956.html',caption:'以桥名石构为近景、桥架斜向延伸的实景。桥灯颜色以当天为准。',bearing:'北桥头西侧，沿桥身朝南偏东',arrow:'↘',stand:'到北桥头后，找靠上海大厦一侧、桥西侧的开放公共步道。先在桥外把“外白渡桥”桥名石构与钢架排在一起，再走入桥上人行道。',face:'桥外建议朝南偏东，让桥身往画面深处延伸；走进桥内后顺桥朝南拍。这里的具体朝向根据实景建筑关系判断，落脚点按当天通行空间调整。',frame:'横屏建议：桥名石构放左侧约1/3，钢架由左近处向右远处斜着延伸，下方留水面。下一条进入桥上，让重复钢架引向远处，等行人完整走过。',sequence:'桥外整体 → 桥名与钢架 → 连续走进桥内 → 定住等行人经过 → 一处铆钉或桥名细节 → 离桥。',next:'两晚第1晚：从北岸沿北苏州路公共步道向西去乍浦路桥；一晚版：向南离桥，进入圆明园路 / 外滩源。',note:'通行中保持向前看。等走到宽处再停机位；参考照片不意味着需要站在机动车道里。'},
 creek:{name:'乍浦路桥',short:'乍浦路桥',poi:'乍浦路桥',subtitle:'苏州河在前，外白渡桥在中，陆家嘴在后',image:'https://wenhui.whb.cn/u/cms/www/202212/31163744qjb8.jpg',credit:'文汇网 · 范家乐 · 2022-07-10',source:photoBase,caption:'桥上朝东的三层空间。两岸建筑自然形成左右边框。',bearing:'桥面东侧人行道，朝东至东南',arrow:'→',stand:'站在乍浦路桥朝东一侧的公共人行道，面向苏州河口。先找到外白渡桥，再把陆家嘴放在它后面。',face:'镜头朝东到东南，面向外白渡桥和陆家嘴；朝西回看则是邮政大楼等苏州河建筑，是另一组镜头。',frame:'横屏建议：下方约1/3留苏州河水面，中间偏下是外白渡桥，后方高楼与塔尖留全。两岸建筑留在左右作边框，让河道引向桥。先定住拍整体，再等船或水纹进入。',sequence:'走上桥 → 停住看三层空间 → 等动作发生 → 回看邮政大楼外观 → 沿河离开。',next:'一晚版：沿北岸公共步道向东回外白渡桥，约300米 / 6分钟为已查地图参考。两晚第1晚：由桥南端接虎丘路、南苏州路，转入圆明园路，保留少量折返。',note:'夜间只拍邮政馆外观，不把室内门框机位列为必拍。'},
 origin:{name:'圆明园路 / 外滩源',short:'外滩源 / 圆明园路',poi:'圆明园路',subtitle:'桥与外滩之间，保留一段老街走拍',stand:'进入圆明园路步行段，在街口、建筑转角或近处墙边找前景。',face:'沿街向南推进，最后由开放街口转向江边。',frame:'近墙或门窗在一边，行人在中间，街道往远处延伸。',sequence:'走入街口 → 沿立面前进 → 等人经过门窗 → 一处街牌细节 → 走出江边。',next:'经北京东路或开放街口接中山东一路，再向南京东路东端的和平饭店走。',note:'这一站用于连接空间；不为补机位走进居民门厅。'},
 peace:{name:'和平饭店',short:'和平饭店',poi:'和平饭店',subtitle:'站在江边平台回看，保留绿顶与完整立面',image:'https://upload.wikimedia.org/wikipedia/commons/5/53/Peace_Hotel_Shanghai_%2820191113200111%29.jpg',credit:'N509FZ · Wikimedia Commons · 2019-11-13',source:'https://commons.wikimedia.org/wiki/File:Peace_Hotel_Shanghai_(20191113200111).jpg',license:'https://creativecommons.org/licenses/by-sa/4.0/',caption:'作者公开了拍摄坐标和约305°朝向。照片原样引用，CC BY-SA 4.0。',bearing:'江边公共平台，朝西北约305°',arrow:'↖',pin:[31.240647,121.486083],stand:'南京东路东端、陈毅广场附近的外滩公共平台，站在中山东一路靠江一侧，隔街回看和平饭店。定位按钮使用参考照片作者公开坐标，抵达后在开放平台内微调。',face:'大致朝西北，作者记录约305°。绿顶是和平饭店；右侧较高、平顶的是中国银行大楼。拍完回身朝东，可接浦东天际线。',frame:'横屏建议：绿顶放中间偏右，和平饭店的长立面向左展开；底部留一条人车和路口，顶部不切屋顶。先定住等人车经过，再另拍门口或绿顶细节。',sequence:'从南京东路走向江边 → 平台上回看饭店整体 → 定住等人车经过 → 屋顶或招牌一处细节 → 回身露出黄浦江。',next:'沿外滩平台向南，去海关钟楼、浦发银行大楼对应位置；移动预算7 - 10分钟，停留拍摄另算。',note:'作者坐标31.240647, 121.486083；坐标来自照片说明，作为附近定位，不代表当天通行边界。'},
 customs:{name:'海关大楼 / 浦发银行大楼',short:'海关 / 浦发银行大楼',poi:'上海海关大楼',subtitle:'外滩老建筑组收尾，再回身看江',image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/2014.11.15.192034_HSBC_Building_Customs_House_Bund_night_Shanghai.jpg/960px-2014.11.15.192034_HSBC_Building_Customs_House_Bund_night_Shanghai.jpg',credit:'Hermann Luyken · Wikimedia Commons · 2014-11-15',source:'https://commons.wikimedia.org/wiki/File:2014.11.15.192034_HSBC_Building_Customs_House_Bund_night_Shanghai.jpg',license:'https://creativecommons.org/publicdomain/zero/1.0/',licenseLabel:'CC0 1.0',caption:'穹顶在左、钟楼在右的斜向同框参考。原作者在较南侧朝西北拍；本卡导航仍指向本区公共平台附近，精确落脚点可沿开放步道微调。',stand:'在海关大楼、浦发银行大楼对应的外滩公共平台，隔中山东一路站定。',face:'朝西看钟楼、穹顶与立面；收尾回身朝东看浦东。',frame:'横屏建议：穹顶放左、海关钟楼放右，中间保留两栋连接关系；少留空黑天，底部带一点街道或人流。参考图从南侧朝西北看，沿开放平台微调角度；另补钟面或柱廊一条细节。',sequence:'两栋整体 → 主体中景 → 等一个人走过 → 钟楼或穹顶细节 → 回到江面。',next:'21:30前拍齐主要灯光，之后沿平台短段补漏、步行离开核心人流，再在实际允许停靠的路段叫车。',note:'参考照片拍于2014年，灯色和亮度以当天为准。作者记录站位31.236778, 121.487077、朝向约317°；本卡导航仍为海关附近公共平台。'},
 wukang:{name:'武康大楼 / 武康路南段',short:'武康大楼',poi:'武康大楼',subtitle:'先看楼尖，再沿楼边进入街道',image:'https://x0.ifengimg.com/ucms/2023_42/92798E49733D3CF6A909E814419836AE78AD8452_size268_w1080_h1620.jpg',credit:'凤凰网转载 · 来源南风窗 · 2023-10-16',source:'https://travel.ifeng.com/c/8TvH9FqBfFm',caption:'原图为竖幅和长曝光；视频借构图关系，不照搬光轨。',bearing:'源点广场附近，面向武康大楼楼尖',arrow:'↑',stand:'楼尖对面的源点广场附近公共人行空间，先隔街找角度。完成整体后按人行过街线到大楼一侧，再向北沿武康路走。',face:'以楼尖为方向参照，把长立面留在画面左侧；具体朝向跟着现场楼尖，而不是只看手机罗盘。',frame:'横屏建议：楼尖放右侧约1/3，长立面向左延伸，下方约1/4留街道与人车。原图为竖幅，横屏需要在开放人行空间退远一些；拍完过街，沿楼边向武康路进入。',sequence:'隔街整体 → 定住等一组人车经过 → 过街到达 → 沿楼边走入武康路 → 一个门窗或橱窗细节。',next:'沿武康路向北短走到武康庭附近。两晚第2晚17:45左右、一晚版17:40左右结束这一片区，再一次打车转场。',note:'最初40 - 45分钟优先拍武康路，不依赖建筑一定亮灯。'},
 court:{name:'武康路南段 / 武康庭附近',short:'武康庭附近',poi:'武康庭',subtitle:'短走街道，到这里结束武康路片区',stand:'沿武康路公共人行道，选树、老建筑和一家营业店面有前后关系的位置。',face:'沿武康路向北走；偶尔停住看街侧门窗，再回到行进方向。',frame:'保留街道环境和人进出的中景，不连续拍一排孤立店招。',sequence:'沿街前进 → 看一次人进出 → 门窗细节 → 回到路上 → 上车转场。',next:'按路线中的虚线转场：去上海中心附近或乍浦路桥附近。上下客以现场实际允许停靠地点为准。',note:'不继续加安福路等更远街区，给后半晚留出拍摄时间。'},
 towers:{name:'三件套 / 地面仰拍',short:'三件套地面机位',poi:'花园石桥路与东泰路交叉口',subtitle:'第二晚陆家嘴片区起点 · 高楼脚下的尺度',image:'https://ak-d.tripcdn.com/images/0EQ4w12000rq8629h6522.jpg?proc=source%2Ftrip',credit:'Trip.com · Shanghai Tower visiting guide',source:'https://us.trip.com/guide/attraction/shanghai-tower-tickets.html',caption:'地面三塔仰拍关系参考。来源未公开精确落脚点，下面给的是已报道的公共机位区域。',bearing:'先看楼底人物，再另摆仰角',arrow:'↑',stand:'花园石桥路与东泰路路口，金茂大厦东面、南面附近的公共人行道。先正常站立走一圈观察，找三栋楼之间有天空间隙的位置。',face:'固定主镜头先朝向楼底与人行道。拍完后停录，再重新摆仰角；参考照片用“开瓶器”环球金融作中间参照，金茂在左、上海中心在右，拍不全就各拍一栋。',frame:'原图为竖幅关系参考：金茂在左，环球金融在中，上海中心在右，楼顶之间留天空间隙。横屏先拍人与楼底，再分别拍一栋或两栋关系；停住再缓慢抬头。三塔全入镜取决于站位和镜头，完整组合可在对岸拍。',sequence:'下车走到路口 → 人与高楼底部 → 选择一栋主体走近 → 停住抬头 → 回到道路，向明珠环走。',next:'沿公共人行道向西北，按地图步行去明珠环周边街口。上海中心直达街口此前已查约800米 / 15分钟；本路口出发和登桥另计。',note:'机位区域依据东方网转澎湃新闻现场报道：金茂东、南侧人行道。不要把照片中的整组视野当成精确保证。',positionSource:'https://j.eastday.com/p/1727703119040642'},
 ring:{name:'明珠环 / 东方明珠',short:'明珠环 / 环形天桥',poi:'明珠环岛与陆家嘴环路交叉口',subtitle:'先在桥下框景，再上桥拍行人与曲线',image:'https://www.whb.cn/u/cms/www/202107/01170304bg2m.jpg',credit:'文汇网 · 袁婧摄 · 2021-07-01',source:'https://www.whb.cn/zhuzhan/hsttupian/20210701/412271.html',caption:'桥下弧线框住塔身；参考图挡住塔尖，需要另补完整主镜头。活动花坛不作现状保证。',bearing:'桥下朝东方明珠，约西北方向',arrow:'↖',stand:'导航到街口后，在桥下开放人行道找弧线；然后从当天开放的扶梯或楼梯上桥。不要把环岛街口定位当成天桥入口。',face:'桥下以东方明珠为目标，约朝西北；桥上顺着连廊曲线前进，遇到合适位置再转向塔。',frame:'横屏建议：天桥弧线沿画面上方绕向右边，东方明珠放在桥弧开口中、略偏左，底部留一条车流。桥下这一条允许塔尖被桥挡住；随后到塔外围另补完整塔身，上桥后顺扶手曲线拍行人。',sequence:'桥下框景 → 找入口 → 上桥完整动作 → 桥上走拍 → 等人经过 → 离桥补塔身完整画面。',next:'步行到东方明珠公共外围，再向西去浦东美术馆与滨江。',note:'普通视频保留真实车流、脚步和现场声，不把旧照片灯色当作当晚效果。'},
 pearl:{name:'东方明珠外围',short:'东方明珠外围',poi:'东方明珠广播电视塔',subtitle:'补一条塔身完整主镜头',stand:'塔外围公共人行空间，退到能看见较完整塔身的位置。',face:'正对塔身，以塔为方向参照；拍完沿公共路径向西去浦东美术馆。',frame:'主体留完整，底部留人作为尺度，避免近处只有一张仰天的塔身局部。',sequence:'人和塔 → 完整主镜头 → 等人走过 → 顺路转弯，让塔从画面里退开。',next:'向西步行去浦东美术馆外，移动预算15 - 20分钟。',note:'不安排登塔，也不依赖收费区域。'},
 museum:{name:'浦东美术馆外 / 滨江',short:'美术馆外 / 滨江',poi:'浦东美术馆',subtitle:'回看第一晚的外滩老建筑',stand:'浦东美术馆西门外、靠黄浦江的开放公共平台，或相邻开放滨江步道。',face:'朝西至西北，隔江看外滩万国建筑群。',frame:'近处留一点美术馆白墙，走出来让江面与对岸建筑打开。',sequence:'白墙和行人 → 缓慢走出江景 → 定住等船通过 → 水面灯光 → 开阔江面收尾。',next:'21:30前保住主要亮灯画面，之后短段补漏，步行到可停靠路段叫车。',note:'“日落长廊”是地点名，此时拍夜景；只依赖室外公共区域，不依赖室内、镜厅或屋顶。'}
};
const fixedShots={
 north:{
  frame:'在靠江公共步道停稳。横屏下方约1/4至1/3留水面，东方明珠和高楼组放中间，塔尖留全；机身和云台构好后保持不动。',
  wait:'选一条将要进入画面的船。让船从一侧进入、经过天际线下方，再向另一侧离开；不转镜头追船。',
  end:'船尾离开画面后，再保持原构图5秒才停。船走得慢就继续录，不因录够时长而中断。',
  next:'停录后另摆一条水面灯光或小巨蛋与行人的固定中景；再拍沿滨江向外白渡桥行进的一条，连接下一站。',
  fallback:'等1—2分钟仍无合适船，就录20—30秒水纹、倒影和江面环境声，接着走。'
 },
 bridge:{
  frame:'桥头公共步道上，桥名石构放左侧约1/3，钢架斜向右后方延伸，下方带水面，并给桥上人行道留出可见位置。',
  wait:'等一位或一小组行人沿人行道走入钢架之间。选定这一组动作，镜头保持原构图，保留脚步和车流声。',
  end:'这组人离开画面，或走入远端桥架被结构遮住后，再留5秒。后面又有人来，也不用重新等清场。',
  next:'停录后另拍桥名或铆钉的固定细节，再拍走入桥内的一条。第1晚按路线回北岸向西接乍浦路桥；一晚版向南离桥进外滩源。',
  fallback:'人流连续时只选其中一组走完；没有明显行人动作，就录15—20秒桥架、车流与现场声。'
 },
 creek:{
  frame:'桥面东侧公共人行道朝东至东南。下方约1/3留苏州河，中间偏下是外白渡桥，后方塔尖留全，两岸建筑作左右边框。',
  wait:'优先等外白渡桥上一组车灯横向通过；如果恰有船进入苏州河画面，再单独补一条船，不把船列为必等。',
  end:'选定的车灯走出桥身可见范围后留5秒；拍船时，等船尾离开画面再留5秒。全程不追摇、不变焦。',
  next:'停录后转身重新构图，补朝西的邮政大楼外观固定镜头；再拍沿河走向下一段的行进镜头，走向按所选路线。',
  fallback:'车灯很小或没有船时，录20—30秒河面水纹和两岸倒影，保住河、桥、高楼三层关系。'
 },
 origin:{
  frame:'圆明园路公共步行段找街角，近墙或门窗只占一侧，街道向远处延伸；画面底部留一条行人通道。',
  wait:'等一组行人从近处走向街道深处，或横向经过建筑转角。先选一种走向，定住看它完成。',
  end:'人走出画面，或在转角后消失，再留5秒；不用一直拍到远处看不清的人彻底离街。',
  next:'另拍街牌或窗框固定细节，再录一条沿街向南、转向江边的行进镜头，接和平饭店。',
  fallback:'没人经过就固定录15—20秒街道与灯影，随后拍转弯走出街口，保留空间连接。'
 },
 peace:{
  frame:'在靠江公共平台隔街朝西北。绿顶放中间偏右，长立面向左展开，底部留一条人车与路口，顶部不切屋顶。',
  wait:'等一小组行人横穿画面底边，或选一轮车流经过路口。建筑保持不动，让动作从底部穿过去。',
  end:'选定这组人的最后一人或这轮车流的最后一车走出画面后，再留5秒。只等这组动作完成，不要求整条街清空。',
  next:'停录后另摆门口或绿顶的固定细节，留8—12秒；再录走向江边、转出黄浦江的一条，最后沿平台向南去海关。',
  fallback:'人车太密就选一辆或一小组走完。短时间没有动作，可录20秒完整立面与现场声。'
 },
 customs:{
  frame:'外滩公共平台隔街看建筑；沿开放步道微调到穹顶在左、钟楼在右，保住两栋连接关系，少留空黑天，底部留人流或车道。',
  wait:'等一组行人从底边横向经过，或选一组车流穿过建筑前方。恰好听到钟声时，保持画面和录音继续。',
  end:'这一组人车离开画面后留5秒；恰有钟声则等这一段声音自然结束再多留5秒，不必专门等到整点。',
  next:'另拍钟面或柱廊固定细节8—12秒；再回身重新构图，录江面与浦东天际线作这一晚收尾，转身动作不塞进固定镜头。',
  fallback:'没等到明显人车时，录20秒钟楼与穹顶的稳定整体，保留环境声，再补江景。'
 },
 wukang:{
  frame:'源点广场附近公共人行空间隔街拍。楼尖放右侧约1/3，长立面向左延伸，下方约1/4留街道、人车，楼顶留余量。',
  wait:'选一辆将要横穿楼尖前方的车，或一组正常过街的行人。让他们经过画面底部，镜头不跟着移动。',
  end:'选定的车尾或最后一位行人离开画面后，再留5秒；不用等整轮路口交通全部结束。',
  next:'停录后按人行过街线到大楼一侧，录过街到达、沿楼边走入武康路的行进镜头；再补一处门窗固定细节。',
  fallback:'车流不停就只选一辆完整通过；画面太拥挤可先固定录20秒街角与人群，再按路线进入街道。'
 },
 court:{
  frame:'武康路公共人行道上，树干或墙边占一侧，老建筑与营业店面在中景，留出店门和一段公共步道。',
  wait:'等有人进出店门，或一组行人沿树影走过。拍的是人、门与街道的关系，保持中景。',
  end:'进门的人在门内消失、门恢复静止，或行人走出画面后，再留5秒。',
  next:'另拍橱窗或树影固定细节8—12秒，再拍回到人行道、走向上车位置的一条；跨区后用新地点整体重新交代空间。',
  fallback:'店门没有动作就选路上行人；仍没有动作，固定录15—20秒树影和街道声后结束。'
 },
 towers:{
  frame:'先选一栋或两栋高楼的立面与楼底，底部留公共人行通道，让楼的竖线向上延伸。构图确定后，人物经过时不再抬头或横摇。',
  wait:'等一位或一组行人经过楼底，用人的大小交代建筑尺度；人物沿画面下方完整走过即可。',
  end:'选定这组人走出下方通道的可见范围后，再留5秒。高楼一直保持在原位置。',
  next:'停录后再换仰角、重新定住，分别拍金茂层叠轮廓、环球金融顶部或上海中心扭转立面，各留10—15秒；再回到道路行进，接明珠环。',
  fallback:'楼底没人时，先固定录15—20秒建筑与街道声；另摆仰角定镜，不要求横屏同时装下三栋。'
 },
 ring:{
  frame:'桥下开放人行道找弧线：天桥沿画面上方绕向右边，东方明珠放开口内略偏左，底部留一条车流。',
  wait:'能看见桥面时，等一组行人沿弧形连廊走过；桥面被挡时，改等底部一组车流。一次选定一个动作看完。',
  end:'选定的人走过可见桥段、被结构遮住或走出画面后留5秒；拍车则等最后一辆车尾离开再留5秒。',
  next:'停录后找开放入口，录上桥的完整动作；桥上另摆扶手曲线与行人的固定镜头，最后去塔外围补完整塔身。',
  fallback:'没有合适人车时，录15—20秒桥弧与塔的框景；旧图花坛和灯色不作为等待目标。'
 },
 pearl:{
  frame:'在塔外围开放人行空间找塔身尽量完整的位置，塔放中间或略偏一侧，下方留一层行人作为尺度，塔尖留余量。',
  wait:'等一小组行人从塔前或近处步道横向走过；让人物经过下方，完整塔身保持不动。',
  end:'选定这组人的最后一人离开画面后，再留5秒；不要在他们刚经过塔身时就收机。',
  next:'停录后另摆一条塔身局部固定镜头8—12秒；再录沿公共路径转弯、向美术馆和滨江行进的一条，让塔逐渐退到身后。',
  fallback:'塔身受遮挡就沿开放步道微调后重构图；没有人经过时固定录20秒塔与环境，不依赖进入园区。'
 },
 museum:{
  frame:'美术馆西侧开放滨江平台朝西至西北。白墙能入镜时只占一侧小边，江面和对岸外滩是主角；不能同框就直接拍开阔江景。',
  wait:'先选一条将要经过外滩灯光前方的船；近处恰有行人沿平台经过，也可另录一条人与江面的固定镜头。',
  end:'船尾或选定这组人的最后一人离开画面后再留5秒。收尾这一条可以多留10秒稳定江景与江风声。',
  next:'停录后另拍水纹与灯光倒影10—15秒，再录沿滨江步道离开的一条；若作为全片结尾，最后回到稳定江景结束。',
  fallback:'等1—2分钟无合适船，就录20—30秒外滩整体、水纹与江风，作为收尾，不无限等船。'
 }
};
const plans={
 wed:{title:'周三浦东 · 江边黄昏 → 明珠 → 三件套',summary:'16:00—16:30从浦东办事地点出发，先打车到浦东美术馆附近，再走到西侧公共滨江。争取17:00前抵达；出发地址待补，抵达时间不是车程保证。此后全程步行，连接段约1.8公里，含取景、上桥与找角度留2.5—3.5公里预算。',stops:[['museum','争取16:45 - 17:50'],['pearl','18:10 - 18:45'],['ring','18:50 - 19:25'],['towers','19:45 - 21:30；22:00前离场']],links:[['周三整段步行路线','浦东美术馆','花园石桥路与东泰路交叉口',['东方明珠广播电视塔','明珠环岛与陆家嘴环路交叉口']]],notes:[
  ['先拍天色，再拍灯光','先按本周三2026年10月28日安排：上海日落约17:10，民用暮光约17:34结束，天气决定实际天色。江边先拍外滩轮廓、天色与船；18:00后把重点转到明珠和高楼夜景，亮灯以现场为准。','日出日落表','https://www.daysfromdate.com/zh-cn/sunrise/cn/shanghai-shi/shanghai-municipality/'],
  ['拍成三个篇章','①黄昏江面与对岸老上海；②东方明珠、天桥与人车；③走到三件套脚下，以高楼和人物尺度收尾。19:25—19:45先给步行，抵达后三件套段可插入20分钟补给休息。'],
  ['另一晚怎么接','另一晚走“两晚·第1晚”的北外滩 → 外白渡桥 → 乍浦路桥 → 外滩源 → 和平饭店 → 海关。周三不加武康路；武康大楼留给另一个白天或原方案，不塞进这两晚的主线。'],
  ['晚到也能拍','17:30后才到江边：不追落日，第一站缩到20—30分钟拍江面与船，再按顺序前进；全程晚了就各站保留一组完整动作，优先保住东方明珠和三件套。']
 ],overrides:{
  museum:{subtitle:'周三起点 · 先在浦东看黄昏与对岸外滩',sequence:'走到西侧公共滨江 → 江面与外滩整体 → 固定等船经过 → 白墙或水纹细节 → 离开江边走向东方明珠。',next:'沿开放公共步道离开江边，按本段导航走到东方明珠南侧公共外围，约700米，留15—20分钟。',note:'只拍室外公共空间，不依赖美术馆开馆、室内、镜厅或屋顶。若已错过天色，就拍江面与船后继续。',fixed:{wait:'等一条船从黄昏江面或外滩轮廓前完整经过；不以建筑已经亮灯为前提，也不转镜头追船。',end:'船尾离开画面后再留5秒；另留10秒江风声。',next:'停录后另摆水纹或白墙与行人的细节，再录离开滨江、沿公共步道走向东方明珠的一条。',fallback:'等1—2分钟无合适船，就录20—30秒天色、江面和江风，随后继续，不无限等船。'}},
  pearl:{subtitle:'完整塔身与行人 · 周三第二站',face:'正对东方明珠，以塔为方向参照。完整塔身拍完后，走向南侧明珠环街口公共人行道。',next:'按地图向南短走至明珠环岛与陆家嘴环路交叉口公共人行道，连接段约150米；找桥下框景，再找开放上桥入口。',fixed:{next:'停录后另摆塔身局部8—12秒，再录向南走到明珠环街口的一条，让完整塔身接到下一条桥下框景。'}},
  ring:{subtitle:'明珠拍完，再用天桥弧线与人车变化构图',sequence:'从塔外围走到桥下 → 弧线框景定住等车 → 找开放入口上桥 → 扶手与行人 → 下桥走向三件套。',next:'拍完沿开放通道回到地面，向东南按步行导航去花园石桥路与东泰路交叉口。连接段约930米，留20分钟；上、下桥与找角度另计。',fixed:{next:'停录后从开放入口拍一条完整上桥动作；另摆扶手曲线与行人的固定镜头。下桥后录向三件套行进的一条，不再折返塔外围。'}},
  towers:{subtitle:'周三终章 · 灯亮后走到高楼脚下',sequence:'沿街接近高楼 → 人与楼底交代尺度 → 分别定住拍金茂、环球金融、上海中心 → 回到街面的人与楼，收尾离开。',next:'21:30前拍齐三栋楼的主镜头。之后步行到实际允许停靠的路段叫车，22:00前结束。',fixed:{next:'停录后换仰角，分别定住拍金茂层叠轮廓、环球金融顶部和上海中心扭转立面，各留10—15秒；最后回到人与楼底的一组完整动作收尾。'}}
 }},
 night1:{title:'北外滩 → 桥 → 外滩',summary:'17:00已到北外滩。全程步行约3 - 4公里，含取景与少量折返的预算。',stops:[['north','17:00 - 18:10'],['bridge','18:35 - 18:55'],['creek','18:55 - 19:25'],['origin','19:25 - 20:00'],['peace','20:00 - 20:40'],['customs','20:40 - 22:00']],links:[['整晚步行路线','北外滩滨江绿地小巨蛋','上海海关大楼',['外白渡桥','乍浦路桥','圆明园路','和平饭店']]]},
 night2:{title:'武康路 → 陆家嘴 → 滨江',summary:'两个片区各自步行，只有武康路→陆家嘴一次打车。跨区预留45 - 55分钟，为预算而非实时车程。',taxi:1,stops:[['wukang','17:00 - 17:25'],['court','17:25 - 17:45'],['towers','18:40 - 19:15'],['ring','19:15 - 20:00'],['pearl','20:00 - 20:35'],['museum','20:35 - 22:00']],links:[['武康路步行段','武康大楼','武康庭',[]],['陆家嘴步行段','花园石桥路与东泰路交叉口','浦东美术馆',['明珠环岛与陆家嘴环路交叉口','东方明珠广播电视塔']]]},
 one:{title:'武康路 → 苏州河 → 外滩',summary:'武康路短走后，一次打车进入苏州河。后半晚连续步行，东方明珠和三件套拍隔江远景；想近拍高楼就选择“两晚·第2晚”。',taxi:1,stops:[['wukang','17:00 - 17:25'],['court','17:25 - 17:40'],['creek','18:30 - 19:05'],['bridge','19:05 - 19:25'],['origin','19:25 - 20:00'],['peace','20:00 - 20:40'],['customs','20:40 - 22:00']],links:[['武康路步行段','武康大楼','武康庭',[]],['苏州河至外滩步行段','乍浦路桥','上海海关大楼',['外白渡桥','圆明园路','和平饭店']]]}
};
function make(tag,attrs={},text){const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;}
function link(text,url,cls=''){return make('a',{href:url,...(cls?{class:cls}:{}),target:'_blank',rel:'noopener'},text);}
function field(dl,label,value){dl.append(make('dt',{},label),make('dd',{},value));}
function render(planKey){
 window.CitywalkEntry?.updateLocalNotice(planKey);
 const plan=plans[planKey];document.querySelectorAll('[data-plan]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.plan===planKey)));
 document.getElementById('route-title').textContent=plan.title;document.getElementById('route-summary').textContent=plan.summary;
 const notes=document.getElementById('route-notes');notes.replaceChildren();notes.hidden=!plan.notes;plan.notes?.forEach(([title,text,label,url])=>{const p=make('p');p.append(make('strong',{},title+'：'),document.createTextNode(text));if(url)p.append(document.createTextNode(' '),link(label+' ↗',url));notes.append(p);});
 const whole=document.getElementById('whole-links');whole.replaceChildren();plan.links.forEach(([label,from,to,waypoints],i)=>whole.append(link(label+' ↗',maps.walk(from,to,waypoints),'action'+(i===0?' primary':''))));
 const list=document.getElementById('route-list'),cards=document.getElementById('spot-cards');list.replaceChildren();cards.replaceChildren();
 plan.stops.forEach(([id,time],i)=>{
  const s={...spots[id],...plan.overrides?.[id]},next=plan.stops[i+1],taxi=plan.taxi===i;
  const li=make('li'),num=make('span',{class:'route-num'},i+1),rt=make('div',{class:'route-text'}),jump=make('a',{href:'#spot-'+id},s.short);
  rt.append(jump,make('div',{class:'route-time'},time));
  if(next){const leg=make('div',{class:'leg'+(taxi?' taxi':'')});leg.append(make('div',{class:'leg-names'},maps.name(s.poi)+' → '+maps.name(spots[next[0]].poi)),link(taxi?'跨区打车进入下一片区 ↗':'步行去下一站 ↗',maps.walk(s.poi,spots[next[0]].poi,[],taxi?'driving':'walking')));rt.append(leg);}
  li.append(num,rt);list.append(li);
  const article=make('article',{class:'spot',id:'spot-'+id}),header=make('div',{class:'spot-header'});
  header.append(make('p',{class:'spot-kicker'},'第'+(i+1)+'站 · '+time),make('h3',{},s.name),make('p',{class:'spot-sub'},s.subtitle));
  header.append(make('a',{href:'#fixed-'+id,class:'fixed-jump'},'固定镜头任务 ↓'));article.append(header);
  if(s.image){
   const sizes={north:[3600,1800],bridge:[1080,721],creek:[3000,2000],peace:[6711,4474],wukang:[1080,1620],towers:[1500,2000],ring:[750,514],customs:[2736,1824]};
   const [width,height]=sizes[id];
   const fig=make('figure',{class:'photo'}),img=make('img',{src:s.image,width,height,alt:s.name+'实景构图参考',loading:i===0?'eager':'lazy',decoding:'async',referrerpolicy:'no-referrer'});
   img.addEventListener('error',()=>{img.remove();fig.prepend(make('p',{class:'photo-failure'},'原图暂时未加载。可点下方图片来源查看，站位与地图照常使用。'));},{once:true});
   const cap=make('figcaption');cap.append(document.createTextNode(s.caption+' '),link('图片来源：'+s.credit,s.source));if(s.license)cap.append(document.createTextNode(' · '),link(s.licenseLabel||'CC BY-SA 4.0',s.license));fig.append(img,cap);article.append(fig);
  }
  const body=make('div',{class:s.image?'spot-body':'mini-stop'});
  if(s.bearing){const bearing=make('div',{class:'bearing'}),text=make('div');text.append(make('small',{},'拍摄朝向'),make('strong',{},s.bearing));bearing.append(make('span',{class:'bearing-mark','aria-hidden':'true'},s.arrow),text);body.append(bearing);}
  const actions=make('div',{class:'actions'}),pin=s.pin?maps.pin(...s.pin,'和平饭店外滩平台参考站位'):maps.place(s.poi);
  actions.append(link(s.pin?'打开作者标注站位 ↗':'苹果地图 · 站位附近 ↗',pin,'action primary'));
  const onMap=make('button',{type:'button',class:'action'},'在总览中查看');onMap.addEventListener('click',()=>window.CitywalkOverview?.focus(id));actions.append(onMap);
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
  [['站哪儿',s.stand],['朝哪儿',s.face]].forEach(([a,b])=>{const dl=make('dl',{class:'field'});field(dl,a,b);body.append(dl);});
  const shot={...fixedShots[id],...s.fixed},fixed=make('section',{class:'fixed-shot',id:'fixed-'+id,'aria-labelledby':'fixed-title-'+id});
  fixed.append(make('h4',{id:'fixed-title-'+id},'固定机位 · 现场照着拍'),make('p',{class:'fixed-rule'},'先定住3—5秒 → 动作完整经过 → 再留5秒。这一条保持原构图。'));
  const steps=make('ol');
  [['摆画面',shot.frame],['等什么经过',shot.wait],['拍到这里再停',shot.end],['下一条怎么接',shot.next]].forEach(([label,text])=>{const li=make('li');li.append(make('strong',{},label),make('p',{},text));steps.append(li);});
  fixed.append(steps,make('p',{class:'fixed-fallback'},'没等到主角：'+shot.fallback));body.append(fixed);
  [['整组镜头顺序',s.sequence],['接着走',s.next]].forEach(([a,b])=>{const dl=make('dl',{class:'field'});field(dl,a,b);body.append(dl);});
  body.append(make('p',{class:'small'},s.note));
  if(s.positionSource){const p=make('p',{class:'source-detail'});p.append(link('查看机位区域的现场报道',s.positionSource));body.append(p);}
  if(!s.image)body.append(make('p',{class:'no-photo'},'沿途连接站：本卡提供走法与取景任务，没有用其他机位的照片代替实景。'));
  article.append(body);cards.append(article);
 });
 window.CitywalkOverview?.render(planKey,plan,spots,maps);
}
let selected='night1';try{const q=new URLSearchParams(location.search).get('plan');if(plans[q])selected=q;}catch{}
document.querySelectorAll('[data-plan]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.plan;render(selected);const url=new URL(location.href);url.searchParams.set('plan',selected);url.hash='';history.replaceState(null,'',url);}));
render(selected);
