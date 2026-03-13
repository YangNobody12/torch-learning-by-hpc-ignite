const keywordTooltips = {
    // Tensor operations
    'torch.tensor': 'สร้าง Tensor จากข้อมูลที่กำหนด (List, Array, ฯลฯ)',
    'torch.from_numpy': 'แปลง NumPy Array เป็น Tensor (แชร์ memory)',
    'torch.zeros': 'สร้าง Tensor ที่มีค่า 0 ทุกตำแหน่ง',
    'torch.ones': 'สร้าง Tensor ที่มีค่า 1 ทุกตำแหน่ง',
    'torch.rand': 'สร้าง Tensor ค่าสุ่ม 0-1 (uniform distribution)',
    'torch.randn': 'สร้าง Tensor ค่าสุ่ม (normal distribution)',
    'torch.empty': 'สร้าง Tensor ที่ไม่ได้ initialize (ค่าขยะ)',
    'torch.arange': 'สร้าง Tensor เป็นช่วงตัวเลข (like np.arange)',
    'torch.linspace': 'สร้าง Tensor เป็นช่วงตัวเลขแบบ linear spacing',
    'torch.eye': 'สร้าง Identity Matrix (เมทริกซ์เอกลักษณ์)',
    'torch.rand_like': 'สร้าง Tensor ขนาดเท่ากับ input แต่ค่าสุ่ม',
    'torch.ones_like': 'สร้าง Tensor ขนาดเท่ากับ input แต่ค่า 1',
    'torch.zeros_like': 'สร้าง Tensor ขนาดเท่ากับ input แต่ค่า 0',
    'torch.cat': 'ต่อ Tensor ตามมิติที่กำหนด',
    'torch.stack': 'Stack Tensor ใหม่เป็นมิติใหม่',
    'torch.reshape': 'เปลี่ยนรูปร่าง Tensor ใหม่',
    'torch.matmul': 'Matrix multiplication (คูณเมทริกซ์)',
    'torch.mm': 'คูณเมทริกซ์ (2D x 2D)',
    'torch.add': 'บวก Tensor',
    'torch.sub': 'ลบ Tensor',
    'torch.mul': 'คูณ Tensor (element-wise)',
    'torch.div': 'หาร Tensor',
    'torch.sum': 'รวมค่าทั้งหมด',
    'torch.mean': 'หาค่าเฉลี่ย',
    'torch.max': 'หาค่าสูงสุด',
    'torch.min': 'หาค่าต่ำสุด',
    'torch.cuda': 'GPU operations ของ PyTorch',
    'torch.device': 'สร้าง device object (cpu/cuda)',
    'torch.Size': 'Size object ของ Tensor shape',
    'torch.float32': 'Float 32-bit data type',
    'torch.float64': 'Float 64-bit (double) data type',
    'torch.int32': 'Integer 32-bit data type',
    'torch.int64': 'Integer 64-bit data type',
    'torch.accelerator.current_accelerator': 'ตรวจสอบ accelerator ปัจจุบัน (CUDA, MPS, XPU)',
    'torch.accelerator.is_available': 'ตรวจสอบว่า accelerator พร้อมใช้งานหรือไม่',
    // Dataset & DataLoader
    'Dataset': 'ตัวเก็บข้อมูลและ labels สำหรับ Machine Learning',
    'DataLoader': 'รวม Dataset เป็น batch, shuffle, และโหลดข้อมูลแบบ parallel',
    'FashionMNIST': 'Dataset ภาพเสื้อผ้า 28x28 grayscale มี 10 classes',
    'torch.utils.data.Dataset': 'Base class สำหรับสร้าง Dataset ของตัวเอง',
    'torch.utils.data.DataLoader': 'Class สำหรับโหลดข้อมูลเป็น batch',
    'batch_size': 'จำนวน sample ต่อ batch',
    'shuffle': 'สุ่มข้อมูลทุก epoch เพื่อลด overfitting',
    'num_workers': 'จำนวน process สำหรับโหลดข้อมูลพร้อมกัน',
    '__init__': 'ฟังก์ชันที่รันตอนสร้าง object (constructor)',
    '__len__': 'ฟังก์ชันคืนค่าจำนวนข้อมูลทั้งหมด',
    '__getitem__': 'ฟังก์ชันโหลดและคืนข้อมูลที่ index ที่กำหนด',
    // Transforms
    'transforms': 'Module สำหรับแปลงข้อมูล',
    'ToTensor': 'แปลง PIL Image หรือ NumPy array เป็น Tensor [0,1]',
    'Normalize': 'ปรับ mean และ std ของ Tensor',
    'Resize': 'ปรับขนาดภาพ',
    'CenterCrop': 'ตัดภาพตรงกลาง',
    'RandomHorizontalFlip': 'พลิกภาพซ้าย-ขวาแบบสุ่ม (Data Augmentation)',
    'RandomRotation': 'หมุนภาพแบบสุ่ม (Data Augmentation)',
    'RandomCrop': 'ตัดภาพแบบสุ่ม (Data Augmentation)',
    'ColorJitter': 'ปรับสี ความสว่าง ความเข้มข้น',
    'Lambda': 'ใช้ function ที่กำหนดเองในการแปลงข้อมูล',
    'Compose': 'รวม transforms หลายตัวเข้าด้วยกัน',
    'transform': 'แปลง input (features)',
    'target_transform': 'แปลง label',
    'PIL': 'Python Imaging Library - รูปแบบภาพใน Python',
    'ndarray': 'N-dimensional array ของ NumPy',
    'scatter_': 'กระจายค่าไปยัง index ที่กำหนดใน tensor',
    'one-hot': 'การเข้ารหัสที่มีเพียง 1 ตำแหน่งเป็น 1 ที่เหลือเป็น 0',
    'Data Augmentation': 'เทคนิคเพิ่มข้อมูลโดยการแปลงภาพ (flip, rotate, crop)',
    'normalize': 'การปรับค่าให้อยู่ในช่วงที่เหมาะสม (mean=0, std=1)',
    // Neural Network / Model Building
    'nn.Module': 'Base class สำหรับทุก neural network module ใน PyTorch',
    'torch.nn': 'Namespace ที่มี building blocks สำหรับสร้าง neural network',
    'nn.Linear': 'Linear transformation: y = xW^T + b (Fully connected layer)',
    'nn.ReLU': 'Rectified Linear Unit - activation function: max(0, x)',
    'nn.Flatten': 'แปลง multi-dimensional input เป็น 1D',
    'nn.Sequential': 'Container ที่รวม modules ไว้ด้วยกันตามลำดับ',
    'nn.Softmax': 'แปลง logits เป็น probabilities (รวม = 1)',
    'nn.Parameter': 'Tensor ที่ถูก register เป็น parameter ของ module',
    'in_features': 'จำนวน input features ของ layer',
    'out_features': 'จำนวน output features ของ layer',
    'bias': 'มี bias term หรือไม่',
    'super().__init__()': 'เรียก parent class constructor',
    'forward': 'Method ที่กำหนดการคำนวณจริงของ model',
    'logits': 'Raw output values จาก model ก่อนผ่าน softmax',
    'parameters()': 'Method คืน iterator ของ parameters ทั้งหมด',
    'named_parameters()': 'Method คืน iterator ของ (name, parameter) ทั้งหมด',
    'to(device)': 'ย้าย model ไปยัง device (CPU/GPU)',
    'device': 'อุปกรณ์ที่ model ทำงาน (cpu/cuda)',
    '.to': 'ย้าย Tensor ไป device อื่น',
    '.cuda': 'ย้าย Tensor ไป GPU',
    '.cpu': 'ย้าย Tensor ไป CPU',
    'argmax': 'หา index ของค่าสูงสุด',
    // Tensor methods
    '.shape': 'รูปร่างของ Tensor (จำนวนมิติแต่ละมิติ)',
    '.dtype': 'ชนิดข้อมูลของ Tensor (int, float, etc.)',
    '.device': 'อุปกรณ์ที่ Tensor อยู่ (CPU/GPU)',
    '.T': 'Transpose ของ Tensor (สลับแถว-คอลัมน์)',
    '.t()': 'Transpose ของ Tensor 2 มิติ',
    '.view': 'ดู Tensor ในรูปร่างใหม่ (ไม่เปลี่ยนข้อมูล)',
    '.flatten': 'แปลง Tensor เป็น 1 มิติ',
    '.squeeze': 'ลบมิติที่มีขนาด 1 ออก',
    '.unsqueeze': 'เพิ่มมิติขนาด 1',
    '.item()': 'ดึงค่า Python จาก Tensor 1 ตัว',
    '.numpy()': 'แปลง Tensor เป็น NumPy Array',
    '.tolist()': 'แปลง Tensor เป็น Python List',
    '.clone()': 'สำเนา Tensor ใหม่',
    '.detach()': 'ตัด connection กับ computation graph',
    'requires_grad': 'เปิดใช้งาน automatic differentiation',
    '.grad': 'ดู gradient ที่คำนวณได้',
    'backward()': 'คำนวณ gradient ย้อนกลับ',
    'torch.no_grad': 'ปิดการคำนวณ gradient (เพิ่ม performance)',
    // Other
    'print': 'แสดงผล Tensor',
    'len': 'จำนวนมิติแรก (shape[0])',
    'type': 'ดูชนิด Python ของ object',
    'np.array': 'สร้าง NumPy Array',
    'np.zeros': 'สร้าง NumPy Array ค่า 0',
    'np.ones': 'สร้าง NumPy Array ค่า 1',
    'tensor': 'PyTorch Tensor - โครงสร้างข้อมูลหลัก',
    'dim': 'มิติที่จะดำเนินการ (dimension)',
    'dtype': 'data type ของ Tensor',
    // Optimization
    'torch.optim': 'Module สำหรับ optimization algorithms',
    'torch.optim.SGD': 'Stochastic Gradient Descent - ปรับ weights ตาม gradient',
    'torch.optim.Adam': 'Adam optimizer - adaptive learning rates',
    'lr': 'Learning rate - ขนาดก้าวในการเรียนรู้',
    'learning_rate': 'Learning rate - ขนาดก้าวในการเรียนรู้',
    'optimizer': 'Optimizer - อัลกอริทึมสำหรับปรับ parameters',
    'optimizer.step()': 'อัพเดท parameters ตาม gradients',
    'optimizer.zero_grad()': 'ล้าง gradients ก่อน backward pass ใหม่',
    'zero_grad()': 'ล้าง gradients ก่อน backward pass ใหม่',
    'step()': 'อัพเดท parameters ตาม gradients',
    'model.train()': 'ตั้งโหมด training (เปิด dropout, batch norm)',
    'model.eval()': 'ตั้งโหมด evaluation (ปิด dropout, batch norm)',
    'train()': 'ตั้งโหมด training',
    'eval()': 'ตั้งโหมด evaluation',
    'loss': 'Loss - ค่าความผิดพลาดระหว่าง prediction กับ target',
    'loss_fn': 'Loss function - ฟังก์ชันวัดความผิดพลาด',
    'nn.CrossEntropyLoss': 'Cross Entropy Loss สำหรับ classification',
    'nn.MSELoss': 'Mean Squared Error Loss สำหรับ regression',
    'nn.NLLLoss': 'Negative Log Likelihood Loss',
    'Epoch': 'Epoch - หนึ่งรอบของการ train ผ่านข้อมูลทั้งหมด',
    'epoch': 'Epoch - หนึ่งรอบของการ train ผ่านข้อมูลทั้งหมด',
    'epochs': 'จำนวนรอบในการ train ทั้งหมด',
    'batch': 'Batch - กลุ่มข้อมูลที่ประมวลผลพร้อมกัน',
    'gradient': 'Gradient - ทิศทางและขนาดที่ต้องปรับ parameters',
    'gradients': 'Gradients - ค่า derivative ของ loss ต่อ parameters',
    'Backpropagation': 'Backpropagation - การคำนวณ gradients ย้อนกลับ',
    'backward': 'Backward pass - คำนวณ gradients ย้อนกลับ',
    'forward': 'Forward pass - คำนวณผลลัพธ์จาก input',
    'parameters': 'Parameters - weights และ biases ที่ต้อง train',
    'weights': 'Weights - ค่าที่ต้องเรียนรู้ใน neural network',
    'bias': 'Bias - ค่า offset ที่เพิ่มให้กับ output',
    'Hyperparameters': 'Hyperparameters - ค่าที่กำหนดก่อน train',
    'hyperparameters': 'Hyperparameters - ค่าที่กำหนดก่อน train'
};

