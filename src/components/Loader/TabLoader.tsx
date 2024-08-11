import clsx from 'clsx'
import { Overlay } from './Overlay'
import { LoadingBar } from './LoadingBar'


export function TabLoader({
  visible,
  overlayOnly = false,
  offset = 32,
}: {
  visible: boolean
  overlayOnly?: boolean
  offset?: number
}) {
  return (
    <>
      <Overlay visible={visible} />
      {!overlayOnly && (
        <div
          style={{
            top: `${offset}px`,
          }}
          className={clsx(
            `absolute z-10 left-1/2 -translate-x-1/2`,
            visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          aria-hidden={!visible}
        >
          <LoadingBar visible={visible} />
        </div>
      )}
    </>
  )
}
