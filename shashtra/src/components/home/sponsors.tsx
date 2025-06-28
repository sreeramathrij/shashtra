"use client"

import React, { useRef, useEffect } from 'react'
import gsap from "gsap"
import Draggable from "gsap/Draggable"

gsap.registerPlugin(Draggable)

const Sponsors = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<gsap.core.Tween | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new ResizeObserver(() => {
      if (initializedRef.current) return

      const items = track.children
      const itemWidth = items[0]?.clientWidth || 0

      if (itemWidth === 0) return

      const totalItems = items.length
      const totalWidth = (itemWidth + 16) * (totalItems / 2) // +16 for gap-4

      gsap.set(track, { x: 0 })

      loopRef.current = gsap.to(track, {
        x: `-=${totalWidth / 2}`,
        duration: 10,
        ease: "linear",
        repeat: -1,
        yoyo: true
      })

      Draggable.create(track, {
        type: "x",
        bounds: { minX: -totalWidth / 2, maxX: 0 },
        edgeResistance: 0.75,
        inertia: true,
        onPress() {
          loopRef.current?.pause()
        },
        onRelease() {
          loopRef.current?.play()
        }
      })

      initializedRef.current = true
      observer.disconnect()
    })

    observer.observe(track)

    return () => {
      loopRef.current?.kill()
      observer.disconnect()
    }
  }, [])

  return (
    <div className='items-center justify-center gap-12 flex flex-col overflow-hidden'>
      <div className="flex items-center justify-center">
        <span className="text-5xl font-semibold">OUR SPONSORS</span>
      </div>

      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-y-4 gap-x-8">
        {["HFT PARTNER", "MEDIA PARTNER", "PLATINUM PARTNER", "GAMING PARTNER"].map((partner, index) => (
          <div key={`sponsor-static-${index}`} className='flex flex-col'>
            <div className="w-80 h-56 bg-muted-foreground border-2 border-accent rounded-md flex items-center justify-center">
              <span className="text-background font-semibold text-3xl">{`SPONSOR ${index + 1}`}</span>
            </div>
            <span className='text-3xl font-medium'>{partner}</span>
          </div>
        ))}
      </div>

      <div className='w-full overflow-hidden relative mt-18'>
        <div className="w-full overflow-hidden">
          <div ref={trackRef} className="flex gap-4 w-max">
            {[...Array(8)].flatMap((_, index) => (
              <div
                key={`sponsor-carousel-${index}`}
                className="w-48 h-30 bg-muted-foreground border-2 border-accent rounded-md flex items-center justify-center shrink-0"
              >
                <span className="text-background font-semibold text-xl">{`SPONSOR ${index + 5}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsors