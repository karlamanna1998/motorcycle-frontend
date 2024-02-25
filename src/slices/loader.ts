import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  loader: boolean
}
const initialState: InitialState = {
    loader: false
}

const cakeSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload
    }
  }
})

export default cakeSlice.reducer
export const {setLoader } = cakeSlice.actions