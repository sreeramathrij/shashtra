"use client"

import { UserLock } from "lucide-react";
import Link from "next/link";

import ScrollTrigger from 'gsap/src/ScrollTrigger'
import { useState, useEffect, } from "react";
import gsap, { CSSPlugin, Expo } from 'gsap'
import HeroSection from "@/components/home/heroSection";
import About from "@/components/home/about";
import Lenis from "lenis";
import Image from "next/image";
import Legacy from "@/components/home/legacy";
import Gallery from "@/components/home/gallery";
import Sponsors from "@/components/home/sponsors";
import CallForAction from "@/components/home/callForAction";

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(ScrollTrigger);


export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);;
  }, []);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const count = setInterval(() => {
      setCounter(counter => {
        if(counter < 100) {
          return counter + 1;
        } else {
          clearInterval(count);
          reveal();
          return 100;
        }
      }
    )
    }, 50)
  })
  
  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        console.log("Intro Completed");
      },
    })

    
    t1
    .to(".count", {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
    })
    .to(".follow", {
      width: "100%",
      duration: 1.2,
      ease: Expo.easeInOut,
    })
    .to(".hide", {
      opacity: 0,
      duration: 0.3,
    })
    .to(".hide", {
      display: "none",
      duration: 0.01,
    })
    .to(".follow", {
      height: "100%",
      duration: 0.7,
      ease: Expo.easeInOut,
    })
    .to(".content", {
      display: "flex",
      duration: 0.01,
    })
    .to(".loading",{
      scaleX: 0,
      transformOrigin: '100% 50%',
      ease: Expo.easeInOut,
      duration: 2,
    })
    .to(".content", {
      opacity: 1,
      duration: 1,
      ease: Expo.easeInOut,
    })
    .to(".loading",{
      display: "none",
      opacity: 100,
      duration: 0.01,
    })
  }


  return (

      <div className="w-dvw relative text-center flex justify-center items-center">
        <div className="loading fixed w-full h-dvh bg-secondary-foreground flex justify-center items-center top-0 z-[2]">
          <div className="follow absolute bg-accent h-1 w-0 left-0 z-[3]"></div>
          <div style={{ width: counter + "%"}} className={`hide absolute left-0 h-1 bg-background duration-400 ease-out`}>

          </div>
          <p className="hide count relative text-9xl text-background bottom-[2%]">
            {counter}%
          </p>
        </div>

        <main style={{ display: "none", opacity: 0 }} className="content flex-col gap-4 px-8 w-[80dvw] z-[4]">
          <div className="h-screen">
            <HeroSection />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-screen flex items-center justify-center">
              <About />
            </div>
            <div className="h-screen flex flex-col gap-8">
              <Legacy />
            </div>
            <div className="h-screen">
              <Gallery />
            </div>
            <div className="h-screen p-4 flex items-center justify-center">
              <Sponsors />
            </div>
            <div className="h-svh items-center justify-center gap-8 p-4 flex flex-col">
              <CallForAction />
            </div>
          </div>
        </main>
      </div>
  );
}
