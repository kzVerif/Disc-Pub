# 🎮 Disc-PUB - PUBG Stats Discord Bot

บอท Discord สำหรับเชื่อมบัญชี PUBG กับ Discord และดูแรงก์ / สถิติต่าง ๆ แบบเรียลไทม์ผ่าน PUBG API  
เขียนด้วย Node.js โดยใช้ Discord Slash Commands

---

## 📦 คำสั่งทั้งหมด

### `/reg`  
เชื่อมบัญชี Discord กับชื่อ PUBG  
**พารามิเตอร์**:
- `pubg_name` (required): ชื่อในเกม PUBG  
- `platform` (required): แพลตฟอร์ม เช่น Steam, Kakao, Xbox, PSN, Stadia

### `/myrank`  
ดึงแรงก์ปัจจุบันของผู้เล่นที่ลงทะเบียนไว้

### `/allstats`  
ดู Stats ของผู้เล่นตาม Season และโหมดที่เลือก  
**พารามิเตอร์**:
- `seasons` (required): ซีซันที่ต้องการ (เลขจำนวนเต็ม ≥ 1)  
- `mode` (required): โหมดเกม เช่น Squad FPP, Solo TPP, ฯลฯ

### `/rankstats`  
ดู Rank Stats ของผู้เล่น  
**พารามิเตอร์**:
- `seasons` (required): ซีซันที่ต้องการ (เลขจำนวนเต็ม ≥ 1)  
- `mode` (required): เฉพาะโหมด Squad (FPP/TPP)

---

## 🛠 วิธีติดตั้งและใช้งาน

### 1. Clone โปรเจกต์

git clone https://github.com/kzVerif/Disc-Pub.git
cd Disc-Pub

### 2. ติดตั้ง Dependencies
npm install

### 3. สร้างไฟล์ .env
สร้างไฟล์ชื่อ .env แล้วใส่ข้อมูลต่อไปนี้:
DISCORD_TOKEN=ใส่โทเคนจาก Discord Developer Portal \n
CLIENT_ID=Client ID ของแอป Discord ของคุณ \n
API_KEY=PUBG API Key ที่สมัครจาก https://developer.pubg.com/

### 4. รันบอท
node index.js
