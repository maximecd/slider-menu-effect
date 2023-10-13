import { ReactNode } from 'react'
import { css, cva } from '../../styled-system/css'

interface LinkProps {
  shape: 'square' | 'circle' | 'squircle'
  index: number
  activeIndex: number | null
  onMouseEnter: () => void
  children: ReactNode
}

const shapeClass = cva({
  base: {
    w: 5,
    h: 5,
    border: '1px solid black',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(0rem)',
    opacity: 1,
    transition: 'all',
    _groupHover: {
      opacity: 0,
      transform: 'translateX(1.2rem)',
    },
  },
  variants: {
    shape: {
      circle: {
        borderRadius: 'full',
      },
      squircle: {
        borderRadius: 'sm',
      },
      square: {},
    },
  },
})

function Link({ shape, onMouseEnter, index, activeIndex, children }: LinkProps) {
  return (
    <li>
      <a
        href='#'
        className={
          'group ' +
          css({
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            opacity: activeIndex === null || activeIndex === index ? '1' : '.5',
            transition: 'all',
          })
        }
        onMouseEnter={onMouseEnter}
      >
        <div
          className={css({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <svg
            className={css({
              position: 'absolute',
              transform: 'translateX(-1.2rem)',
              opacity: 0,
              transition: 'all',
              ml: '0.5',
              _groupHover: {
                opacity: 1,
                transform: 'translateX(0rem)',
              },
            })}
            fill='none'
            viewBox='0 0 15 15'
            height='.8em'
            width='.8em'
          >
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M9.854 3.146L14.207 7.5l-4.353 4.354-.708-.708L12.293 8H1V7h11.293L9.146 3.854l.708-.708z'
              clipRule='evenodd'
            />
          </svg>
          <div
            className={shapeClass({
              shape: shape,
            })}
          >
            <span
              className={css({
                w: 1,
                h: 1,
                bgColor: 'black',
                rounded: 'full',
              })}
            ></span>
          </div>
        </div>

        {children}
      </a>
    </li>
  )
}

export default Link
