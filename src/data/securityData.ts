import { SecurityVulnerability, RoadmapStep } from '../types';

export const SECURITY_VULNERABILITIES: SecurityVulnerability[] = [
  {
    id: 'vuln-remote-injection-shop',
    attackName: 'Remote Injection & Fake Balance Exploiting',
    thaiAttackName: 'ยิงรีโมตซื้อของฟรี / เสกเงินเข้าตัว',
    dangerLevel: 'Critical',
    category: 'Networking & Economy',
    officialDocUrl: 'https://create.roblox.com/docs/scripting/events/remote',
    exploitMechanism: 'แฮกเกอร์ใช้โปรแกรมอย่าง Synapse / Fluxus หรือ RemoteSpy เปิดดูชื่อรีโมต แล้วยิงคำสั่ง FireServer พร้อมส่งค่าเงินหรือไอเทมที่ต้องการเข้าเซิร์ฟเวอร์โดยตรง หากเซิร์ฟเวอร์ไม่ตรวจยอดเงินจริงในกระเป๋า',
    hackerPayloadExample: `-- สคริปต์ที่แฮกเกอร์รันบนเครื่องตนเอง (Client-side Exploit)
local buyRemote = game:GetService("ReplicatedStorage"):WaitForChild("BuyItemEvent")
-- แฮกเกอร์ยิงขอไอเทมดาบทองคำ และส่งราคา 0 หรือไม่ส่งเงินเลย
buyRemote:FireServer("LegendarySword", 0) 
-- หรือรัวยิง 500 ครั้งใน 1 วินาทีเพื่อขโมยของทั้งหมดในร้าน`,
    vulnerableCode: `-- ❌ โค้ดที่มีช่องโหว่ร้ายแรง (VULNERABLE)
local buyRemote = game:GetService("ReplicatedStorage").BuyItemEvent

buyRemote.OnServerEvent:Connect(function(player, itemName, itemPrice)
    -- หายนะ: เซิร์ฟเวอร์เชื่อ itemPrice ที่ Client ส่งมา หรือไม่เช็กเงินใน Database!
    local inventory = player.Inventory
    inventory:AddItem(itemName)
    print(player.Name .. " ซื้อ " .. itemName .. " ราคา " .. itemPrice)
end)`,
    vulnerableExplanation: 'เซิร์ฟเวอร์เชื่อราคา `itemPrice` ที่ส่งมาจากผู้เล่น และไม่ได้ตรวจสอบว่าผู้เล่นมีเงินเพียงพอหรือไม่ แฮกเกอร์สามารถส่งราคา 0 หรือของฟรีได้ทันที',
    securedCode: `-- 🟢 โค้ดที่ปลอดภัย 100% (SECURED)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local DataManager = require(game:GetService("ServerScriptService").DataManager)

-- ตารางราคาสินค้าอยู่บนเซิร์ฟเวอร์เท่านั้น Client แก้ไขไม่ได้
local ITEM_CATALOG: { [string]: number } = {
    ["IronSword"] = 100,
    ["LegendarySword"] = 5000,
}

local buyRemote = ReplicatedStorage.BuyItemEvent

-- ระบบจำกัดความถี่การยิง (Rate Limiting / Debounce ต่อผู้เล่น)
local playerCooldowns: { [number]: number } = {}

buyRemote.OnServerEvent:Connect(function(player: Player, itemName: string)
    -- 1. ป้องกันการสแปมยิงรีโมตรัวๆ (Rate Limit 0.5 วินาที)
    local now = os.clock()
    local lastTime = playerCooldowns[player.UserId] or 0
    if now - lastTime < 0.5 then
        warn("Spam detected from: " .. player.Name)
        return
    end
    playerCooldowns[player.UserId] = now

    -- 2. ตรวจสอบว่าสินค้ามีอยู่จริงในระบบหรือไม่
    local actualPrice = ITEM_CATALOG[itemName]
    if not actualPrice then
        warn("Invalid item attempted by: " .. player.Name)
        return
    end

    -- 3. ตรวจสอบยอดเงินจริงจาก Server State
    local playerCoins = DataManager.getCoins(player)
    if playerCoins < actualPrice then
        warn("Not enough coins: " .. player.Name)
        return
    end

    -- 4. หักเงินและมอบของบนเซิร์ฟเวอร์
    DataManager.deductCoins(player, actualPrice)
    DataManager.addItemToInventory(player, itemName)
    print(player.Name .. " ซื้อสำเร็จอย่างปลอดภัย!")
end)`,
    securedExplanation: 'ราคาถูกกำหนดไว้บนเซิร์ฟเวอร์ Client ส่งมาได้แค่ "ชื่อไอเทม" เซิร์ฟเวอร์ทำการตรวจสอบ Rate Limit, ยอดเงินจริง และหักเงินก่อนส่งมอบของ แฮกเกอร์จึงไม่สามารถโกงราคาได้',
    defensePattern: 'Never Trust The Client: Client ส่งได้เฉพาะเจตนา (Intent) ให้ Server คำนวณความถูกต้องทั้งหมด'
  },
  {
    id: 'vuln-dupe-session-lock',
    attackName: 'DataStore Dupe Glitch & Race Condition',
    thaiAttackName: 'ปั๊มไอเทม / ก็อปของด้วยการสลับเซิร์ฟเวอร์ (Dupe Glitch)',
    dangerLevel: 'Critical',
    category: 'DataStores & Cloud',
    officialDocUrl: 'https://create.roblox.com/docs/cloud-services/datastores',
    exploitMechanism: 'แฮกเกอร์ใช้เทคนิคเปิด 2 หน้าต่าง หรือให้เพื่อนส่งเทรดไอเทมในเซิร์ฟเวอร์ A แล้วแฮกเกอร์รีบกด Alt+F4 หรือย้ายไปเซิร์ฟเวอร์ B ภายในเสี้ยววินาที ทำให้เกิด Race Condition เซิร์ฟเวอร์ A บันทึกช้ากว่าเซิร์ฟเวอร์ B ทำให้ไอเทมเบิ้ลกลายเป็น 2 ชิ้น',
    hackerPayloadExample: `-- แฮกเกอร์มักกระทำดังนี้:
-- 1. เข้าเกมเซิร์ฟเวอร์ A และส่งไอเทมมูลค่าสูงให้บัญชีตัวแทน (Trade)
-- 2. ตัดการเชื่อมต่อทันที (Disconnect/Lag switch) ก่อน DataStore บนเซิร์ฟเวอร์ A จะทันเซฟ
-- 3. เข้าเซิร์ฟเวอร์ B ทันที ไอเทมยังคงอยู่ครบทั้งสองฝั่ง กลายเป็นของปั๊ม!`,
    vulnerableCode: `-- ❌ โค้ดที่ไม่มีระบบ Session Locking (VULNERABLE)
local DataStoreService = game:GetService("DataStoreService")
local myStore = DataStoreService:GetDataStore("Inventory_v1")

game.Players.PlayerAdded:Connect(function(player)
    -- โหลดข้อมูลทันทีโดยไม่สนใจว่าเซิร์ฟเวอร์เก่ากำลังเซฟค้างอยู่หรือไม่
    local data = myStore:GetAsync("User_" .. player.UserId)
end)

game.Players.PlayerRemoving:Connect(function(player)
    -- เซฟทับทันที มีโอกาสเกิด Race Condition ทับซ้อน
    myStore:SetAsync("User_" .. player.UserId, playerInventory[player])
end)`,
    vulnerableExplanation: 'การใช้ `GetAsync` และ `SetAsync` ทั่วไปโดยไม่มีการลงกลอน (Session Lock) จะเกิดข้อผิดพลาดร้ายแรงเมื่อผู้เล่นสลับห้องไวๆ ข้อมูลจะเขียนทับสลับกันจนไอเทมคูณสองหรือสูญหาย',
    securedCode: `-- 🟢 โค้ดระบบ Session Locking ป้องกันของปั๊ม (SECURED)
-- หรือใช้งานไลบรารีมาตรฐานระดับโลก เช่น ProfileService
local DataStoreService = game:GetService("DataStoreService")
local inventoryStore = DataStoreService:GetDataStore("Inventory_Locked_v2")

local function loadWithSessionLock(player: Player)
    local key = "Player_" .. player.UserId
    local currentSessionToken = game.JobId -- รหัสเฉพาะของเซิร์ฟเวอร์นี้

    local success, data = pcall(function()
        return inventoryStore:UpdateAsync(key, function(oldData)
            oldData = oldData or { coins = 0, items = {}, activeSession = nil, sessionExpiry = 0 }

            -- ตรวจสอบว่ามีเซิร์ฟเวอร์อื่นล็อกอยู่หรือไม่
            local now = os.time()
            if oldData.activeSession and oldData.activeSession ~= currentSessionToken then
                if now < oldData.sessionExpiry then
                    -- เซิร์ฟเวอร์เก่ายังเซฟไม่เสร็จ ปฏิเสธการเข้าเพื่อกันปั๊มของ!
                    return nil
                end
            end

            -- ทำการล็อกเซสชันไว้กับเซิร์ฟเวอร์นี้เป็นเวลา 5 นาที
            oldData.activeSession = currentSessionToken
            oldData.sessionExpiry = now + 300
            return oldData
        end)
    end)

    if not success or not data then
        player:Kick("กำลังประมวลผลข้อมูลจากเซิร์ฟเวอร์ก่อนหน้า กรุณารอ 1 นาทีแล้วเข้าใหม่")
        return nil
    end

    return data
end`,
    securedExplanation: 'Session Locking จะติดป้ายกำกับ JobId ของเซิร์ฟเวอร์ลงใน Database หากผู้เล่นสลับห้องไว เซิร์ฟเวอร์ใหม่จะไม่ยอมให้เล่นจนกว่าเซิร์ฟเวอร์เก่าจะปล่อยกลอน ป้องกันการก็อปปี้ไอเทมได้ 100%',
    defensePattern: 'Session Locking: ยอมให้มีเพียง 1 เซิร์ฟเวอร์เท่านั้นที่ถือสิทธิ์แก้ไขข้อมูลผู้เล่น ณ ขณะใดขณะหนึ่ง'
  },
  {
    id: 'vuln-speed-teleport-hack',
    attackName: 'Speed Hack & Instant Teleportation',
    thaiAttackName: 'แฮกความเร็วเดินทะลุโลก & วาร์ปเก็บของ',
    dangerLevel: 'High',
    category: 'Physics & Movement',
    officialDocUrl: 'https://create.roblox.com/docs/physics',
    exploitMechanism: 'บน Roblox ฝั่ง Client มี Physics Ownership บนตัวละครของตนเอง แฮกเกอร์จึงสามารถแก้ `Humanoid.WalkSpeed = 500` หรือย้ายพิกัด `CFrame` ไปยังจุดจบของ Obby ได้ทันที',
    hackerPayloadExample: `-- สคริปต์แฮกเกอร์รันบน Client:
local char = game.Players.LocalPlayer.Character
char.Humanoid.WalkSpeed = 150 -- วิ่งเร็วกว่าปกติ 10 เท่า
-- หรือวาร์ปไปเก็บเหรียญบนฟ้า
char.HumanoidRootPart.CFrame = CFrame.new(0, 1000, 0)`,
    vulnerableCode: `-- ❌ โค้ดที่เชื่อตำแหน่งของผู้เล่น (VULNERABLE)
local finishLine = workspace.FinishLine

finishLine.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if player then
        -- ใครแตะเส้นชัยคนแรกชนะทันที (แฮกเกอร์วาร์ปมาแตะใน 0.1 วินาที!)
        giveWinReward(player)
    end
end)`,
    vulnerableExplanation: 'ไม่ได้มีการตรวจสอบระยะทางหรือเวลาที่ใช้ แฮกเกอร์สามารถวาร์ปมาแตะเส้นชัยได้ตั้งแต่เริ่มเกม 1 วินาที',
    securedCode: `-- 🟢 โค้ดตรวจสอบความเร็วและการวาร์ปบนเซิร์ฟเวอร์ (SECURED)
local RunService = game:GetService("RunService")
local Players = game:GetService("Players")

local MAX_SPEED = 24 -- ความเร็วปกติคือ 16 studs/sec เผื่อแล็กให้ไม่เกิน 24
local lastPositions: { [Player]: Vector3 } = {}
local lastCheckTimes: { [Player]: number } = {}

-- ตรวจสอบการเคลื่อนไหวทุก 1 วินาที
task.spawn(function()
    while true do
        task.wait(1.0)
        local now = os.clock()

        for _, player in ipairs(Players:GetPlayers()) do
            local char = player.Character
            local root = char and char:FindFirstChild("HumanoidRootPart")
            
            if root and root:IsA("BasePart") then
                local lastPos = lastPositions[player]
                local lastTime = lastCheckTimes[player]

                if lastPos and lastTime then
                    local dt = now - lastTime
                    local distance = (root.Position - lastPos).Magnitude
                    local calculatedSpeed = distance / dt

                    -- หากเคลื่อนที่เร็วกว่าเกณฑ์ทางกายภาพ ดึงตัวกลับหรือเตือน
                    if calculatedSpeed > MAX_SPEED * 1.5 then
                        warn("Speed/Teleport detected from: " .. player.Name .. " Speed: " .. calculatedSpeed)
                        root.CFrame = CFrame.new(lastPos) -- ดึงกลับตำแหน่งเดิม (Rubberband)
                    else
                        lastPositions[player] = root.Position
                        lastCheckTimes[player] = now
                    end
                else
                    lastPositions[player] = root.Position
                    lastCheckTimes[player] = now
                end
            end
        end
    end
end)`,
    securedExplanation: 'เซิร์ฟเวอร์บันทึกพิกัดก่อนหน้าและคำนวณ `distance / deltaTime` หากพบว่าเคลื่อนที่เร็วกว่าสปีดสูงสุด เซิร์ฟเวอร์จะดึงผู้เล่นกลับตำแหน่งเดิมทันที (Rubberband Effect)',
    defensePattern: 'Server-Side Sanity Check: วัดระยะทางตามสมการความเร็วกายภาพบน Server เสมอ'
  },
  {
    id: 'vuln-weapon-damage-hack',
    attackName: 'Client-Side Hit & Damage Spoofing',
    thaiAttackName: 'แฮกดาเมจปืน 999,999 ดาเมจ & ยิงทะลุกำแพง',
    dangerLevel: 'Critical',
    category: 'Combat & Security',
    officialDocUrl: 'https://create.roblox.com/docs/physics/raycasting',
    exploitMechanism: 'เกมปืนที่เขียนไม่ดีมักให้ Client ยิง Raycast เอง คำนวณดาเมจเอง แล้วส่งดาเมจไปบอก Server ว่า "ฉันยิงศัตรูนี้ได้ 1,000 ดาเมจนะ" แฮกเกอร์จึงสามารถ One-Hit Kill บอสทั้งเกมได้',
    hackerPayloadExample: `-- สคริปต์แฮกเกอร์ยิงผ่าน Remote:
local gunRemote = game.ReplicatedStorage.GunDamageEvent
-- ส่งศัตรูเป้าหมายพร้อมดาเมจ 999999
gunRemote:FireServer(workspace.BossMonster, 999999)`,
    vulnerableCode: `-- ❌ โค้ดคำนวณดาเมจบนเครื่องผู้เล่น (VULNERABLE)
local damageRemote = game.ReplicatedStorage.GunDamageEvent

damageRemote.OnServerEvent:Connect(function(player, targetCharacter, damageAmount)
    local targetHumanoid = targetCharacter:FindFirstChild("Humanoid")
    if targetHumanoid then
        targetHumanoid:TakeDamage(damageAmount) -- หายนะ! ยอมรับดาเมจตามใจผู้เล่น
    end
end)`,
    vulnerableExplanation: 'ให้ผู้เล่นเป็นคนบอกดาเมจ `damageAmount` แฮกเกอร์เปลี่ยนดาเมจเป็นล้านได้ทันที หรือสั่งหักเลือดผู้เล่นคนอื่นทั่วแมปโดยไม่ต้องเล็งปืน',
    securedCode: `-- 🟢 โค้ดตรวจสอบวิถีกระสุนและคิดดาเมจบน Server (SECURED)
local damageRemote = game.ReplicatedStorage.GunFireEvent
local WEAPON_DAMAGE = 35
local MAX_RANGE = 200

damageRemote.OnServerEvent:Connect(function(player: Player, targetCharacter: Model, hitPosition: Vector3)
    local shooterChar = player.Character
    local shooterRoot = shooterChar and shooterChar:FindFirstChild("HumanoidRootPart")
    local targetHumanoid = targetCharacter and targetCharacter:FindFirstChildWhichIsA("Humanoid")
    local targetRoot = targetCharacter and targetCharacter:FindFirstChild("HumanoidRootPart")

    if not (shooterRoot and targetHumanoid and targetRoot) then return end

    -- 1. ตรวจสอบระยะห่าง (Range Check)
    local distance = (shooterRoot.Position - targetRoot.Position).Magnitude
    if distance > MAX_RANGE then
        warn("Shooting out of range: " .. player.Name)
        return
    end

    -- 2. ตรวจสอบสิ่งกีดขวาง (Raycast Wall Check - กันยิงทะลุกำแพง)
    local rayParams = RaycastParams.new()
    rayParams.FilterType = Enum.RaycastFilterType.Exclude
    rayParams.FilterDescendantsInstances = { shooterChar, targetCharacter }

    local origin = shooterRoot.Position
    local direction = (targetRoot.Position - origin)
    local wallHit = workspace:Raycast(origin, direction, rayParams)

    if wallHit then
        warn("Shot blocked by wall: " .. player.Name)
        return -- มีกำแพงขวางอยู่ ยิงไม่เข้า
    end

    -- 3. มอบดาเมจคงที่จาก Server เท่านั้น
    targetHumanoid:TakeDamage(WEAPON_DAMAGE)
end)`,
    securedExplanation: 'ดาเมจถูกกำหนดตายตัวบนเซิร์ฟเวอร์ พร้อมยิง Raycast ตรวจสอบว่ามีกำแพงกั้นระหว่างผู้ยิงกับเป้าหมายหรือไม่ และตรวจสอบระยะยิง ไม่เปิดโอกาสให้ยิงทะลุกำแพง',
    defensePattern: 'Server-Authoritative Combat: เซิร์ฟเวอร์ตรวจสอบ Line-of-Sight, Range, และกำหนด Damage เอง'
  },
  {
    id: 'vuln-infinite-ammo-spam',
    attackName: 'Infinite Ammo & Rapid Fire Exploit',
    thaiAttackName: 'กระสุนไม่จำกัด & สแปมยิง 1,000 นัดต่อวินาที',
    dangerLevel: 'High',
    category: 'Combat & Rate Limiting',
    officialDocUrl: 'https://create.roblox.com/docs/scripting/events/remote',
    exploitMechanism: 'แฮกเกอร์ตัดสคริปต์นับกระสุนฝั่ง Client ทิ้ง แล้วยิงคำสั่ง FireServer ถี่ยิบโดยไม่ต้องกด Reload ทำให้ปืนกลายเป็น Minigun ยิงไม่จำกัด',
    hackerPayloadExample: `-- สคริปต์แฮกเกอร์วนลูปยิงไม่หยุด:
while true do
    task.wait() -- รันทุก 0.03 วินาที
    game.ReplicatedStorage.ShootRemote:FireServer()
end`,
    vulnerableCode: `-- ❌ โค้ดที่เชื่อว่าผู้เล่นมีกระสุนจริง (VULNERABLE)
local shootRemote = game.ReplicatedStorage.ShootRemote

shootRemote.OnServerEvent:Connect(function(player)
    -- เซิร์ฟเวอร์ไม่นับกระสุน ปล่อยให้ยิงได้เรื่อยๆ
    spawnBulletEffect(player)
end)`,
    vulnerableExplanation: 'เซิร์ฟเวอร์ไม่ได้เก็บตัวแปร Ammo ไว้ จึงไม่รู้ว่าผู้เล่นเหลือกี่นัด และไม่ได้ดักจับความถี่ในการยิง',
    securedCode: `-- 🟢 โค้ดเก็บสถานะกระสุนและเวลา Cooldown บน Server (SECURED)
local FIRE_RATE = 0.15 -- ยิงได้เร็วสุดนัดละ 0.15 วินาที
local MAGAZINE_SIZE = 30

type PlayerWeaponState = {
    ammo: number,
    lastShotTime: number,
    isReloading: boolean
}

local weaponStates: { [Player]: PlayerWeaponState } = {}

local function getWeaponState(player: Player): PlayerWeaponState
    if not weaponStates[player] then
        weaponStates[player] = { ammo = MAGAZINE_SIZE, lastShotTime = 0, isReloading = false }
    end
    return weaponStates[player]
end

local shootRemote = game.ReplicatedStorage.ShootRemote

shootRemote.OnServerEvent:Connect(function(player: Player)
    local state = getWeaponState(player)
    local now = os.clock()

    -- 1. ตรวจสอบ Cooldown (Fire Rate)
    if now - state.lastShotTime < FIRE_RATE then
        return -- สแปมเร็วกว่าอัตราการยิงจริง ปฏิเสธทันที
    end

    -- 2. ตรวจสอบกระสุน
    if state.ammo <= 0 or state.isReloading then
        warn("Out of ammo or reloading: " .. player.Name)
        return
    end

    state.lastShotTime = now
    state.ammo -= 1
    print(player.Name .. " ยิงสำเร็จ กระสุนเหลือ: " .. state.ammo)
end)`,
    securedExplanation: 'เก็บจำนวนกระสุนจริงและประทับเวลา (Timestamp) ไว้บนเซิร์ฟเวอร์ หากผู้เล่นส่งคำสั่งเร็วกว่า `FIRE_RATE` หรือกระสุนหมด เซิร์ฟเวอร์จะปฏิเสธคำสั่งทันที',
    defensePattern: 'Stateful Server Validation: จัดการสถานะทรัพยากร (Ammo/Mana/Stamina) บน Server'
  },
  {
    id: 'vuln-noclip-chests',
    attackName: 'Noclip & Collision Bypass',
    thaiAttackName: 'แฮกเดินทะลุกำแพง / วิ่งผ่านประตูเลเซอร์ (Noclip)',
    dangerLevel: 'Medium',
    category: 'Physics & Collision',
    officialDocUrl: 'https://create.roblox.com/docs/physics/collision-filtering',
    exploitMechanism: 'แฮกเกอร์เปลี่ยนค่า `CanCollide = false` บนตัวละครตนเอง เพื่อเดินทะลุกำแพง ประตูล็อก หรือผ่านเส้นเลเซอร์กับดักเข้าไปหยิบสมบัติในห้องบอส',
    hackerPayloadExample: `-- สคริปต์ Noclip:
for _, part in ipairs(game.Players.LocalPlayer.Character:GetDescendants()) do
    if part:IsA("BasePart") then
        part.CanCollide = false -- เดินทะลุกำแพงทุกชนิดในเกม
    end
end`,
    vulnerableCode: `-- ❌ โค้ดที่วางหีบสมบัติไว้เฉยๆ ไม่ตรวจการผ่านประตู (VULNERABLE)
local treasureChest = workspace.TreasureChest

treasureChest.ProximityPrompt.Triggered:Connect(function(player)
    -- ให้สมบัติทันทีที่กดติด โดยไม่เช็กว่าเปิดประตูล็อกหรือยัง
    giveTreasure(player)
end)`,
    vulnerableExplanation: 'ผู้เล่นที่ใช้ Noclip เดินทะลุกำแพงเข้ามาสามารถกดเปิดหีบได้ทันทีโดยไม่ต้องผ่านด่านหรือไขประตูล็อก',
    securedCode: `-- 🟢 โค้ดตรวจสอบความถูกต้องของเงื่อนไขในเกม (SECURED)
local treasureChest = workspace.TreasureChest
local GameState = require(game.ServerScriptService.GameState)

treasureChest.ProximityPrompt.Triggered:Connect(function(player: Player)
    -- 1. ตรวจสอบสถานะว่าด่านนี้ปลดล็อกประตูหรือยัง
    if not GameState.isDungeonDoorOpened() then
        warn("Dungeon door is still locked! Exploiter detected: " .. player.Name)
        return
    end

    -- 2. ตรวจสอบระยะห่างระหว่างผู้เล่นกับหีบ
    local char = player.Character
    local root = char and char:FindFirstChild("HumanoidRootPart")
    if not root or (root.Position - treasureChest.Position).Magnitude > 15 then
        return
    end

    -- 3. ตรวจสอบ Line of Sight ป้องกันการกดจากหลังกำแพง
    local rayParams = RaycastParams.new()
    rayParams.FilterType = Enum.RaycastFilterType.Exclude
    rayParams.FilterDescendantsInstances = { char, treasureChest }
    
    local ray = workspace:Raycast(root.Position, treasureChest.Position - root.Position, rayParams)
    if ray then
        warn("Obstacle between player and chest: " .. player.Name)
        return
    end

    GameState.claimTreasure(player)
end)`,
    securedExplanation: 'เซิร์ฟเวอร์เช็กสถานะเงื่อนไขของด่าน (เช่น ประตูต้องเปิดแล้ว) และเช็ก Line-of-Sight ว่าไม่มีกำแพงกั้น แม้แฮกเกอร์จะเดินทะลุกำแพงเข้ามาได้ ก็ไม่สามารถกดรับสมบัติได้',
    defensePattern: 'Prerequisite State Checking: ต้องผ่านเงื่อนไขของเกมจริงก่อนเท่านั้น Server ถึงจะมอบรางวัล'
  }
];

