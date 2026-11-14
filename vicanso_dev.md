# vicanso.dev 个人开发者作品站设计文档

> **设计对标**：[sindresorhus.com/apps](https://sindresorhus.com/apps)  
> **核心定位**：极速、原生、零臃肿的 Rust 软件与基础设施独立作品集（Indie Craft Studio）  
> **目标域名**：`https://vicanso.dev`（托管于 Cloudflare Pages，强制 HTTPS）

---

## 1. 设计理念与核心对标（Design Philosophy）

`sindresorhus.com/apps` 之所以成为全球独立开发者的标杆，核心在于它**去除了“个人简历感”，做足了“软件商店级的产品感”**。结合你深耕 **Rust + GPUI + 高性能网络** 的技术标签，本站确立以下四项核心设计原则：

1. **产品优先，零废话叙事（Product-First）**
   不放冗长的个人生平与技能进度条，首屏直入主题，让应用图标、实机截图、终端输出和简洁的一句话定位成为绝对主角。
2. **克制统一的视觉徽章（Unified Metrics）**
   摒弃传统 README 中花哨且加载缓慢的 `img.shields.io` 彩色贴片，改为构建时/边缘缓存拉取 GitHub API，统一使用等宽字体渲染精致的 `★ Stars` 计数、最新版本号（如 `v0.8.2`）与平台标签（`macOS` / `Linux` / `Windows` / `Crate`）。
3. **分层级的卡片密度（Tiered Hierarchy）**
   借鉴 Sindre 对原生 App 与开源工具的区分策略：
   - **原生 GUI 应用（`zedis`、`CyberAPI`、`zniff`）**：采用高视觉权重卡片，突出精致的应用图标（macOS Squircle 圆角规范）、高清暗色窗口截图与直接下载入口。
   - **基础设施、库与 CLI 工具（`Pingap`、`charts-rs`、`diving-rs`、`httpstat`）**：采用高信息密度技术卡片，搭配 SVG 实时渲染预览或伪终端（Pseudo-terminal）高亮输出。
4. **双语自适应与极速加载（Zero-Bloat & i18n）**
   默认提供 `EN / 中文` 一键无缝切换（海外开发者传播与国内技术圈展示兼顾），全站纯静态构建，首屏 JS 负载控制在 `15KB` 以内，Lighthouse 性能满分。

---

## 2. 站点信息架构与路由规划（Information Architecture）

参考 `sindresorhus.com` 的扁平化目录结构，采用**“单页全景矩阵 + 独立产品落地页”**双层架构：

```text
vicanso.dev/
├── /                       # 首页：极简 Hero + 交互式分类过滤 + 全作品矩阵（主入口）
├── /zedis                  # 产品详情页：应用大图、核心特性、自动识别系统下载按钮、安装命令
├── /cyberapi               # 产品详情页：GPUI 性能亮点、界面预览、Release 直链
├── /zniff                  # 产品详情页：抓包调试演示、NSH 架构说明、下载与使用指南
├── /pingap                 # 产品详情页（或跳转独立文档站 pingap.vicanso.dev）
└── /open-source            # （可选）自动聚合 GitHub 其余长尾开源仓库列表
```

### 交互式分类过滤器（Filter Pills）
在作品列表顶部提供无刷新即时过滤标签（支持 URL Hash 定位，如 `vicanso.dev/#desktop`）：
- **All (7)**：展示全部精选作品
- **Desktop Apps (3)**：`zedis`、`CyberAPI`、`zniff`
- **Infrastructure (1)**：`Pingap`
- **CLI & Libraries (3)**：`charts-rs`、`diving-rs`、`httpstat`

---

## 3. 视觉设计规范（Visual Design System）

### 3.1 色彩体系（支持系统自动跟随 + 手动切换，默认推荐深色模式）
针对 GPUI 暗色界面与终端工具的展示效果，采用高对比度深灰基底（避免纯黑 `#000000` 带来的刺眼感，对齐 Linear / Zed 质感）：

| 语义角色 | Dark Mode（默认推荐） | Light Mode（清爽亮色，对齐 Sindre） | 说明 |
| :--- | :--- | :--- | :--- |
| **页面背景 `bg-canvas`** | `#0B0D10` | `#FAFAFA` | 全局底层画布 |
| **卡片背景 `bg-surface`** | `#13161C` | `#FFFFFF` | 作品卡片默认填充 |
| **卡片悬停 `bg-hover`** | `#191D26` | `#F4F6F8` | Hover 微提亮反馈 |
| **边框线条 `border-subtle`** | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.07)` | `1px` 极细边框 |
| **主文本 `text-primary`** | `#F3F4F6` | `#111827` | 标题与核心数据 |
| **次要文本 `text-secondary`** | `#9CA3AF` | `#4B5563` | 项目简介描述 |
| **弱化文本 `text-muted`** | `#6B7280` | `#9CA3AF` | 版本号、平台角标 |
| **品牌强调色 `accent`** | `#F97316`（Rust 琥珀橙） / `#38BDF8` | `#EA580C` / `#0284C7` | 选中态、核心高亮指标 |

