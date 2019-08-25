
import { Application } from 'engines/application'

export function runLinkApp(app: Application): void {
  window.open(app.$.data)
}
