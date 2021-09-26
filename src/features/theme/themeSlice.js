import { createSlice } from '@reduxjs/toolkit'

const lightState = {
  value: 'light',
  prim_clr: '#ffb800',
  background: 'light-background',
  card1: 'light-card1',
  card2: 'light-card2'
}

const darkState = {
  value: 'dark',
  prim_clr: '#000099',
  background: 'dark-background',
  card1: 'dark-card1',
  card2: 'dark-card2'
}

const initialState = lightState

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme2: (state) => {
      // state.value = state.value === 'light' ? 'dark' : 'light'
      state = state.value === 'light' ? darkState : lightState
      localStorage.setItem('theme', state.value)
      return state
    },
    setThemeTo: (state, action) => {
      const mode = action.payload
      if (mode === 'light') {
        state = lightState
      } else if (mode === 'dark') {
        state = darkState
      }
      localStorage.setItem('theme', state.value)
      return state
    }
  }
})

export const { toggleTheme2, setThemeTo } = themeSlice.actions

export default themeSlice.reducer
