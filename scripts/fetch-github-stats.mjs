import fs from 'node:fs';
import path from 'node:path';

const REPOS = [
  { id: 'zedis', repo: 'vicanso/zedis' },
  { id: 'cyberapi', repo: 'vicanso/cyberapi' },
  { id: 'zniff', repo: 'vicanso/zniff' },
  { id: 'pingap', repo: 'vicanso/pingap' },
  { id: 'charts-rs', repo: 'vicanso/charts-rs' },
  { id: 'diving-rs', repo: 'vicanso/diving-rs' },
  { id: 'httpstat', repo: 'vicanso/http-stat-rs' },
];

const OUT_PATH = path.resolve(process.cwd(), 'src/data/github-stats.json');

function classifyAssets(assets = []) {
  const result = {};
  for (const asset of assets) {
    const name = asset.name.toLowerCase();
    const url = asset.browser_download_url;
    if (name.endsWith('.dmg')) {
      if (name.includes('aarch64') || name.includes('arm64')) {
        if (!result.macosArm || !name.includes('fast')) result.macosArm = url;
      } else if (name.includes('x86_64') || name.includes('x64') || name.includes('intel')) {
        result.macosIntel = url;
      } else if (!result.macosArm) {
        result.macosArm = url;
      }
    } else if (name.endsWith('.msi') || name.endsWith('.exe') || (name.includes('windows') && name.endsWith('.zip'))) {
      if (!result.windows) result.windows = url;
    } else if (
      (name.includes('linux') && (name.endsWith('.deb') || name.endsWith('.appimage') || name.endsWith('.tar.gz'))) ||
      name.includes('appimage')
    ) {
      if (name.includes('x86_64') || name.includes('amd64') || !result.linux) {
        if (name.endsWith('.deb') || !result.linux) result.linux = url;
      }
    }
  }
  return result;
}

async function fetchRepo(item, headers) {
  const repoRes = await fetch(`https://api.github.com/repos/${item.repo}`, { headers });
  if (!repoRes.ok) throw new Error(`${item.repo} repo HTTP ${repoRes.status}`);
  const repoData = await repoRes.json();

  let latestTag = null;
  let downloads = {};
  const relRes = await fetch(`https://api.github.com/repos/${item.repo}/releases/latest`, { headers });
  if (relRes.ok) {
    const relData = await relRes.json();
    latestTag = relData.tag_name ?? null;
    downloads = classifyAssets(relData.assets || []);
  }

  return [
    item.id,
    {
      repo: item.repo,
      stars: repoData.stargazers_count ?? 0,
      latestTag,
      downloads,
    },
  ];
}

async function main() {
  const headers = {
    'User-Agent': 'vicanso-dev-build',
    Accept: 'application/vnd.github+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let existing = {};
  if (fs.existsSync(OUT_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
    } catch {
      existing = {};
    }
  }

  const next = {
    updatedAt: new Date().toISOString(),
    repos: { ...(existing.repos || {}) },
  };

  for (const item of REPOS) {
    try {
      const [id, info] = await fetchRepo(item, headers);
      next.repos[id] = info;
    } catch (err) {
      console.warn(`[github-stats] Fallback to cached data for ${item.repo}: ${err.message}`);
    }
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(next, null, 2) + '\n', 'utf8');
  console.log(`[github-stats] Wrote ${OUT_PATH}`);
}

main();
