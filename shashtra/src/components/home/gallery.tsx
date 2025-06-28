"use client"

import gsap from 'gsap'
import React, { useRef, useEffect, useState } from 'react'

const Gallery = () => {

  const activeRef = useRef<HTMLElement>(null);

  const handleHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;

    if (activeRef.current && activeRef.current !== el) {
      gsap.killTweensOf(activeRef.current);
      gsap.to(activeRef.current, {
        zIndex: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
      })
      
    }

    activeRef.current = el;
    gsap.killTweensOf(el);
    gsap.to(el, {
      zIndex: 50,
      scale: 4,
      duration: 1.5,
      ease: "power3.inOut",
    })
  }

  const handleLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;

    if(activeRef.current === el){
      gsap.killTweensOf(el);
      gsap.to(e.currentTarget, {
        zIndex: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if(activeRef.current === el) activeRef.current = null;
        }
      })
    }
  }

  useEffect(() => {
    const OnDocMouseLeave = () => {
      const active = activeRef.current;
      if( active ) {
        gsap.killTweensOf(active);
        gsap.to(active, {
          zIndex: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.in',
        })
        activeRef.current = null;
      }
    };

    document.addEventListener("mouseleave", OnDocMouseLeave);
    return () => document.removeEventListener("mouseleave", OnDocMouseLeave);
  }, []);

  return (
    <div className='relative size-full items-center justify-center gap-8 p-4 flex flex-col'>
      <div className="flex items-center justify-center">
        <span className="text-5xl font-semibold">GALLERY</span>
      </div>
      <div
        className="grid grid-cols-10 grid-rows-10 flex-1 w-full"
      >
        {[...Array(100)].map((_, index) => (
          <span
            key={`gallery-img-${index}`}
            className="bg-muted-foreground border-[0.5] border-accent "
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery