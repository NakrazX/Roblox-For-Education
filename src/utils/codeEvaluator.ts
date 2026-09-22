import { CodeChallenge } from '../types';

export interface EvaluationResult {
  passed: boolean;
  score: number;
  testResults: {
    id: string;
    label: string;
    passed: boolean;
    failureTip?: string;
  }[];
  syntaxErrors: string[];
  feedbackSummary: string;
}

export function evaluateLuauScript(challenge: CodeChallenge, code: string): EvaluationResult {
  const cleanCode = code.replace(/--.*$/gm, ''); // remove comments for syntax checking
  const testResults: { id: string; label: string; passed: boolean; failureTip?: string }[] = [];
  const syntaxErrors: string[] = [];

  // 1. Basic Luau structural balance checks
  const openParens = (cleanCode.match(/\(/g) || []).length;
  const closeParens = (cleanCode.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    syntaxErrors.push(`วงเล็บ ( ) ไม่สมดุล: พบวงเล็บเปิด ${openParens} ตัว แต่มีวงเล็บปิด ${closeParens} ตัว`);
  }

  const openBraces = (cleanCode.match(/\{/g) || []).length;
  const closeBraces = (cleanCode.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    syntaxErrors.push(`วงเล็บปีกกา { } ไม่สมดุล: พบ { ${openBraces} ตัว แต่มี } ${closeBraces} ตัว`);
  }

  // Count function/if/for/while vs 'end'
  const blockStarters = (cleanCode.match(/\b(function|if|for|while|do)\b/g) || []).length;
  const blockEnds = (cleanCode.match(/\bend\b/g) || []).length;
  if (blockStarters > blockEnds) {
    syntaxErrors.push(`พบการเปิดบล็อกโค้ด (function, if, for, while) ${blockStarters} จุด แต่มี 'end' ปิดเพียง ${blockEnds} จุด`);
  }

  // 2. Evaluate specific challenge criteria
  for (const criterion of challenge.testCriteria) {
    let criterionPassed = false;

    switch (criterion.checkFnName) {
      // Challenge 1: Lava Kill Brick
      case 'checkTouched':
        criterionPassed = /\.Touched\s*:\s*Connect\s*\(/i.test(cleanCode) || /Touched:Connect/i.test(cleanCode);
        break;
      case 'checkFindHumanoid':
        criterionPassed = /FindFirstChild(?:WhichIsA)?\s*\(\s*["']Humanoid["']\s*\)/i.test(cleanCode) ||
                          /hit\.Parent\s*:\s*FindFirstChild/i.test(cleanCode);
        break;
      case 'checkDamage':
        criterionPassed = /\.Health\s*=\s*0/i.test(cleanCode) ||
                          /:TakeDamage\s*\(/i.test(cleanCode) ||
                          /\.Health\s*-=/i.test(cleanCode);
        break;

      // Challenge 2: Remote Listener
      case 'checkOnServerEvent':
        criterionPassed = /\.OnServerEvent\s*:\s*Connect\s*\(/i.test(cleanCode);
        break;
      case 'checkPlayerArg':
        criterionPassed = /function\s*\(\s*player\b/i.test(cleanCode) ||
                          /function\s*\(\s*plr\b/i.test(cleanCode);
        break;
      case 'checkCondition':
        criterionPassed = /\bif\s+.*then\b/i.test(cleanCode) &&
                          (/Potion/i.test(cleanCode) || /item/i.test(cleanCode));
        break;

      // Challenge 3: Safe DataStore
      case 'checkPcall':
        criterionPassed = /\bpcall\s*\(\s*function\s*\(/i.test(cleanCode);
        break;
      case 'checkAsyncCall':
        criterionPassed = /:(?:SetAsync|UpdateAsync)\s*\(/i.test(cleanCode);
        break;
      case 'checkSuccessBranch':
        criterionPassed = /\bif\s+success\s+then\b/i.test(cleanCode);
        break;

      // Challenge 4: UI Tween
      case 'checkTweenInfo':
        criterionPassed = /TweenInfo\.new\s*\(/i.test(cleanCode);
        break;
      case 'checkTweenCreate':
        criterionPassed = /TweenService\s*:\s*Create\s*\(/i.test(cleanCode);
        break;
      case 'checkTweenPlay':
        criterionPassed = /:Play\s*\(\s*\)/i.test(cleanCode);
        break;

      // Challenge 5: CollectionService
      case 'checkGetTagged':
        criterionPassed = /CollectionService\s*:\s*GetTagged\s*\(\s*["']Coin["']\s*\)/i.test(cleanCode) ||
                          /GetTagged\s*\(/i.test(cleanCode);
        break;
      case 'checkForLoop':
        criterionPassed = /\bfor\s+.*in\s+(?:ipairs|pairs)\s*\(.*tag/i.test(cleanCode) ||
                          /\bfor\s+.*in\s+taggedCoins\b/i.test(cleanCode) ||
                          /\bfor\s+.*in\s+ipairs/i.test(cleanCode);
        break;
      case 'checkPropertyAccess':
        criterionPassed = /\.CanCollide\s*=\s*false/i.test(cleanCode) ||
                          /\.Transparency\s*=/i.test(cleanCode) ||
                          /print\s*\(/i.test(cleanCode);
        break;

      // Challenge 6: Raycast
      case 'checkRaycastParams':
        criterionPassed = /RaycastParams\.new\s*\(\s*\)/i.test(cleanCode);
        break;
      case 'checkFilterInstances':
        criterionPassed = /FilterDescendantsInstances\s*=\s*\{/i.test(cleanCode) ||
                          /FilterType\s*=/i.test(cleanCode);
        break;
      case 'checkWorkspaceRaycast':
        criterionPassed = /workspace\s*:\s*Raycast\s*\(/i.test(cleanCode);
        break;

      default:
        criterionPassed = cleanCode.length > 30;
    }

    testResults.push({
      id: criterion.id,
      label: criterion.label,
      passed: criterionPassed,
      failureTip: criterionPassed ? undefined : criterion.failureTip
    });
  }

  const passedTestsCount = testResults.filter(t => t.passed).length;
  const totalTests = testResults.length;
  const hasSyntaxError = syntaxErrors.length > 0;
  const allTestsPassed = passedTestsCount === totalTests && !hasSyntaxError;
  const score = Math.round((passedTestsCount / (totalTests || 1)) * 100);

  let feedbackSummary = '';
  if (allTestsPassed) {
    feedbackSummary = 'ยอดเยี่ยมมาก! สคริปต์ Luau ของคุณผ่านเกณฑ์การทดสอบทั้งหมดอย่างถูกต้องและปลอดภัย';
  } else if (hasSyntaxError) {
    feedbackSummary = 'พบข้อผิดพลาดด้านโครงสร้างไวยากรณ์ (Syntax) ในสคริปต์ กรุณาตรวจสอบการปิดวงเล็บและคำว่า end';
  } else {
    feedbackSummary = `ผ่านการตรวจสอบ ${passedTestsCount} จาก ${totalTests} ข้อ ดูคำแนะนำในรายการที่ยังไม่ผ่านเพื่อแก้ไข`;
  }

  return {
    passed: allTestsPassed,
    score: hasSyntaxError ? Math.min(score, 40) : score,
    testResults,
    syntaxErrors,
    feedbackSummary
  };
}
