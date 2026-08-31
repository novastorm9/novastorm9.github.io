#!/bin/bash
# Inspect the coworker's Dropbox copy against this repo. Read-only: this script
# never writes to either side.
#
# He works in Dropbox and does not use git, so merges are done by hand, one file
# at a time, after reading the diff. See merge/OURS.md for what lives only here.
#
#   ./merge/diff-dropbox.sh                 summary of every difference
#   ./merge/diff-dropbox.sh <path>          full diff for one file
#   ./merge/diff-dropbox.sh --rsync-preview what a bulk rsync WOULD do (nothing is changed)

set -u
DROPBOX="/Users/andrewcampbell/Library/CloudStorage/Dropbox-SineLab/Andrew Campbell/UniversalGrid_Web (1)"
REPO="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -d "$DROPBOX" ]; then
  echo "Dropbox folder not found: $DROPBOX" >&2
  exit 1
fi

if [ "${1:-}" = "--rsync-preview" ]; then
  echo "DRY RUN - nothing will be changed."
  echo "Legend: '*deleting' = would be REMOVED from the repo"
  echo "        '<f.st..'   = would be OVERWRITTEN (size/time differ)"
  echo "        '<f+++++'   = would be CREATED"
  echo
  rsync -ain --delete "$DROPBOX/app/" "$REPO/app/"
  echo
  echo "Read every '*deleting' and '<f.st' line before running anything for real."
  echo "Prefer copying individual files after reading their diff."
  exit 0
fi

if [ $# -eq 1 ]; then
  diff -u "$REPO/$1" "$DROPBOX/$1"
  exit 0
fi

echo "=== only in Dropbox (his new files) ==="
(cd "$DROPBOX" && find app public -type f 2>/dev/null | sort) | while read -r f; do
  [ -e "$REPO/$f" ] || echo "  + $f"
done

echo
echo "=== only in repo (ours, or deleted by him) ==="
(cd "$REPO" && find app public -type f 2>/dev/null | sort) | while read -r f; do
  [ -e "$DROPBOX/$f" ] || echo "  - $f"
done

echo
echo "=== differing files (changed lines) ==="
(cd "$REPO" && find app public -type f 2>/dev/null | sort) | while read -r f; do
  [ -e "$DROPBOX/$f" ] || continue
  if ! cmp -s "$REPO/$f" "$DROPBOX/$f"; then
    case "$f" in
      *.png|*.gif|*.jpg|*.svg|*.ico) echo "  ~ $f (binary)" ;;
      *) echo "  ~ $f ($(diff "$REPO/$f" "$DROPBOX/$f" | grep -c '^[<>]') lines)" ;;
    esac
  fi
done

echo
echo "One file:      ./merge/diff-dropbox.sh app/page.tsx"
echo "Rsync preview: ./merge/diff-dropbox.sh --rsync-preview"
echo "Ours to keep:  merge/OURS.md"
