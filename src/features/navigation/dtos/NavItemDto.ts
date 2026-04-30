import type { RegisteredRouter, ValidateNavigateOptions } from '@tanstack/react-router'

export type NavRoute = ValidateNavigateOptions<RegisteredRouter>['to']

export type NavItemDto = {
  id: string
  icon: string
}
