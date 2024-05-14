/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT

  readonly VITE_CHAT_BOT

  readonly VITE_MEETING_TOKEN
  readonly VITE_MEETING_ID
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