### 3.2 字体排印（Typography）
- **无衬线主字体（UI & 正文）**：`Inter`, `-apple-system`, `BlinkMacSystemFont`, `"PingFang SC"`, `sans-serif`
- **等宽代码字体（数据、命令、徽章）**：`"JetBrains Mono"`, `"Geist Mono"`, `ui-monospace`, `monospace`
- **字号层级**：
  - Hero 主标题：`32px` / `font-semibold` / `tracking-tight`
  - 卡片应用名：`20px` / `font-semibold`
  - 一句话简介：`14.5px` / `leading-relaxed`
  - 徽章与统计数字：`12.5px`（启用 `font-variant-numeric: tabular-nums` 等宽数字对齐）

### 3.3 圆角与阴影规范
- **App 图标容器**：`64px × 64px`，圆角 `15px`（模拟 macOS 连续曲率超椭圆 Squircle），附带内发光描边 `inset 0 1px 0 rgba(255,255,255,0.15)`。
- **作品大卡片**：圆角 `16px`，过渡动画 `transition: transform 180ms ease, border-color 180ms ease`，悬停时轻微上浮 `-2px` 并点亮边框。

---

## 4. 页面模块与组件详细拆解（Page Layout & Wireframe）

页面最大宽度设定为 `1120px`，左右留白自适应，整体结构自上而下分为 4 个区块：

```text
+-------------------------------------------------------------------------+
| [Logo/Avatar] vicanso                     [Apps] [GitHub] [EN/中] [🌙]  |  <- 1. 极简顶栏
+-------------------------------------------------------------------------+
| Hi, I'm Vicanso.                                                        |  <- 2. 紧凑型 Hero
| Crafting ultra-fast native apps & network infrastructure in Rust.       |
| [ ★ Total 10k+ GitHub Stars ]  [ ⚡ 100% Written in Rust ]               |
+-------------------------------------------------------------------------+
| Filter: (● All 7)  ( Desktop GUI 3 )  ( Infra & Proxy 1 )  ( CLI/Lib 3 )|  <- 3. 胶囊筛选器
+-------------------------------------------------------------------------+
|  +-----------------------------------+ +------------------------------+ |  <- 4A. 原生 GUI 展区
|  | [Icon] zedis            ★ 1.2k ↗  | | [Icon] CyberAPI     ★ 600+ ↗ | |     （双列大图卡片）
|  | Ultra-fast Redis GUI in GPUI      | | Lightweight HTTP API Client  | |
|  | [macOS] [Linux] [Windows]         | | [macOS] [Linux] [Windows]    | |
|  | +-------------------------------+ | | +--------------------------+ | |
|  | |   高清实机暗色界面窗口预览图    | | | | 高清实机暗色界面窗口预览  | | |
|  | +-------------------------------+ | | +--------------------------+ | |
|  | [ ⬇ Download ]   [ GitHub ]       | | [ ⬇ Download ]  [ GitHub ]   | |
|  +-----------------------------------+ +------------------------------+ |
|  +--------------------------------------------------------------------+ |
|  | [Icon] zniff  Lightweight HTTP(S) debugging proxy     [macOS/NSH]  | |     （横向特色卡片）
|  | [ 实时抓包请求瀑布流高清截图 ]               [ ⬇ Download ] [GitHub]| |
|  +--------------------------------------------------------------------+ |
+-------------------------------------------------------------------------+
|  +--------------------------------------------------------------------+ |  <- 4B. 旗舰网关横幅
|  | [Logo] Pingap  Nginx-like reverse proxy built on Pingora   ★ 3.5k+ | |
|  | Zero-downtime reload · Let's Encrypt · Web UI · Low memory         | |
|  | $ docker run -d ... (一键复制)              [ Docs ]  [ GitHub ↗ ] | |
|  +--------------------------------------------------------------------+ |
|  +-----------------------------------+ +------------------------------+ |  <- 4C. 库与 CLI 展区
|  | charts-rs                 ★ 800+  | | diving-rs            ★ 500+  | |
|  | 22 种纯 Rust 图表库，JSON 秒出 SVG | | 免 Docker 极速容器镜像层分析  | |
|  | [Tab: K线 | 桑基图 | 雷达图 预览]  | | [ 终端 TUI 层级扫描高亮预览 ] | |
|  +-----------------------------------+ +------------------------------+ |
|  +--------------------------------------------------------------------+ |
|  | httpstat  支持 HTTP/1/2/3 与 gRPC 的请求全阶段耗时剖析与压测工具     | |
|  | [ DNSLookup: 4ms | TCP: 11ms | TLS: 23ms | Server: 35ms (彩色条) ] | |
|  +--------------------------------------------------------------------+ |
+-------------------------------------------------------------------------+
| © 2026 Vicanso · Hosted on Cloudflare Pages · Built with Astro          |  <- 5. 页脚
+-------------------------------------------------------------------------+
```

