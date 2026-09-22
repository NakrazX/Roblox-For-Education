import { DocTopic, QuizQuestion } from '../types';

export const CATEGORY_INFO: Record<string, { label: string; thaiLabel: string; icon: string; description: string }> = {
  luau: {
    label: 'Luau Scripting',
    thaiLabel: 'ภาษา Luau & ระบบสคริปต์',
    icon: 'Code2',
    description: 'พื้นฐานภาษาโปรแกรมที่รวดเร็วของ Roblox และโครงสร้างของโค้ด'
  },
  networking: {
    label: 'Client-Server & Networking',
    thaiLabel: 'เครือข่าย Client & Server',
    icon: 'Network',
    description: 'การสื่อสารข้ามเครื่อง การซิงค์ข้อมูลผ่าน RemoteEvent / RemoteFunction'
  },
  physics: {
    label: 'Physics & Building',
    thaiLabel: 'ฟิสิกส์ ชิ้นส่วน & แรงกระทำ',
    icon: 'Boxes',
    description: 'กลไกแรงโน้มถ่วง, การชน, ข้อต่อ Constraints และการยิง Raycast'
  },
  ui: {
    label: 'User Interface (GUI)',
    thaiLabel: 'หน้าต่างเมนู & กราฟิก UI',
    icon: 'LayoutTemplate',
    description: 'การออกแบบ UI ที่รองรับทุกหน้าจอ (PC, มือถือ, คอนโซล) และแอนิเมชัน Tween'
  },
  datastores: {
    label: 'DataStores & Cloud',
    thaiLabel: 'ระบบเซฟข้อมูล & คลาวด์',
    icon: 'Database',
    description: 'การบันทึกเลเวล, เงิน, ไอเทมของผู้เล่นอย่างปลอดภัยและคงทน'
  },
  characters: {
    label: 'Humanoids & Gameplay',
    thaiLabel: 'ตัวละคร กายวิภาค & อนิเมชัน',
    icon: 'UserCheck',
    description: 'การควบคุม Humanoid, ระบบเดินตามของมอนสเตอร์ AI (Pathfinding), แอนิเมชัน'
  },
  environment_audio: {
    label: 'Lighting & Sound',
    thaiLabel: 'แสง สี เสียง & บรรยากาศ',
    icon: 'SunMedium',
    description: 'จัดแสงเงาขั้นสูง Post-Processing Effects, หมอก Atmosphere และระบบเสียง 3D'
  },
  security_monetization: {
    label: 'Monetization & Security',
    thaiLabel: 'ระบบขายของ & ป้องกันโปร',
    icon: 'ShieldCheck',
    description: 'การขาย Gamepass, Developer Product และกฎทองความปลอดภัยไม่ให้ถูกแฮก'
  }
};

