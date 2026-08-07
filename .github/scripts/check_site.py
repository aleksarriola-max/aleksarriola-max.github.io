#!/usr/bin/env python3
"""Fail CI if any local file reference is broken or an obvious placeholder ships.
Catches the classes of bug that shipped before: a Download button pointing at a
missing .xlsx, and a github.com/YOUR-HANDLE placeholder."""
import re, os, glob, sys

errors=[]
html=sorted(glob.glob('*.html'))
for f in html:
    c=open(f,encoding='utf-8').read()
    # 1) local file references must exist
    for m in re.finditer(r'(?:href|src)="([^"]+)"', c):
        u=m.group(1)
        if u.startswith(('http://','https://','//','#','mailto:','tel:','javascript:','data:')) or u.strip()=='':
            continue
        path=u.split('#')[0].split('?')[0]
        if path and not os.path.exists(path):
            errors.append(f"{f}: broken link -> {u}  (file not found)")
    # 2) obvious placeholders that must never ship
    for pat in ['YOUR-HANDLE','yourusername','your-handle','REPLACE_ME','REPLACEME','lorem ipsum','TODO:','FIXME','your-email@','placeholder.com','example-user']:
        if pat.lower() in c.lower():
            errors.append(f"{f}: placeholder text present -> {pat!r}")

if errors:
    print("BROKEN LINK / PLACEHOLDER CHECK FAILED:")
    for e in errors: print("  -", e)
    sys.exit(1)
print(f"Site check OK — {len(html)} pages, all local links resolve, no placeholders.")
