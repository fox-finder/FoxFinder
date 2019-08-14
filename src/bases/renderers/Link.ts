
import { IRuntimeApplication } from 'types/application';

export function runLinkApp(app: IRuntimeApplication): void {
  window.open(app.data)
}
