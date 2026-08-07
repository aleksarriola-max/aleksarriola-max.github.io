#!/usr/bin/env python3
"""Generate feed.xml (RSS 2.0) and sitemap.xml from the essays in index.html.
Runs after the daily essay is published so the feed always reflects the site."""
import re, html, glob, os
from datetime import datetime, timezone
from email.utils import format_datetime

SITE="https://aleksarriola-max.github.io"
AUTHOR="Aleks Arriola"
c=open('index.html',encoding='utf-8').read()
seg=c[c.index('ESSAYS-TOP'):c.index('CERT MODAL')]
blocks=[b for b in re.split(r'(?=<!-- ARTICLE \d+ -->)', seg) if '<!-- ARTICLE' in b]

def strip(s): return re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',s)).strip()

items=[]
for b in blocks:
    num=re.search(r'ARTICLE (\d+)',b).group(1)
    mp=re.search(r'text-transform:uppercase[^>]*>(.*?)</p>', b, re.S)
    meta=html.unescape(mp.group(1)) if mp else ''
    cat,date_label=(meta.split('·')+[''])[:2]
    cat=cat.strip(); date_label=date_label.strip()
    h2=re.search(r'<h2[^>]*>(.*?)</h2>', b, re.S)
    title=html.unescape(strip(h2.group(1))) if h2 else f"Essay {num}"
    body=re.search(r'</h2>(.*)</article>', b, re.S)
    desc=strip(html.unescape(body.group(1)))[:300] if body else ''
    try: dt=datetime.strptime(date_label,"%B %d, %Y").replace(tzinfo=timezone.utc)
    except Exception: dt=datetime(2026,1,1,tzinfo=timezone.utc)
    items.append((int(num),title,cat,desc,dt))

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
          f'<link>{SITE}/#writing</link>',
          f'<guid isPermaLink="false">essay-{num}</guid>',
          f'<category>{esc(cat)}</category>',
          f'<pubDate>{format_datetime(dt)}</pubDate>',
          f'<description>{esc(desc)}</description>','</item>']
rss+=['</channel>','</rss>']
open('feed.xml','w',encoding='utf-8').write('\n'.join(rss))

# sitemap of the real pages
pages=sorted(glob.glob('*.html'))
today=datetime.now(timezone.utc).date().isoformat()
sm=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for p in pages:
    loc=f"{SITE}/" if p=='index.html' else f"{SITE}/{p}"
    pri='1.0' if p=='index.html' else '0.7'
    sm+=['<url>',f'<loc>{loc}</loc>',f'<lastmod>{today}</lastmod>',f'<priority>{pri}</priority>','</url>']
sm+=['</urlset>']
open('sitemap.xml','w',encoding='utf-8').write('\n'.join(sm))
print(f"feed.xml: {len(items)} items | sitemap.xml: {len(pages)} pages")