### 核心组件交互细节

1. **原生应用卡片（App Card — 对标 Sindre `/apps` 核心体验）**
   - **上半部**：左侧 `64×64` 应用高清图标，右侧应用名 + 右上角实时 Star 数胶囊（点击跳 GitHub Stargazers）+ 两行以内精炼卖点 + 系统平台标签（`macOS` `Windows` `Linux` `GPUI`）。
   - **中部视觉窗**：固定比例容器（建议宽高比 $16:10$），展示真实应用窗口截图，底部做轻微渐变遮罩融入卡片背景。
   - **底部操作栏**：主按钮 **Download**（跳转 `/zedis` 详情页或直接拉起 GitHub Release 最新安装包），次按钮 **Source**（跳转 GitHub 仓库）。

2. **`charts-rs` 专属交互微组件（差异化亮点）**
   - 不使用死板的静态截图，直接在卡片内嵌 `4` 个轻量切换标签：`Candlestick (K线)`、`Sankey (桑基)`、`Heatmap (热力)`、`Radar (雷达)`。
   - 点击标签直接切换由 `charts-rs` 预先生成的原生内联 `<svg>`（零运行时开销、矢量无限清晰），鼠标悬停可点击 `View JSON` 查看仅需十几行 JSON 即可生成的配置源码。

3. **CLI 工具的一键复制安装条（Quick Install Snippet）**
   - 在 `diving-rs`、`httpstat`、`Pingap` 卡片底部提供极客最爱的单行安装/运行命令框（如 `cargo install http-stat-rs` 或 `brew install ...`），右侧带复制图标，点击后变为绿色对勾 `Copied!`。

---

## 5. 七大作品标准化内容与素材清单（Content & Asset Mapping）

以下文案已针对开发者传播进行了润色与勘误（如修正 `GPUI` 拼写），可直接作为站点数据源 `projects.json` 使用：

### 5.1 原生桌面应用组（Native GUI Apps）

| 项目 ID | 名称 | 仓库路径 | 标签 | 中文精炼定位 | 英文精炼定位 | 所需视觉素材 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `zedis` | **Zedis** | `vicanso/zedis` | `GPUI` `Redis` `macOS/Win/Linux` | 基于 Rust 与 GPUI 构建的极速原生 Redis 图形客户端，低内存占用、秒级启动。 | Blazingly fast, native Redis GUI client built with Rust and GPUI. | 应用图标 `512px` PNG + 键值浏览/树状视图实机截图 ($1600 \times 1000$) |
| `cyberapi` | **CyberAPI** | `vicanso/cyberapi` | `GPUI` `HTTP Client` `Native` | 基于 GPUI 打造的轻量级原生 HTTP API 调试客户端，告别 Electron 臃肿，更小更快。 | Lightweight, ultra-fast native HTTP API client powered by Rust & GPUI. | 应用图标 `512px` PNG + 接口请求与响应高亮界面截图 ($1600 \times 1000$) |
| `zniff` | **Zniff** | `vicanso/zniff` | `NSH` `Proxy` `HTTP(S)` | 基于 NSH 编写的轻量级 HTTP(S) 抓包与流量调试代理工具，简洁直观。 | Lightweight HTTP(S) traffic sniffer and debugging proxy built on NSH. | 应用图标 `512px` PNG + HTTPS 抓包列表与详情面板截图 |