function initKeywordTooltips() {
    const keywords = Object.keys(keywordTooltips).sort((a, b) => b.length - a.length);
    
    document.querySelectorAll('code').forEach(codeBlock => {
        let html = codeBlock.innerHTML;
        
        keywords.forEach(keyword => {
            const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escaped})(?!<)`, 'g');
            html = html.replace(regex, '<span class="keyword" data-kw="$1">$1</span>');
        });
        
        codeBlock.innerHTML = html;
    });
    
    const tooltip = document.createElement('div');
    tooltip.id = 'keyword-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(15, 23, 42, 0.98);
        border: 1px solid rgba(251, 191, 36, 0.6);
        border-radius: 8px;
        padding: 10px 14px;
        color: #f1f5f9;
        font-family: 'Prompt', sans-serif;
        font-size: 13px;
        max-width: 320px;
        z-index: 10000;
        pointer-events: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        display: none;
        line-height: 1.5;
    `;
    document.body.appendChild(tooltip);
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('keyword') && e.target.hasAttribute('data-kw')) {
            const keyword = e.target.getAttribute('data-kw');
            const desc = keywordTooltips[keyword];
            if (desc) {
                tooltip.innerHTML = `<strong style="color: #fbbf24; font-size: 14px;">${keyword}</strong><br><span style="color: #cbd5e1; font-size: 12px;">${desc}</span>`;
                tooltip.style.display = 'block';
            }
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (tooltip.style.display === 'block') {
            let x = e.clientX + 15;
            let y = e.clientY + 15;
            
            const rect = tooltip.getBoundingClientRect();
            if (x + rect.width > window.innerWidth) {
                x = e.clientX - rect.width - 15;
            }
            if (y + rect.height > window.innerHeight) {
                y = e.clientY - rect.height - 15;
            }
            
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('keyword')) {
            tooltip.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', initKeywordTooltips);
