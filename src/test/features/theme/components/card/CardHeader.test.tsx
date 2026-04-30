import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeCardHeader } from '@/features/theme/components/card/CardHeader'

describe('ThemeCardHeader', () => {
  it('renders children', () => {
    render(<ThemeCardHeader>Card Title</ThemeCardHeader>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('projects content into the M3E "header" slot', () => {
    render(<ThemeCardHeader>Title</ThemeCardHeader>)
    expect(screen.getByText('Title')).toHaveAttribute('slot', 'header')
  })

  it('forwards HTML props to the wrapper element', () => {
    render(<ThemeCardHeader aria-label="card title">Title</ThemeCardHeader>)
    expect(screen.getByText('Title')).toHaveAttribute('aria-label', 'card title')
  })

  it('forwards className prop', () => {
    render(<ThemeCardHeader className="card-title-lg">Title</ThemeCardHeader>)
    expect(screen.getByText('Title')).toHaveClass('card-title-lg')
  })
})
