import React from 'react'

const page = async ({ params }: { params: { id: string }}) => {
  const { id } = await params;
  return (
    <h1 className="text-3xl">Users Detail Page : {id}</h1>
  )
}

export default page