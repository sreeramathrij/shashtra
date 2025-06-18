import gsap, { } from 'gsap';
import React, { useEffect, useRef } from 'react'

interface TitleCharProps {
  index: number,
  char: string,

}

const TitleChar = ({ index, char }: TitleCharProps) => {
  const repeat = 8;
  const original = useRef<HTMLDivElement>(null);
  const clone = useRef<HTMLDivElement>(null);

  const t1 = useRef(gsap.timeline());

  useEffect(() => {
    if (!original.current || !clone.current) return;

    gsap.set(clone.current, {
      yPercent: index % 2 === 0 ? -100 : 100,
    });

    const roll = gsap.to([original.current, clone.current], {
      repeat: repeat,
      ease: "none",
      yPercent: index % 2 === 0 ? "+=100" : "-=100",
      duration: 1,
    });

    t1.current.add(roll, 0);

    gsap.to(t1.current, {
              progress: 1,
              duration: 5,
              ease: "expo.inOut",
              delay: 5
            })
  }, [index]);

  return (
    <span className="char overflow-hidden relative">
      <div ref={original} className="original-text">{char}</div>
      <div ref={clone} className="clone-text absolute left-0 top-0">{char}</div>
    </span>
  )
}

export default TitleChar