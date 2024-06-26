"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  handleClick,
  
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  handleClick?:any
  sendDataToBitrix? :any
}) {
  const { pending } = useFormStatus()

  return (
    <Button
    size="large"
    className={className}
    type="submit" // Изменение типа кнопки на "button"
    isLoading={pending}
    variant={variant}
    onClick={handleClick} // Используем handleClick вместо sendDataToBitrix
  >
    {children}
  </Button>
  )
}
