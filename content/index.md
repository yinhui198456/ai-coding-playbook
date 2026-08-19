---
title: AI Coding 成长手册
description: 把真实项目中的判断、失误和验证结果，转化为一眼能看懂、下次能执行的 AI Coding 经验。
tags:
  - AI-Coding
  - 成长看板
---

# 本阶段 AI Coding 成长

> [!tip] 一句话
> 已经从“让 AI 尽快写代码”进步到“先确认业务、限制 Agent 权限、再用真实页面验收”；当前最需要练习的是：复杂需求不要过早进入 Coding。

## 我的变化

| 能力       | 状态 | 人话解释                                          |
| ---------- | :--: | ------------------------------------------------- |
| 想清楚需求 |  ↑   | 开始知道 Issue 很详细，不代表用户操作流程已经确定 |
| 指挥 AI    |  ↑   | 开始划分规划、开发、审查角色，并坚持一个写入者    |
| 看懂技术   |  ↑   | 开始理解整批失败、重复提交和同时修改的问题        |
| 验收       |  ↑↑  | 已经不再只相信“Agent 说完成”或“测试通过”          |

## 本阶段最重要的 3 张经验卡

1. [[AC-001-user-flow-first|AC-001 · 复杂功能先画用户流程，再让 AI 写代码]]
2. [[AC-002-test-vs-real-use|AC-002 · 代码写出来、测试通过、用户能用，是三件事]]
3. [[AC-003-stop-patching|AC-003 · 同类问题第二次出现，就停止逐个打补丁]]

## 下一次我要刻意练什么

> **中等以上需求先不 Coding，先完成一张用户流程确认图。**

下一个中等复杂 Issue：

1. 画出角色、起点、用户动作、系统结果和失败恢复；
2. 标出所有尚未决定的问题；
3. 确认业务和关键页面后，才允许 Agent 开发；
4. 使用同一张图指导真实页面验收。

### 怎么判断有没有学会

- Coding 后没有再修改核心业务规则；
- 没有因为 AI 自己选择默认值而返工；
- 第一次真实页面验证就能走完主流程。

## 浏览知识库

- [[learning/index|学习区]]：外部经验 → 手写复核 → 项目验证的转化管道，学习才是目的。
- [[foundations/index|基础概念]]：术语、流程、规范的人话版扫盲笔记，先打地基。
- [[experience/index|经验卡]]：真实问题如何变成下次可执行的方法。
- [[cases/index|案例追踪]]：一个 Issue 从提出到验收的完整现场。
- [[retrospectives/2026-08-16-tcp-phase-review|阶段复盘]]：本批经验来自哪些真实事件。
- [[capability-map/index|能力地图]]：目前增强了什么、还欠缺什么。
- [[methodology/index|个人方法论]]：只有多次验证有效的经验才会进入。
- [[sop/index|SOP 与检查表]]：暂不提前建设，等待方法稳定。
- [[interview/index|面试案例库]]：只保存有真实项目证据的回答素材。

<script>(function(){if(window.__kbwBoot)return;window.__kbwBoot=1;var b=(document.body&&document.body.dataset.basepath)||"";var s=document.createElement("script");s.src=b+"/static/kb-write.js";s.onerror=function(){var t=document.createElement("script");t.src="/static/kb-write.js";document.body.appendChild(t)};document.body.appendChild(s)})()</script>
