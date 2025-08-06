import React, { useEffect, useState } from 'react'

const FancyCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Update cursor position
  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Click effect
  useEffect(() => {
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  // Hover detection for buttons/links
  useEffect(() => {
    const hoverables = document.querySelectorAll('button, a, .cursor-hover')

    const handleEnter = () => setHovered(true)
    const handleLeave = () => setHovered(false)

    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Outer Ring */}
      <div
        className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-150 ease-out 
          ${hovered ? 'scale-150 border-red-500' : 'scale-100 border-white'} 
          ${clicked ? 'scale-75 opacity-70' : 'opacity-100'}
        `}
        style={{
          transform: `translate(${position.x - 15}px, ${position.y - 15}px)`,
          width: '30px',
          height: '30px',
          border: '2px solid',
          borderRadius: '50%',
        }}
      ></div>

      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-all duration-75 
          ${hovered ? 'bg-green-800 scale-150' : 'bg-blue-500 scale-100'}
          ${clicked ? 'bg-blue-500  ' : ''}
        `}
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          width: '8px',
          height: '8px',
        }}
      ></div>
    </>
  )
}

export default FancyCursor
