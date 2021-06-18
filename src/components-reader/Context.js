import React from 'react';

// export const themes = {
//   light: {
//     background: '#F3FBFF',
//     card1: '#FFFFFF',
//     card2: '#D0EFFF',
//   },
//   dark: {
//     background: '#3C3C3C',
//     card1: '#2b2b2b',
//     card2: '#5C6466',
//   },
// };
export const themes = {
  light: {
    background: 'light-background',
    card1: 'light-card1',
    card2: 'light-card2',
  },
  dark: {
    background: 'dark-background',
    card1: 'dark-card1',
    card2: 'dark-card2',
  },
};

export const ThemeContext = React.createContext({
  // theme: 'theme-dark',
  theme: themes.light,
  toggleTheme: () => {},
});
ThemeContext.displayName = 'ThemeContext';

export const MyContext = React.createContext({
  show: true, // default value
  toggleShow: () => {},
});
// changing name of context
MyContext.displayName = 'MyContext';
