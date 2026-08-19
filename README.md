# Blog Content

这是 Mizuki 博客的独立内容仓库，使用 TinaCMS 管理 Markdown 内容。

## 目录结构

```
posts/      博客文章
spec/       特殊页面（about、friends 等）
data/       TS 数据文件（TinaCMS 暂不管理，由代码仓库维护）
images/     博客图片（映射到 /images/）
overrides/  配置覆盖（可选）
```

## 本地编辑

```bash
pnpm install
pnpm dev
```

启动后打开 TinaCMS 本地后台（默认 `http://localhost:4001/admin/index.html`）进行编辑。
保存后文件会直接写入本仓库，提交并推送即可：

```bash
git add .
git commit -m "docs: update content"
git push
```

## 连接博客仓库

1. 把本仓库推送到 GitHub（例如 `https://github.com/<your-name>/blog-content.git`）。
2. 在博客仓库 `.env` 中设置：

   ```bash
   ENABLE_CONTENT_SYNC=true
   CONTENT_REPO_URL=https://github.com/<your-name>/blog-content.git
   CONTENT_DIR=./content
   ```

3. 博客构建时会通过 `pnpm sync-content` 拉取本仓库内容。
