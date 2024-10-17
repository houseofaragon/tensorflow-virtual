import { forwardRef, useEffect, useRef } from "react"

const Video = forwardRef(({ deviceId = '', width = 320, height = 240}, ref) => {
    useEffect(() => {
        const getVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId, width, height}
                })

                if (ref.current) {
                    ref.current.srcObject = stream
                    await ref.current.play()
                }
            } catch (error) {
                console.log('Error accessing webcam: ', error)
            }
        }

        getVideoStream()

        // return () => {
        //     if (videoRef.current) {
        //     }
        // }
    }, [deviceId, width, height])

    return (
        <video
            id="video-stream"
            ref={ref}
            width={width}
            height={height}
            autoPlay
            playsInline
        />
    )
})

export default Video