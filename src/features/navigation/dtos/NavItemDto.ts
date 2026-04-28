import type { RegisteredRouter, ValidateNavigateOptions } from '@tanstack/react-router'

// Tipo alias para simplificar — extrae solo la ruta
export type NavRoute = ValidateNavigateOptions<RegisteredRouter>['to']

export type NavItemDto = {
  id: string // ID único — requerido para keys en React
  icon: string
  to: NavRoute // solo rutas registradas, type-safe
}
