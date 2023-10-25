interface Fathom {
  (command: string, ...args: any[]): void
  q?: Array<any>
}

interface Window {
  fathom?: Fathom
}
