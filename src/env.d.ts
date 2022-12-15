/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPLICATION_NAME: string;
  readonly VITE_STORAGE_PREFIX: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_PASSWORD_MIN_LENGTH: number;
  readonly VITE_PASSWORD_MAX_LENGTH: number;
  readonly VITE_POSTCAPTION_MAX_LENGTH: number;
  readonly VITE_ROUTER_BASENAME: string;
  readonly VITE_GITHUB_REPO_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
