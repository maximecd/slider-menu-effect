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
    </div>
  )
}

export default App
