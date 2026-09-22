# 🎮 Roblox Creator Docs Guide & Architecture Masterclass

> ศูนย์การเรียนรู้ สถาปัตยกรรมเกม และคู่มือความปลอดภัยสำหรับนักพัฒนาเกม Roblox ระดับมืออาชีพ (เชื่อมโยงเนื้อหาอย่างเป็นทางการจาก [create.roblox.com/docs](https://create.roblox.com/docs))

---

## 🌟 ฟีเจอร์หลักของโปรเจกต์ (Core Features)

1. **🗺️ Learning Roadmap Guide (แผนผังลำดับการเรียนรู้ 7 ก้าว เริ่มจากศูนย์จนปล่อยเกม)**:
   - แนะนำลำดับการเรียนรู้อย่างเป็นระบบ ตั้งแต่พื้นฐาน Luau, สถาปัตยกรรม Client-Server, ระบบฟิสิกส์ & Raycast, การจัดระเบียบโค้ด, ระบบเซฟข้อมูล DataStores, จนถึงการสร้างรายได้ (Monetization)
   - สรุปผลลัพธ์ที่เป็นรูปธรรมเมื่อเรียนจบหลักสูตร (Capstone Outcomes)
   - มีระบบจำความก้าวหน้าของผู้เรียนผ่าน Local Storage

2. **📚 Docs Catalog & AI Deep Explainer (คลังความรู้แบบเจาะลึก)**:
   - รวบรวมหัวข้อสำคัญของ Roblox Engine 28 หัวข้อ ไว้อย่างเป็นหมวดหมู่ ครอบคลุมตั้งแต่พื้นฐานสุด (หน้าจอ Studio, ตัวแปร, ลูป, ตาราง) จนถึงระดับสูง
   - อธิบายกลไกการทำงานด้วยแผนภาพเปรียบเทียบข้อดี-ข้อเสีย ตัวอย่างโค้ดที่พร้อมใช้งาน และข้อควรระวัง (Gotchas)
   - ระบบ AI Assistant ที่สามารถถามคำถามและช่วยขยายความรู้เพิ่มเติมได้ทันที

3. **🛡️ Security & Anti-Exploit Masterclass (ห้องทดลองป้องกันแฮกเกอร์)**:
   - จำลองการโจมตีจริง 6 รูปแบบที่พบบ่อยที่สุด: Speed Hack, Teleport, Damage Hack, Remote Injection, Infinite Ammo, และ Noclip
   - เปรียบเทียบโค้ดแบบหมัดต่อหมัดระหว่าง Vulnerable Code vs Secured Code
   - Interactive Anti-Exploit Lab ที่สามารถกดทดสอบยิง Exploit และดู Log การตรวจจับของ Server แบบเรียลไทม์
   - พิมพ์เขียว 6 ขั้นตอนสำหรับสร้างเกมคุณภาพระดับสตูดิโอ (Production Architecture Blueprint)

4. **💻 Interactive Luau Code Practice Lab (ห้องซ้อมเขียนสคริปต์)**:
   - โจทย์ฝึกเขียนโค้ด Luau พร้อมระบบตรวจคำตอบอัตโนมัติ (Automated Code Validator)
   - ตรวจจับไวยากรณ์, การเรียกใช้ Service, การเชื่อม Event, และแนวทางการเขียนที่ปลอดภัย

5. **⚡ Client-Server Network Simulator (เครื่องจำลองเครือข่าย)**:
   - จำลองการส่งข้อมูลข้ามเครือข่ายระหว่าง Client (หน้าจอผู้เล่น) กับ Server ผ่าน RemoteEvent/RemoteFunction แบบเห็นภาพชัดเจน

6. **🏆 Knowledge Quiz & Certification**:
   - แบบทดสอบวัดความเข้าใจ 21 ข้อพร้อมเฉลยและเหตุผลเชิงลึก
   - สามารถพิมพ์ชื่อเพื่อออกใบรับรอง "Certified Roblox Game Architect" ได้ทันที

---

## 🚀 วิธีการรันโปรเจกต์บนเครื่องของคุณ (Local Development)

### ความต้องการของระบบ (Prerequisites)
- [Node.js](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป หรือ LTS)
- npm หรือ yarn หรือ pnpm

### ขั้นตอนการติดตั้งและรัน

1. **Clone repository หรือแตกไฟล์ ZIP**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd roblox-creator-docs-guide
   ```

2. **ติดตั้ง Dependencies**:
   ```bash
   npm install
   ```

3. **ตั้งค่า Environment Variables**:
   คัดลอกไฟล์ `.env.example` ไปเป็น `.env`:
   ```bash
   cp .env.example .env
   ```
   (ใส่ `GEMINI_API_KEY` หากต้องการใช้งานระบบ AI Assistant ในเครื่องส่วนตัว)

4. **รัน Development Server**:
   ```bash
   npm run dev
   ```
   เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

5. **Build สำหรับ Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```
roblox-creator-docs-guide/
├── index.html                        # HTML Entry point
├── metadata.json                     # AI Studio metadata
├── package.json                      # Scripts & dependencies
├── server.ts                         # Express server with Vite middleware & AI proxy
├── src/
│   ├── main.tsx                      # React root
│   ├── App.tsx                       # Main application & routing logic
│   ├── index.css                     # Tailwind CSS styles
│   ├── types.ts                      # Shared TypeScript definitions
│   ├── data/
│   │   ├── learningRoadmapData.ts    # 🗺️ ข้อมูลแผนผัง Roadmap และเป้าหมายการเรียน
│   │   ├── robloxDocsData.ts         # 📚 คลังความรู้ Docs, หมวดหมู่ และแบบทดสอบ
│   │   └── codeChallengesData.ts     # 💻 โจทย์ฝึกเขียนโค้ดและระบบตรวจคำตอบ
│   └── components/
│       ├── Header.tsx                # แถบเมนูด้านบนและระบบค้นหา
│       ├── RoadmapGuideView.tsx      # หน้าแผนผังลำดับการเรียนรู้แบบโต้ตอบ
│       ├── SecurityHubView.tsx       # ศูนย์ความปลอดภัยและห้องแล็บกันแฮกเกอร์
│       ├── CodePracticeLab.tsx       # ห้องฝึกเขียนสคริปต์พร้อมตัวตรวจโค้ด
│       ├── NetworkSimulator.tsx      # ระบบจำลองการส่งแพ็กเก็ต Client-Server
│       ├── TopicCard.tsx             # การ์ดแสดงหัวข้อความรู้
│       ├── TopicDetailModal.tsx      # หน้าต่างเนื้อหาเจาะลึกและระบบสนทนา AI
│       ├── QuizView.tsx              # หน้าแบบทดสอบและใบประกาศนียบัตร
│       └── BookmarksView.tsx         # หน้ารายการที่บันทึกไว้และโน้ตส่วนตัว
```

---

## 🛠️ วิธีการเพิ่มข้อมูลหรือเนื้อหาใหม่ (Extending Content)

- **เพิ่มขั้นตอน Roadmap**: แก้ไขที่ `src/data/learningRoadmapData.ts` ใน Array `LEARNING_ROADMAP_STAGES`
- **เพิ่มโจทย์เขียนโค้ด**: แก้ไขที่ `src/data/codeChallengesData.ts` ใน Array `CODE_CHALLENGES`
- **เพิ่มหัวข้อความรู้ Docs**: แก้ไขที่ `src/data/robloxDocsData.ts` ใน Array `ROBLOX_DOCS_TOPICS`

---

## 📄 ลิขสิทธิ์ & การอ้างอิง (Credits & Disclaimer)
- เนื้อหาอ้างอิงและเชื่อมโยงกับเอกสารอย่างเป็นทางการของ [Roblox Creator Documentation](https://create.roblox.com/docs)
- สร้างขึ้นเพื่อเป็นสื่อการเรียนรู้สำหรับนักพัฒนาเกมไทยและสากล
