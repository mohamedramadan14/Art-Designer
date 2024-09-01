"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useFailModal } from "@/features/subscription/store/use-fail-modal"
import { useSuccessModal } from "@/features/subscription/store/use-success-modal"


export const SubscriptionAlert = () => {
    const {onOpen: onOpenFail} = useFailModal()
    const {onOpen: onOpenSuccess} = useSuccessModal()
    const params = useSearchParams() 
    const cancelled = params.get("cancelled")
    const success = params.get("success")

    useEffect(() => {
        if (cancelled) {
            onOpenFail()
        }
        if (success) {
            onOpenSuccess()
        }
    }, [cancelled , onOpenFail , onOpenSuccess, success])
    
    return null
}
