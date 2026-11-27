# 天津中考树：Physics & PE

《天津中考树》的 Physics & PE 更新。游戏以天津中考为背景，用增量/模组树的方式重走初中三年：语文、英语、数学理论、中考分数、经验、自动化与排行榜层层嵌套。

## v0.2.0 Physics & PE

- **P = Physics（物理）**，与 M（Math）无关，中考最佳分数达到 256 后解锁。
- 新增 Physics 层：物理能力、力学/热学/光学/电学/实验评分，以及 30 秒物理量计算训练。
- 新增独立的 **体育层**：中考 256 分解锁，复现身体数据表和 30 秒反应速度训练。
- 体育 Minigame I：30 道整数计算题，答对 +3、答错 -1，结束后提升体育能力与反应速度。
- 新增 Physics & PE 成就页签，并修复成就页报错。
- 上一版 P=Phigros/Rebirth 的原型已移至 `Old Things/rebirth-prototype.js`，不再加载。

更完整的截图对照、规则说明和测试方法见 [PHYSICS.md](PHYSICS.md)。

## 原始引擎

This project is built on The Modding Tree, an incremental game engine based on The Prestige Tree.

[Look here for a tutorial on getting started with modding with TMT](docs/tutorials/getting-started.md)

You can look in the [documentation](docs/!general-info.md) for more information on how it all works, or look at the code in layers.js to see what it all looks like.
