#!/usr/bin/env python3
"""Generate feed.xml (RSS 2.0) and sitemap.xml from assets/js/essays.js.
Runs after the daily essay is published so the feed always reflects the site."""
import re, html, glob, os
from datetime import datetime, timezone
from email.utils import format_datetime

SITE="https://aleksarriola-max.github.io"
AUTHOR="Aleks Arriola"
import json
src=open('assets/js/essays.js',encoding='utf-8').read()
essays=json.loads(re.search(r'window\.ESSAYS\s*=\s*(\[.*\]);?\s*$', src, re.S).group(1))

items=[]
for e in essays:
    desc=' '.join(e.get('body') or [])[:300]
    try: dt=datetime.strptime(e['date'],"%B %d, %Y").replace(tzinfo=timezone.utc)
    except Exception: dt=datetime(2026,1,1,tzinfo=timezone.utc)
    items.append((int(e['id']),e['title'],e['tag'],desc,dt))

def esc(s): return html.escape(s,quote=True)
rss=['<?xml version="1.0" encoding="UTF-8"?>',
     '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">','<channel>',
     f'<title>{AUTHOR} — Writing</title>',
     f'<link>{SITE}/#writing</link>',
     '<description>Essays on AI systems, quantitative finance, and building at their intersection.</description>',
     '<language>en-us</language>',
     f'<atom:link href="{SITE}/feed.xml" rel="self" type="application/rss+xml"/>',
     f'<lastBuildDate>{format_datetime(datetime.now(timezone.utc))}</lastBuildDate>']
for num,title,cat,desc,dt in items:
    rss+=['<item>',f'<title>{esc(title)}</title>',
          f'<link>{SITE}/#essay-{num}</link>',
          f'<guid isPermaLink="false">essay-{num}</guid>',
          f'<category>{esc(cat)}</category>',
          f'<pubDate>{format_datetime(dt)}</pubDate>',
          f'<description>{esc(desc)}</description>','</item>']
rss+=['</channel>','</rss>']
open('feed.xml','w',encoding='utf-8').write('\n'.join(rss))

# sitemap of the real pages
# Skip redirect stubs (old standalone pages that forward to a section of index.html)
pages=sorted(p for p in glob.glob('*.html')
             if 'http-equiv="refresh"' not in open(p,encoding='utf-8').read())
today=datetime.now(timezone.utc).date().isoformat()
sm=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for p in pages:
    loc=f"{SITE}/" if p=='index.html' else f"{SITE}/{p}"
    pri='1.0' if p=='index.html' else '0.7'
    sm+=['<url>',f'<loc>{loc}</loc>',f'<lastmod>{today}</lastmod>',f'<priority>{pri}</priority>','</url>']
sm+=['</urlset>']
open('sitemap.xml','w',encoding='utf-8').write('\n'.join(sm))
print(f"feed.xml: {len(items)} items | sitemap.xml: {len(pages)} pages")
