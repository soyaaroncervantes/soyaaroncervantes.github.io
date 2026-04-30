import { describe, expect, it } from 'vitest'
import { MailtoNavItemModel } from '../../models/MailtoNavItemModel'

describe('MailtoNavItemModel', () => {
  it('builds mailto href with email only', () => {
    const model = new MailtoNavItemModel({
      id: 'mail',
      icon: 'email',
      email: 'me@soyaaroncervantes.com',
    })

    expect(model.toAnchorAttrs()).toEqual({
      href: 'mailto:me@soyaaroncervantes.com',
    })
  })

  it('adds subject and body through search params', () => {
    const model = new MailtoNavItemModel({
      id: 'mail',
      icon: 'email',
      email: 'me@soyaaroncervantes.com',
      subject: 'Hello',
      body: 'How are you?',
    })

    expect(model.toAnchorAttrs().href).toContain('subject=Hello')
    expect(model.toAnchorAttrs().href).toContain('body=How+are+you%3F')
  })

  it('encodes special characters in params', () => {
    const model = new MailtoNavItemModel({
      id: 'mail',
      icon: 'email',
      email: 'me@soyaaroncervantes.com',
      subject: 'Hola & Bienvenido',
      body: '¿Qué tal?',
    })

    expect(model.toAnchorAttrs().href).toContain('subject=Hola+%26+Bienvenido')
    expect(model.toAnchorAttrs().href).toContain('body=%C2%BFQu%C3%A9+tal%3F')
  })
})
