import { ElementRef, useEffect, useRef, useState } from 'react'
import { css } from '../../styled-system/css'
import Link from './Link'
import gsap from 'gsap'
import InfiniteSlider from './InfiniteSlider'

export interface LinkType {
  label: string
  shape: 'squircle' | 'square' | 'circle'
  imgSrc: string
}

const links: LinkType[] = [
  {
    label: 'Confidence',
    shape: 'squircle',
    imgSrc: 'https://placehold.co/401',
  },
  {
    label: 'Fascination',
    shape: 'square',
    imgSrc: 'https://placehold.co/401',
  },

  {
    label: 'Hitera',
    shape: 'square',
    imgSrc: 'https://placehold.co/401',
  },
  {
    label: 'Iris by MODELEC',
    shape: 'circle',
    imgSrc: 'https://placehold.co/401',
  },
  {
    label: 'Karo',
    shape: 'square',
    imgSrc: 'https://placehold.co/401',
  },
  {
    label: 'Désir',
    shape: 'squircle',
    imgSrc: 'https://placehold.co/401',
  },
]

function Menu() {
  const [activeLink, setActiveLink] = useState<number | null>(null)

  const scope = useRef<ElementRef<'div'>>(null)

  function restoreSlider() {
    setActiveLink(null)
    gsap.to('#infinite-slider', {
      autoAlpha: 1,
    })
    gsap.to('img[data-index]', {
      autoAlpha: 0,
    })
  }

  function setProductImage(i: number) {
    setActiveLink(i)

    const oldLink = activeLink !== null ? activeLink : -1

    gsap.to('#infinite-slider', {
      autoAlpha: 0,
    })
    if (activeLink !== null) {
      gsap.to(`img[data-index="${oldLink}"]`, {
        autoAlpha: 0,
        y: i > oldLink ? -200 : 200,
        scale: 0.4,
      })
    }
    gsap.fromTo(
      `img[data-index="${i}"]`,
      { autoAlpha: 0, y: i > oldLink ? 200 : -200, scale: 0.4 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      }
    )
  }

  return (
    <div
      ref={scope}
      className={css({
        display: 'grid',
        px: 5,
        gridTemplateColumns: '12',
        gap: 12,
        position: 'relative',
      })}
    >
      <div
        className={css({
          gridColumn: '3/span 4',
          my: '16',
        })}
      >
        <ul
          className={css({
            fontSize: '2xl',
            display: 'flex',
            flexDir: 'column',
          })}
          onMouseLeave={() => restoreSlider()}
        >
          {links.map((link, i) => (
            <Link index={i} activeIndex={activeLink} key={i} shape={link.shape} onMouseEnter={() => setProductImage(i)}>
              {link.label}
            </Link>
          ))}
        </ul>
        <a
          href=''
          className={
            'button-link ' +
            css({
              mt: 8,
              display: 'inline-flex',
              fontSize: 'sm',
              border: '1px solid',
              borderColor: 'gray.600',
              borderRadius: 'lg',
              py: '3',
              px: '6',
            })
          }
        >
          See all collections
        </a>
      </div>
      <InfiniteSlider links={links} />
      <div
        className={css({
          gridColumn: '8/span 3',
          position: 'relative',
        })}
      >
        {links.map((link, index) => (
          <img
            key={index}
            className={css({
              position: 'absolute',
              top: '50%',
              right: '50%',
              transform: 'translate(50%, -50%)',
              visibility: 'hidden',
              boxShadow: '2xl',
            })}
            data-index={index}
            src={link.imgSrc}
          />
        ))}
      </div>
    </div>
  )
}

export default Menu
