import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useLipsync } from '../../hooks/useLipsync';
import { useHeadTracking } from '../../hooks/useHeadTracking';

export function Athena(props) {
  const { nodes, materials, scene } = useGLTF('/athena.glb')
  const { animations } = useGLTF('/animations.glb');
  const athenaRef = useRef()
  const { actions, mixer } = useAnimations(animations, athenaRef);
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === 'Idle') ? 'Idle' : animations[0].name
  );
  const { client } = props;

  useEffect(() => {
    client?.convaiClient.current.sendTextChunk("");
  }, [])

  useEffect(() => {
    if (client?.isTalking) {
      setAnimation('Idle');
    } else {
      setAnimation('Idle');
    }
  }, [client?.isTalking]);
  useEffect(() => {
    actions[animation]
      .reset()
      .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
      .play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);


  useLipsync({ client, characterRef: athenaRef, nodes, scene });
  useHeadTracking({ client, nodes });
  return (
    <group ref={athenaRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="athenaMesh" scale={0.01}>
          <skinnedMesh
            name="athenaSkinnedMesh_1"
            geometry={nodes.athenaSkinnedMesh_1.geometry}
            material={materials.Character}
            skeleton={nodes.athenaSkinnedMesh_1.skeleton}
            morphTargetDictionary={nodes.athenaSkinnedMesh_1.morphTargetDictionary}
            morphTargetInfluences={nodes.athenaSkinnedMesh_1.morphTargetInfluences}
          />
          <primitive object={nodes.CC_Base_BoneRoot} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/athena.glb')
