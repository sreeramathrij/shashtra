"use-client"

import React from 'react'

import { Card, CardContent } from '../ui/card'

const aboutParagraph = "Shashtra, the flagship techno-managerial fest of Government Engineering College, Thrayoor, has been a hub of innovation since 2001. From AI hackathons to drone showcases, Shashtra has sparked ideas and inspired change. As we celebrate our 25th edition in 2025, join us for a dynamic blend of workshops, competitions, exhibits, and cultural nights. Let's build the future together."

const About = () => {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <p className="reveal text-5xl font-semibold text-center">
          {aboutParagraph.toUpperCase()}
        </p>
      </CardContent>
    </Card>
  )
}

export default About