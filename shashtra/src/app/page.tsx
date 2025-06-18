"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Linkedin, UserLock } from "lucide-react";
import Link from "next/link";

import ScrollTrigger from 'gsap/src/ScrollTrigger'
import { useState, useEffect, } from "react";
import gsap, { CSSPlugin, Expo } from 'gsap'
import HeroSection from "@/components/home/heroSection";
import About from "@/components/home/about";
import Lenis from "lenis";

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(ScrollTrigger);

const legacyParagraph = "For over two decades, Shashtra has stood as more than just a techno-managerial fest—it has been a launchpad for innovation, a bridge between academia and industry, and a vibrant hub for collaboration. Shashtra has consistently inspired students, empowered ideas, and created meaningful impact within and beyond the campus. Building on this rich legacy, Shashtra 2024 aims to deliver an experience that is even more dynamic, transformative, and future-ready."

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: any) => {
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
            <div className="h-screen flex items-center justify-center gap-8">
              <div className="flex-1">
                <div>
                  <span>OUR LEGACY</span>
                  <p>{legacyParagraph}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  "LOGO 1", "LOGO 2", "LOGO 3",
                  "LOGO 4", "LOGO 5", "LOGO 6",
                  "LOGO 7"
                ].map((icon, idx) => (
                  <div
                    key={idx}
                    className=""
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-screen items-center justify-center gap-8 p-4 flex flex-col">
              <div className="flex items-center justify-center">
                <span className="text-5xl font-semibold">GALLERY</span>
              </div>
              <div className="grid md:grid-cols-3 md:grid-rows-3 gap-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                  <span key={`gallery-img-${index}`} className="size-64 bg-muted-foreground border-2 border-accent rounded-md"></span>
                ))}
              </div>
            </div>
            <div className="h-screen items-center justify-center gap-12 p-4 flex flex-col overflow-hidden">
              <div className="flex items-center justify-center">
                <span className="text-5xl font-semibold">OUR SPONSORS</span>
              </div>
              <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4">
                {[0, 1, 2, 3].map((_, index) => (
                  <div key={`gallery-img-${index}`} className="w-80 h-56 bg-muted-foreground border-2 border-accent rounded-md flex items-center justify-center">
                    <span className="text-background font-semibold text-3xl">{`SPONSOR ${index + 1}`}</span>
                  </div>
                ))}
              </div>
              <div className="flex overflow-hidden gap-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                  <div key={`gallery-img-${index}`} className="w-64 h-48 bg-muted-foreground border-2 border-accent rounded-md flex items-center justify-center">
                    <span className="text-background font-semibold text-3xl">{`SPONSOR ${index + 5}`}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-svh items-center justify-center gap-8 p-4 flex flex-col">
              <div className="rounded-full bg-primary-foreground size-24">
                <img src="/globe.svg" alt="" className="fill-current" />
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-semibold animate-pulse">IGNITE THE FUTURE</span>
                  <span className="text-xl">WHERE IMAGINATION FUELS TECHNOLOGY AND START ARE JUST THE BEGINNING</span>
                  <Link href="#" className="rounded-md h-16 w-48 border-accent-foreground border-b-4 border-r-4 bg-lime-200 hover:bg-accent active:border-none transition-all duration-300 flex gap-2 justify-center items-center m-8">
                    <UserLock size={32} />
                    <span className="text-2xl">SIGN UP</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
