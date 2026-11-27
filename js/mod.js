let modInfo = {
	name: "天津中考树",
	id: "Ignotus",
	author: "Lixiaohan as a student from Tianjin Zili High School,Class3,Grade9",
	pointsName: "学分",
	modFiles: ["layers.js", "subjects.js", "politics.js", "history_geo.js", "milestones.js", "achievements_extra.js", "synergy.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new OmegaNum (10), // Used for hard resets and new players
	offlineLimit: 1.7e308,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "Beta v0.10.0.20230902",
	name: "Physics",
}

let changelog = `
中考树v0.10.0.20230902：Physics<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 重新加入物理层（P），与体育层并列放在中考层（E）下方。<br>
- 恢复物理训练、物理题库、五项评分和物理里程碑。<br>
- 恢复物理与地理、综合素质的联动：数理、体理重新生效。<br>
- 物理 / 体育成就页重新合并，新增物理启程、物理最佳、物理五项和双科成就。<br>
- 旧存档会自动补齐物理层数据，物理页签恢复可用。<br>
- 表格主题继续适用于新的物理层。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.9.0.20230826：Table<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 参考 The-Modding-Table 的表格视觉，重做全局 UI 风格。<br>
- 新增 css/table-theme.css：深色平面、等宽字体、直角边框、细滚动条。<br>
- 树节点改为表格单元格样式，主科与侧栏都使用直角块。<br>
- 标签页改为表头式按钮，并高亮当前页签。<br>
- 成就、购买项、升级、里程碑、弹窗和提示框统一为平面表格风格。<br>
- 保留原有树形结构、配色语义和所有交互逻辑。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.8.0.20230819：PE Focus<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 删除物理层（P），树上的物理训练与物理里程碑不再出现。<br>
- 体育层移到中考层（E）正下方，作为唯一的训练挑战层。<br>
- 语文 / 数学 / 英语 / 历史 / 地理 / 政治全部放在第一排。<br>
- 地理联动改为数学理论；综合素质联动用「数英」「体政」替换「数理」「体理」。<br>
- 物理 / 体育成就页改为体育成就页，原 5 个成就全部改为体育目标。<br>
- 旧存档会自动清理物理层数据，体育层与成就数据保留。<br>
- 旧版本记录中的物理层内容仅作历史保留。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.7.1.20230812：Clarity<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 统一学科称呼：树节点使用 H / G 等短标记，中文界面使用历史 / 地理 / 政治 / 体育 / 综合素质，英文全名只用于层名和代码。<br>
- 层提示、说明框、成就名、里程碑描述、考试交卷、分数标题和成就页签全部同步。<br>
- 修正“文史贯通”等与联动对象不符的文本，统一为“政史贯通”。<br>
- “中考最佳分数”和“最佳中考分数”统一写法；训练计时改为中文。<br>
- 内部层 ID 与存档字段保持不变，旧存档可以继续读取。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.7.0.20230805：Synergy<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 新增综合素质层：把各层里程碑做成 10 组跨学科联动。<br>
- 联动包括语史、语政、语英、数理、数地、英地、史地、政史、体理、体地。<br>
- 每一对联动等级由双方层的里程碑数量决定，提供全科知识倍率。<br>
- 综合素质层可产出综合素质，购买跨学科整合、联合教研、全面发展等永久奖励。<br>
- 综合素质层有 5 个联动里程碑和 5 个联动成就。<br>
- 成就页新增综合素质页签。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.6.0.20230728：Achievements<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 为数学 / 计数法 / 自动化 / 经验 / 排行榜 / 语文 / 中考 / 英语的里程碑增加对应成就。<br>
- 新增全局里程碑收集成就：10 / 30 / 50 个里程碑。<br>
- 新增「成就达人」「成就狂人」等成就自身成就。<br>
- 成就页新增数学 / 策略 / 自动化、经验 / 排行榜、语文 / 中考 / 英语、全局里程碑四个页签。<br>
- 所有新成就都会增加 A 层 Goals，并与现有 A 层里程碑联动。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.5.0.20230725：Milestones<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 为语文 / 中考 / 英语增加后期里程碑。<br>
- 为数学 / 计数法 / 成就 / 自动化 / 经验 / 排行榜增加里程碑。<br>
- 为物理 / 体育 / 政治 / 历史 / 地理增加训练里程碑。<br>
- 所有新增里程碑统一提供全科知识倍率，并在对应层级显示。<br>
- 物理 / 体育 / 政治 / 历史 / 地理新增里程碑页签；数学 / 计数法 / 成就 / 自动化也补上里程碑页。<br>
- 里程碑解锁时会弹出提示，效果会即时生效。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.4.0.20230720：历史 / 地理<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 新增历史层：最佳中考分数 103 后解锁，与政治 / 语文联动。<br>
- 新增地理层：最佳中考分数 119 后解锁，与物理 / 数学联动。<br>
- 历史 / 地理各有 Main、背诵专区和 Minigame I 速答。<br>
- 历史训练会给政治增加时政敏感度；地理训练会给物理增加实验评分。<br>
- 历史与地理互相提供全科倍率加成，史地不分家。<br>
- 考试板块新增历史 / 地理试卷：单项选择题、材料解析题、综合题，题型参考天津中考。<br>
- 历史 / 地理考试分数会计入中考总分，未完成两科不能查分。<br>
- 新增历史 / 地理成就和成就页签。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.3.0.20230715：政治 / 物理 / 体育<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- 新增政治层（道德与法治）：最佳中考分数达到 84 分后解锁。<br>
- 政治位于语文 / 数学 / 英语同排，是第四门主科；与物理互相独立。<br>
- Main 显示政治能力与道德修养 / 法治意识 / 国情认知 / 时政敏感度 / 答题规范五项评分。<br>
- 新增背诵专区：消耗政治能力背诵知识点，永久提升对应评分。<br>
- 新增 Minigame I「时政速答」：30 秒政治选择题，答对 +3、答错 -1。<br>
- 新增政治相关成就与成就页签。<br>
- 政治五项评分总和会提高全科知识获取。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
中考树v0.2.0.20230712：Physics & PE<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
- <b>物理层（P）确定为 Physics，与数学层（M）无关。</b><br>
- 数学层占位页签由 Phigros 改名 Math，明确它是数学层、不是物理层。<br>
- 物理层在最佳中考分数达到 256 分后解锁，位于中考层下方。<br>
- 新增物理的 Main / Minigame I：30 秒物理量计算训练，答对 +3 分、答错 -1 分。<br>
- 物理训练提升力学、热学、光学、电学、实验评分，并提高全科知识获取。<br>
- 新增独立的体育层（最佳中考 256 分解锁）：Main 显示身体数据与五项评分，Minigame I 为 30 秒反应速度训练。<br>
- 体育训练使用 30 道小学三四年级整数计算题，答对 +3 分、答错 -1 分，结束后提升体育能力与反应速度。<br>
- 修复打开成就页时报错的问题，并新增物理 / 体育成就页签。<br>
- 修复中文姓名/中文训练记录在存档后变成乱码的问题；旧格式存档仍可读取。<br>
- 保留之前的修复：第五个 Uncommon 写作手法需要第 5 次挖掘；作文超时会自动交卷。<br>
- 上一版把物理层误当成 Phigros/Rebirth 的原型已移至 Old Things，不再参与游戏。<br>
<br>
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>
特殊成就12获得方法：将你的游戏内名字改成作者的名字，并且完成一次考试！与此同时，神奇的事情将会发生哦
<br><br>
中考树v0.0.5.20230101<br>
=-=-=作者团队=-=-=<br>
作者#1<br>
Ignotus（目前本qq账号号主）<br>
别名：Fading Huanmao、TGl4aWFvaGFu、怀特轻易的去世了......<br>
身高：10101000cm<br>
体重：101011kg<br>
年龄：1111岁<br>
性别：与Hikari相反（不要再质疑了！！！<br>
身份：天津市自立中学9年级1.8e308班学生，班内历史最高排名1/50，最新排名38/50，年级历史最高排名6/761，最新排名574/761<br>
还是物理、化学课代表，副学习委员一枚~<br>
是中考树的项目主催<br><br>
作者#2<br>
bilibili_萌子叶（非号主<br>
别名：不知道呢....<br>
身高：10101011cm<br>
体重：110111kg<br>
年龄：10000岁<br>
性别：与Tairitsu相同(真的哦，视频里面露过声音)<br>
身份：浙江人，9年级学生，剩下的不知道了...<br>
估计成绩不错呢~<br>
中考树项目合作人，mc忠诚玩家&&皮肤、地图设计！为中考树提供过很多游戏机制意见（包括实装的和将要实装的<br><br>
=-=-=End=-=-=<br>
祝大家新年快乐哦，另外期待中考树七个隐藏成就全部被破解的那一刻！


`
		

let winText = `恭喜你！你完成了物理与体育的双科训练挑战！<br>物理、体育和中考终于不再是互相拖后腿的科目。<br>感谢你陪作者做完这个迟到了很久的版本。<br>作者：Lixiaohan From Tianjin Zili High School(Grade9,Class3)`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new OmegaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("C",11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new OmegaNum(0)

	let gain = new OmegaNum(10)
	if(hasUpgrade("C",12)) gain = gain.mul(upgradeEffect("C",12))
	if(hasUpgrade("C",13)) gain = gain.mul(upgradeEffect("C",13))
	if(hasUpgrade("C",15)) gain = gain.mul(upgradeEffect("C",15))
	if(hasMilestone("E",1)) gain = gain.mul(player.E.bestPoints)
	if(hasMilestone("E",1)) gain = gain.mul(tmp.Exp.effect)
	if(getBuyableAmount("Exp",11).gte(1)||hasUpgrade("C",41)) gain = gain.mul(buyableEffect("Exp",11))
	if(player.C.totalGold.gte(1)) gain = gain.mul(tmp.C.effectGold1)
	if(player.Eng.totalpp.gte(1)) gain = gain.mul(tmp.Eng.ppEffect)
	if(player.C.total3.gte(1)) gain = gain.mul(tmp.C.effect3)
	if(player.C.total4.gte(1)) gain = gain.mul(tmp.C.effect4)
	if(player.Eng.points.gte(1)) gain = gain.mul(new OmegaNum(10).pow(player.Eng.points).min(1e10))
if(hasUpgrade("Eng",17)) gain = gain.mul(upgradeEffect("Eng",17))
if(hasUpgrade("Eng",27)) gain = gain.mul(upgradeEffect("Eng",27))
if(hasUpgrade("Eng",37)) gain = gain.mul(upgradeEffect("Eng",37))
if(hasUpgrade("Eng",47)) gain = gain.mul(upgradeEffect("Eng",47))
if(hasUpgrade("Eng",57)) gain = gain.mul(upgradeEffect("Eng",57))
if(hasUpgrade("Eng",67)) gain = gain.mul(upgradeEffect("Eng",67))
if(hasUpgrade("Eng",77)) gain = gain.mul(upgradeEffect("Eng",77))
if(hasUpgrade("Eng",87)) gain = gain.mul(upgradeEffect("Eng",87))
if (player.P && player.P.unlocked && tmp.P && tmp.P.effect) gain = gain.mul(tmp.P.effect)
if (player.PE && player.PE.unlocked && tmp.PE && tmp.PE.effect) gain = gain.mul(tmp.PE.effect)
if (player.Pol && player.Pol.unlocked && tmp.Pol && tmp.Pol.effect) gain = gain.mul(tmp.Pol.effect)
if (player.His && player.His.unlocked && tmp.His && tmp.His.effect) gain = gain.mul(tmp.His.effect)
if (player.Geo && player.Geo.unlocked && tmp.Geo && tmp.Geo.effect) gain = gain.mul(tmp.Geo.effect)
if (typeof milestonePointMult === "function") gain = gain.mul(milestonePointMult())
if (typeof synergyMult === "function") gain = gain.mul(synergyMult())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page


// Determines when the game "ends"
function isEndgame() {
	return !!(
		player.P && player.PE &&
		player.P.bestScore && player.PE.bestScore &&
		player.P.bestScore.gte(80) && player.PE.bestScore.gte(80) &&
		player.P.trainingRuns.gte(5) && player.PE.trainingRuns.gte(5)
	)
}

function calculateDay() {
	let time = Date.now()
	time = time - zeroTime
	time = time/perDay
	return time
}
const zeroTime = 1196352000000 // 2007/11/26 00:00:00
const perDay = 31536000000 // milliseconds per year

function formatDay() {
	let time = calculateDay()
	return "本游戏作者 现在已经"+time+"岁了"
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	// 旧版物理层数据可能缺失或被旧版本清理；现在统一补齐。
	if (player.P && player.P.partnerLevels) player.P = getStartLayerData("P");
	if (player.PE && player.PE.partnerLevels) player.PE = getStartLayerData("PE");
	if (!player.P) player.P = getStartLayerData("P");
	if (!player.PE) player.PE = getStartLayerData("PE");
	// 旧存档可能没有新的训练字段；fixData 通常已补齐，这里只兜底。
	if (player.P.trainingRuns === undefined) player.P.trainingRuns = new OmegaNum(0);
	if (player.PE.trainingRuns === undefined) player.PE.trainingRuns = new OmegaNum(0);
}
var displayThings = [
	function() {
		if (player.P && player.PE && player.P.bestScore && player.PE.bestScore &&
			player.P.bestScore.gte(80) && player.PE.bestScore.gte(80)) {
			return "当前残局：物理与体育训练的双科最佳都达到 80 分";
		}
		if (player.E.bestPoints.gte(256)) return "当前残局：完成物理 / 体育的训练挑战";
		if (player.E.bestPoints.gte(119)) return "当前残局：历史 / 地理已解锁，继续冲击 256 分以解锁物理与体育";
		if (player.E.bestPoints.gte(103)) return "当前残局：历史已解锁，继续冲击 119 分以解锁地理";
		if (player.E.bestPoints.gte(84)) return "当前残局：政治已解锁，继续冲击 103 分以解锁历史";
		return "当前残局：84 分解锁政治；103 分解锁历史；119 分解锁地理；256 分解锁物理与体育";
	},
	function() {
		if (player.E.bestPoints.gte(256)) {
			return "物理能力：" + subjectNumber(player.P.points) + " · 体育能力：" + subjectNumber(player.PE.points);
		}
	},
	function() {
		if (player.E.bestPoints.gte(84) && player.Pol) {
			return "政治能力：" + subjectNumber(player.Pol.points) + " · 政治最佳训练：" + subjectNumber(player.Pol.bestScore) + " 分";
		}
	},
	function() {
		if (player.E.bestPoints.gte(119) && player.His && player.Geo) {
			return "历史知识：" + subjectNumber(player.His.points) + " · 地理知识：" + subjectNumber(player.Geo.points) + " · 史地最佳：" + subjectNumber(player.His.bestScore) + " / " + subjectNumber(player.Geo.bestScore);
		}
		if (player.E.bestPoints.gte(103) && player.His) {
			return "历史知识：" + subjectNumber(player.His.points) + " · 历史最佳训练：" + subjectNumber(player.His.bestScore) + " 分";
		}
	},
	"*目前游戏处于Beta版本，如遇到bug或者平衡问题可联系qq2119542935*",
	function(){return formatDay()},
	function() {if((player.points.gte(1444))&&(player.points.lt(8000))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1444"))) + "个葡萄糖分子。"},
	    function() {if((player.points.gte("8000"))&&(player.points.lt("64000"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("8000"))) + "个碳-60分子。"},
	    function() {if((player.points.gte("64000"))&&(player.points.lt("1e9"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("64000"))) + "个DNA。"},
	    function() {if((player.points.gte("1e9"))&&(player.points.lt("8e9"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1e9"))) + "个乙肝病毒。"},
	    function() {if((player.points.gte("8e9"))&&(player.points.lt("1.25e12"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("8e9"))) + "个新冠病毒。"},
	    function() {if((player.points.gte("1.25e12"))&&(player.points.lt("1.72e15"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.25e12"))) + "个大肠杆菌。"},
	    function() {if((player.points.gte("1.72e15"))&&(player.points.lt("3.5e20"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.72e15"))) + "个红细胞。"},
	    function() {if((player.points.gte("3.5e20"))&&(player.points.lt("1e21"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("3.5e20"))) + "个卵细胞。"},
	    function() {if((player.points.gte("1e21"))&&(player.points.lt("1e24"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1e21"))) + "个盐粒。"},
	    function() {if((player.points.gte("1e24"))&&(player.points.lt("1.2e26"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1e24"))) + "个米粒。"},
	    function() {if((player.points.gte("1.2e26"))&&(player.points.lt("1e30"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.2e26"))) + "个1元硬币。"},
	    function() {if((player.points.gte("1e30"))&&(player.points.lt("1.25e35"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1e30"))) + "个篮球。"},
	    function() {if((player.points.gte("1.25e35"))&&(player.points.lt("1e39"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.25e35"))) + "个作者。(按照作者体重43kg,密度1000kg/m^3计算)"},
	    function() {if((player.points.gte("1e39"))&&(player.points.lt("8e42"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1e39"))) + "架标准航天飞机。"},
	    function() {if((player.points.gte("8e42"))&&(player.points.lt("1.6e47"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("8e42"))) + "个埃菲尔铁塔。"},
	    function() {if((player.points.gte("1.6e47"))&&(player.points.lt("1.28e48"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.6e47"))) + "个珠穆朗玛峰。"},
	    function() {if((player.points.gte("1.28e48"))&&(player.points.lt("1.28e51"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.28e48"))) + "个标准中子星。"},
	    function() {if((player.points.gte("1.28e51"))&&(player.points.lt("1.16e53"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.28e51"))) + "个土卫九。"},
	    function() {if((player.points.gte("1.16e53"))&&(player.points.lt("2.19e54"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.16e53"))) + "个谷神星（最大的小行星）。"},
	    function() {if((player.points.gte("2.19e54"))&&(player.points.lt("6.64e54"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("2.19e54"))) + "个冥王星（矮行星）。"},
	    function() {if((player.points.gte("6.64e54"))&&(player.points.lt("3.5e56"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("6.64e54"))) + "个月球。"},
	    function() {if((player.points.gte("3.5e56"))&&(player.points.lt("4.93e59"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("3.5e56"))) + "个地球。"},
	    function() {if((player.points.gte("4.93e59"))&&(player.points.lt("1.61e60"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("4.93e59"))) + "个木星。"},
	    function() {if((player.points.gte("1.61e60"))&&(player.points.lt("5.52e62"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.61e60"))) + "个比邻星。"},
	    function() {if((player.points.gte("1.61e60"))&&(player.points.lt("2.71e63"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("5.52e62"))) + "个太阳。"},
	    function() {if((player.points.gte("2.71e63"))&&(player.points.lt("9.36e66"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("2.71e63"))) + "个天狼星。"},
	    function() {if((player.points.gte("9.36e66"))&&(player.points.lt("1.02e70"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("9.36e66"))) + "个牧夫座alpha。"},
	    function() {if((player.points.gte("1.02e70"))&&(player.points.lt("8.51e71"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.02e70"))) + "个海山二A。"},
	    function() {if((player.points.gte("8.51e71"))&&(player.points.lt("1.5e78"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("8.51e71"))) + "个猎户座alpha。"},
	    function() {if((player.points.gte("1.5e78"))&&(player.points.lt("2.6e84"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.5e78"))) + "个超大质量黑洞。"},
	    function() {if((player.points.gte("2.6e84"))&&(player.points.lt("8.77e86"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("2.6e84"))) + "个奥尔特云。"},
	    function() {if((player.points.gte("8.77e86"))&&(player.points.lt("8.77e89"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("8.77e86"))) + "个猎户座悬臂。"},
	    function() {if((player.points.gte("8.77e89"))&&(player.points.lt("6.49e94"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("8.77e89"))) + "个银河系。"},
	    function() {if((player.points.gte("6.49e94"))&&(player.points.lt("1.75e100"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("6.49e94"))) + "个IC 1101（已知最大星系）。"},
	    function() {if((player.points.gte("1.75e100"))&&(player.points.lt("3.38e103"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.75e100"))) + "个本超星系团。"},
	    function() {if((player.points.gte("3.38e103"))&&(player.points.lt("1.05e109"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("3.38e103"))) + "个史隆长城。"},
	    function() {if((player.points.gte("1.05e109"))&&(player.points.add(1).log10().lt(120))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new OmegaNum("1.05e109"))) + "个可观测宇宙。"},
	    function() {if((player.points.add(1).log10().gte(120))&&(player.points.add(1).log10().lt(240))) return "如果你每秒写2个数字，不用科学计数法写下你的学分数目需要"+format(player.points.add(1).log10().div(2)) + "秒，在此期间，作者已经完成了"+format(player.points.add(1).log10().div(2).div(60).mul(32))+"次仰卧起坐。"},
	    function() {if((player.points.add(1).log10().gte(240))&&(player.points.add(1).log10().lt(494))) return "如果你每秒写2个数字，不用科学计数法写下你的学分数目需要"+format(player.points.add(1).log10().div(2).div(60)) + "分钟，在此期间，作者已经完成了800m跑的"+format(player.points.add(1).log10().div(2).div(60).div(3.75).mul(100))+"%。"},
	    function() {if((player.points.add(1).log10().gte(494))&&(player.points.add(1).log10().lt(14400))) return "如果你每秒写2个数字，不用科学计数法写下你的学分数目需要"+format(player.points.add(1).log10().div(2).div(60)) + "分钟。<br>在此期间，物化合场中考已经完成了"+format(player.points.add(1).log10().div(2).div(60).div(120).mul(100))+"%。"},
	function() {if((player.points.add(1).log10().gte(14400))&&(player.points.add(1).log10().lt(518400))) return "如果你每秒写2个数字，不用科学计数法写下你的学分数目需要"+format(player.points.add(1).log10().div(2).div(3600)) + "小时。<br>在此期间，所有学科中考已经完成了"+format(player.points.add(1).log10().div(2).div(3600).div(72).mul(100))+"%。"},
	
]