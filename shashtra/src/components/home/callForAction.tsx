import { UserLock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CallForAction = () => {

  const signupButton = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".signup", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    })
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      <div className=".signup rounded-full bg-primary-foreground size-24">
        <Image width={120} height={120} src="/globe.svg" alt="" className="fill-current" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="signup text-4xl font-semibold animate-pulse">IGNITE THE FUTURE</span>
          <span className="signup text-xl">WHERE IMAGINATION FUELS TECHNOLOGY AND START ARE JUST THE BEGINNING</span>
          <Link href="#" className="signup rounded-md h-16 w-48 border-accent-foreground border-b-4 border-r-4 bg-lime-200 hover:bg-accent active:border-none transition-all duration-300 flex gap-2 justify-center items-center m-8">
            <UserLock size={32} />
            <span className="text-2xl">SIGN UP</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CallForAction