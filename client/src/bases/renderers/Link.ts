
import { App } from 'stores/application';

export function runLinkApp(app: App): void {
  window.open(app.$.data)
}
