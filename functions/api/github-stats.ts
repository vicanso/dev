const REPOS = [
  { id: 'zedis', repo: 'vicanso/zedis' },
  { id: 'cyberapi', repo: 'vicanso/cyberapi' },
  { id: 'zniff', repo: 'vicanso/zniff' },
  { id: 'pingap', repo: 'vicanso/pingap' },
  { id: 'charts-rs', repo: 'vicanso/charts-rs' },
  { id: 'diving-rs', repo: 'vicanso/diving-rs' },
  { id: 'httpstat', repo: 'vicanso/http-stat-rs' },
];

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

function classifyAssets(assets: GitHubAsset[] = []) {
  const result: Record<string, string> = {};
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

export async function onRequestGet(context: {
  request: Request;
  env?: { GITHUB_TOKEN?: string };
  waitUntil?: (p: Promise<unknown>) => void;
}) {
  const cache = (caches as unknown as { default?: Cache }).default;
  const cacheKey = new Request(context.request.url, { method: 'GET' });

  if (cache) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  }

  const headers: Record<string, string> = {
    'User-Agent': 'vicanso-dev-edge',
    Accept: 'application/vnd.github+json',
  };
  if (context.env?.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${context.env.GITHUB_TOKEN}`;
  }

  const entries = await Promise.all(
    REPOS.map(async (item) => {
      try {
        const [repoRes, relRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${item.repo}`, { headers }),
          fetch(`https://api.github.com/repos/${item.repo}/releases/latest`, { headers }),
        ]);
        if (!repoRes.ok) return [item.id, null] as const;
        const repoData = (await repoRes.json()) as { stargazers_count?: number };
        let latestTag: string | null = null;
        let downloads: Record<string, string> = {};
        if (relRes.ok) {
          const relData = (await relRes.json()) as { tag_name?: string; assets?: GitHubAsset[] };
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
        ] as const;
      } catch {
        return [item.id, null] as const;
      }
    }),
  );

  const repos: Record<string, unknown> = {};
  for (const [id, info] of entries) {
    if (info) repos[id] = info;
  }

  const response = new Response(
    JSON.stringify({
      updatedAt: new Date().toISOString(),
      repos,
    }),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );

  if (cache && Object.keys(repos).length > 0) {
    context.waitUntil?.(cache.put(cacheKey, response.clone()));
  }

  return response;
}
