import React from 'react';

const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
    <h1 className="text-3xl">DashBoard</h1>
    {children}
    </>
  )
}

export default layout