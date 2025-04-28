ชื่อ - นามสกุล (Full Name): Thiwakorn Boayairuksa

รหัสนักศึกษา (Student ID): 6631503019

ชื่อแอป (App Name): SmartStock

Framework ที่ใช้ (Framework Used): React Native

ลิงก์ GitHub Repository: [https://github.com/6631503019/SmartStock.git]

ลิงก์ไฟล์ติดตั้ง (APK/IPA): [https://expo.dev/accounts/6631503019/projects/SmartStock/builds/5a9e960d-f8c7-4827-a865-a0fb1208ec24]

1. การออกแบบแอป | App Concept and Design (2 คะแนน / 2 pts)

1.1 ผู้ใช้งานเป้าหมาย | User Personas
ตัวอย่าง (Example):

Persona 1:  
- ชื่อ: หมิง  
- อายุ: 20 ปี  
- อาชีพ: นักศึกษาปี 2  
- ความต้องการ: ต้องการแอพจัดการสินค้าโดยใช้มือถือในการตรวจสอบ

Persona 2:  
- ชื่อ: แมว  
- อายุ: 26 ปี  
- อาชีพ: ขายของ 
- ความต้องการ: ต้องการแอพจัดการสินค้าไปใช้จดจำของในร้าน

1.2 เป้าหมายของแอป | App Goals
ตัวอย่าง (Example):

- ช่วยนักศึกษาจัดการสินค้า
- เปิดดูข้อมูลที่บันทึกไว้
- ดูยอดการขายสินค้า
- 
1.3 โครงร่างหน้าจอ / Mockup
ใส่รูปภาพ หรือคำอธิบายแต่ละหน้าหลัก 3 หน้า | Attach image or describe 3 main pages

![45690_0](https://github.com/user-attachments/assets/98b185dc-8e21-450e-84da-d2af5735c25a)

- บอกจำนวนรายการสินค้า
- บอกราคาต้นทุนสินค้าทั้งหมด
- บอกกำไรจากราคาขายที่ตั้งไว้
- เพิ่มสินค้า
- โชว์ชื่อสินค้า ต้นทุน ราคาขาย แก้ไขสินค้า ลบสินค้า
  
![45691_0](https://github.com/user-attachments/assets/b63ab1ac-af34-4b28-83f7-4f646c36808b)

- เพิ่มสินค้า ชื่อสินค้า จำนวนสินค้า ราคาต้นทุน ราคาขาย

![45693_0](https://github.com/user-attachments/assets/ff441b6a-9a8a-48f0-a68b-7b1609f12b36)

- จำนวนสินค้าที่ขายออก
- รีเซ็ตบันทึกการขาย


1.4 การไหลของผู้ใช้งาน | User Flow

ตัวอย่าง (Example): login/register > Home > Select "Add Product"

เปิดแอป > ล็อกอิน-สมัคร > เข้าหน้าโฮม > เลือก "เพิ่มสินค้า" 

2. การพัฒนาแอป | App Implementation (4 คะแนน / 4 pts)

2.1 รายละเอียดการพัฒนา | Development Details
เครื่องมือที่ใช้ / Tools used:

- react: 18.3.1
- react-native: 0.76.9
- expo: ~52.0.46

2.2 ฟังก์ชันที่พัฒนา | Features Implemented
Checklist:

- [x] เพิ่ม / แก้ไข / ลบ สินค้า
- [x] ประวัติสินค้าที่ขายออกไป
- [x] ลบประวัติสินค้าที่ขายออกไป
- [ ] ซิงก์กับ Firebase
2.3 ภาพหน้าจอแอป | App Screenshots
แนบภาพหรือ URL (Attach images or image links):

![45697_0](https://github.com/user-attachments/assets/c66f36b6-e602-4500-8a61-fb1bdb2b3530)

![45696_0](https://github.com/user-attachments/assets/279bc6ca-70d9-4f16-9740-e4185a09417b)

![45690_0](https://github.com/user-attachments/assets/c54029c3-eb4d-4e19-9578-bd86da752705)

![45691_0](https://github.com/user-attachments/assets/cc045c7c-31e3-4752-80b1-2526ac3b556c)

![45693_0](https://github.com/user-attachments/assets/973eb2da-eb7b-4511-b2a9-9a7de8ce4a6c)



3. การ Build และติดตั้งแอป | Deployment (2 คะแนน / 2 pts)

3.1 ประเภท Build | Build Type

[x] Debug
[ ] Release

3.2 แพลตฟอร์มที่ทดสอบ | Platform Tested

[x] Android
[ ] iOS

3.3 ไฟล์ README และวิธีติดตั้ง | README & Install Guide

แนบไฟล์หรือคำอธิบายการติดตั้งแอป | Insert steps

1. ดาวน์โหลดไฟล์ .apk
2. เปิดในอุปกรณ์ Android
3. ติดตั้งผ่าน File Manager

การสะท้อนผลลัพธ์ | Reflection (2 คะแนน / 2 pts)

ตัวอย่างหัวข้อ | Suggested points:

- พบปัญหาเวลาใช้ async function
- หากมีเวลา จะเพิ่มฟีเจอร์ Firebase sync

5. การใช้ AI ช่วยพัฒนา | AI Assisted Development (Bonus / ใช้ประกอบการพิจารณา)

5.1 ใช้ AI ช่วยคิดไอเดีย | Idea Generation

Prompt ที่ใช้:  
"Suggest mobile app ideas for managing inventory in stores"

ผลลัพธ์:  
ได้ไอเดียแอปจัดการสินค้า

5.2 ใช้ AI ช่วยเขียนโค้ด | Code Writing Prompt
Prompt ที่ใช้:  
"After logging in, go to the home page to view a summary of your product list, inventory (user defined), cost price, and selling price. There is a shortcut to the "Add Product" page related to SmartStock."

ผลลัพธ์:  
ได้ code structure ของ SmartStock 3 หน้า

5.3 ใช้ AI ช่วย debug | Debug Prompt
Prompt ที่ใช้:  
"When I press to reduce the quantity of products that add, the data does not enter the total sales."

ผลลัพธ์:  
AI แนะนำวิธีแก้ไขให้
5.4 ใช้ AI ช่วย Deploy | Deployment Prompt
Prompt ที่ใช้:  
"ทำเป็น APK ยังไง"

ผลลัพธ์:  
ให้ npx eas build --platform android --profile preview มา

✅ Checklist ก่อนส่ง | Final Checklist
[x] กรอกข้อมูลครบทุก Section
[x] แนบ GitHub และไฟล์ติดตั้ง
[x] สะท้อนผล และใช้ AI อย่างมีเหตุผล
