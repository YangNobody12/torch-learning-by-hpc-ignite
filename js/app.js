function createTensorVisual(data, shape) {
    const container = document.createElement('div');
    container.className = 'tensor-visual';
    
    let svg = '';
    const maxCells = Math.max(...shape);
    const isLarge = maxCells > 6;
    const cellSize = isLarge ? 24 : (maxCells > 4 ? 32 : 42);
    const gap = isLarge ? 2 : 4;
    const offsetX = isLarge ? 30 : 55;
    const offsetY = isLarge ? 25 : 45;
    const showLabels = !isLarge;
    
    svg += `<defs>
        <linearGradient id="cellGrad0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="cellGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="cellGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#6d28d9;stop-opacity:1" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
    </defs>`;
    
    if (shape.length === 1) {
        const width = shape[0] * (cellSize + gap) + offsetX * 2;
        const height = cellSize + offsetY * 2 + 35;
        
        svg = `<svg width="${width}" height="${height}" class="tensor-svg">`;
        
        data.forEach((val, i) => {
            const x = offsetX + i * (cellSize + gap);
            const color = getColorForValue(val);
            const gradId = shape.length === 1 ? 'cellGrad0' : (shape.length === 2 ? 'cellGrad1' : 'cellGrad2');
            svg += `<rect x="${x}" y="${offsetY}" width="${cellSize}" height="${cellSize}" 
                    fill="url(#${gradId})" rx="6" class="cell" filter="url(#shadow)">
                    <title>index ${i}: ${val}</title>
                    </rect>`;
            svg += `<rect x="${x}" y="${offsetY}" width="${cellSize}" height="${cellSize * 0.35}" 
                    fill="white" opacity="0.2" rx="6" style="pointer-events:none"/>
                    <text x="${x + cellSize/2}" y="${offsetY + cellSize/2 + 5}" 
                    class="cell-text" text-anchor="middle" filter="url(#glow)">${formatValue(val)}</text>`;
            if (showLabels) {
                svg += `<text x="${x + cellSize/2}" y="${offsetY + cellSize}" dy="3" 
                        class="index-label" text-anchor="middle">[${i}]</text>`;
            }
        });
        
        svg += `<line x1="${offsetX}" y1="${offsetY + cellSize + 30}" 
                x2="${offsetX + shape[0] * (cellSize + gap) - gap}" y2="${offsetY + cellSize + 30}" 
                class="axis-line"/>`;
        svg += `<text x="${offsetX + (shape[0] * (cellSize + gap) - gap)/2}" y="${offsetY + cellSize + 48}" 
                class="axis-label" text-anchor="middle">dim 0: ${shape[0]}</text>`;
        svg += `</svg>`;
        
    } else if (shape.length === 2) {
        const width = shape[1] * (cellSize + gap) + offsetX * 2 + 25;
        const height = shape[0] * (cellSize + gap) + offsetY * 2 + (showLabels ? 85 : 40);
        
        svg = `<svg width="${width}" height="${height}" class="tensor-svg">`;
        
        data.forEach((row, i) => {
            row.forEach((val, j) => {
                const x = offsetX + j * (cellSize + gap);
                const y = offsetY + i * (cellSize + gap);
                const color = getColorForValue(val);
                const gradId = shape.length === 1 ? 'cellGrad0' : (shape.length === 2 ? 'cellGrad1' : 'cellGrad2');
                svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" 
                        fill="url(#${gradId})" rx="6" class="cell" filter="url(#shadow)">
                        <title>[${i},${j}]: ${val}</title>
                        </rect>`;
                svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize * 0.35}" 
                        fill="white" opacity="0.2" rx="6" style="pointer-events:none"/>
                        <text x="${x + cellSize/2}" y="${y + cellSize/2 + 5}" 
                        class="cell-text" text-anchor="middle" filter="url(#glow)">${formatValue(val)}</text>`;
                if (showLabels) {
                    svg += `<text x="${x + cellSize/2}" y="${y + cellSize}" dy="3" 
                            class="index-label" text-anchor="middle">[${i},${j}]</text>`;
                }
            });
        });
        
        svg += `<line x1="${offsetX}" y1="${offsetY + shape[0] * (cellSize + gap) + 12}" 
                x2="${offsetX + shape[1] * (cellSize + gap) - gap}" y2="${offsetY + shape[0] * (cellSize + gap) + 12}" 
                class="axis-line"/>`;
        svg += `<text x="${offsetX + (shape[1] * (cellSize + gap) - gap)/2}" y="${offsetY + shape[0] * (cellSize + gap) + 30}" 
                class="axis-label" text-anchor="middle" fill="#fcd34d">cols: ${shape[1]}</text>`;
        
        svg += `<line x1="${offsetX - 15}" y1="${offsetY}" 
                x2="${offsetX - 15}" y2="${offsetY + shape[0] * (cellSize + gap) - gap}" 
                class="axis-line"/>`;
        svg += `<text x="${offsetX - 25}" y="${offsetY + (shape[0] * (cellSize + gap))/2}" 
                class="axis-label" text-anchor="middle" fill="#22d3d3" transform="rotate(-90, ${offsetX - 25}, ${offsetY + (shape[0] * (cellSize + gap))/2})">rows: ${shape[0]}</text>`;
        
        svg += `</svg>`;
        
    } else if (shape.length === 3) {
        const depth = shape[0];
        const rows = shape[1];
        const cols = shape[2];
        
        const cubeSize = cellSize * cols + gap * (cols - 1);
        const totalWidth = cubeSize * depth + gap * (depth - 1) + offsetX * 2 + 20;
        const totalHeight = cubeSize + offsetY * 2 + (showLabels ? 50 : 30);
        
        svg += `<svg width="${totalWidth}" height="${totalHeight}" class="tensor-svg">
        <defs>
        <linearGradient id="cellGrad3d" x1="0%" y12="100%"="0%" x y2="100%">
            <stop offset="0%" style="stop-color:#a78bfa;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#6d28d9;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="cellGrad3dTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#c4b5fd;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="cellGrad3dSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#5b21b6;stop-opacity:1" />
        </linearGradient>
        <filter id="glow3d" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="dropShadow3d" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="#000" flood-opacity="0.4"/>
        </filter>
        </defs>`;
        
        const angle = 0.3;
        const depthOffset = 8;
        
        svg += `<g transform="translate(15, 10)">`;
        
        data.forEach((matrix, d) => {
            const offset = d * (cubeSize + gap);
            const depthShift = d * depthOffset;
            
            if (showLabels) {
                svg += `<text x="${offsetX + offset + cubeSize/2}" y="${offsetY + cubeSize + 15}" 
                        class="dim-label" text-anchor="middle" font-size="11" fill="#a78bfa">depth[${d}]</text>`;
            }
            
            matrix.forEach((row, i) => {
                row.forEach((val, j) => {
                    const x = offsetX + offset + j * (cellSize + gap) - depthShift * 0.5;
                    const y = offsetY + i * (cellSize + gap) - depthShift * 0.3;
                    const opacity = 1 - d * 0.12;
                    
                    svg += `<g transform="translate(${-depthShift * 0.3}, ${-depthShift * 0.2})">
                        <path d="M${x + cellSize},${y} L${x + cellSize + 6},${y + 6} L${x + cellSize + 6},${y + cellSize + 6} L${x + cellSize},${y + cellSize} Z" 
                              fill="url(#cellGrad3dSide)" opacity="${opacity * 0.7}"/>
                        <path d="M${x},${y} L${x + cellSize},${y} L${x + cellSize + 6},${y + 6} L${x + 6},${y + 6} Z" 
                              fill="url(#cellGrad3dTop)" opacity="${opacity}"/>
                        <rect x="${x + 6}" y="${y + 6}" width="${cellSize}" height="${cellSize}" 
                              fill="url(#cellGrad3d)" rx="4" opacity="${opacity}" filter="url(#dropShadow3d)">
                              <title>[${d},${i},${j}]: ${val}</title>
                        </rect>
                        <text x="${x + 6 + cellSize/2}" y="${y + 6 + cellSize/2 + 4}" 
                              class="cell-text" text-anchor="middle" opacity="${opacity}" filter="url(#glow3d)">${formatValue(val)}</text>
                        </g>`;
                });
            });
            
            if (d < depth - 1) {
                svg += `<text x="${offsetX + offset + cubeSize + 15}" y="${offsetY + cubeSize/2}" 
                        class="depth-arrow" fill="#a78bfa" font-size="16" font-weight="bold">→</text>`;
            }
        });
        
        svg += `</g>`;
        
        svg += `</svg>`;
    }

    container.innerHTML = svg;
    return container;
}

