"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork() {
    const count = 500; // Nodos neuronales
    const groupRef = useRef<THREE.Group>(null!);
    const linesMaterialRef = useRef<THREE.ShaderMaterial>(null!);

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

        // Conectar nodos cercanos para crear la red neural
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = nodes[i].distanceTo(nodes[j]);
                if (dist < 2.5) { // Distancia máxima para conectar
                    lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
                    lines.push(nodes[j].x, nodes[j].y, nodes[j].z);

                    // Misma fase (delay) para ambos extremos de la línea
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
        const t = state.clock.elapsedTime * 0.05; // Rotación lenta de la red

        if (groupRef.current) {
            groupRef.current.rotation.y = t;
            groupRef.current.rotation.x = t * 0.5;
        }

        if (linesMaterialRef.current) {
            linesMaterialRef.current.uniforms.time.value = state.clock.elapsedTime;
        }
    });

    const shaderArgs = useMemo(
        () => ({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color("#782424") }, // Indigo resplandor
            },
            vertexShader: `
                attribute float delay;
                varying float vAlpha;
                uniform float time;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Ondulación para el brillo
                    float pulse = sin(time * 2.0 + delay * 5.0);
                    
                    // Solo brilla si el pulso está en su pico más alto
                    vAlpha = smoothstep(0.85, 1.0, pulse);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vAlpha;
                void main() {
                    // Opacidad base muy baja, sube drásticamente al brillar
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
                        />
                        <bufferAttribute
                            attach="attributes-delay"
                            count={lineDelays.length}
                            array={lineDelays}
                            itemSize={1}
                        />
                    </bufferGeometry>
                    <shaderMaterial
                        ref={linesMaterialRef}
                        args={[shaderArgs]}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
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