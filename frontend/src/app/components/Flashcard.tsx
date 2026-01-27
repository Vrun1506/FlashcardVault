import * as THREE from 'three';

class Flashcard {
  mesh: THREE.Mesh;
  userData: {
    originalIndex: number;
    targetZ: number;
    isAnimating: boolean;
    animationProgress: number;
  };

  constructor(color: number, index: number, frontImageUrl?: string, backImageUrl?: string) {
    // 🎯 INCREASED SIZE: Changed from (2.5, 1.5, 0.08) to (4, 2.4, 0.1)
    // This makes cards ~60% larger while maintaining the same aspect ratio
    const geometry = new THREE.BoxGeometry(4, 2.4, 0.1);
    const materials: THREE.Material[] = [];
    const loader = new THREE.TextureLoader();

    // Side Materials (Edges: Faces 0, 1, 2, 3)
    const sideMaterial = new THREE.MeshStandardMaterial({ 
      color, 
      roughness: 0.4, 
      metalness: 0.2 
    });
    for (let i = 0; i < 4; i++) materials[i] = sideMaterial;

    // Front Face (Face 4)
    if (frontImageUrl && frontImageUrl !== "") {
      const frontTexture = loader.load(frontImageUrl);
      // Ensure proper texture mapping for larger cards
      frontTexture.colorSpace = THREE.SRGBColorSpace;
      materials[4] = new THREE.MeshStandardMaterial({ 
        map: frontTexture,
        roughness: 0.3,
        metalness: 0.1
      });
    } else {
      materials[4] = new THREE.MeshStandardMaterial({ color, roughness: 0.4 });
    }

    // Back Face (Face 5)
    if (backImageUrl && backImageUrl !== "") {
      const backTexture = loader.load(backImageUrl);
      // Ensure proper texture mapping for larger cards
      backTexture.colorSpace = THREE.SRGBColorSpace;
      materials[5] = new THREE.MeshStandardMaterial({ 
        map: backTexture,
        roughness: 0.3,
        metalness: 0.1
      });
    } else {
      materials[5] = new THREE.MeshStandardMaterial({ 
        color: color === 0x3b82f6 ? 0x1e40af : color, 
        roughness: 0.4 
      });
    }

    this.mesh = new THREE.Mesh(geometry, materials);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    // Initial gallery position
    this.mesh.position.set(-8, 0, -index * 0.3);
    this.mesh.rotation.y = Math.PI / 2;

    this.userData = {
      originalIndex: index,
      targetZ: -index * 0.3,
      isAnimating: false,
      animationProgress: 0,
    };
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.mesh);
  }

  updatePosition(x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z);
  }

  updateRotation(x: number, y: number, z: number) {
    this.mesh.rotation.set(x, y, z);
  }

  dispose() {
    this.mesh.geometry.dispose();
    if (Array.isArray(this.mesh.material)) {
      this.mesh.material.forEach(mat => {
        if (mat instanceof THREE.MeshStandardMaterial && mat.map) {
          mat.map.dispose();
        }
        mat.dispose();
      });
    } else {
      if (this.mesh.material instanceof THREE.MeshStandardMaterial && this.mesh.material.map) {
        this.mesh.material.map.dispose();
      }
      this.mesh.material.dispose();
    }
  }
}

export default Flashcard;
