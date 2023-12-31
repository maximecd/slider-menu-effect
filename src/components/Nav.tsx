import { ElementRef, useEffect, useRef, useState } from 'react'
import { css } from '../../styled-system/css'
import gsap from 'gsap'
import { token } from '../../styled-system/tokens'
import Menu from './Menu'

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const headerRef = useRef<ElementRef<'header'>>(null)

  function openDropdown() {
    if (isDropdownOpen) return
    setIsDropdownOpen(true)
  }

  function closeDropdown() {
    if (!isDropdownOpen) return
    gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsDropdownOpen(false),
        defaults: {
          ease: 'power3.out',
          duration: 0.6,
        },
      })
      tl.to(headerRef.current, {
        height: token('sizes.14'),
      }).to(
        '#infinite-slider',
        {
          opacity: 0,
        },
        '<'
      )
    }, headerRef)
  }

  useEffect(() => {
    if (isDropdownOpen) {
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: {
            ease: 'power3.out',
            duration: 1,
          },
        })
        tl.to(headerRef.current, {
          height: 'auto',
        })
          .from(
            '#dropdown li, #dropdown .button-link',
            {
              opacity: 0,
              y: 40,
              stagger: 0.05,
            },
            '<0.2'
          )
          .fromTo(
            '#infinite-slider',
            {
              opacity: 0,
            },
            { opacity: 1 },
            '<'
          )
      }, headerRef)
    }
  }, [isDropdownOpen])

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
            gridTemplateColumns: '12',
            gap: 12,
            alignItems: 'center',
            px: 5,
            h: '14',
          })}
        >
          <div
            className={css({
              gridColumn: '1/span 2',
              fontWeight: 'bold',
            })}
          >
            SLIDER EFFECT
          </div>
          <ul className={css({})}>
            <li
              className={css({
                cursor: 'pointer',
                display: 'flex',
                width: 'max-content',
                alignItems: 'center',
                gap: '2',
              })}
              onMouseEnter={() => openDropdown()}
            >
              Landscapes
              <svg
                className={css({
                  transform: isDropdownOpen ? 'rotate(180deg)' : '',
                  transition: 'transform .3s',
                })}
                fill='none'
                viewBox='0 0 15 15'
                height='1em'
                width='1em'
              >
                <path fill='currentColor' d='M4 9h7L7.5 4.5 4 9z' />
              </svg>
            </li>
          </ul>
        </nav>
        <div
          className={css({
            color: 'black',
            display: isDropdownOpen ? 'block' : 'none',
          })}
          id='dropdown'
        >
          <Menu />
        </div>
      </header>
    </div>
  )
}

export default Nav
