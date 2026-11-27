// ============================================================
// Synergy：跨学科综合素质层
// 把各层的里程碑/进度做成配对联动，提供可见的全局倍率
// ============================================================

const SYNERGY_PAIRS = [
	{ id: "CH", name: "语史", a: "C", b: "His", desc: "阅读与史料互证" },
	{ id: "CP", name: "语政", a: "C", b: "Pol", desc: "阅读与时政表达" },
	{ id: "CE", name: "语英", a: "C", b: "Eng", desc: "语言能力互通" },
	{ id: "MP", name: "数理", a: "M", b: "P", desc: "数学工具与物理建模" },
	{ id: "MG", name: "数地", a: "M", b: "Geo", desc: "比例尺、坐标与统计" },
	{ id: "EG", name: "英地", a: "Eng", b: "Geo", desc: "区域资料与外文材料" },
	{ id: "HG", name: "史地", a: "His", b: "Geo", desc: "时空综合" },
	{ id: "PH", name: "政史", a: "Pol", b: "His", desc: "制度史与时政" },
	{ id: "PP", name: "体理", a: "PE", b: "P", desc: "运动数据与物理实验" },
	{ id: "PG", name: "体地", a: "PE", b: "Geo", desc: "户外训练与区域地理" },
	{ id: "ChP", name: "化理", a: "Chem", b: "P", desc: "实验观察与理化计算" },
	{ id: "ChM", name: "化数", a: "Chem", b: "M", desc: "化学计算与比例" },
];

function synergyLayerLevel(layer) {
	if (!player[layer] || !player[layer].milestones) return 0;
	return Math.min(5, player[layer].milestones.length);
}

function synergyPairLevel(pair) {
	return Math.min(5, Math.min(synergyLayerLevel(pair.a), synergyLayerLevel(pair.b)));
}

function synergyTotalLinkLevels() {
	let total = 0;
	for (let i = 0; i < SYNERGY_PAIRS.length; i++) total += synergyPairLevel(SYNERGY_PAIRS[i]);
	return total;
}

function synergyPairCountAtLeast(level) {
	let n = 0;
	for (let i = 0; i < SYNERGY_PAIRS.length; i++) if (synergyPairLevel(SYNERGY_PAIRS[i]) >= level) n++;
	return n;
}

function synergyMult() {
	if (!player.E || !player.E.bestPoints.gte(84)) return new OmegaNum(1);
	let mult = new OmegaNum(1);
	for (let i = 0; i < SYNERGY_PAIRS.length; i++) {
		mult = mult.add(synergyPairLevel(SYNERGY_PAIRS[i]) * 0.05);
	}
	if (hasUpgrade("Syn", 11)) mult = mult.add(0.1);
	if (hasUpgrade("Syn", 12)) mult = mult.add(0.2);
	if (hasUpgrade("Syn", 13)) mult = mult.add(0.3);
	if (hasUpgrade("Syn", 14)) mult = mult.add(0.5);
	if (hasMilestone("Syn", 0)) mult = mult.add(0.05);
	if (hasMilestone("Syn", 1)) mult = mult.add(0.1);
	if (hasMilestone("Syn", 2)) mult = mult.add(0.15);
	if (hasMilestone("Syn", 3)) mult = mult.add(0.2);
	if (hasMilestone("Syn", 4)) mult = mult.add(0.5);
	return mult;
}

function synergyRate() {
	let rate = new OmegaNum(0.02).mul(synergyTotalLinkLevels()).add(synergyPairCountAtLeast(1) * 0.05);
	if (hasMilestone("Syn", 0)) rate = rate.mul(1.05);
	return rate;
}

function synergyLayerName(layer) {
	let names = {
		C: "语文",
		M: "数学",
		Eng: "英语",
		P: "物理",
		Chem: "化学",
		PE: "体育",
		Pol: "政治",
		His: "历史",
		Geo: "地理",
	};
	return names[layer] || layer;
}

