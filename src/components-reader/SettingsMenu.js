// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../features/theme/themeSlice'
import { toggleShowFeedDetails } from '../features/feedsApi/feedsSlice'

function SettingsMenu() {
  const themeRedux = useSelector((state) => state.theme)
  const showFeedDetails = useSelector((state) => state.feeds.showFeedDetails)
  const dispatch = useDispatch()

  return (
    <div className={`settings-menu br10 ${themeRedux.card1}`}>
      <form>
        <div className='settings-menu-item'>
          <input type='checkbox' id='toggleDark' checked={themeRedux.value === 'light' ? false : true} onChange={() => dispatch(toggleTheme())} />
          <label htmlFor='toggleDark'>🌗 Dark mode</label>
        </div>
        <div className='settings-menu-item'>
          <input type='checkbox' id='showItemDescriptions' checked={showFeedDetails ? true : false} onChange={() => dispatch(toggleShowFeedDetails())} />
          <label htmlFor='showItemDescriptions'>📜 Show feed descriptions</label>
        </div>
      </form>
    </div>
  )
}

export default SettingsMenu
