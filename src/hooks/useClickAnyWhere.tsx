// https://usehooks-ts.com/react-hook/use-click-any-where

import useEventListener from "@hooks/useEventListener"

type Handler = (event: MouseEvent) => void

function useClickAnyWhere(handler: Handler) {
  useEventListener("click", (event: MouseEvent) => {
    handler(event)
  })
}

export default useClickAnyWhere
