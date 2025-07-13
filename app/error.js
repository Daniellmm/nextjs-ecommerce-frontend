'use client'
 
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}