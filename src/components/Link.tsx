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
        className={css({
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          opacity: activeIndex === null || activeIndex === index ? '1' : '.5',
          transition: 'all',
        })}
        onMouseEnter={onMouseEnter}
      >
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
        {children}
      </a>
    </li>
  )
}

export default Link
