import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Target = (props) => {
    const targetRef = useRef();
    
    // 1. CHANGE: Load 'scene' instead of specific nodes. 
    // This is safer because it works with any .glb file you download.
    const { scene } = useGLTF('/models/target/target_stand.glb');

    useGSAP(() => {
        if (!targetRef.current) return;

        gsap.to(targetRef.current.position, {
            y: targetRef.current.position.y + 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
        });
    });

    return (
        <group {...props} dispose={null}>
            {/* 2. CHANGE: Use <primitive> instead of <mesh>. 
                This automatically renders whatever is inside the file.
            */}
            <primitive 
                object={scene} 
                ref={targetRef} 
                rotation={[0, Math.PI / 5, 0]} 
                scale={1.5} 
            />
        </group>
    );
};

export default Target;
