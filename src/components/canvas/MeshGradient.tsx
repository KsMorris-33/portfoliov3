"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork() {
    const count = 500;
    const groupRef = useRef<THREE.Group>(null!);
    const linesMaterialRef = useRef<THREE.ShaderMaterial>(null!);

    // 1. Inicializamos el Timer de forma persistente
    const timer = useMemo(() => new THREE.Timer(), []);

    const { positions, linePositions, lineDelays } = useMemo(() => {
        const nodes: THREE.Vector3[] = [];
        for (let i = 0; i < count; i++) {
            nodes.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                )
            );
        }

        const lines: number[] = [];
        const delays: number[] = [];

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = nodes[i].distanceTo(nodes[j]);
                if (dist < 2.5) {
                    lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
                    lines.push(nodes[j].x, nodes[j].y, nodes[j].z);

                    const delay = Math.random() * Math.PI * 2;
                    delays.push(delay, delay);
                }
            }
        }

        const posArray = new Float32Array(nodes.length * 3);
        for (let i = 0; i < nodes.length; i++) {
            posArray[i * 3] = nodes[i].x;
            posArray[i * 3 + 1] = nodes[i].y;
            posArray[i * 3 + 2] = nodes[i].z;
        }

        return {
            positions: posArray,
            linePositions: new Float32Array(lines),
            lineDelays: new Float32Array(delays),
        };
    }, []);

    useFrame((state) => {
        // 2. Actualizamos el timer con el tiempo actual de la simulación
        timer.update();
        const elapsedTime = timer.getElapsed();

        const rotationTime = elapsedTime * 0.05;

        if (groupRef.current) {
            groupRef.current.rotation.y = rotationTime;
            groupRef.current.rotation.x = rotationTime * 0.5;
        }

        if (linesMaterialRef.current) {
            // 3. Pasamos el tiempo del Timer al uniform del shader
            linesMaterialRef.current.uniforms.time.value = elapsedTime;
        }
    });

    const shaderArgs = useMemo(
        () => ({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color("#782424") },
            },
            vertexShader: `
                attribute float delay;
                varying float vAlpha;
                uniform float time;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    float pulse = sin(time * 2.0 + delay * 5.0);
                    vAlpha = smoothstep(0.85, 1.0, pulse);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vAlpha;
                void main() {
                    float finalAlpha = 0.05 + (vAlpha * 0.95);
                    gl_FragColor = vec4(color, finalAlpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        }),
        []
    );

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.03}
                    color="#FFFFFF"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {linePositions.length > 0 && (
                <lineSegments>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={linePositions.length / 3}
                            array={linePositions}
                            itemSize={3}
                            args={[linePositions, 3]}
                        />
                        <bufferAttribute
                            attach="attributes-delay"
                            count={lineDelays.length}
                            array={lineDelays}
                            itemSize={1}
                            args={[lineDelays, 1]}
                        />
                    </bufferGeometry>
                    <shaderMaterial
                        ref={linesMaterialRef}
                        {...shaderArgs}
                    />
                </lineSegments>
            )}
        </group>
    );
}

export default function MeshBackground() {
    return (
        <div className="fixed inset-0 -z-50 h-screen w-screen bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                <NeuralNetwork />
            </Canvas>
        </div>
    );
}