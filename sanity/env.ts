export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-21'

export const dataset = 'production'
export const projectId = '5jspd31o'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
