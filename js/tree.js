function createTensorTree(data, shape, dtype = 'int64', device = 'cpu') {
    const container = document.createElement('div');
    container.className = 'tensor-tree';

    let treeHTML = `<div class="tree-root">Tensor</div>`;
    treeHTML += `<div class="tree-connector">↓</div>`;
    
    if (shape.length === 1) {
        treeHTML += `<div class="tree-array" data-dim="0">[`;
        data.forEach((val, i) => {
            treeHTML += `<span class="tree-element dim0">${val}</span>`;
            if (i < data.length - 1) treeHTML += `, `;
        });
        treeHTML += `]</div>`;
        treeHTML += `<div class="index-labels" data-shape-length="${shape.length}">`;
        data.forEach((val, i) => {
            treeHTML += `<span class="tree-label">[${i}]</span>`;
        });
        treeHTML += `</div>`;
    } else if (shape.length === 2) {
        treeHTML += `<div class="tree-array" data-dim="0">[`;
        data.forEach((row, i) => {
            if (i > 0) treeHTML += `<div class="tree-connector">↳</div>`;
            treeHTML += `<div class="tree-array" data-dim="1">[`;
            row.forEach((val, j) => {
                treeHTML += `<span class="tree-element dim1">${val}</span>`;
                if (j < row.length - 1) treeHTML += `, `;
            });
            treeHTML += `]</div>`;
        });
        treeHTML += `]</div>`;
        treeHTML += `<div class="index-labels" data-shape-length="${shape.length}">`;
        data.forEach((row, i) => {
            row.forEach((val, j) => {
                treeHTML += `<span class="tree-label">[${i},${j}]</span>`;
            });
        });
        treeHTML += `</div>`;
    } else if (shape.length === 3) {
        treeHTML += `<div class="tree-array" data-dim="0">[`;
        data.forEach((matrix, i) => {
            if (i > 0) treeHTML += `<div class="tree-connector">↳</div>`;
            treeHTML += `<div class="tree-array" data-dim="1">[`;
            matrix.forEach((row, j) => {
                if (j > 0) treeHTML += `<div style="margin: 0.2rem 0;"></div>`;
                treeHTML += `<div class="tree-row">[`;
                row.forEach((val, k) => {
                    treeHTML += `<span class="tree-element dim2">${val}</span>`;
                    if (k < row.length - 1) treeHTML += `, `;
                });
                treeHTML += `]</div>`;
            });
            treeHTML += `]</div>`;
        });
        treeHTML += `]</div>`;
        treeHTML += `<div class="index-labels" data-shape-length="${shape.length}">`;
        data.forEach((matrix, i) => {
            matrix.forEach((row, j) => {
                row.forEach((val, k) => {
                    treeHTML += `<span class="tree-label">[${i},${j},${k}]</span>`;
                });
            });
        });
        treeHTML += `</div>`;
    }

    treeHTML += `<div class="tree-info">
        <span class="shape">shape=${JSON.stringify(shape)}</span>
        <span class="dtype">dtype=${dtype}</span>
        <span class="device">device=${device}</span>
    </div>`;

    container.innerHTML = treeHTML;
    return container;
}
