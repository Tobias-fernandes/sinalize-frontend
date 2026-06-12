const SESSION_KEY = 'sinalize_session'

export interface SavedSession {
  roomCode: string
  nickname: string
}

export function saveSession(session: SavedSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // localStorage unavailable (SSR, private mode, etc.)
  }
}

export function loadSession(): SavedSession | null {
  try {
    const data = localStorage.getItem(SESSION_KEY)
    return data ? (JSON.parse(data) as SavedSession) : null
  } catch {
    return null
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}
