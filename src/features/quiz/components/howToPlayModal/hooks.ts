import { useCallback, useEffect } from "react";
import { IHowToPlayModalProps } from "./types";

const useHowToPlayModal = ({ open, onOpenChange }: IHowToPlayModalProps) => {

    const handleChangeModal = useCallback(() => {
        if (!open) {
            return
        }

        const onEscapePress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onOpenChange(false)
            }
        }

        window.addEventListener("keydown", onEscapePress)

        return () => {
            window.removeEventListener("keydown", onEscapePress)
        }
    }, [open, onOpenChange])

    useEffect(() => {
        handleChangeModal()
    }, [handleChangeModal])

    return {

    }
}

export default useHowToPlayModal;