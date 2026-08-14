Put your real files here, using these EXACT names (all lowercase, no spaces):

  src/assets/profile.jpg          <- your headshot (referenced as profileImage in app.component.ts)
  src/assets/Ashikur_CV.pdf       <- your CV/resume (referenced as resumeUrl in app.component.ts)
  src/assets/favicon.svg          <- referenced in index.html <link rel="icon">
  src/assets/og-cover.jpg         <- optional, used for social share previews (og:image)

  src/assets/projects/doctorappointment.jpg
  src/assets/projects/ecommerce.jpg
  src/assets/projects/newsportal.jpg
  (project screenshots — optional; if missing, the app gracefully falls back
   to a generated placeholder card instead of a broken image icon)

Why exact names matter:
- Linux-based hosts (Netlify, Vercel, GitHub Pages, most production servers)
  treat filenames as CASE-SENSITIVE, even though Windows/Mac dev machines don't.
  "Profile.JPG" and "profile.jpg" are two different files on Linux.
- Spaces in filenames get URL-encoded (%20) and are a common source of broken
  links — avoid them entirely, use hyphens or underscores instead.

After adding files here, restart `ng serve` if it's already running —
it doesn't always pick up new files in an existing folder automatically.
