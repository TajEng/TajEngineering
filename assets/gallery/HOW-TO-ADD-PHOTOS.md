# How to add a photo to the website gallery

No coding knowledge is needed. This takes about three minutes per photo and is done entirely on github.com.

## Step 1 — Upload the photo file

1. Go to the website's GitHub repository in a browser.
2. Open the `assets` folder, then `gallery`, then `photos`.
3. Click **Add file** → **Upload files**.
4. Drag the photo in, or click "choose your files" and select it.
   - Use `.jpg` for normal photos.
   - Keep the file under about 2 MB. If a phone photo is larger, resize it first (most phones have a "share → smaller size" option when sending it to yourself).
   - Give the file a short, plain name before uploading — e.g. `akobo-foundation-check.jpg` — no spaces, no special characters.
5. Scroll down and click **Commit changes** (committing straight to `main` is fine).

## Step 2 — Describe the photo

1. Go back to the `assets/gallery` folder and open `photos.json`.
2. Click the pencil (✎) icon in the top right to edit the file.
3. Find the line near the top that looks like `[` and the line near the bottom that looks like `]`. Every photo entry goes between them.
4. Copy this block and paste it just after the `[`:

```json
  {
    "file": "akobo-foundation-check.jpg",
    "title": "Foundation reinforcement check",
    "category": "monitoring",
    "location": "Akobo GRA, Ibadan",
    "date": "2026-10",
    "caption": "Reinforcement spacing checked before concrete pour."
  },
```

5. Update the values:
   - `file` — must exactly match the filename uploaded in Step 1.
   - `title` — short, 3–6 words.
   - `category` — one of: `readiness`, `monitoring`, `materials`, `condition`, `closeout`, `remote` (see table below).
   - `location` — site or area name.
   - `date` — `YYYY-MM` (year and month) is enough.
   - `caption` — one plain sentence about what the photo shows.
6. Make sure every entry except the last one ends with a comma `,` after the closing `}`, and the very last entry does not.
7. Scroll down and click **Commit changes**.

The photo will appear on the gallery page within about a minute of the commit.

## Category reference

| category value | Shows on the site as |
|---|---|
| `readiness` | Pre-construction readiness |
| `monitoring` | Construction monitoring |
| `materials` | Materials & workmanship |
| `condition` | Condition screening |
| `closeout` | Handover & close-out |
| `remote` | Remote monitoring |

Pick whichever matches the visit the photo was taken on. If unsure, `monitoring` is a safe default.

## Removing a photo

Delete its entry from `photos.json` (Step 2, in reverse) and, optionally, delete the file itself from `assets/gallery/photos`. Removing only the JSON entry is enough to take it off the live site.

## If something looks wrong

- Photo not showing: double-check the `file` value matches the uploaded filename exactly, including capitalisation and extension.
- Page looks broken after editing `photos.json`: a comma is probably missing or extra. Compare the entry against the example above — every entry needs a comma after it except the last.
- When in doubt, undo the edit (GitHub keeps file history) and try again.
