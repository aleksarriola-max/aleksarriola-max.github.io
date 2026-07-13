"""
Daily Essay Publisher for aleksarriola-max.github.io
Picks the next essay from essay_queue.json and inserts it into index.html.
Run by GitHub Actions every day at 9am UTC.
"""

import json, re, sys, os
from datetime import date

QUEUE_FILE = "essay_queue.json"
INDEX_FILE = "index.html"
STATE_FILE = "essay_state.json"

def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"next_index": 0}

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def build_article(essay):
    category = essay["category"]
    date_label = essay["date_label"]
    title = essay["title"]
    body = essay["body"]
    return f'''
    <!-- ARTICLE {essay["id"]} -->
    <article style="border-top:1px solid rgba(0,0,0,0.1);padding-top:2.5rem;margin-bottom:3.5rem;">
      <p style="font-size:0.72rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:0.8rem;">{category} · {date_label}</p>
      <h2 style="font-family:'Playfair Display',serif;font-size:1.9rem;color:var(--navy);margin-bottom:1.2rem;line-height:1.3;">{title}</h2>
      <div style="font-size:1rem;line-height:1.85;color:#333;">
        {body}
      </div>
    </article>
'''

def main():
    with open(QUEUE_FILE) as f:
        queue = json.load(f)

    state = load_state()
    idx = state["next_index"]

    if idx >= len(queue):
        print("All essays published. Queue exhausted.")
        sys.exit(0)

    essay = queue[idx]
    print(f"Publishing essay {essay['id']}: {essay['title']}")

    article_html = build_article(essay)

    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Insert before the cert modal closing marker
    anchor = "\n  </div>\n</div>\n\n<!-- ── CERT MODAL ── -->"
    if anchor not in content:
        print("ERROR: Could not find insertion anchor in index.html")
        sys.exit(1)

    content = content.replace(anchor, article_html + anchor, 1)

    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    state["next_index"] = idx + 1
    save_state(state)
    print(f"Done. Next essay index: {state['next_index']}")

if __name__ == "__main__":
    main()
