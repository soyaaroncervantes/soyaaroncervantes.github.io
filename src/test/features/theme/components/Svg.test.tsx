import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeSvg } from '@/features/theme/components/Svg'

describe('ThemeSvg', () => {
  it('renders use element with default href and id', () => {
    // Arrange & Act
    render(<ThemeSvg id="github" data-testid="svg-github" />)

    // Assert
    const svg = screen.getByTestId('svg-github')
    const useElement = svg.querySelector('use')
    expect(useElement).toHaveAttribute('href', '/icons.svg#github')
  })

  it('renders use element with custom href', () => {
    // Arrange & Act
    render(<ThemeSvg id="linkedin" href="/custom-icons.svg" data-testid="svg-linkedin" />)

    // Assert
    const svg = screen.getByTestId('svg-linkedin')
    const useElement = svg.querySelector('use')
    expect(useElement).toHaveAttribute('href', '/custom-icons.svg#linkedin')
  })

  it('applies color style when provided', () => {
    // Arrange & Act
    render(<ThemeSvg id="github" color="red" data-testid="svg-colored" />)

    // Assert
    const svg = screen.getByTestId('svg-colored')
    expect(svg).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })

  it('propagates aria-label and other standard SVG props', () => {
    // Arrange & Act
    render(
      <ThemeSvg
        id="github"
        aria-label="GitHub Icon"
        data-testid="svg-custom"
        className="custom-class"
      />
    )

    // Assert
    const svg = screen.getByTestId('svg-custom')
    expect(svg).toHaveAttribute('aria-label', 'GitHub Icon')
    expect(svg).toHaveClass('custom-class')
  })
})
