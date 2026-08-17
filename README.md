# AI Coding Playbook

个人 AI Coding 成长知识库。真实经验保存在 `content/` 的 Markdown 中，Quartz 负责生成展示网站。

## 本地使用

```powershell
npm ci
npx quartz build --serve
```

浏览器访问 `http://localhost:8080`。

只构建静态网站：

```powershell
npx quartz build
```

生成结果位于 `public/`，该目录不提交到 Git。

## 内容规则

- 首页和经验卡先图后文字；
- 详细技术原理放在折叠说明中；
- 不保存当前提交编号、临时环境状态或凭据；
- 经验经过重复验证后，才晋升为方法论、SOP 或 Skill；
- AI 只负责起草、整理和找证据；✍️ 手写区只能由本人填写，手写区为空的页面永远停在「📝 AI 草稿」状态；
- 外部资料只存路标（链接+用途），不复制正文；外部说法与项目证据冲突时以真实证据为准。

## Quartz

本站基于 [Quartz](https://github.com/jackyzha0/quartz) v5。官方源保留为只读 `upstream`，用于后续升级。
