import React from 'react'

const CommonSection = ({ title }) => {
    return (
        <section className='pt-40 bg-CommonBg bg-cover py-16 '>
            <div className='flex items-center justify-center'>
                <h1 className='text-white text-3xl uppercase'>{title}</h1>
            </div>
        </section>
    )
}

export default CommonSection