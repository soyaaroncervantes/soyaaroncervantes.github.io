import type { MailtoNavItemDto } from '../dtos/MailtoNavItemDto'
import { AnchorNavItemModel } from './AnchorNavItemModel'

export class MailtoNavItemModel extends AnchorNavItemModel {
  constructor({ id, icon, email, subject, body }: MailtoNavItemDto) {
    const url = new URL(`mailto:${email}`)

    if (subject) {
      url.searchParams.set('subject', subject)
    }

    if (body) {
      url.searchParams.set('body', body)
    }

    super({ id, icon, url })
  }

  protected override expectedScheme(): string {
    return 'mailto:'
  }
}
