import React, {Suspense} from 'react'
import {Canvas} from "@react-three/fiber"
import {PerspectiveCamera} from "@react-three/drei";
import {HackerRoom} from "../components/HackerRoom.jsx";
import CanvasLoader from "../components/Loading.jsx";
import {useMediaQuery} from "react-responsive";
import { calculateSizes } from '../constants/index.js';
import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Target from '../components/Target.jsx';

const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile=useMediaQuery({maxWidth:768})
    const isTablet = useMediaQuery({minWidth:768,maxWidth:1024})
    const sizes = calculateSizes(isSmall, isMobile, isTablet);
    return (
        <section className="min-h-screen w-full flex flex-col relative">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-spcae gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I am Digonta <span className="waving-hand">👋🏼</span></p>
                <p className="hero_tag text-gray_gradient">AI researcher and Web Developer</p>
            </div>
            <div className="w-full h-full absolute inset-0">
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader/>}>
                        <PerspectiveCamera makeDefault position={[0,0,20]}/>
                        <HackerRoom scale={sizes.deskScale}
                                    position={sizes.deskPosition}
                                    rotation={[0.1, -Math.PI, 0]} />

                        <ambientLight intensity={1}/>
                        <directionalLight position={[10,10,10]} intensity={.5}/>
                    </Suspense>
                </Canvas>
            </div>
        </section>
    )
}
export default Hero