### 5.2 基础设施、库与 CLI 工具组（Infra, Crates & CLI）

| 项目 ID | 名称 | 仓库路径 | 标签 | 中文精炼定位 | 英文精炼定位 | 展示形式建议 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `pingap` | **Pingap** | `vicanso/pingap` | `Pingora` `Reverse Proxy` `Gateway` | 基于 Cloudflare Pingora 开发的类 Nginx 高性能反向代理，支持热重载、自动证书与可视化配置。 | High-performance Nginx-like reverse proxy built on Pingora with hot-reload & Web UI. | Web 管理后台截图或极简流量转发架构 SVG + Docker 启动命令 |
| `charts-rs` | **charts-rs** | `vicanso/charts-rs` | `Crate` `SVG/PNG/AVIF` `22 Charts` | 纯 Rust 图表渲染库，通过简单 JSON 配置极速生成 22 种图表，支持 SVG、PNG、WebP 与 AVIF 输出。 | Pure Rust chart library generating 22 chart types (SVG/PNG/WebP/AVIF) from simple JSON. | 内置 4 张由 `charts-rs` 生成的原生 SVG 实时切换预览 |
| `diving-rs` | **diving-rs** | `vicanso/diving-rs` | `Container` `TUI / Web / MCP` `Security` | 免 Docker Client 直接从 Registry 拉取并逐层分析镜像，检测空间浪费、重复文件与密钥泄漏，支持 TUI/Web/MCP 与 AI 报告。 | Daemonless container image analyzer with layer inspection, secret scanning, TUI, Web & MCP. | 终端 TUI 分层体积与浪费率检查视图截图（或 ANSI 渲染块） |
| `httpstat` | **httpstat** | `vicanso/http-stat-rs` | `CLI` `HTTP/1/2/3` `gRPC` `Benchmark` | 精准统计请求各阶段（DNS、TCP、TLS、服务端处理、传输）耗时，全面支持 HTTP/1/2/3 与 gRPC，内置基准压测模式。 | Visualizes HTTP/1/2/3 & gRPC request timing phases (DNS, TCP, TLS, TTFB) with benchmark mode. | 彩色伪终端代码块（还原真实 CLI 阶段耗时阶梯图） |

---

## 6. 单品详情页模板规范（以 `/zedis` 为例，对标 Sindre 单品页）

当用户点击 `zedis`、`CyberAPI` 或 `zniff` 卡片时，进入干净的独立介绍页 `vicanso.dev/zedis`（方便在社交媒体、V2EX、 Hacker News 或 Reddit 直接分享单品链接）：

1. **顶部产品头图区**：居中或左对齐展示 `96×96` 高清应用图标、应用名称、最新版本号徽章（自动读取 GitHub Latest Release Tag）。
2. **智能下载主按钮（Smart Download CTA）**：
   - 前端通过轻量 `navigator.userAgentData` 自动识别访客操作系统：
   - macOS 用户主按钮显示：`Download for macOS (Apple Silicon / Intel .dmg)`
   - Windows 用户显示：`Download for Windows (.msi / .exe)`
   - 下方紧跟一行终端安装方式：`brew install --cask ...` 或 `cargo install ...`。
3. **高清画廊（Screenshot Carousel）**：展示 $1 \sim 3$ 张无损 WebP/AVIF 界面实机图。
4. **核心特性网格（3 列简短要点）**：例如 *Native GPUI Rendering*、* Minimal Memory Footprint*、*Cross-Platform*。
5. **底部反馈链路**：`Report an Issue`（跳 GitHub Issues）与 `Release Notes`（跳 GitHub Releases）。

---

## 7. 技术栈选型与自动化免维护架构（Tech Stack & Automation）

为了让你写完网站后**以后发新版本完全不用手动改网页代码**，采用构建期 + 边缘缓存自动同步方案：

