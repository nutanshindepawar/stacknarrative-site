# stacknarrative.com

The StackNarrative website: Next.js 16 (static export) + Sanity, hosted on Cloudflare Pages.

## How publishing works

1. You publish or update content in **Sanity Studio**.
2. A Sanity webhook calls a **Cloudflare Pages deploy hook**.
3. Cloudflare rebuilds the site (about 1–2 minutes) and the change is live.

| In Sanity Studio | What happens on the site |
|---|---|
| **Blog posts** | Own page at `/blog/<slug>`, listed on `/blog`, newest shown on the home page, added to `sitemap.xml` and `llms.txt` |
| **AI agents** | Card on `/agents` and the home page teaser |
| **Client work** | Card in the Work section of the home page |
| **Pages** | New page at `/<slug>` built from sections (hero, text, cards, FAQs, call to action). Tick "Show in menu" to add it to the menu. |

Toolbook phases and the latest published toolbook entries are read from the toolbook's Supabase database at build time.

### Writing posts for SEO and AEO

Each post has fields that feed search and AI answer engines:

- **Description**: shown under the title and used as the meta description (unless an SEO description is set).
- **Quick answer**: one or two sentences that directly answer the post's main question. Shown in a box at the top.
- **Key takeaways**: up to six short points.
- **FAQs**: rendered at the end and published as FAQ structured data.
- **Headings**: use H2s for main sections. With three or more, a table of contents appears automatically.
- **Hero image**: also used as the social share image. Always fill in the alt text.

Every page ships with a canonical URL, Open Graph tags and JSON-LD structured data (Organization, BlogPosting, FAQPage, BreadcrumbList).

## Local development

```powershell
npm install
npm run dev
```

Build the static site into `out/`:

```powershell
npm run build
```

Preview the article template before real posts exist (never in production):

```powershell
$env:SN_SAMPLE_POST="1"; npm run build
```

### Environment variables

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Sanity project (`5jspd31o`, `production`) |
| `NEXT_PUBLIC_TOOLBOOK_SUPABASE_URL`, `NEXT_PUBLIC_TOOLBOOK_SUPABASE_ANON_KEY` | Toolbook database, public read-only key |
| `NEXT_PUBLIC_SITE_URL` | `https://stacknarrative.com` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Contact form Google Apps Script web app URL (optional; empty = email fallback) |

## One-time setup

1. **Deploy the new Studio schemas** (adds AI agents, client work, pages and the new post fields):
   `npx sanity deploy`
2. **Import current content** into Sanity (until then the site uses built-in copies):
   `npx sanity exec scripts/seed-sanity.mts --with-user-token` (uses your Sanity CLI login)
3. **Cloudflare Pages**: connect this GitHub repo. Build command `npm run build`, output directory `out`, Node 20+, and the environment variables above.
4. **Deploy hook**: in Cloudflare Pages > Settings > Builds > Deploy hooks, create a hook. In sanity.io/manage > API > Webhooks, add it as the URL (trigger on create, update and delete for all document types).
5. **Domain**: point `stacknarrative.com` at the Pages project. The `/AI-content-ops-guide/*` Worker route keeps serving the toolbook.

Old addresses (`/projects`, `/blog.html`, …) are redirected in `public/_redirects`.

## Contact form

The form posts to a Google Apps Script web app: [`apps-script/contact-form.gs`](apps-script/contact-form.gs).

- Each enquiry is saved to the **Leads** tab of the Google Sheet first, then emailed to nutan@stacknarrative.com.
- The visitor only sees "sent" once the row is saved. If saving fails, the form offers to send it by email instead.
- The **Status** column shows `emailed`, or why the email didn't go out. Emails that couldn't be sent, for example because the daily quota ran out, are retried every hour.

Setup:

1. Using the Google account for nutan@stacknarrative.com, create a Google Sheet called "StackNarrative Leads".
2. Go to **Extensions > Apps Script**, replace the sample code with `apps-script/contact-form.gs`, and save.
3. Choose `setup` in the function dropdown, click **Run**, and allow access. This creates the Leads tab and the hourly retry.
4. Go to **Deploy > New deployment > Web app**. Set **Execute as** to Me and **Who has access** to Anyone, then click **Deploy**. Copy the URL, which ends in `/exec`.
5. Put the URL in `FORM_ENDPOINT` in `lib/site.ts` (or set `NEXT_PUBLIC_FORM_ENDPOINT`, which overrides it).

After you edit the script: go to **Deploy > Manage deployments**, click the pencil icon, choose **Version: New version**, and click **Deploy**. The URL stays the same.

## Photos

Stock photos in `public/img/` are from Pexels (free to use, no attribution required):

| File | Pexels photo |
|---|---|
| hero-marketer.jpg | https://www.pexels.com/photo/17489837/ |
| why-team.jpg | https://www.pexels.com/photo/7698912/ (Yan Krukau) |
| contact-call.jpg | https://www.pexels.com/photo/5956819/ (Katrin Bolovtsova) |
| agents-laptop.jpg | https://www.pexels.com/photo/39506543/ (quang vinh) |
| toolbook-desk.jpg | https://www.pexels.com/photo/1766604/ (Judit Peter) |
| blog-window.jpg | https://www.pexels.com/photo/17049747/ (Tran Nhu Tuan) |

`founder-nutan.jpg` is Nutan's own photo.

Client reviews live in `components/home/reviews.tsx` (`REVIEWS`). The section stays hidden until it has at least one real review.
