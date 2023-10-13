import { css } from '../styled-system/css'
import Nav from './components/Nav'

function App() {
  return (
    <div
      className={css({
        backgroundColor: '#2F3035',
        color: 'white',
        minH: 'screen',
        display: 'grid',
        placeItems: 'center',
      })}
    >
      <Nav />
      <h1
        className={css({
          fontSize: '2xl',
          fontWeight: '600',
        })}
      >
        Sample website.
      </h1>
      <footer
        className={css({
          mt: 'auto',
          fontSize: 'xs',
          p: '2',
          bgColor: 'neutral.800',
          w: 'full',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <p>
          initial design by{' '}
          <a
            className={css({
              textDecoration: 'underline',
              cursor: 'pointer',
            })}
            href='https://www.modelec.com/'
          >
            https://www.modelec.com/
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
