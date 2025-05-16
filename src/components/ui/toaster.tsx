"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { ShoppingCart, AlertTriangle, Info, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  // Fungsi helper untuk mendapatkan ikon berdasarkan variant
  const getToastIcon = (variant: string | undefined) => {
    switch (variant) {
      case 'success':
        return <ShoppingCart className="h-5 w-5 text-green-500" />
      case 'destructive':
        return <XCircle className="h-5 w-5 text-destructive" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      default:
        return <Info className="h-5 w-5 text-primary" />
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Pastikan variant memiliki nilai yang valid untuk properti variant pada Toast
        const safeVariant = variant as "default" | "destructive" | "success" | "warning" | undefined;
        
        return (
          <Toast 
            key={id} 
            {...props} 
            variant={safeVariant}
            className={cn(
              "animate-slide-in-top", 
              props.className
            )}
          >
            <div className="flex gap-3">
              <div className="mt-1 flex-shrink-0">
                {getToastIcon(variant as string)}
              </div>
              <div className="grid gap-1 flex-grow">
                {title && <ToastTitle className="font-semibold text-base">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-sm">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
