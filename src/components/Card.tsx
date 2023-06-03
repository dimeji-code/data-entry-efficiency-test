import React, {useEffect, useRef, useState} from 'react'
import Timer from './Timer'
import { useDispatch, useSelector } from 'react-redux'
import { complete } from '../store/dataEntryReducer'

type Props = {
  data:string[]
}
type ColoredText = {
  char: string
}
const Wrong = (text:ColoredText) => {
  return <span className="text-[#d15353]">{text.char}</span>

}
const Space = () => {
  return <span className="text-[#d15353]">_</span>

}
const Right = (text:ColoredText) => {
  return (<span className="text-[#2e782f]">{text.char}</span>)

}

const Card = (props:Props) => {
  const [typedData, setTypedData] = useState<string>("")
  const [disable, setDisabled] = useState(false)

  const [begin,setBegin] = useState<any>(false)
  const [time, setTime] = useState(60)
  const [cpm, setCPM] = useState(0)
  const timeRef= useRef<any | null>(null)
  
  const selectTime = useSelector((state:any) => state.dataEntry.timeElapsed)
  const dispatch = useDispatch()

  var count = 0;

  useEffect(() => {
    if (begin){
      if(time>0){
        timeRef.current = setInterval(()=>{timeFunc()},1000)
        return () => clearInterval(timeRef.current)
      }else{
        clearInterval(timeRef.current)
        setDisabled(true)
      }
    }

    console.log("time ref current = ", timeRef.current);

})

useEffect(() => {
  if(typedData == props.data[0]){
    dispatch(complete({}))    
    setCPM(calculateCPM)
    // console.log("Characters per Minute = ", calculateCPM());
    // console.log("Characters per Minute = ", calculateCPM());
    // console.log("Characters per Minute = ", calculateCPM());
  }
},[typedData])


  const timeFunc = () =>{
    setTime(time-1)
}
  const textHandler = (txt:string) => {
    setTypedData(txt)
  }


  const rd = (initial:string, typed:string) => {
    var holder = [];
    for(var i = 0; i<typed.length; i++){
      if (typed[i] == initial[i]){
        holder.push(<Right char={initial[i]}/>)
        count++;
      }      
      else if (typed[i] != initial[i] && initial[i] != " "){
        holder.push(<Wrong char={initial[i]}/>)
      }
      else if (typed[i] != initial[i] && initial[i] == " "){
        holder.push(<Space />)

      }
      // holder.push(<span>{initial.slice(typed.length)}</span>)
    }

    return holder

  }


  const calculateCPM = () => {
      var answer = (60 * typedData.length)/ selectTime
      return answer
  }

  return (
    <div className='rounded-md shadow-sm border border-spacing-2 border-[#ccc] bg-slate-50 flex flex-col h-[85%] md:h-[72%] w-2/3'>
        {/* Top */}
        
        <div className='flex flex-row items-center justify-center px-5 pt-5 flex-1/5 h-1/5'>
        {begin &&  <Timer 
          start={begin}
          disableText={()=>setDisabled(!disable)}
          /> }
          {!begin && <div className="flex flex-row">
            <h1>Focus on text area to start 60s timer.</h1>
          </div>}
        </div>
        {/* Middle */}
        <div className='px-5 flex-3/5 h-3/5'>
          <div className='text-center my-5'>
          <h4>{props.data[0]}</h4>
          <h4 className='min-h-[50px]'>{rd(props.data[0],typedData)}</h4>
          </div>
          <div>
            <label 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Case Sensitive.
            </label>

            <textarea 
            onFocus={()=>setBegin(true)}
            id="message" 
            disabled={disable}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Type Here..."
            value={typedData}
            onChange={(event) => textHandler(event.target.value)}
            >
            </textarea>
          </div>
        </div>
        {/* Bottom */}
        <div className='flex-1/5 h-1/5 px-5'>

          <div className='flex flex-row justify-evenly'>
            <h2>{selectTime} seconds</h2>
            {/* <h2>{typedData.length} chars</h2> */}
            <div>
              <h2>Speed: <span className={` ${cpm<250?"text-[#e25a50]":"text-[#41c541]"}`}>{Math.ceil(cpm)}</span> CPM /
              <span className={` ${cpm<250?"text-[#e25a50]":"text-[#41c541]"}`}> {Math.ceil(cpm/5)}</span> WPM</h2>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Card