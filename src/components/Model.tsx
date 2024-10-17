import { useGLTF } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export const Model = ({poses, position, rotation, scale}) => {
    const { nodes, materials} = useGLTF("/jump-transformed.glb")
    const modelRef = useRef()
    useFrame(() => {
        console.log('poses', JSON.stringify(poses, null, 4))
        // console.log('nodes', JSON.stringify(nodes.Ch03.skeleton.bones, null, 4))
        // const niceNodeNames = JSON.stringify(nodes.Ch03.skeleton.bones.map(bone => bone.name))
        // console.log(niceNodeNames)
        if(poses && poses.length > 0 && modelRef.current) {
            const { keypoints } = poses[0]
            const nose = keypoints[0];
            //nodes.Ch03.skeleton.bones[5].position.x = nose.x
            //nodes.Ch03.skeleton.bones[5].position.y = nose.y 
            // nodes.Ch03.skeleton.bones[5].rotation.y = nose.x * 0.1
            nodes.Ch03.skeleton.bones[5].position.x = nose.y / 100
 
            modelRef.current.position.set(nose.x / 100, -nose.y / 100, 0); // Adjust scale as necessary
            console.log(modelRef.current)
        }
    })
    return (
        <>
            <group position={position} rotation={rotation} scale={scale} ref={modelRef}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh  castShadow receiveShadow geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
            </group>
        </>

    )
}