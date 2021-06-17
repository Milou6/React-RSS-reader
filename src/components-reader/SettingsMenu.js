import { useContext, useState } from 'react';
import { MyContext } from './Context';

function SettingsMenu() {
  // const [show, setShow] = useState(false);
  // const toggleShow = () => {
  //   console.log('toggle theme!');
  //   setShow(!show);
  // };

  const { show, toggleShow } = useContext(MyContext);

  const handleChange = (e) => {
    // console.log(e);
    console.log(e.target.checked);
    toggleShow();
  };

  return (
    <div className='settings-menu'>
      <form>
        <input type='checkbox' id='showItemDescriptions' onChange={(e) => handleChange(e)} />
        <label for='showItemDescriptions'>Show Feed Descriptions</label>
      </form>
    </div>
  );
}

export default SettingsMenu;
