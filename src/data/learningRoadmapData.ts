import { LearningRoadmapStage } from '../types';

/**
 * ============================================================================
 * ROBLOX DEVELOPER LEARNING ROADMAP GUIDE (คู่มือเส้นทางการเรียนรู้สู่การเป็นนักพัฒนาเกมมืออาชีพ)
 * ============================================================================
 * 
 * 💡 คำแนะนำสำหรับผู้ใช้ที่ต้องการเพิ่มเนื้อหา / ข้อมูลในอนาคต:
 * 1. คุณสามารถเพิ่ม Stage ใหม่ลงใน Array `LEARNING_ROADMAP_STAGES` ด้านล่างได้เลย
 * 2. แต่ละ Stage สามารถเพิ่ม `keyTopicsToStudy` (หัวข้อทฤษฎี), `handsOnPractices` (โจทย์ปฏิบัติการ)
 *    และ `whatYouWillAchieve` (ผลลัพธ์ที่จะทำได้) ได้ตามต้องการ
 * 3. หากมีโจทย์ใน Code Lab เพิ่มเติม สามารถใส่ `challengeId` ให้ตรงกันเพื่อให้ผู้เรียนกดปุ่มไปทำโจทย์ได้ทันที
 */

export const LEARNING_ROADMAP_STAGES: LearningRoadmapStage[] = [
  {
    id: 'stage-1-fundamentals',
    stepNumber: 1,
    stageName: 'Luau & Engine Fundamentals',
    thaiStageName: 'ก้าวที่ 1: พื้นฐานภาษา Luau และโครงสร้าง Roblox Engine',
    estimatedHours: '4 - 6 ชั่วโมง',
    badgeTitle: '🌱 Luau Apprentice',
    shortSummary: 'ทำความเข้าใจชนิดของสคริปต์ (Script, LocalScript, ModuleScript), ตำแหน่งการวางไฟล์ที่ถูกต้อง, และไวยากรณ์ Luau สมัยใหม่',
    whyLearnFirst: 'หากเริ่มต้นโดยไม่เข้าใจว่าโค้ดบรรทัดนี้รันบน "เครื่องผู้เล่น (Client)" หรือ "เซิร์ฟเวอร์กลาง (Server)" จะทำให้เกิดบั๊กที่แก้ยากที่สุดในภายหลัง เช่น UI ไม่ขึ้น หรือคนอื่นมองไม่เห็นสิ่งที่เปลี่ยนไป การเข้าใจพื้นฐานนี้จะช่วยประหยัดเวลาแก้งานได้หลายสิบชั่วโมง',
    prerequisites: ['ความรู้พื้นฐานการใช้เมาส์ คีย์บอร์ด', 'Roblox Studio ติดตั้งเรียบร้อย'],
    keyTopicsToStudy: [
      {
        topicId: 'script-types-hierarchy',
        title: 'Script vs LocalScript vs ModuleScript',
        description: 'เข้าใจขอบเขตการทำงานของสคริปต์ 3 ชนิด และตำแหน่งการวางใน Explorer เช่น ServerScriptService, StarterGui, ReplicatedStorage',
        docUrl: 'https://create.roblox.com/docs/scripting/scripts'
      },
      {
        title: 'Luau Strict Type Checking & Variables',
        description: 'การใส่ Type ให้ตัวแปร เช่น `local score: number = 0` เพื่อให้ Studio ช่วยเตือนก่อนเกิดบั๊ก',
        docUrl: 'https://create.roblox.com/docs/luau/type-checking'
      },
      {
        title: 'Instance Hierarchy & Referencing',
        description: 'การเข้าถึงวัตถุด้วย `:WaitForChild()`, `:FindFirstChild()`, และการเข้าใจ Parent-Child relationship',
        docUrl: 'https://create.roblox.com/docs/scripting/engine-hierarchy'
      }
    ],
    handsOnPractices: [
      {
        title: 'สร้างบล็อกลาวาเหยียบแล้วตาย (Lava Kill Brick)',
        challengeId: 'challenge-1-kill-brick',
        description: 'ฝึกเขียน Event `Touched` ดักจับตัวละครผู้เล่น ดึง Humanoid และสั่ง `TakeDamage(100)` อย่างถูกต้อง',
        expectedCodeSnippet: 'part.Touched:Connect(function(hit) ... end)'
      },
      {
        title: 'เขียน ModuleScript ฟังก์ชันคำนวณคณิตศาสตร์เบื้องต้น',
        description: 'สร้างโมดูลที่ Reusable ส่งค่ากลับด้วย return table เพื่อให้สคริปต์อื่นเรียกใช้ซ้ำได้'
      }
    ],
    whatYouWillAchieve: [
      'เข้าใจ 100% ว่าโค้ดใดต้องวางไว้ที่ Server และโค้ดใดต้องทำงานบน Client',
      'เขียนสคริปต์ตอบสนองต่อเหตุการณ์การสัมผัส (Touched) และการตายของตัวละครได้',
      'อ่าน Error Message ใน Output Window ออก และรู้ทันทีว่าลืมใส่ WaitForChild หรือไม่'
    ],
    proTipsForSuccess: [
      'อย่าก็อปปี้สคริปต์วางสะเปะสะปะใน Workspace ให้พยายามเก็บโค้ดไว้ใน ServerScriptService เสมอ',
      'ใช้ `local` นำหน้าชื่อตัวแปรทุกครั้งเพื่อไม่ให้กลายเป็น Global Variable'
    ],
    nextStageTeaser: 'เมื่อเข้าใจโครงสร้างแล้ว ก้าวต่อไปคือการเชื่อมต่อระหว่างหน้าจอผู้เล่นกับเซิร์ฟเวอร์ด้วย RemoteEvent!'
  },
  {
    id: 'stage-2-networking-security',
    stepNumber: 2,
    stageName: 'Client-Server Networking & Security Core',
    thaiStageName: 'ก้าวที่ 2: โครงข่าย Client-Server และกฎเหล็กความปลอดภัย',
    estimatedHours: '6 - 8 ชั่วโมง',
    badgeTitle: '🛡️ Network Defender',
    shortSummary: 'หัวใจสำคัญที่สุดของเกม Roblox: การสื่อสารผ่าน RemoteEvent, RemoteFunction, และการป้องกันโปรแกรมโกงด้วยกฎ Never Trust The Client',
    whyLearnFirst: 'เกมกว่า 90% ของมือใหม่ถูกแฮกเกอร์ป่วนห้องหรือเสกเงินได้ เพราะเขียนโค้ดให้ Server เชื่อข้อมูลที่ส่งมาจาก Client หากเรียนรู้การดักจับและตรวจสอบความถูกต้อง (Sanity Check) ตั้งแต่ตอนนี้ เกมของคุณจะปลอดภัยตั้งแต่วันแรกที่ปล่อย',
    prerequisites: ['ผ่านก้าวที่ 1: เข้าใจความแตกต่างของ Script และ LocalScript'],
    keyTopicsToStudy: [
      {
        topicId: 'remote-events-networking',
        title: 'RemoteEvent: FireServer & OnServerEvent',
        description: 'การส่งสัญญาณการกระทำจากหน้าจอผู้เล่นไปยังเซิร์ฟเวอร์แบบทางเดียว (One-way Networking)',
        docUrl: 'https://create.roblox.com/docs/scripting/events/remote'
      },
      {
        title: 'RemoteFunction: InvokeServer & คืนค่าผลลัพธ์',
        description: 'การเรียกคำสั่งแบบ Two-way Request/Response เช่น การถามยอดเงินคงเหลือจาก Server',
        docUrl: 'https://create.roblox.com/docs/scripting/events/remote#remotefunctions'
      },
      {
        topicId: 'security-anti-exploit-server',
        title: 'กฎเหล็ก Never Trust The Client & Rate Limiting',
        description: 'จำลองว่า Client ถูกแฮกเกอร์เจาะเสมอ! การตรวจสอบ typeof(), Cooldown, และระยะทางทางกายภาพ',
        docUrl: 'https://create.roblox.com/docs/scripting/events/remote'
      }
    ],
    handsOnPractices: [
      {
        title: 'เขียนระบบรับคำสั่งซื้อไอเทมที่ปลอดภัย (Secure Purchase Remote)',
        challengeId: 'challenge-2-secure-remote',
        description: 'เขียน OnServerEvent ดักรับคำสั่งซื้อ ตรวจสอบว่ามีเงินพอหรือไม่ โดยที่ราคาสินค้าต้องคำนวณบน Server เท่านั้น',
        expectedCodeSnippet: 'remote.OnServerEvent:Connect(function(player, itemId) ... end)'
      },
      {
        title: 'ทดลองส่งแพ็กเก็ตผ่าน Network Simulator ในแอพนี้',
        description: 'ดูการจำลองแพ็กเก็ตวิ่งข้ามสายแลนจาก StarterGui ไปยัง ServerScriptService'
      }
    ],
    whatYouWillAchieve: [
      'สามารถทำปุ่ม UI กดซื้อของแล้วไอเทมโผล่ในกระเป๋าจริงโดยไม่มีบั๊กเสกของฟรี',
      'เข้าใจวิธีป้องกันสคริปต์แฮกเกอร์ที่พยายามสแปม FireServer ด้วยระบบ Rate Limiting',
      'ไม่ตกหลุมพรางส่งค่าตัวเลขดาเมจหรือยอดเงินจาก Client ไปยัง Server อีกต่อไป'
    ],
    proTipsForSuccess: [
      'Client ส่งได้แค่ "เจตนา" (เช่น ฉันขอยิงปืนนัดนี้) แต่ Server เป็นผู้ "ตัดสิน" (เช่น กระสุนเหลือกี่นัด เลือดลดเท่าไหร่)',
      'จำลองการยิงคำสั่งใน Anti-Exploit Lab ของแอพนี้เพื่อดูว่าแฮกเกอร์โจมตีอย่างไร'
    ],
    nextStageTeaser: 'เมื่อระบบเครือข่ายปลอดภัยแล้ว ก้าวต่อไปคือการสร้างการโต้ตอบในโลก 3D ด้วย Raycast และ Interaction!'
  },
  {
    id: 'stage-3-spatial-physics',
    stepNumber: 3,
    stageName: 'Physics, Spatial Interaction & Raycasting',
    thaiStageName: 'ก้าวที่ 3: ระบบปฏิสัมพันธ์ในโลก 3 มิติ ฟิสิกส์ และ Raycasting',
    estimatedHours: '5 - 7 ชั่วโมง',
    badgeTitle: '🎯 Spatial Engineer',
    shortSummary: 'สร้างระบบปุ่มกดแบบในเกมจริง (ProximityPrompt), การยิงเลเซอร์ตรวจจับแนวสายตา (Raycasting), และการวนลูปเกมด้วย RunService',
    whyLearnFirst: 'เกมที่ดีต้องมีการโต้ตอบที่ลื่นไหล ผู้เล่นต้องสามารถเดินไปกดเปิดประตู คุยกับ NPC หรือเล็งยิงเป้าหมายได้อย่างแม่นยำ ไม่ทะลุกำแพง และไม่ดีเลย์',
    prerequisites: ['ผ่านก้าวที่ 1 และ 2: เขียนฟังก์ชันและเชื่อมโยง Event ได้คล่องแคล่ว'],
    keyTopicsToStudy: [
      {
        topicId: 'proximity-prompt-interaction',
        title: 'ProximityPrompt: ระบบกดปุ่มโต้ตอบแบบ AAA',
        description: 'แสดงปุ่ม [E] อัตโนมัติเมื่อเดินเข้าใกล้วัตถุ รองรับทั้ง PC, Mobile (แตะจอ), และ Console',
        docUrl: 'https://create.roblox.com/docs/ui/proximity-prompts'
      },
      {
        title: 'WorldRoot:Raycast & RaycastParams',
        description: 'การยิงรังสีเสมือนเพื่อตรวจจับสิ่งกีดขวาง แนวสายตา (Line of Sight) และระบบปืน Hitscan',
        docUrl: 'https://create.roblox.com/docs/physics/spatial-queries'
      },
      {
        topicId: 'runservice-loops-timing',
        title: 'RunService: Heartbeat, Stepped & RenderStepped',
        description: 'เข้าใจการวนลูปของเอนจินเกม 60 FPS และการคำนวณ Delta Time เพื่อให้การเคลื่อนไหวสมูททุกสเปกคอม',
        docUrl: 'https://create.roblox.com/docs/scripting/services/run-service'
      }
    ],
    handsOnPractices: [
      {
        title: 'สร้างระบบปืนเลเซอร์ Raycast ตรวจจับดาเมจ',
        challengeId: 'challenge-4-raycast-weapon',
        description: 'ยิง Raycast จากปลายกระบอกปืน เช็คว่าโดนตัวละครหรือไม่ และตรวจสอบว่าไม่มีกำแพงกั้น',
        expectedCodeSnippet: 'workspace:Raycast(origin, direction, params)'
      },
      {
        title: 'สร้างประตูเปิด-ปิดอัตโนมัติด้วย ProximityPrompt และ Tween',
        description: 'ผู้เล่นเดินเข้าไปกด E ค้างไว้ 1 วินาทีเพื่อปลดล็อกประตู'
      }
    ],
    whatYouWillAchieve: [
      'สามารถทำระบบอาวุธปืนหรือดาบที่ไม่เกิดบั๊กฟันทะลุกำแพง',
      'ทำระบบคุยกับ NPC, กล่องสุ่มของ, หรือจุดคราฟต์ไอเทมด้วย ProximityPrompt มาตรฐานสากล',
      'จัดการการเคลื่อนไหวที่อิงตามเวลาจริง (dt) ทำให้ผู้เล่นเน็ตช้าหรือเฟรมเรตต่ำเล่นได้ลื่นไหลเท่ากัน'
    ],
    proTipsForSuccess: [
      'ใส่ `CollisionGroup` หรือ `RaycastParams.FilterDescendantsInstances` เพื่อละเว้นตัวละครของตัวเองตอนยิงปืน',
      'หลีกเลี่ยงการใช้ `while wait() do` ให้เปลี่ยนมาใช้ `RunService.Heartbeat` แทนเสมอ'
    ],
    nextStageTeaser: 'เมื่อกลไกการเล่นพร้อม ก้าวต่อไปคือการจัดระเบียบโค้ดทั้งเกม และแต่งเติมแสง สี เสียง ให้ดูน่าเล่น!'
  },
  {
    id: 'stage-4-architecture-polish',
    stepNumber: 4,
    stageName: 'Code Architecture, Animation & Audio Polish',
    thaiStageName: 'ก้าวที่ 4: สถาปัตยกรรมโค้ดระดับสตูดิโอ และการขัดเกลาเกม (Polish)',
    estimatedHours: '5 - 7 ชั่วโมง',
    badgeTitle: '✨ Polish & Architecture Master',
    shortSummary: 'จัดระเบียบสคริปต์ด้วย CollectionService (Single Source of Truth), อนิเมชัน UI สุดเนียนด้วย TweenService, และระบบเสียง 3 มิติ',
    whyLearnFirst: 'เกมระดับ 100 ผู้เล่นจะแล็กทันทีหากมีสคริปต์ 1,000 ตัวทำงานแยกกันในแต่ละชิ้นส่วน การรวมศูนย์โค้ดไว้จุดเดียวช่วยให้เกมกินแรมน้อย และการเพิ่มเสียงกับอนิเมชันจะเปลี่ยนเกมธรรมดาให้กลายเป็นเกมที่น่าเล่นระดับมืออาชีพ',
    prerequisites: ['ผ่านก้าวที่ 1 - 3: เข้าใจการทำงานของ Instance และ Event'],
    keyTopicsToStudy: [
      {
        topicId: 'collectionservice-tags',
        title: 'CollectionService & Tagging: จัดการวัตถุนับหมื่นในสคริปต์เดียว',
        description: 'ใช้ Tag Editor ติดป้ายกำกับวัตถุ แล้วเขียนโค้ดควบคุมเพียง 1 บรรทัด เช่น จุดเช็คพอยต์, เหรียญเก็บคะแนน',
        docUrl: 'https://create.roblox.com/docs/scripting/services/collection-service'
      },
      {
        topicId: 'tweenservice-animation',
        title: 'TweenService & Easing Styles: ขยับทุกอย่างให้ลื่นไหล',
        description: 'สร้างภาพเคลื่อนไหวที่นุ่มนวลให้ชิ้นส่วน กล้อง หรือแถบเลือด UI ด้วย Quad, Sine, Bounce',
        docUrl: 'https://create.roblox.com/docs/ui/animation'
      },
      {
        topicId: 'sound-service-3d-audio',
        title: 'SoundService & Positional 3D Audio',
        description: 'สร้างมิติเสียงระเบิด เสียงฝีเท้า และเสียงบรรยากาศที่ดังเบาตามระยะห่างจริงของผู้ฟัง',
        docUrl: 'https://create.roblox.com/docs/sound'
      }
    ],
    handsOnPractices: [
      {
        title: 'สร้างระบบเหรียญทองทั้งเกมด้วย CollectionService',
        challengeId: 'challenge-5-collectionservice',
        description: 'เขียนสคริปต์เดียวดักจับ Part ทั้งหมดที่มีแท็ก "Coin" หมุนชิ้นส่วนและเก็บคะแนนเมื่อเหยียบ',
        expectedCodeSnippet: 'CollectionService:GetTagged("Coin")'
      },
      {
        title: 'ทำแถบเลือด UI เลื่อนลดลงอย่างนุ่มนวลด้วย TweenService',
        description: 'สร้าง TweenInfo 0.3 วินาที สไตล์ OutQuad ให้แถบเลือดไม่ลดลงแบบกระตุก'
      }
    ],
    whatYouWillAchieve: [
      'ลดจำนวนสคริปต์ในเกมจาก 500 ไฟล์เหลือเพียงสคริปต์หลักไม่กี่ตัว เกมโหลดไวขึ้น 5 เท่า',
      'สร้างหน้าต่าง UI ที่เปิดปิดด้วยเอนิเมชันเด้งดึ๋ง สวยงามน่าประทับใจ',
      'บรรยากาศเสียงในเกมมีทิศทาง ผู้เล่นสามารถฟังเสียงฝีเท้าศัตรูได้จากซ้าย-ขวาอย่างแม่นยำ'
    ],
    proTipsForSuccess: [
      'ใช้ `CollectionService:GetInstanceAddedSignal` เสมอ เพื่อให้วัตถุที่เกิดใหม่ตอนเล่นเกมทำงานได้อัตโนมัติ',
      'อย่าลืมตรวจสอบว่าเปิดใช้งาน Sound.RollOffMode และกำหนด MaxDistance เหมาะสมกับขนาดห้อง'
    ],
    nextStageTeaser: 'เกมจะสมบูรณ์ไม่ได้ถ้าผู้เล่นออกเกมแล้วของหาย! ก้าวต่อไปคือการสร้างระบบเซฟระดับ Enterprise'
  },
  {
    id: 'stage-5-cloud-persistence',
    stepNumber: 5,
    stageName: 'Cloud DataStores & Session Locking Anti-Dupe',
    thaiStageName: 'ก้าวที่ 5: ฐานข้อมูลคลาวด์ และระบบเซฟป้องกันของปั๊ม (Session Locking)',
    estimatedHours: '6 - 9 ชั่วโมง',
    badgeTitle: '💾 Data Persistence Architect',
    shortSummary: 'บันทึกเลเวล เงิน ไอเทมของผู้เล่นลงบน Roblox Cloud ด้วยความปลอดภัยสูงสุด ป้องกันข้อมูลหายตอนเซิร์ฟเวอร์ชัตดาวน์ และสกัดกั้นบั๊กปั๊มของ',
    whyLearnFirst: 'ผู้เล่นจะเลิกเล่นเกมของคุณทันทีหากพวกเขาฟาร์มของมาทั้งวันแล้วของหาย! ยิ่งไปกว่านั้นหากมีบั๊กปั๊มไอเทมจากการสลับเซิร์ฟเวอร์เร็วๆ ระบบเศรษฐกิจในเกมจะพังทลาย การทำ Session Locking คือศาสตร์ขั้นสูงที่แยกสตูดิโอมืออาชีพออกจากมือสมัครเล่น',
    prerequisites: ['ผ่านก้าวที่ 1 - 4: เขียนโค้ดแบบ Table Dictionary และ pcall ได้คล่อง'],
    keyTopicsToStudy: [
      {
        topicId: 'datastores-persistence',
        title: 'DataStoreService & Safe Pcall Wrappers',
        description: 'การอ่าน-เขียนข้อมูลข้ามเซสชันด้วย `GetAsync` / `SetAsync` พร้อมการดักจับข้อผิดพลาดคลาวด์',
        docUrl: 'https://create.roblox.com/docs/cloud-services/datastores'
      },
      {
        topicId: 'datastore-session-locking-guide',
        title: 'Session Locking: กลอนล็อกเซสชันป้องกัน Dupe Glitch',
        description: 'ใช้ `UpdateAsync` บันทึก JobId ป้องกันไม่ให้ผู้เล่นเปิดเซสชันใน 2 เซิร์ฟเวอร์พร้อมกันเพื่อโคลนของ',
        docUrl: 'https://create.roblox.com/docs/cloud-services/datastores'
      },
      {
        title: 'Game:BindToClose & Server Auto-Saving Loop',
        description: 'การเซฟข้อมูลผู้เล่นทุกคนโดยอัตโนมัติทุก 3-5 นาที และบันทึกข้อมูลก่อนเซิร์ฟเวอร์ปิดปรับปรุง',
        docUrl: 'https://create.roblox.com/docs/cloud-services/datastores#server-shutdown'
      }
    ],
    handsOnPractices: [
      {
        title: 'เขียนระบบโหลดและเซฟเงินผู้เล่นด้วย pcall ปลอดภัย',
        challengeId: 'challenge-3-datastore-pcall',
        description: 'เขียนสคริปต์โหลดข้อมูลเมื่อ PlayerAdded และเซฟข้อมูลเมื่อ PlayerRemoving พร้อมตรวจจับ error',
        expectedCodeSnippet: 'pcall(function() return store:GetAsync(key) end)'
      },
      {
        title: 'ศึกษาและทดลองใช้ ProfileService / ReplicaService ในโปรเจกต์',
        description: 'ทำความเข้าใจไลบรารียอดนิยมของวงการ Roblox ที่ใช้ในเกมระดับพันล้านวิว'
      }
    ],
    whatYouWillAchieve: [
      'ข้อมูลของผู้เล่นปลอดภัย 100% แม้เน็ต Roblox Cloud จะกระตุกชั่วคราว',
      'ไม่มีบั๊กผู้เล่นโคลนของหรือไอเทมหายเมื่อสลับห้อง หรือกดย้ายเซิร์ฟเวอร์แบบรวดเร็ว',
      'ระบบรองรับผู้เล่นหลายหมื่นคนพร้อมกันได้อย่างราบรื่น ไม่ติดขัดลิมิต DataStore Quota'
    ],
    proTipsForSuccess: [
      'อย่าใช้ `SetAsync` ในการอัปเดตข้อมูล เพราะจะเขียนทับข้อมูลใหม่กว่าโดยไม่รู้ตัว ให้ใช้ `UpdateAsync` เสมอ',
      'ตั้งชื่อ Key ด้วย UserId เสมอ เช่น `"Player_" .. player.UserId` เพื่อให้เป็นไปตามกฎ GDPR สากล'
    ],
    nextStageTeaser: 'เข้าสู่ขั้นตอนสุดท้าย: ประกอบชิ้นส่วนทั้งหมดเข้าเป็นเกมเต็มรูปแบบและสร้างรายได้จากผลงาน!'
  },
  {
    id: 'stage-6-production-monetization',
    stepNumber: 6,
    stageName: 'Production Game Loop, Mobile Support & Monetization',
    thaiStageName: 'ก้าวที่ 6: ระบบเกมลูปเต็มรูปแบบ การรองรับมือถือ และการสร้างรายได้จริง',
    estimatedHours: '8 - 12 ชั่วโมง',
    badgeTitle: '👑 Certified Game Creator',
    shortSummary: 'ร้อยเรียงทุกความรู้เข้าด้วยกันเป็น Match Loop (Lobby ➔ Fight ➔ Win), ปรับ UI ให้สมบูรณ์แบบบนสมาร์ตโฟน และสร้างระบบขาย Gamepass/DevProduct ที่ปลอดภัย',
    whyLearnFirst: 'นี่คือขั้นตอนที่เปลี่ยนสคริปต์ทดลองเล่นให้กลายเป็น "ผลิตภัณฑ์เชิงพาณิชย์" ที่พร้อมแข่งขันบนหน้า Explore ของ Roblox สามารถทำเงิน Robux จริง และมอบประสบการณ์เล่นเกมที่ลื่นไหลให้ผู้เล่นทั่วโลก',
    prerequisites: ['ผ่านก้าวที่ 1 - 5: มีระบบโค้ด ระบบเซฟ และระบบความปลอดภัยครบถ้วน'],
    keyTopicsToStudy: [
      {
        title: 'Match Game Loop & State Machine Pattern',
        description: 'การจัดการสถานะของเกม: รอผู้เล่น (Waiting) ➔ นับถอยหลัง (Intermission) ➔ เริ่มเกม (Round) ➔ มอบรางวัล (GameOver)',
        docUrl: 'https://create.roblox.com/docs/scripting'
      },
      {
        topicId: 'marketplace-monetization',
        title: 'MarketplaceService & ProcessReceipt Callback',
        description: 'ระบบขาย Developer Products และ Gamepass ที่ตัดเงินถูกต้อง คืนค่า PurchaseGranted ป้องกันการจ่ายเงินซ้ำ',
        docUrl: 'https://create.roblox.com/docs/production/monetization'
      },
      {
        title: 'Cross-Platform UI (Scale & UIAspectRatioConstraint)',
        description: 'ออกแบบหน้าจออินเทอร์เฟซให้แสดงผลสวยงามเท่าเทียมกันทุกขนาดจอ ตั้งแต่ iPhone ขนาดเล็กไปจนถึงจอคอม 4K',
        docUrl: 'https://create.roblox.com/docs/ui'
      }
    ],
    handsOnPractices: [
      {
        title: 'เขียน ProcessReceipt ป้องกัน Robux หาย',
        description: 'เขียนฟังก์ชันตรวจสอบว่าผู้เล่นเคยได้รับสินค้าใบเสร็จนี้หรือยัง หากได้แล้วให้คืนค่า Granted ทันที'
      },
      {
        title: 'ทดสอบเกมแบบจำลอง Device Emulator ใน Studio',
        description: 'สลับหน้าจอเป็น Mobile, Tablet, Console เพื่อปรับขนาดปุ่มให้มีขนาดอย่างน้อย 44px แตะง่าย'
      }
    ],
    whatYouWillAchieve: [
      'สามารถเผยแพร่เกมของตัวเอง (Publish Game) ขึ้นสู่สาธารณะได้อย่างมั่นใจ 100%',
      'มีเกมลูปที่เล่นซ้ำได้เรื่อยๆ (High Replayability) ไม่ค้าง ไม่เกิด Memory Leak',
      'มีช่องทางสร้างรายได้จาก Robux ผ่าน Gamepass และ Developer Product อย่างถูกต้องตามกฎหมาย',
      'ผู้เล่นจากโทรศัพท์มือถือ (ซึ่งเป็นประชากร 70% ของ Roblox) สามารถเล่นเกมคุณได้อย่างเพลิดเพลิน'
    ],
    proTipsForSuccess: [
      'ทดสอบเกมร่วมกับเพื่อนอย่างน้อย 3-5 คนก่อนเปิดสาธารณะเสมอ เพื่อดูความรู้สึกในการเล่นจริง (Game Feel)',
      'ใส่ระบบ Analytics หรือ GameAnalytics SDK เพื่อดูว่าผู้เล่นชอบด่านไหนและหลุดที่จุดใด'
    ],
    nextStageTeaser: 'ยินดีด้วย! คุณพร้อมแล้วสำหรับการเป็น Roblox Game Architect มืออาชีพ ออกใบรับรองในระบบได้ทันที!'
  }
];

