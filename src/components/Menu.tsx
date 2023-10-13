import { ElementRef, useRef, useState } from 'react'
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
    label: 'The Milky Way',
    shape: 'squircle',
    imgSrc: '/milky-way.jpg',
  },
  {
    label: 'Beach',
    shape: 'square',
    imgSrc: '/beach.jpg',
  },

  {
    label: 'Leaf',
    shape: 'square',
    imgSrc: '/leaf.jpg',
  },
  {
    label: 'Forest',
    shape: 'circle',
    imgSrc: '/forest.jpg',
  },
  {
    label: 'Sakura',
    shape: 'square',
    imgSrc: '/sakura.jpg',
  },
  {
    label: 'Queen of the night',
    shape: 'squircle',
    imgSrc: '/queen-of-the-night.jpg',
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

    const yValue = 150

    const oldLink = activeLink !== null ? activeLink : -1

    gsap.to('#infinite-slider', {
      autoAlpha: 0,
    })
    if (activeLink !== null) {
      gsap.to(`img[data-index="${oldLink}"]`, {
        autoAlpha: 0,
        y: i > oldLink ? -yValue : yValue,
        scale: 0.6,
        ease: 'power2.out',
        duration: 0.4,
      })
    }
    gsap.fromTo(
      `img[data-index="${i}"]`,
      {
        autoAlpha: 0,
        y: i > oldLink ? yValue : -yValue,
        scale: 0.6,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: 'power2.out',
        duration: 0.4,
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
        pb: '24',
        pt: '16',
      })}
    >
      <div
        className={css({
          gridColumn: '3/span 4',
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
            'button-link group ' +
            css({
              mt: 8,
              display: 'inline-flex',
              fontSize: 'sm',
              border: '1px solid',
              borderColor: 'gray.600',
              borderRadius: 'lg',
              py: '3',
              px: '6',
              alignItems: 'center',
              gap: '3',
              position: 'relative',
              overflow: 'hidden',
            })
          }
        >
          <svg
            className={css({
              transition: 'all cubic-bezier(.34,1.09,.9,.92) .6s',
              position: 'absolute',
              transform: 'translateX(-4em)',
              opacity: 0,
              _groupHover: {
                transform: 'translateX(0em)',
                opacity: 1,
              },
            })}
            fill='none'
            viewBox='0 0 15 15'
            height='1em'
            width='1em'
          >
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M9.854 3.146L14.207 7.5l-4.353 4.354-.708-.708L12.293 8H1V7h11.293L9.146 3.854l.708-.708z'
              clipRule='evenodd'
            />
          </svg>
          <span
            className={css({
              transition: 'all cubic-bezier(.34,1.09,.9,.92) .6s',
              _groupHover: {
                transform: 'translateX(2em)',
              },
            })}
          >
            See all landscapes
          </span>
          <svg
            className={css({
              transition: 'all cubic-bezier(.34,1.09,.9,.92) .6s',
              _groupHover: {
                transform: 'translateX(4em)',
                opacity: 0,
              },
            })}
            fill='none'
            viewBox='0 0 15 15'
            height='1em'
            width='1em'
          >
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M9.854 3.146L14.207 7.5l-4.353 4.354-.708-.708L12.293 8H1V7h11.293L9.146 3.854l.708-.708z'
              clipRule='evenodd'
            />
          </svg>
        </a>
      </div>
      <InfiniteSlider links={links} />
      <div
        className={css({
          gridColumn: '8/span 3',
          position: 'relative',
          '2xl': {
            gridColumn: '8/span 2',
          },
        })}
      >
        {links.map((link, index) => (
          <div
            key={index}
            className={css({
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'grid',
              placeItems: 'center',
              height: 'full',
              aspectRatio: 'square',
            })}
          >
            <img
              className={css({
                visibility: 'hidden',
                boxShadow: '2xl',
                objectFit: 'cover',
                aspectRatio: 'square',
                borderRadius: '3xl',
              })}
              data-index={index}
              src={link.imgSrc}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