function synergyPairTableHTML() {
	let html = "<table style='width:min(680px,94%);margin:8px auto;border-collapse:collapse;color:white;font-size:13px'>";
	html += "<tr><td style='padding:5px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>联动</b></td>";
	html += "<td style='padding:5px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>配对</b></td>";
	html += "<td style='padding:5px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>等级</b></td>";
	html += "<td style='padding:5px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>加成</b></td></tr>";
	for (let i = 0; i < SYNERGY_PAIRS.length; i++) {
		let pair = SYNERGY_PAIRS[i];
		let level = synergyPairLevel(pair);
		html += "<tr>";
		html += "<td style='padding:5px;border:1px solid #555;background:#333;text-align:center'>" + pair.name + "</td>";
		html += "<td style='padding:5px;border:1px solid #555;background:#222;text-align:center'>" + synergyLayerName(pair.a) + " + " + synergyLayerName(pair.b) + "</td>";
		html += "<td style='padding:5px;border:1px solid #555;background:#222;text-align:center'>" + level + " / 5</td>";
		html += "<td style='padding:5px;border:1px solid #555;background:#222;text-align:center'>+" + (level * 5) + "%</td>";
		html += "</tr>";
	}
	html += "</table>";
	return html;
}

addLayer("Syn", {
	startData() {
		return {
			unlocked: true,
			points: new OmegaNum(0),
			total: new OmegaNum(0),
			best: new OmegaNum(0),
		};
	},

	color: "#FFD700",
	resource: "综合素质",
	row: "side",
	position: 0,
	symbol: "Syn",
	type: "none",
	name: "Synergy",

	layerShown() {
		return player.E.bestPoints.gte(84);
	},
	tooltip() {
		return "综合素质：跨学科联动";
	},
	tooltipLocked() {
		return "综合素质<br>最佳中考分数达到 84 分后解锁";
	},

	update(diff) {
		if (!player.Syn || !player.E.bestPoints.gte(84)) return;
		let gain = synergyRate().mul(diff);
		player.Syn.points = player.Syn.points.add(gain);
	},

	clickables: {
		100: {
			display() {
				return "进行综合评定<br>获得 " + subjectNumber(synergyRate().mul(10).max(1)) + " 综合素质";
			},
			canClick() {
				return true;
			},
			onClick() {
				let gain = synergyRate().mul(10).max(1);
				player.Syn.points = player.Syn.points.add(gain);
				updateTemp();
			},
			style: {
				width: "320px",
				height: "100px",
				"background-color": "#FFD700",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "17px",
			},
			tooltip() {
				return "根据当前跨学科联动等级获得综合素质";
			},
		},
	},

	upgrades: {
		11: {
			title: "跨学科整合 I",
			description: "跨学科联动倍率 +10%。",
			cost: new OmegaNum(10),
			currencyDisplayName: "综合素质",
			style: {
				width: "220px",
				height: "150px",
				"background-color": "#4A3A00",
				color: "white",
				"border-color": "#FFD700",
				"border-radius": "8px",
				"font-size": "14px",
			},
			effectDisplay() {
				return "+10%";
			},
		},
		12: {
			title: "跨学科整合 II",
			description: "跨学科联动倍率 +20%。",
			cost: new OmegaNum(50),
			currencyDisplayName: "综合素质",
			style: {
				width: "220px",
				height: "150px",
				"background-color": "#4A3A00",
				color: "white",
				"border-color": "#FFD700",
				"border-radius": "8px",
				"font-size": "14px",
			},
			effectDisplay() {
				return "+20%";
			},
		},
		13: {
			title: "联合教研",
			description: "跨学科联动倍率 +30%。",
			cost: new OmegaNum(200),
			currencyDisplayName: "综合素质",
			style: {
				width: "220px",
				height: "150px",
				"background-color": "#4A3A00",
				color: "white",
				"border-color": "#FFD700",
				"border-radius": "8px",
				"font-size": "14px",
			},
			effectDisplay() {
				return "+30%";
			},
		},
		14: {
			title: "全面发展",
			description: "跨学科联动倍率 +50%。",
			cost: new OmegaNum(1000),
			currencyDisplayName: "综合素质",
			style: {
				width: "220px",
				height: "150px",
				"background-color": "#4A3A00",
				color: "white",
				"border-color": "#FFD700",
				"border-radius": "8px",
				"font-size": "14px",
			},
			effectDisplay() {
				return "+50%";
			},
		},
	},

	milestones: {
		0: {
			requirementDescription: "任意 2 对联动达到 1 级",
			effectDescription: "跨学科倍率 +5%，综合素质产出 +5%。",
			done() { return synergyPairCountAtLeast(1) >= 2; },
		},
		1: {
			requirementDescription: "5 对联动达到 2 级",
			effectDescription: "跨学科倍率 +10%。",
			done() { return synergyPairCountAtLeast(2) >= 5; },
			unlocked() { return hasMilestone("Syn", 0); },
		},
		2: {
			requirementDescription: "8 对联动达到 3 级",
			effectDescription: "跨学科倍率 +15%。",
			done() { return synergyPairCountAtLeast(3) >= 8; },
			unlocked() { return hasMilestone("Syn", 1); },
		},
		3: {
			requirementDescription: "全部 12 对联动达到 3 级",
			effectDescription: "跨学科倍率 +20%。",
			done() { return synergyPairCountAtLeast(3) >= 12; },
			unlocked() { return hasMilestone("Syn", 2); },
		},
		4: {
			requirementDescription: "综合素质达到 1,000",
			effectDescription: "跨学科倍率 +50%。",
			done() { return player.Syn.points.gte(1000); },
			unlocked() { return hasMilestone("Syn", 3); },
		},
	},

	tabFormat: {
		Main: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#FFD700" },
			content: [
				["display-text", function () {
					return "当前综合素质：<h2 style='color:#FFD700'>" + subjectNumber(player.Syn.points) + "</h2>";
				}],
				["display-text", function () {
					return synergyPairTableHTML();
				}],
				["display-text", function () {
					return "当前跨学科倍率：x" + format(synergyMult()) + " · 综合素质产出：" + format(synergyRate()) + "/秒";
				}],
				["clickable", 100],
				["display-text", "联动等级由双方层级的里程碑数量决定；两科都推进，联动才会升级。12 组联动覆盖全部学科。"],
			],
		},
		"奖励": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#FFD700" },
			content: [
				["display-text", function () {
					return "<h2 style='color:#FFD700'>综合奖励</h2><br>消耗综合素质购买永久跨学科倍率。当前：" + subjectNumber(player.Syn.points);
				}],
				"upgrades",
			],
		},
		"里程碑": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#FFD700" },
			content: ["milestones"],
		},
	},
});

