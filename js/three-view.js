function createTensor3D(data, shape, containerId, dtype = 'float32', device = 'cpu') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    container.style.width = '100%';
    container.style.height = '400px';
    container.style.position = 'relative';
    
    let tooltip = document.createElement('div');
    tooltip.className = 'three-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(139, 92, 246, 0.5);
        border-radius: 8px;
        padding: 12px 16px;
        color: #e2e8f0;
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        z-index: 100;
        pointer-events: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        display: block;
    `;
    container.appendChild(tooltip);
    
    let infoHTML = `<div style="margin-bottom: 8px; color: #fbbf24; font-weight: 600;">Tensor Info</div>`;
    infoHTML += `<div><span style="color: #7dd3fc;">shape</span> = ${JSON.stringify(shape)}</div>`;
    infoHTML += `<div><span style="color: #c4b5fd;">dtype</span> = ${dtype}</div>`;
    infoHTML += `<div><span style="color: #86efac;">device</span> = ${device}</div>`;
    tooltip.innerHTML = infoHTML;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0x3b82f6, 0.5);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.5);
    pointLight2.position.set(5, -5, -5);
    scene.add(pointLight2);
    
    const group = new THREE.Group();
    
    const cellSize = 1;
    const gap = 0.15;
    const totalSize = cellSize + gap;
    
    const colors = {
        0: 0x3b82f6,
        1: 0x10b981,
        2: 0x8b5cf6
    };
    
    const dim = shape.length;
    const color = colors[dim] || 0x3b82f6;
    
    if (shape.length === 1) {
        const length = shape[0];
        const offsetX = -(length * totalSize) / 2 + totalSize / 2;
        
        data.forEach((val, i) => {
            const geometry = new THREE.BoxGeometry(cellSize * 0.9, cellSize * 0.9, cellSize * 0.9);
            const material = new THREE.MeshPhongMaterial({
                color: getColorForValueThree(val),
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(offsetX + i * totalSize, 0, 0);
            cube.castShadow = true;
            cube.receiveShadow = true;
            
            cube.userData = { index: `[${i}]`, value: val };
            
            group.add(cube);
            
            const loader = new THREE.FontLoader();
        });
        
        const axisLength = length * totalSize + 1;
        const axisGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-axisLength/2, -1, 0),
            new THREE.Vector3(axisLength/2, -1, 0)
        ]);
        const axisMaterial = new THREE.LineBasicMaterial({ color: 0x7dd3fc });
        const axis = new THREE.Line(axisGeometry, axisMaterial);
        group.add(axis);
        
    } else if (shape.length === 2) {
        const rows = shape[0];
        const cols = shape[1];
        const offsetX = -(cols * totalSize) / 2 + totalSize / 2;
        const offsetZ = -(rows * totalSize) / 2 + totalSize / 2;
        
        data.forEach((row, i) => {
            row.forEach((val, j) => {
                const geometry = new THREE.BoxGeometry(cellSize * 0.9, cellSize * 0.9, cellSize * 0.9);
                const material = new THREE.MeshPhongMaterial({
                    color: getColorForValueThree(val),
                    shininess: 100,
                    transparent: true,
                    opacity: 0.9
                });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(
                    offsetX + j * totalSize,
                    0,
                    offsetZ + i * totalSize
                );
                cube.castShadow = true;
                cube.receiveShadow = true;
                
                cube.userData = { index: `[${i},${j}]`, value: val };
                
                group.add(cube);
            });
        });
        
        const gridHelper = new THREE.GridHelper(
            Math.max(rows, cols) * totalSize + 2,
            Math.max(rows, cols) + 2,
            0x334155,
            0x1e293b
        );
        gridHelper.position.y = -cellSize / 2 - 0.1;
        group.add(gridHelper);
        
    } else if (shape.length === 3) {
        const depth = shape[0];
        const rows = shape[1];
        const cols = shape[2];
        const offsetX = -(cols * totalSize) / 2 + totalSize / 2;
        const offsetY = (depth * totalSize) / 2;
        const offsetZ = -(rows * totalSize) / 2 + totalSize / 2;
        
        data.forEach((matrix, d) => {
            matrix.forEach((row, i) => {
                row.forEach((val, j) => {
                    const depthOffset = d * 0.2;
                    const geometry = new THREE.BoxGeometry(cellSize * 0.85, cellSize * 0.85, cellSize * 0.85);
                    const material = new THREE.MeshPhongMaterial({
                        color: getColorForValueThree(val),
                        shininess: 100,
                        transparent: true,
                        opacity: 0.9 - d * 0.1
                    });
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.set(
                        offsetX + j * totalSize - depthOffset * 0.5,
                        offsetY - d * totalSize - 0.3,
                        offsetZ + i * totalSize - depthOffset * 0.3
                    );
                    cube.castShadow = true;
                    cube.receiveShadow = true;
                    
                    cube.userData = { index: `[${d},${i},${j}]`, value: val };
                    
                    group.add(cube);
                });
            });
        });
    }
    
    scene.add(group);
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject = null;
    
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(group.children);
        
        if (hoveredObject) {
            hoveredObject.scale.set(1, 1, 1);
            hoveredObject = null;
        }
        
        if (intersects.length > 0) {
            hoveredObject = intersects[0].object;
            hoveredObject.scale.set(1.2, 1.2, 1.2);
            container.style.cursor = 'pointer';
        } else {
            container.style.cursor = 'default';
        }
    });
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    container.addEventListener('mousedown', (event) => {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });
    
    container.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    container.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaX = event.clientX - previousMousePosition.x;
            const deltaY = event.clientY - previousMousePosition.y;
            
            group.rotation.y += deltaX * 0.01;
            group.rotation.x += deltaY * 0.01;
            
            previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        group.children.forEach((child, index) => {
            if (child.geometry && child.geometry.type === 'SphereGeometry') {
                child.position.y += Math.sin(Date.now() * 0.002 + index) * 0.002;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function getColorForValueThree(val) {
    if (typeof val === 'number') {
        if (val === 0) return 0x1e293b;
        if (val === 1) return 0x0f766e;
        if (val >= 2 && val <= 3) return 0x15803d;
        if (val >= 4 && val <= 6) return 0x7c3aed;
        if (val > 6) return 0xdc2626;
        if (val > 0 && val < 1) {
            const hue = 0.5 + val * 0.1;
            return new THREE.Color().setHSL(hue, 0.7, 0.5).getHex();
        }
    }
    return 0x3b82f6;
}

function initAllThreeD() {
    tensorExamples.forEach(example => {
        const output = document.querySelector(`.output[data-for="${example.name}"]`);
        if (output) {
            const containerId = `three-${example.name}`;
            let container = document.getElementById(containerId);
            
            if (!container) {
                container = document.createElement('div');
                container.id = containerId;
                container.className = 'three-container';
                output.parentNode.insertBefore(container, output.nextSibling);
            }
            
            createTensor3D(example.data, example.shape, containerId, example.dtype, example.device);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initIntroShapes();
        initAllThreeD();
    }, 100);
});

function initIntroShapes() {
    createIntroShape('shape-1d', [[1, 1, 1]], [1, 3], '1D');
    createIntroShape('shape-2d', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [3, 3], '2D');
    createIntroShape('shape-3d', [[[1, 1], [1, 1]], [[1, 1], [1, 1]]], [2, 2, 2], '3D');
}

function createIntroShape(containerId, data, shape, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    container.style.width = '100%';
    container.style.height = '200px';
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const group = new THREE.Group();
    
    const colors = {
        '1D': 0x3b82f6,
        '2D': 0x10b981,
        '3D': 0x8b5cf6
    };
    
    const color = colors[type];
    const cellSize = 0.5;
    const gap = 0.1;
    
    if (shape.length === 1) {
        const offsetX = -(shape[0] * (cellSize + gap)) / 2 + cellSize / 2;
        for (let i = 0; i < shape[0]; i++) {
            const geometry = new THREE.BoxGeometry(cellSize * 0.9, cellSize * 0.9, cellSize * 0.9);
            const material = new THREE.MeshPhongMaterial({ color: color, shininess: 100 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(offsetX + i * (cellSize + gap), 0, 0);
            group.add(cube);
        }
    } else if (shape.length === 2) {
        const offsetX = -(shape[1] * (cellSize + gap)) / 2 + cellSize / 2;
        const offsetZ = -(shape[0] * (cellSize + gap)) / 2 + cellSize / 2;
        for (let i = 0; i < shape[0]; i++) {
            for (let j = 0; j < shape[1]; j++) {
                const geometry = new THREE.BoxGeometry(cellSize * 0.9, cellSize * 0.9, cellSize * 0.9);
                const material = new THREE.MeshPhongMaterial({ color: color, shininess: 100 });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(offsetX + j * (cellSize + gap), 0, offsetZ + i * (cellSize + gap));
                group.add(cube);
            }
        }
    } else if (shape.length === 3) {
        const offsetX = -(shape[2] * (cellSize + gap)) / 2 + cellSize / 2;
        const offsetY = (shape[0] * cellSize) / 2;
        const offsetZ = -(shape[1] * (cellSize + gap)) / 2 + cellSize / 2;
        for (let d = 0; d < shape[0]; d++) {
            for (let i = 0; i < shape[1]; i++) {
                for (let j = 0; j < shape[2]; j++) {
                    const depthOffset = d * 0.15;
                    const geometry = new THREE.BoxGeometry(cellSize * 0.85, cellSize * 0.85, cellSize * 0.85);
                    const material = new THREE.MeshPhongMaterial({ 
                        color: color, 
                        shininess: 100,
                        transparent: true,
                        opacity: 0.95 - d * 0.12
                    });
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.set(
                        offsetX + j * (cellSize + gap) - depthOffset * 0.5,
                        offsetY - d * cellSize - 0.2,
                        offsetZ + i * (cellSize + gap) - depthOffset * 0.3
                    );
                    group.add(cube);
                }
            }
        }
    }
    
    scene.add(group);
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    container.addEventListener('mouseup', () => { isDragging = false; });
    container.addEventListener('mouseleave', () => { isDragging = false; });
    
    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            group.rotation.y += deltaX * 0.01;
            group.rotation.x += deltaY * 0.01;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });
    
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.003;
        renderer.render(scene, camera);
    }
    animate();
}
