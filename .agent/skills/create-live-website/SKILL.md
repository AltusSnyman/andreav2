---
name: create-live-website
description: Automates the creation of a high-end Next.js website from scraped content and StitchMCP assets, including dependency management, AI image generation, and browser verification.
---

# Create Live Website Skill

This skill automates the end-to-end process of building a professional, high-end Next.js website. It ingests content from scraped Markdown files and design assets from a "Google Stitch" folder, applies premium UI/UX principles, generates custom images, and verifies the final build in a browser.

## Workflow

### 1. Analysis & Setup

1.  **Locate Source Content**:
    *   Find the target folder (e.g., `website-scrapes/<domain>`).
    *   Identify MD files: `home.md`, `about.md`, `services.md`, etc.
    *   Identify Stitch assets: Look for a `google-stitch-site` folder (or similar) containing `images/` and HTML/CSS files.
2.  **Consult Design Guidelines**:
    *   Read `.agent/skills/ui-ux-pro-max/SKILL.md` to understand high-end design principles (typography, spacing, glassmorphism, etc.).
    *   Extract the color palette and styling cues from the Stitch assets (HTML/CSS).
3.  **Initialize Project** (CRITICAL: Do this BEFORE starting any server):
    *   Create a new Next.js project: `npx create-next-app@latest ./website-scrapes/<domain>/live-site --typescript --eslint --tailwind --no-src-dir --app --import-alias "@/*"`.
    *   **Install Dependencies**: You MUST install all these dependencies immediately:
        ```bash
        npm install framer-motion lucide-react clsx tailwind-merge
        npm install -D @tailwindcss/postcss postcss
        ```
    *   **Configure Tailwind**: Ensure `tailwind.config.ts` (or CSS variables) matches the "Liquid Glass" and determined color palette.
    *   **Setup Global CSS**: Create `app/globals.css` with Tailwind v4 configuration, custom variables, and `@layer utilities` for glass effects.

### 2. Asset Generation

**Rule**: Every page needs at least **1 background image** (Hero) and **3 smaller images**.

1.  **Analyze Content for Imagery**: detailed prompts for `generate_image`.
2.  **Generate Images**:
    *   **Hero Backgrounds**: Create a unique, high-quality, 16:9 background image for the Hero section of *each* page (Home, About, Services, Contact).
    *   **Section Images**: Generate **3 additional images** per page relevant to the specific sections (e.g., specific services, team photos, gallery shots).
    *   *Tip*: Use the "Liquid Glass" aesthetic description in prompts ("dreamy, translucent, tropical, high-end, professional").
3.  **Save Assets**: Place all generated images in `public/images/`.

### 3. Development

1.  **Scaffold Components**:
    *   `Navbar`: Responsive, glassmorphism effect, sticky.
    *   `Footer`: Comprehensive, dark theme.
    *   `Hero`: Uses the generated background image, animated text (Framer Motion).
    *   `UI Components`: `Button.tsx` (variants), `Card.tsx`, etc.
2.  **Implement Pages**:
    *   Typically `app/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`.
    *   **Inject Content**: Use the text from the scraped `.md` files.
    *   **Inject Images**: Use the generated images in appropriate sections.
    *   **Styling**: Apply `ui-ux-pro-max` principles (whitespace, typography, contrast).

### 4. Verification & Debugging

**Goal**: Ensure the site is "visibly appealing and not just blank lines".

1.  **Build Check**: Run `npm run build` to catch type errors or missing dependencies. Fix any errors immediately.
2.  **Start Server**: Run `npm run dev`.
3.  **Browser Verification**:
    *   **Launch Browser**: Use the `browser_subagent` tool.
    *   **Visit Each Page**: Home, Services, About, Contact.
    *   **Inspect**: Check for console errors, broken images, or layout shifts.
    *   **Capture Evidence**: Take a **screenshot** of each page.
4.  **Updates**: If the design looks "terrible" or "blank", **STOP**. Refactor the styling, check `globals.css`, and re-verify.

### 5. Final Output

*   Return the verified project path.
*   Present the verification screenshots to the user.
*   Confirm readiness for Netlify deployment (ensure `build` script works).

## Usage Example

```text
User: "Create a live website for Darwin Landscapers based on the scraped content."
Agent:
1. Reads `website-scrapes/darwinlandscapers/*.md` & Stitch folder.
2. Installs Next.js + Tailwind + Framer Motion.
3. Generates 4 hero images + 12 section images.
4. Codes the site.
5. Verifies on localhost:3000 with screenshots.
```
