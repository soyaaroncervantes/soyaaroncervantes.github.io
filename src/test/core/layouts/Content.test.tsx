import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContentLayout } from '@/core/layouts/Content'
import layouts from '@/core/layouts/layout.module.css'

describe('ContentLayout', () => {
  it('renders a main element', () => {
    // Arrange & Act
    const { container } = render(<ContentLayout />)

    // Assert
    expect(container.firstChild?.nodeName).toBe('MAIN')
  })

  it('applies the content CSS class', () => {
    // Arrange & Act
    const { container } = render(<ContentLayout />)

    // Assert
    expect(container.firstChild).toHaveClass(layouts.content)
  })

  it('merges an external className alongside the content class', () => {
    // Arrange & Act
    const { container } = render(<ContentLayout className="custom-class" />)

    // Assert
    expect(container.firstChild).toHaveClass(layouts.content)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders children', () => {
    // Arrange & Act
    render(<ContentLayout>Hello Content</ContentLayout>)

    // Assert
    expect(screen.getByText('Hello Content')).toBeInTheDocument()
  })

  it('forwards extra HTML attributes to the main element', () => {
    // Arrange & Act
    render(<ContentLayout aria-label="main content" />)

    // Assert
    expect(screen.getByRole('main')).toHaveAttribute('aria-label', 'main content')
  })
})
