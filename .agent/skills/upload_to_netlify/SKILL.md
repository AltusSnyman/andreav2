---
name: upload_to_netlify
description: Automates the process of preparing, configuring, and deploying a Next.js App Router project to Netlify using their MCP and Serverless Functions capabilities.
---

# Upload to Netlify Skill

This skill handles the end-to-end process of taking a local Next.js project and deploying it confidently to a Netlify site using the Netlify MCP server. 

We will structure this workflow into distinct phases. Keep this skill updated as we discover more deployment best practices.

## Phase 1: Site Preparation & Serverless Compatibility

Before any code is deployed, we must ensure the Next.js application is strictly compatible with Netlify's execution environment, particularly their serverless functions and environment variables.

### 1. Install Dependencies
**Goal**: Provide access to Netlify's specific serverless capabilities.
- Install `@netlify/functions`: Run `npm install @netlify/functions` in the root of the project.

### 2. Configure Next.js for Static Export
**Goal**: Since `@netlify/plugin-nextjs` relies heavily on caching which fails gracefully on USB drives with AppleDouble files, and our backend is now decoupled, we will compile Next.js permanently to static HTML.
- Open `next.config.ts`.
- Add `output: "export"` and `images: { unoptimized: true }` to bypass edge runtime image processing errors on static sites.

### 3. Configure `netlify.toml`
**Goal**: Explicitly define the build commands and output directories.
- Create a `netlify.toml` file in the root of the project.
- Content must explicitly state to publish the `out` directory:
  ```toml
  [build]
    command = "npm run build"
    publish = "out"

  [functions]
    directory = "netlify/functions"
  ```

### 3. Refactor API Routes to Netlify Functions
**Goal**: Standard Next.js Route Handlers (`app/api/...`) may have unpredictable access to environment variables in edge runtimes. We explicitly migrate them to Netlify Serverless Functions to utilize the `Netlify.env` global.
1. Create the `netlify/functions` directory.
2. For any dynamic Next.js API endpoint (e.g., retrieving an OpenAI session key), move the logic to a `.mts` file in the functions folder (e.g., `netlify/functions/session.mts`).
3. **Environment Variables**: Update `process.env.KEY_NAME` to `Netlify.env.get("KEY_NAME")`. Note: `process.env` might still be used if `Netlify.env` is not available locally, but prefer `Netlify.env.get` for strict Netlify compatibility.
4. **Function Configuration**: To avoid breaking frontend fetch paths, use the exported `config` object to mask the Next.js path:
   ```typescript
   export const config: Config = {
       path: "/api/session" // Frontend continues fetching /api/session without knowing it shifted to a Netlify function!
   };
   ```
5. **Delete Old Routes**: Remove the obsolete Next.js API route folders (e.g., delete `app/api/session`).

### 4. Build Verification
**Goal**: Check for compilation errors due to shifting API routes out of the Next.js App Router.
1. Run `npm run build`.
2. Ensure there are no statically analyzed routing errors and the Build succeeds.

## Phase 2: Project Creation & Environment Linking (MCP)

With the codebase prepared and configured, we use the Netlify MCP server to securely provision the cloud infrastructure.

1. **Create the Project**: Use the `netlify-project-services-updater` tool with the `create-new-project` operation. Provide a suitable `name` for the project. The tool will return a `site_id`.
2. **Link the Local Environment**: In the terminal, run `npx netlify link --id <site_id>` from the root of the project to cleanly attach the local environment to the newly created remote site.
3. **Configure Environment Variables**: 
   - Never commit literal `.env` files.
   - For all sensitive credentials (like `OPENAI_API_KEY`), use the terminal to securely inject them into the Netlify build environment so the newly created Serverless Functions can access them.
   - Command: `npx netlify env:set VARIABLE_NAME variable_value`. 
   - Note: For setting environment variables, prioritize the Netlify CLI over the MCP tool as it handles complex, multi-line string assignments seamlessly without complex JSON payload wrappers.

## Phase 3: Deployment (MCP)

With the environment securely configured and the codebase validated, we kick off the cloud build.

1. **Pre-flight Cleanup (CRITICAL)**: MacOS silently creates hidden `._*` AppleDouble metadata files when working with external drives or zipped content. Netlify's bundler will crash with `Unexpected "\x00"` if it attempts to upload or compile these binary tracker files.
   - Run `find . -name "._*" -delete` in the terminal at the root of the project to globally purge all of these MacOS hidden files *before* deploying.
2. **Deploy the Site**: Use the `netlify-deploy-services-updater` tool with the `deploy-site` operation. Provide the absolute path to the project directory (`deployDirectory`) and the `siteId` obtained from Phase 2.
3. **Retrieve the Live URL**: The deployment operation will return a `deployId`. Optionally, use the `netlify-deploy-services-reader` with the `get-deploy` operation to monitor the build status. Once complete, present the `ssl_url` (e.g., `https://project-name.netlify.app`) directly to the user so they can test their live application.
