import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    timeElapsed : 0,
    errorCount : 0,
    finished:false
}

export const dataEntrySlice = createSlice({
    name:'dataEntry',
    initialState,
    reducers:{
        incrementTime: (state, action) => {
            
            state.timeElapsed = state.timeElapsed + 1
          },
        complete: (state, action) => {
            state.finished = true
        }
    }
})

export const { incrementTime, complete } = dataEntrySlice.actions

export default dataEntrySlice.reducer