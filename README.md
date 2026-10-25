# 上海夜景 Citywalk 手机图文路书

静态手机网页：两晚、一晚方案；每个主机位有实景参考、公共步道站位、朝向、拍摄顺序、苹果地图定位和逐段步行导航。

地图总览随方案切换：编号与卡片顺序一致；点编号看实景、简要站位、完整卡片和苹果地图导航。片区按钮用于放大密集点位。每张卡片也可返回地图定位本机位。

全部12个站点都提供固定机位任务：摆画面、等什么经过、动作拍到哪里结束、下一条怎么接，并给出没等到人车船时的替代拍法。卡片标题下“固定镜头任务”可直接跳到四步说明。固定段与下一条走拍分开，原有实景、站位、导航与整组拍摄顺序保留。构图与等待目标是现场拍摄建议，不保证特定人车船出现。

## 地图资料

- 底图与地标路网来自 [OpenStreetMap](https://www.openstreetmap.org/copyright)，ODbL 1.0；地图代码使用 Leaflet 1.9.4，许可见 `vendor/LEAFLET-LICENSE`。
- 机位坐标是地标附近定位；和平饭店采用参考照片作者公开坐标。东泰路/花园石桥路路口由两条OSM道路的共同端点确定。公开OSM对象链接保存在 `map-data.js`，具体站位以卡片为准。
- 绿色连线来自 [FOSSGIS / OSRM](https://routing.openstreetmap.de/about.html) 的 foot 路网规划。橙色虚线仅表示跨片区打车，不是驾车道路轨迹。总览路线不是苹果地图导出的轨迹；现场通行和具体导航以实际指引为准。
- 仅一次性查询少量公共地标与步行段，串行并缓存，频率低于每秒一次。页面没有在线地名搜索、地理编码或动态路径规划服务。遵循 [Nominatim政策](https://operations.osmfoundation.org/policies/nominatim/)、[OSM瓦片政策](https://operations.osmfoundation.org/policies/tiles/) 与 [FOSSGIS政策](https://routing.openstreetmap.de/about.html)。底图由浏览器按当前可见区域加载，不预下载、不提供离线地图。

## 使用

直接打开 GitHub Pages。可用 `?plan=night1`、`?plan=night2`、`?plan=one` 选择方案。网站不收集位置、登录或行程数据。

本地 `file:` 入口会跳转到 GitHub Pages，保留有效的方案与机位锚点；浏览器若拦截跳转，则显示在线入口并停止本地底图请求。OSM 网页瓦片要求有效 HTTP Referer，本地文件无法提供。HTTP/HTTPS 访问不重定向；地图失败时保留编号、路线和苹果地图入口，并显示底图不可用提示，不伪造来源或改写浏览器隐私设置。

## 图片与资料

- 图片以原始来源网址加载；除另行标注的开放许可外，图片权利归原作者。不将外部参考照片纳入本仓库。
- 和平饭店参考照片：N509FZ，2019-11-13，[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Peace_Hotel_Shanghai_(20191113200111).jpg)，[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)，原图不修改。作者公开站位坐标与约305°朝向。文件说明不等于当天通行边界。
- 海关与浦发银行同框：Hermann Luyken，2014-11-15，[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2014.11.15.192034_HSBC_Building_Customs_House_Bund_night_Shanghai.jpg)，[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)。仅作南侧朝西北的构图参考，现有导航点仍是海关附近平台。
- 北外滩、乍浦路桥：文汇网，范家乐，《2022年，上海，我记录下的50个瞬间》。
- 外白渡桥：上观号，绿色上海，2023-08-02。
- 武康大楼：凤凰网转载，来源南风窗，2023-10-16。
- 三件套地面实景：Trip.com Shanghai Tower visiting guide；公共机位区域依据东方网转载澎湃新闻2024-09-30现场报道。照片未公开精确落脚点。
- 明珠环：文汇网，袁婧摄，2021-07-01。

站位建议不是实地勘景或精确复拍保证；参考照片的灯色、天气、布置及通行状态不作现状保证。所有行程时间为上海当地时间。
