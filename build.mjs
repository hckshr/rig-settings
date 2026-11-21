// Regenerates worker.js from index.html so the Worker serves the page.
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

const worker = `export default {
  async fetch(request) {
    const HTML = ${JSON.stringify(html)};
    if (request.method === 'GET' || request.method === 'HEAD') {
      return new Response(request.method === 'HEAD' ? null : HTML, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'public, max-age=300',
          'x-content-type-options': 'nosniff',
          'referrer-policy': 'strict-origin-when-cross-origin'
        }
      });
    }
    return new Response('Method Not Allowed', { status: 405, headers: { allow: 'GET, HEAD' } });
  }
};
`;

writeFileSync(new URL('./worker.js', import.meta.url), worker);

const deploy = `async () => {
  const worker = ${JSON.stringify(worker)};
  const metadata = { main_module: 'worker.js', compatibility_date: '2026-11-20' };
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('worker.js', new Blob([worker], { type: 'application/javascript+module' }), 'worker.js');
  const upload = await cloudflare.request({ method: 'PUT', path: \`/accounts/\${accountId}/workers/scripts/rig-settings\`, body: form });
  const subdomain = await cloudflare.request({ method: 'POST', path: \`/accounts/\${accountId}/workers/scripts/rig-settings/subdomain\`, body: { enabled: true } });
  return { uploadSuccess: upload.success, script: upload.result && { id: upload.result.id, modified_on: upload.result.modified_on }, errors: upload.errors, subdomain: subdomain && subdomain.result };
}
`;
writeFileSync(new URL('./deploy-mcp.js', import.meta.url), deploy);
console.log('worker.js and deploy-mcp.js rebuilt');
