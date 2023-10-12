import { ElementRef, useRef, useState } from 'react'
import { css } from '../../styled-system/css'
import gsap from 'gsap'
import { token } from '../../styled-system/tokens'
import Link from './Link'

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const headerRef = useRef<ElementRef<'header'>>(null)

  function openDropdown() {
    if (isDropdownOpen) return

    setIsDropdownOpen(true)
    gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
          duration: 1,
        },
      })
      tl.to(headerRef.current, {
        height: 'auto',
      }).from(
        '#dropdown li',
        {
          opacity: 0,
          y: 40,
          stagger: 0.05,
        },
        '<0.2'
      )
    }, headerRef)
  }

  function closeDropdown() {
    if (!isDropdownOpen) return
    gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsDropdownOpen(false),
        defaults: {
          ease: 'power4.out',
          duration: 1,
        },
      })
      tl.to(headerRef.current, {
        height: token('sizes.14'),
      })
    }, headerRef)
  }

  return (
    <div
      className={css({
        p: '3.5',
        position: 'fixed',
        top: 0,
        left: 0,
        w: 'full',
      })}
    >
      <header
        ref={headerRef}
        className={css({
          color: isDropdownOpen ? 'black' : 'white',
          bgColor: isDropdownOpen ? 'white' : 'transparent',
          transition: 'colors',
          transitionDuration: '300ms',
          borderRadius: '2xl',
          h: '14',
          overflow: 'hidden',
        })}
        onMouseLeave={() => closeDropdown()}
      >
        <nav
          className={css({
            display: 'grid',
            gridTemplateColumns: '12rem 1fr',
            alignItems: 'center',
            px: 5,
            h: '14',
          })}
        >
          <div>Logo goes here</div>
          <ul className={css({})}>
            <li
              className={css({
                cursor: 'pointer',
              })}
              onMouseEnter={() => openDropdown()}
            >
              Collections
            </li>
          </ul>
        </nav>
        <div
          id='dropdown'
          className={css({
            display: 'grid',
            px: 5,
            gridTemplateColumns: '12rem 1fr',
          })}
        >
          <ul
            className={css({
              visibility: isDropdownOpen ? 'visible' : 'hidden',
              fontSize: '2xl',
              gridColumnStart: '2',
              my: '16',
              display: 'flex',
              flexDir: 'column',
              gap: 2,
            })}
          >
            <Link shape='squircle'>Confidence</Link>
            <Link shape='square'>Fascination</Link>
            <Link shape='circle'>Hitera</Link>
            <Link shape='circle'>Iris by MODELEC</Link>
            <Link shape='squircle'>Karo</Link>
            <Link shape='square'>Désir</Link>
            <li>
              <a
                href=''
                className={css({
                  mt: 8,
                  display: 'inline-flex',
                  fontSize: 'sm',
                  border: '1px solid',
                  borderColor: 'gray.600',
                  borderRadius: 'lg',
                  py: '3',
                  px: '6',
                })}
              >
                See all collections
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Nav