// A 层联动成就
function synA(id, name, done, tooltip) {
	layers.A.achievements[id] = {
		name: name,
		done: done,
		onComplete() { player.A.Goals = player.A.Goals.add(1); },
		tooltip: tooltip,
	};
}

function synPair(id) {
	for (let i = 0; i < SYNERGY_PAIRS.length; i++) if (SYNERGY_PAIRS[i].id === id) return SYNERGY_PAIRS[i];
	return null;
}

synA(140, "语史联动", function () { return synergyPairLevel(synPair("CH")) >= 3; }, "语史联动达到 3 级。");
synA(141, "数理联动", function () { return synergyPairLevel(synPair("MP")) >= 3; }, "数理联动达到 3 级。");
synA(142, "史地联动", function () { return synergyPairLevel(synPair("HG")) >= 3; }, "史地联动达到 3 级。");
synA(143, "全面联动", function () { return synergyPairCountAtLeast(2) >= 12; }, "全部 12 对联动达到 2 级。");
synA(144, "综合大师", function () { return synergyMult().gte(2); }, "跨学科倍率达到 x2。");
synA(153, "化理联动", function () { return synergyPairLevel(synPair("ChP")) >= 3; }, "化理联动达到 3 级。");

layers.A.tabFormat["综合素质"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#FFD700'>综合素质成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [["achievement", 140], ["achievement", 141], ["achievement", 142]]],
		["row", [["achievement", 143], ["achievement", 144], ["achievement", 153]]],
		"blank",
		["display-text", function () {
			return "当前跨学科倍率：x" + format(synergyMult()) + " · 联动总等级：" + synergyTotalLinkLevels();
		}],
	],
	buttonStyle: { "border-color": "#FFD700", "background-color": "#3A2A00" },
};
