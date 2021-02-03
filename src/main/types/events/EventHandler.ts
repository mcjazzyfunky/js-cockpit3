type EventHandler<E extends { type: string }> =
  (ev: E) => void

export default EventHandler
