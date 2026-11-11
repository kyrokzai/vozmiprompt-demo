#!/usr/bin/env python3
"""Run only after the owner verifies the public Pages URL; does not deploy."""
import argparse,re
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape
p=argparse.ArgumentParser();p.add_argument('--site-url',required=True);args=p.parse_args()
url=args.site_url.rstrip('/')+'/'
u=urlparse(url)
if u.scheme!='https' or not u.hostname or u.query or u.fragment or u.username or u.password: p.error('Provide a verified public HTTPS base URL')
root=Path(__file__).resolve().parents[1];html=(root/'index.html').read_text()
html=re.sub(r'<!-- public-metadata -->.*?<!-- /public-metadata -->','',html,flags=re.S)
block=f'<!-- public-metadata --><link rel="canonical" href="{escape(url)}"><meta property="og:url" content="{escape(url)}"><meta property="og:image" content="{escape(url)}assets/images/1a53780beae674dc-960.webp"><meta name="twitter:image" content="{escape(url)}assets/images/1a53780beae674dc-960.webp"><!-- /public-metadata -->'
(root/'index.html').write_text(html.replace('</head>',block+'</head>'))
(root/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+escape(url)+'</loc></url></urlset>')
(root/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+url+'sitemap.xml\n')
print('Public URL metadata generated; review changes before release.')
