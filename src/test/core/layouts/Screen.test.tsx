import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import layouts from '@/core/layouts/layout.module.css'
import { ScreenLayout } from '@/core/layouts/Screen'

describe('ScreenLayout', () => {
  it('renders a div element', () => {
    // Arrange & Act
    const { container } = render(<ScreenLayout />)

    // Assert
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('applies the screen CSS class', () => {
    // Arrange & Act
    const { container } = render(<ScreenLayout />)

    // Assert
    expect(container.firstChild).toHaveClass(layouts.screen)
  })

  it('merges an external className alongside the screen class', () => {
    // Arrange & Act
    const { container } = render(<ScreenLayout className="custom-class" />)

    // Assert
    expect(container.firstChild).toHaveClass(layouts.screen)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders children', () => {
    // Arrange & Act
    render(<ScreenLayout>Hello Screen</ScreenLayout>)

    // Assert
    expect(screen.getByText('Hello Screen')).toBeInTheDocument()
  })

  it('forwards extra HTML attributes to the div', () => {
    // Arrange & Act
    const { container } = render(<ScreenLayout id="screen-layout" />)

    // Assert
    expect(container.firstChild).toHaveAttribute('id', 'screen-layout')
  })
})
