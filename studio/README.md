# DKGRFX — Sanity Content Studio

The visual management console for **DKGRFX Portfolio & Event Galleries**.

- **Deployed Cloud Studio:** [https://dkgrfx.sanity.studio](https://dkgrfx.sanity.studio)
- **Project ID:** `1nddltrp`
- **Dataset:** `production`

---

## 🛠️ Commands

| Command | Action |
|---|---|
| `npm run dev` | Start local development server at `http://localhost:3333` |
| `npm run build` | Build the Studio for deployment |
| `npm run deploy` | Deploy changes directly to `https://dkgrfx.sanity.studio` |
| `npm run typegen` | Extract schemas & generate TypeScript types for `DK-Portfolio` |

---

## 📁 Studio Content Structure

```text
📁 Content
│
├── 🏠 Landing Page (Home)
│   ├── ⚡ Hero Section (Banner & Headlines)       ← Singleton: Headline, Slides & CTAs
│   ├── ✨ Creative Signature (Photo → Sketch → Art) ← Singleton: 3 Process Steps & Images
│   ├── 🖼️ Selected Work (Featured Projects)
│   ├── 🏛️ The Practice (3 Visual Pillars with Images)
│   └── 📅 Event Highlights (Featured Albums)
│
├── 📁 Inner Pages
│   ├── 🖼️ /work Page (All Portfolio Projects)
│   ├── 📋 /services Page (Packages & Checklist)
│   ├── 🎨 /services Page — Art Prints & Merch (Own the Art)
│   └── 📅 /events Page (All Client Galleries)
```

---

## 👥 Managing Client Access & Roles

1. Go to [https://www.sanity.io/manage/project/1nddltrp](https://www.sanity.io/manage/project/1nddltrp).
2. Navigate to **Members** (or **Access**).
3. Click **Invite new member**:
   - Enter your client's email address.
   - Choose the **Editor** role (enables full content editing & photo uploads while protecting project configuration).
4. Send invitation. The client can log in with Google or Email.
