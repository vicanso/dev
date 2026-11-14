import githubStats from './github-stats.json';

export type ProjectCategory = 'desktop' | 'infra' | 'cli';

export interface BilingualText {
  en: string;
  zh: string;
}

export interface FeatureItem {
  title: BilingualText;
  description: BilingualText;
}

export interface ProjectMeta {
  id: string;
  name: string;
  repo: string;
  category: ProjectCategory;
  featuredWide?: boolean;
  icon?: string;
  website?: string;
  platforms: string[];
  tagline: BilingualText;
  summary: BilingualText;
  installCmd?: string;
  installLabel?: BilingualText;
  features: FeatureItem[];
}

export interface RepoStats {
  repo: string;
  stars: number;
  latestTag: string | null;
  downloads: {
    macosArm?: string;
    macosIntel?: string;
    windows?: string;
    linux?: string;
  };
}

export const PROJECTS: ProjectMeta[] = [
  {
    id: 'zedis',
    name: 'Zedis',
    repo: 'vicanso/zedis',
    category: 'desktop',
    icon: '/icons/zedis.png',
    website: 'https://zedis.net/',
    platforms: ['macOS', 'Linux', 'Windows', 'GPUI'],
    tagline: {
      en: 'Blazingly fast, native Redis GUI client built with Rust and GPUI.',
      zh: '基于 Rust 与 GPUI 构建的极速原生 Redis 图形客户端，低内存占用、秒级启动。',
    },
    summary: {
      en: 'A native desktop Redis client crafted in Rust with GPUI. Features instant key tree browsing, memory analyzer, live metrics, Geo map, Vector Set inspection, and a keyboard-first command palette.',
      zh: '使用 Rust 与 GPUI 打造的原生 Redis 桌面客户端。支持树状键值浏览、内存分析器、实时监控指标、地理位置地图、Vector Set 检视与键盘优先的命令面板。',
    },
    installCmd: 'brew install --cask zedis',
    installLabel: { en: 'Homebrew Cask', zh: 'Homebrew 安装' },
    features: [
      {
        title: { en: 'Native GPUI Rendering', zh: '原生 GPUI 渲染' },
        description: {
          en: 'Hardware-accelerated 120fps UI with minimal RAM footprint and instant cold startup.',
          zh: 'GPU 硬件加速 120fps 流畅渲染，极低内存占用，告别 Electron 臃肿与卡顿。',
        },
      },
      {
        title: { en: 'Deep Data Inspection', zh: '全类型深度检视' },
        description: {
          en: 'Built-in Memory Analyzer, Live Metrics, Geo Map, Vector Set, and Protobuf/JSON formatters.',
          zh: '内置内存分析、实时指标监控、Geo 地图、Vector Set 检视及多种数据格式自动解码。',
        },
      },
      {
        title: { en: 'Keyboard-First Workflow', zh: '键盘优先交互' },
        description: {
          en: 'Command palette, split editors, and fast key filtering across millions of keys.',
          zh: '全局命令面板与毫秒级 Key 树状过滤，面对百万级键值依然游刃有余。',
        },
      },
    ],
  },
  {
    id: 'cyberapi',
    name: 'CyberAPI',
    repo: 'vicanso/cyberapi',
    category: 'desktop',
    icon: '/icons/cyberapi.png',
    website: 'https://cyberapi.vicanso.dev/',
    platforms: ['macOS', 'Linux', 'Windows', 'GPUI'],
    tagline: {
      en: 'Lightweight, ultra-fast native HTTP API client powered by Rust & GPUI.',
      zh: '基于 GPUI 打造的轻量级原生 HTTP API 调试客户端，告别 Electron 臃肿，更小更快。',
    },
    summary: {
      en: 'A fast, local-first HTTP API workspace built with Rust and GPUI. Includes request collections, environment variables, cURL import, and a companion CLI runner.',
      zh: '基于 Rust 与 GPUI 构建的本地优先 HTTP API 调试工作台。支持接口集合管理、环境变量、cURL 导入以及配套的 CLI 命令行运行器。',
    },
    features: [
      {
        title: { en: 'Tiny & Instant', zh: '极致轻量与秒开' },
        description: {
          en: 'Starts in milliseconds with a fraction of the memory used by web-based API clients.',
          zh: '毫秒级启动速度，内存占用仅为传统 Electron API 客户端的零头。',
        },
      },
      {
        title: { en: 'Clean Request Workspace', zh: '纯净调试工作区' },
        description: {
          en: 'Syntax-highlighted JSON/HTML/XML payloads, headers, auth presets, and response timing.',
          zh: '支持 JSON/HTML/XML 语法高亮、环境变量模板、鉴权预设与请求耗时分解。',
        },
      },
      {
        title: { en: 'Companion CLI', zh: '配套 CLI 运行器' },
        description: {
          en: 'Run saved API requests and automated assertions directly in CI pipelines via cyberapi-cli.',
          zh: '提供 cyberapi-cli，可直接在终端或 CI 流水线中复用工作区集合执行接口测试。',
        },
      },
    ],
  },
  {
    id: 'zniff',
    name: 'Zniff',
    repo: 'vicanso/zniff',
    category: 'desktop',
    featuredWide: true,
    icon: '/icons/zniff.png',
    platforms: ['macOS', 'Linux', 'Windows', 'NSH'],
    tagline: {
      en: 'Lightweight HTTP(S) traffic sniffer and debugging proxy built on NSH.',
      zh: '基于 NSH 编写的轻量级 HTTP(S) 抓包与流量调试代理工具，简洁直观。',
    },
    summary: {
      en: 'A crisp native HTTP(S) MITM debugging proxy powered by NSH. Inspect live traffic tables, decode JSON/GraphQL/Protobuf/Hex payloads, diff baselines, intercept breakpoints, and integrate with MCP AI workflows.',
      zh: '基于 NSH 构建的原生 HTTP(S) 抓包与调试代理工具。支持双栏实时流量表、JSON/GraphQL/Protobuf/Hex 解码、基线对比、断点拦截与 MCP AI 集成。',
    },
    features: [
      {
        title: { en: 'Full-Protocol Decoding', zh: '多协议深度解码' },
        description: {
          en: 'Inspect HTTP/HTTPS traffic with built-in JSON, GraphQL, Protobuf, and Hex viewers.',
          zh: '原生支持 HTTPS 解密抓包，内置 JSON、GraphQL、Protobuf 与十六进制视图。',
        },
      },
      {
        title: { en: 'Breakpoints & Baseline Diff', zh: '断点拦截与基线对比' },
        description: {
          en: 'Pause and mutate requests/responses on the fly, or diff responses against saved baselines.',
          zh: '支持请求/响应断点拦截修改、过滤规则弹窗以及接口响应基线 Diff 对比。',
        },
      },
      {
        title: { en: 'Mobile QR & MCP Ready', zh: '移动端扫码与 MCP 集成' },
        description: {
          en: 'One-click QR certificate setup for mobile devices and native MCP support for AI debugging.',
          zh: '支持手机扫码一键安装根证书，并内置 MCP 接口便于 AI 辅助排查网络问题。',
        },
      },
    ],
  },
  {
    id: 'pingap',
    name: 'Pingap',
    repo: 'vicanso/pingap',
    category: 'infra',
    website: 'https://pingap.io/',
    platforms: ['Pingora', 'Reverse Proxy', 'Docker', 'Web UI'],
    tagline: {
      en: 'High-performance Nginx-like reverse proxy built on Cloudflare Pingora with hot-reload & Web UI.',
      zh: '基于 Cloudflare Pingora 开发的类 Nginx 高性能反向代理，支持零停机热重载、Let’s Encrypt 自动证书与 Web UI。',
    },
    summary: {
      en: 'Built on Cloudflare’s battle-tested Pingora framework in Rust. Pingap delivers memory-safe, multi-threaded HTTP/1/2/3 proxying, zero-downtime config reloads, ACME TLS automation, OpenTelemetry metrics, and a built-in Web admin UI.',
      zh: '基于 Cloudflare 开源的 Pingora 框架构建。提供内存安全的多线程反向代理、零停机热重载、Let’s Encrypt 自动签发与续期、Prometheus/OTel 可观测性以及开箱即用的 Web 管理后台。',
    },
    installCmd: 'docker run -d --name pingap -p 80:80 -p 443:443 vicanso/pingap',
    installLabel: { en: 'Docker Quick Start', zh: 'Docker 一键启动' },
    features: [
      {
        title: { en: 'Powered by Pingora', zh: '基于 Pingora 引擎' },
        description: {
          en: 'Memory-safe Rust async runtime with connection pooling, gRPC/WebSocket, and HTTP/2 & HTTP/3.',
          zh: 'Rust 异步内存安全架构，支持连接池复用、gRPC/WebSocket 与 HTTP/2/3 转发。',
        },
      },
      {
        title: { en: 'Zero-Downtime & ACME', zh: '热重载与自动证书' },
        description: {
          en: 'Graceful hot-reloads without dropping active connections, plus automatic Let’s Encrypt TLS.',
          zh: '平滑热重载配置不中断活跃连接，内置 Let’s Encrypt 自动化 TLS 证书管理。',
        },
      },
      {
        title: { en: 'Visual Web Admin', zh: '可视化 Web 后台' },
        description: {
          en: 'Configure upstreams, locations, rate-limiting, and inspect live traffic from a clean Web UI.',
          zh: '无需手写复杂配置，通过内置 Web UI 即可管理 Upstream、路由规则与限流策略。',
        },
      },
    ],
  },
  {
    id: 'charts-rs',
    name: 'charts-rs',
    repo: 'vicanso/charts-rs',
    category: 'cli',
    website: 'https://charts.vicanso.dev/',
    platforms: ['Crate', 'SVG / PNG / WebP / AVIF', '22 Charts'],
    tagline: {
      en: 'Pure Rust chart library generating 22 chart types (SVG/PNG/WebP/AVIF) from simple JSON.',
      zh: '纯 Rust 图表渲染库，通过简单 JSON 配置极速生成 22 种图表，支持 SVG、PNG、WebP 与 AVIF 输出。',
    },
    summary: {
      en: 'Zero-headless-browser server-side and CLI charting in pure Rust. Supports Bar, Line, Pie, Radar, Scatter, Candlestick, Heatmap, Sankey, Treemap, Funnel, Waterfall, Gauge, Table, and Multi-Chart layouts.',
      zh: '无需任何无头浏览器的纯 Rust 服务端与 CLI 图表渲染库。支持柱状图、折线图、饼图、雷达图、散点图、K 线图、热力图、桑基图、矩形树图、漏斗图、瀑布图、仪表盘等 22 种图表类型。',
    },
    installCmd: 'cargo add charts-rs',
    installLabel: { en: 'Cargo Crate', zh: 'Cargo 添加依赖' },
    features: [
      {
        title: { en: '22 Chart Types', zh: '22 种丰富图表' },
        description: {
          en: 'From Candlestick and Sankey to Heatmap, Treemap, Radar, and Multi-Chart combinations.',
          zh: '覆盖 K 线、桑基图、热力图、矩形树图、雷达图及组合图表，满足 BI 与监控全场景。',
        },
      },
      {
        title: { en: 'Simple JSON Config', zh: '极简 JSON 驱动' },
        description: {
          en: 'Declarative JSON or Rust builder API inspired by ECharts with built-in dark/light themes.',
          zh: '提供声明式 JSON 配置与链式 Rust API，内置多套深浅色主题，几行配置即可出图。',
        },
      },
      {
        title: { en: 'Multi-Format Export', zh: '多格式高性能输出' },
        description: {
          en: 'Render crisp SVG vectors or rasterize directly to PNG, JPEG, WebP, and AVIF in milliseconds.',
          zh: '毫秒级输出高清矢量 SVG，或直接光栅化导出为 PNG、JPEG、WebP 与 AVIF。',
        },
      },
    ],
  },
  {
    id: 'diving-rs',
    name: 'diving-rs',
    repo: 'vicanso/diving-rs',
    category: 'cli',
    website: 'https://diving.vicanso.dev/',
    platforms: ['Container', 'TUI / Web / MCP', 'Security'],
    tagline: {
      en: 'Daemonless container image analyzer with layer inspection, secret scanning, TUI, Web & MCP.',
      zh: '免 Docker Client 直接从 Registry 拉取并逐层分析镜像，检测空间浪费、重复文件与密钥泄漏，支持 TUI/Web/MCP。',
    },
    summary: {
      en: 'Pull and inspect OCI/Docker images directly from registries without needing a local Docker daemon. Detect wasted bytes, cross-layer duplicate files, leaked secrets, enforce CI gates, and view via TUI, Web UI, or MCP.',
      zh: '无需本地 Docker Daemon，直接从镜像仓库拉取并逐层解剖 OCI 镜像。精准识别冗余空间、跨层重复文件与硬编码密钥泄漏，支持 AI 优化建议、CI 卡口，并提供 TUI、Web 与 MCP 三种交互方式。',
    },
    installCmd: 'cargo install diving-rs',
    installLabel: { en: 'Cargo Install', zh: 'Cargo 安装' },
    features: [
      {
        title: { en: 'Daemonless Registry Pull', zh: '免 Docker 极速拉取' },
        description: {
          en: 'Streams image manifests and blobs directly from Docker Hub, GHCR, or private registries.',
          zh: '直接对接 Registry API 流式拉取与解压镜像层，不依赖本地 Docker 守护进程。',
        },
      },
      {
        title: { en: 'Waste & Secret Detection', zh: '冗余与安全泄漏检测' },
        description: {
          en: 'Finds cross-layer duplicates, deleted-file bloat, and accidentally committed API keys or tokens.',
          zh: '自动识别跨层重复文件、覆盖残留空间浪费以及遗留在镜像层中的敏感密钥。',
        },
      },
      {
        title: { en: 'TUI, Web, CI & MCP', zh: '多端交互与 AI 报告' },
        description: {
          en: 'Explore layers in a rich terminal TUI, launch a local Web UI, gate CI builds, or query via MCP.',
          zh: '提供终端 TUI、本地 Web 可视化、CI 体积卡口检查以及 MCP 协议 AI 优化报告。',
        },
      },
    ],
  },
  {
    id: 'httpstat',
    name: 'httpstat',
    repo: 'vicanso/http-stat-rs',
    category: 'cli',
    platforms: ['CLI', 'HTTP/1/2/3', 'gRPC', 'Benchmark'],
    tagline: {
      en: 'Visualizes HTTP/1/2/3 & gRPC request timing phases (DNS, TCP, TLS, TTFB) with benchmark mode.',
      zh: '精准统计请求各阶段（DNS、TCP、TLS、服务端处理、传输）耗时，全面支持 HTTP/1/2/3 与 gRPC，内置压测模式。',
    },
    summary: {
      en: 'A single-binary Rust CLI that breaks down every millisecond of an HTTP or gRPC request — DNS lookup, TCP handshake, TLS negotiation, server processing, and content transfer — plus built-in concurrent benchmarking.',
      zh: '单二进制 Rust 命令行工具，将每一次 HTTP 或 gRPC 请求的 DNS 解析、TCP 建连、TLS 握手、服务端处理与内容传输耗时清晰可视化，并内置并发基准压测模式。',
    },
    installCmd: 'cargo install http-stat-rs',
    installLabel: { en: 'Cargo Install', zh: 'Cargo 安装' },
    features: [
      {
        title: { en: 'Full Phase Waterfall', zh: '全阶段耗时剖析' },
        description: {
          en: 'Clear terminal timeline for DNS, TCP, TLS, Server Processing (TTFB), and Content Transfer.',
          zh: '直观输出 DNS、TCP、TLS、服务端处理（TTFB）与数据传输各阶段耗时阶梯图。',
        },
      },
      {
        title: { en: 'HTTP/1, 2, 3 & gRPC', zh: '全协议栈支持' },
        description: {
          en: 'Test modern QUIC/HTTP3 endpoints and gRPC services alongside standard HTTP/1.1 & HTTP/2.',
          zh: '除常规 HTTP/1.1 与 HTTP/2 外，原生支持 QUIC/HTTP3 与 gRPC 端点耗时诊断。',
        },
      },
      {
        title: { en: 'Built-in Benchmark Mode', zh: '内置基准压测' },
        description: {
          en: 'Run concurrent load tests with percentile latency breakdowns (p50, p95, p99) from one tool.',
          zh: '无需切换工具，直接开启并发压测模式并统计 P50/P95/P99 分位延迟分布。',
        },
      },
    ],
  },
];

export const INITIAL_STATS: Record<string, RepoStats> = (githubStats as { repos: Record<string, RepoStats> }).repos;

export const TOTAL_STARS = Object.values(INITIAL_STATS).reduce((sum, r) => sum + (r?.stars || 0), 0);

export function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(count);
}
