(() => {
  const TOOLTIP_MAP = {
    "torch.Tensor":
      "โครงสร้างข้อมูลหลักของ PyTorch (คล้าย ndarray) รองรับ CPU/GPU และ autograd",
    "torch.nn":
      "เนมสเปซสำหรับสร้าง Neural Network: layers, losses, และโมเดล",
    "nn.Module":
      "คลาสฐานของโมเดล/เลเยอร์ใน PyTorch (นิยาม __init__ และ forward)",
    "model.parameters()":
      "คืน iterator ของพารามิเตอร์ที่เรียนรู้ได้ (ใช้ส่งให้ optimizer)",
    "model.train()":
      "โหมดเทรน: เปิดพฤติกรรม train-time (เช่น Dropout) และอัปเดต BatchNorm stats",
    "model.eval()":
      "โหมด inference: ปิด Dropout และใช้ running stats ของ BatchNorm",

    "torch.autograd":
      "เอนจิน autograd สำหรับสร้างกราฟคำนวณและคำนวณ gradients อัตโนมัติ",
    "torch.no_grad()":
      "ปิดการติดตามกราฟ/grad ชั่วคราว (เหมาะกับ inference, ใช้หน่วยความจำน้อยลง)",
    "requires_grad=True":
      "ให้ PyTorch ติดตามการคำนวณเพื่อหา gradient ของ Tensor นี้",
    "retain_graph=True":
      "เก็บกราฟไว้หลัง backward() เพื่อให้เรียก backward ซ้ำได้ (ใช้หน่วยความจำเพิ่ม)",
    "detach()":
      "ตัด Tensor ออกจากกราฟ autograd (ผลลัพธ์ไม่ไหล gradient ย้อนกลับ)",
    ".grad":
      "เก็บ gradient ของ leaf Tensor หลังเรียก backward()",
    "grad":
      "ค่า gradient (อนุพันธ์) ที่ใช้ในการอัปเดตพารามิเตอร์",
    ".grad_fn":
      "บอก operation ที่สร้าง Tensor นี้ (มักมีใน non-leaf Tensor)",
    "grad_fn":
      "ฟังก์ชันย้อนกลับของ operation ที่สร้าง Tensor (ใช้โดย autograd)",
    "Function":
      "ออบเจ็กต์ภายในที่ autograd ใช้แทน operation และวิธีคำนวณ gradient",
    "backward()":
      "คำนวณ gradient (backpropagation) ย้อนจากผลลัพธ์ไปยังพารามิเตอร์",
    ".backward()":
      "คำนวณ gradient (backpropagation) โดย autograd",
    "loss.backward()":
      "คำนวณ gradients จาก loss เพื่อใช้ให้ optimizer อัปเดตพารามิเตอร์",

    "optimizer.zero_grad()":
      "ล้าง gradients ที่สะสมจากรอบก่อน (ควรเรียกก่อน backward ในแต่ละสเต็ป)",
    "optimizer.step()":
      "อัปเดตพารามิเตอร์ตาม gradients และอัลกอริทึมของ optimizer",
    "nn.CrossEntropyLoss":
      "loss สำหรับ multi-class classification (รวม log-softmax + NLLLoss)",

    "state_dict":
      "พจนานุกรมเก็บ weights/buffers ของโมเดล (นิยมใช้เซฟ/โหลด)",
    "load_state_dict()":
      "โหลด weights จาก state_dict เข้าโมเดลที่มีโครงสร้างเดียวกัน",
    "torch.save":
      "บันทึกออบเจ็กต์ลงไฟล์ (serialization) เช่น state_dict/checkpoint",
    "torch.load":
      "โหลดออบเจ็กต์จากไฟล์ที่บันทึกด้วย torch.save (เลือก map_location ได้)",
    ".pth":
      "นามสกุลไฟล์ที่นิยมใช้เก็บ weights/checkpoint ของ PyTorch",
    "model.pth":
      "ชื่อไฟล์ตัวอย่างสำหรับเก็บโมเดล/weights ของ PyTorch",
    "pickle":
      "โมดูล serialization ของ Python (เซฟทั้งโมเดลจะผูกกับโค้ด/คลาสเดิม)",

    "Dataset":
      "คลาส/อินเทอร์เฟซชุดข้อมูล (กำหนด __len__ และ __getitem__)",
    "DataLoader":
      "ช่วยทำ batching, shuffling, และโหลดข้อมูลแบบขนานจาก Dataset",
    "TorchVision":
      "แพ็กเกจสำหรับงานภาพ: datasets, models, และ transforms",
    "TorchText":
      "แพ็กเกจสำหรับงานข้อความ/NLP",
    "TorchAudio":
      "แพ็กเกจสำหรับงานเสียง/audio",

    "Transforms":
      "ขั้นตอนแปลง/เตรียมข้อมูลก่อนป้อนเข้าโมเดล",
    "transform":
      "ฟังก์ชันแปลง input (เช่น รูปภาพ/ข้อมูลดิบ -> Tensor)",
    "target_transform":
      "ฟังก์ชันแปลง label/target (เช่น แปลงเป็น one-hot)",
    "ToTensor":
      "transform มาตรฐาน: แปลงรูปภาพ/array เป็น Tensor",
    "Lambda":
      "ห่อฟังก์ชันที่กำหนดเองให้ใช้งานเป็น transform ได้",
    "ndarray":
      "อาร์เรย์ของ NumPy (มักแปลงเป็น Tensor ก่อนส่งเข้าโมเดล)",
    "FloatTensor":
      "Tensor ชนิด float (ค่าเป็นทศนิยม) เหมาะกับการคำนวณของโมเดล",
    "scatter_":
      "in-place: เขียนค่าลง tensor ตาม index (มักใช้ทำ one-hot)",

    "torch.zeros":
      "สร้าง tensor ที่ทุกค่าเป็น 0 ตาม shape/dtype ที่กำหนด",
    "torch.cat":
      "ต่อ (concatenate) tensors ตามมิติ (dim) ที่กำหนด",
    "shape":
      "ขนาดมิติของ Tensor (tuple เช่น [N, C, H, W])",
    "item()":
      "ดึงค่า Python scalar ออกจาก Tensor ที่มีสมาชิกเดียว",
    "x.copy_(y)":
      "in-place: คัดลอกค่า y ลงใน x (underscore แปลว่าแก้ค่าตัวแปรเดิม)",
    "x.t_()":
      "in-place transpose สำหรับเมทริกซ์ 2D (underscore แปลว่าแก้ค่าตัวแปรเดิม)",

    "train_loop":
      "ชื่อฟังก์ชันตัวอย่าง: เทรนโมเดล 1 epoch/รอบ",
    "test_loop":
      "ชื่อฟังก์ชันตัวอย่าง: ประเมินผล/ทดสอบโมเดล",
  };

  const normalize = (text) => String(text || "").trim();

  function lookupTooltip(text) {
    const raw = normalize(text);
    if (!raw) return null;

    if (TOOLTIP_MAP[raw]) return TOOLTIP_MAP[raw];

    // If it's a call with args, try the callee name (e.g. torch.zeros(...), scatter_(...)).
    const openParen = raw.indexOf("(");
    if (openParen > 0) {
      const callee = raw.slice(0, openParen);
      if (TOOLTIP_MAP[callee]) return TOOLTIP_MAP[callee];
    }

    // If it contains dot access, try the last segment (e.g. loss.backward() -> backward()).
    const lastDot = raw.lastIndexOf(".");
    if (lastDot >= 0 && lastDot < raw.length - 1) {
      const tail = raw.slice(lastDot + 1);
      if (TOOLTIP_MAP[tail]) return TOOLTIP_MAP[tail];
    }

    return null;
  }

  function applyTooltips(root = document) {
    const codeEls = root.querySelectorAll("code");
    for (const codeEl of codeEls) {
      // Skip code blocks.
      if (codeEl.closest("pre")) continue;

      const text = normalize(codeEl.textContent);
      const tip = lookupTooltip(text);
      if (!tip) continue;

      codeEl.classList.add("pt-tip");
      codeEl.setAttribute("data-tooltip", tip);
      // Native tooltip fallback and a11y.
      if (!codeEl.getAttribute("title")) codeEl.setAttribute("title", tip);
      if (!codeEl.hasAttribute("tabindex")) codeEl.setAttribute("tabindex", "0");
      if (!codeEl.getAttribute("aria-label")) codeEl.setAttribute("aria-label", tip);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyTooltips());
  } else {
    applyTooltips();
  }
})();

