"use client"
import React from 'react'

export default function UserProfile({ params }: any) {
    const { id } = React.use(params);

    return (
        <div className="flex flex-col items-center p-6 justify-center min-h-screen ">
            <h1>Profile</h1>
            <hr />
            <p className='text-4xl'>Profile Page: {id} </p>
        </div>
    );
}
    