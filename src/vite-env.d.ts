/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT

  readonly VITE_CHAT_BOT
  readonly VITE_CHAT_BOT2
  readonly VITE_GEMINI_API_KEY
  readonly VITE_API_AI_URL

  readonly VITE_MEETING_TOKEN
  readonly VITE_MEETING_ID
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
