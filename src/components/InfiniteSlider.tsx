import React, { ElementRef, useEffect, useRef } from 'react'
import { css } from '../../styled-system/css'
import gsap from 'gsap'
import { LinkType } from './Menu'

interface InfiniteSliderType {
  links: LinkType[]
}

export default function InfiniteSlider({ links }: InfiniteSliderType) {
  const slider = useRef<ElementRef<'div'>>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-carousel]',
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          ease: 'none',
          duration: 10,
          repeat: -1,
        }
      )
    }, slider)
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      id='infinite-slider'
      ref={slider}
      className={css({
        gridColumn: '8/span 4',
        position: 'absolute',
        top: '0',
        overflow: 'hidden',
        display: 'grid',
        justifyItems: 'center',
      })}
    >
      {[...Array(2)].map(() => (
        <div
          data-carousel
          className={css({
            display: 'grid',
            width: '60%',
          })}
        >
          {links.map((link, i) => (
            <img
              key={i}
              className={css({
                mb: '16',
                boxShadow: 'xl',
              })}
              src={link.imgSrc}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