export const PRODUCTION_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 'step-1-architecture',
    title: 'Single-Script & Modular Architecture',
    thaiTitle: 'สถาปัตยกรรมเกมแบบโมดูลาร์ (Single-Script Architecture)',
    phase: 'Phase 1: Foundation',
    description: 'หยุดก๊อปปี้สคริปต์กระจายตาม Part ต่างๆ! ออกแบบเกมด้วยโครงสร้าง Single-Script Architecture โดยมี Main Server Script และ Main Client Script ทำหน้าที่เป็นตัวเริ่มต้นระบบ (Bootstrap) แล้วแบ่งโค้ดออกเป็น ModuleScripts เช่น DataService, CombatService, UIService',
    keyDeliverables: [
      'สร้างโครงสร้างโฟลเดอร์ใน ServerScriptService (Services, Components, Managers)',
      'สร้าง ReplicatedStorage (Controllers, SharedModules, NetworkPackets)',
      'ใช้ Knit Framework หรือ Vanilla ModuleScript Service Pattern'
    ],
    securityChecklist: [
      'แยกโค้ดความลับ (Secret logic, Formulas, Drop rates) ไว้ใน ServerScriptService / ServerStorage ไม่ให้ Client เห็น',
      'วางเฉพาะสิ่งที่ต้องแชร์ร่วมกัน (Animation, Sound ID, UI Config) ใน ReplicatedStorage'
    ],
    officialDocUrl: 'https://create.roblox.com/docs/scripting/modules'
  },
  {
    id: 'step-2-anti-cheat',
    title: 'Never Trust The Client & Remote Hardening',
    thaiTitle: 'รากฐานความปลอดภัยและกันโปร (Anti-Exploit Core)',
    phase: 'Phase 2: Security',
    description: 'จำลองว่าผู้เล่นทุกคนคือแฮกเกอร์ที่สามารถเปิดโค้ดอ่านและยิง Remote อะไรก็ได้ ออกแบบทุกฟังก์ชันให้อยู่ภายใต้หลักการ Server-Authoritative ไม่ส่งดาเมจตรงๆ ไม่ส่งเงินตรงๆ และใส่ Rate Limiting ดักจับการสแปม',
    keyDeliverables: [
      'สร้างระบบ Rate Limiter ป้องกันการสแปมยิง RemoteEvent ถี่เกินจริง',
      'เขียนระบบตรวจจับความเร็วเกินจริง (Movement Sanity Check) บน Server',
      'ออกแบบระบบ Combat ให้ Server เป็นผู้คำนวณ Hitbox และ Damage 100%'
    ],
    securityChecklist: [
      'ตรวจสอบ type ของพารามิเตอร์ทุกตัวที่รับมาจาก OnServerEvent ด้วย typeof()',
      'ห้ามสร้าง RemoteEvent สั่งซื้อของที่รับพารามิเตอร์เป็น "จำนวนเงิน" เด็ดขาด'
    ],
    officialDocUrl: 'https://create.roblox.com/docs/scripting/events/remote'
  },
  {
    id: 'step-3-session-locking',
    title: 'Bulletproof Persistence & Session Locking',
    thaiTitle: 'ระบบเซฟข้อมูลคลาวด์และกันของปั๊ม (Session Locking)',
    phase: 'Phase 3: Persistence',
    description: 'ป้องกันปัญหาของหายและบั๊กปั๊มไอเทม (Dupe Glitch) ด้วยระบบ Session Locking ผ่าน UpdateAsync หรือใช้งานไลบรารีมาตรฐาน ProfileService พร้อมระบบ Auto-Save ทุก 5 นาที และบันทึกประวัติการซื้อ (Receipt History)',
    keyDeliverables: [
      'เขียนระบบ Session Lock ตรวจสอบ JobId ของเซิร์ฟเวอร์',
      'ตั้งเวลา Auto-Save ทุก 3-5 นาที และเซฟเมื่อผู้เล่นออกจากเกม (PlayerRemoving)',
      'ใส่ BindToClose บน Server เพื่อรอเซฟข้อมูลผู้เล่นทุกคนให้เสร็จก่อนเซิร์ฟเวอร์ปิดตัว'
    ],
    securityChecklist: [
      'ครอบคำสั่ง DataStore ทุกครั้งด้วย pcall()',
      'ตรวจสอบขนาดข้อมูล (Data Limit) ไม่ให้เกิน 4MB ต่อ Key'
    ],
    officialDocUrl: 'https://create.roblox.com/docs/cloud-services/datastores'
  },
  {
    id: 'step-4-game-loop',
    title: 'Production State Machine & Match Loop',
    thaiTitle: 'ระบบวัฏจักรเกมและสถานะห้อง (Game State Loop)',
    phase: 'Phase 4: Game Loop',
    description: 'สร้าง State Machine ที่ชัดเจนสำหรับจัดการรอบเกม เช่น Lobby -> Intermission -> Match Starting -> In Game -> Match Over -> Rewards Cleanup เพื่อให้เกมไม่มีวันติดบั๊กค้างกลางคัน และคืนค่า Memory สะอาดทุกรอบ',
    keyDeliverables: [
      'สร้างตัวแปรหรือ ValueObject ซิงค์สถานะเกม (GameState) ให้ทุกคนเห็นพร้อมกัน',
      'ระบบ Teleport ผู้เล่นเข้า Arena และ Teleport กลับมายัง Lobby อย่างปลอดภัย',
      'ระบบ Cleanup ทำลายโมเดลมอนสเตอร์และล้างอาร์เรย์ตัวแปรเมื่อจบรอบ'
    ],
    securityChecklist: [
      'ตัดการเชื่อมต่อ Event Listener (:Disconnect()) ทุกครั้งที่จบแมตช์เพื่อป้องกัน Memory Leak',
      'ใช้ DebrisService ทำลาย Projectiles และ Particle Effects'
    ],
    officialDocUrl: 'https://create.roblox.com/docs/scripting/multithreading/run-service'
  },
  {
    id: 'step-5-cross-platform',
    title: 'Cross-Platform UI & Device Support',
    thaiTitle: 'รองรับทุกอุปกรณ์: มือถือ คอนโซล และ PC (Cross-Platform)',
    phase: 'Phase 5: UX & Polish',
    description: 'ผู้เล่น Roblox มากกว่า 60% เล่นบนสมาร์ตโฟนและแท็บเล็ต! เกมที่มีคุณภาพต้องออกแบบ UI ด้วย Scale + UIAspectRatioConstraint และรองรับทั้งการแตะหน้าจอ จอยคอนโทรลเลอร์ (ContextActionService) และเมาส์คีย์บอร์ด',
    keyDeliverables: [
      'ตั้งค่า AnchorPoint = (0.5, 0.5) และใช้ Scale แทน Offset สำหรับ UI Elements',
      'ใช้ UIAspectRatioConstraint เพื่อไม่ให้ภาพบิดเบี้ยวบนจอ iPad หรือมือถือจอยาว',
      'ผูกปุ่มจอยเกมและปุ่มมือถือด้วย ContextActionService:BindAction'
    ],
    securityChecklist: [
      'ตรวจสอบว่า Touch Targets บนมือถือมีขนาดอย่างน้อย 44x44 pixels',
      'ทดสอบจำลองขนาดหน้าจอผ่าน Device Emulator ใน Studio ก่อนขึ้นโปรดักชัน'
    ],
    officialDocUrl: 'https://create.roblox.com/docs/ui'
  },
  {
    id: 'step-6-safe-monetization',
    title: 'Ethical Monetization & ProcessReceipt',
    thaiTitle: 'ระบบขายของและการตัดเงิน Robux ที่ถูกต้องปลอดภัย',
    phase: 'Phase 6: Monetization',
    description: 'การทำระบบขายของผ่าน MarketplaceService ต้องรองรับกรณีผู้เล่นจ่าย Robux แล้วแต่เซิร์ฟเวอร์หลุดหรือแครช ต้องใช้ฟังก์ชัน ProcessReceipt ที่เป็น Idempotent (ไม่ตัดเงินซ้ำและไม่ทำของหาย)',
    keyDeliverables: [
      'ตั้งค่า MarketplaceService.ProcessReceipt เพียงจุดเดียวในเกม',
      'บันทึก PurchaseId ลงใน DataStore ก่อนคืนค่า PurchaseGranted',
      'ระบบ Gamepass Checking ด้วย UserOwnsGamePassAsync พร้อมแคชในเกม'
    ],
    securityChecklist: [
      'ห้ามคืนค่า PurchaseGranted จนกว่าจะบันทึกของลง Database สำเร็จ',
      'ตรวจสอบว่าหากเป็นสินค้าคืนค่า NotProcessedYet Roblox จะพยายามส่งคำสั่งมาใหม่ใน 3 วัน'
    ],
    officialDocUrl: 'https://create.roblox.com/docs/production/monetization'
  }
];
