// import { useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import Card from './components/Card'
import { configureStore } from '@reduxjs/toolkit'
import dataEntryReducer from './store/dataEntryReducer'

const store = configureStore({
  reducer:{
    dataEntry: dataEntryReducer
  } 
})

function App() {

  const data: string[] = [
    "Every Monday, we go to the supermarket to pick up fresh produce and seeds for gardening. We plant peppers, tomatoes and carrots every summer.",
    "We're ready to go to the stadium. This is our first final in over 20 years and we won't accept defeat.",
    "I get my license today if I complete my driving test on the highway and my parallel parking at the centre.",
  ]



  return (
    <Provider store={store}>
    <div className="  flex flex-col justify-center items-center h-[100vh]  ">
        <h4 className="text-2xl font-light m-5">Data Entry Efficiency Test</h4>
        <div>

        </div>
        <Card data={data} />
    </div>
    </Provider>
  )
}

export default App
