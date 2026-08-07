#!/usr/bin/env python3
"""Fail CI if a sensitive file or a credential-looking string is committed.
Backstop for .gitignore so the session-artifact/credential exposure can't recur."""
import re, subprocess, sys, os

tracked=subprocess.check_output(['git','ls-files']).decode().splitlines()
errors=[]

# 1) sensitive filenames
bad_name=re.compile(r'(^|/)(\.credentials\.json|\.claude\.json.*|.*\.jsonl|.*\.pem|.*\.key|id_rsa.*|\.env(\..*)?|\.npmrc|.*secret.*\.(json|txt|ya?ml))$', re.I)
for f in tracked:
    if bad_name.search(f):
        errors.append(f"sensitive file committed: {f}")

# 2) credential patterns inside text files (skip binaries and this scripts dir)
secret_pats=[
    re.compile(r'ghp_[A-Za-z0-9]{36}'),
    re.compile(r'github_pat_[A-Za-z0-9_]{30,}'),
    re.compile(r'-----BEGIN [A-Z ]*PRIVATE KEY-----'),
    re.compile(r'AKIA[0-9A-Z]{16}'),
    re.compile(r'xox[baprs]-[A-Za-z0-9-]{10,}'),
]
skip_ext={'.xlsx','.xlsm','.docx','.pptx','.pdf','.png','.jpg','.jpeg','.gif','.zip','.woff','.woff2','.ico'}
for f in tracked:
    if f.startswith('.github/scripts/'):  # don't scan the detector's own regexes
        continue
    if os.path.splitext(f)[1].lower() in skip_ext:
        continue
    try:
        data=open(f,encoding='utf-8',errors='ignore').read()
    except Exception:
        continue
    for p in secret_pats:
        if p.search(data):
            errors.append(f"credential-like string in {f} (pattern {p.pattern[:20]}...)")

if errors:
    print("SECURITY GUARD FAILED:")
    for e in errors: print("  -", e)
    sys.exit(1)
print(f"Security guard OK — {len(tracked)} tracked files, no sensitive files or credentials.")
