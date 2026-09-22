import { CodeChallenge } from '../types';

export const CODE_CHALLENGES: CodeChallenge[] = [
  {
    id: 'challenge-lava-brick',
    title: 'Lava Kill Brick (แผ่นลาวาลดเลือด)',
    thaiTitle: 'เขียนสคริปต์แผ่นลาวาตรวจจับและลดเลือดผู้เล่น',
    difficulty: 'Beginner',
    category: 'physics',
    docUrl: 'https://create.roblox.com/docs/physics',
    description: 'ฝึกเขียนระบบแผ่นลาวาหรือกับดักหนาม เมื่อตัวละครผู้เล่นเดินมาเหยียบ ให้ตรวจสอบว่าวัตถุที่ชนมี Humanoid หรือไม่ แล้วลดเลือดตัวละครจนหมด (Health = 0 หรือ TakeDamage)',
    taskObjectives: [
      'เชื่อมต่ออีเวนต์ .Touched เข้ากับฟังก์ชัน Callback',
      'ตรวจสอบหา Humanoid ในโมเดลตัวละคร (hit.Parent)',
      'สั่งลดเลือดผู้เล่นให้หมดทันที'
    ],
    starterCode: `-- สคริปต์วางไว้ในชิ้นส่วน LavaPart
local lavaPart = script.Parent

-- TODO: เชื่อมต่ออีเวนต์ Touched ของ lavaPart
lavaPart.Touched:Connect(function(hit)
    -- 1. ตรวจสอบว่าสิ่งที่มาสัมผัสเป็นตัวละครที่มี Humanoid หรือไม่
    local humanoid = nil -- แทนที่ด้วยโค้ดค้นหา Humanoid
    
    -- 2. ถ้ามี Humanoid ให้สั่งลดเลือดให้หมด
    if humanoid then
        -- เขียนคำสั่งลดเลือดที่นี่
    end
end)`,
    solutionCode: `local lavaPart = script.Parent

lavaPart.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildWhichIsA("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end)`,
    solutionExplanation: 'ใช้ `hit.Parent:FindFirstChildWhichIsA("Humanoid")` เพื่อค้นหาชิ้นส่วนควบคุมตัวละครอย่างปลอดภัย แล้วกำหนด `humanoid.Health = 0` หรือ `humanoid:TakeDamage(100)` เพื่อกำจัดตัวละคร',
    hints: [
      'ชิ้นส่วนที่มาชน (hit) คือขาหรือแขนของตัวละคร ดังนั้นตัวละครหลักจะอยู่ที่ hit.Parent',
      'ใช้ฟังก์ชัน :FindFirstChild("Humanoid") หรือ :FindFirstChildWhichIsA("Humanoid")',
      'คำสั่งลดเลือดสามารถใช้ humanoid.Health = 0 หรือ humanoid:TakeDamage(100)'
    ],
    testCriteria: [
      {
        id: 'c1',
        label: 'เชื่อมต่ออีเวนต์ lavaPart.Touched อย่างถูกต้อง',
        checkFnName: 'checkTouched',
        failureTip: 'อย่าลืมเรียกใช้ lavaPart.Touched:Connect(...) พร้อมรับพารามิเตอร์ hit'
      },
      {
        id: 'c2',
        label: 'มีการตรวจสอบค้นหา Humanoid จาก hit.Parent',
        checkFnName: 'checkFindHumanoid',
        failureTip: 'ควรใช้ hit.Parent:FindFirstChild("Humanoid") หรือ FindFirstChildWhichIsA("Humanoid")'
      },
      {
        id: 'c3',
        label: 'สั่งลดเลือดผู้เล่น (Health = 0 หรือ TakeDamage)',
        checkFnName: 'checkDamage',
        failureTip: 'สั่งลดเลือดด้วย humanoid.Health = 0 หรือ humanoid:TakeDamage(...)'
      }
    ]
  },
  {
    id: 'challenge-remote-listener',
    title: 'RemoteEvent Server Handler',
    thaiTitle: 'เขียนตัวรับสัญญาณ OnServerEvent บนเซิร์ฟเวอร์',
    difficulty: 'Intermediate',
    category: 'networking',
    docUrl: 'https://create.roblox.com/docs/scripting/events/remote',
    description: 'ฝึกเขียนสคริปต์ฝั่งเซิร์ฟเวอร์เพื่อรับสัญญาณจาก Client เมื่อผู้เล่นกดปุ่มใช้ไอเทม โดยต้องรับพารามิเตอร์แรกเป็น player เสมอ และตรวจสอบเงื่อนไขอย่างปลอดภัยตามกฎ Never Trust The Client',
    taskObjectives: [
      'เชื่อมต่ออีเวนต์ .OnServerEvent ของ RemoteEvent',
      'ฟังก์ชัน Callback ต้องมีพารามิเตอร์แรกคือ player',
      'ตรวจสอบชนิดของการกระทำ (actionName) ก่อนประมวลผล'
    ],
    starterCode: `local ReplicatedStorage = game:GetService("ReplicatedStorage")
local useItemRemote = ReplicatedStorage:WaitForChild("UseItemEvent")

-- TODO: เชื่อมต่อ OnServerEvent เพื่อรับการสั่งงานจากผู้เล่น
-- คำใบ้: ฟังก์ชันต้องมีพารามิเตอร์แรกเป็น player เสมอ
useItemRemote.OnServerEvent:Connect(function()
    -- 1. เติมพารามิเตอร์ (player, itemName)
    -- 2. ตรวจสอบว่าถ้า itemName == "Potion" ให้เพิ่มพลังชีวิต
end)`,
    solutionCode: `local ReplicatedStorage = game:GetService("ReplicatedStorage")
local useItemRemote = ReplicatedStorage:WaitForChild("UseItemEvent")

useItemRemote.OnServerEvent:Connect(function(player: Player, itemName: string)
    if itemName == "HealthPotion" then
        local character = player.Character
        local humanoid = character and character:FindFirstChildWhichIsA("Humanoid")
        if humanoid then
            humanoid.Health = math.min(humanoid.MaxHealth, humanoid.Health + 25)
            print(player.Name .. " ได้ดื่มยาฟื้นพลังแล้ว!")
        end
    end
end)`,
    solutionExplanation: 'พารามิเตอร์แรกของ OnServerEvent คือ `player` ซึ่งระบบ Roblox ส่งให้เองโดยอัตโนมัติ จากนั้นเราเช็กชื่อไอเทมทางฝั่งเซิร์ฟเวอร์และเพิ่มพลังชีวิตอย่างปลอดภัย',
    hints: [
      'ฟังก์ชัน Callback ใน OnServerEvent:Connect(function(player, itemName)...) ต้องมีตัวแปรแรกมารับ player เสมอ',
      'ตรวจสอบ itemName ด้วยคำสั่ง if itemName == ... then',
      'อย่าให้ Client ส่งค่าจำนวนเลือดที่เพิ่มมาตรงๆ ให้ Server กำหนดตัวเลขเอง'
    ],
    testCriteria: [
      {
        id: 'c1',
        label: 'เรียกใช้ OnServerEvent:Connect(...)',
        checkFnName: 'checkOnServerEvent',
        failureTip: 'ต้องเชื่อมต่ออีเวนต์ useItemRemote.OnServerEvent:Connect'
      },
      {
        id: 'c2',
        label: 'ฟังก์ชันมีพารามิเตอร์ player เป็นตัวแปรแรก',
        checkFnName: 'checkPlayerArg',
        failureTip: 'ในวงเล็บ function(player, ...) ต้องระบุ player เพื่อรับตัวตนของผู้เล่น'
      },
      {
        id: 'c3',
        label: 'มีการตรวจสอบค่าเงื่อนไขของตัวแปร (เช่น if itemName == ...)',
        checkFnName: 'checkCondition',
        failureTip: 'ใช้ if ... then เพื่อกรองคำสั่งที่ส่งมาจาก Client'
      }
    ]
  },
  {
    id: 'challenge-pcall-datastore',
    title: 'Safe DataStore with pcall',
    thaiTitle: 'เขียนคำสั่งเซฟข้อมูลปลอดภัยด้วย pcall',
    difficulty: 'Intermediate',
    category: 'datastores',
    docUrl: 'https://create.roblox.com/docs/cloud-services/datastores',
    description: 'การติดต่อกับระบบ Cloud มีโอกาสหลุดหรือเกิดเน็ตเวิร์กหน่วงได้เสมอ จงเขียนฟังก์ชัน savePlayerData ที่ครอบคำสั่ง UpdateAsync หรือ SetAsync ด้วย pcall() พร้อมพิมพ์ข้อความแจ้งเตือนเมื่อเกิด Error',
    taskObjectives: [
      'ใช้ pcall เพื่อดักจับ Error ที่อาจเกิดขึ้นจากการเชื่อมต่อ Cloud',
      'เรียกใช้ coinStore:UpdateAsync หรือ SetAsync ภายในฟังก์ชัน pcall',
      'ตรวจสอบ if success then ... else ... เพื่อจัดการข้อผิดพลาด'
    ],
    starterCode: `local DataStoreService = game:GetService("DataStoreService")
local coinStore = DataStoreService:GetDataStore("PlayerCoins_v1")

local function savePlayerData(player: Player, coins: number)
    local key = "Player_" .. player.UserId
    
    -- TODO: ครอบคำสั่งบันทึกข้อมูลด้วย pcall()
    local success, errorMessage = nil -- เติม pcall ที่นี่
    
    -- TODO: ตรวจสอบผลลัพธ์
    if success then
        print("บันทึกสำเร็จ!")
    else
        warn("บันทึกผิดพลาด: " .. tostring(errorMessage))
    end
end`,
    solutionCode: `local DataStoreService = game:GetService("DataStoreService")
local coinStore = DataStoreService:GetDataStore("PlayerCoins_v1")

local function savePlayerData(player: Player, coins: number)
    local key = "Player_" .. player.UserId
    
    local success, errorMessage = pcall(function()
        coinStore:SetAsync(key, coins)
    end)
    
    if success then
        print("บันทึกสำเร็จสำหรับ " .. player.Name)
    else
        warn("บันทึกผิดพลาด: " .. tostring(errorMessage))
    end
end`,
    solutionExplanation: 'pcall (Protected Call) จะป้องกันไม่ให้สคริปต์หยุดทำงานเมื่อเกิด HTTP/Network timeout และคืนค่า boolean `success` พร้อมข้อความแจ้งเตือน `errorMessage`',
    hints: [
      'รูปแบบคำสั่ง: local success, err = pcall(function() ... end)',
      'ภายในฟังก์ชันของ pcall ให้เรียก coinStore:SetAsync(key, coins) หรือ UpdateAsync',
      'ตรวจสอบผลด้วย if success then'
    ],
    testCriteria: [
      {
        id: 'c1',
        label: 'เรียกใช้คำสั่ง pcall(function() ... end)',
        checkFnName: 'checkPcall',
        failureTip: 'ต้องมีการใช้ pcall(function() ... end) เพื่อป้องกันเกมแครช'
      },
      {
        id: 'c2',
        label: 'เรียกคำสั่ง SetAsync หรือ UpdateAsync ภายใน pcall',
        checkFnName: 'checkAsyncCall',
        failureTip: 'ต้องมี coinStore:SetAsync หรือ UpdateAsync ด้านในฟังก์ชัน'
      },
      {
        id: 'c3',
        label: 'มีการตรวจสอบเงื่อนไข if success then',
        checkFnName: 'checkSuccessBranch',
        failureTip: 'ต้องมีบล็อก if success then เพื่อเช็กผลการทำงาน'
      }
    ]
  },
  {
    id: 'challenge-ui-tween',
    title: 'UI Button Tween Animation',
    thaiTitle: 'สร้างแอนิเมชันปุ่มเด้งดึ๋งด้วย TweenService',
    difficulty: 'Beginner',
    category: 'ui',
    docUrl: 'https://create.roblox.com/docs/ui',
    description: 'ฝึกใช้งาน TweenService เพื่อทำปุ่มเด้งขยายขนาดเมื่อนำเมาส์ไปชี้ (MouseEnter) โดยสร้าง TweenInfo และสั่ง Tween:Play() อย่างถูกต้อง',
    taskObjectives: [
      'สร้าง TweenInfo ด้วย TweenInfo.new(...)',
      'สร้าง Tween Instance ด้วย TweenService:Create(...)',
      'สั่งให้แอนิเมชันเล่นด้วยเมธอด :Play()'
    ],
    starterCode: `local TweenService = game:GetService("TweenService")
local button = script.Parent -- TextButton

-- 1. กำหนดข้อมูล TweenInfo (เวลา 0.2 วินาที, รูปแบบ Quad, Out)
local tweenInfo = nil -- เติม TweenInfo.new(...)

-- 2. สร้าง Tween ขยายขนาด Size เป็น UDim2.new(0.22, 0, 0.09, 0)
local hoverTween = nil -- เติม TweenService:Create(...)

-- 3. เล่น Tween เมื่อผู้เล่นนำเมาส์มาชี้
button.MouseEnter:Connect(function()
    -- สั่งให้ hoverTween เล่นแอนิเมชัน
end)`,
    solutionCode: `local TweenService = game:GetService("TweenService")
local button = script.Parent

local tweenInfo = TweenInfo.new(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)

local hoverTween = TweenService:Create(button, tweenInfo, {
    Size = UDim2.new(0.22, 0, 0.09, 0)
})

button.MouseEnter:Connect(function()
    hoverTween:Play()
end)`,
    solutionExplanation: 'TweenService:Create รับ 3 พารามิเตอร์หลักคือ Target Instance, TweenInfo และ Property Table จากนั้นเรียกใช้ :Play() เพื่อให้เอนจินคำนวณการเคลื่อนไหวแบบ 60 FPS',
    hints: [
      'ใช้คำสั่ง TweenInfo.new(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)',
      'TweenService:Create(button, tweenInfo, { Size = ... })',
      'ในอีเวนต์ MouseEnter ให้เรียก hoverTween:Play()'
    ],
    testCriteria: [
      {
        id: 'c1',
        label: 'สร้าง TweenInfo ด้วย TweenInfo.new',
        checkFnName: 'checkTweenInfo',
        failureTip: 'ต้องมี TweenInfo.new(...) เพื่อกำหนดเวลาและลักษณะการเคลื่อนไหว'
      },
      {
        id: 'c2',
        label: 'เรียก TweenService:Create(...)',
        checkFnName: 'checkTweenCreate',
        failureTip: 'ต้องสร้าง Tween ผ่าน TweenService:Create(button, ...)'
      },
      {
        id: 'c3',
        label: 'สั่งเล่นแอนิเมชันด้วย :Play()',
        checkFnName: 'checkTweenPlay',
        failureTip: 'อย่าลืมเรียก :Play() เพื่อเริ่มเล่นแอนิเมชัน'
      }
    ]
  },
  {
    id: 'challenge-collection-service',
    title: 'CollectionService Tag Manager',
    thaiTitle: 'วนลูปจัดการวัตถุที่มีแท็กด้วย CollectionService',
    difficulty: 'Intermediate',
    category: 'physics',
    docUrl: 'https://create.roblox.com/docs/scripting/spatial-queries/collection-service',
    description: 'ฝึกเขียนสคริปต์กลางเพื่อดึงชิ้นส่วนทั้งหมดที่มีแท็ก "Coin" ในเกมด้วย CollectionService:GetTagged แล้วทำการวนลูป for เพื่อพิมพ์ข้อความหรือตั้งค่าเริ่มต้น',
    taskObjectives: [
      'เรียกใช้ CollectionService:GetTagged("Coin")',
      'ใช้ for loop (เช่น for _, coin in ipairs(...) do) วนลูปทุกชิ้นส่วน',
      'ตั้งค่าหรือปรับคุณสมบัติให้กับชิ้นส่วนนั้น'
    ],
    starterCode: `local CollectionService = game:GetService("CollectionService")

-- TODO: 1. ดึงชิ้นส่วนทั้งหมดที่ติดแท็ก "Coin"
local taggedCoins = nil -- เติม CollectionService:GetTagged("Coin")

-- TODO: 2. วนลูปเพื่อจัดการเหรียญแต่ละชิ้น
if taggedCoins then
    for _, coinPart in ipairs(taggedCoins) do
        -- ตั้งค่า coinPart.CanCollide = false
    end
end`,
    solutionCode: `local CollectionService = game:GetService("CollectionService")

local taggedCoins = CollectionService:GetTagged("Coin")

for _, coinPart in ipairs(taggedCoins) do
    if coinPart:IsA("BasePart") then
        coinPart.CanCollide = false
        print("กำหนดค่าเหรียญสำเร็จ: " .. coinPart.Name)
    end
end`,
    solutionExplanation: '`CollectionService:GetTagged("Coin")` จะคืนค่า Array ของชิ้นส่วนทั้งหมดที่มีแท็กตรงกัน เราจึงสามารถใช้ `for _, part in ipairs(...)` เพื่อจัดการชิ้นส่วนทั้งหมดพร้อมกันในสคริปต์เดียว',
    hints: [
      'ใช้คำสั่ง CollectionService:GetTagged("Coin")',
      'วนลูปด้วย for _, coin in ipairs(taggedCoins) do',
      'ภายในลูป สามารถตรวจสอบ coinPart.CanCollide = false'
    ],
    testCriteria: [
      {
        id: 'c1',
        label: 'เรียกใช้ CollectionService:GetTagged(...)',
        checkFnName: 'checkGetTagged',
        failureTip: 'ต้องมีคำสั่ง CollectionService:GetTagged("Coin") เพื่อดึงชิ้นส่วน'
      },
      {
        id: 'c2',
        label: 'ใช้วงวน for ... in ipairs(...) do',
        checkFnName: 'checkForLoop',
        failureTip: 'ต้องมีลูป for เพื่อวนประมวลผลวัตถุแต่ละชิ้น'
      },
      {
        id: 'c3',
        label: 'มีการเข้าถึงคุณสมบัติของชิ้นส่วน (เช่น CanCollide หรือ Transparency)',
        checkFnName: 'checkPropertyAccess',
        failureTip: 'ควรตั้งค่าคุณสมบัติเช่น coinPart.CanCollide = false หรือปรับ Transparency'
      }
    ]
  },
  {
    id: 'challenge-raycast-hitscan',
    title: 'Raycast Hitscan Weapon',
    thaiTitle: 'เขียนระบบยิงลำแสง Raycast ตรวจจับเป้าหมาย',
    difficulty: 'Advanced',
    category: 'physics',
    docUrl: 'https://create.roblox.com/docs/physics/raycasting',
    description: 'สร้างฟังก์ชันยิงกระสุนเลเซอร์ (Hitscan) โดยสร้าง RaycastParams ยกเว้นตัวละครผู้ยิง และเรียก workspace:Raycast() เพื่อตรวจจับว่าโดนศัตรูหรือไม่',
    taskObjectives: [
      'สร้าง RaycastParams ด้วย RaycastParams.new()',
      'ตั้งค่า FilterType และ FilterDescendantsInstances เพื่อข้ามตัวละครผู้ยิง',
      'เรียก workspace:Raycast(origin, direction, params)'
    ],
    starterCode: `local function fireRay(origin: Vector3, direction: Vector3, shooterCharacter: Model)
    -- 1. สร้าง RaycastParams
    local params = nil -- เติม RaycastParams.new()
    
    -- 2. ตั้งค่าให้ข้ามตัวละครผู้ยิง (FilterType.Exclude)
    -- params.FilterType = Enum.RaycastFilterType.Exclude
    -- params.FilterDescendantsInstances = { shooterCharacter }
    
    -- 3. ยิง Raycast
    local result = nil -- เติม workspace:Raycast(...)
    
    if result then
        print("ยิงโดนชิ้นส่วน: " .. result.Instance.Name)
        print("พิกัดจุดกระทบ: " .. tostring(result.Position))
    end
    
    return result
end`,
    solutionCode: `local function fireRay(origin: Vector3, direction: Vector3, shooterCharacter: Model)
    local params = RaycastParams.new()
    params.FilterType = Enum.RaycastFilterType.Exclude
    params.FilterDescendantsInstances = { shooterCharacter }

    local result = workspace:Raycast(origin, direction, params)

    if result then
        print("ยิงโดนชิ้นส่วน: " .. result.Instance.Name)
    end

    return result
end`,
    solutionExplanation: 'RaycastParams ช่วยกรองชิ้นส่วนที่ไม่ต้องการให้โดน เช่น หมวก หรือปืนของผู้ยิงเอง เมื่อเรียก `workspace:Raycast` เอนจินจะคืนค่า `RaycastResult` พร้อมตำแหน่งตกกระทบที่แม่นยำ',
    hints: [
      'สร้างอ็อบเจกต์ด้วย RaycastParams.new()',
      'ตั้งค่า FilterDescendantsInstances = { shooterCharacter }',
      'ยิงด้วย workspace:Raycast(origin, direction, params)'
    ],
    testCriteria: [
      {
        id: 'c1',
        label: 'สร้าง RaycastParams.new()',
        checkFnName: 'checkRaycastParams',
        failureTip: 'ต้องมีคำสั่ง RaycastParams.new()'
      },
      {
        id: 'c2',
        label: 'ตั้งค่า FilterDescendantsInstances เพื่อละเว้นผู้ยิง',
        checkFnName: 'checkFilterInstances',
        failureTip: 'ต้องกำหนด params.FilterDescendantsInstances = { shooterCharacter }'
      },
      {
        id: 'c3',
        label: 'เรียกใช้ workspace:Raycast(...)',
        checkFnName: 'checkWorkspaceRaycast',
        failureTip: 'ต้องเรียกฟังก์ชัน workspace:Raycast(origin, direction, params)'
      }
    ]
  }
];
