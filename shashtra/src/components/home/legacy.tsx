"use client"

import { useIsMobile, useViewportWidth } from '@/hooks/useIsMobile';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from "gsap";
import LegacyCard from './legacyCard';

const cardsStringList = [
            "SHASHTRA 2024", "SHASHTRA 2023", "SHASHTRA 2022",
            "SHASHTRA 2021", "SHASHTRA 2020", "SHASHTRA 2019",
            "SHASHTRA 2018", "SHASHTRA 2017", "SHASHTRA 2016",
            "SHASHTRA 2015"
          ];

const Legacy = () => {
  const viewportWidth = useViewportWidth();

  const gallery = useRef<HTMLDivElement>(null);
  const galleryContainer = useRef<HTMLDivElement>(null);
  const titleContainer = useRef<HTMLDivElement>(null);
  
  const [transformState, setTransformState] = useState<{
    currentRotation: number,
    targetRotation: number,
    currentX: number,
    targetX: number,
    currentY: number,
    targetY: number,
    currentScale: number,
    targetScale: number,
    angle: number,
  }[]>([]);

  const transformStateRef = useRef(transformState);

  const [cards, setCards] = useState<React.RefObject<HTMLDivElement | null>[]>([])

  const cardsRef = useRef(cards);

  const [selectedCard, setSelectedCard] = useState<HTMLDivElement | null>(null);

  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isMobile = useIsMobile();
  const config = useMemo(() => ({
    imageCount: cardsStringList.length,
    radius: 300,
    sensistivity: 500,
    effectFalloff: 350,
    cardMoveAmount: 70,
    lerpFactor: 0.15,
    isMobile,
  }), [isMobile]);

  const [parallaxState, _setParallaxState] = useState({
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    currentX: 0,
    currentY: 0,
    currentZ: 0,
  })
  const parallaxRef = useRef(parallaxState);

  const setParallaxState = useCallback((updater: (prev: typeof parallaxState) => typeof parallaxState) => {
      _setParallaxState((prev) => {
        const updated = updater(prev);
        parallaxRef.current = updated;
        return updated;
      });
    },[]
  );

  const togglePreview = (index: number) => {
    setIsPreviewActive(true);
    setIsTransitioning(true);

    const angle = transformStateRef.current[index].angle;
    const targetPosition = (Math.PI * 3) / 2;
    let rotationRadians = targetPosition - angle;

    if(rotationRadians > Math.PI) rotationRadians -= Math.PI * 2;
    else if(rotationRadians < -Math.PI) rotationRadians += Math.PI * 2;

    
    const tl = gsap.timeline();

    tl.to(titleContainer.current, {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
    })

    cardsRef.current.forEach((card, idx) => {
        setTransformState(prev => {
          const updated = [...prev]; 

          if (!updated[index]) return prev;

          updated[idx] = {
            ...updated[idx],
            targetRotation: 0,
            targetX: 0,
            targetY: 0,
            targetScale: 1,
          };

          return updated;
        })
        tl.to(card.current, {
          x: config.radius * Math.cos(angle),
          y: config.radius * Math.sin(angle),
          rotationY: 0,
          scale: 1,
          duration: 1.25,
          ease: "power4.out",
        }, 0);
    });

    tl.to(gallery.current, {
      scale: 4,
      y: 1200,
      rotation: (rotationRadians * 180) / Math.PI + 360,
      duration: 2,
      ease: "power4.inOut",
      onComplete: () => {
        setIsTransitioning(false);
      },
    }, 0);

    tl.to(parallaxState, {
      currentX: 0,
      currentY: 0,
      currentZ: 0,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        gsap.set(galleryContainer.current, {
          rotateX: parallaxState.currentX,
          rotateY: parallaxState.currentY,
          rotateZ: parallaxState.currentZ,
          transformOrigin: "center center",
        });
      }
    }, 0);
  }

  const resetGallery = useCallback((viewportWidth: number) => {
    if(isTransitioning) return;

    setIsTransitioning(true);
    let galleryScale = 1;

    if(viewportWidth < 760){
      galleryScale = 1;
    } else if(viewportWidth < 1200) {
      galleryScale = 1;
    }

    const tl = gsap.timeline();

    tl.to(gallery.current, {
      scale: galleryScale,
      y: 0,
      x: 0,
      rotation: 0,
      duration: 2.5,
      ease: "power4.inOut",
      onComplete: () => {
        setIsPreviewActive(false)
        setIsTransitioning(false);
        Object.assign(parallaxState, {
          targetX: 0,
          targetY: 0,
          targetZ: 0,
          currentX: 0,
          currentY: 0,
          currentZ: 0,
        })
      },
    })
    tl.to(titleContainer.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power3.inOut",
    })
  }, [isTransitioning, viewportWidth]);


  useEffect(() => {
    let frameId: number;

    const animate = () => {
      if(!isPreviewActive && !isTransitioning) {
        setParallaxState(prev => ({
          ...prev,
          currentX: prev.currentX + ((prev.targetX - prev.currentX) * config.lerpFactor),
          currentY: prev.currentY + ((prev.targetY - prev.currentY) * config.lerpFactor),
          currentZ: prev.currentZ + ((prev.targetZ - prev.currentZ) * config.lerpFactor),
        }))

        const p = parallaxRef.current;

        gsap.set(galleryContainer.current, {
          rotateX: p.currentX,
          rotateY: p.currentY,
          rotation: p.currentZ,
        });

        cardsRef.current.forEach((card, index) => {
          const state = transformStateRef.current[index]
          state.currentRotation += (state.targetRotation - state.currentRotation) * config.lerpFactor;
          state.currentScale += (state.targetScale - state.currentScale) * config.lerpFactor;
          state.currentX += (state.targetX - state.currentX) * config.lerpFactor;
          state.currentY += (state.targetY - state.currentY) * config.lerpFactor;

          const angle = state.angle;
          const x = config.radius * Math.cos(angle);
          const y = config.radius * Math.sin(angle);

          gsap.set(card.current, {
            x: x + state.currentX,
            y: y + state.currentY,
            rotationY: state.currentRotation,
            scale: state.currentScale,
            rotation: (angle * 180) / Math.PI + 90,
            transformPerspective: 1000,
          })
        })
      }
      frameId = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(frameId); // cleanup
  }, [config.lerpFactor, config.radius, isPreviewActive, isTransitioning, setParallaxState]);
  
  const delay = 1000 / 60; // max 60fps

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let lastCall = 0;
      const now = performance.now();
      if (now - lastCall < delay) return;
      lastCall = now;

      if (isPreviewActive || isTransitioning || config.isMobile) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const percentX = (e.clientX - centerX) / centerX;
      const percentY = (e.clientY - centerY) / centerY;

      setParallaxState(prev => ({
        ...prev,
        targetX: -percentY * 15,
        targetY: percentX * 15,
        targetZ: (percentX + percentY) * 5,
      }));

      cardsRef.current.forEach((card, index) => {
        if (!card.current) {
          console.warn(`Card ${index} ref is null`);
          return;
        }

        const rect = card.current?.getBoundingClientRect();
        if(rect){
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);

          const distance = Math.sqrt(dx * dx + dy * dy);

          if(distance < config.sensistivity && !config.isMobile) {
            const flipFactor = Math.max(0, 1 - distance / config.effectFalloff);
            const angle = transformStateRef.current?.[index].angle;
            const moveAmount = config.cardMoveAmount * flipFactor;

            setTransformState(prev => {
              const updated = [...prev];

                if (!updated[index]) return prev;

                updated[index] = {
                  ...updated[index],
                  targetRotation: 180 * flipFactor,
                  targetX: moveAmount * Math.cos(angle),
                  targetY: moveAmount * Math.sin(angle),
                  targetScale: 1 + 0.5 * flipFactor,
                };

                return updated;
            })
          } else {
            setTransformState(prev => {
              const updated = [...prev]; 

                if (!updated[index]) return prev;

                updated[index] = {
                  ...updated[index],
                  targetRotation: 0,
                  targetX: 0,
                  targetY: 0,
                  targetScale: 1,
                };

                return updated;
            })
          }
        }
      })
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isPreviewActive, isTransitioning, config.isMobile, config.cardMoveAmount, config.effectFalloff, config.sensistivity, delay, setParallaxState]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isPreviewActive &&
        selectedCard &&
        !selectedCard.contains(e.target as Node)
      ) {
        resetGallery(viewportWidth);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPreviewActive, resetGallery, selectedCard, viewportWidth]);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards, viewportWidth, selectedCard]);

  useEffect(() => {
    transformStateRef.current = transformState;
  }, [transformState]);

  return (
    <div className='relative flex flex-1 items-center justify-center overflow-hidden'>
      <div ref={galleryContainer} className="gallery-container relative size-[80vh] flex justify-center items-center transform-3d perspective-distant will-change-transform">
        <div
          ref={gallery}
          className="gallery relative flex justify-center items-center origin-center will-change-transform"
          style={{
            width: "80vh",
            height: "80vh",
            transformOrigin: "center center",
          }}
        >
          {cardsStringList.map((icon, idx) => {
            if (cards.length > cardsStringList.length || transformStateRef.current.length > cardsStringList.length) {
              console.warn("Cards or transformState array grew too big");
            }
            const angle = (idx / config.imageCount) * Math.PI * 2;
            const x = config.radius * Math.cos(angle);
            const y = config.radius * Math.sin(angle);

            return (
              <LegacyCard
                key={idx}
                index={idx}
                title={icon}
                isPrevieActive={isPreviewActive}
                isTransitioning={isTransitioning}
                setIsPreviewActive={setIsPreviewActive}
                setIsTransitioning={setIsTransitioning}
                xPos={x}
                yPos={y}
                angle={angle}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                setTransformState={setTransformState}
                setCards={setCards}
                togglePreview={togglePreview}
              />
            )
          })}
        </div>  
      </div>
      <div ref={titleContainer} className='absolute top-40% left-40% text-4xl font-bold'>
        {"OUR LEGACY" }
      </div>
    </div>
  )
}

export default Legacy