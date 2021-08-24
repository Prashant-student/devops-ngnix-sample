import React, {useState, Suspense, useRef} from 'react'
import './App.scss'
import Header from "./components/Header";
import {Canvas, useFrame} from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";
import {Section} from "./components/Section";
import {useInView} from "react-intersection-observer";

function Model() {
    const gltf = useGLTFLoader('/engine.gltf', true);
    return <primitive object={gltf.scene} dispose={null} />;
}

const HTMLcontent = () => {
    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.01));
    const [refItem, inView] = useInView({
        threshold: 0,
    });
    return(
        <Section factor={1.5} offset={1}>
            <group position={[0,250,0]}>
                <mesh ref={ref} position={[0,-35,0]}>
                    <Model/>
                </mesh>
                <Html fullscreen>
                    <div className="container">
                    </div>
                </Html>
            </group>
        </Section>
    )
}

const Lights = () => {
    return (
        <>
            {/* Ambient Light illuminates lights for all objects */}
            <ambientLight intensity={0.3} />
            {/* Diretion light */}
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight
                castShadow
                position={[0, 10, 0]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            {/* Spotlight Large overhead light */}
            <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
        </>
    );
};

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Header/>
      <Canvas
      colorManagement
      camera={{ position: [0 ,0 ,120], fov: 70}}>
          <Lights/>
          <Suspense fallback={null}>
              <HTMLcontent/>
          </Suspense>
      </Canvas>
    </div>
  )
}

export default App

