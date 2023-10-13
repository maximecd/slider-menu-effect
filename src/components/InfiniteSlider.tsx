import { ElementRef, useEffect, useRef } from 'react'
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
          duration: 20,
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
        gridColumn: '8/span 3',
        position: 'absolute',
        top: '0',
        overflow: 'hidden',
        display: 'grid',
        justifyItems: 'center',
        width: 'full',
        '2xl': {
          gridColumn: '8/span 2',
        },
      })}
    >
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          data-carousel
          className={css({
            display: 'grid',
            width: '100%',
            justifyItems: 'center',
          })}
        >
          {links.map((link, i) => (
            <img
              key={i}
              className={css({
                boxShadow: 'xl',
                aspectRatio: 'square',
                objectFit: 'cover',
                borderRadius: '3xl',
                scale: '.8',
              })}
              src={link.imgSrc}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
