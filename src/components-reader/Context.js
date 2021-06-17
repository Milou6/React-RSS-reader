import React from 'react';

// export const themes = {
//   light: {
//     foreground: '#000000',
//     background: '#eeeeee',
//   },
//   dark: {
//     foreground: '#ffffff',
//     background: '#222222',
//   },
// };

export const MyContext = React.createContext({
  show: true, // default value
  toggleShow: () => {},
});
// changing name of context
MyContext.displayName = 'MyContext';