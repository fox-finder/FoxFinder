
import { IApplication } from 'types/application';

export function runLinkApp(app: IApplication): void {
  window.open(app.data)
}
