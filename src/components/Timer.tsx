import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementTime } from '../store/dataEntryReducer'

type Props = {
    start: boolean ,
    disableText: ()=>void
}

const Timer = (props: Props) => {
    const [begin,setBegin] = useState<any>(props.start)
    const [time, setTime] = useState(60)
    const timeRef= useRef<any | null>(null)
    const dispatch = useDispatch()
    const isComplete = useSelector((state:any) => state.dataEntry.finished)

    useEffect(() => {
        if(isComplete){
            setBegin(false)
        }
    },[isComplete])

    useEffect(()=>{
        if (begin){
            if(time>0){
              timeRef.current = setInterval(()=>{timeFunc()},1000)
              return () => clearInterval(timeRef.current)
            }else{
              clearInterval(timeRef.current)
              props.disableText()
            }
          }
    
    },[time])

    const timeFunc = () =>{
        setTime(time-1)
        dispatch(incrementTime({}))
    }
  return(
    <div className="flex flex-row">
        {/* {begin &&  */}
        <h4 className={`${time <= 0?"text-[#d43f3f]":"text-black "} font-base text-3xl md:text-5xl`}>{time}s left.</h4>
        {/* } */}
    </div>
  )
}

export default Timer