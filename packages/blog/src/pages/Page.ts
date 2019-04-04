export interface Page {
  render(): string

  title: string

  description?: string
}
