    import { useGSAP } from '@gsap/react'
    import gsap from 'gsap'
    import { SplitText } from 'gsap/all'
    import { useRef, useEffect } from 'react'

    const Loader = () => {
    const loaderRef = useRef()

    useGSAP(() => {
        document.fonts.ready.then(() => {
        const split = new SplitText('#load h1', {
            type: 'chars',
        })

        const tl = gsap.timeline()

        tl.from(split.chars, {
            opacity: 0,
            z: -200,
        })
        tl.to(split.chars, {
            opacity: 1,
            z: 0,
            duration: 2,
            ease: 'expo.out',
            stagger: 0.05,
        })

        // Animate in
        
        gsap.to(split.chars, {
            opacity: 0,
            z: -200,
            color: '#fff',
            delay: 1.2,
            duration: 0.6,
            ease: 'power2.inOut',
        })
        })
    }, { scope: loaderRef })

    return (
        <div
        id='load'
        ref={loaderRef}
        className='w-screen h-full flex-center overflow-hidden bg-white text-black font-hexaframe text-[40vw] absolute uppercase z-[9999]'
        >
        <h1>KPR</h1>
        </div>
    )
    }

    export default Loader
