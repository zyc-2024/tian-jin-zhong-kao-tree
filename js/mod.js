let modInfo = {
	name: "天津中考树",
	id: "Ignotus",
	author: "Lixiaohan as a student from Tianjin Zili High School,Class3,Grade9",
	pointsName: "学分",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new OmegaNum (10), // Used for hard resets and new players
	offlineLimit: 1.7e308,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "Beta v0.0.5.20230101",
	name: "新年特辑",
}

let changelog = `
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
		

let winText = `恭喜你！你取得了该版本的毕业成绩！新年快乐！<br>作者到达该版本毕业成绩的时间为2222年，你的成绩超越作者了吗？<br>作者：Lixiaohan From Tianjin Zili High School(Grade9,Class3)`

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
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page


// Determines when the game "ends"
function isEndgame() {
	return player.E.bestPoints.gte(200)&&player.Eng.power.gte("1e1444")&&new OmegaNum(player.Eng.upgrades.length).gte(56)&&player.C.points.gte("1e60000")
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
}
var displayThings = [
	"当前残局:中考最佳分数达到119分",
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