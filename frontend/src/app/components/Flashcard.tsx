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
    const geometry = new THREE.BoxGeometry(2.5, 1.5, 0.08);
    const materials: THREE.Material[] = [];
    const textureLoader = new THREE.TextureLoader();

    if (frontImageUrl) {
      const frontTexture = textureLoader.load(frontImageUrl);
      materials[4] = new THREE.MeshStandardMaterial({ map: frontTexture });
    } else {
      materials[4] = new THREE.MeshStandardMaterial({ 
        color, 
        roughness: 0.4, 
        metalness: 0.2 
      });
    }

    if (backImageUrl) {
      const backTexture = textureLoader.load(backImageUrl);
      materials[5] = new THREE.MeshStandardMaterial({ map: backTexture });
    } else {
      materials[5] = new THREE.MeshStandardMaterial({ 
        color: color === 0x3b82f6 ? 0x1e40af : color, 
        roughness: 0.4, 
        metalness: 0.2 
      });
    }

    const sideMaterial = new THREE.MeshStandardMaterial({ 
      color, 
      roughness: 0.4, 
      metalness: 0.2 
    });
    materials[0] = sideMaterial;
    materials[1] = sideMaterial;
    materials[2] = sideMaterial;
    materials[3] = sideMaterial;

    this.mesh = new THREE.Mesh(geometry, materials);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
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
      this.mesh.material.forEach(mat => mat.dispose());
    } else {
      this.mesh.material.dispose();
    }
  }
}

export default Flashcard;
