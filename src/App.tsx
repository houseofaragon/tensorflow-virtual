import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { Model } from "./components/Model"
import Video from "./components/Video"
import * as THREE from "three";
import { useRef } from "react";
import usePoseDetection from "./util/usePoseDetection";

function App() {
  const videoRef = useRef(null);
  const { poses } = usePoseDetection(videoRef)

  return (
    <>
      <Video ref={videoRef} />
      <Canvas shadows gl={{ antialias: false }} camera={{ position: [1, 1, 5], fov: 50 }}>      <color attach="background" args={['#f0f0f0']} />
        <ambientLight intensity={0.5} />
        {/* {videoRef.current && <VideoTexture videoElement={videoRef.current} />} */}
        <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
        <Model poses={poses} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </Canvas>
    </>
  )
}

export default App
