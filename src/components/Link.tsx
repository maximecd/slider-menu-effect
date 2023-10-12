import { ReactNode } from 'react'
import { css } from '../../styled-system/css'

interface LinkProps {
  shape: 'square' | 'circle' | 'squircle'
  children: ReactNode
}

function Link({ shape, children }: LinkProps) {
  return (
    <li>
      <a
        href='#'
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        })}
      >
        <div
          className={css({
            w: 6,
            h: 6,
            border: '1px solid black',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: shape === 'circle' ? 'full' : '4px',
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
