export function Container({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden pt-16">{children}</div>
    </div>
  )
}

export default Container
