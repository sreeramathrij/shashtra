"use-client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import gsap from 'gsap'

import TitleChar from './titleChar'

const festName = "SHASHTRA";

const HeroSection = () => {

  const t1 = gsap.timeline();

  const heroAnimation = () => {
    t1
      .to(".subtitle", {
        xPercent: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 7,
      })
      .to(".handle", {
        xPercent: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: -0.75,
      })
      .to(".threew", {
        yPercent: 0,
        duration: 1,
        ease: "expo.out",
        stagger: {
          from: "center",
          each: 0.1,
        },
        delay: 0.3,
      })
  }

  useEffect(() => {
    gsap.set(".subtitle", {
      xPercent: -200,
    })
    gsap.set(".handle", {
      xPercent: 200,
    })
    gsap.set(".threew", {
      yPercent: 200,
    })

    heroAnimation();
  }, [heroAnimation])

  return (
    <div className="flex flex-col size-full">
      <div className="flex items-center flex-2/3 justify-center">
        <h1 className="flex text-9xl font-bold text-primary">
          {[...festName].map((char, index) =>
            <TitleChar key={`char-${index}`} index={index} char={char} />
          )}
        </h1>
      </div>
      <div className="flex overflow-hidden justify-between px-16">
        <span className="subtitle font-semibold">"THE" TECH FEST IN ERNALLAM</span>
        <Link href="#" className="handle font-semibold">@SHASHTRA2025</Link>
      </div>
      <div className="flex flex-1/2 gap-4 px-8 overflow-hidden">
        <div className="threew flex flex-col flex-1 items-center justify-center gap-2">
          <span className="text-foreground">What:</span>
          <span className="text-2xl font-semibold">SHASHTRA 2025</span>
        </div>
        <div className="threew flex flex-col flex-1 items-center border-x-2 border-accent justify-center gap-2">
          <span className="text-foreground">When:</span>
          <div className="flex flex-col gap-0 items-center text-2xl font-semibold">
            <div>XX - XX SEPTEMBER,</div>
            <div>2025</div>
          </div>
        </div>
        <div className="threew flex flex-col flex-1 items-center justify-center gap-2">
          <span className="text-foreground">Where:</span>
          <div className="flex flex-col gap-0 items-center text-2xl font-semibold">
            <span>GOVT. ENGINEERING COLLEGE,</span>
            <span>THRAYOOR, ERNALLAM</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection