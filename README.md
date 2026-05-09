# contentful-app-ai-reference-field

> A Contentful UI app that pairs a richer reference-field editor with an AnswerAI / Flowise chat assistant. Editors get a custom toolbar with the field's chat dialog wired up to a Flowise chatflow that receives the current field value as context.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **At a glance** — A Contentful App that registers four UI extension locations (Field, Sidebar, Dialog, ConfigScreen) and ships:
>
> - A **rich reference-field editor** for `Link` and array-of-link fields with a custom toolbar and MDX-based long-text editing
> - A **"Chat with field"** action that opens a full-page Flowise chat dialog with the current field value injected as `current_content` prompt context — for AI-assisted content drafting, feedback, or rewrites against editorial guidelines
> - **Per-installation chatflow config** via the ConfigScreen — `chatflowId` and `apiHost` are saved as Contentful app installation parameters and read at runtime, so the same app installation can be repointed at any AnswerAI / Flowise instance without a rebuild
> - Smaller affordances: a **show-default-field** toggle (swap back to Contentful's stock editor), a **toggle-search** action, and a **feedback** button
>
> Built with Vite + React 18, `@contentful/app-sdk` + `@contentful/react-apps-toolkit`, `@contentful/f36-components` (Forma 36), `@contentful/field-editor-*`, `@mdxeditor/editor`, and `aai-embed-react` for the embedded chat.

## What it looks like

Four locations:

| Location | What renders |
|---|---|
| **Entry Field** | The reference-field editor (single or multi) when applied to a `Link`/array-of-link field, an MDX editor when applied to a `Text` (long-text) field, or a wrapped Contentful default editor otherwise. Toolbar above the editor exposes ChatBot, Feedback, and Show-default-field actions. |
| **Entry Sidebar** | When invoked from the chat button, opens a full-page `<FullPageChat>` from `aai-embed-react` configured with the current field value as `chatflowConfig.promptValues.current_content`. |
| **Dialog** | Used as the host surface for the chat dialog so it can be sized and styled independently of the field. |
| **App Config** | Form for setting `chatflowId` (required) and `apiHost` (optional). |

## Installation in Contentful

This is a custom Contentful App, distributed by uploading a built bundle to your Contentful organization and installing it on a space.

### 1. Clone + install

```bash
git clone https://github.com/spindle79/contentful-app-ai-reference-field.git
cd contentful-app-ai-reference-field
nvm use     # Node 24 (see .nvmrc)
npm install
```

### 2. Create the app definition (one-time)

```bash
npm run create-app-definition
```

This walks you through Contentful's CLI prompts to create a new app definition under your org, choose which locations to expose (Field, Sidebar, Dialog, Config Screen), and which field types to allow on the Field location (Link, Array-of-Link, Text).

### 3. Build + upload

```bash
npm run build
npm run upload
```

The CLI prompts for org id, app definition id, and a personal access token, then activates the bundle.

For CI:

```bash
npm run upload-ci
# requires: CONTENTFUL_ORG_ID, CONTENTFUL_APP_DEF_ID, CONTENTFUL_ACCESS_TOKEN env vars
```

### 4. Install on a space

In the Contentful web app, go to **Apps → Manage Apps**, find your app, and install it. On the install screen you'll see the **Chatflow ID** (required) and **API Host** (optional) fields — fill them in and save.

### 5. Wire to fields

For each Content Type → Field that should use this editor, edit the field appearance and pick "AI Reference Field" (or whatever name you gave the app definition).

## Configuration

The app config screen exposes two installation parameters:

| Parameter | Required | Description |
|---|---|---|
| `chatflowId` | Yes | The Flowise / AnswerAI chatflow ID. Find it in the Flowise dashboard URL bar after opening a chatflow. |
| `apiHost` | No | Your Flowise / AnswerAI API host URL. Leave blank to use the `aai-embed` default. Set to your self-hosted Flowise instance URL when running privately. |

Both values are stored as Contentful app installation parameters (per-organization+space), read at runtime by `ChatBotAction.tsx` and `ChatFullPage.tsx`. No rebuild needed when you change them.

If `chatflowId` is missing, the chat button shows an error notification rather than opening a broken dialog. The dialog itself also guards against missing config and renders an inline message.

## Project layout

```
contentful-app-ai-reference-field/
├── index.html                       # Vite entry HTML
├── vite.config.ts                   # Vite + React + happy-dom test setup
├── tsconfig.json
├── src/
│   ├── index.tsx                    # createRoot + SDKProvider mount
│   ├── App.tsx                      # location → component dispatch
│   ├── styles.css
│   ├── react-app-env.d.ts
│   ├── vite-env.d.ts
│   ├── setupTests.ts
│   ├── contexts/
│   │   └── AppContext.tsx           # shared state (showDefaultField, isExpanded, etc.) + CMA client + content types
│   ├── locations/
│   │   ├── ConfigScreen.tsx         # chatflowId + apiHost form
│   │   ├── ConfigScreen.spec.tsx
│   │   ├── Field.tsx                # location: ENTRY_FIELD
│   │   ├── Field.spec.tsx
│   │   ├── Dialog.tsx               # location: DIALOG
│   │   └── Sidebar.tsx              # location: ENTRY_SIDEBAR (also handles chat dialog dispatch)
│   ├── components/
│   │   ├── ReferenceEditor.tsx      # router for single vs multi reference
│   │   ├── SingleReferenceEditor.tsx
│   │   ├── MultipleReferenceEditor.tsx
│   │   ├── EntryCard.tsx
│   │   ├── FieldWrapper.tsx         # toolbar slot + body
│   │   ├── Toolbar.tsx              # renders configured toolbar actions
│   │   ├── ChatFullPage.tsx         # FullPageChat from aai-embed-react
│   │   ├── DialogWrapper.tsx
│   │   ├── LongTextEditor.tsx       # alt long-text editor (currently disabled in Field.tsx)
│   │   ├── LocalhostWarning.tsx     # dev-only warning when app is loaded outside Contentful
│   │   ├── MDX/
│   │   │   ├── LRMarkdown.tsx       # @mdxeditor/editor wrapper used for Text fields
│   │   │   ├── _boilerplate.tsx     # MDX plugin boilerplate (image, video, etc.)
│   │   │   └── dark-editor.css      # MDX editor dark theme
│   │   └── toolbarActions/
│   │       ├── ChatBotAction.tsx    # opens chat dialog with installation params
│   │       ├── ShowDefaultFieldAction.tsx
│   │       ├── ToggleSearchAction.tsx
│   │       ├── RefreshAction.tsx
│   │       └── Feedback.tsx
│   └── utils/
│       ├── messaging.tsx
│       ├── entryUtils.ts            # CMA client + content-type fetching
│       ├── referenceEditorUtils.ts
│       ├── shortTextField.ts
│       ├── sidebar.ts
│       └── field/{getCurrentValue,isArrayField}.ts
└── test/
    └── mocks/
        ├── index.ts
        ├── mockCma.ts
        └── mockSdk.ts
```

## How the chat integration works

```
┌──────────────────────────────────────────────────────────────┐
│  Field location (toolbar in entry editor)                     │
│   └── ChatBotAction                                            │
│       reads sdk.parameters.installation.{chatflowId, apiHost}  │
│       opens dialog via sdk.dialogs.openCurrentApp({…})         │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│  Sidebar / Dialog location                                    │
│   reads source === "chatButton" from invocation params         │
│   renders <DialogWrapper><ChatFullPage … /></DialogWrapper>   │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│  ChatFullPage                                                 │
│   <FullPageChat                                                │
│     chatflowid={invocationParams.chatflowid}                   │
│     apiHost={invocationParams.apiHost}                         │
│     chatflowConfig={ promptValues: { current_content: … } }    │
│   />                                                           │
│   from aai-embed-react                                         │
└──────────────────────────────────────────────────────────────┘
```

The current field value flows in as `chatflowConfig.promptValues.current_content`, so a chatflow can reference `{{current_content}}` in its prompt template to use the in-progress draft as grounding context.

## Tech stack

- **Vite 5** (with `@vitejs/plugin-react`) + **TypeScript 5** strict
- **React 18**
- **Contentful SDKs**: `@contentful/app-sdk`, `@contentful/react-apps-toolkit`, `@contentful/f36-components` (Forma 36), `@contentful/default-field-editors`, `@contentful/field-editor-reference`, `@contentful/field-editor-markdown`, `contentful-management`
- **MDX**: `@mdxeditor/editor`
- **AI chat**: `aai-embed`, `aai-embed-react` ([AnswerAI](https://theanswer.ai/) — open-source Flowise distribution)
- **Tests**: Vitest + Testing Library + happy-dom

## Origin

Originally built for a personal LastRev / AnswerAI integration, with a hardcoded chatflow ID and API host pointing at an internal Flowise instance. The standalone version moves both values to the ConfigScreen as installation parameters, so the same app artifact works for any AnswerAI / Flowise chatflow without a rebuild.

## License

[MIT](LICENSE) © Adam Harris
