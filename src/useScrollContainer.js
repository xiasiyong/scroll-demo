import { useEffect, useRef } from 'react'

let distance = 0
let scrollTop1= 0
let scrollTop2= 0
let scrollTop3= 0

const useScrollContainer = () => {
    const container1 = useRef('')
    const container2 = useRef('')
    const container3 = useRef('')
    const content1 = useRef('')
    const content2 = useRef('')
    const content3 = useRef('')
    useEffect(() => {
        const container1Height = container1.current.offsetHeight
        const container2Height = container2.current.offsetHeight
        const container3Height = container3.current.offsetHeight
        const content1Height = content1.current.offsetHeight
        const content2Height = content2.current.offsetHeight
        const content3Height = content3.current.offsetHeight
        // 容器1可滚动的最大距离
        // 1200 - 800 = 400
        const distance1 = content2Height - container2Height
        // 容器2可滚动的最大距离
        // 2000 - 1000 + 400 = 1400
        const distance2 = content3Height - container3Height + distance1
        // 容器3可滚动的最大距离
        // 3000 - 1440 + 1400 = 2960
        const distance3 = content1Height - container1Height + distance2
        
        document.body.addEventListener('mousewheel', (e) => {
          console.log(1, distance)
          distance = distance - e.wheelDeltaY
          console.log(2, distance)
          /**
           * 1滚动
           * 
           * distance < distance1, scrollTop1 = distance, scrollTop1 = 0 scrollTop3 = 0
           * 1停止，2滚动
           * distance1 < distance < distance2 , scrollTop1 = distance1, scrollTop2 = distance - distance1, scrollTop3 = 0
           * 1，2，停止，3滚动
           * distance2 < distance < distance3, scrollTop1 = distance1, scrollTop2 = distance2, scrollTop3 = distance - distance2
           * distance > distance3, distance = distance3, scrollTop1 = distance1, scrollTop2 = distance2, scrollTop3 = distance3
           */
          if (distance < 0) {
            distance = 0
            scrollTop1 = 0
            scrollTop2 = 0
            scrollTop3 = 0
          } else if (distance < distance1) {
            scrollTop1 = distance
            scrollTop2 = 0
            scrollTop3 = 0
          } else if(distance < distance2) {
            scrollTop1 = distance1
            scrollTop2 = distance - distance1
            scrollTop3 = 0
          } else if(distance < distance3) {
            scrollTop1 = distance1
            scrollTop2 = distance2 - distance1
            scrollTop3 = distance - distance2
          } else {
            scrollTop1 = distance1
            scrollTop2 = distance2 - distance1
            scrollTop3 = distance3 - distance2
            distance = distance3
          }
         
          container2.current.scrollTop = scrollTop1
          container3.current.scrollTop = scrollTop2
          container1.current.scrollTop = scrollTop3
        }, true)
    }, [])
    return {
        container1,
        container2,
        container3,
        content1,
        content2,
        content3
    }
}

export default useScrollContainer