export const ROBLOX_DOCS_TOPICS: DocTopic[] = [
  {
    id: 'script-types-hierarchy',
    title: 'Scripts, LocalScripts & ModuleScripts',
    thaiTitle: 'ประเภทของสคริปต์ 3 แบบใน Roblox',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/scripting/scripts',
    summary: 'Roblox แบ่งสคริปต์ออกเป็น 3 ชนิดชัดเจน: Script (รันบนเซิร์ฟเวอร์), LocalScript (รันบนเครื่องผู้เล่นแต่ละคน) และ ModuleScript (โค้ดกลางสำหรับแชร์ฟังก์ชันระหว่างสคริปต์อื่น)',
    whyItMatters: 'หากวางสคริปต์ผิดที่ เช่น นำ LocalScript ไปไว้ใน ServerScriptService โค้ดจะไม่ทำงานเลย การเข้าใจตำแหน่งรันจึงเป็นก้าวแรกที่สำคัญที่สุด',
    keyConcepts: [
      'Script ทำงานบน Server (เช่น บันทึกข้อมูล, หักเลือดมอนสเตอร์)',
      'LocalScript ทำงานบน Client (เช่น เสียงเฉพาะตัว, แสดงหน้าจอ UI, ควบคุมมุมกล้อง)',
      'ModuleScript คืนค่าเป็น Table หรือ Function เพื่อให้สคริปต์อื่น require() ไปใช้ซ้ำได้'
    ],
    visualDiagram: `[ServerScriptService] ---> รัน Script (เห็นร่วมกันทั้งห้อง)
[StarterPlayerScripts] ---> รัน LocalScript (เห็นเฉพาะผู้เล่นนั้น)
[ReplicatedStorage]    ---> เก็บ ModuleScript (เรียกใช้ได้ทั้งสองฝั่ง)`,
    codeSnippet: `-- ตัวอย่าง ModuleScript ใน ReplicatedStorage (ชื่อ PlayerStats)
local PlayerStats = {}

function PlayerStats.calculateDamage(baseAtk: number, multiplier: number): number
    local total = baseAtk * multiplier
    return math.max(1, math.floor(total))
end

return PlayerStats

-- ใน Script อื่น (เรียกใช้):
-- local StatsModule = require(game.ReplicatedStorage.PlayerStats)
-- local dmg = StatsModule.calculateDamage(25, 1.5)`,
    codeExplanation: [
      'บรรทัดที่ 2: สร้าง Table เปล่าเพื่อบรรจุฟังก์ชันหรือตัวแปร',
      'บรรทัดที่ 4: ประกาศฟังก์ชันพร้อม Type Annotations (: number) ของ Luau เพื่อความแม่นยำ',
      'บรรทัดที่ 8: คืนค่า Module กลับเสมอ (ขาด return จะเกิด error ทันที)',
      'การใช้ require() ทำให้โหลดโค้ดครั้งเดียวและประหยัดแรมอย่างมาก'
    ],
    commonMistakes: [
      'วาง LocalScript ใน Workspace หรือ ServerStorage (LocalScript ต้องอยู่ใน StarterPlayer, StarterGui หรือ Backpack เท่านั้น)',
      'ลืมใส่ return table ในตอนท้ายของ ModuleScript'
    ],
    gameExample: 'ในเกมแนว RPG โค้ดคำนวณพลังโจมตีจะถูกเก็บไว้ใน ModuleScript เพื่อให้ทั้งระบบดาบและระบบเวทมนตร์เรียกใช้สมการเดียวกันได้',
    prebakedDeepDive: {
      analogy: 'เปรียบเสมือน Script คือ "ห้องครัวหลักของร้านอาหาร" (ทำอาหารจริง) ส่วน LocalScript คือ "เมนูและโต๊ะที่ลูกค้านั่ง" (ลูกค้าเห็นเฉพาะของตัวเอง) และ ModuleScript คือ "สูตรอาหารที่เชฟทุกคนเปิดดูร่วมกันได้"',
      underTheHood: 'เมื่อผู้เล่นเชื่อมต่อเข้าเกม ไฟล์ LocalScript ทั้งหมดจะถูกดาวน์โหลดมายังเครื่องของผู้เล่น (RAM มือถือ/คอม) ส่วน Script ธรรมดาจะถูกเก็บเป็นความลับบน Server ของ Roblox ผู้เล่นไม่มีวันขโมยซอร์สโค้ด Server Script ไปได้',
      proTips: [
        'ใช้ Luau Strict Mode โดยใส่ `--!strict` ไว้บรรทัดแรกสุดเพื่อเปิดระบบตรวจประเภทตัวแปรอัตโนมัติ',
        'พยายามเขียนระบบใหญ่ๆ แยกเป็น ModuleScript แล้วใช้ Script หลักเพียง 1 ตัวเพื่อเป็น Entry Point'
      ]
    }
  },
  {
    id: 'remote-events-networking',
    title: 'RemoteEvents & RemoteFunctions',
    thaiTitle: 'การสื่อสารข้ามเครื่องด้วย RemoteEvent',
    category: 'networking',
    difficulty: 'Intermediate',
    officialUrl: 'https://create.roblox.com/docs/scripting/events/remote',
    summary: 'กลไกส่งสัญญาณข้ามมิติระหว่าง Client (ผู้เล่น) กับ Server (เซิร์ฟเวอร์) RemoteEvent ส่งแล้วไม่รอผลตอบกลับ (One-way) ส่วน RemoteFunction ส่งแล้วรอรับค่าคืน (Request-Response)',
    whyItMatters: 'เนื่องจากระบบ FilteringEnabled ลูกค้าแก้ไขอะไรในเกม โลกคนอื่นจะไม่เห็น หากต้องการกดปุ่มซื้อของหรือกดปุ่มปล่อยพลัง ต้องส่งสัญญาณผ่าน RemoteEvent ไปบอกเซิร์ฟเวอร์ให้เป็นผู้กระทำ',
    keyConcepts: [
      'Client -> Server: remote:FireServer(args)',
      'Server รับ: remote.OnServerEvent:Connect(function(player, args)...)',
      'Server ส่งหาทุกคน: remote:FireAllClients(args)',
      'กฎเหล็กความปลอดภัย: อย่าไว้ใจข้อมูลจาก Client เด็ดขาด (Never Trust the Client)'
    ],
    visualDiagram: `[Client - LocalScript]
      |  (กดปุ่มตีมอนสเตอร์)
      V  :FireServer("SlashAttack")
============== [อินเทอร์เน็ต / เครือข่าย] ==============
      |  .OnServerEvent
      V
[Server - Script] ---> ตรวจสอบว่าผู้เล่นอยู่ใกล้จริงไหม? ---> หักเลือดมอนสเตอร์`,
    codeSnippet: `-- [Client - LocalScript ในปุ่ม UI]
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local attackRemote = ReplicatedStorage:WaitForChild("AttackEvent")

local function onAttackButtonClicked()
    -- ส่งแค่ชื่อคำสั่ง ไม่ส่งจำนวนดาเมจ (เพื่อป้องกันคนแฮกแก้ดาเมจ)
    attackRemote:FireServer("SwordSwing")
end

-- [Server - Script ใน ServerScriptService]
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local attackRemote = ReplicatedStorage:WaitForChild("AttackEvent")

attackRemote.OnServerEvent:Connect(function(player, actionType)
    -- พารามิเตอร์แรก 'player' ระบบ Roblox สร้างให้อัตโนมัติ ปลอมแปลงไม่ได้!
    if actionType == "SwordSwing" then
        print(player.Name .. " กำลังฟันดาบ - Server กำลังคำนวณระยะทางและความเสียหาย")
    end
end)`,
    codeExplanation: [
      'ใน Client: ใช้ :FireServer() โดยไม่ต้องระบุชื่อตัวเอง เพราะ Roblox จะแปะ Player Instance ให้เองทางฝั่งเซิร์ฟเวอร์',
      'ใน Server: ฟังก์ชัน OnServerEvent จะต้องมีตัวแปรแรกมารับ player เสมอ',
      'RemoteEvent ควรสร้างไว้ใน ReplicatedStorage เพื่อให้ทั้งสองฝั่งมองเห็น'
    ],
    commonMistakes: [
      'ส่งจำนวนดาเมจหรือเงินมาจาก Client เช่น :FireServer(999999) เพราะแฮกเกอร์สามารถใช้โปรแกรมดักแก้ตัวเลขนี้ได้',
      'ใช้ RemoteFunction:InvokeClient() บน Server เพราะหาก Client เกิดแลคหรือตั้งใจค้าง สคริปต์ Server จะหยุดทำงาน (Hang) ทั้งหมด'
    ],
    gameExample: 'ใน Blox Fruits เวลาเรากดคีย์บอร์ดใช้สกิล LocalScript จะยิง RemoteEvent บอก Server แล้ว Server จะเป็นผู้สร้าง Hitbox และปล่อยเอฟเฟกต์ให้คนทั้งเซิร์ฟเวอร์เห็น',
    prebakedDeepDive: {
      analogy: 'เปรียบเสมือนการโทรสั่งพิซซ่า ลูกค้า (Client) โทรบอกพนักงาน (RemoteEvent) ว่า "ขอถาดใหญ่ 1 ถาด" จากนั้นพนักงาน (Server) เช็กราคาในระบบจริงและคิดเงิน ไม่ใช่ลูกค้าโทรไปบอกว่า "ขอพิซซ่าฟรี 100 ถาดแล้วผมจ่าย 0 บาทนะ"',
      underTheHood: 'RemoteEvent มีการจำกัดความถี่ (Rate Limiting) ที่ประมาณ 50KB/s หากส่งข้อมูลก้อนใหญ่หรือส่งทุกๆ เฟรม (RenderStepped) อาจทำให้ผู้เล่นหลุดจากเกม (Ping พุ่งสูง)',
      proTips: [
        'ใช้ RemoteEvent ส่งเฉพาะ "เจตนา" (Intent) เช่น "ฉันอยากซื้อไอเทมรหัส 01" แล้วให้ Server ตรวจเงินใน Database จริง',
        'หลีกเลี่ยงการสร้าง RemoteEvent หลายร้อยชิ้น ให้ใช้ RemoteEvent กลางพร้อมส่ง actionId หรือใช้ Library อย่าง Knit / ByteNet สำหรับเกมขนาดใหญ่'
      ]
    }
  },
  {
    id: 'datastores-persistence',
    title: 'DataStoreService & Data Persistence',
    thaiTitle: 'การบันทึกข้อมูลผู้เล่นด้วย DataStoreService',
    category: 'datastores',
    difficulty: 'Intermediate',
    officialUrl: 'https://create.roblox.com/docs/cloud-services/datastores',
    summary: 'ระบบฐานข้อมูล NoSQL บน Cloud ของ Roblox สำหรับเก็บข้อมูลข้ามเซสชัน เช่น เลเวล, เงิน, กระเป๋าไอเทม เพื่อไม่ให้ข้อมูลหายเวลาผู้เล่นออกจากเกม',
    whyItMatters: 'เกมที่มีระบบพัฒนาตัวละคร (Progression) จะไร้ความหมายทันทีหากไม่มี DataStore และหากเขียนระบบเซฟผิดพลาด อาจเกิดข้อมูลสูญหาย (Data Loss) หรือการโคลนไอเทมได้',
    keyConcepts: [
      'SetAsync: บันทึกทับข้อมูลทันที (ระวังเรื่อง Race Condition)',
      'GetAsync: โหลดข้อมูลของผู้เล่นเมื่อเข้าเกม',
      'UpdateAsync: อัปเดตข้อมูลแบบปลอดภัย โดยตรวจสอบค่าเดิมก่อน (แนะนำมากที่สุด)',
      'pcall (Protected Call): คำสั่งดักจับ Error ที่ขาดไม่ได้เมื่อติดต่อกับ Cloud'
    ],
    visualDiagram: `ผู้เล่นเข้าเกม ---> GetAsync("Player_123") (ใช้ pcall) ---> นำข้อมูลเข้า Leaderstats
        |
เล่นเกม เก็บเลเวล / หาเงิน (อัปเดตในหน่วยความจำ RAM ของ Server)
        |
ผู้เล่นออกจากเกม / เซิร์ฟเวอร์ปิด ---> UpdateAsync() เพื่อเซฟลง Cloud`,
    codeSnippet: `local DataStoreService = game:GetService("DataStoreService")
local coinStore = DataStoreService:GetDataStore("PlayerCoins_v1")

local function savePlayerData(player: Player, coins: number)
    local key = "Player_" .. player.UserId -- แนะนำใช้ UserId เสมอ ห้ามใช้ Name เพราะผู้เล่นเปลี่ยนชื่อได้
    
    -- ต้องครอบด้วย pcall เสมอ ป้องกันเกมล่มเวลาระบบเน็ตเวิร์กมีปัญหา
    local success, err = pcall(function()
        coinStore:UpdateAsync(key, function(oldValue)
            local currentCoins = oldValue or 0
            return math.max(currentCoins, coins)
        end)
    end)
    
    if success then
        print("เซฟข้อมูลสำเร็จสำหรับ " .. player.Name)
    else
        warn("เซฟข้อมูลล้มเหลว: " .. tostring(err))
    end
end`,
    codeExplanation: [
      'UserId: ใช้เป็นคีย์หลักเพราะไม่มีวันเปลี่ยน แม้ผู้เล่นจะจ่าย Robux เปลี่ยนชื่อแอคเคานต์ก็ตาม',
      'pcall: ย่อมาจาก Protected Call ทำหน้าที่เหมือน try/catch เพื่อไม่ให้สคริปต์พังเวลาเซิร์ฟเวอร์ Roblox ตอบสนองช้า',
      'UpdateAsync: รับฟังก์ชัน Callback เข้ามา นำค่าเก่ามาประมวลผลก่อนเซฟ ป้องกันการเซฟทับข้ามเซิร์ฟเวอร์'
    ],
    commonMistakes: [
      'เรียก SetAsync ถี่เกินไปจนติด DataStore Request Limit (โควต้าคือ 60 + numPlayers × 10 ครั้งต่อนาที)',
      'ลืมเปิด "Enable Studio Access to API Services" ใน Game Settings ทำให้เทสต์ใน Studio ไม่ผ่าน',
      'ไม่ครอบด้วย pcall ทำให้เวลาเซิร์ฟเวอร์ Roblox หน่วง เกมค้างทันที'
    ],
    gameExample: 'Pet Simulator ใช้ DataStore บันทึกจำนวนเพชรและสัตว์เลี้ยงทั้งหมด หากระบบไม่มี UpdateAsync สัตว์เลี้ยงอาจสูญหายเวลาเซิร์ฟเวอร์เกิดอาการรีสตาร์ตกะทันหัน',
    prebakedDeepDive: {
      analogy: 'เปรียบเสมือนตู้เซฟธนาคารกลาง เมื่อลูกค้าเดินออกจากสาขา ข้อมูลจะถูกส่งไปปรับปรุงที่สาขาใหญ่ หากไฟฟ้าดับหรือเน็ตหลุด (Server Crash) ระบบจะใช้บันทึกสำรองล่าสุดมาทำงานต่อ',
      underTheHood: 'Roblox DataStore ใช้มาตรฐานเบื้องหลังคล้าย AWS DynamoDB ข้อมูลจะถูกกระจายไปยังเซิร์ฟเวอร์หลายจุดทั่วโลก มี Versioning ย้อนหลังสูงสุด 30 วัน',
      proTips: [
        'ใช้ ProfileService หรือ ReplicaService ซึ่งเป็น Open-Source Library มาตรฐานที่นักพัฒนา Roblox นิยมสูงสุด เพราะแก้ปัญหา Session-Locking อัตโนมัติ',
        'อย่าบันทึกข้อมูลทุกครั้งที่ผู้เล่นได้เหรียญ ให้รวมยอดไว้ในตัวแปร แล้วบันทึกตอนออกจากเกม หรือออโต้เซฟทุก 2-3 นาที'
      ]
    }
  },
  {
    id: 'parts-physics-anchored',
    title: 'Parts, Anchored & Collision Filtering',
    thaiTitle: 'ชิ้นส่วน พิกัดฟิสิกส์ & การชน (Collision)',
    category: 'physics',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/physics',
    summary: 'ระบบจำลองฟิสิกส์แบบเรียลไทม์ของ Roblox ชิ้นส่วน (Part) สามารถตั้งค่า Anchored (ล็อคพิกัดไม่ให้ตกลงตามแรงโน้มถ่วง) และควบคุมการชนผ่าน CanCollide, CanTouch และ CanQuery',
    whyItMatters: 'เกมจะแลคอย่างรุนแรงถ้ามีชิ้นส่วนนับหมื่นชิ้นขยับพร้อมกัน และการสร้างสิ่งกีดขวางหรือประตูวิเศษจำเป็นต้องควบคุมการชนให้ตรงเป้าหมาย',
    keyConcepts: [
      'Anchored = true: วัตถุลอยนิ่ง ไม่ถูกคำนวณฟิสิกส์ ประหยัดสเปกเครื่องมหาศาล',
      'CanCollide = false: วัตถุทะลุผ่านได้ (เช่น ลาวา, น้ำ, หมอก)',
      'CanTouch: ตรวจจับอีเวนต์ .Touched ได้แม้ CanCollide จะเป็น false',
      'CollisionGroups: กำหนดกลุ่มการชน เช่น ไม่ให้ผู้เล่นเดินชนกันเอง'
    ],
    visualDiagram: `Part Properties:
[ Anchored: true  ] -> ตรึงกลางอากาศ ไม่ตก ไม่ไหวติง
[ CanCollide: true] -> ชนแล้วกระเด็น / ยืนเหยียบได้
[ CanTouch: true  ] -> กระตุ้นอีเวนต์ part.Touched:Connect(...)`,
    codeSnippet: `-- สคริปต์แผ่นเหยียบเหรียญ (Coin Pickup)
local coinPart = script.Parent

coinPart.Anchored = true       -- ล็อคลอยไว้เหนือพื้น
coinPart.CanCollide = false    -- เดินทะลุเก็บได้ ไม่เดินสะดุด
coinPart.CanTouch = true       -- ยังคงตรวจจับการสัมผัสได้

local isCollected = false

coinPart.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildWhichIsA("Humanoid")
    if humanoid and not isCollected then
        isCollected = true
        coinPart.Transparency = 1 -- ซ่อนตัวเหรียญ
        print("ผู้เล่นเก็บเหรียญสำเร็จ!")
        
        task.wait(5) -- รอ 5 วินาทีก่อนให้เกิดใหม่
        coinPart.Transparency = 0
        isCollected = false
    end
end)`,
    codeExplanation: [
      'บรรทัดที่ 5: ตั้ง CanCollide = false ทำให้ผู้เล่นวิ่งชนแล้วไม่กระตุกติดขอบเหรียญ',
      'บรรทัดที่ 10: hit.Parent:FindFirstChildWhichIsA("Humanoid") คือการตรวจว่าสิ่งที่มาโดนใช่ตัวละครผู้เล่นหรือไม่',
      'ตัวแปร Debounce (isCollected): สำคัญมากเพื่อป้องกันไม่ให้ Touched ทำงานรัว 30 ครั้งในเสี้ยววินาที'
    ],
    commonMistakes: [
      'ลืมใส่ Anchored ให้กับฉากหรือตึก ทำให้เวลาเริ่มเกม ตึกพังถล่มลงมาทั้งแมป',
      'ไม่ทำ Debounce ในอีเวนต์ .Touched ทำให้โค้ดทำงานซ้ำซ้อนจนเงินเด้งเกินจริงหรือเลือดลดฮวบ'
    ],
    gameExample: 'ในแมปประเภท Obby แพลตฟอร์มกระโดดทั้งหมดต้องเป็น Anchored = true ส่วนบล็อกลาวาแดงจะใช้ CanTouch = true เพื่อลดเลือดผู้เล่นทันทีที่โดน',
    prebakedDeepDive: {
      analogy: 'Anchored เหมือน "ตอกตะปูติดผนังบ้าน" ไม่ว่าจะเอาค้อนไปทุบก็ไม่ขยับ ส่วน Unanchored เหมือน "ลูกบอลกลิ้งบนพื้น" มีแรงลม แรงโน้มถ่วง และแรงกระแทกมาเกี่ยวตลอดเวลา',
      underTheHood: 'Roblox ใช้เอนจินฟิสิกส์ชื่อ PGS (Projected Gauss-Seidel) ชิ้นส่วน Unanchored ทุกชิ้นจะถูกจัดอยู่ใน Physics Island หากชิ้นส่วนเยอะเกินไป CPU Server จะทำงานหนักจนเกิดอาการกระตุก (Physics Lag)',
      proTips: [
        'ใช้ CollisionGroups ในการทำ "No-Clip" หรือไม่ให้เพื่อนร่วมทีมเดินชนกันเอง ดีกว่าการเขียนโค้ดปิด CanCollide บนทุกลูกบาศก์',
        'หากต้องการทำประตูที่คลิกได้แต่ยิงทะลุได้ ให้ปรับแต่ง CanQuery แยกต่างหาก'
      ]
    }
  },
  {
    id: 'ui-layouts-tweenservice',
    title: 'ScreenGui, Responsive Design & TweenService',
    thaiTitle: 'การออกแบบ UI ข้ามหน้าจอ & TweenService',
    category: 'ui',
    difficulty: 'Intermediate',
    officialUrl: 'https://create.roblox.com/docs/ui',
    summary: 'การสร้าง UI ใน Roblox ต้องคำนึงถึง Scale และ Offset เพื่อให้ขนาดพอดีกับหน้าจอมือถือ ไอแพด และจอคอม 4K ควบคู่กับการใช้ TweenService ทำแอนิเมชันปุ่มที่ลื่นไหลระดับ 60 FPS',
    whyItMatters: 'ผู้เล่น Roblox มากกว่า 60% เล่นบนสมาร์ตโฟน หากตั้งค่าขนาดเป็น Offset (พิกเซลตายตัว) เมนูในมือถือจะล้นจอจนกดไม่ได้',
    keyConcepts: [
      'UDim2: โครงสร้างกำหนดตำแหน่ง (ScaleX, OffsetX, ScaleY, OffsetY)',
      'Scale vs Offset: Scale คิดเป็น % ของขนาดหน้าจอ (0 ถึง 1) ส่วน Offset คิดเป็นพิกเซล',
      'UIAspectRatioConstraint: ตัวล็อคอัตราส่วนไม่ให้ไอคอนเบี้ยวหรือยืดเวลาหมุนจอ',
      'TweenService: ระบบคำนวณแอนิเมชันแบบ Smooth ย่อ ขยาย ย้ายตำแหน่ง'
    ],
    visualDiagram: `UDim2.new(ScaleX, OffsetX, ScaleY, OffsetY)
UDim2.new(0.5, 0, 0.5, 0) ---> ตำแหน่งกึ่งกลางจอ 50% เสมอ!
(ใส่ AnchorPoint = Vector2.new(0.5, 0.5) เพื่อให้จุดหมุนอยู่กึ่งกลางภาพ)`,
    codeSnippet: `local TweenService = game:GetService("TweenService")
local button = script.Parent -- สมมติว่าวางใน TextButton

-- ปรับให้จุดหมุนอยู่กึ่งกลาง
button.AnchorPoint = Vector2.new(0.5, 0.5)

-- กำหนดข้อมูล Tween (เวลา 0.2 วินาที, รูปแบบกระเด้งกลับนุ่มนวล)
local tweenInfo = TweenInfo.new(
    0.2, 
    Enum.EasingStyle.Quad, 
    Enum.EasingDirection.Out
)

local hoverTween = TweenService:Create(button, tweenInfo, {
    Size = UDim2.new(0.22, 0, 0.09, 0) -- ขยายขึ้นเล็กน้อย
})

local normalTween = TweenService:Create(button, tweenInfo, {
    Size = UDim2.new(0.2, 0, 0.08, 0) -- กลับขนาดเดิม
})

button.MouseEnter:Connect(function()
    hoverTween:Play()
end)

button.MouseLeave:Connect(function()
    normalTween:Play()
end)`,
    codeExplanation: [
      'AnchorPoint: ค่า (0.5, 0.5) หมายถึงจุดกึ่งกลางของปุ่ม ทำให้เวลาย่อ-ขยาย ปุ่มจะโตออกจากตรงกลาง ไม่เบี้ยวไปทางซ้ายบน',
      'TweenInfo.new(): พารามิเตอร์ประกอบด้วย (เวลา, EasingStyle, EasingDirection)',
      'TweenService ทำงานบน GPU/C++ เอนจิน จึงนุ่มนวลและไม่กินสเปกเมื่อเทียบกับการเขียนลูป while wait() ย่อขยายเอง'
    ],
    commonMistakes: [
      'ใช้ Offset ในการกำหนดขนาดของ Frame หลัก ทำให้เปิดในมือถือจอเล็กแล้วปุ่มล้นขอบจอ',
      'ลืมใส่ UIAspectRatioConstraint ในช่องรูปภาพ ทำให้รูปไอเทมกลายเป็นสี่เหลี่ยมผืนผ้าบวมๆ'
    ],
    gameExample: 'หน้าต่างสุ่มกาชาในเกม Anime Adventures ใช้ TweenService ในการซูมการ์ดและหมุนแสงเอฟเฟกต์รอบตัวการ์ด',
    prebakedDeepDive: {
      analogy: 'Scale เหมือน "เปอร์เซ็นต์ของผืนผ้าใบ" ถ้าผืนผ้าใบใหญ่ขึ้น รูปจะขยายตาม ส่วน Offset เหมือน "ไม้บรรทัดวัดเซนติเมตร" ไม่ว่าผ้าใบจะใหญ่แค่ไหน ไม้บรรทัดก็ยาวเท่าเดิม',
      underTheHood: 'TweenService มี C++ Thread ทำหน้าที่ Interpolate ค่าเชิงตัวเลขในระดับฮาร์ดแวร์ สามารถใช้ปรับแต่งได้ทั้ง Position, Size, Transparency, Color3 และ CFrame',
      proTips: [
        'ใช้ Plugin จำพวก "AutoScale Lite" เพื่อแปลง Offset เป็น Scale ได้ในคลิกเดียว',
        'สำหรับ UI ที่มีรายการเลื่อนได้ ให้ใช้ ScrollingFrame ควบคู่กับ UIListLayout และเปิด AutomaticCanvasSize เป็น Y'
      ]
    }
  },
  {
    id: 'raycasting-shooting-mechanics',
    title: 'Raycasting & Spatial Queries',
    thaiTitle: 'การยิงลำแสง Raycast & ระบบตรวจจับพิกัด',
    category: 'physics',
    difficulty: 'Advanced',
    officialUrl: 'https://create.roblox.com/docs/physics/raycasting',
    summary: 'Raycasting คือการยิงเส้นเลเซอร์ที่มองไม่เห็นจากจุด A ไปยังจุด B เพื่อดูว่าเลเซอร์นี้ชนกับวัตถุอะไร ชนที่พิกัดไหน และพื้นผิวมีความเอียงเท่าใด',
    whyItMatters: 'หัวใจของระบบปืนเล็งยิง (Hitscan), ระบบตรวจว่าตัวละครเหยียบพื้นอยู่หรือไม่, ระบบเลเซอร์เซนเซอร์ และระบบตรวจระยะสายตาของศัตรู AI',
    keyConcepts: [
      'workspace:Raycast(origin, direction, raycastParams)',
      'RaycastParams: ตัวกำหนดข้อยกเว้น (เช่น เมินตัวละครผู้ยิง ไม่ให้ยิงโดนตัวเอง)',
      'RaycastResult: ประกอบด้วย .Instance (ชิ้นส่วนที่ชน), .Position (พิกัดจุดตกกระทบ), .Normal (ทิศทางมุมสะท้อน)'
    ],
    visualDiagram: `[ปลายกระบอกปืน (Origin)] -------------------> [กำแพง / ศัตรู (Hit Instance)]
         |                                           ^
         +--- Direction (Vector3 x ความไกล 500) -----+`,
    codeSnippet: `local function shootBullet(gunTipPosition: Vector3, targetPosition: Vector3, shooterCharacter: Model)
    -- ทิศทาง = (เป้าหมาย - จุดเริ่มต้น).Unit * ระยะทางสูงสุด
    local direction = (targetPosition - gunTipPosition).Unit * 300

    local params = RaycastParams.new()
    params.FilterType = Enum.RaycastFilterType.Exclude
    params.FilterDescendantsInstances = { shooterCharacter } -- ข้ามตัวละครผู้ยิง

    local result = workspace:Raycast(gunTipPosition, direction, params)

    if result then
        print("ยิงโดนชิ้นส่วน: " .. result.Instance.Name)
        print("พิกัดกระทบ: " .. tostring(result.Position))
        
        -- ตรวจสอบว่าโดนศัตรูหรือไม่
        local enemyHum = result.Instance.Parent:FindFirstChildWhichIsA("Humanoid")
        if enemyHum then
            enemyHum:TakeDamage(25)
        end
    else
        print("ยิงขึ้นฟ้า ไม่โดนอะไรเลย")
    end
end`,
    codeExplanation: [
      '(target - origin).Unit: คือการแปลงเวกเตอร์ให้เหลือขนาด 1 หน่วย (Unit Vector) เพื่อระบุเฉพาะทิศทาง',
      '* 300: ขยายระยะการยิงออกไป 300 studs',
      'FilterType.Exclude: ป้องกันบั๊กกระสุนเด้งชนหมวกหรือไหล่ของผู้เล่นที่ยิงเอง'
    ],
    commonMistakes: [
      'ใส่พิกัดปลายทางลงไปในช่อง direction แทนที่จะเป็นทิศทางสัมพัทธ์ (direction = target - origin)',
      'ยิง Raycast ทุกเฟรมโดยไม่มีการจำกัดจำนวน ทำให้ประสิทธิภาพเครื่องลดลง'
    ],
    gameExample: 'ในเกมแนว FPS อย่าง Arsenal หรือ Rivals ใช้ Raycasting ตรวจสอบ Hitbox ทันทีที่ผู้เล่นคลิกเมาส์',
    prebakedDeepDive: {
      analogy: 'เหมือนคุณถือปากกาเลเซอร์สีแดงชี้ไปในห้องมืด จุดสีแดงที่ปรากฏบนกำแพงคือ Result.Position ส่วนกำแพงที่โดนชี้คือ Result.Instance',
      underTheHood: 'Roblox ใช้โครงสร้างข้อมูลแบบ BVH (Bounding Volume Hierarchy) ในการเร่งความเร็วการค้นหาการตัดกันของรังสี ทำให้ Raycast ใน Roblox ไวมาก (รันได้หลายพันเส้นต่อวินาที)',
      proTips: [
        'ใช้ `params.IgnoreWater = true` หากไม่ต้องการให้กระสุนติดผิวน้ำ',
        'หากต้องการตรวจจับวัตถุเป็นทรงกลมรอบตัวแทนเส้นตรง ให้ใช้ `workspace:GetPartBoundsInRadius()`'
      ]
    }
  },
  {
    id: 'pathfinding-service-ai',
    title: 'PathfindingService & Smart NPCs',
    thaiTitle: 'ระบบนำทางและบอท AI ด้วย PathfindingService',
    category: 'characters',
    difficulty: 'Advanced',
    officialUrl: 'https://create.roblox.com/docs/navigation/pathfinding',
    summary: 'บริการคำนวณเส้นทางเดินอัตโนมัติ เพื่อให้ซอมบี้หรือมอนสเตอร์ AI เดินอ้อมกำแพง หลบสิ่งกีดขวาง และกระโดดข้ามหลุมมาหาผู้เล่นได้อย่างสมจริง',
    whyItMatters: 'หากใช้เพียง `humanoid:MoveTo(target)` ตรงๆ มอนสเตอร์จะเดินชนกำแพงแล้วติดอยู่อย่างนั้น PathfindingService จึงแก้ปัญหานี้ด้วยอัลกอริทึม A* ขั้นสูง',
    keyConcepts: [
      'PathfindingService:CreatePath(agentParameters)',
      'path:ComputeAsync(startPos, endPos)',
      'Waypoints: จุดหมุดทีละจุดที่มอนสเตอร์ต้องเดินตามลำดับ',
      'PathStatus.Success: ยืนยันว่าพบเส้นทางที่เดินไปถึงได้จริง'
    ],
    visualDiagram: `[ซอมบี้] ---> จุดเวย์พอยต์ 1 ---> จุดเวย์พอยต์ 2 (กระโดด) ---> [อ้อมกำแพง] ---> [ผู้เล่น]`,
    codeSnippet: `local PathfindingService = game:GetService("PathfindingService")
local npc = script.Parent
local humanoid = npc:WaitForChild("Humanoid")
local rootPart = npc:WaitForChild("HumanoidRootPart")

local function followTarget(destination: Vector3)
    local path = PathfindingService:CreatePath({
        AgentRadius = 2.5,
        AgentHeight = 5,
        AgentCanJump = true
    })

    local success, _ = pcall(function()
        path:ComputeAsync(rootPart.Position, destination)
    end)

    if success and path.Status == Enum.PathStatus.Success then
        local waypoints = path:GetWaypoints()
        for _, waypoint in ipairs(waypoints) do
            -- ถ้าจุดนี้ต้องกระโดด
            if waypoint.Action == Enum.PathWaypointAction.Jump then
                humanoid.Jump = true
            end
            
            humanoid:MoveTo(waypoint.Position)
            -- รอให้เดินถึงจุดก่อน หรือหมดเวลา 8 วินาที
            humanoid.MoveToFinished:Wait()
        end
    end
end`,
    codeExplanation: [
      'AgentRadius & Height: ระบุขนาดของมอนสเตอร์ เพื่อไม่ให้หาทางในช่องแคบที่ตัวมอนสเตอร์เดินติด',
      'ComputeAsync: คำนวณตาราง Navigation Mesh เบื้องหลัง',
      'GetWaypoints(): คืนค่าลิสต์ของจุดพิกัดที่ต้องเดินทีละสเต็ป'
    ],
    commonMistakes: [
      'เรียก ComputeAsync รัวเกินไปในทุกๆ วินาที ควรคำนวณใหม่เมื่อเป้าหมายขยับห่างจากตำแหน่งเดิมเกินระยะที่กำหนด',
      'ไม่ได้ใส่ timeout ใน `humanoid.MoveToFinished:Wait()` หากมอนสเตอร์สะดุดก้อนหิน อาจค้างไปตลอดกาล'
    ],
    gameExample: 'ในเกม Doors มอนสเตอร์ชื่อ Rush และ Figure คำนวณเส้นทางผ่านห้องและซอกหลืบเพื่อไล่ล่าผู้เล่น',
    prebakedDeepDive: {
      analogy: 'เหมือนคุณเปิด Google Maps ในมือถือ ระบบจะบอกให้คุณ "ตรงไป 100 เมตร เลี้ยวซ้าย แล้วข้ามสะพานลอย" หมุดแต่ละอันคือ Waypoint',
      underTheHood: 'Roblox สร้าง Voxel Grid 3D ของฉากทั้งหมดแบบไดนามิก หากมีกำแพงพังทลายลง NavMesh จะอัปเดตให้อัตโนมัติ',
      proTips: [
        'ใช้ PathfindingModifier บนสิ่งกีดขวาง เพื่อเพิ่ม "ต้นทุนการเดิน" (Cost) เช่น สั่งให้มอนสเตอร์เลี่ยงเดินบนลาวาถ้าไม่จำเป็น',
        'ใช้ task.spawn() เพื่อไม่ให้การเดินของบอทตัวหนึ่งไปขัดจังหวะการทำงานของสคริปต์หลัก'
      ]
    }
  },
  {
    id: 'monetization-marketplaceservice',
    title: 'MarketplaceService & In-Game Purchases',
    thaiTitle: 'ระบบเติมเงินและขายของด้วย MarketplaceService',
    category: 'security_monetization',
    difficulty: 'Intermediate',
    officialUrl: 'https://create.roblox.com/docs/production/monetization',
    summary: 'ระบบจัดการการซื้อขายด้วย Robux ภายในเกม แบ่งเป็น Game Pass (ซื้อครั้งเดียวได้ถาวร เช่น วิ่งเร็ว x2) และ Developer Product (ซื้อซ้ำได้ไม่จำกัด เช่น เติมเหรียญ 500 Gold)',
    whyItMatters: 'การสร้างรายได้ (Monetization) ให้กับผู้พัฒนาเกม และต้องระวังเรื่องการให้ของไม่ตรงยอดเงิน หรือโดนโกงสินค้า',
    keyConcepts: [
      'PromptGamePassPurchase: เด้งหน้าต่างให้ผู้เล่นซื้อ Gamepass',
      'PromptProductPurchase: เด้งหน้าต่างให้ผู้เล่นซื้อ Developer Product',
      'ProcessReceipt: หัวใจของ Developer Product ต้องคืนค่า ProductPurchaseDecision.PurchaseGranted เสมอเมื่อมอบของสำเร็จ'
    ],
    visualDiagram: `ผู้เล่นกดปุ่มซื้อในเกม ---> เด้งหน้าต่าง Robux ยืนยัน
        |
Roblox ตัดยอด Robux สำเร็จ ---> Server เรียก ProcessReceipt Callback
        |
Server เพิ่มไอเทม / เหรียญให้ผู้เล่น ---> บันทึก DataStore ---> ส่งสัญญาณ PurchaseGranted`,
    codeSnippet: `local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local COIN_PRODUCT_ID = 12345678 -- แทนที่ด้วย Product ID จริงของคุณ

MarketplaceService.ProcessReceipt = function(receiptInfo)
    local player = Players:GetPlayerByUserId(receiptInfo.PlayerId)
    
    if not player then
        -- หากผู้เล่นหลุดไประหว่างซื้อ คืนค่า NotProcessedYet เพื่อให้ Roblox ลองส่งใหม่เมื่อเขาเข้าเกม
        return Enum.ProductPurchaseDecision.NotProcessedYet
    end

    if receiptInfo.ProductId == COIN_PRODUCT_ID then
        local leaderstats = player:FindFirstChild("leaderstats")
        local coins = leaderstats and leaderstats:FindFirstChild("Coins")
        if coins then
            coins.Value += 500
            print("มอบ 500 เหรียญให้ผู้เล่นสำเร็จ!")
            -- คืนค่ายืนยันว่าได้รับของแล้ว ตัดยอดสมบูรณ์
            return Enum.ProductPurchaseDecision.PurchaseGranted
        end
    end

    return Enum.ProductPurchaseDecision.NotProcessedYet
end`,
    codeExplanation: [
      'ProcessReceipt: ต้องถูกผูก (Bind) เพียงจุดเดียวในทั้งเกมเท่านั้น ห้ามผูกซ้ำหลายสคริปต์',
      'NotProcessedYet: หากเกิดเหตุขัดข้อง ให้แจ้งค่านี้ เพื่อให้ Roblox ไม่เพิกถอนยอดและส่งมาถามใหม่ในครั้งถัดไป',
      'PurchaseGranted: เป็นตัวยืนยันว่าการส่งมอบสินค้าเสร็จสิ้น'
    ],
    commonMistakes: [
      'ผูก ProcessReceipt ไว้ในหลายๆ สคริปต์ ทำให้สคริปต์หลังไปทับสคริปต์แรกจนระบบซื้อของล่ม',
      'ลืมเช็คว่าผู้เล่นยังอยู่ในเซิร์ฟเวอร์หรือไม่ตอน ProcessReceipt ถูกเรียก'
    ],
    gameExample: 'Pet Simulator ขายไข่สุ่มพิเศษด้วย Developer Product เมื่อผู้เล่นจ่าย Robux สำเร็จ ไข่จะฟักทันทีโดยไม่สูญหาย',
    prebakedDeepDive: {
      analogy: 'เหมือนตู้ขายน้ำอัดลมอัตโนมัติ ลูกค้าหยอดเหรียญ (Robux) ตู้ปล่อยกระป๋องน้ำลงมา (PurchaseGranted) หากกระป๋องน้ำติดค้างในตู้ ตู้จะคืนเหรียญหรือเก็บบันทึกไว้ให้ลูกค้ากดใหม่ (NotProcessedYet)',
      underTheHood: 'ระบบ ProcessReceipt มีกลไก Retry สูงสุด 3 วัน หากเซิร์ฟเวอร์ของคุณเกิดดับระหว่างมอบสินค้า ข้อมูลการซื้อจะไม่สูญหาย',
      proTips: [
        'เก็บประวัติ `receiptInfo.PurchaseId` ลงใน DataStore เพื่อป้องกันการมอบของซ้ำ (Idempotency)',
        'อย่าทดสอบการซื้อด้วยไอดีของตัวเองที่สร้างสินค้านั้น เพราะจะไม่ถูกหัก Robux จริง'
      ]
    }
  },
  {
    id: 'luau-type-checking',
    title: 'Luau Strict Type Checking & Performance',
    thaiTitle: 'การเขียนโค้ดปลอดภัยด้วย Luau Type Checking',
    category: 'luau',
    difficulty: 'Intermediate',
    officialUrl: 'https://create.roblox.com/docs/luau/type-checking',
    summary: 'Luau คือภาษาที่พัฒนาต่อยอดมาจาก Lua 5.1 เพื่อเพิ่มความเร็วในการประมวลผลสูงสุด 2-4 เท่า พร้อมระบบ Type Checking ที่คอยแจ้งเตือน Error ทันทีที่คุณพิมพ์โค้ดผิดพลาดใน Studio',
    whyItMatters: 'ช่วยตรวจจับบักได้ตั้งแต่ก่อนกด Play ช่วยให้เขียนเกมใหญ่ๆ ได้อย่างมั่นใจ และทำให้เครื่องมือ Auto-Complete ใน Roblox Studio ฉลาดขึ้นอย่างมหาศาล',
    keyConcepts: [
      '--!strict: โหมดบังคับตรวจ Type ทุกตัวแปร',
      'Type Annotations: ระบุชนิดตัวแปร เช่น `name: string`, `health: number`',
      'Custom Types: การสร้างโครงสร้างข้อมูลของตัวเองด้วย `type PlayerData = { ... }`'
    ],
    visualDiagram: `--!strict
local name: string = "Noob" -- ผ่าน
local age: number = "สิบแปด" -- แจ้งเตือนเส้นใต้สีส้มทันทีว่าประเภทข้อมูลไม่ตรง!`,
    codeSnippet: `--!strict
-- กำหนดโครงสร้างประเภทข้อมูลของกระเป๋าไอเทม
export type InventoryItem = {
    itemId: string,
    quantity: number,
    isEquipped: boolean
}

local function equipItem(item: InventoryItem): boolean
    if item.quantity <= 0 then
        warn("ไม่มีไอเทมนี้ในกระเป๋า")
        return false
    end
    
    item.isEquipped = true
    print("ติดตั้งไอเทม: " .. item.itemId)
    return true
end`,
    codeExplanation: [
      '--!strict: วางไว้บรรทัดแรกสุดของสคริปต์เพื่อเปิดระบบตรวจจับเต็มรูปแบบ',
      'export type: ทำให้สคริปต์อื่นสามารถ import type นี้ไปใช้งานร่วมกันได้',
      'การระบุ Type ทำให้โปรแกรมเมอร์คนอื่นในทีมเข้าใจฟังก์ชันทันทีโดยไม่ต้องอ่านโค้ดทั้งหมด'
    ],
    commonMistakes: [
      'ใช้ `any` พร่ำเพรื่อจนสูญเสียประโยชน์ของ Type Checking',
      'สับสนระหว่าง `:` (Type annotation) กับ `=` (กำหนดค่า)'
    ],
    gameExample: 'สตูดิโอระดับโลกอย่าง Rolimon หรือ Uplift Games (ผู้สร้าง Adopt Me!) ใช้ Luau Strict Mode ในทุกโปรเจกต์เพื่อลดบั๊กในโปรดักชัน',
    prebakedDeepDive: {
      analogy: 'เหมือนคุณมีผู้ช่วยตรวจไวยากรณ์ภาษาไทยนั่งข้างๆ เวลาคุณเขียนเอกสาร พิมพ์ผิดปุ๊บก็สะกิดบอกทันที ไม่ต้องรอให้ส่งจดหมายไปถึงมือผู้อ่านแล้วค่อยโดนด่า',
      underTheHood: 'Luau รันบน Bytecode Compiler และ JIT-friendly Virtual Machine ชนิดตัวแปรที่ชัดเจนช่วยให้คอมไพเลอร์ข้ามการเช็ก Metatable และดึงข้อมูลจาก Memory ได้โดยตรง',
      proTips: [
        'ใช้ Union Types เช่น `type Result = "Success" | "Failed" | "Pending"` เพื่อจำกัดค่าที่ยอมรับได้',
        'เปิดใช้ Studio Settings > Script Editor > Enable Luau Type Checking เพื่อประสบการณ์ที่ดีที่สุด'
      ]
    }
  },
  {
    id: 'runservice-loops-timing',
    title: 'RunService: Heartbeat, Stepped & RenderStepped',
    thaiTitle: 'ลูปประมวลผลเรียลไทม์ด้วย RunService',
    category: 'luau',
    difficulty: 'Advanced',
    officialUrl: 'https://create.roblox.com/docs/scripting/multithreading/run-service',
    summary: 'บริการจัดการรอบเฟรมเรตของเกม (Frame Lifecycle) แทนที่จะใช้ while wait() แบบโบราณ RunService ให้ความลื่นไหลระดับ 60 FPS ขึ้นไป และแบ่งจังหวะการทำงานก่อน-หลังการคำนวณฟิสิกส์และการวาดภาพบนจออย่างแม่นยำ',
    whyItMatters: 'การใช้ while wait() จะหน่วงเวลาขั้นต่ำ 0.03 วินาทีและอาจกระตุกเมื่อเซิร์ฟเวอร์โหลดหนัก แต่ RunService จะซิงค์กับสัญญาณนาฬิกาของหน้าจอและเอนจินเกมโดยตรง',
    keyConcepts: [
      'RenderStepped (Client เท่านั้น): รันก่อนเฟรมถูกเรนเดอร์ เหมาะกับมุมกล้อง (Camera) และ Custom Crosshair',
      'Heartbeat (Client & Server): รันหลังคำนวณฟิสิกส์เสร็จสิ้น เหมาะกับระบบจับเวลา, ตรวจสถานะผู้เล่น, นับเวลาถอยหลัง',
      'Stepped (Client & Server): รันก่อนคำนวณฟิสิกส์ เหมาะกับการปรับแต่ง CFrame ของวัตถุที่มีแรงโน้มถ่วง',
      'พารามิเตอร์ deltaTime (dt): ค่าเวลาที่ผ่านไประหว่างเฟรม ใช้คูณความเร็วเพื่อให้เกมวิ่งเท่ากันทุกจอ'
    ],
    visualDiagram: `รอบเวลาใน 1 เฟรม (Frame Cycle):
1. [Stepped]        ---> รันก่อนคำนวณฟิสิกส์
2. [Physics Step]   ---> Roblox คำนวณการชนและแรงโน้มถ่วง
3. [RenderStepped]  ---> รันก่อนวาดภาพลงจอ (Client Only)
4. [Heartbeat]      ---> รันหลังจบรอบเฟรมทั้งหมด`,
    codeSnippet: `local RunService = game:GetService("RunService")
local partToRotate = workspace:WaitForChild("FloatingGem")

local ROTATION_SPEED = 90 -- หมุน 90 องศาต่อวินาที

-- เชื่อมต่อ Heartbeat เพื่อหมุนวัตถุอย่างราบรื่น
local connection
connection = RunService.Heartbeat:Connect(function(deltaTime: number)
    -- สำคัญมาก: ต้องคูณ deltaTime เสมอ เพื่อให้หมุนเร็วเท่ากันไม่ว่าเครื่องจะ 30 FPS หรือ 144 FPS
    local angle = math.rad(ROTATION_SPEED * deltaTime)
    partToRotate.CFrame = partToRotate.CFrame * CFrame.Angles(0, angle, 0)
end)

-- วิธียกเลิกการทำงานเมื่อไม่ต้องการแล้ว:
-- connection:Disconnect()`,
    codeExplanation: [
      'RunService.Heartbeat: ทำงานทุกครั้งที่เซิร์ฟเวอร์หรือไคลเอนต์จบรอบประมวลผล',
      'deltaTime: คือระยะเวลาจริงที่ผ่านไปในเฟรมนั้น (เช่น 0.016 วินาทีที่ 60 FPS)',
      'การคูณด้วย deltaTime เรียกว่า Frame-Rate Independence ป้องกันบั๊กคนจอ 144Hz วิ่งเร็วกว่าคนจอ 60Hz',
      ':Disconnect() ช่วยป้องกันปัญหา Memory Leak'
    ],
    commonMistakes: [
      'เรียก RunService.RenderStepped ใน Script ฝั่ง Server (RenderStepped มีเฉพาะใน LocalScript ฝั่ง Client เท่านั้น)',
      'ลืมคูณตัวเลขการเคลื่อนที่ด้วย deltaTime ทำให้เวลาเกมแลค วัตถุจะกระตุกหรือพุ่งผิดสปีด'
    ],
    gameExample: 'ระบบขับรถใน Jailbreak และระบบมุมกล้องมองบุคคลที่หนึ่ง (First-Person Camera) ใน Frontlines ใช้ RunService RenderStepped ในการปรับมุมมองทุกเสี้ยววินาที',
    prebakedDeepDive: {
      analogy: 'เปรียบเสมือนจังหวะการเต้นของหัวใจ (Heartbeat) แทนที่คุณจะนั่งนับเลข 1-2-3 ในใจแบบสุ่มๆ ร่างกายจะมีจังหวะชีพจรที่แน่นอนคอยสูบฉีดเลือดทุกรอบสม่ำเสมอ',
      underTheHood: 'RunService ทำงานบน C++ Engine Pipeline โดยตรง มีความล่าช้า (Overhead) ต่ำกว่าการรัน Coroutine หรือ Task Scheduler ทั่วไป',
      proTips: [
        'หากต้องการดีบั๊กว่าโค้ดกำลังรันบน Studio หรือเกมจริง ให้ใช้ `RunService:IsStudio()`',
        'หากต้องการเช็กฝั่งให้ใช้ `RunService:IsServer()` หรือ `RunService:IsClient()`'
      ]
    }
  },
  {
    id: 'proximity-prompt-interaction',
    title: 'ProximityPrompt & World Interaction',
    thaiTitle: 'ระบบกดปุ่มโต้ตอบวัตถุในโลกเกม (กด E / สัมผัส)',
    category: 'ui',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/ui/proximity-prompts',
    summary: 'ฟีเจอร์สำเร็จรูปของ Roblox สำหรับสร้างระบบปฏิสัมพันธ์ (Interactive Prompt) เช่น เดินเข้าไปใกล้แล้วมีปุ่มให้กดค้างปุ่ม E บนคอมพิวเตอร์ หรือแตะปุ่มบนจอมือถือเพื่อเปิดหีบสมบัติ ประตู หรือคุยกับ NPC',
    whyItMatters: 'ในอดีต ผู้พัฒนาต้องเขียนระบบวัดระยะทาง สร้าง BillboardGui และเขียนตรวจจับเมาส์เองทั้งหมด ProximityPrompt ช่วยลดโค้ดนับร้อยบรรทัดให้เหลือเพียงอ็อบเจกต์ชิ้นเดียว และรองรับทั้งเมาส์ คีย์บอร์ด จอสัมผัส และจอยเกมอัตโนมัติ',
    keyConcepts: [
      'ActionText: ข้อความบอกการกระทำ เช่น "เปิดหีบ", "พูดคุย", "หยิบไอเทม"',
      'ObjectText: ชื่อของวัตถุ เช่น "หีบสมบัติทองคำ"',
      'HoldDuration: ระยะเวลาที่ต้องกดค้าง (0 = กดครั้งเดียวติด, 1.5 = ต้องกดค้าง 1.5 วินาที)',
      'MaxActivationDistance: ระยะห่างสูงสุดที่ผู้เล่นจะเห็นและกดปุ่มได้'
    ],
    visualDiagram: `[ผู้เล่นเดินเข้าใกล้ระยะ 10 studs]
               |
        ปรากฏไอคอนรูป [ E ] เปิดหีบสมบัติ
               |  (ผู้เล่นกดค้าง 1 วินาที)
        prompt.Triggered:Connect(function(player) ... )
               |
        Server มอบเงิน 100 เหรียญให้ผู้เล่น`,
    codeSnippet: `local prompt = script.Parent -- วางไว้ภายใน ProximityPrompt

prompt.ActionText = "เปิดหีบ"
prompt.ObjectText = "หีบสมบัติโบราณ"
prompt.HoldDuration = 1.0         -- ต้องกดค้าง 1 วินาที
prompt.MaxActivationDistance = 10 -- ระยะ 10 studs
prompt.RequiresLineOfSight = true -- ต้องไม่มีกำแพงบัง

local isOpened = false

prompt.Triggered:Connect(function(player: Player)
    if isOpened then return end
    isOpened = true
    
    print(player.Name .. " ได้ทำการเปิดหีบสมบัติสำเร็จ!")
    
    -- ปิดการแสดงปุ่มชั่วคราว
    prompt.Enabled = false
    
    -- หน่วงเวลาก่อนให้หีบกลับมาใหม่
    task.wait(10)
    prompt.Enabled = true
    isOpened = false
end)`,
    codeExplanation: [
      'Triggered: อีเวนต์ที่จะทำงานเมื่อผู้เล่นกดปุ่มสำเร็จ (และกดค้างครบเวลาหากมี HoldDuration)',
      'พารามิเตอร์ player: ส่งข้อมูลผู้เล่นที่กดมาให้อัตโนมัติ สามารถนำไปเพิ่มเงินหรือเปิดประตูได้ทันที',
      'RequiresLineOfSight = true: ป้องกันการกดทะลุกำแพงหรือแอบกดจากนอกบ้าน'
    ],
    commonMistakes: [
      'ตั้งค่า MaxActivationDistance ไกลเกินไป ทำให้ไอคอนปุ่ม E ลอยเต็มจอเกะกะสายตาผู้เล่น',
      'ลืมปิด `prompt.Enabled = false` ระหว่างประมวลผล ทำให้ผู้เล่นสามารถรัวกดได้ซ้ำๆ'
    ],
    gameExample: 'เกมเอาชีวิตรอดและสยองขวัญอย่าง Evade, Doors, และ Piggy ใช้ ProximityPrompt ในการเปิดประตู เก็บแบตเตอรี่ และไขกุญแจเกือบ 100%',
    prebakedDeepDive: {
      analogy: 'เหมือนกระดิ่งหน้าบ้านหรือปุ่มกดเปิดประตูลิฟต์ เมื่อคุณเดินไปถึงหน้าประตู ปุ่มจะสว่างขึ้นเพื่อให้คุณกด ไม่ต้องเดาว่าจะเปิดยังไง',
      underTheHood: 'ProximityPrompt มีการคำนวณ Screen Space Projection และ Depth Checking ในระดับ Engine Core ทำให้กินทรัพยากรน้อยกว่าการสร้าง UI เองอย่างเทียบไม่ติด',
      proTips: [
        'ใช้ `prompt.TriggerEnded` และ `prompt.PromptButtonHoldBegan` ในการสร้างเสียงเอฟเฟกต์ระหว่างกดค้าง',
        'สามารถใช้ Custom UI Style โดยตั้งค่า `prompt.Style = Enum.ProximityPromptStyle.Custom` เพื่อออกแบบปุ่มเอง'
      ]
    }
  },
  {
    id: 'lighting-atmosphere-vfx',
    title: 'Lighting, Atmosphere & Post-Processing',
    thaiTitle: 'จัดแสงเงา บรรยากาศ และกราฟิกสมจริง (Lighting & VFX)',
    category: 'environment_audio',
    difficulty: 'Intermediate',
    officialUrl: 'https://create.roblox.com/docs/environment/lighting',
    summary: 'การเนรมิตภาพในเกมให้อารมณ์เหมือนเกมระดับ AAA ด้วยเอนจินแสง Future is Bright (FIB v3) ควบคู่กับ Atmosphere (หมอกและแสงกระจาย), Bloom (แสงฟุ้ง), ColorCorrection (ย้อมโทนสี) และ SunRays',
    whyItMatters: 'แสงและสีคือ 80% ของความประทับใจแรกที่ผู้เล่นมองเห็น เกมแมปเดียวกันหากจัดแสงถูกวิธีจะดูสวยงามและน่าเล่นขึ้นเป็นสิบเท่า',
    keyConcepts: [
      'Technology = Future: โหมดแสงสมจริงที่สุด รองรับเงาจากไฟฉายและไฟหลอดนีออนแบบเรียลไทม์',
      'Atmosphere: หมอกที่สมจริง มีการเปลี่ยนสีตามความสูงและแสงของดวงอาทิตย์ (Haze & Density)',
      'ColorCorrectionEffect: ปรับความอิ่มของสี (Saturation), คอนทราสต์ (Contrast) และย้อมเฉด (TintColor)',
      'BloomEffect: ทำให้ชิ้นส่วน Neon หรือประกายไฟเกิดเอฟเฟกต์ฟุ้งสว่างเรืองแสง'
    ],
    visualDiagram: `Lighting Service
   |
   +---> Technology = Enum.Technology.Future (แสงและเงาสะท้อนระดับสูง)
   +---> Atmosphere (หมอกบรรยากาศ + สีท้องฟ้า)
   +---> BloomEffect (แสงฟุ้งเรืองรอง)
   +---> ColorCorrectionEffect (ปรับ Contrast + Saturation)
   +---> SunRaysEffect (แสงแดดส่องลอดกิ่งไม้)`,
    codeSnippet: `-- สคริปต์สลับบรรยากาศกลางวัน / กลางคืนแบบ Smooth
local Lighting = game:GetService("Lighting")
local TweenService = game:GetService("TweenService")

local function transitionToNight()
    local tweenInfo = TweenInfo.new(3.0, Enum.EasingStyle.Sine, Enum.EasingDirection.Out)
    
    local nightTween = TweenService:Create(Lighting, tweenInfo, {
        ClockTime = 0, -- เที่ยงคืน
        Brightness = 0.5,
        Ambient = Color3.fromRGB(30, 30, 60),
        OutdoorAmbient = Color3.fromRGB(20, 20, 45)
    })
    
    nightTween:Play()
end`,
    codeExplanation: [
      'ClockTime: ค่าเวลาจำลองในโลกเกม (0 = เที่ยงคืน, 12 = เที่ยงวัน, 14 = บ่ายสอง)',
      'OutdoorAmbient: แสงสะท้อนจากท้องฟ้าภายนอกอาคาร',
      'สามารถใช้ TweenService เปลี่ยนค่าแสงได้อย่างนุ่มนวลเหมือนพระอาทิตย์ค่อยๆ ตกดิน'
    ],
    commonMistakes: [
      'ตั้งค่า Bloom เข้มเกินไปจนแสงจ้าแสบตาผู้เล่น (หน้าจอขาวโพลน)',
      'ใช้ Future Lighting กับแมปขนาดใหญ่มากที่มีหลอดไฟนับพันจุดโดยไม่ตั้งค่า Shadows = false บนหลอดไฟเล็กๆ จนมือถือกระตุก'
    ],
    gameExample: 'The Mimic และ Frontlines ใช้ประโยชน์จาก Future Lighting และหมอก Atmosphere ทำให้เกมหลอนและสมจริงในระดับน่าทึ่ง',
    prebakedDeepDive: {
      analogy: 'เหมือนการจัดไฟในสตูดิโอถ่ายหนัง Lighting คือหลอดไฟสปอตไลต์ Atmosphere คือควันสโมคในฉาก และ ColorCorrection คือการเกรดดิ้งสีฟิล์ม',
      underTheHood: 'Future Lighting ใช้การคำนวณ Shadow Maps ไดนามิกแบบ Clustered Forward Shading แสง PointLight และ SurfaceLight จะฉายเงาตามโครงสร้างวัตถุได้จริง',
      proTips: [
        'ตั้งค่า `Lighting.GlobalShadows = true` เสมอเพื่อให้มีเงาตกกระทบบนพื้น',
        'สำหรับเกมแนวคอร์รัปชันหรือผี ให้เพิ่ม `DepthOfFieldEffect` เล็กน้อยเพื่อเบลอระยะไกล เพิ่มมิติความลึก'
      ]
    }
  },
  {
    id: 'sound-service-3d-audio',
    title: 'SoundService & 3D Positional Audio',
    thaiTitle: 'ระบบเสียงสามมิติและเอฟเฟกต์ SoundGroups',
    category: 'environment_audio',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/sound',
    summary: 'ระบบเสียงของ Roblox รองรับเสียง 3 มิติ (3D Spatial Audio) ที่เบาลงเมื่อเดินห่างออกไป และแยกเสียงซ้าย-ขวาตามทิศทางหูฟัง พร้อม SoundGroups สำหรับทำระบบปรับเสียง Master / Music / SFX ในเมนูตั้งค่า',
    whyItMatters: 'เกมสยองขวัญหรือเกมยิงปืน ผู้เล่นต้องได้ยินเสียงฝีเท้าศัตรูว่ามาจากซ้ายหรือขวา และเกมที่มีคุณภาพต้องให้ผู้เล่นปรับลดเสียงเพลงแต่เปิดเสียงเอฟเฟกต์ได้',
    keyConcepts: [
      '3D Sound vs 2D Sound: เสียงที่วางไว้ใน Part จะกลายเป็น 3D อัตโนมัติ ส่วนเสียงที่วางใน SoundService จะดังทั่วถึงทั้งแมป (2D)',
      'RollOffMode & RollOffMaxDistance: กำหนดระยะที่เสียงจะค่อยๆ เบาลงจนเงียบ',
      'SoundGroup: ตัวจัดกลุ่ม เช่น SFX, Music, Voice เพื่อปรับ Volume รวมในคลิกเดียว',
      'Equalizer / ReverbSoundEffect: เอฟเฟกต์เสียงก้องในถ้ำ หรือเสียงอู้อี้เมื่ออยู่ใต้น้ำ'
    ],
    visualDiagram: `[Sound วางใน SoundService] ---> 2D Sound (ทุกคนได้ยินเท่ากัน เช่น เพลง BGM)
[Sound วางใน Part ใน Workspace] ---> 3D Sound (เดินใกล้=ดัง, เดินไกล=เบา, หมุนหัว=แยกหูซ้ายขวา)`,
    codeSnippet: `-- สคริปต์สร้างเสียงระเบิด 3D ณ ตำแหน่งที่กำหนด
local function playExplosionSound(position: Vector3)
    local soundPart = Instance.new("Part")
    soundPart.Size = Vector3.new(1, 1, 1)
    soundPart.Position = position
    soundPart.Anchored = true
    soundPart.Transparency = 1
    soundPart.CanCollide = false
    soundPart.Parent = workspace

    local sound = Instance.new("Sound")
    sound.SoundId = "rbxassetid://9114223171" -- ตัวอย่าง Sound Asset ID
    sound.Volume = 1.0
    sound.RollOffMaxDistance = 150 -- ได้ยินไกลสุด 150 studs
    sound.RollOffMinDistance = 10
    sound.Parent = soundPart

    sound:Play()
    
    -- ทำลายทิ้งอัตโนมัติเมื่อเสียงเล่นจบ เพื่อประหยัด Memory
    sound.Ended:Connect(function()
        soundPart:Destroy()
    end)
end`,
    codeExplanation: [
      'เมื่อวาง Sound ใน Part ใน Workspace เอนจินจะคำนวณพิกัดหูฟังของผู้เล่น (Listener) เทียบกับพิกัดของ Part แบบเรียลไทม์',
      'RollOffMinDistance: ระยะที่ยังได้ยินเสียงดังสุด 100%',
      'sound.Ended: อีเวนต์ที่รอจนกระทั่งเสียงเล่นเสร็จสิ้นแล้วจึง :Destroy() ทิ้ง'
    ],
    commonMistakes: [
      'วางเสียง Sound ไว้ใน StarterGui ทำให้กลายเป็นเสียง 2D และผู้เล่นคนนั้นได้ยินดังเท่ากันตลอดเวลา',
      'สร้าง Part เสียงขึ้นมาแต่ลืม :Destroy() ทิ้งเมื่อเสียงจบ ทำให้เกิดปัญหา Memory รั่วสะสม'
    ],
    gameExample: 'ใน Doors เสียงเคาะประตูและเสียงมอนสเตอร์ Screech ที่กระซิบข้างหู ใช้ระบบ 3D Audio เพื่อให้ผู้เล่นหันหน้าไปมองได้ทันท่วงที',
    prebakedDeepDive: {
      analogy: 'เหมือนคุณฟังลำโพงงานวัด (2D BGM ดังทั่วถึง) เทียบกับการยืนคุยกับเพื่อนในห้อง ถ้าเพื่อนเดินไปกระซิบข้างหูด้านซ้าย หูซ้ายคุณจะดังกว่าหูด้านขวา (3D Audio)',
      underTheHood: 'Roblox ใช้เทคโนโลยี HRTF (Head-Related Transfer Function) และ FMOD Sound Engine ในการจำลองการสะท้อนของคลื่นเสียงเข้าสู่ใบหูทั้งสองข้าง',
      proTips: [
        'ใช้ SoundService:SetListener() หากต้องการเปลี่ยนตำแหน่งหูฟังจากตัวละครไปยังมุมกล้อง (Camera)',
        'อย่าลืมตรวจสอบลิขสิทธิ์เสียงใน Creator Store ก่อนนำมาใช้ในเกมเชิงพาณิชย์'
      ]
    }
  },
  {
    id: 'collectionservice-tags',
    title: 'CollectionService & Tagging System',
    thaiTitle: 'จัดการวัตถุทั้งแมปอย่างเป็นระเบียบด้วย CollectionService',
    category: 'physics',
    difficulty: 'Intermediate',
    officialUrl: 'https://create.roblox.com/docs/scripting/spatial-queries/collection-service',
    summary: 'วิธีจัดการชิ้นส่วนหรือศัตรูจำนวนมากโดยไม่ต้องก็อปปี้สคริปต์ไปวางไว้ในทุกชิ้นส่วน โดยการ "ติดแท็ก" (เช่น แท็ก "Lava", "Coin", "Door") แล้วใช้สคริปต์หลักเพียงตัวเดียวคอยควบคุมชิ้นส่วนที่มีแท็กนั้นทั้งหมด',
    whyItMatters: 'หากในแมปมีบล็อกลาวา 500 ชิ้น แล้วคุณก๊อปสคริปต์ Touched ไปใส่ 500 อัน ถ้าวันหนึ่งต้องการแก้โค้ด คุณต้องตามแก้ทั้ง 500 ที่! CollectionService แก้ปัญหานี้ให้เหลือสคริปต์เดียวจบ',
    keyConcepts: [
      'CollectionService:GetTagged("TagName"): ดึงรายการชิ้นส่วนทั้งหมดที่มีแท็กนี้',
      'CollectionService:AddTag(instance, "TagName"): ติดแท็กผ่านโค้ด',
      'GetInstanceAddedSignal("TagName"): ตรวจจับเมื่อมีวัตถุติดแท็กชิ้นใหม่ถูกสร้างขึ้นในเกม',
      'Tag Editor Plugin: เครื่องมือใน Studio สำหรับติ๊กแท็กบนชิ้นส่วนในแมปได้อย่างสะดวก'
    ],
    visualDiagram: `[สคริปต์หลัก LavaController เพียงตัวเดียว]
      |
      +---> ควบคุม Part 1 (แท็ก "Lava")
      +---> ควบคุม Part 2 (แท็ก "Lava")
      +---> ควบคุม Part 500 (แท็ก "Lava")
(สร้าง Part ลาวาใหม่เมื่อไหร่ โค้ดจะผูกการทำงานให้อัตโนมัติทันที!)`,
    codeSnippet: `local CollectionService = game:GetService("CollectionService")

local function setupLavaPart(part: BasePart)
    part.Touched:Connect(function(hit)
        local humanoid = hit.Parent:FindFirstChildWhichIsA("Humanoid")
        if humanoid then
            humanoid.Health = 0 -- ตายทันทีที่แตะลาวา
        end
    end)
end

-- 1. ผูกการทำงานกับชิ้นส่วนที่มีแท็กอยู่แล้วในแมป
for _, lavaPart in ipairs(CollectionService:GetTagged("LavaBlock")) do
    if lavaPart:IsA("BasePart") then
        setupLavaPart(lavaPart)
    end
end

-- 2. ดักจับเผื่อมีบล็อกลาวาถูก Clone หรือสร้างขึ้นมาใหม่ระหว่างเล่นเกม
CollectionService:GetInstanceAddedSignal("LavaBlock"):Connect(function(newPart)
    if newPart:IsA("BasePart") then
        setupLavaPart(newPart)
    end
end)`,
    codeExplanation: [
      'GetTagged: คืนค่า Array ของ Instance ทั้งหมดที่มีแท็กตรงกัน',
      'GetInstanceAddedSignal: ทำให้สถาปัตยกรรมเกมรองรับระบบ Dynamic Spawning (เช่น เหรียญเกิดใหม่ หรือมอนสเตอร์เกิดใหม่)',
      'การรวมโค้ดไว้จุดเดียวเรียกว่า Single Source of Truth ช่วยให้เกมสะอาดและดูแลรักษาง่าย'
    ],
    commonMistakes: [
      'พิมพ์ชื่อแท็กผิดตัวพิมพ์เล็ก-ใหญ่ (Case-sensitive) เช่น "Lava" กับ "lava" ถือเป็นคนละแท็กกัน',
      'ลืมดัก `GetInstanceAddedSignal` ทำให้วัตถุที่เกิดใหม่ตอนเล่นเกมไม่ทำงาน'
    ],
    gameExample: 'เกม Tower Defense และ Obby ระดับท็อป ใช้ CollectionService ในการจัดการจุดเกิดมอนสเตอร์ จุดเช็คพอยต์ และเหรียญรางวัลทั้งเกม',
    prebakedDeepDive: {
      analogy: 'เหมือนคุณติดป้ายชื่อ "แผนกจัดส่ง" บนเสื้อพนักงาน ไม่ว่าใครจะเข้ามาทำงานใหม่ ตราบใดที่ใส่เสื้อป้ายนี้ หัวหน้าจะมอบหมายงานจัดส่งให้ทำทันที ไม่ต้องสอนทีละคนตั้งแต่แรก',
      underTheHood: 'CollectionService ทำงานบน C++ Hashtable ภายใน ทำให้การสืบค้น GetTagged รวดเร็วมาก ใช้เวลาไม่ถึงมิลลิวินาทีแม้จะมีวัตถุนับหมื่นชิ้น',
      proTips: [
        'เปิดหน้าต่าง View > Tag Editor ใน Roblox Studio เพื่อเลือกชิ้นส่วนหลายๆ ชิ้นแล้วคลิกติดแท็กได้พร้อมกัน',
        'อย่าลืมใช้ `GetInstanceRemovedSignal` เพื่อเคลียร์ตัวแปรหรืออีเวนต์เมื่อชิ้นส่วนถูกทำลาย'
      ]
    }
  },
  {
    id: 'security-anti-exploit-server',
    title: 'Server-Side Anti-Exploit & Remote Hardening',
    thaiTitle: 'ระบบป้องกันแฮกเกอร์ & รักษาความปลอดภัยของเกม',
    category: 'security_monetization',
    difficulty: 'Advanced',
    officialUrl: 'https://create.roblox.com/docs/scripting/events/remote',
    summary: 'สถาปัตยกรรมป้องกันโปรแกรมโกง (Exploits) ทั้ง Speed Hack, Fly, Noclip, Teleport และ Remote Injection บนหลักการ Server-Authoritative ทุกข้อมูลที่มาจาก Client ต้องผ่านการตรวจสอบ Type, Cooldown Rate-Limit และระยะทางก่อนเสมอ',
    whyItMatters: 'เกมที่มีผู้เล่นพร้อมเพรียงหลักพันคนจะพังทลายทันทีถ้ามีแฮกเกอร์เข้ามาเสกเงิน เสกไอเทม หรือบินสังหารทุกคนในห้อง การเขียนโค้ดที่รัดกุมตั้งแต่แรกช่วยประหยัดเวลาและปกป้องเศรษฐกิจในเกม',
    keyConcepts: [
      'Never Trust The Client: จำลองว่า Client ถูกเจาะ 100% เสมอ',
      'Rate Limiting & Debouncing: ป้องกันการส่งสแปมรีโมตจากสคริปต์แฮกเกอร์',
      'Movement Sanity Check: คำนวณ (Pos2 - Pos1) / dt เพื่อดักจับ Speed Hack และ Teleport',
      'Sanitize Parameters: ตรวจสอบ typeof() และความสมเหตุสมผลของค่าที่ส่งมา'
    ],
    visualDiagram: `[Client Exploit Tool] ---> ยิง FireServer("KillBoss", 999999)
                                   |
                          [Server Remote Listener]
                                   |
                [1. Check Rate Limit (Cooldowm)]
                [2. Check Line of Sight (Raycast)]
                [3. Check True Weapon Range]
                                   v
             [คำนวณดาเมจจริงจาก Server: ปลอดภัย 100%]`,
    codeSnippet: `-- ระบบรับคำสั่งโจมตีที่ผ่านการตรวจสอบความปลอดภัยอย่างรัดกุม
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local attackRemote = ReplicatedStorage.AttackEvent

local ATTACK_COOLDOWN = 0.4
local MAX_REACH = 15 -- ระยะโจมตีสูงสุด 15 studs
local playerLastAttack: { [Player]: number } = {}

attackRemote.OnServerEvent:Connect(function(player: Player, targetCharacter: Model)
    local now = os.clock()
    local lastTime = playerLastAttack[player] or 0
    
    -- 1. ตรวจสอบความถี่ (Rate Limit) ป้องกันโปรแกรมสแปม
    if now - lastTime < ATTACK_COOLDOWN then
        return
    end
    playerLastAttack[player] = now

    -- 2. ตรวจสอบว่าเป้าหมายมีอยู่จริงและไม่ใช่ตัวเอง
    if not targetCharacter or targetCharacter == player.Character then
        return
    end

    local myChar = player.Character
    local myRoot = myChar and myChar:FindFirstChild("HumanoidRootPart")
    local targetRoot = targetCharacter:FindFirstChild("HumanoidRootPart")
    local targetHumanoid = targetCharacter:FindFirstChildOfClass("Humanoid")

    if not (myRoot and targetRoot and targetHumanoid and targetHumanoid.Health > 0) then
        return
    end

    -- 3. ตรวจสอบระยะห่างทางกายภาพบน Server
    local distance = (myRoot.Position - targetRoot.Position).Magnitude
    if distance > MAX_REACH then
        warn("Reach exploit detected from: " .. player.Name)
        return
    end

    -- 4. คำนวณดาเมจคงที่จาก Server เท่านั้น
    local SERVER_CALCULATED_DAMAGE = 25
    targetHumanoid:TakeDamage(SERVER_CALCULATED_DAMAGE)
end)`,
    codeExplanation: [
      'playerLastAttack: เก็บเวลาโจมตีล่าสุดของผู้เล่นแต่ละคนเพื่อป้องกันการยิงสแปม',
      'distance > MAX_REACH: ตรวจสอบระยะห่างจริงเพื่อป้องกันโปร Reach หรือ Teleport',
      'SERVER_CALCULATED_DAMAGE: กำหนดดาเมจไว้บน Server ป้องกันการเสกตัวเลขดาเมจ'
    ],
    commonMistakes: [
      'ยอมรับพารามิเตอร์ดาเมจที่ Client ส่งมาโดยตรง',
      'เขียนสคริปต์ Anti-Cheat ไว้บน LocalScript (แฮกเกอร์สามารถปิดสคริปต์ฝั่ง Client ทิ้งได้)'
    ],
    gameExample: 'เกมระดับ AAA บน Roblox เช่น Deepwoken และ Arsenal ตรวจสอบระยะทางและกระสุนบน Server 100% ทำให้โปรแกรมโกงทำอะไรไม่ได้',
    prebakedDeepDive: {
      analogy: 'เหมือนเคาน์เตอร์ธนาคาร ลูกค้าบอกได้แค่ว่าจะถอนเงินกี่บาท แต่พนักงานต้องนับเงินในสมุดบัญชีจริงและดูบัตรประชาชนก่อนจ่าย ไม่ใช่ให้ลูกค้าเดินเข้าไปหยิบเงินในตู้เซฟเอง',
      underTheHood: 'Client-side memory สามารถถูกแก้ไขได้ด้วย Memory Scanners ทันทีที่คำสั่งข้ามผ่านเครือข่าย Server ต้องทำหน้าที่เป็น Single Source of Truth ตรวจสอบทุกเฟรม',
      proTips: [
        'ห้ามเตะ (Kick) ผู้เล่นทันทีที่จับระยะผิดพลาด เพราะอาจเกิดจากเน็ตแล็ก ให้ใช้วิธีดึงตัวกลับ (Rubberband) ก่อน',
        'บันทึกสถิติผู้เล่นที่ทำสถิติผิดปกติลงใน Admin Webhook เพื่อตรวจสอบภายหลัง'
      ]
    }
  },
  {
    id: 'datastore-session-locking-guide',
    title: 'Session Locking & Anti-Dupe Persistence',
    thaiTitle: 'การป้องกันการปั๊มไอเทม (Anti-Dupe) ด้วย Session Locking',
    category: 'datastores',
    difficulty: 'Advanced',
    officialUrl: 'https://create.roblox.com/docs/cloud-services/datastores',
    summary: 'เทคนิคระดับสตูดิโอในการป้องกันบั๊กปั๊มของ (Dupe Glitch) และข้อมูลสูญหายเมื่อผู้เล่นสลับเซิร์ฟเวอร์แบบรวดเร็ว โดยใช้กลไก Session Lock ผ่าน UpdateAsync เพื่อให้มั่นใจว่ามีเพียง 1 เซิร์ฟเวอร์เท่านั้นที่ถือสิทธิ์เขียนข้อมูล',
    whyItMatters: 'ในเกมแนว RPG หรือเทรดของ หากไม่มี Session Locking แฮกเกอร์สามารถสลับเซิร์ฟเวอร์เพื่อโคลนไอเทมหายากมาขาย ทำลายระบบเศรษฐกิจของเกมในชั่วข้ามคืน',
    keyConcepts: [
      'Session Lock Token: ใช้ JobId ของเซิร์ฟเวอร์เป็นตัวล็อกชั่วคราว',
      'UpdateAsync vs SetAsync: UpdateAsync รับประกันการเขียนแบบ Transaction ปลอดภัยจาก Race Condition',
      'Auto-Saving Interval: เซฟอัตโนมัติทุก 3-5 นาที และเซฟเมื่อ BindToClose',
      'Graceful Release: ปลดล็อกทันทีเมื่อผู้เล่นออกจากเซิร์ฟเวอร์สำเร็จ'
    ],
    visualDiagram: `Server A (ถือกลอน Session Lock) ---> กำลังบันทึกข้อมูลไอเทม
                                   ^
Server B (ผู้เล่นเพิ่งวาร์ปเข้ามา) ---> พยายามโหลด: "ติดล็อกอยู่ กรุณารอสักครู่" (กันปั๊มของ!)`,
    codeSnippet: `-- โครงสร้างตัวอย่างระบบ Session Locking ป้องกันของปั๊ม
local DataStoreService = game:GetService("DataStoreService")
local profileStore = DataStoreService:GetDataStore("PlayerProfiles_v3")

local function lockAndLoadProfile(player: Player)
    local key = "Profile_" .. player.UserId
    local currentJobId = game.JobId

    local success, profile = pcall(function()
        return profileStore:UpdateAsync(key, function(savedData)
            savedData = savedData or {
                Coins = 100,
                Inventory = {},
                ActiveSession = nil,
                LockTime = 0
            }

            local now = os.time()
            -- ตรวจสอบว่ามีเซิร์ฟเวอร์อื่นล็อกอยู่หรือไม่ (หมดอายุใน 10 นาที)
            if savedData.ActiveSession and savedData.ActiveSession ~= currentJobId then
                if now - savedData.LockTime < 600 then
                    -- ยังติดล็อกกับเซิร์ฟเวอร์เดิม! คืนค่า nil เพื่อปฏิเสธ
                    return nil
                end
            end

            -- ทำการล็อกกับเซิร์ฟเวอร์นี้
            savedData.ActiveSession = currentJobId
            savedData.LockTime = now
            return savedData
        end)
    end)

    if not success or not profile then
        player:Kick("กำลังประมวลผลข้อมูลจากเซิร์ฟเวอร์ก่อนหน้า กรุณารอ 30 วินาทีแล้วลองใหม่อีกครั้ง")
        return nil
    end

    return profile
end`,
    codeExplanation: [
      'UpdateAsync: อ่านข้อมูลล่าสุดและแก้ไขแบบ Transaction ป้องกันการเขียนทับซ้อน',
      'ActiveSession: บันทึกรหัสเซิร์ฟเวอร์ปัจจุบัน หากมีเซิร์ฟเวอร์อื่นพยายามเปิดข้อมูลพร้อมกันจะถูกบล็อกทันที',
      'LockTime: เวลาหมดอายุของกลอนป้องกันกรณีเซิร์ฟเวอร์เดิมแครชกะทันหัน'
    ],
    commonMistakes: [
      'ใช้ SetAsync ในการโหลดหรือเซฟ ทำให้เกิด Race Condition ทับซ้อน',
      'ลืมใส่ BindToClose เมื่อเกมต้องปิดปรับปรุงหรือชัตดาวน์'
    ],
    gameExample: 'Pet Simulator X และ Blox Fruits ใช้ระบบ ProfileService ที่มี Session Locking ในตัวเพื่อรักษาความปลอดภัยของสัตว์เลี้ยงมูลค่าหลายหมื่นบาท',
    prebakedDeepDive: {
      analogy: 'เหมือนคุณเข้าห้องน้ำแล้วล็อกกลอนประตู ถ้ามีคนอื่นมาบิดลูกบิด ประตูจะเปิดไม่ออก จนกว่าคนที่อยู่ข้างในจะทำธุระเสร็จแล้วปลดกลอน',
      underTheHood: 'UpdateAsync ของ Roblox DataStore มีกลไก Optimistic Concurrency Control ถ้ามีสเปกสองเครื่องเขียนพร้อมกัน เครื่องที่ช้ากว่าจะถูกสั่งให้รันฟังก์ชัน callback ใหม่อัตโนมัติ',
      proTips: [
        'ในโปรดักชัน แนะนำให้ใช้ไลบรารีชุมชนมาตรฐานอย่าง ProfileService โดย loleris เพราะผ่านการทดสอบในเกมระดับพันล้านวิวมาแล้ว',
        'ควรเก็บ Backup Key แยกต่างหากทุกครั้งที่มีการซื้อสินค้าด้วย Robux'
      ]
    }
  },
  // ============================================================
  // 🌱 FOUNDATION TOPICS — ปูพื้นฐานสำหรับคนเริ่มจาก 0
  // อ้างอิงจาก create.roblox.com/docs (Studio + Coding Fundamentals)
  // ============================================================
  {
    id: 'studio-interface-basics',
    title: 'Roblox Studio Interface & First Steps',
    thaiTitle: 'รู้จักหน้าจอ Studio และก้าวแรกก่อนเขียนโค้ด',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/studio/ui-overview',
    summary: 'ก่อนเขียนโค้ดสักบรรทัด ต้องรู้จักหน้าต่างหลักของ Studio ก่อน ได้แก่ Viewport (โลก 3 มิติ), Explorer (ต้นไม้ของวัตถุทั้งหมด), Properties (ค่าคุณสมบัติ) และ Output (ที่แสดง error) รวมถึงความต่างของโหมด Play กับ Run',
    whyItMatters: 'มือใหม่จำนวนมากงงว่าทำไมโค้ดไม่ทำงาน ทั้งที่จริงแค่กด Run แทน Play หรือหา Output ไม่เจอเลยไม่เห็น error การรู้จักหน้าจอให้คล่องคือรากฐานที่ทำให้ทุกบทเรียนต่อจากนี้ราบรื่น',
    keyConcepts: [
      'Explorer = ต้นไม้ (data model) ของทุกอย่างในเกม บริการหลักคือ Workspace, ServerScriptService, ReplicatedStorage, StarterGui',
      'Properties = ปรับค่าของวัตถุที่เลือก เช่น Size, Color, Anchored โดยไม่ต้องเขียนโค้ด',
      'Output = หน้าต่างแสดงข้อความ print, warning และ error (เปิดจากแท็บ View)',
      'Play (F5) = ทดสอบเป็นตัวละครในเกมจริง ต่างจาก Run (F8) ที่รันโลกเปล่าไม่มีตัวละคร'
    ],
    visualDiagram: `┌───────────────┬──────────────┐
│   VIEWPORT    │  EXPLORER     │  <- ต้นไม้ของวัตถุ
│  (โลก 3 มิติ) │   Workspace   │
│               │   ├ Baseplate │
│               │   ServerScr.. │
├───────────────┼──────────────┤
│    OUTPUT     │  PROPERTIES   │  <- ค่าของวัตถุที่เลือก
│ (error/print) │  Size, Color  │
└───────────────┴──────────────┘`,
    codeSnippet: `-- ลองพิมพ์ลงใน Script ที่อยู่ใน ServerScriptService แล้วกด Play
-- ผลลัพธ์จะโผล่ในหน้าต่าง Output

print("สวัสดี Roblox!")          -- ข้อความปกติ (สีขาว)
warn("นี่คือคำเตือน")             -- คำเตือน (สีเหลือง)

local studioName = "Roblox Studio"
print("กำลังเขียนโค้ดใน " .. studioName)`,
    codeExplanation: [
      'สร้าง Script ได้โดยคลิกขวาที่ ServerScriptService ใน Explorer แล้วเลือก Insert > Script',
      'print() ส่งข้อความไปแสดงใน Output — เป็นเครื่องมือดีบักที่ใช้บ่อยที่สุด',
      'warn() แสดงข้อความสีเหลืองเพื่อเน้นว่าเป็นจุดที่ควรระวัง',
      'ตัวดำเนินการ .. ใช้ต่อสตริง (string concatenation) เข้าด้วยกัน'
    ],
    commonMistakes: [
      'กด Run (F8) แทน Play (F5) ทำให้ไม่มีตัวละครและโค้ดที่พึ่งพาผู้เล่นไม่ทำงาน',
      'ปิดหน้าต่าง Output ไว้เลยมองไม่เห็น error — เปิดกลับมาที่แท็บ View > Output',
      'สร้าง Script ผิดที่ เช่น วางใน ReplicatedStorage ที่ไม่รันอัตโนมัติ แทนที่จะเป็น ServerScriptService'
    ],
    gameExample: 'ก่อนสร้างเกม Obby ทุกครั้ง จะเริ่มจากลาก Part เข้ามาใน Workspace ปรับ Anchored และ Color ใน Properties แล้วเปิด Output ค้างไว้เพื่อดู error ระหว่างทดสอบ',
    prebakedDeepDive: {
      analogy: 'Studio เหมือนโต๊ะทำงานของช่าง: Viewport คือชิ้นงานตรงหน้า, Explorer คือลิ้นชักที่จัดเก็บอะไหล่ทุกชิ้นเป็นหมวดหมู่, Properties คือป้ายกำกับที่บอกขนาด/สีของอะไหล่ชิ้นที่หยิบ, และ Output คือกระดานที่เด้งแจ้งเตือนเมื่อทำอะไรผิด',
      underTheHood: 'ทุกอย่างที่เห็นใน Explorer คือ "Instance" ที่ประกอบกันเป็น Data Model ของเกม เมื่อกด Play, Studio จะจำลองการเชื่อมต่อของผู้เล่น 1 คนเข้ากับ Data Model นี้ ทำให้ StarterGui/StarterPlayer ถูกก็อปมาให้ตัวละครทดลอง',
      proTips: [
        'จัดหน้าต่าง Output ให้อยู่ล่างสุดค้างไว้ตลอด จะช่วยจับ error ได้ทันทีที่เกิด',
        'ใช้ช่องค้นหาใน Explorer พิมพ์ชื่อ Class เช่น "Script" เพื่อกรองหาเฉพาะสคริปต์ทั้งเกม'
      ]
    }
  },
  {
    id: 'luau-variables-datatypes',
    title: 'Variables & Data Types in Luau',
    thaiTitle: 'ตัวแปรและชนิดข้อมูลพื้นฐานของ Luau',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/tutorials/fundamentals/coding-1/coding-fundamentals',
    summary: 'ตัวแปร (variable) คือกล่องเก็บค่าที่ตั้งชื่อได้ Luau มีชนิดข้อมูลพื้นฐานที่ต้องรู้จัก: number (ตัวเลข), string (ข้อความ), boolean (จริง/เท็จ) และ nil (ค่าว่าง)',
    whyItMatters: 'ทุกระบบในเกม ไม่ว่าจะเป็นคะแนน เลือด ชื่อผู้เล่น หรือสถานะเปิด/ปิดประตู ล้วนเก็บอยู่ในตัวแปรทั้งสิ้น เข้าใจตัวแปรและชนิดข้อมูลคือก้าวแรกของการเขียนโปรแกรมทุกภาษา',
    keyConcepts: [
      'ใช้ local เสมอ เช่น local score = 0 เพื่อจำกัดขอบเขตตัวแปร (ไม่ให้เป็น global)',
      'number เก็บได้ทั้งจำนวนเต็มและทศนิยม เช่น 100, 3.5, -20',
      'string เก็บข้อความในเครื่องหมายคำพูด เช่น "PlayerName" ต่อกันด้วย ..',
      'boolean มีแค่ true / false ใช้กับเงื่อนไข ส่วน nil แปลว่า "ยังไม่มีค่า"'
    ],
    visualDiagram: `local coins   = 50        --> number  (ตัวเลข)
local heroName= "Knight"  --> string  (ข้อความ)
local isAlive = true      --> boolean (จริง/เท็จ)
local target  = nil       --> nil     (ว่าง)`,
    codeSnippet: `-- ประกาศตัวแปรพร้อมชนิด (Type Annotation ของ Luau)
local playerCoins: number = 100
local playerName: string = "Steve"
local hasShield: boolean = false

-- แก้ไขค่าตัวแปร
playerCoins = playerCoins + 50   -- ตอนนี้เป็น 150
hasShield = true

-- ต่อสตริงเพื่อแสดงผล
print(playerName .. " มีเหรียญ " .. playerCoins .. " เหรียญ")
-- ผลลัพธ์: Steve มีเหรียญ 150 เหรียญ`,
    codeExplanation: [
      'การใส่ : number, : string หลังชื่อตัวแปรคือ Type Annotation ช่วยให้ Studio เตือนเมื่อใส่ค่าผิดชนิด',
      'playerCoins = playerCoins + 50 คือการอ่านค่าเดิมมาบวกแล้วเก็บกลับ',
      'ตัวเลขจะถูกแปลงเป็นสตริงอัตโนมัติเมื่อใช้ .. ต่อกับข้อความ',
      'boolean มักใช้เป็น "ธง" (flag) บอกสถานะ เช่น hasShield ว่ามีโล่หรือไม่'
    ],
    commonMistakes: [
      'ลืมใส่ local ทำให้ตัวแปรกลายเป็น global กินหน่วยความจำและชนกับสคริปต์อื่น',
      'พยายามเอา number ไปต่อกับ string โดยไม่ใช้ .. (เช่น "score" + 5 จะ error)',
      'สับสนระหว่าง = (กำหนดค่า) กับ == (เปรียบเทียบว่าเท่ากันไหม)'
    ],
    gameExample: 'ระบบร้านค้าจะเก็บ playerCoins เป็น number, ชื่อไอเทมเป็น string และ canAfford เป็น boolean เพื่อเช็คว่าเงินพอซื้อหรือไม่',
    prebakedDeepDive: {
      analogy: 'ตัวแปรเหมือนกล่องที่มีป้ายชื่อติดไว้ คุณเก็บของ (ค่า) ไว้ในกล่อง แล้วเรียกใช้ผ่านชื่อบนป้าย ส่วนชนิดข้อมูลคือ "ประเภทของกล่อง" — กล่องตัวเลข กล่องข้อความ กล่องจริง/เท็จ',
      underTheHood: 'Luau เป็นภาษา dynamically typed แต่รองรับ gradual typing เมื่อคุณใส่ : number Studio จะตรวจสอบชนิดตอนเขียน (static analysis) ช่วยจับบั๊กก่อนรันจริง แต่ตอนรันตัวแปรยังยืดหยุ่นเปลี่ยนชนิดได้',
      proTips: [
        'ตั้งชื่อตัวแปรให้สื่อความหมาย เช่น maxHealth แทน mh เพื่อให้อ่านง่ายภายหลัง',
        'เปิด --!strict บรรทัดแรกของสคริปต์เพื่อบังคับตรวจชนิดข้อมูลอย่างเข้มงวด'
      ]
    }
  },
  {
    id: 'luau-conditionals',
    title: 'Conditionals: if / elseif / else',
    thaiTitle: 'เงื่อนไข if แยกทางการทำงานของโค้ด',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/tutorials/fundamentals/coding-3/landing',
    summary: 'เงื่อนไขคือรูปแบบ "ถ้าเกิดสิ่งนี้ ให้ทำสิ่งนั้น" ใช้ if / elseif / else ร่วมกับตัวเปรียบเทียบ (==, ~=, <, >) และตัวเชื่อม (and, or, not) เพื่อให้เกมตัดสินใจได้',
    whyItMatters: 'เกมทุกเกมต้องตัดสินใจ: เลือดถึง 0 ไหม? เงินพอซื้อหรือเปล่า? ผู้เล่นถึงเส้นชัยหรือยัง? เงื่อนไขคือสมองของเกมที่ทำให้มันตอบสนองต่างกันตามสถานการณ์',
    keyConcepts: [
      'if เงื่อนไข then ... end คือโครงสร้างพื้นฐาน',
      'elseif ใช้เพิ่มทางเลือก และ else ใช้กรณีที่ไม่เข้าเงื่อนไขใดเลย',
      'ตัวเปรียบเทียบ: == (เท่ากับ), ~= (ไม่เท่ากับ), <, >, <=, >=',
      'ตัวเชื่อมตรรกะ: and (และ), or (หรือ), not (นิเสธ)'
    ],
    visualDiagram: `           เลือดผู้เล่น?
                 |
      +----------+----------+
   <= 0 ?    <= 30 ?     ปกติ
      |          |          |
   "ตายแล้ว"  "เลือดต่ำ!"  "สบายดี"`,
    codeSnippet: `local health = 25
local coins = 100
local itemPrice = 80

-- ตรวจสถานะเลือด
if health <= 0 then
    print("ผู้เล่นตายแล้ว")
elseif health <= 30 then
    print("ระวัง! เลือดเหลือน้อย")
else
    print("สุขภาพยังดีอยู่")
end

-- ใช้ and ตรวจหลายเงื่อนไขพร้อมกัน
if coins >= itemPrice and health > 0 then
    print("ซื้อไอเทมได้!")
end`,
    codeExplanation: [
      'health <= 0 ถูกเช็คก่อน ถ้าจริงจะทำงานในบล็อกนี้แล้วข้าม elseif/else ทั้งหมด',
      'elseif ทำงานเฉพาะเมื่อเงื่อนไข if ด้านบนเป็นเท็จ',
      'else คือ "ทางเลือกสุดท้าย" เมื่อไม่มีเงื่อนไขใดตรงเลย',
      'coins >= itemPrice and health > 0 ต้องจริงทั้งสองฝั่ง and จึงจะเข้าเงื่อนไข'
    ],
    commonMistakes: [
      'ใช้ = แทน == ในการเปรียบเทียบ (Luau จะฟ้อง error ทันที)',
      'ลืมปิดด้วย end ทำให้สคริปต์ทั้งไฟล์พัง',
      'เรียงเงื่อนไขผิดลำดับ เช่น เช็ค <= 30 ก่อน <= 0 ทำให้บล็อกตายไม่ทำงาน'
    ],
    gameExample: 'ประตูวิเศษที่เปิดเฉพาะผู้เล่นเลเวลถึงเกณฑ์: if player.Level.Value >= 10 then openDoor() else showMessage("ต้องเลเวล 10 ก่อน") end',
    prebakedDeepDive: {
      analogy: 'เงื่อนไขเหมือนป้อมยามที่ถามคำถามก่อนปล่อยผ่าน "มีบัตรผ่านไหม?" ถ้ามี (true) ให้เข้า ถ้าไม่มี (false) ให้ไปทางอื่น and คือยามที่ถามหลายคำถามและต้องผ่านทุกข้อ',
      underTheHood: 'ใน Luau ทุกค่าที่ไม่ใช่ false และ nil ถือเป็น "truthy" (จริง) แม้แต่เลข 0 และสตริงว่าง "" ก็ถือว่าจริง ต่างจากบางภาษา จุดนี้ทำให้มือใหม่พลาดบ่อยเวลาเช็คค่าว่าง',
      proTips: [
        'ใช้ guard clause: เช็คกรณีที่ควรหยุดก่อนด้วย if not valid then return end เพื่อลดการซ้อน if หลายชั้น',
        'ระวังการเช็ค nil: ใช้ if value ~= nil then แทนการพึ่ง truthy เมื่อค่าอาจเป็น 0 หรือ false'
      ]
    }
  },
  {
    id: 'luau-loops',
    title: 'Loops: for & while',
    thaiTitle: 'ลูป for และ while ทำงานซ้ำอัตโนมัติ',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/tutorials/fundamentals/coding-4/landing',
    summary: 'ลูปคือการสั่งให้โค้ดทำงานซ้ำ for loop ใช้เมื่อรู้จำนวนรอบที่แน่นอน ส่วน while loop ใช้เมื่อต้องการทำซ้ำจนกว่าเงื่อนไขจะเป็นเท็จ',
    whyItMatters: 'ลูปช่วยลดโค้ดซ้ำมหาศาล เช่น สร้างเหรียญ 100 อัน, ไล่เช็คผู้เล่นทุกคนในห้อง, หรือทำไฟกะพริบตลอดเวลา หากไม่มีลูปคุณต้องก็อปโค้ดเดิมนับร้อยครั้ง',
    keyConcepts: [
      'for i = 1, 10 do ... end ทำงาน 10 รอบ โดย i ไล่จาก 1 ถึง 10',
      'while เงื่อนไข do ... end ทำซ้ำตราบใดที่เงื่อนไขยังจริง',
      'ใช้ task.wait() ภายในลูปเสมอเพื่อไม่ให้เกมค้าง (freeze)',
      'break ใช้ออกจากลูปทันทีเมื่อต้องการหยุดกลางคัน'
    ],
    visualDiagram: `for i = 1, 3 do        while isRunning do
  print(i)               updateGame()
end                      task.wait(1)
                       end
รอบ: 1 -> 2 -> 3       ทำซ้ำจนกว่า isRunning = false`,
    codeSnippet: `-- for loop: สร้างเหรียญ 5 อันเรียงกัน
for i = 1, 5 do
    local coin = Instance.new("Part")
    coin.Shape = Enum.PartType.Cylinder
    coin.Position = Vector3.new(i * 4, 5, 0)  -- เว้นระยะทีละ 4
    coin.Parent = workspace
end

-- while loop: ไฟกะพริบตลอดเวลา
local light = workspace:WaitForChild("Lamp")
while true do
    light.BrickColor = BrickColor.new("Bright red")
    task.wait(0.5)
    light.BrickColor = BrickColor.new("Institutional white")
    task.wait(0.5)
end`,
    codeExplanation: [
      'for i = 1, 5 do จะวน 5 รอบ โดย i เปลี่ยนค่าเป็น 1,2,3,4,5 ตามลำดับ',
      'i * 4 ใช้ค่า i คำนวณตำแหน่ง ทำให้เหรียญแต่ละอันเว้นระยะเท่ากัน',
      'while true do คือลูปไม่รู้จบ (infinite loop) เหมาะกับสิ่งที่ทำตลอดเกม',
      'task.wait(0.5) หยุด 0.5 วินาทีในแต่ละรอบ ป้องกันเกมค้างและคุมจังหวะกะพริบ'
    ],
    commonMistakes: [
      'เขียน while true do โดยลืมใส่ task.wait() ข้างใน ทำให้เกมค้างทันที (crash)',
      'ยังใช้ wait() แบบเก่า ปัจจุบันแนะนำ task.wait() ที่แม่นยำกว่า',
      'เข้าใจผิดว่าลูป for จะทำงานทีละรอบแบบเห็นภาพ ทั้งที่จริงจบทั้งลูปในเสี้ยววินาที (ถ้าไม่มี wait)'
    ],
    gameExample: 'ระบบสร้างด่านอัตโนมัติใช้ for loop วางแพลตฟอร์ม 20 อันเรียงเป็นทางเดิน ส่วนระบบกลางวัน-กลางคืนใช้ while loop ค่อยๆ เปลี่ยนค่าแสงตลอดเวลา',
    prebakedDeepDive: {
      analogy: 'for loop เหมือนบอกลูกน้อง "ตอกตะปู 10 ครั้ง" (รู้จำนวนแน่นอน) ส่วน while loop เหมือนบอกว่า "คนน้ำซุปไปเรื่อยๆ จนกว่าจะเดือด" (ทำจนเงื่อนไขเปลี่ยน)',
      underTheHood: 'โค้ดใน Luau รันบน thread เดียวเป็นหลัก ถ้าลูปทำงานไม่หยุด (ไม่มี wait) มันจะยึด thread ไว้ไม่ปล่อยให้เกมวาดเฟรมถัดไป ผลคือเกมค้าง task.wait() คือการ "ยอมปล่อย" ให้เอนจินทำงานอื่นก่อนวนรอบต่อไป',
      proTips: [
        'for loop มีพารามิเตอร์ที่ 3 เป็น step เช่น for i = 10, 1, -1 do เพื่อนับถอยหลัง',
        'ถ้าต้องวนวัตถุใน table ให้ใช้ for _, item in ipairs(list) do แทนการนับ index เอง'
      ]
    }
  },
  {
    id: 'luau-tables-arrays-dictionaries',
    title: 'Tables: Arrays & Dictionaries',
    thaiTitle: 'ตาราง (Table) เก็บข้อมูลเป็นชุด: Array และ Dictionary',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/tutorials/fundamentals/coding-5/loops-and-arrays',
    summary: 'Table คือโครงสร้างข้อมูลอเนกประสงค์ของ Luau ใช้เก็บหลายค่าในตัวแปรเดียว แบ่งเป็น Array (เรียงตามลำดับเลข) และ Dictionary (จับคู่ key กับ value)',
    whyItMatters: 'ข้อมูลในเกมมักมาเป็นชุด เช่น รายการไอเทมในกระเป๋า, สถิติของผู้เล่นหลายคน, หรือรายการด่านทั้งหมด Table คือเครื่องมือเดียวที่จัดการข้อมูลกลุ่มเหล่านี้ได้',
    keyConcepts: [
      'Array: เก็บเรียงตามลำดับ เข้าถึงด้วยเลข index เริ่มที่ 1 เช่น items[1]',
      'Dictionary: จับคู่ key -> value เช่น stats["health"] = 100',
      'ใช้ ipairs() วน Array และ pairs() วน Dictionary',
      'table.insert(list, value) เพิ่มสมาชิก, #list นับจำนวนสมาชิกใน Array'
    ],
    visualDiagram: `-- ARRAY (เรียงด้วยเลข)      -- DICTIONARY (จับคู่)
items = {"ดาบ","โล่","ยา"}   player = {
items[1] = "ดาบ"               name = "Alex",
items[2] = "โล่"               level = 5,
items[3] = "ยา"                gold = 250
                             }`,
    codeSnippet: `-- Array: รายการไอเทมในกระเป๋า
local inventory = {"Sword", "Shield", "Potion"}
table.insert(inventory, "Bow")        -- เพิ่มเข้าไป
print("มีไอเทมทั้งหมด " .. #inventory .. " ชิ้น")  -- 4 ชิ้น

for index, itemName in ipairs(inventory) do
    print(index .. ": " .. itemName)
end

-- Dictionary: ข้อมูลผู้เล่น 1 คน
local player = {
    name = "Alex",
    level = 5,
    gold = 250
}
player.gold = player.gold + 100       -- อัปเดตค่า
print(player.name .. " มีเลเวล " .. player.level)`,
    codeExplanation: [
      'inventory = {...} สร้าง Array โดยสมาชิกตัวแรกอยู่ที่ index 1 (ไม่ใช่ 0 เหมือนภาษาอื่น)',
      '#inventory คืนจำนวนสมาชิกใน Array (ใช้ได้กับ Array เท่านั้น)',
      'ipairs() วนตามลำดับ index ให้ทั้งเลขลำดับและค่าในแต่ละรอบ',
      'player.gold กับ player["gold"] คือการเข้าถึงค่าเดียวกันใน Dictionary'
    ],
    commonMistakes: [
      'เข้าใจผิดว่า Array เริ่มที่ index 0 — ใน Luau เริ่มที่ 1 เสมอ',
      'ใช้ #dictionary นับสมาชิก Dictionary (ได้ผลไม่ถูกต้อง ต้องใช้ pairs() วนนับเอง)',
      'สับสน ipairs (สำหรับ Array) กับ pairs (สำหรับ Dictionary/ทุกชนิด key)'
    ],
    gameExample: 'ระบบกระเป๋าเก็บของใช้ Array เก็บรายการไอเทม ส่วนข้อมูลผู้เล่น (ชื่อ, เลเวล, เงิน, ตำแหน่งเซฟ) ใช้ Dictionary แล้วนำ Dictionary ทั้งก้อนไปเซฟลง DataStore',
    prebakedDeepDive: {
      analogy: 'Array เหมือนตู้ล็อกเกอร์ที่มีเลขกำกับ 1, 2, 3 หยิบของด้วยหมายเลข ส่วน Dictionary เหมือนสมุดโทรศัพท์ที่ค้นด้วยชื่อ (key) แล้วได้เบอร์ (value)',
      underTheHood: 'ในความจริง Luau มี table เพียงชนิดเดียว! Array และ Dictionary เป็นเพียงวิธีใช้ table ต่างกัน Array คือ table ที่ key เป็นเลข 1,2,3 เรียงกัน เมื่อ key ไม่ต่อเนื่อง (มีช่องว่าง) # อาจให้ผลไม่แน่นอน',
      proTips: [
        'เก็บข้อมูลที่อัปเดตพร้อมกันไว้ใน Dictionary ก้อนเดียว จะเซฟ/โหลดลง DataStore ได้ทีเดียว',
        'ใช้ table.remove(list, index) เพื่อลบสมาชิกและเลื่อน index ที่เหลือให้ต่อเนื่อง'
      ]
    }
  },
  {
    id: 'instances-hierarchy-referencing',
    title: 'Instances & the Game Hierarchy',
    thaiTitle: 'วัตถุ (Instance) และการอ้างอิงลำดับชั้นในเกม',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/studio/explorer',
    summary: 'ทุกสิ่งในเกม Roblox คือ Instance ที่เรียงเป็นต้นไม้แบบ parent-child เรียนรู้การสร้าง (Instance.new), อ้างอิง (FindFirstChild/WaitForChild), คัดลอก (Clone) และลบ (Destroy) วัตถุด้วยโค้ด',
    whyItMatters: 'การเขียนเกมคือการจัดการ Instance ตลอดเวลา ถ้าไม่เข้าใจว่าวัตถุอยู่ตรงไหนของต้นไม้ และต้องตั้ง Parent อย่างไร โค้ดจะหาวัตถุไม่เจอหรือสร้างของที่มองไม่เห็น',
    keyConcepts: [
      'Instance.new("Part") สร้างวัตถุในหน่วยความจำ แต่จะยังไม่ปรากฏจนกว่าจะตั้ง .Parent',
      '.Parent กำหนดว่าวัตถุอยู่ใต้ใครในต้นไม้ เช่น part.Parent = workspace',
      ':FindFirstChild("ชื่อ") หาลูกทันที คืน nil ถ้าไม่เจอ / :WaitForChild("ชื่อ") รอจนกว่าจะมี',
      ':Clone() คัดลอกวัตถุ, :Destroy() ลบทิ้งถาวรและคืนหน่วยความจำ'
    ],
    visualDiagram: `game (ราก)
 ├─ Workspace
 │   ├─ Baseplate  (Part)
 │   └─ Coin       (Part)  <- part.Parent = workspace
 ├─ ReplicatedStorage
 │   └─ CoinTemplate  <- ต้นแบบไว้ :Clone()
 └─ ServerScriptService
     └─ MainScript`,
    codeSnippet: `-- สร้าง Part ใหม่แล้ววางในโลก
local coin = Instance.new("Part")
coin.Name = "GoldCoin"
coin.Size = Vector3.new(2, 0.5, 2)
coin.Position = Vector3.new(0, 10, 0)
coin.Anchored = true
coin.Parent = workspace        -- <<< สำคัญ! ไม่ตั้ง Parent = มองไม่เห็น

-- อ้างอิงวัตถุที่อาจยังโหลดไม่เสร็จ
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local template = ReplicatedStorage:WaitForChild("CoinTemplate")

-- คัดลอกต้นแบบไปวาง 3 อัน
for i = 1, 3 do
    local newCoin = template:Clone()
    newCoin.Position = Vector3.new(i * 5, 10, 0)
    newCoin.Parent = workspace
end`,
    codeExplanation: [
      'Instance.new("Part") สร้างวัตถุแต่ยัง "ลอย" อยู่นอกต้นไม้จนกว่าจะตั้ง Parent',
      'coin.Parent = workspace คือบรรทัดที่ทำให้เห็นวัตถุในเกมจริง',
      'WaitForChild ป้องกัน error เมื่อวัตถุยังจำลอง (replicate) มาไม่ถึง — ต่างจาก FindFirstChild ที่คืน nil ทันที',
      ':Clone() สร้างสำเนาที่เหมือนต้นฉบับทุกประการ นิยมใช้ทำวัตถุจำนวนมากจากต้นแบบเดียว'
    ],
    commonMistakes: [
      'ลืมตั้ง .Parent หลัง Instance.new ทำให้วัตถุถูกสร้างแต่มองไม่เห็นในเกม (ข้อผิดพลาดยอดฮิต)',
      'ใช้ FindFirstChild กับวัตถุที่ยังโหลดไม่เสร็จ ทำให้ได้ nil แล้วเกิด "attempt to index nil"',
      'ตั้ง Parent ก่อนตั้งค่า property อื่น อาจทำให้เกมประมวลผลการเปลี่ยนแปลงหลายครั้งโดยไม่จำเป็น'
    ],
    gameExample: 'ระบบเก็บเหรียญเก็บ CoinTemplate ไว้ใน ReplicatedStorage แล้วใช้ :Clone() กระจายเหรียญทั่วแมพ เมื่อผู้เล่นเก็บก็เรียก coin:Destroy() ลบทิ้ง',
    prebakedDeepDive: {
      analogy: 'Data Model เหมือนแฟ้มเอกสารแบบต้นไม้: game คือตู้เอกสารใหญ่, Workspace คือลิ้นชักของฉากในโลก, การตั้ง Parent เหมือนการหย่อนกระดาษเข้าลิ้นชัก ถ้าถือกระดาษไว้เฉยๆ (ไม่หย่อนเข้าลิ้นชัก) ก็ไม่มีใครเห็น',
      underTheHood: 'เมื่อคุณตั้ง Parent ให้วัตถุใน Workspace ฝั่ง Server เอนจินจะ replicate (จำลอง) วัตถุนั้นไปยัง Client ทุกคนโดยอัตโนมัติ นี่คือเหตุผลที่บางครั้ง Client ต้อง WaitForChild เพราะวัตถุยังเดินทางมาไม่ถึง',
      proTips: [
        'ตั้งค่า property ทั้งหมดให้เสร็จ "ก่อน" ตั้ง Parent เป็นบรรทัดสุดท้าย เพื่อประสิทธิภาพและลดการกระพริบ',
        'ใช้ :Destroy() แทนการตั้ง Parent = nil เพราะ Destroy จะตัดการเชื่อมต่อ event และคืนหน่วยความจำให้สมบูรณ์'
      ]
    }
  },
  {
    id: 'events-services-connections',
    title: 'Events, Services & :Connect()',
    thaiTitle: 'เหตุการณ์ (Event) บริการ (Service) และการเชื่อม :Connect()',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/tutorials/fundamentals/coding-2/functions-and-events',
    summary: 'เกม Roblox ทำงานแบบ event-driven คือ "รอให้เหตุการณ์เกิดแล้วค่อยตอบสนอง" เรียนรู้การเข้าถึงบริการด้วย game:GetService() และการเชื่อมฟังก์ชันเข้ากับ event ด้วย :Connect()',
    whyItMatters: 'โค้ดเกมส่วนใหญ่ไม่ได้รันจากบนลงล่างครั้งเดียว แต่ "รอ" เหตุการณ์เช่น ผู้เล่นเข้าเกม, มีอะไรมาชน, หรือกดปุ่ม แล้วจึงทำงาน เข้าใจ event คือเข้าใจหัวใจการเขียนเกม',
    keyConcepts: [
      'Service คือระบบสำเร็จรูปของเอนจิน เข้าถึงด้วย game:GetService("Players")',
      'Event คือสัญญาณที่เกิดเมื่อมีบางอย่างเกิดขึ้น เช่น .Touched, .PlayerAdded, .Died',
      ':Connect(ฟังก์ชัน) คือการ "สมัครรับ" event เพื่อสั่งให้ฟังก์ชันทำงานทุกครั้งที่ event เกิด',
      'ฟังก์ชันที่เชื่อมกับ event มักรับพารามิเตอร์ เช่น .Touched ส่งวัตถุที่มาชนมาให้'
    ],
    visualDiagram: `  [Event เกิดขึ้น]          [ฟังก์ชันตอบสนอง]
  part.Touched     --:Connect-->  onTouch(hit)
  Players.PlayerAdded --------->  onJoin(player)
  humanoid.Died    ----------->  onDeath()
     (สัญญาณ)                      (การกระทำ)`,
    codeSnippet: `local Players = game:GetService("Players")

-- Event 1: ทำงานทุกครั้งที่มีผู้เล่นเข้าเกม
local function onPlayerJoin(player)
    print(player.Name .. " เข้าร่วมเกมแล้ว!")
end
Players.PlayerAdded:Connect(onPlayerJoin)

-- Event 2: ทำงานทุกครั้งที่มีอะไรมาชน Part
local trap = workspace:WaitForChild("TrapPart")
local function onTouch(otherPart)
    local humanoid = otherPart.Parent:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.Health = 0    -- ตัวละครที่แตะจะตาย
    end
end
trap.Touched:Connect(onTouch)`,
    codeExplanation: [
      'game:GetService("Players") ดึงบริการ Players ที่จัดการผู้เล่นทุกคนในเกม',
      'PlayerAdded:Connect(onPlayerJoin) สั่งให้ onPlayerJoin ทำงานทุกครั้งที่มีคนเข้า โดยส่ง player มาให้',
      'trap.Touched:Connect(onTouch) เชื่อม event การชน โดย otherPart คือสิ่งที่มาแตะ',
      'ต้องเช็ค FindFirstChild("Humanoid") ก่อน เพราะสิ่งที่มาชนอาจไม่ใช่ตัวละคร (เช่น กำแพง)'
    ],
    commonMistakes: [
      'ใส่วงเล็บผิด: เขียน :Connect(onTouch()) แทน :Connect(onTouch) ทำให้เรียกฟังก์ชันทันทีแทนการเชื่อม',
      'ลืมว่า .Touched ยิงบ่อยมาก (ทุกครั้งที่สัมผัส) ควรมี debounce กันทำงานรัว',
      'พยายามใช้ event ของ Client (เช่น input) ใน Server Script ที่เข้าไม่ถึง'
    ],
    gameExample: 'ระบบให้รางวัลเข้าเกมใช้ PlayerAdded, กับดักลาวาใช้ .Touched, และระบบนับคะแนนเมื่อมอนสเตอร์ตายใช้ humanoid.Died ทั้งหมดเชื่อมด้วย :Connect()',
    prebakedDeepDive: {
      analogy: 'Event เหมือนกริ่งประตู เมื่อมีคนกด (event เกิด) กริ่งจะดังและคนในบ้านตอบสนอง :Connect() คือการติดตั้งว่า "พอกริ่งดัง ให้ทำอะไร" ส่วน Service เหมือนแผนกต่างๆ ในบริษัทที่เรียกใช้บริการได้',
      underTheHood: 'เมื่อคุณ :Connect() เอนจินจะเก็บ reference ของฟังก์ชันไว้ในรายชื่อผู้รอฟัง (listeners) ของ event นั้น เมื่อ event ยิง เอนจินจะวนเรียกทุกฟังก์ชันที่สมัครไว้ การ :Connect() คืน RBXScriptConnection ที่เรียก :Disconnect() ยกเลิกได้',
      proTips: [
        'เก็บ connection ไว้ในตัวแปรถ้าต้องยกเลิกภายหลัง: local conn = event:Connect(fn) แล้ว conn:Disconnect()',
        'ใช้ debounce กับ .Touched: ตั้ง flag กันไม่ให้ทำงานซ้ำถี่เกินในช่วงเวลาสั้นๆ'
      ]
    }
  },
  {
    id: 'humanoid-character-model',
    title: 'Humanoid & the Character Model',
    thaiTitle: 'Humanoid และโครงสร้างตัวละครผู้เล่น',
    category: 'characters',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/characters',
    summary: 'ตัวละครผู้เล่นคือ Model ที่มี Humanoid เป็นหัวใจควบคุมเลือด ความเร็ว การกระโดด และการตาย เรียนรู้การเข้าถึงและควบคุม Humanoid เพื่อสร้างกลไกการเล่น',
    whyItMatters: 'ระบบต่อสู้ กับดัก บัฟความเร็ว การรักษา หรือการนับ kill ล้วนต้องยุ่งกับ Humanoid ทั้งหมด เป็นวัตถุที่คุณจะเรียกใช้บ่อยที่สุดในเกมที่มีตัวละคร',
    keyConcepts: [
      'ตัวละคร = Model ที่มี Humanoid, HumanoidRootPart และส่วนต่างๆ ของร่างกาย',
      'Humanoid.Health / Humanoid.MaxHealth ควบคุมเลือด, :TakeDamage() หักเลือด (เคารพ ForceField)',
      'Humanoid.WalkSpeed (ค่าเริ่มต้น 16) และ Humanoid.JumpPower คุมการเคลื่อนที่',
      'event สำคัญ: CharacterAdded (ตัวละคร spawn), Humanoid.Died (ตัวละครตาย)'
    ],
    visualDiagram: `Player (ใน Players service)
  └─ Character (Model ใน Workspace)
       ├─ Humanoid        <- ควบคุม Health, WalkSpeed
       ├─ HumanoidRootPart <- จุดอ้างอิงตำแหน่ง
       ├─ Head
       └─ Left/Right Arm, Leg ...`,
    codeSnippet: `local Players = game:GetService("Players")

local function onCharacterAdded(character)
    local humanoid = character:WaitForChild("Humanoid")

    -- เพิ่มความเร็วให้ผู้เล่น
    humanoid.WalkSpeed = 24

    -- ทำงานเมื่อตัวละครตาย
    humanoid.Died:Connect(function()
        print(character.Name .. " ตายแล้ว")
    end)
end

local function onPlayerAdded(player)
    -- ผู้เล่นอาจ spawn หลายครั้ง จึงเชื่อม CharacterAdded
    player.CharacterAdded:Connect(onCharacterAdded)
end

Players.PlayerAdded:Connect(onPlayerAdded)`,
    codeExplanation: [
      'character:WaitForChild("Humanoid") รอ Humanoid ให้พร้อมก่อนใช้งาน (ตัวละครประกอบร่างเป็นขั้นตอน)',
      'humanoid.WalkSpeed = 24 เพิ่มความเร็วเดินจากค่าเริ่มต้น 16',
      'humanoid.Died:Connect(...) ทำงานทุกครั้งที่เลือดถึง 0',
      'player.CharacterAdded ยิงทุกครั้งที่ผู้เล่น spawn ใหม่ (รวมถึงหลังตายแล้วเกิดใหม่)'
    ],
    commonMistakes: [
      'เข้าถึง Humanoid ทันทีโดยไม่ WaitForChild ทำให้ได้ nil เพราะร่างกายยังประกอบไม่เสร็จ',
      'เชื่อม CharacterAdded แค่ครั้งเดียวตอนเข้าเกม ทำให้บัฟหายหลังผู้เล่นตายและเกิดใหม่',
      'ใช้ Health = Health - 50 โดยตรงแทน :TakeDamage() ทำให้ทะลุการป้องกัน ForceField'
    ],
    gameExample: 'เกม RPG ตั้ง WalkSpeed ตามคลาสตัวละคร, ใช้ humanoid:TakeDamage() เมื่อโดนดาบ, และเชื่อม Humanoid.Died เพื่อบวกคะแนนให้ผู้ฆ่า',
    prebakedDeepDive: {
      analogy: 'Humanoid เหมือน "แผงควบคุม" ที่ติดอยู่ในหุ่นยนต์ (ตัวละคร) ปรับปุ่มความเร็ว ปุ่มพลังกระโดด และมีมาตรวัดเลือด เมื่อเลือดหมดหุ่นก็ล้มลง',
      underTheHood: 'ตัวละครถูกประกอบจากหลายส่วนแบบไม่พร้อมกัน (asynchronous) ทำให้ต้อง WaitForChild เสมอ Humanoid เป็นคลาสพิเศษที่จัดการฟิสิกส์การเดิน การปีน และสถานะต่างๆ (HumanoidStateType) ให้อัตโนมัติ',
      proTips: [
        'ปรับค่าเริ่มต้นของตัวละครทุกคนได้ที่ StarterPlayer > StarterCharacter หรือผ่าน Humanoid ตอน CharacterAdded',
        'ใช้ humanoid.HealthChanged:Connect() เพื่ออัปเดตแถบเลือดบน UI แบบเรียลไทม์'
      ]
    }
  },
  {
    id: 'leaderstats-scoring-system',
    title: 'Leaderstats & Scoring Systems',
    thaiTitle: 'ระบบคะแนนและกระดานผู้นำด้วย leaderstats',
    category: 'characters',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/players/leaderboards',
    summary: 'Roblox มีระบบกระดานคะแนนในตัว เพียงสร้าง Folder ชื่อ "leaderstats" ใส่ค่า (เช่น IntValue) แล้ว parent เข้ากับ player ค่านั้นจะโชว์บนกระดานมุมขวาบนอัตโนมัติ',
    whyItMatters: 'เกือบทุกเกมมีคะแนน เงิน หรือแต้ม การใช้ leaderstats คือวิธีที่ง่ายและเป็นมาตรฐานที่สุดในการแสดงและจัดเก็บสถิติผู้เล่น อีกทั้งเป็นค่าที่นำไปเซฟลง DataStore ได้ตรงๆ',
    keyConcepts: [
      'ต้องตั้งชื่อ Folder ว่า "leaderstats" (ตัวพิมพ์เล็กทั้งหมด) เท่านั้น มิฉะนั้นจะไม่ขึ้นกระดาน',
      'ใช้ value object: IntValue (จำนวนเต็ม), NumberValue (ทศนิยม), StringValue (ข้อความ)',
      'parent Folder เข้ากับ player และ parent value เข้ากับ Folder',
      'สร้างใน event PlayerAdded บน Server Script ใน ServerScriptService'
    ],
    visualDiagram: `Player
  └─ leaderstats (Folder)   <- ชื่อต้องเป็น leaderstats เป๊ะ
       ├─ Gold  (IntValue = 0)   --> โชว์บนกระดาน
       └─ Wins  (IntValue = 0)   --> โชว์บนกระดาน`,
    codeSnippet: `local Players = game:GetService("Players")

local function onPlayerAdded(player)
    -- 1. สร้างโฟลเดอร์ leaderstats
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- 2. สร้างค่าเงิน
    local gold = Instance.new("IntValue")
    gold.Name = "Gold"
    gold.Value = 0
    gold.Parent = leaderstats
end

Players.PlayerAdded:Connect(onPlayerAdded)

-- เพิ่มเงินภายหลัง (เช่น เมื่อเก็บเหรียญ):
-- player.leaderstats.Gold.Value += 10`,
    codeExplanation: [
      'ชื่อ "leaderstats" ต้องเป๊ะ Roblox จะตรวจหาชื่อนี้เพื่อสร้างกระดานให้อัตโนมัติ',
      'leaderstats.Parent = player คือการผูกโฟลเดอร์กับผู้เล่นคนนั้น',
      'IntValue คือกล่องเก็บจำนวนเต็ม แก้ค่าผ่าน .Value',
      'เมื่อ value ถูก parent เข้า leaderstats ชื่อและค่าจะปรากฏบนกระดานทันที'
    ],
    commonMistakes: [
      'ตั้งชื่อผิด เช่น "LeaderStats" หรือ "leaderStats" ทำให้กระดานไม่ขึ้นเลย',
      'แก้ค่าโดยตรงที่ IntValue แทนที่จะแก้ที่ .Value (เช่น gold = 10 แทน gold.Value = 10)',
      'สร้าง leaderstats บน Client (LocalScript) ทำให้ผู้เล่นอื่นไม่เห็นและเซฟไม่ได้'
    ],
    gameExample: 'เกม Simulator สร้าง leaderstats ที่มี Coins และ Rebirths เมื่อผู้เล่นคลิกเก็บของ Server จะเพิ่ม Coins.Value และเมื่อออกเกมก็เซฟค่าเหล่านี้ลง DataStore',
    prebakedDeepDive: {
      analogy: 'leaderstats เหมือนป้ายคะแนนสาธารณะที่แขวนไว้เหนือหัวผู้เล่นให้ทุกคนเห็น ส่วน IntValue ที่อยู่ข้างในคือตัวเลขบนป้ายที่คุณเปลี่ยนได้ตลอดเกม',
      underTheHood: 'Roblox core script จะสแกนหา Folder ชื่อ leaderstats ในผู้เล่นแต่ละคนโดยอัตโนมัติ แล้วสร้าง UI กระดาน (PlayerList) ให้ เมื่อค่าใน value object เปลี่ยน มันจะ replicate ไป Client ทุกคนและอัปเดตกระดานทันที',
      proTips: [
        'เก็บค่าที่ไม่อยากโชว์บนกระดาน (เช่น XP ดิบ) ไว้ในโฟลเดอร์อื่นที่ไม่ชื่อ leaderstats',
        'จับคู่ leaderstats กับ DataStore: โหลดค่าเก่ามาใส่ตอน PlayerAdded และเซฟตอน PlayerRemoving'
      ]
    }
  },
  {
    id: 'gui-basics-screengui',
    title: 'On-Screen UI Basics (ScreenGui)',
    thaiTitle: 'พื้นฐานการสร้างหน้าจอ UI (ScreenGui)',
    category: 'ui',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/ui/on-screen-containers',
    summary: 'UI บนหน้าจอทั้งหมดเริ่มจาก ScreenGui ที่วางใน StarterGui ภายในบรรจุ Frame (กล่อง), TextLabel (ข้อความ), TextButton (ปุ่มกด) เรียนรู้การสร้างและเชื่อมปุ่มเข้ากับโค้ด',
    whyItMatters: 'แทบทุกเกมต้องมีเมนู ปุ่มร้านค้า แถบเลือด หรือหน้าจอนับเวลา เข้าใจโครงสร้าง GUI พื้นฐานทำให้สร้างหน้าจอโต้ตอบผู้เล่นได้ ซึ่งเป็นส่วนที่ผู้เล่นเห็นและสัมผัสตลอดเวลา',
    keyConcepts: [
      'ScreenGui = ภาชนะหลักของ UI ต้องอยู่ใน StarterGui (จะถูกก็อปไป PlayerGui ของแต่ละคน)',
      'องค์ประกอบพื้นฐาน: Frame (กล่องพื้นหลัง), TextLabel (ข้อความ), TextButton, ImageLabel',
      'ใช้ UDim2 กำหนดขนาด/ตำแหน่งแบบ scale (สัดส่วนหน้าจอ) + offset (พิกเซล) เพื่อรองรับทุกจอ',
      'ปุ่มมี event .Activated (หรือ .MouseButton1Click) เชื่อมด้วย :Connect() ใน LocalScript'
    ],
    visualDiagram: `StarterGui
  └─ ScreenGui
       └─ Frame          (กล่องเมนู)
            ├─ TextLabel  ("ร้านค้า")
            └─ TextButton ("ซื้อ")  --.Activated--> โค้ด`,
    codeSnippet: `-- LocalScript วางไว้ใน StarterGui หรือใต้ ScreenGui
local player = game:GetService("Players").LocalPlayer
local screenGui = script.Parent
local buyButton = screenGui:WaitForChild("Frame"):WaitForChild("BuyButton")

-- ตั้งค่าตำแหน่ง/ขนาดปุ่ม (scale + offset)
buyButton.Size = UDim2.new(0.2, 0, 0.1, 0)      -- 20% กว้าง, 10% สูงของจอ
buyButton.Position = UDim2.new(0.4, 0, 0.8, 0)

-- เชื่อมการกดปุ่ม
buyButton.Activated:Connect(function()
    print(player.Name .. " กดปุ่มซื้อ")
    -- ปกติจะ FireServer ให้ Server เป็นคนหักเงินจริง
end)`,
    codeExplanation: [
      'LocalPlayer ใช้ได้เฉพาะใน LocalScript หมายถึงผู้เล่นเจ้าของเครื่องนี้',
      'WaitForChild ไล่ลงไปหาปุ่มตามลำดับชั้น ScreenGui > Frame > BuyButton',
      'UDim2.new(scaleX, offsetX, scaleY, offsetY) — ใช้ scale เพื่อให้ UI ยืดตามขนาดจอมือถือ/คอม',
      'buyButton.Activated รองรับทั้งเมาส์คลิกและการแตะบนมือถือ จึงนิยมกว่า MouseButton1Click'
    ],
    commonMistakes: [
      'วาง ScreenGui ผิดที่ (เช่นใน Workspace) ต้องอยู่ใน StarterGui เท่านั้นจึงจะแสดง',
      'ใช้ offset พิกเซลล้วน (เช่น Size = UDim2.fromOffset) ทำให้ UI เพี้ยนบนจอขนาดต่างกัน',
      'เขียนโค้ดปุ่มใน Server Script — UI และ input ต้องจัดการใน LocalScript'
    ],
    gameExample: 'หน้าร้านค้าเป็น ScreenGui ที่มี Frame รายการไอเทม แต่ละแถวมี TextButton เมื่อกดจะ FireServer ไปให้ Server ตรวจเงินและมอบไอเทม',
    prebakedDeepDive: {
      analogy: 'ScreenGui เหมือนกระจกใสที่แปะทับหน้าจอ Frame คือกล่องที่วางบนกระจก และ TextButton คือปุ่มบนกล่อง UDim2 คือวิธีบอกตำแหน่ง "เป็นเปอร์เซ็นต์ของจอ" เพื่อให้ยืดหดตามขนาดจอได้',
      underTheHood: 'ScreenGui ที่อยู่ใน StarterGui จะถูก clone ไปยัง PlayerGui ของผู้เล่นแต่ละคนเมื่อ spawn ทำให้ทุกคนมี UI ชุดของตัวเอง การแก้ UI ฝั่ง Client ไม่กระทบผู้เล่นอื่น เพราะ UI เป็นเรื่องของการแสดงผลเฉพาะบุคคล',
      proTips: [
        'ใช้ UIListLayout หรือ UIGridLayout จัดเรียงลูกอัตโนมัติ แทนการวางตำแหน่งทีละอันด้วยมือ',
        'เปิด AnchorPoint = Vector2.new(0.5, 0.5) เพื่อจัดกึ่งกลางองค์ประกอบให้ง่ายขึ้น'
      ]
    }
  },
  {
    id: 'debugging-output-print',
    title: 'Debugging with Output & print',
    thaiTitle: 'การหาบั๊กด้วย Output, print และ Breakpoint',
    category: 'luau',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/studio/debugging',
    summary: 'ทุกโปรแกรมเมอร์ต้องดีบัก เรียนรู้การอ่าน error ใน Output, ใช้ print/warn ตรวจค่ากลางทาง, และตั้ง breakpoint เพื่อหยุดโค้ดดูค่าตัวแปรทีละบรรทัด',
    whyItMatters: 'โค้ดพังเป็นเรื่องปกติ ทักษะที่แยกมือใหม่ออกจากมืออาชีพคือความสามารถในการ "อ่าน error แล้วรู้ว่าผิดตรงไหน" การดีบักเป็นได้ทำให้แก้ปัญหาเองได้โดยไม่ต้องรอถามใคร',
    keyConcepts: [
      'Output แสดง error (แดง), warning (เหลือง), และ print (ขาว) พร้อมบอกว่ามาจาก Server หรือ Client',
      'error ยอดฮิต: "attempt to index nil" มักเกิดจากหาวัตถุไม่เจอ (ลืม WaitForChild)',
      'print(ตัวแปร) แทรกระหว่างบรรทัดเพื่อดูว่าค่าถูกต้องไหมและโค้ดวิ่งมาถึงจุดนี้หรือไม่',
      'Breakpoint: คลิกเลขบรรทัดเพื่อให้โค้ดหยุด แล้วดูค่าตัวแปรใน Watch/Call Stack'
    ],
    visualDiagram: `[Output Window]
🔴 15:02:11  Workspace.Trap:5: attempt to index nil
             ^บรรทัด 5    ^สาเหตุ: หาลูกไม่เจอ
⚪ 15:02:12  ค่า health = 100   <- print() ของเรา
🟡 15:02:13  เตือน: cooldown ยังไม่หมด`,
    codeSnippet: `local part = workspace:FindFirstChild("Trap")

-- ❌ ถ้า part เป็น nil จะ error: attempt to index nil
-- ✅ ดีบักด้วย print เพื่อยืนยันว่าหาเจอไหม
print("part คือ:", part)   -- ถ้าโชว์ nil = หาไม่เจอ

if part then
    print("เจอ Trap แล้ว ตำแหน่ง:", part.Position)
    part.Touched:Connect(function(hit)
        print("มีอะไรมาชน:", hit.Name)   -- ตรวจว่า event ยิงไหม
    end)
else
    warn("หา Trap ไม่เจอ! เช็คชื่อและตำแหน่งใน Explorer")
end`,
    codeExplanation: [
      'print("part คือ:", part) แสดงค่า part — ถ้าเป็น nil แปลว่าหาไม่เจอตั้งแต่ต้น',
      'การ print หลายค่าคั่นด้วย , ช่วยดูหลายตัวแปรพร้อมกันได้',
      'if part then กันไม่ให้โค้ดพังเมื่อหาวัตถุไม่เจอ (defensive coding)',
      'warn() เน้นข้อความเตือนด้วยสีเหลือง เห็นชัดกว่า print ธรรมดาเมื่อ Output ยาว'
    ],
    commonMistakes: [
      'ไม่เปิด Output เลยไม่เห็น error แล้วเดาว่าโค้ดไม่ทำงานทั้งที่มันฟ้องอยู่',
      'อ่าน error แต่ไม่ดูเลขบรรทัดและชื่อสคริปต์ที่ระบุไว้ตอนต้นบรรทัด error',
      'ลืมลบ print ดีบักออกก่อนปล่อยเกมจริง ทำให้ Output รกและกินประสิทธิภาพเล็กน้อย'
    ],
    gameExample: 'เมื่อระบบร้านค้าไม่ทำงาน ให้ print ค่าเงินก่อนหักและหลังหัก เพื่อดูว่าเงินถูกคำนวณถูกไหม และ print ในฟังก์ชัน event เพื่อเช็คว่าปุ่มถูกกดจริง',
    prebakedDeepDive: {
      analogy: 'การดีบักเหมือนหมอวินิจฉัยโรค: error message คืออาการที่คนไข้บอก, print คือการวัดไข้เป็นจุดๆ เพื่อหาว่าความผิดปกติเริ่มตรงไหน, breakpoint คือการเอกซเรย์หยุดเวลาดูข้างในละเอียด',
      underTheHood: 'Output แยกบริบท Server/Client ให้เพราะโค้ดสองฝั่งรันคนละสภาพแวดล้อม error เดียวกันอาจเกิดฝั่งเดียว การรู้ว่ามันมาจากฝั่งไหนช่วยจำกัดขอบเขตปัญหาได้ครึ่งหนึ่งทันที',
      proTips: [
        'ใช้ Test > Play กับ 2 ผู้เล่น (Clients) เพื่อจับบั๊กที่เกิดเฉพาะตอนมีผู้เล่นหลายคน',
        'พิมพ์ป้ายกำกับใน print เช่น print("[SHOP] เงินก่อนหัก:", gold) เพื่อกรองหาใน Output ง่ายขึ้น'
      ]
    }
  },
  {
    id: 'publishing-your-game',
    title: 'Testing & Publishing Your Game',
    thaiTitle: 'ทดสอบและเผยแพร่เกมสู่สาธารณะ',
    category: 'security_monetization',
    difficulty: 'Beginner',
    officialUrl: 'https://create.roblox.com/docs/production/publishing/publishing-experiences-and-places',
    summary: 'เมื่อสร้างเกมเสร็จ ขั้นสุดท้ายคือทดสอบให้ดีแล้วเผยแพร่ เรียนรู้ความต่างของ Save กับ Publish, การทดสอบแบบหลายผู้เล่น, และการตั้งค่าเกมให้เพื่อนเข้าเล่นได้',
    whyItMatters: 'สร้างเกมเก่งแค่ไหนก็ไร้ความหมายถ้าไม่มีใครได้เล่น การเข้าใจขั้นตอน publish คือสะพานสุดท้ายที่เปลี่ยนโปรเจกต์ในเครื่องให้กลายเป็นเกมที่คนทั่วโลกเข้าถึงได้จริง',
    keyConcepts: [
      'Save to File = เก็บไฟล์ในเครื่อง ต่างจาก Publish to Roblox = อัปขึ้นคลาวด์ให้คนเล่น',
      'File > Publish to Roblox (Ctrl+P) ครั้งแรกให้ตั้งชื่อและคำอธิบายเกม',
      'ตั้งค่าความเป็นส่วนตัวที่ Creator Dashboard: Private (เฉพาะเรา) หรือ Public (ทุกคน)',
      'ทดสอบแบบหลายคนด้วย Test > Clients and Servers ก่อนปล่อยจริงเสมอ'
    ],
    visualDiagram: `[ในเครื่อง]                    [คลาวด์ Roblox]
 Save (Ctrl+S)  --เก็บไฟล์-->  .rbxl ในเครื่อง
 Publish (Ctrl+P) --อัป-->  เกมออนไลน์ที่คนเล่นได้
                              └─ ตั้ง Public เพื่อนถึงเข้าได้`,
    codeSnippet: `-- ก่อน Publish ตรวจ checklist ด้วยโค้ด/การทดสอบเหล่านี้:

-- 1. มี SpawnLocation ใน Workspace ให้ผู้เล่นเกิด
-- 2. ทดสอบ DataStore ต้อง Publish ก่อน (Studio เปล่าใช้ DataStore ไม่ได้)
--    เปิดที่ Game Settings > Security > Enable Studio Access to API Services

-- ตัวอย่างข้อความต้อนรับเมื่อผู้เล่นเข้าเกมจริง
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(player)
    print("ยินดีต้อนรับสู่เกมของเรา, " .. player.Name)
end)

-- ทดสอบหลายผู้เล่น: เมนู Test > เลือกจำนวน Players > Start`,
    codeExplanation: [
      'DataStore ทำงานได้เฉพาะในเกมที่ Publish แล้ว และต้องเปิด API Services ใน Game Settings',
      'SpawnLocation กำหนดจุดเกิดของผู้เล่น ถ้าไม่มีผู้เล่นอาจตกลงมาจากที่สูง',
      'การทดสอบ Clients and Servers จำลองผู้เล่นหลายคนในเครื่องเดียว จับบั๊กเครือข่ายได้',
      'หลัง Publish ครั้งแรก การกด Publish ครั้งต่อไปจะอัปเดตเกมเดิม (ไม่สร้างใหม่)'
    ],
    commonMistakes: [
      'สับสน Save (ในเครื่อง) กับ Publish (ขึ้นคลาวด์) — เพื่อนเข้าเล่นไม่ได้เพราะแค่ Save',
      'ลืมตั้งเกมเป็น Public ที่ Creator Dashboard ทำให้คนอื่นเข้าไม่ได้',
      'ทดสอบ DataStore ใน Studio โดยไม่เปิด API Services ทำให้เซฟไม่ทำงานและเข้าใจผิดว่าโค้ดพัง'
    ],
    gameExample: 'หลังสร้าง Obby เสร็จ นักพัฒนาจะกด Publish to Roblox ตั้งชื่อเกม เปิด API Services เพื่อทดสอบระบบเซฟ ทดสอบด้วย 2 ผู้เล่น แล้วตั้งเป็น Public ให้เพื่อนเข้าเล่น',
    prebakedDeepDive: {
      analogy: 'Save เหมือนเก็บต้นฉบับหนังสือไว้ในลิ้นชักที่บ้าน ส่วน Publish เหมือนส่งต้นฉบับไปโรงพิมพ์วางขายให้คนทั้งประเทศอ่าน — คนละขั้นตอนกันโดยสิ้นเชิง',
      underTheHood: 'เกม (Experience) หนึ่งอาจมีหลาย Place โดยมี Place เริ่มต้นเป็นประตูทางเข้า เมื่อ Publish, Studio จะอัปโหลด Data Model ทั้งหมดขึ้น Roblox cloud แล้วสร้าง Universe/Place ID ที่ใช้อ้างอิงเกมบนแพลตฟอร์ม',
      proTips: [
        'ตั้งชื่อและไอคอนเกมให้ดึงดูดตั้งแต่แรก เพราะมีผลต่อยอดคนกดเข้าเล่นอย่างมาก',
        'ก่อนปล่อย Public จริง ลองตั้ง Friends-only เพื่อให้เพื่อนช่วยเทสต์หาบั๊กก่อนเปิดสาธารณะ'
      ]
    }
  }
];

