#!/usr/bin/env python3
"""Add a project card to coding.html in the site's exact card style, newest-first.
Example:
  python .github/scripts/add_content.py --title "DeepBook OS" \
     --category "⛓️ On-Chain · TypeScript" --desc "A market OS on Sui DeepBookV3." \
     --tags "Blockchain,Analytics" --link "https://example.app" --link-label "Launch app"
Inserts right after the <!-- PROJECTS-TOP --> marker. Use --dry-run to preview."""
import argparse, html, sys

def ent(s):
    s=s.replace('--','&#8212;').replace("'","&#8217;")
    out=[];o=True
    for ch in s:
        if ch=='"': out.append('&#8220;' if o else '&#8221;'); o=not o
        else: out.append(ch)
    return ''.join(out)

def build(title, category, desc, tags, link, label):
    tag_html=''.join(f'<span class="tag">{ent(t.strip())}</span>' for t in tags if t.strip())
    tags_block=(f'\n        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin:0.9rem 0 0.4rem;">{tag_html}</div>'
                if tag_html else '')
    link_block=''
    if link:
        link_block=('\n        <a href="'+html.escape(link,quote=True)+'" target="_blank" rel="noopener" '
                    'style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--navy);color:var(--gold);'
                    'padding:0.5rem 1.1rem;border-radius:4px;font-size:0.82rem;font-weight:600;text-decoration:none;margin-top:0.4rem;">'
                    '↗ '+ent(label)+'</a>')
    return ('\n    <!-- added-card -->\n    <div class="card">\n'
            '      <div class="card-body" style="padding-top:1.5rem;">\n'
            f'        <p class="card-type">{ent(category)}</p>\n'
            f'        <h3 class="card-title">{ent(title)}</h3>\n'
            f'        <p class="card-desc">{ent(desc)}</p>'
            f'{tags_block}{link_block}\n      </div>\n    </div>')

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--title',required=True); ap.add_argument('--category',required=True)
    ap.add_argument('--desc',required=True); ap.add_argument('--tags',default='')
    ap.add_argument('--link',default=''); ap.add_argument('--link-label',default='Launch')
    ap.add_argument('--file',default='coding.html'); ap.add_argument('--dry-run',action='store_true')
    a=ap.parse_args()
    c=open(a.file,encoding='utf-8').read()
    marker='<!-- PROJECTS-TOP -->'
    if marker not in c: print("ERROR: marker not found in",a.file); sys.exit(1)
    card=build(a.title,a.category,a.desc,a.tags.split(','),a.link,a.link_label)
    if a.dry_run: print(card); return
    open(a.file,'w',encoding='utf-8').write(c.replace(marker, marker+card, 1))
    print("Inserted card into",a.file)

if __name__=='__main__': main()
