"""
Daily Essay Publisher for aleksarriola-max.github.io
Picks the next essay from essay_queue.json and adds it to the top of
assets/js/essays.js (window.ESSAYS, newest first), which the Writing page reads.
Run by GitHub Actions every day at 9am UTC.
"""

import json, re, sys, os, html
from datetime import date

QUEUE_FILE = "essay_queue.json"
ESSAYS_FILE = "assets/js/essays.js"
STATE_FILE = "essay_state.json"
HEADER = "/* Published essays, newest first. Maintained by publish_essay.py — do not hand-edit the JSON shape. */\n"


def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"next_index": 0}


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def today_label():
    # Stamp the real publish date so essays never show stale queued dates.
    return date.today().strftime("%B %d, %Y").replace(" 0", " ")


def load_essays():
    with open(ESSAYS_FILE, encoding="utf-8") as f:
        src = f.read()
    m = re.search(r"window\.ESSAYS\s*=\s*(\[.*\]);?\s*$", src, re.S)
    if not m:
        print(f"ERROR: could not parse {ESSAYS_FILE}")
        sys.exit(1)
    return json.loads(m.group(1))


def save_essays(essays):
    with open(ESSAYS_FILE, "w", encoding="utf-8") as f:
        f.write(HEADER)
        f.write("window.ESSAYS = " + json.dumps(essays, ensure_ascii=False, indent=1) + ";\n")


def body_paragraphs(body_html):
    """Queue bodies are HTML (<p>…</p>); the page renders plain-text paragraphs."""
    parts = re.findall(r"<p[^>]*>(.*?)</p>", body_html, re.S) or [body_html]
    out = []
    for p in parts:
        text = html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", p))).strip()
        if text:
            out.append(text)
    return out


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

    essays = load_essays()
    if any(e["id"] == essay["id"] for e in essays):
        print(f"Essay {essay['id']} is already published; skipping it.")
    else:
        essays.insert(0, {
            "id": essay["id"],
            "tag": essay["category"],
            "date": today_label(),
            "title": essay["title"],
            "body": body_paragraphs(essay["body"]),
        })
        save_essays(essays)

    state["next_index"] = idx + 1
    save_state(state)
    print(f"Done. Next essay index: {state['next_index']}")


if __name__ == "__main__":
    main()
