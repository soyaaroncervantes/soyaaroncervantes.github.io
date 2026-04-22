import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BaseLayout } from '@/core/layouts/Base'
import layouts from '@/core/layouts/layout.module.css'

describe('BaseLayout', () => {
  it('renders a div element', () => {
    // Arrange & Act
    const { container } = render(<BaseLayout />)

    // Assert
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('applies the base CSS class', () => {
    // Arrange & Act
    const { container } = render(<BaseLayout />)

    // Assert
    expect(container.firstChild).toHaveClass(layouts.base)
  })

  it('applies the palette CSS class', () => {
    // Arrange & Act
    const { container } = render(<BaseLayout />)

    // Assert
    expect(container.firstChild).toHaveClass(layouts.palette)
  })

  it('merges an external className alongside base classes', () => {
    // Arrange & Act
    const { container } = render(<BaseLayout className="custom-class" />)

    // Assert
    expect(container.firstChild).toHaveClass(layouts.base)
    expect(container.firstChild).toHaveClass(layouts.palette)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders children', () => {
    // Arrange & Act
    render(<BaseLayout>Hello Base</BaseLayout>)

    // Assert
    expect(screen.getByText('Hello Base')).toBeInTheDocument()
  })

  it('forwards extra HTML attributes to the div', () => {
    // Arrange & Act
    const { container } = render(<BaseLayout data-testid="base-layout" />)

    // Assert
    expect(container.firstChild).toHaveAttribute('data-testid', 'base-layout')
  })
})
