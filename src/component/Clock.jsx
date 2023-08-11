import React, { useState, useEffect } from 'react'

const Clock = () => {

    const [days, setDays] = useState()
    const [jam, setJam] = useState()
    const [menit, setMenit] = useState()
    const [detik, setDetik] = useState()

    let interval;
    const countdown = () => {
        const waktu = new Date('August 20, 2023')
        interval = setInterval(() => {
            const now = new Date().getTime()
            const beda = waktu - now
            const days = Math.floor(beda / (1000 * 60 * 60 * 24))
            const jam = Math.floor(beda % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const menit = Math.floor(beda % (1000 * 60 * 60) / (1000 * 60))
            const detik = Math.floor(beda % (1000 * 60) / 1000)

            if (waktu < 0) clearInterval(interval.current)
            else {
                setDays(days)
                setJam(jam)
                setMenit(menit)
                setDetik(detik)
            }
        })
    }
    useEffect(() => {
        countdown()
    })
    return (

        <div className='text-white py-4'>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col">
                    <span className="font-mono text-4xl">
                        <span>{days}</span>
                    </span>
                    days
                </div>
                <span className='text-3xl pt-2'>:</span>
                <div className="flex flex-col">
                    <span className="font-mono text-4xl">
                        <span>{jam}</span>
                    </span>
                    hours
                </div>
                <span className='text-3xl pt-2'>:</span>
                <div className="flex flex-col">
                    <span className="font-mono text-4xl">
                        <span>{menit}</span>
                    </span>
                    min
                </div>
                <span className='text-3xl pt-2'>:</span>
                <div className="flex flex-col">
                    <span className="font-mono text-4xl">
                        <span className='text-white'>{detik}</span>
                    </span>
                    sec
                </div>
            </div>
        </div>
    )
}

export default Clock
