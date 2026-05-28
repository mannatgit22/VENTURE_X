import React from 'react'

const ping = () => {
  return (
    <div className="relative">
      <div className="absolute -top-[-5px] -left-4.5">
        <span className="flex size-[11px]">

          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>

          <span className="relative inline-flex size-[11px] rounded-full bg-red-500"></span>

        </span>
      </div>
    </div>
  )
}

export default ping