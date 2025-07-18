# 🎮 Disc-Pub — Discord Bot สำหรับ PUBG Player

Disc-Pub คือบอท Discord ที่ช่วยให้ผู้ใช้งานสามารถเชื่อมบัญชี PUBG กับ Discord และเรียกดูสถิติหรืออันดับผ่าน Slash Command ได้ง่ายๆ

---

## 🚀 ฟีเจอร์

- เชื่อมบัญชี Discord กับ PUBG ID
- ดูสถิติผู้เล่นแบบละเอียด
- ดูอันดับ Competitive Rank (FPP)

---

## 🛠 ความต้องการเบื้องต้น

- Node.js (แนะนำเวอร์ชัน 16.9.0 ขึ้นไป)
- Discord Developer Account
- PUBG Developer API Key

---

## 📦 การติดตั้ง

### 1. ติดตั้ง Node.js

ดาวน์โหลดและติดตั้ง Node.js จาก [https://nodejs.org/](https://nodejs.org/)

### 2.โหลดโปรเจคลงเครื่อง

กดปุ่ม Code สีเขียว > Download ZIP

### 3.แตกไฟล์เปิดโฟล์เดอร์ที่แตกออกมา

### 4.เปิด CommandPrompt ที่ Paht File ของโปรเจค
Click ที่ Paht Bar แล้วพิมพ์ cmd แล้ว Enter
<img width="1116" height="756" alt="image" src="https://github.com/user-attachments/assets/1b1b28b3-467d-4e70-a696-b3143691e893" />

### 5. พิมพ์ npm i ใน command prompt แล้วกด Enter
<img width="1119" height="627" alt="image" src="https://github.com/user-attachments/assets/7aca53d2-5d3f-4c19-8a15-786290cd52a5" />

### 6. พิมพ์ node index.js ใน command prompt แล้วกด Enter

---

### Note อย่าลืม config ไฟล์ .env 
DISCORD_TOKEN = Token ของบอท
CLIENT_ID = Client Id ของบอท
GUILD_ID = ID Server
API_KEY = PUBG API Key ที่สมัครจาก https://developer.pubg.com/ หากไม่มีใช้ของผมไปก่อน

---

### วิธีการสร้าง Application Bot ของ Discord 
1.ไปที่ [https://discord.com/developers/applications](https://discord.com/developers/applications)
2.Click ที่ New Application ตั้งชื่อให้เรียบร้อย
3.Click ที่ Oauth2 แล้ว Copy Client ID
<img width="1911" height="929" alt="image" src="https://github.com/user-attachments/assets/c641cc5b-fb1f-499d-bc22-51bacce1277a" />
4.เลื่อนลงมา กด Check ที่ คำว่าบอท ในส่วนของ Bot Permissions ให้เลือก Administartor
<img width="1486" height="743" alt="image" src="https://github.com/user-attachments/assets/bffd3190-c248-4e13-acf5-4348c809400e" />
<img width="1386" height="734" alt="image" src="https://github.com/user-attachments/assets/37239cf9-2c7c-4d35-b48c-51ee0c59f14f" />
5.copy Generated URL เพื่อเอาบอทเข้าดิส
<img width="1392" height="98" alt="image" src="https://github.com/user-attachments/assets/d14cb6cb-c618-4596-a287-744e06ae50e8" />
6.Click ที่ Bot แล้วกด reset token เพื่อเอา token บอท
<img width="1919" height="921" alt="image" src="https://github.com/user-attachments/assets/bac83318-1374-4acd-849e-6e9d5c71f1ad" />

---







