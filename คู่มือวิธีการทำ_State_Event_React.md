# คู่มือวิธีการทำ: การจัดการ State และ Event ใน React.js

**หน่วยที่ 6** · วิชา การออกแบบและพัฒนาเว็บไซต์ (21901-2013) · ปวช.1 เทคโนโลยีสารสนเทศ กลุ่ม 1/2
ผู้สอน: นายชูชาติ แซ่เตียว · เวลาเรียน 3 ชั่วโมง (ทฤษฎี 1 + ปฏิบัติ 2)

เอกสารนี้สรุป "วิธีการทำ" จากสไลด์หน่วยที่ 6 เป็นขั้นตอนที่ทำตามได้ทีละข้อ พร้อมโค้ดตัวอย่าง

---

## สารบัญ

1. [เตรียมโปรเจกต์](#1-เตรียมโปรเจกต์)
2. [วิธีใช้ useState](#2-วิธีใช้-usestate)
3. [วิธีอัปเดต State แบบต่าง ๆ](#3-วิธีอัปเดต-state-แบบต่าง-ๆ)
4. [วิธีจัดการ Event](#4-วิธีจัดการ-event)
5. [วิธีทำฟอร์ม (Controlled Component)](#5-วิธีทำฟอร์ม-controlled-component)
6. [ใบงานที่ 6: ทำ AddPostForm ทีละขั้น](#6-ใบงานที่-6-ทำ-addpostform-ทีละขั้น)
7. [ใบกิจกรรมที่ 6: วิธีทำ 4 ภารกิจ](#7-ใบกิจกรรมที่-6-วิธีทำ-4-ภารกิจ)
8. [ใบมอบหมายงานที่ 6: วิธีทำ Mini Post Manager](#8-ใบมอบหมายงานที่-6-วิธีทำ-mini-post-manager)
9. [ข้อผิดพลาดที่พบบ่อยและวิธีแก้](#9-ข้อผิดพลาดที่พบบ่อยและวิธีแก้)
10. [แบบทดสอบพร้อมเฉลย](#10-แบบทดสอบพร้อมเฉลย)
11. [เกณฑ์คะแนนและเอกสารอ้างอิง](#11-เกณฑ์คะแนนและเอกสารอ้างอิง)

---

## 1. เตรียมโปรเจกต์

ใช้โปรเจกต์ React (Vite) จากใบงานที่ 4 ถ้ายังไม่มี ให้สร้างใหม่

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

1. เปิดโปรเจกต์ใน VS Code
2. เปิด Terminal แล้วรัน `npm run dev` เปิดเว็บตามที่อยู่ที่แสดง
3. สร้างโฟลเดอร์ `src/components` และสร้างไฟล์ Component ในนั้น (ชื่อไฟล์ขึ้นต้นด้วยตัวพิมพ์ใหญ่ เช่น `AddPostForm.jsx`)
4. บันทึกไฟล์ทุกครั้งก่อนดูผลในเบราว์เซอร์ และดู Error ใน Console เมื่อมีปัญหา

---

## 2. วิธีใช้ useState

### แนวคิด

- **State** คือข้อมูลภายใน Component ที่เปลี่ยนได้ตามการใช้งานของผู้ใช้
- เมื่อ State เปลี่ยน React จะ **Re-render** หน้าจอให้ตรงกับข้อมูลล่าสุด
- ตัวแปรธรรมดา (`let count = 0`) ใช้แทน State ไม่ได้ เพราะเปลี่ยนค่าแล้ว React ไม่รู้ว่าต้อง Render ใหม่

วงจรการทำงาน: **ผู้ใช้กระทำ → setState เปลี่ยนค่า → Re-render → หน้าจอแสดงค่าใหม่**

### ขั้นตอนการใช้

1. นำเข้า Hook
2. ประกาศ State ที่ระดับบนสุดของ Component
3. แสดงค่า `state` ใน JSX
4. เปลี่ยนค่าด้วย `setState` เท่านั้น

```jsx
import { useState } from 'react';

const [state, setState] = useState(ค่าเริ่มต้น);
```

| ส่วน | ความหมาย |
|---|---|
| `state` | ค่าปัจจุบันของข้อมูล |
| `setState` | ฟังก์ชันเปลี่ยนค่า และทำให้หน้าจอ Render ใหม่ |
| ค่าเริ่มต้น | ค่าตอนแสดงผลครั้งแรก เช่น `0`, `''`, `[]` |

`useState` คืนค่าเป็น Array 2 ตัว จึงใช้ Array Destructuring ตั้งชื่อเอง โดยนิยมตั้งเป็น `[ชื่อ, setชื่อ]`

### เลือกชนิดข้อมูลของ State

```jsx
const [age, setAge] = useState(0);          // ตัวเลข
const [name, setName] = useState('');       // ข้อความ
const [open, setOpen] = useState(false);    // จริง/เท็จ
const [list, setList] = useState([]);       // Array
const [user, setUser] = useState({ id: 1 });// Object
```

### ตัวอย่างที่ 1: Counter

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>คลิก {count} ครั้ง</p>
      <button onClick={() => setCount(count + 1)}>เพิ่ม</button>
    </div>
  );
}
```

ลำดับการทำงาน: เริ่ม `count = 0` → กดปุ่ม → `setCount(1)` → React Render ใหม่ → หน้าจอแสดง "คลิก 1 ครั้ง"

### ตัวอย่างที่ 2: สลับเปิด/ปิดด้วย Boolean

```jsx
function Toggle() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>สลับ</button>
      {show && <p>สวัสดี</p>}
    </div>
  );
}
```

- `!show` สลับค่า true ↔ false
- `show && ...` แสดงข้อความเฉพาะเมื่อค่าเป็น true

### กฎของ Hook (ต้องจำ)

1. เรียกที่ **ระดับบนสุด** ห้ามเรียกใน `if`, `for` หรือฟังก์ชันย่อย
2. เรียกใน **Function Component** หรือ Custom Hook เท่านั้น
3. **ห้ามแก้ค่าตรง ๆ** ต้องใช้ `setState` เสมอ (ไม่ใช่ `count = 5`)
4. ชื่อ Hook ขึ้นต้นด้วย `use` เสมอ

### เปรียบเทียบ State กับ Props

| หัวข้อ | State | Props |
|---|---|---|
| ที่มาของข้อมูล | สร้างภายใน Component เอง | ส่งมาจาก Component แม่ |
| การแก้ไขค่า | แก้ได้ด้วย `setState` | แก้ไม่ได้ (อ่านอย่างเดียว) |
| เมื่อค่าเปลี่ยน | Component Render ใหม่ | Render ใหม่เมื่อแม่ส่งค่าใหม่ |

---

## 3. วิธีอัปเดต State แบบต่าง ๆ

หลักใหญ่: **อย่าแก้ State ตรง ๆ ให้สร้างค่าใหม่แล้วส่งให้ `setState`**

### State แบบ Object: ใช้ Spread Operator

```jsx
const [user, setUser] = useState({ name: 'สมชาย', age: 16 });

// เปลี่ยนเฉพาะ age
setUser({ ...user, age: 17 });
```

ห้ามเขียน `user.age = 17` เพราะแก้ค่าเดิมโดยตรง React จะไม่ Render ใหม่

### State แบบ Array: เพิ่ม ลบ แก้ไข

```jsx
const [items, setItems] = useState(['A', 'B']);

setItems([...items, 'C']);                         // เพิ่ม
setItems(items.filter(i => i !== 'A'));            // ลบ
setItems(items.map(i => i === 'B' ? 'X' : i));     // แก้ไข
```

ใช้ Spread, `filter` และ `map` เพราะคืน Array ใหม่ ห้ามใช้ `push` หรือ `splice` ที่แก้ Array เดิม

### อัปเดตแบบฟังก์ชัน `prev => ...`

ใช้เมื่อค่าใหม่ขึ้นอยู่กับค่าเก่า และอัปเดตหลายครั้งติดกัน

```jsx
// เขียนแบบเดิม: ได้ +1 เท่านั้น
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);

// แบบฟังก์ชัน: ได้ +3
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

`prev` คือค่า State ล่าสุดเสมอ

---

## 4. วิธีจัดการ Event

Event คือเหตุการณ์จากผู้ใช้ เช่น คลิก พิมพ์ หรือส่งฟอร์ม

| หัวข้อ | HTML ธรรมดา | React (JSX) |
|---|---|---|
| ชื่อ Event | `onclick` | `onClick` (camelCase) |
| ค่าที่ส่ง | สตริง `"fn()"` | ฟังก์ชัน `{fn}` |

### Event ที่ใช้บ่อย

| Event | เกิดเมื่อ | ใช้กับ |
|---|---|---|
| `onClick` | ผู้ใช้คลิก | ปุ่ม ลิงก์ |
| `onChange` | ค่าใน input เปลี่ยน | ช่องกรอก, select |
| `onSubmit` | ส่งฟอร์ม | แท็ก `form` |
| `onKeyDown` | กดแป้นพิมพ์ | ช่องค้นหา |
| `onMouseEnter` | เมาส์เลื่อนเข้า | การ์ด เมนู |

### onClick: 2 วิธีเขียน

```jsx
// 1) ฟังก์ชันแยก (เหมาะกับโค้ดหลายบรรทัด นำกลับมาใช้ซ้ำได้)
const handleClick = () => {
  alert('สวัสดี');
};
<button onClick={handleClick}>กด</button>

// 2) ฟังก์ชันลูกศรในบรรทัด (เหมาะกับโค้ดสั้น 1 บรรทัด)
<button onClick={() => alert('สวัสดี')}>กด</button>
```

ตั้งชื่อฟังก์ชันขึ้นต้นด้วย `handle` เช่น `handleClick`, `handleChange`, `handleSubmit`

### ส่งค่าเข้า Event Handler

ถ้าต้องส่งค่าให้ฟังก์ชัน ให้ห่อด้วยฟังก์ชันลูกศร (ใช้บ่อยตอนวนรายการ เช่น ปุ่มลบของแต่ละโพสต์)

```jsx
const greet = (name) => {
  alert('สวัสดี ' + name);
};

<button onClick={() => greet('สมชาย')}>ทักทาย</button>
```

### ตัวอย่างที่ 3: ปุ่มไลก์และรีเซ็ต

```jsx
function LikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <>
      <p>ไลก์ {likes}</p>
      <button onClick={() => setLikes(likes + 1)}>ถูกใจ</button>
      <button onClick={() => setLikes(0)}>รีเซ็ต</button>
    </>
  );
}
```

### onChange และ Event Object (e)

`onChange` ทำงานทุกครั้งที่ผู้ใช้พิมพ์ เลือก หรือติ๊กในช่องกรอก ลำดับ: **ผู้ใช้พิมพ์ → onChange → อ่านค่าด้วย `e.target.value` → `setState` เก็บลง State**

| ที่ใช้บ่อย | ความหมาย |
|---|---|
| `e.target.value` | ค่าที่ผู้ใช้พิมพ์หรือเลือก |
| `e.target.name` | ชื่อ (`name`) ของช่องกรอก |
| `e.target.checked` | ค่าติ๊กของ checkbox |
| `e.preventDefault()` | ยกเลิกพฤติกรรมเดิมของเบราว์เซอร์ |

### ตัวอย่างที่ 4: อ่านค่าจากช่องกรอก

```jsx
function Greeting() {
  const [name, setName] = useState('');
  return (
    <div>
      <input onChange={(e) => setName(e.target.value)} />
      <p>สวัสดี {name}</p>
    </div>
  );
}
```

### onSubmit และ `e.preventDefault()`

ปกติฟอร์มจะรีเฟรชหน้าเมื่อส่ง ทำให้ State และข้อมูลหาย จึงต้องกันไว้ด้วย `preventDefault()`

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(name);
};

<form onSubmit={handleSubmit}>
  <button type="submit">บันทึก</button>
</form>
```

---

## 5. วิธีทำฟอร์ม (Controlled Component)

**Controlled Component** คือช่องกรอกที่ให้ State เป็นแหล่งข้อมูลหลัก โดยผูก `value` กับ State และอัปเดตด้วย `onChange`

ข้อมูลไหลสองทาง (Data Binding): State → หน้าจอด้วย `value` และหน้าจอ → State ด้วย `onChange`

### 5.1 input เดี่ยว

```jsx
const [title, setTitle] = useState('');

<input value={title} onChange={(e) => setTitle(e.target.value)} />
<p>ชื่อเรื่อง: {title}</p>
```

> ถ้าใส่ `value` แต่ลืม `onChange` จะพิมพ์ในช่องไม่ได้ เพราะค่าถูกล็อกไว้ที่ State

### 5.2 ฟอร์มหลายช่อง: ใช้ State แบบ Object

```jsx
// รวมเป็น Object เดียว แทนการแยก State ทีละช่อง
const [form, setForm] = useState({ title: '', author: '', content: '' });

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

<input name="title" value={form.title} onChange={handleChange} />
```

หลักการ: ตั้ง `name` ของ input ให้ตรงกับ key ใน State ส่วน `[e.target.name]` (Computed Property) จะเลือก key ตามช่องที่พิมพ์ จึงใช้ `handleChange` ฟังก์ชันเดียวได้ทุกช่อง

### 5.3 select, textarea และ checkbox

```jsx
// select และ textarea: ใช้ value เหมือน input
<select name="category" value={form.category} onChange={handleChange}>...</select>
<textarea name="content" value={form.content} onChange={handleChange} />

// checkbox: ใช้ checked แทน value
<input type="checkbox" checked={agree}
  onChange={(e) => setAgree(e.target.checked)} />
```

### 5.4 แสดงรายการด้วย map และ key

```jsx
{posts.map((p) => (
  <div key={p.id}>
    <h3>{p.title}</h3>
    <p>{p.content}</p>
  </div>
))}
```

`map` วนสร้าง JSX ให้ทุกรายการ ส่วน `key` ช่วยให้ React แยกแต่ละรายการได้ ควรใช้ `id` ที่ไม่ซ้ำ

### ขั้นตอนทำงานของฟอร์ม

1. **พิมพ์** → `onChange` อัปเดต State
2. **แสดงผล** → React Render ค่าใหม่
3. **ส่งฟอร์ม** → `onSubmit` + ตรวจข้อมูล
4. **บันทึก** → เพิ่มใน Array และล้างฟอร์ม

**จำ 3 ข้อ:** ผูก `value` กับ State · อัปเดตด้วย `onChange` · กันรีเฟรชด้วย `preventDefault`

---

## 6. ใบงานที่ 6: ทำ AddPostForm ทีละขั้น

**งาน:** แบบฟอร์มบันทึกข้อมูลบทความด้วย React State · ทำรายบุคคล · ปฏิบัติ 2 ชั่วโมง · 5 คะแนน (ผ่าน 3 คะแนน)

**เครื่องมือ:** คอมพิวเตอร์ที่ติดตั้ง Node.js และ VS Code, เว็บเบราว์เซอร์, โปรเจกต์ React (Vite) จากใบงานที่ 4

### ขั้นที่ 1: เตรียมโปรเจกต์

1. เปิดโปรเจกต์ React (Vite) ใน VS Code
2. รัน `npm run dev` ใน Terminal
3. สร้างไฟล์ `src/components/AddPostForm.jsx`

### ขั้นที่ 2: ประกาศ State 3 ตัว

```jsx
import { useState } from 'react';

function AddPostForm() {
  const [form, setForm] = useState({
    title: '', category: 'ทั่วไป', content: ''
  });
  const [posts, setPosts] = useState([]);   // รายการโพสต์ที่บันทึกแล้ว
  const [error, setError] = useState('');   // ข้อความเตือน
```

### ขั้นที่ 3: เขียน Event Handler

```jsx
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();                                   // 1) กันหน้ารีเฟรช
    if (!form.title.trim() || !form.content.trim()) {     // 2) ตรวจช่องว่าง
      setError('กรุณากรอกชื่อเรื่องและเนื้อหา');
      return;
    }
    setError('');
    setPosts([...posts, { ...form, id: Date.now() }]);    // 3) เพิ่มโพสต์ (Array ใหม่)
    setForm({ title: '', category: 'ทั่วไป', content: '' }); // 4) ล้างฟอร์ม
  };
```

### ขั้นที่ 4: สร้างฟอร์มและแสดงรายการ

```jsx
  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input name="title"
          value={form.title}
          onChange={handleChange} />
        <select name="category"
          value={form.category}
          onChange={handleChange}>
          <option>ทั่วไป</option>
          <option>เทคโนโลยี</option>
        </select>
        <textarea name="content"
          value={form.content}
          onChange={handleChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">บันทึก</button>
      </form>

      <h2>รายการโพสต์ ({posts.length})</h2>
      {posts.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <small>{p.category}</small>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}

export default AddPostForm;
```

> ฟอร์มใช้ `onSubmit` ที่แท็ก `form` ไม่ใช่ `onClick` ที่ปุ่ม และทุกช่องต้องมี `name`, `value`, `onChange` ครบ

### ขั้นที่ 5: ทดสอบ

1. นำเข้าใน `src/App.jsx` แล้วแสดงผล

   ```jsx
   import AddPostForm from './components/AddPostForm';

   function App() {
     return <AddPostForm />;
   }
   export default App;
   ```

2. กรอกครบแล้วกดบันทึก ต้องมีโพสต์ใหม่แสดง และฟอร์มถูกล้าง
3. เว้นช่องว่างแล้วกดบันทึก ต้องแสดงข้อความเตือน

### ขั้นที่ 6: งานท้าทาย (ทำเพิ่มได้)

- ปุ่มลบโพสต์: `setPosts(posts.filter(p => p.id !== id))`
- แสดงจำนวนตัวอักษรของเนื้อหาแบบเรียลไทม์: `{form.content.length}`
- จัดรูปแบบด้วย Tailwind CSS ให้ Responsive

### ขั้นที่ 7: ส่งงาน

- แคปหน้าจอ 2 ภาพ (ก่อนบันทึก และหลังบันทึกโพสต์)
- แสดงโค้ดให้ครูตรวจ

### สรุปและวิจารณ์ผล (ตอบหลังปฏิบัติ)

1. State ที่ใช้มีกี่ตัว แต่ละตัวมีหน้าที่อะไร (เฉลย: 3 ตัว คือ `form` เก็บค่าที่กำลังพิมพ์, `posts` เก็บรายการที่บันทึกแล้ว, `error` เก็บข้อความเตือน)
2. เหตุใดต้องใช้ `e.preventDefault()` ใน `handleSubmit`
3. พบปัญหาใดระหว่างปฏิบัติ และแก้ไขอย่างไร
4. สรุปสิ่งที่ได้เรียนรู้

### ข้อควรระวัง

1. ตรวจชื่อ Component และไฟล์ให้ตรงกัน (ตัวพิมพ์ใหญ่–เล็กมีผล)
2. ห้ามแก้ State โดยตรง ใช้ `setState` เสมอ
3. อย่าลืม `e.preventDefault()` ใน `onSubmit`
4. ใส่ `value` ให้ input ต้องใส่ `onChange` ด้วย
5. บันทึกไฟล์ก่อนทดสอบ และอ่าน Error ใน Console
6. ทำด้วยตนเอง ห้ามคัดลอกโค้ดเพื่อน

---

## 7. ใบกิจกรรมที่ 6: วิธีทำ 4 ภารกิจ

**State & Event Challenge** · กลุ่มละ 3–4 คน · 45 นาที · 10 คะแนน (ผ่าน 6 คะแนน)

**บทบาทในกลุ่ม** (สลับบทบาททุกภารกิจ): Driver ผู้เขียนโค้ด · Navigator ผู้ตรวจและแนะนำ · Recorder ผู้บันทึกผล · Presenter ผู้นำเสนอ

### ภารกิจที่ 1: ทายผลก่อนรัน (10 นาที)

```jsx
function Test() {
  const [count, setCount] = useState(0);
  const add3 = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
  return <button onClick={add3}>เพิ่ม 3 ครั้ง: {count}</button>;
}
```

1. **ทาย:** กดปุ่ม 1 ครั้ง ค่า `count` จะเป็นเท่าใด เขียนคำทายไว้ก่อน
2. **รันจริง:** เปรียบเทียบกับที่ทาย แล้วอภิปรายสาเหตุ
3. **แก้โค้ด** ให้ได้ +3 จริง โดยใช้ `setCount(prev => prev + 1)`

**เฉลย:** ได้ `count = 1` เพราะทั้ง 3 คำสั่งใช้ค่า `count` เดิมของรอบ Render นั้น (0) แก้เป็น

```jsx
const add3 = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

### ภารกิจที่ 2: MirrorInput (10 นาที)

โจทย์:

1. สร้าง Component `MirrorInput` มีช่องกรอก และแสดงข้อความนั้นตัวใหญ่ด้านล่างแบบเรียลไทม์
2. เพิ่มปุ่ม "ล้างข้อความ" ใช้ `onClick` ตั้งค่า State กลับเป็นค่าว่าง
3. แสดงจำนวนตัวอักษร และเปลี่ยนเป็นสีแดงเมื่อเกิน 20 ตัวอักษร

แนวทาง (ตัวอย่างโค้ดที่ทำตามโจทย์ได้):

```jsx
function MirrorInput() {
  const [text, setText] = useState('');

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <h1>{text}</h1>
      <button onClick={() => setText('')}>ล้างข้อความ</button>
      <p style={{ color: text.length > 20 ? 'red' : 'black' }}>
        จำนวน {text.length} ตัวอักษร
      </p>
    </div>
  );
}
```

### ภารกิจที่ 3: ตามหาบั๊ก (15 นาที)

```jsx
function Form() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    list.push(name);        // จุดที่ 1
    setName('');
  };

  return (
    <form onSubmit={handleSubmit()}> {/* จุดที่ 2 */}
      <input value={name} />        {/* จุดที่ 3 */}
      <button>เพิ่ม</button>
      <ul>{list.map(n => <li>{n}</li>)}</ul> {/* จุดที่ 4 */}
    </form>
  );
}
```

โค้ดมีข้อผิดพลาด 5 จุด (ทำเครื่องหมายไว้ 4 จุด อีก 1 จุดให้กลุ่มหาเอง) ให้หา จดสาเหตุ และแก้ให้ถูกต้อง

**เฉลย**

| จุด | ปัญหา | วิธีแก้ |
|---|---|---|
| 1 | `list.push(name)` แก้ State ตรง ๆ | `setList([...list, name])` |
| 2 | `onSubmit={handleSubmit()}` เรียกฟังก์ชันทันที | `onSubmit={handleSubmit}` |
| 3 | input มี `value` แต่ไม่มี `onChange` | เพิ่ม `onChange={(e) => setName(e.target.value)}` |
| 4 | ใช้ `map` โดยไม่มี `key` | เพิ่ม `key` เช่น `<li key={i}>` |
| 5 | ลืม `e.preventDefault()` หน้าจึงรีเฟรช | เรียก `e.preventDefault()` ต้นฟังก์ชัน |

### ภารกิจที่ 4: นำเสนอและสรุปผล (10 นาที)

1. Presenter สาธิตผลงานภารกิจที่ 2 และอธิบายการแก้บั๊กภารกิจที่ 3 กลุ่มละไม่เกิน 3 นาที
2. ครูและเพื่อนร่วมชั้นให้ข้อเสนอแนะ แล้วร่วมกันสรุปความรู้เรื่อง State และ Event

**คำถามสรุป:** คำทายภารกิจที่ 1 ต่างจากผลจริงอย่างไร เพราะอะไร · ข้อผิดพลาดทั้ง 5 จุดคืออะไร แก้อย่างไร · Controlled Component มีประโยชน์อย่างไร · กลุ่มแบ่งหน้าที่และแก้ปัญหาร่วมกันอย่างไร

---

## 8. ใบมอบหมายงานที่ 6: วิธีทำ Mini Post Manager

**งานรายบุคคล** · 12 คะแนน (ผ่าน 8 คะแนน) · ส่งก่อนเริ่มคาบเรียนครั้งที่ 7 (สัปดาห์ที่ 7)

สร้างโปรเจกต์ React (Vite) ชื่อ **Mini Post Manager** ต่อยอดจากใบงานที่ 6 เก็บข้อมูลใน State เท่านั้น (ไม่ต้องเชื่อมฐานข้อมูล)

### ฟังก์ชันที่ต้องมี 6 ข้อ

| ที่ | ฟังก์ชัน | รายละเอียด |
|---|---|---|
| 1 | เพิ่มโพสต์ | ฟอร์ม ชื่อเรื่อง ผู้เขียน หมวดหมู่ (select) เนื้อหา (textarea) แบบ Controlled Component ห้ามเว้นว่างชื่อเรื่องและเนื้อหา |
| 2 | แสดงรายการโพสต์ | แสดงเป็น Card พร้อมจำนวนโพสต์ทั้งหมด และข้อความ "ยังไม่มีโพสต์" เมื่อว่าง |
| 3 | ลบโพสต์ | ปุ่มลบในแต่ละโพสต์ ใช้ `filter` สร้าง Array ใหม่ |
| 4 | กดถูกใจ | เพิ่มจำนวนไลก์ของแต่ละโพสต์ทีละ 1 โดยไม่กระทบโพสต์อื่น |
| 5 | ค้นหาโพสต์ | ช่องค้นหากรองตามชื่อเรื่องแบบเรียลไทม์ ด้วย State ของคำค้นหา |
| 6 | จัดรูปแบบหน้าเว็บ | ใช้ Tailwind CSS ให้อ่านง่ายและ Responsive |

### โครงหน้าจอ (Wireframe)

```
┌──────────────────────────────────────────┐
│            Mini Post Manager             │
│  [ ค้นหาโพสต์...                       ] │
│  ┌────────────────────────────────────┐  │
│  │ ฟอร์มเพิ่มโพสต์                     │  │
│  │ [ชื่อเรื่อง] [ผู้เขียน] [หมวดหมู่ ▼]│  │
│  │ [เนื้อหา.......................]   │  │
│  │                         [ บันทึก ] │  │
│  └────────────────────────────────────┘  │
│  รายการโพสต์ (3)                          │
│  หัวข้อโพสต์ 1 — ผู้เขียน / หมวดหมู่  ♥ 5  [ลบ] │
│  หัวข้อโพสต์ 2 — ผู้เขียน / หมวดหมู่  ♥ 2  [ลบ] │
│  หัวข้อโพสต์ 3 — ผู้เขียน / หมวดหมู่  ♥ 0  [ลบ] │
└──────────────────────────────────────────┘
```

### ลำดับการทำที่แนะนำ

1. วางแผนแบ่งงานเป็นขั้นย่อย ทำทีละฟังก์ชัน
2. ทำฟอร์มและ State ให้ได้ก่อน (ฟังก์ชัน 1)
3. เพิ่มการแสดงรายการ (2) → ลบ (3) → ถูกใจ (4) → ค้นหา (5) → จัดรูปแบบ (6)
4. ทดสอบทุกครั้งที่เพิ่มฟังก์ชัน และดู Error ใน Console
5. ไม่แก้ State โดยตรง ใช้ `setState` และสร้าง Array/Object ใหม่เสมอ

### แนวคิดสำหรับฟังก์ชันที่ยาก

```jsx
// สร้างโพสต์ใหม่ให้มี id และ likes เริ่มที่ 0 (ใช้ตอนเพิ่มโพสต์)
setPosts([...posts, { ...form, id: Date.now(), likes: 0 }]);

// กดถูกใจ: เปลี่ยนเฉพาะโพสต์ที่ id ตรงกัน
setPosts(posts.map(p =>
  p.id === id ? { ...p, likes: p.likes + 1 } : p
));

// ลบโพสต์
setPosts(posts.filter(p => p.id !== id));

// ค้นหา: กรองตามชื่อเรื่อง (query คือ State ของช่องค้นหา)
const filtered = posts.filter(p =>
  p.title.toLowerCase().includes(query.toLowerCase())
);
// แล้วใช้ filtered.map(...) แสดงรายการ
```

### สิ่งที่ต้องส่ง

1. โฟลเดอร์โปรเจกต์ (ไม่ต้องส่ง `node_modules`) บีบอัดเป็น `.zip` ตั้งชื่อ `ชื่อ-นามสกุล_รหัสนักเรียน.zip`
2. ภาพหน้าจอ 3 ภาพ: หน้าแรก, หลังเพิ่มโพสต์, หลังค้นหา
3. ไฟล์ `README.txt` อธิบายสั้น ๆ ว่าทำฟังก์ชันใดได้บ้างและพบปัญหาใด

ส่งผ่านช่องทางที่ครูกำหนด เช่น Google Classroom · งานที่ส่งช้าหักคะแนนตามระเบียบของรายวิชา · ปรึกษาเพื่อนได้ แต่ต้องเขียนโค้ดเอง การคัดลอกงานจะไม่ได้รับคะแนน

---

## 9. ข้อผิดพลาดที่พบบ่อยและวิธีแก้

### State

| ผิด | ถูกต้อง |
|---|---|
| `count = count + 1` | `setCount(count + 1)` |
| `posts.push(newPost)` | `setPosts([...posts, newPost])` |
| `user.age = 17` | `setUser({ ...user, age: 17 })` |
| เรียก `useState` ใน `if` | เรียกที่ระดับบนสุดของ Component |

### Event

| ผิด | ถูกต้อง |
|---|---|
| `onClick={handleClick()}` (เรียกทันทีตอน Render) | `onClick={handleClick}` |
| `onclick` ตัวพิมพ์เล็กแบบ HTML | `onClick` แบบ camelCase |
| ลืม `e.preventDefault()` ใน `onSubmit` (หน้ารีเฟรช) | ใส่ `e.preventDefault()` ต้นฟังก์ชัน |

### Form

| ปัญหา | สาเหตุ / วิธีแก้ |
|---|---|
| พิมพ์ในช่องไม่ได้ | ใส่ `value` แต่ไม่มี `onChange` ให้เพิ่ม `onChange` |
| `handleChange` ใช้กับทุกช่องไม่ได้ | ตรวจว่า `name` ของ input ตรงกับ key ใน State |
| รายการเตือน key | เพิ่ม `key` ที่ไม่ซ้ำ เช่น `p.id` ใน `map` |

---

## 10. แบบทดสอบพร้อมเฉลย

**ตอนที่ 1: ปรนัย 10 ข้อ**

| ข้อ | คำถาม | ตัวเลือก | เฉลย |
|---|---|---|---|
| 1 | `useState` ส่งค่ากลับมาในรูปแบบใด | ก. ค่าเดี่ยว ข. Array ที่มี 2 ค่า ค. Object ง. Function | **ข** |
| 2 | ข้อใดอัปเดต State ถูกต้อง | ก. `count = count + 1` ข. `setCount(count + 1)` ค. `count++` ง. `useState(count + 1)` | **ข** |
| 3 | เมื่อ State เปลี่ยน React จะทำอะไร | ก. ลบ Component ข. ปิดเบราว์เซอร์ ค. Re-render ง. ไม่ทำอะไร | **ค** |
| 4 | ข้อใดเขียน Event ถูกต้อง | ก. `onclick="fn()"` ข. `onClick={fn}` ค. `onClick=fn()` ง. `on-click={fn}` | **ข** |
| 5 | `e.target.value` ใช้ทำอะไร | ก. อ่านค่าที่พิมพ์ ข. ลบ Event ค. ส่งฟอร์ม ง. สร้าง State | **ก** |
| 6 | `e.preventDefault()` ใน `onSubmit` มีไว้เพื่อ | ก. ล้าง State ข. ป้องกันหน้ารีเฟรช ค. ส่งข้อมูลไป Server ง. ปิดฟอร์ม | **ข** |
| 7 | Controlled Component หมายถึง | ก. input ไม่ผูกกับ State ข. input ที่ค่าถูกควบคุมด้วย State ผ่าน `value` และ `onChange` ค. input ปิดใช้งาน ง. input ซ่อนอยู่ | **ข** |
| 8 | ข้อใดผิดหลักการ Hook | ก. เรียกที่ระดับบนสุด ข. เรียกใน Function Component ค. เรียกในเงื่อนไข `if` ง. ชื่อขึ้นต้นด้วย `use` | **ค** |
| 9 | เพิ่ม `'D'` ใน State `items` ที่ถูกต้องคือ | ก. `items.push('D')` ข. `setItems([...items, 'D'])` ค. `items = 'D'` ง. `setItems(items.D)` | **ข** |
| 10 | ฟอร์มหลายช่องใช้ `handleChange` เดียวได้โดยอาศัย | ก. `name` ของ input กับ `[e.target.name]` ข. `id` เท่านั้น ค. เขียนซ้ำทุกช่อง ง. ไม่ได้ | **ก** |

**ตอนที่ 2: แบบฝึกหัดปฏิบัติ 4 ข้อ**

1. สร้าง `LikeButton` แสดงไลก์เริ่มที่ 0 กดแล้วเพิ่มทีละ 1 และมีปุ่มรีเซ็ต

   ```jsx
   function LikeButton() {
     const [likes, setLikes] = useState(0);
     return (
       <div>
         <p>ไลก์ {likes}</p>
         <button onClick={() => setLikes(likes + 1)}>ถูกใจ</button>
         <button onClick={() => setLikes(0)}>รีเซ็ต</button>
       </div>
     );
   }
   ```

2. สร้างช่อง input แสดงข้อความและจำนวนตัวอักษรแบบเรียลไทม์

   ```jsx
   function CharCount() {
     const [text, setText] = useState('');
     return (
       <div>
         <input value={text} onChange={(e) => setText(e.target.value)} />
         <p>{text}</p>
         <p>จำนวน {text.length} ตัวอักษร</p>
       </div>
     );
   }
   ```

3. สร้างฟอร์มสมัครสมาชิก (ชื่อผู้ใช้ อีเมล รหัสผ่าน) เก็บด้วย State แบบ Object และเตือนเมื่อช่องใดว่าง
4. ต่อยอดข้อ 3 ให้แสดงรายชื่อสมาชิกที่สมัครแล้วเป็นรายการใต้ฟอร์ม

   ```jsx
   const [form, setForm] = useState({ username: '', email: '', password: '' });
   const [members, setMembers] = useState([]);

   const handleSubmit = (e) => {
     e.preventDefault();
     if (!form.username || !form.email || !form.password) {
       alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
       return;
     }
     setMembers([...members, form]);
     setForm({ username: '', email: '', password: '' });
   };
   ```

   แล้วแสดงรายชื่อด้วย `members.map(...)` พร้อมใส่ `key`

---

## 11. เกณฑ์คะแนนและเอกสารอ้างอิง

### คะแนนของแต่ละใบ (เกณฑ์ผ่านทุกใบ: ร้อยละ 60)

| เอกสาร | คะแนนเต็ม | ผ่าน | ลักษณะงาน |
|---|---|---|---|
| ใบความรู้ที่ 6 | – | – | ทฤษฎี 1 ชั่วโมง พร้อมแบบทดสอบและแบบฝึกหัด |
| ใบงานที่ 6 | 5 | 3 | รายบุคคล |
| ใบกิจกรรมที่ 6 | 10 | 6 | กลุ่ม 3–4 คน |
| ใบมอบหมายงานที่ 6 | 12 | 8 | รายบุคคล |

**ใบงานที่ 6 (5 คะแนน):** ประกาศ/อัปเดต State ถูกต้อง 1 · จัดการ Event และ Data Binding 1 · ฟอร์มบันทึกและแสดงรายการ 1 · Validation และผลงานทำงานได้ 1 · ความละเอียดรอบคอบ รับผิดชอบ ส่งตรงเวลา 1

**ใบกิจกรรมที่ 6 (10 คะแนน):** ภารกิจ 1 = 2 · ภารกิจ 2 = 3 · ภารกิจ 3 = 3 · การนำเสนอ = 1 · การทำงานเป็นทีม = 1

**ใบมอบหมายงานที่ 6 (12 คะแนน):** เพิ่มโพสต์ + Validation 3 · แสดงและลบโพสต์ 2 · ปุ่มถูกใจ 2 · ค้นหา 2 · Tailwind/Responsive 1 · ความครบถ้วนและตรงเวลา 1 · ความรับผิดชอบและซื่อสัตย์ 1

### เอกสารอ้างอิง

- [React: Quick Start](https://react.dev/learn)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Responding to Events](https://react.dev/learn/responding-to-events)
- [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Managing State](https://react.dev/learn/managing-state)
- [useState (React Reference)](https://react.dev/reference/react/useState)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
