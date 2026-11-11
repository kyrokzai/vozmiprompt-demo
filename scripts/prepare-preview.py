#!/usr/bin/env python3
"""Build an isolated noindex preview artifact; never deploy or modify the source site."""
import argparse,re,shutil
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--output',required=True);args=p.parse_args()
root=Path(__file__).resolve().parents[1];out=Path(args.output).resolve()
if out==root or root in out.parents: p.error('Output must be outside the repository')
if out.exists(): p.error('Output already exists; choose a new empty destination')
out.mkdir(parents=True)
shutil.copytree(root/'assets',out/'assets')
s=(root/'index.html').read_text()
s=re.sub(r'<meta\s+name="robots"[^>]*>','',s,flags=re.I)
s=s.replace('</head>','<meta name="robots" content="noindex, nofollow, noarchive"></head>')
(out/'index.html').write_text(s)
(out/'robots.txt').write_text('User-agent: *\nAllow: /\n')
(out/'.nojekyll').touch()
# Allow crawling so compliant crawlers can observe noindex. This is not access control.
print(f'Preview prepared: {out}. No deployment performed.')