/**
 * สรุปผลลัพธ์สุดท้ายที่จะได้เมื่อเรียนจบหลักสูตรทั้งหมด (Capstone Outcomes)
 */
export const CAPSTONE_GRADUATION_OUTCOMES = [
  {
    title: 'สร้างเกม Multiplayer คุณภาพสูงได้จริง',
    desc: 'มีความเข้าใจในสถาปัตยกรรม Client-Server สามารถทำเกมแนว Obby, Simulator, RPG, หรือ Action Arena ที่รองรับผู้เล่นพร้อมกันได้ราบรื่น',
    iconName: 'Gamepad2'
  },
  {
    title: 'ความปลอดภัยระดับสตูดิโอ (100% Anti-Exploit)',
    desc: 'รู้ทันเทคนิคของแฮกเกอร์ ป้องกัน Speed Hack, Teleport, Damage Hack, Remote Injection, และ Infinite Ammo ได้อย่างรัดกุม',
    iconName: 'ShieldCheck'
  },
  {
    title: 'ระบบเศรษฐกิจและเซฟข้อมูลที่ไม่พัง (Anti-Dupe)',
    desc: 'ใช้งาน DataStore และ Session Locking ได้อย่างเชี่ยวชาญ รับประกันว่าไอเทมและเงินของผู้เล่นจะไม่สูญหายและไม่มีบั๊กปั๊มของ',
    iconName: 'Database'
  },
  {
    title: 'รองรับผู้เล่นทุกอุปกรณ์ (Mobile First)',
    desc: 'ออกแบบ UI แบบ Responsive และระบบปุ่มสัมผัสที่ทำให้ผู้เล่น 70%+ บนมือถือและแท็บเล็ตเล่นได้อย่างสะดวกสบาย',
    iconName: 'Smartphone'
  },
  {
    title: 'พร้อมสร้างรายได้จริงจากผลงาน (Monetization Ready)',
    desc: 'เข้าใจกลไกการตลาดในเกม การขาย Gamepass และ Developer Products ผ่าน ProcessReceipt ที่ปลอดภัยและถูกต้องตามกฎ Roblox',
    iconName: 'Coins'
  },
  {
    title: 'มีใบรับรอง Certified Roblox Game Architect',
    desc: 'สามารถออกใบประกาศนียบัตรจบหลักสูตรเพื่อเป็นเกียรติประวัติ ยืนยันความรู้ความสามารถระดับโปรดักชัน',
    iconName: 'Award'
  }
];
