# Rainbow Bridge 部署指南（Vercel）

## 步骤 1：准备 Git 仓库

1. 初始化 Git（如果还没有）：
```bash
git init
git add .
git commit -m "Initial commit: Rainbow Bridge MVP"
```

2. 推送到 GitHub：
   - 在 GitHub 创建一个新仓库（比如叫 `rainbow-bridge`）
   - 按照 GitHub 的提示推送代码：
```bash
git remote add origin https://github.com/你的用户名/rainbow-bridge.git
git branch -M main
git push -u origin main
```

## 步骤 2：部署到 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 **"Add New Project"**
4. 选择你刚才推送的 `rainbow-bridge` 仓库
5. 点击 **"Import"**

## 步骤 3：配置环境变量

在 Vercel 的项目设置页面：
1. 进入 **Settings** → **Environment Variables**
2. 添加以下三个变量：
   - `OPENAI_API_KEY` = `sk-bn8wSkTwHyzNxxD3XFg7gOndaqELsBkXFGeXLpgtG6Bk1zJg`
   - `OPENAI_BASE_URL` = `https://api.moonshot.cn/v1`
   - `OPENAI_MODEL` = `moonshot-v1-8k`

## 步骤 4：部署

点击 **"Deploy"**，等待 1-2 分钟。

完成后，你会得到一个类似 `https://rainbow-bridge-xxx.vercel.app` 的网址。

---

## 注意事项

- **API Key 安全**：环境变量不会暴露在前端代码中，是安全的。
- **自定义域名**：如果你有自己的域名，可以在 Vercel 设置里绑定。
- **更新代码**：以后只需要 `git push`，Vercel 会自动重新部署。

## 常见问题

**Q: 部署后 API 调用失败？**
A: 检查 Vercel 的环境变量是否正确设置。

**Q: 如何查看日志？**
A: Vercel 项目页面 → **Deployments** → 点击最新的部署 → **Functions** 标签页。
