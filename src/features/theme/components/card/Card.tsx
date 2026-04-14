import { M3eCard } from '@m3e/react/card'
import type { ComponentProps, PropsWithChildren } from 'react'
import { ThemeCardActions } from './CardActions'
import { ThemeCardContent } from './CardContent'
import { ThemeCardFooter } from './CardFooter'
import { ThemeCardHeader } from './CardHeader'

export type ThemeCardProps = PropsWithChildren & ComponentProps<typeof M3eCard> & {}

export const ThemeCard = ({ children, ...props }: ThemeCardProps) => {
  return <M3eCard {...props}>{children}</M3eCard>
}

export const Card = ThemeCard as typeof ThemeCard & {
  Actions: typeof ThemeCardActions
  Content: typeof ThemeCardContent
  Footer: typeof ThemeCardFooter
  Header: typeof ThemeCardHeader
}

Card.Actions = ThemeCardActions
Card.Content = ThemeCardContent
Card.Footer = ThemeCardFooter
Card.Header = ThemeCardHeader