- **核心框架**：**Astro 5.x + Tailwind CSS v4**
  - 理由：零默认客户端 JS，组件语法清爽，原生支持 Markdown 内容集合（Content Collections），构建产物是极致干净的纯静态 HTML/CSS。
- **部署托管**：**Cloudflare Pages**（直接绑定 `vicanso.dev`）
  - 免费无限流量，自动签发 `.dev` 必需的边缘 HTTPS 证书，全球 Anycast CDN 加速。
- **GitHub Stars 与最新安装包免维护同步（两种可选机制）**：
  1. **Cloudflare Pages Functions 边缘缓存（最推荐）**：编写一个 `30` 行的轻量接口 `/api/stats`，请求 GitHub REST API 批量拉取你这 7 个仓库的 `stargazers_count` 与 `releases/latest` 下载直链，并在 Cloudflare Cache API 中设置 `s-maxage=3600`（缓存 1 小时）。页面静态秒开，同时 Star 数和最新安装包永远自动保持最新，且绝不会触发 GitHub API 限流。
  2. **定时静态构建**：在 GitHub Actions 中配一个每日 Cron 触发 Cloudflare Deploy Hook，纯静态注入构建时拉取到的 Star 数据。
- **图片优化**：所有 GPUI 实机截图统一使用 Astro `<Image />` 组件在构建期自动转为 `AVIF` / `WebP` 格式，兼顾 Retina 视网膜屏清晰度与毫秒级加载。

---

## 8. 项目推荐目录结构与落地路线（Implementation Plan）

可直接按以下目录初始化仓库（如 `github.com/vicanso/vicanso.dev`），甚至可以直接将本文档保存为仓库根目录的 `DESIGN.md`，让 AI CLI 按规范生成全部代码：

```text
vicanso.dev/
├── public/
│   ├── icons/                  # 存放 zedis.png, cyberapi.png, zniff.png 等高清图标
│   └── charts/                 # 存放 charts-rs 生成的 4 张演示 SVG
├── src/
│   ├── data/
│   │   └── projects.ts         # 7 个项目的结构化元数据（中英文简介、标签、安装命令）
│   ├── assets/
│   │   └── screenshots/        # 存放应用实机高清原图（由 Astro 自动压缩转 AVIF）
│   ├── components/
│   │   ├── Header.astro        # 顶栏（含语言切换与主题切换）
│   │   ├── FilterBar.astro     # 分类筛选胶囊
│   │   ├── AppCard.astro       # 对标 Sindre 的原生 GUI 大卡片
│   │   ├── ToolCard.astro      # CLI 与基础设施卡片（含命令一键复制）
│   │   ├── ChartsPreview.astro # charts-rs 的 SVG 标签切换微组件
│   │   └── TerminalMock.astro  # httpstat / diving-rs 彩色终端输出组件
│   ├── layouts/
│   │   └── BaseLayout.astro    # SEO、OpenGraph 社交分享卡片、字体与暗色主题注入
│   └── pages/
│       ├── index.astro         # 作品集主站首页
│       └── [slug].astro        # 动态生成 /zedis, /cyberapi, /zniff 等单品落地页
├── functions/
│   └── api/
│       └── github-stats.ts     # Cloudflare Pages Function 缓存拉取实时 Stars 与 Release
├── astro.config.mjs
├── package.json
└── DESIGN.md                   # 本设计文档
```

### 三步上线 Checklist
1. **准备视觉素材（约 20 分钟）**：在 macOS 深色模式下分别为 `zedis`、`CyberAPI`、`zniff` 截取同尺寸（如 $1440 \times 900$）的高清窗口图；用 `charts-rs` 导出 4 张不同类型 SVG；截取一段 `httpstat` 跑 HTTP/3 的终端输出数据。
2. **脚手架生成（约 15 分钟）**：新建空目录，放入本 `DESIGN.md`，使用 `Carbon` 或 `Orchestrator (Carbon)` 直接初始化 Astro + Tailwind 项目并生成全套响应式页面与中英双语数据。
3. **部署绑定（约 5 分钟）**：推送至 GitHub，在 Cloudflare 控制台 `Workers & Pages` 关联该仓库，构建命令填 `npm run build`、输出目录填 `dist`，一键绑定自定义域名 `vicanso.dev` 即可正式上线。