function getColorForValue(val) {
    if (typeof val === 'number') {
        if (val === 0) return '#1e293b';
        if (val === 1) return '#0f766e';
        if (val >= 2 && val <= 3) return '#15803d';
        if (val >= 4 && val <= 6) return '#7c3aed';
        if (val > 6) return '#dc2626';
        if (val > 0 && val < 1) {
            const intensity = Math.floor(val * 255);
            return `hsl(${180 + intensity * 0.5}, 70%, ${30 + intensity * 0.2}%)`;
        }
    }
    return '#3b82f6';
}

function formatValue(val) {
    if (typeof val === 'number') {
        if (Number.isInteger(val)) return val;
        return val.toFixed(1);
    }
    return val;
}

const tensorExamples = [
    {
        name: 'tensor-from-data',
        data: [[1, 2], [3, 4]],
        shape: [2, 2],
        dtype: 'int64',
        device: 'cpu'
    },
    {
        name: 'tensor-numpy',
        data: [[1, 2], [3, 4]],
        shape: [2, 2],
        dtype: 'int64',
        device: 'cpu'
    },
    {
        name: 'tensor-ones',
        data: [[1, 1], [1, 1]],
        shape: [2, 2],
        dtype: 'int64',
        device: 'cpu'
    },
    {
        name: 'tensor-random',
        data: [[0.94, 0.79], [0.79, 0.47]],
        shape: [2, 2],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-rand-2x3',
        data: [[0.63, 0.98, 0.40], [0.89, 0.44, 0.62]],
        shape: [2, 3],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-ones-2x3',
        data: [[1, 1, 1], [1, 1, 1]],
        shape: [2, 3],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-zeros-2x3',
        data: [[0, 0, 0], [0, 0, 0]],
        shape: [2, 3],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-attr',
        data: [[0.1, 0.2, 0.3, 0.4], [0.5, 0.6, 0.7, 0.8], [0.9, 1.0, 1.1, 1.2]],
        shape: [3, 4],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-indexing',
        data: [[0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]],
        shape: [4, 4],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-cat',
        data: [[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1], [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1], [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1], [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1]],
        shape: [4, 12],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-matmull',
        data: [[3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3]],
        shape: [4, 4],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-element',
        data: [[1, 0, 1, 1], [1, 0, 1, 1], [1, 0, 1, 1], [1, 0, 1, 1]],
        shape: [4, 4],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-item',
        data: [12],
        shape: [1],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-before',
        data: [[1, 0, 1, 1], [1, 0, 1, 1], [1, 0, 1, 1], [1, 0, 1, 1]],
        shape: [4, 4],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-after',
        data: [[6, 5, 6, 6], [6, 5, 6, 6], [6, 5, 6, 6], [6, 5, 6, 6]],
        shape: [4, 4],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-numpy-ones',
        data: [[2, 2, 2, 2, 2]],
        shape: [1, 5],
        dtype: 'float32',
        device: 'cpu'
    },
    {
        name: 'tensor-numpy-from',
        data: [[2, 2, 2, 2, 2]],
        shape: [1, 5],
        dtype: 'float64',
        device: 'cpu'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initAllThreeD();
    }, 200);
    
    tensorExamples.forEach(example => {
        const output = document.querySelector(`.output[data-for="${example.name}"]`);
        if (output) {
            const tree = createTensorTree(example.data, example.shape, example.dtype);
            output.parentNode.insertBefore(tree, output.nextSibling);
        }
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
