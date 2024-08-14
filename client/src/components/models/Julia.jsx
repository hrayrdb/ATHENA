import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Julia(props) {
  const { nodes, materials } = useGLTF('/final.glb')
  const { animations } = useGLTF('/AnimationsGLB.glb')
  const modelRef = useRef()
  const { actions, mixer } = useAnimations(animations, modelRef)
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === 'Idle') ? 'Idle' : animations[0].name
  )
  
  const { isTalking } = props; // Assuming 'isTalking' is passed as a prop to determine if Julia is talking

  useEffect(() => {
    if (isTalking) {
      setAnimation('Talking')
    } else {
      setAnimation('Idle')
    }
  }, [isTalking])

  useEffect(() => {
    actions[animation]
      .reset()
      .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
      .play()
    return () => actions[animation].fadeOut(0.5)
  }, [animation])

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <group scale={0.01}>
        <skinnedMesh
          name="Character"
          geometry={nodes.Character.geometry}
          material={materials.Character}
          skeleton={nodes.Character.skeleton}
          morphTargetDictionary={nodes.Character.morphTargetDictionary}
          morphTargetInfluences={nodes.Character.morphTargetInfluences}
        />
        <primitive object={nodes.RL_BoneRoot} />
      </group>
    </group>
  )
}

useGLTF.preload('/final.glb')
useGLTF.preload('/AnimationsGLB.glb')
