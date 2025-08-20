export interface ConsentChoices {
  necessary: boolean
  preferences: boolean
  statistics: boolean
  marketing: boolean
}

interface AxeptioSettings {
  clientId: string
  cookiesVersion: string
}

export interface Axeptio {
  on(event: string, callback: (choices: ConsentChoices) => void): void
  off(event: string): void
}

declare global {
  interface Window {
    axeptio?: Axeptio
    axeptioSettings?: AxeptioSettings
    _axcb?: Array<(axeptio: Axeptio) => void>
  }
}
