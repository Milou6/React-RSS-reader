import { useContext, useEffect, useState } from 'react';
import { ThemeContext, MyContext, themes } from './Context';

function SettingsMenu() {
  const { toggleShow } = useContext(MyContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleChangeShow = (e) => {
    console.log(e.target.checked);
    toggleShow();
  };

  const handleChangeTheme = () => {
    toggleTheme();
  };

  return (
    <div className={`settings-menu ${theme.card1}`}>
      <form>
        <div className='settings-menu-item'>
          <input
            type='checkbox'
            id='darkModeToggle'
            checked={theme === themes.dark ? true : false}
            onChange={() => handleChangeTheme()}
          />
          <label htmlFor='darkModeToggle'>Dark mode</label>
        </div>
        <div className='settings-menu-item'>
          <input type='checkbox' id='showItemDescriptions' onChange={(e) => handleChangeShow(e)} />
          <label htmlFor='showItemDescriptions'>Show feed descriptions</label>
        </div>
      </form>
    </div>
  );
}

export default SettingsMenu;
