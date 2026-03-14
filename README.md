# torch-learning-by-hpc-ignite

เว็บสรุป/บทช่วยสอนภาษาไทยสำหรับเรียนรู้ **PyTorch เบื้องต้น** ในรูปแบบ Static HTML พร้อมตัวอย่างโค้ดและภาพประกอบ/แอนิเมชันบางส่วน

## เริ่มต้นใช้งาน

- เปิด `index.html` ด้วยเบราว์เซอร์ (ดับเบิลคลิกได้เลย)
- หรือรันเป็นเว็บโลคอล:

```bash
# Python 3
python -m http.server 8000

# Windows (ถ้าใช้ py launcher)
py -m http.server 8000
```

จากนั้นเปิด `http://localhost:8000`

หมายเหตุ: หน้าเว็บโหลด Tailwind/Fonts/Highlight.js ผ่าน CDN จึงต้องใช้อินเทอร์เน็ต

## หน้าเนื้อหา

- [`index.html`](index.html) : PyTorch 5W1H (Intro)
- [`tensor.html`](tensor.html) : Tensors
- [`datasets.html`](datasets.html) : Datasets
- [`transforms.html`](transforms.html) : Transforms
- [`buildmodel.html`](buildmodel.html) : Build Model
- [`autograd.html`](autograd.html) : Autograd
- [`optimization.html`](optimization.html) : Optimization
- [`saveloadrun.html`](saveloadrun.html) : Save/Load/Run

## เทคโนโลยีที่ใช้

- Tailwind CSS (CDN)
- Google Fonts
- Highlight.js (บางหน้า)

## แหล่งอ้างอิง

อ้างอิงจาก PyTorch Beginner Basics Tutorials (มีลิงก์อ้างอิงไว้ท้ายแต่ละหน้า)
