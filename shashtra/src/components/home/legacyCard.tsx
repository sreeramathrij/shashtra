"use client"

import gsap from 'gsap'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'

interface TransformObj {
  currentRotation: number,
  targetRotation: number,
  currentX: number,
  targetX: number,
  currentY: number,
  targetY: number,
  currentScale: number,
  targetScale: number,
  angle: number,
}

interface LegacyCardProps {
  index: number,
  title: string,
  isPrevieActive: boolean;
  isTransitioning: boolean;
  setIsPreviewActive: Dispatch<SetStateAction<boolean>>;
  setIsTransitioning: Dispatch<SetStateAction<boolean>>;
  xPos: number,
  yPos: number,
  angle: number,
  selectedCard: HTMLDivElement | null;
  setSelectedCard: Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  setTransformState: Dispatch<SetStateAction<TransformObj[]>>;
  setCards: Dispatch<SetStateAction<React.RefObject<HTMLDivElement | null>[]>>
  togglePreview: (index: number) => void;
}

const LegacyCard = ({ index, title, isPrevieActive, isTransitioning, xPos, yPos, angle, selectedCard, setSelectedCard, setTransformState, setCards, togglePreview }: LegacyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const isSelected = isPrevieActive && cardRef.current === selectedCard;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!isPrevieActive && !isTransitioning){
      setSelectedCard(cardRef.current);
      togglePreview(index);
      e.stopPropagation();
    }
  }

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, {
      x: xPos,
      y: yPos,
      rotation: (angle * 180) / Math.PI + 90,
      transformPerspective: 800,
      transformOrigin: "center center"
    });

    setTransformState(prev => {
      const updated = [...prev];
      updated[index] = {
        currentRotation: 0,
        targetRotation: 0,
        currentX: 0,
        targetX: 0,
        currentY: 0,
        targetY: 0,
        currentScale: 1,
        targetScale: 1,
        angle,
      };
      return updated;
    });

  }, [angle, index, setTransformState, xPos, yPos]);

  useEffect(() => {
    setCards(prev => {
      if (!prev.includes(cardRef)) {
        const updated = [...prev];
        updated[index] = cardRef; // place directly at the correct index
        return updated;
      }
      return prev;
    });
  }, [index, setCards]);

  return (
    <div
      ref={cardRef}
      title={title}
      className={`card cursor-pointer absolute w-[12vh] h-[12vh] border-4 border-foreground bg-linear-to-tr from-accent to-accent-foreground rounded-md origin-center will-change-transform transform-3d backface-visible`}
      onClick={handleCardClick}
    >
      {isSelected && 
        <Link href='#' className='absolute right-0 size-full opacity-0 z-10'>
        </Link>
      }
    </div>
  );
}

export default LegacyCard;