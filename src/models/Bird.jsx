import React, {useEffect, useRef} from 'react'
import {useAnimations, useGLTF} from '@react-three/drei'

import birdScene from '../assets/3d/bird.glb'
import {useFrame} from "@react-three/fiber";

const Bird = ({  }) => {
  const {scene, animations} = useGLTF(birdScene)
  const birdRef = useRef()
  const { actions } = useAnimations(animations, birdRef)

  useEffect(() => {
    actions['Take 001'].play()
  }, []);

  useFrame(({ camera, clock }) => {
    //update Y position to simulate bird-like motion using a sine wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2

    //check if the bird reached a certain endpoint relative to the camera
    if(birdRef.current.position.x > camera.position.x + 10){
      //change direction to backward and rotate the bird 180deg on the y-axis
      birdRef.current.rotation.y = Math.PI
    }else if (birdRef.current.position.x < camera.position.x - 10) {
      //change direction to forward and reset the bird's rotation
      birdRef.current.rotation.y = 0
    }

    //update the X and Z position based on the direction
    if(birdRef.current.rotation.y === 0){
      //moving forward
      birdRef.current.position.x += 0.01
      birdRef.current.position.z -= 0.01
    }else{
      //moving backward
      birdRef.current.position.x -= 0.01
      birdRef.current.position.z += 0.01
    }
  })

  return (
    <mesh
      position={[-5, 2, 0]}
      scale={[0.003, 0.003, 0.003]}
      ref={birdRef}
    >
      <primitive object={scene} />
    </mesh>
  )
}

export default Bird
