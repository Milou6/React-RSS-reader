import { useContext } from 'react'
import { MyContext } from './Context'
// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme2 } from '../features/theme/themeSlice'

function SettingsMenu() {
  const { toggleShow } = useContext(MyContext)

  const themeRedux = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const handleChangeShow = (e) => {
    toggleShow()
  }

  return (
    <div className={`settings-menu ${themeRedux.card1}`}>
      <form>
        <div className='settings-menu-item'>
          <input type='checkbox' id='toggleDark' checked={themeRedux.value === 'light' ? false : true} onChange={() => dispatch(toggleTheme2())} />
          <label htmlFor='toggleDark'>Dark mode</label>
        </div>
        <div className='settings-menu-item'>
          <input type='checkbox' id='showItemDescriptions' onChange={(e) => handleChangeShow(e)} />
          <label htmlFor='showItemDescriptions'>Show feed descriptions</label>
        </div>
      </form>
    </div>
  )
}

export default SettingsMenu
