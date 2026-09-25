# Writing with Keystatic

Articles and photographs live in `aqeelrazagondal/Nimra_Portfoli`. There is no database, Keystatic Cloud project or external CMS. Production uses GitHub mode; `npm run dev` uses local files.

## Production setup — by hand

1. Stop the ordinary development server. Run `npm run dev:github` and open <http://localhost:3000/keystatic>. This one-time command enables GitHub mode locally so Keystatic can show its setup prompt. Normal `npm run dev` stays in local mode and cannot show this prompt.
2. Choose **Sign in with GitHub / Create GitHub App**. Enter the production website URL, `https://www.nimrazahid.com`, in the wizard. Follow the prompts and install the App on **aqeelrazagondal/Nimra_Portfoli**. The repository's spelling comes from the existing Git remote.
3. Copy the generated values from the local `.env` file into **Vercel → Project → Settings → Environment Variables → Production**:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
   Keep the first three secret. Do not commit `.env` or `.env.local`. Do not set the local setup override in Vercel.
4. Ensure the GitHub App has the production OAuth callback `https://www.nimrazahid.com/api/keystatic/github/oauth/callback`. The wizard should add it when given the production URL; add it in GitHub App settings if missing. Use the site's final redirected hostname consistently.
5. Confirm Vercel is connected to this repository, builds the production branch (`main`) on Git pushes, and uses `npm run build` (which runs image cleanup first). Keep the site's `NEXT_PUBLIC_SITE_URL=https://www.nimrazahid.com`. Existing contact-form and indexing environment variables stay as configured.
6. After reviewing and merging the feature branch, redeploy Vercel with those environment variables. Before credentials are present the public site still builds, while admin/API requests return 404.
7. Add **Nimra's GitHub account as a repository collaborator with write access**, and have her accept the invitation. She can then sign in at `https://www.nimrazahid.com/keystatic`. No Vercel login or coding is needed to write articles.

GitHub authentication cannot be fully tested until the real App is created and installed. Official setup reference: <https://keystatic.com/docs/github-mode>.

## Nimra's publishing workflow

- Sign in, select the production branch, choose **Articles → Add**.
- Enter the title (maximum 110 characters). The URL slug is generated automatically and is editable; choose it before sharing a link.
- Write a 140–220 character summary, select a publication date and tags, then upload a cover and describe it in the alt-text field.
- Write in the body editor. The block menu provides H2/H3, lists, blockquotes, dividers, **Figure** (inline image + required alt + optional caption), **Pull quote**, and **Footnote**. To add a footnote mid-sentence use the toolbar's insert menu, then edit its note.
- **Save as Draft** while writing. Draft pages are 404 everywhere, including local and preview deployments; drafts never appear in navigation, RSS, sitemap or generated OG images. The editor remains available for editing them.
- To publish, choose **Published** and save on the production branch. Keystatic commits the files to GitHub; Vercel rebuilds the static website. The article becomes visible after that deployment succeeds. `publishedAt` controls the displayed date and sort order, not automatic scheduling.
- Changing status back to Draft and saving removes an article after the next deployment. **Delete entry** removes the article and its associated uploads; keep a draft if you want to preserve it.
- Reading time is calculated at 225 words/minute. The summary is shared by cards, the dek, metadata and RSS. Select **Featured** for the top card; if several are featured, the newest is used.

## Images and privacy

Use still JPEG, PNG, WebP or AVIF files, at most **5 MB each**. Both the cover and body images are stored under `public/images/articles/<article-slug>/`.

Every `npm run build` runs Sharp first: it rejects oversized/unsupported files, respects camera orientation, strips EXIF/GPS and other metadata, and limits the long edge to 2400px. Failure stops deployment. Replace an oversized file with a smaller export and save again. `npm run images:clean` runs the same cleanup locally.

This build step sanitizes deployed images. GitHub receives the original upload before the build, so it does **not** erase metadata already committed to Git history; use a private repository or remove location data before uploading if repository readers must not see originals.

Never publish the private material listed in the supplied design handoff §8: personal contact details, birth date, registration/student numbers, certificates, father's name, module grades, pupil details/images/anecdotes, the current school's name, full theses or internal review notes. The shipped sample is a practice draft, not an article attributed to Nimra for publication.

## Validation

- `npm run test:images`: real EXIF/GPS stripping, auto-orientation, resizing, idempotence and >5 MB rejection.
- `npm run test:writing`: local browser test of create/edit/delete, cover and inline uploads, published/draft visibility, RSS/sitemap/OG/JSON-LD, automatic navigation and WCAG AA scans at 375px in both themes with reduced motion. Run with the normal local development mode; it creates and removes one temporary test article.
- `npm run typecheck`, `npm run lint`, `npm run build`.

The public pages are in `app/(site)/writing/`; the route group does not change their URLs. Admin styles and layout stay separate from the site's navigation and footer. A production build with a temporary published article was checked to emit both the article and its OG image statically. The final repository contains only one draft sample.