export const ROBLOX_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'script-types-hierarchy',
    question: 'หากคุณต้องการเขียนระบบควบคุมปุ่มบนหน้าจอ UI (เช่น ปุ่มเปิดกระเป๋า) ควรสคริปต์ชนิดใด และวางไว้ที่ไหน?',
    options: [
      'Script วางไว้ใน ServerScriptService',
      'LocalScript วางไว้ใน StarterGui หรือภายในปุ่ม UI นั้น',
      'ModuleScript วางไว้ใน ServerStorage',
      'Script วางไว้ใน Workspace'
    ],
    correctIndex: 1,
    explanation: 'LocalScript ทำงานบนฝั่งผู้เล่น (Client) เท่านั้น จึงตอบสนองกับการคลิกและแสดงผล UI ของผู้เล่นคนนั้นได้อย่างถูกต้อง'
  },
  {
    id: 'q2',
    topicId: 'remote-events-networking',
    question: 'เพราะเหตุใดเราจึงไม่ควรส่งจำนวนดาเมจจาก Client ไปยัง Server เช่น attackRemote:FireServer(9999)?',
    options: [
      'เพราะ RemoteEvent ส่งตัวเลขไม่ได้ ส่งได้เฉพาะข้อความ',
      'เพราะจะทำให้เกมกระตุกและเฟรมเรตตก',
      'เพราะผู้ใช้โปรแกรมโกง (Exploiter) สามารถแก้ไขตัวเลขดาเมจให้เป็นค่ามหาศาลได้',
      'เพราะ Server จะไม่รู้ว่าใครเป็นคนยิงคำสั่ง'
    ],
    correctIndex: 2,
    explanation: 'กฎเหล็กของความปลอดภัยคือ Never Trust The Client! ให้ส่งเพียงการกระทำ แล้วให้ Server เป็นผู้คำนวณและตรวจสอบดาเมจจริงเสมอ'
  },
  {
    id: 'q3',
    topicId: 'datastores-persistence',
    question: 'เมื่อต้องการติดต่อกับ DataStoreService เพื่อบันทึกหรือโหลดข้อมูล ทำไมจึงต้องใช้คำสั่ง pcall() เสมอ?',
    options: [
      'เพื่อทำให้โค้ดทำงานเร็วขึ้นเป็น 2 เท่า',
      'เพื่อดักจับข้อผิดพลาด (Network Timeout) ไม่ให้สคริปต์ทั้งเกมพังเมื่อการเชื่อมต่อ Cloud ขัดข้อง',
      'เพราะเป็นคำสั่งบังคับในการเข้ารหัสข้อมูลรหัสผ่าน',
      'เพื่อส่งข้อความแจ้งเตือนไปยังหน้าจอมือถือของผู้เล่น'
    ],
    correctIndex: 1,
    explanation: 'DataStore เป็นบริการบนระบบ Cloud ซึ่งอาจเกิดปัญหาเซิร์ฟเวอร์หน่วงหรือล่มชั่วคราวได้ pcall จะป้องกันไม่ให้สคริปต์หยุดทำงานกลางคัน'
  },
  {
    id: 'q4',
    topicId: 'parts-physics-anchored',
    question: 'หากต้องการให้แผ่นเหยียบลอยอยู่กับที่ และผู้เล่นสามารถวิ่งทะลุผ่านเพื่อเก็บเหรียญได้ ควรตั้งค่า Part อย่างไร?',
    options: [
      'Anchored = true, CanCollide = true, CanTouch = false',
      'Anchored = false, CanCollide = true, CanTouch = true',
      'Anchored = true, CanCollide = false, CanTouch = true',
      'Anchored = false, CanCollide = false, CanTouch = false'
    ],
    correctIndex: 2,
    explanation: 'Anchored = true เพื่อตรึงชิ้นส่วนไว้กลางอากาศ, CanCollide = false เพื่อให้เดินทะลุผ่านได้ และ CanTouch = true เพื่อให้ตรวจจับการเหยียบได้'
  },
  {
    id: 'q5',
    topicId: 'monetization-marketplaceservice',
    question: 'ในการทำ Developer Product ผ่านฟังก์ชัน ProcessReceipt เมื่อมอบสินค้าให้ผู้เล่นสำเร็จแล้ว ต้องคืนค่าใดกลับไป?',
    options: [
      'Enum.ProductPurchaseDecision.PurchaseGranted',
      'Enum.ProductPurchaseDecision.NotProcessedYet',
      'return true',
      'return "Success"'
    ],
    correctIndex: 0,
    explanation: 'ต้องคืนค่า Enum.ProductPurchaseDecision.PurchaseGranted เพื่อยืนยันกับ Roblox ว่าผู้เล่นได้รับไอเทมเรียบร้อยแล้วและปิดยอดการตัด Robux'
  },
  {
    id: 'q6',
    topicId: 'runservice-loops-timing',
    question: 'อีเวนต์ใดของ RunService ที่ทำงานเฉพาะฝั่ง Client และเกิดขึ้นก่อนที่ภาพแต่ละเฟรมจะถูกวาดลงบนหน้าจอ?',
    options: [
      'RunService.Heartbeat',
      'RunService.RenderStepped',
      'RunService.Stepped',
      'RunService.PreAnimation'
    ],
    correctIndex: 1,
    explanation: 'RenderStepped จะรันเฉพาะบน Client ในจังหวะก่อนเรนเดอร์ภาพ เหมาะสำหรับการอัปเดตมุมมองกล้องหรือ UI Crosshair ให้ไหลลื่นที่สุด'
  },
  {
    id: 'q7',
    topicId: 'proximity-prompt-interaction',
    question: 'ใน ProximityPrompt อีเวนต์ใดที่จะทำงานเมื่อผู้เล่นเดินเข้ามากดปุ่ม (หรือกดค้างจนครบเวลา) สำเร็จแล้ว?',
    options: [
      'prompt.Triggered',
      'prompt.PromptShown',
      'prompt.TouchEnded',
      'prompt.Activated'
    ],
    correctIndex: 0,
    explanation: 'prompt.Triggered:Connect(function(player)...) คืออีเวนต์หลักที่จะส่ง Instance ของ player ผู้กดปุ่มมาให้'
  },
  {
    id: 'q8',
    topicId: 'sound-service-3d-audio',
    question: 'หากคุณต้องการให้เสียงระเบิดดังแบบ 3 มิติ (เดินเข้าใกล้=ดัง เดินห่างออกไป=ค่อยๆ เบาลง) ควรนำ Sound ไปวางไว้ที่ใด?',
    options: [
      'วางไว้ใน SoundService',
      'วางไว้ใน StarterPlayerScripts',
      'วางไว้ภายใน Part หรือ Attachment ใน Workspace',
      'วางไว้ใน ReplicatedStorage'
    ],
    correctIndex: 2,
    explanation: 'เมื่อวาง Sound ภายใน Part หรือ Attachment เอนจิน Roblox จะคำนวณตำแหน่ง 3D Positional Audio ให้โดยอัตโนมัติตามระยะห่างจากตัวละคร'
  },
  {
    id: 'q9',
    topicId: 'collectionservice-tags',
    question: 'เพราะเหตุใดการใช้ CollectionService ถึงดีกว่าการก็อปปี้สคริปต์ไปใส่ในทุกๆ ชิ้นส่วน (เช่น บล็อกลาวา 100 ชิ้น)?',
    options: [
      'เพราะช่วยให้แมปมีขนาดเล็กลง และแก้โค้ดที่สคริปต์หลักเพียงจุดเดียวทุกชิ้นก็อัปเดตตามทันที',
      'เพราะทำให้ชิ้นส่วนกลายเป็นสีทองอัตโนมัติ',
      'เพราะป้องกันไม่ให้ผู้เล่นมองเห็นชิ้นส่วนนั้น',
      'เพราะทำให้เกมไม่ต้องใช้อินเทอร์เน็ตในการเล่น'
    ],
    correctIndex: 0,
    explanation: 'CollectionService ช่วยให้เราเขียนสคริปต์ควบคุมเพียงจุดเดียว (Single Source of Truth) รองรับการแก้โค้ดง่าย และประหยัดแรมของเกมมหาศาล'
  },
  {
    id: 'q10',
    topicId: 'security-anti-exploit-server',
    question: 'หากมีแฮกเกอร์เขียนสคริปต์วนลูป while true สแปมยิง RemoteEvent ซื้อของเข้าเซิร์ฟเวอร์ วิธีการป้องกันที่ถูกต้องที่สุดคืออะไร?',
    options: [
      'ลบ RemoteEvent ทิ้งทั้งหมด',
      'เขียนระบบ Rate Limiting / Debounce ต่อผู้เล่นบน Server เพื่อปฏิเสธคำสั่งที่ส่งมาถี่ผิดปกติ',
      'เขียนสคริปต์ดักบน LocalScript ในตัวละครผู้เล่น',
      'ส่งคำสั่งเตะผู้เล่นทุกคนในห้องทันที'
    ],
    correctIndex: 1,
    explanation: 'การตรวจสอบเวลา (Timestamp) บน Server ร่วมกับ Rate Limiting ช่วยป้องกันการสแปมรีโมตได้ 100% โดยที่ผู้เล่นทั่วไปไม่ได้รับผลกระทบ'
  },
  {
    id: 'q11',
    topicId: 'datastore-session-locking-guide',
    question: 'บั๊กปั๊มไอเทม (Dupe Glitch) จากการที่ผู้เล่นเทรดของแล้วรีบออกจากเซิร์ฟเวอร์ทันที สามารถป้องกันได้อย่างเด็ดขาดด้วยเทคนิคใด?',
    options: [
      'ใช้ SetAsync บันทึกข้อมูลทุกๆ 1 วินาที',
      'ลดจำนวนไอเทมที่อนุญาตให้เทรดได้',
      'ใช้ระบบ Session Locking ผ่าน UpdateAsync หรือ ProfileService เพื่อล็อกสิทธิ์แก้ไขข้อมูลกับเซิร์ฟเวอร์เดียว',
      'สั่งให้เกมไม่เซฟข้อมูลของผู้เล่น'
    ],
    correctIndex: 2,
    explanation: 'Session Locking จะติดป้าย JobId ล็อกข้อมูลไว้ใน DataStore หากผู้เล่นสลับห้องไว เซิร์ฟเวอร์ใหม่จะไม่ยอมเปิดข้อมูลจนกว่าเซิร์ฟเวอร์เก่าจะปล่อยกลอน ป้องกันการก็อปปี้ไอเทมได้สมบูรณ์'
  },
  {
    id: 'q12',
    topicId: 'studio-interface-basics',
    question: 'คุณเขียนโค้ดที่ต้องใช้ตัวละครผู้เล่น แต่กดปุ่มทดสอบแล้วโค้ดไม่ทำงาน สาเหตุที่พบบ่อยที่สุดคือข้อใด?',
    options: [
      'ลืมบันทึกไฟล์ก่อนทดสอบ',
      'กด Run (F8) ซึ่งรันโลกเปล่าไม่มีตัวละคร แทนที่จะกด Play (F5)',
      'คอมพิวเตอร์แรงไม่พอ',
      'ต้อง Publish เกมก่อนจึงจะทดสอบได้'
    ],
    correctIndex: 1,
    explanation: 'โหมด Run (F8) จำลองเซิร์ฟเวอร์เปล่าโดยไม่มีตัวละคร ส่วน Play (F5) จะให้คุณเข้าเป็นผู้เล่นจริง โค้ดที่พึ่งพา Character หรือ LocalPlayer จึงต้องทดสอบด้วย Play'
  },
  {
    id: 'q13',
    topicId: 'luau-variables-datatypes',
    question: 'ข้อใดคือความแตกต่างที่ถูกต้องระหว่าง = และ == ใน Luau?',
    options: [
      'ทั้งสองเหมือนกันทุกประการ',
      '= ใช้กำหนดค่าให้ตัวแปร ส่วน == ใช้เปรียบเทียบว่าสองค่าเท่ากันหรือไม่',
      '= ใช้เปรียบเทียบ ส่วน == ใช้กำหนดค่า',
      '== ใช้ได้กับตัวเลขเท่านั้น'
    ],
    correctIndex: 1,
    explanation: '= คือการกำหนดค่า เช่น score = 10 ส่วน == คือการเปรียบเทียบที่คืน true/false เช่น if score == 10 then การสับสนสองตัวนี้เป็นบั๊กยอดฮิตของมือใหม่'
  },
  {
    id: 'q14',
    topicId: 'luau-loops',
    question: 'เพราะเหตุใดการเขียน while true do โดยไม่มี task.wait() ข้างในจึงเป็นอันตราย?',
    options: [
      'เพราะมันจะใช้เน็ตเยอะเกินไป',
      'เพราะลูปจะยึด thread ไว้ไม่ปล่อย ทำให้เกมค้าง (freeze/crash) ทันที',
      'เพราะ Roblox ห้ามใช้ while loop',
      'เพราะมันจะทำงานแค่รอบเดียวแล้วหยุด'
    ],
    correctIndex: 1,
    explanation: 'ลูปที่ไม่มี wait จะวนเร็วมากจนยึด thread ไว้ไม่ยอมให้เอนจินวาดเฟรมถัดไป ผลคือเกมค้าง task.wait() คือการยอมปล่อยให้เอนจินทำงานอื่นก่อนวนรอบต่อไป'
  },
  {
    id: 'q15',
    topicId: 'luau-tables-arrays-dictionaries',
    question: 'ใน Luau สมาชิกตัวแรกของ Array อยู่ที่ index เลขใด?',
    options: [
      'index 0',
      'index 1',
      'index -1',
      'ขึ้นอยู่กับการตั้งค่า'
    ],
    correctIndex: 1,
    explanation: 'ต่างจากหลายภาษา (เช่น Python, JavaScript) ที่เริ่มที่ 0 — Array ใน Luau เริ่มนับที่ index 1 เสมอ ดังนั้น items[1] คือสมาชิกตัวแรก'
  },
  {
    id: 'q16',
    topicId: 'instances-hierarchy-referencing',
    question: 'คุณเขียน local p = Instance.new("Part") แล้วรัน แต่ไม่เห็น Part ในเกมเลย สาเหตุที่เป็นไปได้มากที่สุดคือ?',
    options: [
      'ต้องใช้ LocalScript เท่านั้นจึงจะสร้าง Part ได้',
      'ยังไม่ได้ตั้งค่า .Parent ให้ Part เช่น p.Parent = workspace',
      'Instance.new สร้าง Part ไม่ได้',
      'Part จะมองไม่เห็นเสมอจนกว่าจะกดปุ่มพิเศษ'
    ],
    correctIndex: 1,
    explanation: 'Instance.new() สร้างวัตถุในหน่วยความจำแต่ยัง "ลอย" อยู่นอกต้นไม้ จนกว่าจะตั้ง .Parent (เช่น = workspace) จึงจะปรากฏในเกม การลืมตั้ง Parent เป็นข้อผิดพลาดยอดฮิต'
  },
  {
    id: 'q17',
    topicId: 'instances-hierarchy-referencing',
    question: 'ต้องการอ้างถึงวัตถุที่อาจยังโหลด (replicate) มาไม่ถึงตอนสคริปต์เริ่มทำงาน ควรใช้เมธอดใดเพื่อกันบั๊ก attempt to index nil?',
    options: [
      ':FindFirstChild()',
      ':GetChildren()',
      ':WaitForChild()',
      '.Parent'
    ],
    correctIndex: 2,
    explanation: ':WaitForChild() จะรอจนกว่าวัตถุจะมีอยู่จริงก่อนทำงานต่อ ต่างจาก FindFirstChild ที่คืน nil ทันทีถ้ายังหาไม่เจอ ทำให้เกิด error เมื่อวัตถุยังเดินทางมาไม่ถึง Client'
  },
  {
    id: 'q18',
    topicId: 'events-services-connections',
    question: 'บรรทัด part.Touched:Connect(onTouch) ทำงานอย่างไร?',
    options: [
      'เรียกฟังก์ชัน onTouch หนึ่งครั้งทันทีที่สคริปต์เริ่ม',
      'เรียกฟังก์ชัน onTouch ทุกครั้งที่มีสิ่งใดมาชน part',
      'ลบ part ออกเมื่อถูกแตะ',
      'ทำให้ part แตะไม่ได้'
    ],
    correctIndex: 1,
    explanation: ':Connect() คือการ "สมัครรับ" event ในที่นี้คือ .Touched ทุกครั้งที่มีอะไรมาชน part ฟังก์ชัน onTouch จะถูกเรียกอัตโนมัติ นี่คือแกนของการเขียนเกมแบบ event-driven'
  },
  {
    id: 'q19',
    topicId: 'humanoid-character-model',
    question: 'ทำไมจึงควรเชื่อม player.CharacterAdded แทนที่จะตั้งค่า Humanoid แค่ครั้งเดียวตอนผู้เล่นเข้าเกม?',
    options: [
      'เพราะ CharacterAdded ทำงานเร็วกว่า',
      'เพราะผู้เล่น spawn ใหม่ทุกครั้งที่ตาย ตัวละครเป็นวัตถุใหม่ ค่าที่ตั้งไว้กับตัวเก่าจะหายไป',
      'เพราะ PlayerAdded ใช้ไม่ได้กับ Humanoid',
      'ไม่มีความแตกต่าง ใช้แบบไหนก็ได้'
    ],
    correctIndex: 1,
    explanation: 'ทุกครั้งที่ผู้เล่นตายและเกิดใหม่ ตัวละคร (Character) จะเป็น Model ใหม่ทั้งหมด บัฟหรือค่าที่ตั้งไว้กับตัวเก่าจะหายไป จึงต้องเชื่อม CharacterAdded เพื่อตั้งค่าใหม่ทุกครั้งที่ spawn'
  },
  {
    id: 'q20',
    topicId: 'leaderstats-scoring-system',
    question: 'เพื่อให้คะแนนของผู้เล่นปรากฏบนกระดานมุมขวาบนโดยอัตโนมัติ Folder ที่สร้างต้องตั้งชื่อว่าอะไร?',
    options: [
      'Stats',
      'PlayerData',
      'leaderstats (ตัวพิมพ์เล็กทั้งหมด)',
      'Leaderboard'
    ],
    correctIndex: 2,
    explanation: 'Roblox จะสแกนหา Folder ชื่อ "leaderstats" (ตัวพิมพ์เล็กทั้งหมด) โดยเฉพาะ เพื่อสร้างกระดานคะแนนให้อัตโนมัติ ถ้าตั้งชื่อผิดแม้แต่ตัวพิมพ์ใหญ่ กระดานจะไม่ขึ้น'
  },
  {
    id: 'q21',
    topicId: 'publishing-your-game',
    question: 'เพื่อนเข้าเล่นเกมของคุณไม่ได้ ทั้งที่คุณกด Save (Ctrl+S) แล้ว สาเหตุคืออะไร?',
    options: [
      'Save เก็บไฟล์ไว้ในเครื่องเท่านั้น ต้องใช้ Publish (Ctrl+P) เพื่ออัปขึ้นคลาวด์ และตั้งเกมเป็น Public',
      'เพื่อนต้องมี Roblox Studio ก่อน',
      'ต้องรอ 24 ชั่วโมงหลัง Save',
      'เกมมีขนาดใหญ่เกินไป'
    ],
    correctIndex: 0,
    explanation: 'Save เก็บไฟล์ .rbxl ไว้ในเครื่องเท่านั้น การจะให้คนอื่นเล่นต้อง Publish to Roblox เพื่ออัปขึ้นคลาวด์ แล้วตั้งค่าความเป็นส่วนตัวเป็น Public (หรือ Friends) ที่ Creator Dashboard'
  }
];


