"use-client"


import React from 'react'

// const legacyParagraph = "For over two decades, Shashtra has stood as more than just a techno-managerial fest—it has been a launchpad for innovation, a bridge between academia and industry, and a vibrant hub for collaboration. Shashtra has consistently inspired students, empowered ideas, and created meaningful impact within and beyond the campus. Building on this rich legacy, Shashtra 2024 aims to deliver an experience that is even more dynamic, transformative, and future-ready."

const Legacy = () => {
  return (
    <div className='relative flex flex-1 items-center justify-center overflow-hidden'>
      <div className="gallery-container relative size-100 flex justify-center items-center transform-3d perspective-distant will-change-transform">
        <div className="gallery relative w-[40vh] h-[40vh] flex justify-center items-center origin-center will-change-transform">
          {[
            "LOGO 1", "LOGO 2", "LOGO 3",
            "LOGO 4", "LOGO 5", "LOGO 6",
            "LOGO 7"
          ].map((icon, idx) => (
            <div
              key={idx}
              className="absolute w-12 h-15 rounded-md origin-center will-change-transform transform-3d backface-visible overflow-hidden"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Legacy