# 天津中考树：P / PE / Pol

《天津中考树》的 P / PE / Pol 更新。游戏以天津中考为背景，用增量/模组树的方式重走初中三年：语文、英语、数学理论、中考分数、经验、自动化与排行榜层层嵌套。

## v0.3.0 Pol

- 新增政治层「Pol / 道德与法治」，中考最佳分数 84 后解锁。
- Pol 位于 C / M / Eng 同排，是第四门主科；与 P（Physics）互相独立。
- Main 显示政治能力和道德修养 / 法治意识 / 国情认知 / 时政敏感度 / 答题规范五项评分。
- 新增背诵专区：消耗政治能力，永久提高对应评分。
- 新增 Minigame I「时政速答」：30 秒政治选择题，答对 +3、答错 -1。
- 新增 Pol 成就页签，并将政治评分接入全科知识获取。

## v0.2.0 P & PE

- **P = Physics（物理）**，与 M（Math）无关，中考最佳分数达到 256 后解锁。
- 新增 P 层：物理能力、力学/热学/光学/电学/实验评分，以及 30 秒物理量计算训练。
- 新增独立的 **PE 层**：中考 256 分解锁，复现身体数据表和 30 秒反应速度训练。
- PE Minigame I：30 道整数计算题，答对 +3、答错 -1，结束后提升体育能力与反应速度。
- 新增 P & PE 成就页签，并修复成就页报错。
- 上一版 P=Phigros/Rebirth 的原型已移至 `Old Things/rebirth-prototype.js`，不再加载。

更完整的截图对照、规则说明和测试方法见 [PHYSICS.md](PHYSICS.md)、[POLITICS.md](POLITICS.md)。

## 原始引擎

This project is built on The Modding Tree, an incremental game engine based on The Prestige Tree.

[Look here for a tutorial on getting started with modding with TMT](docs/tutorials/getting-started.md)

You can look in the [documentation](docs/!general-info.md) for more information on how it all works, or look at the code in layers.js to see what it all looks like.
