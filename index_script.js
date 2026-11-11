/**
 * BAFS Knowledge Management Portal - Modern Interactive Logic
 * Inspired by Conicle / Future Learning & Upskilling Platform
 */

// Global State
let currentLang = 'th';
let activeCategory = 'all';
let currentQuizCourseId = null;
let currentQuizAnswers = {};
let currentInfographicZoom = 1.0;
let currentLightboxZoom = 1.0;
let completedCourses = []; // No default completed courses (cleared per request)
let userBadges = [
    { id: 'b1', name: 'Strategic Thinker', badgeType: 'strategy', desc: 'ผ่านหลักสูตร Intrapreneurship & Strategy' },
    { id: 'b2', name: 'People-Centric Leader', badgeType: 'leadership', desc: 'ผ่านหลักสูตร Servant Leadership' },
    { id: 'b3', name: 'AI Explorer', badgeType: 'innovation', desc: 'ทดลองใช้งานระบบ AI Search & Smart Path' }
];

// 1. Comprehensive Masterclasses Catalog (Alphabetically Sorted A-Z)
const allCourses = [
    {
        id: 2,
        title: "Business Acumen with Business Simulation",
        title_th: "เสริมความเฉียบคมทางธุรกิจและการจำลองธุรกิจ",
        title_en: "Business Acumen with Business Simulation",
        category: "business",
        badgeText: "Business & Strategy",
        badgeText_th: "ธุรกิจและกลยุทธ์",
        badgeText_en: "Business & Strategy",
        badgeColor: "blue",
        year: "2025",
        duration: "30-40 นาที",
        duration_th: "30-40 นาที",
        duration_en: "30-40 mins",
        rating: "4.95",
        learners: "380+",
        learners_th: "380+ คน",
        learners_en: "380+ learners",
        instructor: "ผู้บริหารสายการเงิน & จำลองธุรกิจ BAFS",
        instructor_th: "ผู้บริหารสายการเงิน & จำลองธุรกิจ BAFS",
        instructor_en: "BAFS Corporate Finance & Business Simulation Executives",
        cover: "Cover/08_Business Acumen with Business Simulation.png",
        tags: ["Business Acumen", "5 Business Drivers", "TOWS Matrix", "Business Model Canvas", "Cash Flow", "Productivity Improvement"],
        desc: "สร้างความฉลาดรู้ทางธุรกิจแบบองค์รวม เข้าใจกลไกการขับเคลื่อนธุรกิจ 5 มิติ (Cash, Profit, Assets, Growth, People) และการออกแบบและประเมินคุณค่าทางธุรกิจผ่าน Business Model Canvas (BMC)",
        desc_th: "สร้างความฉลาดรู้ทางธุรกิจแบบองค์รวม เข้าใจกลไกการขับเคลื่อนธุรกิจ 5 มิติ (Cash, Profit, Assets, Growth, People) และการออกแบบและประเมินคุณค่าทางธุรกิจผ่าน Business Model Canvas (BMC)",
        desc_en: "Develop holistic business acumen across 5 Business Drivers (Cash, Profit, Assets, Growth, People), TOWS Matrix, and Business Model Canvas (BMC)."
    },
    {
        id: 5,
        title: "Design Thinking & Innovation Sprint",
        title_th: "กระบวนการคิดเชิงออกแบบและนวัตกรรม",
        title_en: "Design Thinking & Innovation Sprint",
        category: "innovation",
        badgeText: "Innovation & Design",
        badgeText_th: "นวัตกรรมและการออกแบบ",
        badgeText_en: "Innovation & Design",
        badgeColor: "coral",
        year: "2025",
        duration: "25-30 นาที",
        duration_th: "25-30 นาที",
        duration_en: "25-30 mins",
        rating: "4.96",
        learners: "490+",
        learners_th: "490+ คน",
        learners_en: "490+ learners",
        instructor: "Innovation & Transformation Team",
        instructor_th: "Innovation & Transformation Team",
        instructor_en: "Innovation & Transformation Team",
        cover: "Cover/01_Design_Thinking.png",
        tags: ["Design Thinking", "Empathy Interview", "Rapid Prototype", "Creative Thinking", "MVP", "Latent Needs"],
        desc: "กระบวนการคิดเชิงออกแบบ 5 ขั้นตอน (Empathize, Define, Ideate, Prototype, Test) เพื่อทำความเข้าใจปัญหาที่แท้จริงของผู้ใช้งาน ตีกรอบโจทย์ความท้าทาย ระดมความคิดสร้างสรรค์ และสร้างต้นแบบอย่างรวดเร็ว",
        desc_th: "กระบวนการคิดเชิงออกแบบ 5 ขั้นตอน (Empathize, Define, Ideate, Prototype, Test) เพื่อทำความเข้าใจปัญหาที่แท้จริงของผู้ใช้งาน ตีกรอบโจทย์ความท้าทาย ระดมความคิดสร้างสรรค์ และสร้างต้นแบบอย่างรวดเร็ว",
        desc_en: "Apply the 5-stage Design Thinking methodology (Empathize, Define, Ideate, Prototype, Test) to uncover latent needs and iterate service innovations."
    },
    {
        id: 7,
        title: "Finance for Non-Finance (THE ENTREPRENEUR)",
        title_th: "การเงินสำหรับผู้บริหารที่ไม่ใช่สายการเงิน",
        title_en: "Finance for Non-Finance (THE ENTREPRENEUR)",
        category: "business",
        badgeText: "Business & Strategy",
        badgeText_th: "ธุรกิจและกลยุทธ์",
        badgeText_en: "Business & Strategy",
        badgeColor: "blue",
        year: "2025",
        duration: "15-20 นาที",
        duration_th: "15-20 นาที",
        duration_en: "15-20 mins",
        rating: "4.94",
        learners: "460+",
        learners_th: "460+ คน",
        learners_en: "460+ learners",
        instructor: "ทีมผู้เชี่ยวชาญด้านการเงินองค์กรและการบริหารต้นทุน BAFS",
        instructor_th: "ทีมผู้เชี่ยวชาญด้านการเงินองค์กรและการบริหารต้นทุน BAFS",
        instructor_en: "BAFS Corporate Finance & Cost Management Experts",
        cover: "Cover/02_Finance for Non-Finance (THE ENTREPRENEUR).png",
        tags: ["Finance for Non-Finance", "P&L Structure", "EBITDA", "Variance Analysis", "Cost Behavior", "COGS vs SG&A", "Project Pitching", "Break-Even"],
        desc: "คู่มือการเรียนรู้ 'รู้จักและเข้าใจตัวเลข เสมือนเจ้าของกิจการ' เพื่อเปลี่ยนผ่านสู่ผู้นำระดับบริหารด้วยภาษากลางทางการเงิน โครงสร้างงบกำไรขาดทุน (P&L), การวิเคราะห์ Variance Analysis, พฤติกรรมต้นทุน และการทำแบบจำลองเพื่อ Pitch โครงการใหม่",
        desc_th: "คู่มือการเรียนรู้ 'รู้จักและเข้าใจตัวเลข เสมือนเจ้าของกิจการ' เพื่อเปลี่ยนผ่านสู่ผู้นำระดับบริหารด้วยภาษากลางทางการเงิน โครงสร้างงบกำไรขาดทุน (P&L), การวิเคราะห์ Variance Analysis, พฤติกรรมต้นทุน และการทำแบบจำลองเพื่อ Pitch โครงการใหม่",
        desc_en: "Master business financial literacy as a corporate entrepreneur. Understand universal P&L structures, EBITDA, cost behaviors, variance analysis, and financial modeling for project pitching."
    },
    {
        id: 6,
        title: "High-Impact Presentation & Pitching",
        title_th: "ศิลปะการนำเสนอและการ Pitching อย่างมืออาชีพ",
        title_en: "High-Impact Presentation & Pitching",
        category: "softskills",
        badgeText: "Soft Skills & Communication",
        badgeText_th: "ทักษะปฏิสัมพันธ์และการสื่อสาร",
        badgeText_en: "Soft Skills & Communication",
        badgeColor: "blue",
        year: "2025",
        duration: "30-40 นาที",
        duration_th: "30-40 นาที",
        duration_en: "30-40 mins",
        rating: "4.91",
        learners: "620+",
        learners_th: "620+ คน",
        learners_en: "620+ learners",
        instructor: "Executive Communication Specialist",
        instructor_th: "Executive Communication Specialist",
        instructor_en: "Executive Communication Specialist",
        cover: "Cover/05_Impactful Presentation.png",
        tags: ["Impactful Presentation", "Storytelling", "C.R.A.P. Design Rules", "Pitching", "Public Speaking", "Creative Thinking"],
        desc: "ยกระดับทักษะการนำเสนอและการ Pitching อย่างมืออาชีพ ผ่านโครงสร้าง 3 ขั้นตอน (Plan - Plot - Present) การวิเคราะห์ผู้ฟังด้วย Sandwich Model และกฎการออกแบบสไลด์ C.R.A.P. Rules",
        desc_th: "ยกระดับทักษะการนำเสนอและการ Pitching อย่างมืออาชีพ ผ่านโครงสร้าง 3 ขั้นตอน (Plan - Plot - Present) การวิเคราะห์ผู้ฟังด้วย Sandwich Model และกฎการออกแบบสไลด์ C.R.A.P. Rules",
        desc_en: "Deliver compelling executive presentations using Plan-Plot-Present structure, Sandwich Model audience analysis, and C.R.A.P. slide design principles."
    },
    {
        id: 1,
        title: "Intrapreneurship & Strategic Foresight",
        title_th: "การเป็นผู้ประกอบการในองค์กรและการมองอนาคต",
        title_en: "Intrapreneurship & Strategic Foresight",
        category: "business",
        badgeText: "Business & Strategy",
        badgeText_th: "ธุรกิจและกลยุทธ์",
        badgeText_en: "Business & Strategy",
        badgeColor: "coral",
        year: "2025",
        duration: "15-20 นาที",
        duration_th: "15-20 นาที",
        duration_en: "15-20 mins",
        rating: "4.9",
        learners: "420+",
        learners_th: "420+ คน",
        learners_en: "420+ learners",
        instructor: "ทีมผู้เชี่ยวชาญด้านกลยุทธ์ BAFS x Foresight Institute",
        instructor_th: "ทีมผู้เชี่ยวชาญด้านกลยุทธ์ BAFS x Foresight Institute",
        instructor_en: "BAFS Strategy Team x Foresight Institute",
        cover: "Cover/03_Intrapreneurship & Strategic Foresight.png",
        tags: ["Intrapreneurship", "Strategic Foresight", "Scenario Planning", "LEGO Serious Play", "5 Mega Trends", "Growth Mindset"],
        desc: "บ่มเพาะกรอบความคิดความเป็นผู้ประกอบการในองค์กร (Intrapreneurship Mindset) 'ทำตัวเป็นเจ้าของร่วมในบ้านหลังใหญ่' ควบคู่กับกระบวนการวางแผนภาพอนาคต 7 ขั้นตอน เพื่อให้องค์กรออกแบบกลยุทธ์ที่ยืดหยุ่น",
        desc_th: "บ่มเพาะกรอบความคิดความเป็นผู้ประกอบการในองค์กร (Intrapreneurship Mindset) 'ทำตัวเป็นเจ้าของร่วมในบ้านหลังใหญ่' ควบคู่กับกระบวนการวางแผนภาพอนาคต 7 ขั้นตอน เพื่อให้องค์กรออกแบบกลยุทธ์ที่ยืดหยุ่น",
        desc_en: "Cultivate an intrapreneurial mindset ('Co-ownership in a big house') paired with a 7-step scenario planning process to design agile organizational strategies."
    },
    {
        id: 9,
        title: "Personality & Executive Presence",
        title_th: "ภาพลักษณ์และบุคลิกภาพแบบมืออาชีพ",
        title_en: "Professional Personality & Executive Presence",
        category: "softskills",
        badgeText: "Soft Skills & Communication",
        badgeText_th: "ทักษะปฏิสัมพันธ์และการสื่อสาร",
        badgeText_en: "Soft Skills & Communication",
        badgeColor: "coral",
        year: "2025",
        duration: "35-45 นาที",
        duration_th: "35-45 นาที",
        duration_en: "35-45 mins",
        rating: "4.91",
        learners: "440+",
        learners_th: "440+ คน",
        learners_en: "440+ learners",
        instructor: "ทีมพัฒนาภาพลักษณ์และบุคลิกภาพองค์กร BAFS",
        instructor_th: "ทีมพัฒนาภาพลักษณ์และบุคลิกภาพองค์กร BAFS",
        instructor_en: "BAFS Corporate Image & Professional Grooming Team",
        cover: "Cover/04_Personality & Executive Presence.png",
        tags: ["Executive Presence", "First Impression", "Body Changes Your Mind", "The Anchor Gesture", "Fit is King", "Posture Mastery", "The Power Sphere", "Triangle Eye Contact"],
        desc: "พัฒนาภาพลักษณ์และบุคลิกภาพระดับมืออาชีพ สร้างความประทับใจแรกพบใน 3-7 วินาที (First Impression), จิตวิทยาร่างกาย Body Changes Your Mind, การแต่งกาย Fit is King, ภาษากาย The Power Sphere & Triangle Technique และมารยาทธุรกิจสากล",
        desc_th: "พัฒนาภาพลักษณ์และบุคลิกภาพระดับมืออาชีพ สร้างความประทับใจแรกพบใน 3-7 วินาที (First Impression), จิตวิทยาร่างกาย Body Changes Your Mind, การแต่งกาย Fit is King, ภาษากาย The Power Sphere & Triangle Technique และมารยาทธุรกิจสากล",
        desc_en: "Elevate your professional charisma and executive presence. Master first impressions (3-7s), psychological gestures, tailored attire standards ('Fit is King'), confident posture, and business etiquette."
    },
    {
        id: 3,
        title: "Servant Leadership",
        title_th: "ภาวะผู้นำแบบผู้สนับสนุน",
        title_en: "Servant Leadership",
        category: "leadership",
        badgeText: "Leadership & Management",
        badgeText_th: "ภาวะผู้นำและการจัดการ",
        badgeText_en: "Leadership & Management",
        badgeColor: "purple",
        year: "2025",
        duration: "30-40 นาที",
        duration_th: "30-40 นาที",
        duration_en: "30-40 mins",
        rating: "4.92",
        learners: "510+",
        learners_th: "510+ คน",
        learners_en: "510+ learners",
        instructor: "HR & Organization Development BAFS",
        instructor_th: "HR & Organization Development BAFS",
        instructor_en: "HR & Organization Development BAFS",
        cover: "Cover/06_Servant_Leadership.png",
        tags: ["Servant Leadership", "Psychological Safety", "Skill/Will Matrix", "Active Listening", "People Management", "Growth Mindset"],
        desc: "พัฒนาภาวะผู้นำแบบผู้สนับสนุน (Servant Leader) ที่เน้นบุคลากรเป็นศูนย์กลาง การสร้างบรรยากาศความปลอดภัยทางใจ (4 Stages of Psychological Safety) เพื่อพาพนักงานข้าม Fear Zone สู่ Growth Zone",
        desc_th: "พัฒนาภาวะผู้นำแบบผู้สนับสนุน (Servant Leader) ที่เน้นบุคลากรเป็นศูนย์กลาง การสร้างบรรยากาศความปลอดภัยทางใจ (4 Stages of Psychological Safety) เพื่อพาพนักงานข้าม Fear Zone สู่ Growth Zone",
        desc_en: "Empower people-centric Servant Leaders who foster the 4 Stages of Psychological Safety, lead with the Skill/Will Matrix, and build high-trust teams."
    },
    {
        id: 4,
        title: "Stakeholder Management & Negotiation",
        title_th: "การบริหารผู้มีส่วนได้ส่วนเสียและการเจรจาต่อรอง",
        title_en: "Stakeholder Management & Negotiation",
        category: "leadership",
        badgeText: "Leadership & Management",
        badgeText_th: "ภาวะผู้นำและการจัดการ",
        badgeText_en: "Leadership & Management",
        badgeColor: "coral",
        year: "2025",
        duration: "20-25 นาที",
        duration_th: "20-25 นาที",
        duration_en: "20-25 mins",
        rating: "4.88",
        learners: "350+",
        learners_th: "350+ คน",
        learners_en: "350+ learners",
        instructor: "ฝ่ายประสานงานยุทธศาสตร์และเจรจาธุรกิจ",
        instructor_th: "ฝ่ายประสานงานยุทธศาสตร์และเจรจาธุรกิจ",
        instructor_en: "Strategic Coordination & Commercial Negotiation Unit",
        cover: "Cover/07_Stakeholder Management & Negotiation.png",
        tags: ["Stakeholder Management", "Power-Interest Grid", "BATNA & ZOPA", "Trust Equation", "HARD Communication"],
        desc: "กระบวนการ 4 ขั้นตอนในการบริหารจัดการผู้มีส่วนได้ส่วนเสียอย่างเป็นระบบ (Identify, Analyze, Plan, Engage) การจำแนกกลุ่มด้วย Power-Interest Matrix และการเจรจาต่อรองแบบ Win-Win ด้วยแนวคิด BATNA และ ZOPA",
        desc_th: "กระบวนการ 4 ขั้นตอนในการบริหารจัดการผู้มีส่วนได้ส่วนเสียอย่างเป็นระบบ (Identify, Analyze, Plan, Engage) การจำแนกกลุ่มด้วย Power-Interest Matrix และการเจรจาต่อรองแบบ Win-Win ด้วยแนวคิด BATNA และ ZOPA",
        desc_en: "Master a 4-step stakeholder framework (Identify, Analyze, Plan, Engage), Power-Interest Grid, Trust Equation, and Win-Win BATNA & ZOPA negotiation."
    },
    {
        id: 8,
        title: "The Art of Business Dining",
        title_th: "ศิลปะการรับประทานอาหารเพื่อธุรกิจ",
        title_en: "The Art of Business Dining & Executive Etiquette",
        category: "softskills",
        badgeText: "Soft Skills & Communication",
        badgeText_th: "ทักษะปฏิสัมพันธ์และการสื่อสาร",
        badgeText_en: "Soft Skills & Communication",
        badgeColor: "purple",
        year: "2025",
        duration: "35-45 นาที",
        duration_th: "35-45 นาที",
        duration_en: "35-45 mins",
        rating: "4.96",
        learners: "480+",
        learners_th: "480+ คน",
        learners_en: "480+ learners",
        instructor: "สถาบันพัฒนาบุคลิกภาพและมารยาทสากล x HR BAFS",
        instructor_th: "สถาบันพัฒนาบุคลิกภาพและมารยาทสากล x HR BAFS",
        instructor_en: "Global Executive Presence & Protocol Academy x BAFS HR",
        cover: "Cover/09_The Art of Business Dining.png",
        tags: ["Business Dining", "Table Manners", "The Waiter Rule", "Seating Protocols", "Outside-In Cutlery", "Napkin Etiquette", "Wine Protocol", "FORM Small Talk"],
        desc: "ศิลปะการรับประทานอาหารเพื่อธุรกิจและการเจรจาบนโต๊ะอาหารระดับสากล เข้าใจจิตวิทยา The Waiter Rule, บทบาท Host vs Guest, ผังที่นั่ง Seating Protocols, การใช้อุปกรณ์ Outside-In และเทคนิคสนทนา FORM Framework",
        desc_th: "ศิลปะการรับประทานอาหารเพื่อธุรกิจและการเจรจาบนโต๊ะอาหารระดับสากล เข้าใจจิตวิทยา The Waiter Rule, บทบาท Host vs Guest, ผังที่นั่ง Seating Protocols, การใช้อุปกรณ์ Outside-In และเทคนิคสนทนา FORM Framework",
        desc_en: "Master executive dining psychology, the Waiter Rule, seating protocol diplomacy, Outside-In cutlery navigation, wine etiquette, and the FORM small talk framework."
    }
];

// =========================================================================
// GOOGLE SHEETS LIVE SYNC API CONFIGURATION
// Target Sheet: https://docs.google.com/spreadsheets/d/1wo3o3hNVNTFmWEk44SZMSyEPvEaZ7asEFeDthkD8pUk/edit
// หลังจาก Deploy Apps Script ให้วาง Web App URL ที่นี่ เช่น "https://script.google.com/macros/s/.../exec"
// =========================================================================
const GOOGLE_SHEET_API_URL = (typeof window !== 'undefined' && window.GOOGLE_SHEET_API_URL) ? window.GOOGLE_SHEET_API_URL : "https://script.google.com/macros/s/AKfycbzFegSm4FUpyhr-IJRCiWVwroze65WFUaPRammRXkOq91f1DGUwbUFOWfExQsVIutY/exec";

const defaultWisdomPosts = [
    {
        id: "W-2026-001",
        time: "16/09/2026 09:15",
        author: "คุณสุทธิชัย กิตติคุณ",
        dept: "สายปฏิบัติการ BAFS",
        category: "operations",
        catLabel_th: "Operations & Safety",
        catLabel_en: "Operations & Safety",
        title: "เทคนิคการตรวจเช็คหน้างานลานบินให้รวดเร็วและแม่นยำ 100%",
        content: "1. ตรวจสอบจุดเชื่อมต่อหลักตาม Checklist มาตรฐาน\n2. สังเกตสัญญาณเตือนเบื้องต้นก่อนเริ่มเดินระบบ\n3. ทวนสอบค่าพารามิเตอร์ซ้ำอีกครั้ง เพื่อป้องกันข้อผิดพลาด 100%",
        tags: ["QuickTip", "OperationalExcellence", "BestPractice"],
        likes: 12,
        status: "Approved",
        isFeatured: true
    },
    {
        id: "W-2026-002",
        time: "16/09/2026 10:30",
        author: "คุณวรัญญา บุญเลิศ",
        dept: "ฝ่ายเทคโนโลยีสารสนเทศ",
        category: "tech",
        catLabel_th: "Tech & Automation",
        catLabel_en: "Tech & Automation",
        title: "สูตร Prompt ChatGPT สำหรับสรุปประเด็นการประชุมและ Action Items ใน 3 นาที",
        content: "Prompt: \"คุณเป็นผู้เชี่ยวชาญด้านบริหารจัดการ ช่วยสรุปบันทึกการประชุมนี้เป็น 3 หัวข้อ: 1. ข้อตกลงร่วม 2. สิ่งที่ต้องทำต่อ (Action Items) พร้อมระบุผู้รับผิดชอบ 3. กำหนดส่งงาน\"",
        tags: ["ChatGPT", "PromptEngineering", "Productivity"],
        likes: 8,
        status: "Approved",
        isFeatured: true
    },
    {
        id: "W-2026-003",
        time: "16/09/2026 11:45",
        author: "คุณชานนท์ วงศ์สวัสดิ์",
        dept: "ฝ่ายพัฒนาองค์กรและทรัพยากรบุคคล",
        category: "leadership",
        catLabel_th: "Leadership & OD",
        catLabel_en: "Leadership & OD",
        title: "เทคนิคการให้ Feedback ทีมงานด้วยโมเดล SBI (Situation-Behavior-Impact)",
        content: "การให้ Feedback เชิงสร้างสรรค์:\n1. Situation: ระบุสถานการณ์และเวลาที่เกิดขึ้นชัดเจน\n2. Behavior: อธิบายพฤติกรรมที่สังเกตเห็น โดยไม่ใช้อารมณ์ตัดสิน\n3. Impact: อธิบายผลกระทบที่เกิดขึ้นต่องานและทีม พร้อมชวนคิดทางออกร่วมกัน",
        tags: ["Leadership", "Feedback", "Coaching", "SBI"],
        likes: 15,
        status: "Approved",
        isFeatured: false
    },
    {
        id: "W-2026-004",
        time: "16/09/2026 14:20",
        author: "คุณกิตติศักดิ์ เจริญกิจ",
        dept: "BAFS INTECH",
        category: "innovation",
        catLabel_th: "Innovation & Strategy",
        catLabel_en: "Innovation & Strategy",
        title: "การประยุกต์ใช้ IoT Sensor ตรวจจับแรงดันน้ำมันเชื้อเพลิงอากาศยาน",
        content: "กรณีศึกษาการติดตั้ง Sensor อัจฉริยะช่วยลดระยะเวลา Downtime ในการซ่อมบำรุงเชิงป้องกัน (Predictive Maintenance) ได้ถึง 35%",
        tags: ["IoT", "PredictiveMaintenance", "Innovation"],
        likes: 9,
        status: "Approved",
        isFeatured: false
    },
    {
        id: "W-2026-005",
        time: "16/09/2026 16:00",
        author: "คุณณภัทร ธนทรัพย์",
        dept: "ฝ่ายสื่อสารองค์กร",
        category: "softskills",
        catLabel_th: "Soft Skills & Communication",
        catLabel_en: "Soft Skills & Communication",
        title: "3 เคล็ดลับการเตรียมตัวนำเสนอผลงานระดับผู้บริหาร (Executive Presentation)",
        content: "1. สรุป Executive Summary ใน 1 หน้าแรกเสมอ\n2. เน้นผลลัพธ์ทางธุรกิจ (ROI / Impact) มากกว่ากระบวนการยืดยาว\n3. เตรียม Backup Slides สำหรับคำถามเชิงลึก",
        tags: ["Presentation", "Communication", "Storytelling"],
        likes: 11,
        status: "Approved",
        isFeatured: false
    }
];

// 2. Wisdom & Knowledge Exchange Posts Data
let wisdomPosts = [...defaultWisdomPosts];

let activeWisdomCategory = 'all';
let activeWisdomTag = '';
let wisdomSearchQuery = '';
let currentWisdomSort = 'latest';
let openCommentsPostIds = new Set();
let expandedWisdomPostIds = new Set();

async function fetchWisdomFromGoogleSheets() {
    if (!GOOGLE_SHEET_API_URL) {
        const saved = localStorage.getItem('bafs_km_wisdom_posts');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    wisdomPosts = parsed;
                }
            } catch (e) {
                wisdomPosts = [...defaultWisdomPosts];
            }
        } else {
            wisdomPosts = [...defaultWisdomPosts];
        }
        renderWisdomCards();
        return;
    }

    try {
        const response = await fetch(GOOGLE_SHEET_API_URL);
        const result = await response.json();
        if (result && result.status === 'success' && Array.isArray(result.posts) && result.posts.length > 0) {
            wisdomPosts = result.posts;
            localStorage.setItem('bafs_km_wisdom_posts', JSON.stringify(wisdomPosts));
            renderWisdomCards();
        } else {
            renderWisdomCards();
        }
    } catch (err) {
        console.warn('Google Sheets Live Sync fallback to cache/defaults:', err);
        renderWisdomCards();
    }
}

// ==========================================
// ==========================================
// COURSE VIEW TRACKING & TIME-SERIES ENGINE
// (All-Time, Monthly, Weekly, and Yearly Analytics)
// ==========================================
const DEFAULT_TIMESERIES_VIEWS = {
    portalVisits: {
        all: 0,
        year2026: 0,
        year2025: 0,
        month: 0,
        week: 0
    },
    all: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    },
    week: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    },
    month: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    },
    prevMonth: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    },
    year2026: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    },
    year2025: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    },
    monthlyDistribution2025: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    monthlyDistribution2026: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    monthlyDistribution2027: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    monthlyDistribution2028: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

let currentAdminTimeFilter = 'all'; // 'all' | 'week' | 'month' | 'year2026' | 'year2025'
let currentMoMYear = 2026; // Current selected year for Month-over-Month Matrix Table

function setAdminMoMYear(year) {
    currentMoMYear = parseInt(year) || 2026;
    const badge = document.getElementById('admin-badge-mom-active');
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    if (badge) {
        badge.textContent = `${currentMoMYear} ${isEn ? 'MoM Matrix Active' : 'ตาราง MoM พร้อมใช้งาน'}`;
    }
    const heading = document.getElementById('admin-heading-mom-matrix');
    if (heading) {
        heading.textContent = isEn 
            ? `Month-over-Month (MoM) Growth Matrix (${currentMoMYear})` 
            : `ตารางวิเคราะห์แนวโน้มการเติบโตรายเดือนปี ${currentMoMYear} (${currentMoMYear} Month-over-Month MoM Growth Matrix)`;
    }
    render2YearMonthlyMatrixTable();
}

function getISOWeekNumber(d) {
    const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = target.getUTCDay() || 7;
    target.setUTCDate(target.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
    return Math.ceil((((target - yearStart) / 86400000) + 1) / 7);
}

function getStoredTimeseriesViews() {
    try {
        // Auto-migrate on first load to ensure clean 0 baseline
        const hasReset = localStorage.getItem('bafs_views_reset_zero_v4');
        if (!hasReset) {
            const initial = JSON.parse(JSON.stringify(DEFAULT_TIMESERIES_VIEWS));
            localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(initial));
            localStorage.setItem('bafs_views_reset_zero_v4', 'true');
            localStorage.removeItem('bafs_course_view_logs');
            localStorage.removeItem('bafs_viewed_courses_map');
            localStorage.removeItem('bafs_last_portal_visit_time');
            return initial;
        }

        const stored = localStorage.getItem('bafs_course_views_timeseries');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && typeof parsed === 'object') {
                if (parsed.portalVisits && (parsed.portalVisits.all === 5420 || parsed.portalVisits.all === '5420')) {
                    parsed.portalVisits = { all: 0, year2026: 0, year2025: 0, month: 0, week: 0 };
                    localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(parsed));
                }
                if (!parsed.portalVisits) parsed.portalVisits = { ...DEFAULT_TIMESERIES_VIEWS.portalVisits };
                if (!parsed.month) parsed.month = { ...DEFAULT_TIMESERIES_VIEWS.month };
                if (!parsed.prevMonth) parsed.prevMonth = { ...DEFAULT_TIMESERIES_VIEWS.prevMonth };
                if (!parsed.week) parsed.week = { ...DEFAULT_TIMESERIES_VIEWS.week };
                if (!parsed.year2025) parsed.year2025 = { ...DEFAULT_TIMESERIES_VIEWS.year2025 };
                if (!parsed.monthlyDistribution2025) parsed.monthlyDistribution2025 = [...DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2025];
                if (!parsed.monthlyDistribution2026) parsed.monthlyDistribution2026 = [...DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2026];
                if (!parsed.monthlyDistribution2027) parsed.monthlyDistribution2027 = [...DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2027];
                if (!parsed.monthlyDistribution2028) parsed.monthlyDistribution2028 = [...DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2028];
                return parsed;
            }
        }
    } catch (e) {
        console.warn('Error reading timeseries views:', e);
    }
    const initial = JSON.parse(JSON.stringify(DEFAULT_TIMESERIES_VIEWS));
    try {
        localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(initial));
    } catch (e) {}
    return initial;
}

function getStoredCourseViews() {
    const timeseries = getStoredTimeseriesViews();
    return timeseries[currentAdminTimeFilter] || timeseries.all;
}

function getCourseViews(courseId) {
    const views = getStoredCourseViews();
    return views[courseId] || 0;
}

function setAdminTimeFilter(filterKey) {
    currentAdminTimeFilter = filterKey;
    
    // 1. Update button visual states
    const filterKeys = ['all', 'week', 'month', 'year2026', 'year2025'];
    const activeClass = "flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-[#FF8A48] via-[#FA541C] to-[#D4380D] text-white shadow-md shadow-orange-500/25 transition-all cursor-pointer whitespace-nowrap";
    const inactiveClass = "flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer whitespace-nowrap";
    
    filterKeys.forEach(k => {
        const btn = document.getElementById(`admin-time-btn-${k}`);
        if (btn) {
            btn.className = (k === filterKey) ? activeClass : inactiveClass;
        }
    });

    // 2. Update active label and KPI labels
    const labelEl = document.getElementById('admin-active-period-label');
    const kpiTotalLabel = document.getElementById('admin-kpi-total-views-label');
    const kpiTotalSub = document.getElementById('admin-kpi-total-views-sub');
    
    const isEn = (currentLang === 'en');
    const weekNum = getISOWeekNumber(new Date());
    const descriptions = {
        all: {
            banner: isEn ? '• Showing all-time cumulative analytics overview' : '• แสดงข้อมูลสถิติภาพรวมสะสมทั้งหมด (All-Time Cumulative)',
            kpiTitle: isEn ? 'Course Views' : 'ยอดเปิดดูหลักสูตร',
            kpiSub: isEn ? 'Recorded views across 9 core courses' : 'บันทึกสะสม 9 หลักสูตรหลัก'
        },
        week: {
            banner: isEn ? `• Showing weekly statistics (This Week - W${String(weekNum).padStart(2, '0')})` : `• แสดงข้อมูลสถิติประจำสัปดาห์นี้ (This Week - W${String(weekNum).padStart(2, '0')})`,
            kpiTitle: isEn ? 'Views This Week' : 'ยอดเปิดดูสัปดาห์นี้',
            kpiSub: isEn ? `Last 7 days views (Week ${weekNum})` : `สถิติ 7 วันล่าสุด (Week ${weekNum})`
        },
        month: {
            banner: isEn ? '• Showing monthly statistics (Month-to-Date: October 2026)' : '• แสดงข้อมูลสถิติประจำเดือนนี้ (Month-to-Date: ตุลาคม 2026)',
            kpiTitle: isEn ? 'Views This Month (MTD)' : 'ยอดเปิดดูเดือนนี้ (MTD)',
            kpiSub: isEn ? 'Current month views (October 2026)' : 'สถิติสะสมในเดือนปัจจุบัน (ตุลาคม 2026)'
        },
        year2026: {
            banner: isEn ? '• Showing annual statistics (Year-to-Date 2026)' : '• แสดงข้อมูลสถิติสะสมประจำปี 2026 (Year-to-Date 2026)',
            kpiTitle: isEn ? 'Views in 2026' : 'ยอดเปิดดูปี 2026',
            kpiSub: isEn ? 'Cumulative views throughout 2026' : 'สถิติสะสมตลอดปี 2026'
        },
        year2025: {
            banner: isEn ? '• Showing archived statistics (Full Year 2025 Archive)' : '• แสดงข้อมูลสถิติย้อนหลังประจำปี 2025 (Full Year 2025 Archive)',
            kpiTitle: isEn ? 'Views in 2025' : 'ยอดเปิดดูปี 2025',
            kpiSub: isEn ? 'Year 2025 archived views' : 'สถิติสิ้นสุดรอบปี 2025'
        }
    };

    const cur = descriptions[filterKey] || descriptions.all;
    if (labelEl) labelEl.textContent = cur.banner;
    if (kpiTotalLabel) kpiTotalLabel.textContent = cur.kpiTitle;
    if (kpiTotalSub) {
        const textSpan = kpiTotalSub.querySelector('span:last-child');
        if (textSpan) textSpan.textContent = cur.kpiSub;
        else kpiTotalSub.innerHTML = `<svg class="w-3.5 h-3.5 text-emerald-500 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> <span>${cur.kpiSub}</span>`;
    }

    renderAdminDashboard();
}

// ==========================================
// GOOGLE SHEETS LIVE VIEW TRACKER ENGINE
// Target Sheet: https://docs.google.com/spreadsheets/d/1wo3o3hNVNTFmWEk44SZMSyEPvEaZ7asEFeDthkD8pUk/edit
// ==========================================
const GOOGLE_SHEETS_TRACKER_URL = (typeof window !== 'undefined' && window.GOOGLE_SHEETS_TRACKER_URL) ? window.GOOGLE_SHEETS_TRACKER_URL : "https://script.google.com/macros/s/AKfycbzFegSm4FUpyhr-IJRCiWVwroze65WFUaPRammRXkOq91f1DGUwbUFOWfExQsVIutY/exec";

function getTrackingSessionId() {
    let sess = sessionStorage.getItem('bafs_tracker_session_id');
    if (!sess) {
        sess = 'SESS-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36);
        sessionStorage.setItem('bafs_tracker_session_id', sess);
    }
    return sess;
}

function sendTrackingEventToGoogleSheets(payload) {
    if (!GOOGLE_SHEETS_TRACKER_URL) return;

    try {
        const now = new Date();
        const weekNum = getISOWeekNumber(now);
        const dayNames = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
        
        const fullPayload = {
            ...payload,
            action: 'track',
            eventType: (payload.eventType || (payload.courseId ? 'course_view' : 'portal_visit')).toLowerCase(),
            timestamp: now.toISOString(),
            date: now.toLocaleDateString('en-CA'), // YYYY-MM-DD
            time: now.toLocaleTimeString('th-TH') + ' น.',
            year: now.getFullYear(),
            month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
            week: `${now.getFullYear()}-W${String(weekNum).padStart(2, '0')}`,
            dayOfWeek: dayNames[now.getDay()],
            lang: typeof currentLang !== 'undefined' ? currentLang : 'th',
            platform: navigator.userAgent ? (navigator.userAgent.includes('Mobile') ? 'Mobile Web' : 'Desktop Web') : 'Web',
            sessionId: getTrackingSessionId()
        };

        // 1. Primary: Text/plain POST (Bypasses CORS preflight issues on Google Apps Script)
        fetch(GOOGLE_SHEETS_TRACKER_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(fullPayload)
        }).catch(err => {
            console.warn('Google Sheets View Sync background notice:', err);
        });

        // 2. Dual-channel fallback: GET beacon to guarantee delivery even if POST redirects fail
        const getUrl = `${GOOGLE_SHEETS_TRACKER_URL}?action=track&eventType=${encodeURIComponent(fullPayload.eventType)}&courseId=${encodeURIComponent(fullPayload.courseId || '')}&courseTitle=${encodeURIComponent(fullPayload.courseTitle || '')}&category=${encodeURIComponent(fullPayload.category || '')}&sessionId=${encodeURIComponent(fullPayload.sessionId)}`;
        fetch(getUrl, { mode: 'no-cors' }).catch(() => {});
    } catch (e) {
        console.warn('Tracker dispatch error:', e);
    }
}

// Session De-duplication window: 10 seconds (ป้องกันการคลิกเบิ้ลซ้ำในไม่กี่วินาที แต่เปิดให้ทดสอบและนับยอดได้ทันใจ)
const DE_DUPLICATION_WINDOW_MS = 10 * 1000;

function trackPortalVisit() {
    try {
        const lastVisit = sessionStorage.getItem('bafs_last_portal_visit_time');
        const now = Date.now();
        if (lastVisit && (now - parseInt(lastVisit)) < DE_DUPLICATION_WINDOW_MS) {
            // Already counted in this debounce window, skip incrementing
            return;
        }
        sessionStorage.setItem('bafs_last_portal_visit_time', now.toString());

        const timeseries = getStoredTimeseriesViews();
        if (!timeseries.portalVisits) timeseries.portalVisits = { ...DEFAULT_TIMESERIES_VIEWS.portalVisits };
        timeseries.portalVisits.all = (timeseries.portalVisits.all || 0) + 1;
        timeseries.portalVisits.year2026 = (timeseries.portalVisits.year2026 || 0) + 1;
        timeseries.portalVisits.month = (timeseries.portalVisits.month || 0) + 1;
        timeseries.portalVisits.week = (timeseries.portalVisits.week || 0) + 1;
        localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(timeseries));

        sendTrackingEventToGoogleSheets({
            eventType: 'portal_visit',
            courseTitle: 'BAFS Smart Learning Platform Main Page'
        });
    } catch (e) {
        console.warn('Track portal visit error:', e);
    }
}

function incrementCourseView(courseId) {
    try {
        const now = Date.now();
        let viewedMap = {};
        try {
            const stored = sessionStorage.getItem('bafs_viewed_courses_map');
            if (stored) viewedMap = JSON.parse(stored);
        } catch (e) {}

        const lastViewed = viewedMap[courseId];
        if (lastViewed && (now - lastViewed) < DE_DUPLICATION_WINDOW_MS) {
            // Course clicked within debounce window (10s), skip incrementing but log activity
            logCourseViewEvent(courseId);
            return;
        }
        viewedMap[courseId] = now;
        sessionStorage.setItem('bafs_viewed_courses_map', JSON.stringify(viewedMap));

        const timeseries = getStoredTimeseriesViews();
        // Increment all-time, current year (2026), current month, and current week
        timeseries.all[courseId] = (timeseries.all[courseId] || 0) + 1;
        timeseries.year2026[courseId] = (timeseries.year2026[courseId] || 0) + 1;
        timeseries.week[courseId] = (timeseries.week[courseId] || 0) + 1;
        if (!timeseries.month) timeseries.month = { ...DEFAULT_TIMESERIES_VIEWS.month };
        timeseries.month[courseId] = (timeseries.month[courseId] || 0) + 1;
        if (timeseries.monthlyDistribution2026 && timeseries.monthlyDistribution2026.length >= 10) {
            timeseries.monthlyDistribution2026[9] = (timeseries.monthlyDistribution2026[9] || 0) + 1;
        }
        localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(timeseries));
        
        logCourseViewEvent(courseId);

        // Real-time dispatch to Google Sheets
        const course = allCourses.find(c => c.id === courseId);
        sendTrackingEventToGoogleSheets({
            eventType: 'course_view',
            courseId: courseId,
            courseTitle: course ? (course.title_th || course.title) : `Course #${courseId}`,
            category: course ? (course.badgeText_th || course.category) : 'General'
        });

        // Instant visual updates on UI
        updateVisibleCourseCardViews();
        const adminView = document.getElementById('view-admin');
        if (adminView && !adminView.classList.contains('hidden')) {
            renderAdminDashboard();
        }
    } catch (e) {
        console.warn('Error incrementing course view:', e);
    }
}

function logCourseViewEvent(courseId) {
    try {
        const course = allCourses.find(c => c.id === courseId);
        const logs = getStoredCourseViewLogs();
        const now = new Date();
        const newLog = {
            id: 'LOG-' + Date.now(),
            courseId: courseId,
            courseTitle: course ? (course.title_th || course.title) : `Course #${courseId}`,
            category: course ? course.category : 'general',
            timestamp: now.toISOString(),
            formattedTime: now.toLocaleTimeString('th-TH') + ' น.'
        };
        logs.unshift(newLog);
        if (logs.length > 50) logs.length = 50;
        localStorage.setItem('bafs_course_view_logs', JSON.stringify(logs));
    } catch (e) {}
}

function getStoredCourseViewLogs() {
    try {
        const stored = localStorage.getItem('bafs_course_view_logs');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
        // Realistic sample live events for dashboard readiness
        const sampleLogs = [
            { id: 'LOG-1', courseId: 6, courseTitle: 'High-Impact Presentation & Pitching', category: 'softskills', formattedTime: 'วันนี้ 15:42 น.' },
            { id: 'LOG-2', courseId: 3, courseTitle: 'Servant Leadership', category: 'leadership', formattedTime: 'วันนี้ 15:30 น.' },
            { id: 'LOG-3', courseId: 5, courseTitle: 'Design Thinking & Innovation Sprint', category: 'innovation', formattedTime: 'วันนี้ 15:15 น.' },
            { id: 'LOG-4', courseId: 1, courseTitle: 'Intrapreneurship & Strategic Foresight', category: 'business', formattedTime: 'วันนี้ 14:50 น.' }
        ];
        localStorage.setItem('bafs_course_view_logs', JSON.stringify(sampleLogs));
        return sampleLogs;
    } catch (e) {
        return [];
    }
}

// ==========================================
// ==========================================
// CENTRAL GOOGLE SHEETS REAL-TIME SYNC ENGINE
// ==========================================
let isGoogleSheetsSyncing = false;
let adminAutoSyncTimer = null;
let isRealtimeSyncEnabled = true;
const ADMIN_SYNC_INTERVAL_MS = 15000; // 15-second real-time polling

function startAdminAutoSync() {
    stopAdminAutoSync();
    if (!isRealtimeSyncEnabled) return;

    // Run first sync immediately (silent mode)
    syncDashboardFromGoogleSheets(true);

    adminAutoSyncTimer = setInterval(() => {
        const adminView = document.getElementById('view-admin');
        if (adminView && !adminView.classList.contains('hidden') && isRealtimeSyncEnabled) {
            syncDashboardFromGoogleSheets(true);
        } else {
            stopAdminAutoSync();
        }
    }, ADMIN_SYNC_INTERVAL_MS);
}

function stopAdminAutoSync() {
    if (adminAutoSyncTimer) {
        clearInterval(adminAutoSyncTimer);
        adminAutoSyncTimer = null;
    }
}

function toggleAdminAutoSync() {
    isRealtimeSyncEnabled = !isRealtimeSyncEnabled;
    updateAutoSyncToggleUI();
    if (isRealtimeSyncEnabled) {
        startAdminAutoSync();
        showToastNotification(currentLang === 'en' ? 'Real-time Auto-Sync enabled (every 15s)' : 'เปิดระบบ Auto-Sync Real-time แล้ว (ทุก 15 วินาที)');
    } else {
        stopAdminAutoSync();
        showToastNotification(currentLang === 'en' ? 'Real-time Auto-Sync paused' : 'หยุดพักระบบ Auto-Sync ชั่วคราว');
    }
}

function updateAutoSyncToggleUI() {
    const btn = document.getElementById('admin-btn-toggle-autosync');
    if (!btn) return;
    const isEn = (currentLang === 'en');
    if (isRealtimeSyncEnabled) {
        btn.innerHTML = `
            <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Auto-Sync 15s</span>
        `;
        btn.className = "h-10 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap";
        btn.title = isEn ? 'Click to pause 15s auto-sync' : 'คลิกเพื่อหยุดพักการซิงก์อัตโนมัติ 15 วินาที';
    } else {
        btn.innerHTML = `
            <span class="w-2 h-2 rounded-full bg-slate-500"></span>
            <span>${isEn ? 'Auto-Sync (PAUSED)' : 'Auto-Sync (พัก)'}</span>
        `;
        btn.className = "h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-400 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap";
        btn.title = isEn ? 'Click to resume 15s auto-sync' : 'คลิกเพื่อเปิดการซิงก์อัตโนมัติ 15 วินาที';
    }
}

async function syncDashboardFromGoogleSheets(isSilent = false) {
    if (!GOOGLE_SHEETS_TRACKER_URL || isGoogleSheetsSyncing) return;
    isGoogleSheetsSyncing = true;

    const syncStatusEl = document.getElementById('admin-sync-status-badge');
    if (syncStatusEl && !isSilent) {
        syncStatusEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold animate-pulse"><span class="w-2 h-2 rounded-full bg-amber-400"></span>กำลังเชื่อมต่อ Google Sheets...</span>`;
    }

    try {
        const res = await fetch(`${GOOGLE_SHEETS_TRACKER_URL}?action=get_dashboard`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.status === 'success') {
                const timeseries = getStoredTimeseriesViews();

                // 1. Update Portal Visits (Website Overview) - Use Math.max so local fresh visits are not overwritten by stale sheet cache
                if (typeof data.portalVisits === 'number') {
                    if (!timeseries.portalVisits) timeseries.portalVisits = { ...DEFAULT_TIMESERIES_VIEWS.portalVisits };
                    timeseries.portalVisits.all = Math.max(timeseries.portalVisits.all || 0, data.portalVisits);
                }

                // 2. Update Course Views (Per-Course Data) - Use Math.max so fresh views aren't wiped to 0
                if (Array.isArray(data.courses) && data.courses.length > 0) {
                    data.courses.forEach(c => {
                        const cId = parseInt(c.id);
                        if (cId && typeof c.views === 'number') {
                            timeseries.all[cId] = Math.max(timeseries.all[cId] || 0, c.views);
                        }
                    });
                }

                // 3. Update Monthly 2026 Distribution (MoM Data)
                if (Array.isArray(data.monthly) && data.monthly.length > 0) {
                    timeseries.monthlyDistribution2026 = data.monthly.map((m, idx) => {
                        return (m.views !== null && m.views !== undefined) 
                            ? m.views 
                            : (DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2026[idx] || 0);
                    });
                }

                // 4. Save Category Breakdown data
                if (Array.isArray(data.categories) && data.categories.length > 0) {
                    localStorage.setItem('bafs_category_share_data', JSON.stringify(data.categories));
                }

                // 5. Save Recent Activity Logs
                if (Array.isArray(data.recentLogs) && data.recentLogs.length > 0) {
                    const formatted = data.recentLogs.map(l => ({
                        id: l.id || `LOG-${Date.now()}`,
                        courseId: l.courseId && l.courseId !== '-' ? parseInt(l.courseId) : null,
                        courseTitle: l.courseTitle || 'เข้าชมบทเรียน',
                        category: l.category || 'general',
                        timestamp: l.timestamp || new Date().toISOString(),
                        formattedTime: l.time || l.date || 'เมื่อสักครู่'
                    }));
                    localStorage.setItem('bafs_course_view_logs', JSON.stringify(formatted));
                }

                localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(timeseries));

                // Update UI badge with Live pulsing indicator
                if (syncStatusEl) {
                    const now = new Date();
                    const isEn = (currentLang === 'en');
                    syncStatusEl.innerHTML = `
                        <div class="flex items-center gap-2">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>${isEn ? `Live Cloud Synced (${now.toLocaleTimeString()})` : `🟢 ซิงก์ข้อมูลสดสำเร็จ (${now.toLocaleTimeString('th-TH')} น.)`}</span>
                        </div>
                    `;
                }

                // Re-render Admin Dashboard if visible
                const adminView = document.getElementById('view-admin');
                if (adminView && !adminView.classList.contains('hidden')) {
                    renderAdminDashboard();
                }

                // Update course catalog views
                updateVisibleCourseCardViews();
            }
        }
    } catch (err) {
        console.warn('Google Sheets live sync notice (fallback to local cache):', err);
        if (syncStatusEl && !isSilent) {
            syncStatusEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium"><span class="w-2 h-2 rounded-full bg-slate-500"></span>⚪ ข้อมูลแคชล่าสุด (Google Sheets Connected)</span>`;
        }
    } finally {
        isGoogleSheetsSyncing = false;
    }
}

function updateVisibleCourseCardViews() {
    try {
        if (typeof filteredCourses !== 'undefined' && filteredCourses.length > 0) {
            renderCourseCatalog(filteredCourses);
        }
        if (typeof renderFeaturedMasterclasses === 'function') {
            renderFeaturedMasterclasses();
        }
    } catch (e) {}
}

function seedDemoViews() {
    try {
        const timeseries = getStoredTimeseriesViews();
        if (!timeseries.portalVisits) timeseries.portalVisits = { ...DEFAULT_TIMESERIES_VIEWS.portalVisits };
        const addedVisits = Math.floor(Math.random() * 15) + 20; // +20 to +35 portal visits
        timeseries.portalVisits.all += addedVisits;
        timeseries.portalVisits.year2026 += addedVisits;
        timeseries.portalVisits.month += addedVisits;
        timeseries.portalVisits.week += addedVisits;

        allCourses.forEach(c => {
            const added = Math.floor(Math.random() * 6) + 5; // +5 to +10 views
            timeseries.all[c.id] = (timeseries.all[c.id] || 0) + added;
            timeseries.year2026[c.id] = (timeseries.year2026[c.id] || 0) + added;
            timeseries.week[c.id] = (timeseries.week[c.id] || 0) + added;
            if (!timeseries.month) timeseries.month = { ...DEFAULT_TIMESERIES_VIEWS.month };
            timeseries.month[c.id] = (timeseries.month[c.id] || 0) + added;
            if (timeseries.monthlyDistribution2026 && timeseries.monthlyDistribution2026.length >= 10) {
                timeseries.monthlyDistribution2026[9] = (timeseries.monthlyDistribution2026[9] || 0) + added;
            }
        });
        localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(timeseries));
        renderAdminDashboard();
        applyCatalogFilters();
        renderFeaturedMasterclasses();
        showToastNotification(currentLang === 'en' ? 'Added demo views successfully!' : 'จำลองยอดเข้าชมเพิ่มขึ้นเรียบร้อยแล้ว');
    } catch (e) {
        console.warn('Error seeding demo views:', e);
    }
}

function resetCourseViews() {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to reset all course views and stats to 0?' : 'คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตยอดวิวทั้งหมดกลับเป็น 0 เพื่อเริ่มนับสถิติใหม่?')) {
        try {
            const initial = JSON.parse(JSON.stringify(DEFAULT_TIMESERIES_VIEWS));
            initial.portalVisits = { all: 0, year2026: 0, year2025: 0, month: 0, week: 0 };
            localStorage.setItem('bafs_course_views_timeseries', JSON.stringify(initial));
            localStorage.setItem('bafs_views_reset_zero_v4', 'true');
            localStorage.removeItem('bafs_course_view_logs');
            localStorage.removeItem('bafs_viewed_courses_map');
            localStorage.removeItem('bafs_last_portal_visit_time');
            localStorage.removeItem('bafs_category_share_data');

            // Send reset command to Google Apps Script Web App
            if (GOOGLE_SHEETS_TRACKER_URL) {
                fetch(GOOGLE_SHEETS_TRACKER_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ action: 'reset_views', eventType: 'reset_views' })
                }).catch(err => console.warn('Apps Script reset signal:', err));
            }

            renderAdminDashboard();
            applyCatalogFilters();
            renderFeaturedMasterclasses();
            updateVisibleCourseCardViews();
            showToastNotification(currentLang === 'en' ? 'All views reset to 0.' : 'รีเซ็ตยอดเข้าชมทั้งหมดเป็น 0 เรียบร้อยแล้ว');
        } catch (e) {
            console.warn('Error resetting views:', e);
        }
    }
}

// ==========================================
// ADMIN PORTAL AUTHENTICATION & ACCESS
// ==========================================
function openAdminAuthModal() {
    const isAuth = sessionStorage.getItem('bafs_admin_auth') === 'true';
    if (isAuth) {
        switchTab(5);
        renderAdminDashboard();
        return;
    }

    const modal = document.getElementById('admin-pin-modal');
    const input = document.getElementById('admin-pin-input');
    const err = document.getElementById('admin-pin-error');
    const title = document.getElementById('admin-modal-title');
    const desc = document.getElementById('admin-modal-desc');

    resolveAdminPassword();
    resetAdminPasswordVisibility();

    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    if (title) title.textContent = isEn ? 'Admin Portal Login' : 'เข้าสู่ระบบผู้ดูแล';
    if (desc) desc.textContent = isEn ? 'Please enter Admin password' : 'กรุณากรอกรหัสผ่านผู้ดูแลระบบ';

    if (err) err.classList.add('hidden');
    if (input) {
        input.value = '';
        input.placeholder = isEn ? 'Enter admin password' : 'กรอกรหัสผ่านผู้ดูแลระบบ';
        setTimeout(() => input.focus(), 150);
    }
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function resolveAdminPassword() {
    const defaultPassword = 'Hod@bafs2026';
    try {
        const stored = localStorage.getItem('bafs_admin_pin');
        if (stored === '1234') {
            localStorage.removeItem('bafs_admin_pin');
            return defaultPassword;
        }
        return stored || defaultPassword;
    } catch (_) {
        return defaultPassword;
    }
}

function resetAdminPasswordVisibility() {
    const input = document.getElementById('admin-pin-input');
    const toggleBtn = document.getElementById('toggle-admin-password-btn');
    const eyeOpen = document.getElementById('admin-eye-open-icon');
    const eyeClosed = document.getElementById('admin-eye-closed-icon');
    if (input) input.type = 'password';
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', 'false');
    if (eyeOpen) eyeOpen.classList.remove('hidden');
    if (eyeClosed) eyeClosed.classList.add('hidden');
}

function toggleAdminPasswordVisibility() {
    const input = document.getElementById('admin-pin-input');
    const toggleBtn = document.getElementById('toggle-admin-password-btn');
    const eyeOpen = document.getElementById('admin-eye-open-icon');
    const eyeClosed = document.getElementById('admin-eye-closed-icon');
    if (!input) return;

    const showPlaintext = input.type === 'password';
    input.type = showPlaintext ? 'text' : 'password';
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', showPlaintext ? 'true' : 'false');
    if (eyeOpen) eyeOpen.classList.toggle('hidden', showPlaintext);
    if (eyeClosed) eyeClosed.classList.toggle('hidden', !showPlaintext);
    input.focus();
}

function closeAdminAuthModal() {
    const modal = document.getElementById('admin-pin-modal');
    if (modal) modal.classList.add('hidden');
    resetAdminPasswordVisibility();
    document.body.style.overflow = '';
}

function handleAdminModalBackdropClick(event) {
    if (event.target.id === 'admin-pin-modal') {
        closeAdminAuthModal();
    }
}

function handleAdminPinSubmit(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('admin-pin-input');
    const err = document.getElementById('admin-pin-error');
    const pin = input ? input.value.trim() : '';

    const validPin = resolveAdminPassword();

    if (pin === validPin) {
        sessionStorage.setItem('bafs_admin_auth', 'true');
        closeAdminAuthModal();
        switchTab(5);
        renderAdminDashboard();
        showToastNotification(currentLang === 'en' ? 'Welcome, Administrator!' : 'เข้าสู่ระบบผู้ดูแลสำเร็จ');
    } else {
        if (err) {
            err.classList.remove('hidden');
            const errSpan = err.querySelector('span');
            const errMsg = currentLang === 'en' ? 'Invalid password. Please try again.' : 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
            if (errSpan) {
                errSpan.textContent = errMsg;
            } else {
                err.textContent = errMsg;
            }
        }
        if (input) {
            input.value = '';
            input.focus();
        }
    }
}

function logoutAdmin() {
    stopAdminAutoSync();
    sessionStorage.removeItem('bafs_admin_auth');
    switchTab(0);
    showToastNotification(currentLang === 'en' ? 'Logged out from Admin Portal.' : 'ออกจากระบบผู้ดูแลเรียบร้อยแล้ว');
}

function openAdminGuideModal() {
    const modal = document.getElementById('admin-guide-modal');
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAdminGuideModal() {
    const modal = document.getElementById('admin-guide-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function handleAdminGuideModalBackdropClick(event) {
    if (event.target.id === 'admin-guide-modal') {
        closeAdminGuideModal();
    }
}

// ==========================================
// SMART LEARNING PLATFORM & KM INFO MODAL
// ==========================================
function openSmartLearningInfoModal() {
    const modal = document.getElementById('smart-learning-info-modal');
    if (modal) {
        modal.classList.remove('hidden');
        // Reset collapsible 4 Global Case Studies to collapsed state on open
        const casePanel = document.getElementById('km-case-studies-panel');
        const chevron = document.getElementById('km-case-studies-chevron');
        const actionLabel = document.getElementById('km-case-studies-action-label');
        if (casePanel) casePanel.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-90');
        if (actionLabel) actionLabel.innerHTML = 'คลิกดูข้อมูล &gt;';
        document.body.style.overflow = 'hidden';
    }
}

function closeSmartLearningInfoModal() {
    const modal = document.getElementById('smart-learning-info-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function handleSmartLearningInfoBackdropClick(event) {
    if (event.target.id === 'smart-learning-info-modal') {
        closeSmartLearningInfoModal();
    }
}

function toggleKmCaseStudies() {
    const casePanel = document.getElementById('km-case-studies-panel');
    const chevron = document.getElementById('km-case-studies-chevron');
    const actionLabel = document.getElementById('km-case-studies-action-label');
    if (!casePanel) return;

    const isHidden = casePanel.classList.contains('hidden');
    if (isHidden) {
        casePanel.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-90');
        if (actionLabel) actionLabel.innerHTML = 'ซ่อนข้อมูล &#8743;';
        setTimeout(() => {
            casePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
    } else {
        casePanel.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-90');
        if (actionLabel) actionLabel.innerHTML = 'คลิกดูข้อมูล &gt;';
    }
}

// ==========================================
// ADMIN DASHBOARD & CSV EXPORTER (EXECUTIVE 3-TIER)
// ==========================================
function renderAdminDashboard() {
    const timeseries = getStoredTimeseriesViews();
    const views = timeseries[currentAdminTimeFilter] || timeseries.all;
    
    // 1. Calculate Summary KPIs (Tier 1: Website Traffic & Course Views)
    let totalCourseViews = 0;
    let topCourse = null;
    let maxViews = -1;

    const courseStats = allCourses.map(course => {
        const cViews = views[course.id] || 0;
        totalCourseViews += cViews;
        if (cViews > maxViews) {
            maxViews = cViews;
            topCourse = course;
        }
        return {
            course: course,
            views: cViews
        };
    });

    const portalVisitsCount = (timeseries.portalVisits && typeof timeseries.portalVisits[currentAdminTimeFilter] === 'number') 
        ? timeseries.portalVisits[currentAdminTimeFilter] 
        : ((timeseries.portalVisits && typeof timeseries.portalVisits.all === 'number') 
            ? timeseries.portalVisits.all 
            : 0);

    const conversionRate = portalVisitsCount > 0 
        ? Math.min(100, ((totalCourseViews / portalVisitsCount) * 100)).toFixed(1) 
        : 0;

    // Update Tier 1 KPI Elements & Dynamic Period Tags
    const kpiPortalVisits = document.getElementById('admin-kpi-portal-visits');
    const kpiTotalViews = document.getElementById('admin-kpi-total-views');
    const kpiLastUpdated = document.getElementById('admin-kpi-last-updated');
    const kpiPortalPeriod = document.getElementById('admin-kpi-portal-visits-period');
    const kpiCoursePeriod = document.getElementById('admin-kpi-total-views-period');

    const periodLabels = {
        all: {
            th: 'ช่วงเวลา: 1 ม.ค. 2026 - ปัจจุบัน (All-Time)',
            en: 'Period: 1 Jan 2026 - Present (All-Time)'
        },
        week: {
            th: 'ช่วงเวลา: สัปดาห์นี้ (สัปดาห์ที่ 41 ปี 2026)',
            en: 'Period: This Week (Week 41, 2026)'
        },
        month: {
            th: 'ช่วงเวลา: 1 - 31 ต.ค. 2026 (รอบเดือนนี้)',
            en: 'Period: 1 - 31 Oct 2026 (Current Month)'
        },
        year2026: {
            th: 'ช่วงเวลา: ม.ค. - ธ.ค. 2026 (ปีปัจจุบัน)',
            en: 'Period: Jan - Dec 2026 (Current Year)'
        }
    };
    const activePeriodStr = periodLabels[currentAdminTimeFilter] 
        ? periodLabels[currentAdminTimeFilter][currentLang === 'en' ? 'en' : 'th']
        : periodLabels.all.th;

    if (kpiPortalVisits) kpiPortalVisits.textContent = portalVisitsCount.toLocaleString();
    if (kpiTotalViews) kpiTotalViews.textContent = totalCourseViews.toLocaleString();
    if (kpiPortalPeriod) kpiPortalPeriod.textContent = activePeriodStr;
    if (kpiCoursePeriod) kpiCoursePeriod.textContent = activePeriodStr;

    // Update Tier 1 KPI Card 3: Avg Views per Course
    const avgViewsPerCourse = allCourses.length > 0 ? (totalCourseViews / allCourses.length).toFixed(1) : '0.0';
    const kpiAvgViews = document.getElementById('admin-kpi-avg-views');
    const kpiAvgUnit = document.getElementById('admin-kpi-avg-unit');
    if (kpiAvgViews) kpiAvgViews.textContent = avgViewsPerCourse;
    if (kpiAvgUnit) kpiAvgUnit.textContent = currentLang === 'en' ? 'views/course' : 'วิว/หลักสูตร';

    if (kpiLastUpdated) {
        const now = new Date();
        kpiLastUpdated.textContent = currentLang === 'en' 
            ? `Last updated: ${now.toLocaleTimeString()}`
            : `อัปเดตล่าสุด: ${now.toLocaleTimeString('th-TH')} น.`;
    }

    // 2. Render Tier 2: Ranked Course List (Symmetrical Vertical Column Chart with Performance Heatmap Color Scale)
    const rankingContainer = document.getElementById('admin-courses-ranking-list');
    if (rankingContainer) {
        courseStats.sort((a, b) => b.views - a.views);

        const rankBadges = ['#1', '#2', '#3'];
        
        // 9-Step Performance Heatmap: Green (Top 1) ➔ Yellow/Amber (Mid) ➔ Orange/Red (Bottom)
        const rankHeatmapStyles = [
            // #1: Top 1 - Emerald Green Champion
            {
                pillar: 'bg-gradient-to-t from-emerald-600 via-emerald-500 to-teal-300 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.5)] ring-1 ring-emerald-300/50',
                badge: 'bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 text-amber-950 border border-amber-300 shadow-md shadow-amber-400/40 ring-2 ring-amber-300/60 font-black',
                viewText: 'text-emerald-700 font-black',
                percentText: 'text-emerald-600 font-bold'
            },
            // #2: Top 2 - Teal / Mint Green
            {
                pillar: 'bg-gradient-to-t from-teal-600 via-teal-500 to-emerald-300 shadow-[0_8px_20px_-4px_rgba(20,184,166,0.45)] ring-1 ring-teal-300/50',
                badge: 'bg-gradient-to-r from-slate-100 via-slate-200 to-teal-100 text-teal-950 border border-teal-300 shadow-sm shadow-teal-500/30 ring-1 ring-teal-200 font-black',
                viewText: 'text-teal-700 font-black',
                percentText: 'text-teal-600 font-bold'
            },
            // #3: Top 3 - Lime / Green-Yellow
            {
                pillar: 'bg-gradient-to-t from-lime-600 via-lime-500 to-emerald-300 shadow-[0_8px_20px_-4px_rgba(132,204,22,0.4)] ring-1 ring-lime-300/50',
                badge: 'bg-gradient-to-r from-lime-50 via-lime-100 to-emerald-100 text-lime-950 border border-lime-300 shadow-sm shadow-lime-500/30 ring-1 ring-lime-200 font-black',
                viewText: 'text-lime-800 font-black',
                percentText: 'text-lime-700 font-bold'
            },
            // #4: Mid-High - Golden Yellow
            {
                pillar: 'bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-300 shadow-[0_6px_16px_-4px_rgba(245,158,11,0.35)] ring-1 ring-amber-300/40',
                badge: 'bg-yellow-100 text-yellow-900 border border-yellow-300 shadow-xs font-bold',
                viewText: 'text-amber-800 font-black',
                percentText: 'text-amber-700 font-bold'
            },
            // #5: Mid - Warm Amber
            {
                pillar: 'bg-gradient-to-t from-amber-600 via-orange-400 to-amber-300 shadow-[0_6px_16px_-4px_rgba(217,119,6,0.35)] ring-1 ring-amber-300/40',
                badge: 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs font-bold',
                viewText: 'text-amber-900 font-black',
                percentText: 'text-amber-700 font-bold'
            },
            // #6: Mid-Low - Bright Orange
            {
                pillar: 'bg-gradient-to-t from-orange-600 via-orange-500 to-amber-400 shadow-[0_6px_16px_-4px_rgba(249,115,22,0.35)] ring-1 ring-orange-300/40',
                badge: 'bg-orange-100 text-orange-900 border border-orange-300 shadow-xs font-bold',
                viewText: 'text-orange-800 font-black',
                percentText: 'text-orange-600 font-bold'
            },
            // #7: Low 1 - Burnt Orange / Coral
            {
                pillar: 'bg-gradient-to-t from-orange-700 via-rose-500 to-orange-400 shadow-[0_6px_16px_-4px_rgba(244,63,94,0.35)] ring-1 ring-rose-300/40',
                badge: 'bg-rose-50 text-rose-900 border border-rose-200 shadow-xs font-bold',
                viewText: 'text-rose-700 font-black',
                percentText: 'text-rose-600 font-bold'
            },
            // #8: Low 2 - Crimson / Rose
            {
                pillar: 'bg-gradient-to-t from-rose-600 via-rose-500 to-pink-400 shadow-[0_6px_16px_-4px_rgba(225,29,72,0.35)] ring-1 ring-rose-300/40',
                badge: 'bg-rose-100 text-rose-900 border border-rose-300 shadow-xs font-bold',
                viewText: 'text-rose-800 font-black',
                percentText: 'text-rose-600 font-bold'
            },
            // #9: Bottom - Deep Ruby Red
            {
                pillar: 'bg-gradient-to-t from-red-600 via-rose-600 to-red-400 shadow-[0_8px_20px_-4px_rgba(220,38,38,0.45)] ring-1 ring-red-400/50',
                badge: 'bg-red-100 text-red-900 border border-red-300 ring-2 ring-red-400/30 font-black',
                viewText: 'text-red-700 font-black',
                percentText: 'text-red-600 font-bold'
            }
        ];

        const isEn = (currentLang === 'en');
        const catMap = {
            business: {
                name: isEn ? 'Business & Strategy' : 'ธุรกิจและกลยุทธ์',
                shortName: isEn ? 'Business' : 'ธุรกิจ',
                color: 'bg-blue-50 text-blue-700 border-blue-200/80 shadow-2xs'
            },
            leadership: {
                name: isEn ? 'Leadership & Management' : 'ภาวะผู้นำและการจัดการ',
                shortName: isEn ? 'Leadership' : 'ภาวะผู้นำ',
                color: 'bg-purple-50 text-purple-700 border-purple-200/80 shadow-2xs'
            },
            innovation: {
                name: isEn ? 'Innovation & Design' : 'นวัตกรรมและการออกแบบ',
                shortName: isEn ? 'Innovation' : 'นวัตกรรม',
                color: 'bg-orange-50 text-orange-700 border-orange-200/80 shadow-2xs'
            },
            softskills: {
                name: isEn ? 'Soft Skills & Communication' : 'ทักษะปฏิสัมพันธ์',
                shortName: isEn ? 'Soft Skills' : 'ทักษะชีวิต',
                color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-2xs'
            }
        };

        rankingContainer.innerHTML = courseStats.map((item, index) => {
            const c = item.course;
            const cViews = item.views;
            const percent = totalCourseViews > 0 ? ((cViews / totalCourseViews) * 100).toFixed(1) : 0;
            const barHeightPct = maxViews > 0 ? Math.max(14, Math.round((cViews / maxViews) * 100)) : 10;

            const rankBadge = index < 3 ? rankBadges[index] : `#${index + 1}`;
            const theme = rankHeatmapStyles[Math.min(index, rankHeatmapStyles.length - 1)];

            const catInfo = catMap[c.category] || {
                name: c.category || 'General',
                shortName: c.category || 'General',
                color: 'bg-slate-100 text-slate-600 border-slate-200'
            };
            const title = isEn ? (c.title_en || c.title) : (c.title_th || c.title);

            // Edge-safe positioning for tooltips (prevents clipping on left/right screen borders)
            const tooltipAlign = index === 0 
                ? 'left-0 translate-x-0' 
                : (index === courseStats.length - 1 
                    ? 'right-0 left-auto translate-x-0' 
                    : 'left-1/2 -translate-x-1/2');

            const arrowAlign = index === 0 
                ? 'left-6 translate-x-0' 
                : (index === courseStats.length - 1 
                    ? 'right-6 left-auto translate-x-0' 
                    : 'left-1/2 -translate-x-1/2');

            return `
                <div class="relative z-10 hover:z-50 focus-within:z-50 flex flex-col items-center justify-between h-full group select-none transition-all duration-300 p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-50/40 border-2 border-slate-200/90 hover:border-[#FA541C] shadow-sm hover:shadow-[0_16px_36px_rgba(250,84,28,0.18)] hover:-translate-y-1.5 cursor-pointer admin-pillar-stage">
                    
                    <!-- Dynamic Edge-Safe Tooltip (Fixed: No left clipping, full title visible, high z-70) -->
                    <div class="absolute -top-16 ${tooltipAlign} opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-top-18 transition-all duration-300 z-[70] bg-slate-900/95 text-white py-2 px-3 rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-md border border-slate-700/90 text-center w-max max-w-[210px]">
                        <div class="flex items-center justify-center gap-1.5 text-[11px] font-black text-amber-300">
                            <span class="px-1.5 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 font-mono">${rankBadge}</span>
                            <span>${cViews.toLocaleString()} ${isEn ? 'views' : 'วิว'}</span>
                        </div>
                        <div class="text-[10.5px] text-slate-100 font-bold leading-snug mt-1 text-center break-words px-1">${title}</div>
                        <div class="text-[9.5px] text-slate-300 font-semibold mt-1 pt-1 border-t border-slate-700/80 flex items-center justify-center gap-1.5">
                            <span class="text-amber-300/90">${catInfo.shortName}</span>
                            <span>•</span>
                            <span class="text-emerald-300 font-mono">${percent}% ${isEn ? 'share' : 'ของทั้งหมด'}</span>
                        </div>
                        <div class="absolute -bottom-1 ${arrowAlign} w-2.5 h-2.5 bg-slate-900 rotate-45 border-r border-b border-slate-700"></div>
                    </div>

                    <!-- Top Stat Header: 3D Rank Badge + Views Count + Share % -->
                    <div class="space-y-1 text-center mb-2 w-full">
                        <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] ${theme.badge}">
                            ${rankBadge}
                        </span>
                        <div class="font-mono text-sm sm:text-base ${theme.viewText} leading-none pt-0.5 tracking-tight font-black">
                            ${cViews.toLocaleString()}
                        </div>
                        <div class="text-[10px] ${theme.percentText} font-mono font-bold">
                            ${percent}%
                        </div>
                    </div>

                    <!-- Clean Executive Bar Slot -->
                    <div class="w-full flex flex-col justify-end items-center h-[165px] sm:h-[190px] bg-slate-100/70 rounded-xl p-1.5 sm:p-2 border border-slate-200/80 relative overflow-hidden">
                        <!-- Horizontal subtle guide ticks -->
                        <div class="absolute inset-x-0 top-1/4 border-b border-slate-200/60 pointer-events-none"></div>
                        <div class="absolute inset-x-0 top-2/4 border-b border-slate-200/60 pointer-events-none"></div>
                        <div class="absolute inset-x-0 top-3/4 border-b border-slate-200/60 pointer-events-none"></div>

                        <!-- Clean Vertical Bar -->
                        <div class="w-full rounded-lg ${theme.pillar} transition-all duration-700 ease-out group-hover:brightness-105 flex items-start justify-center pt-1.5 relative" style="height: ${barHeightPct}%">
                            <span class="relative z-10 text-[9px] font-bold text-white font-mono tracking-tight">
                                ${barHeightPct}%
                            </span>
                        </div>
                    </div>

                    <!-- Enclosed Course Info Frame (อยู่ในกรอบเรียบร้อย สัดส่วนเท่ากันทุกแท่ง) -->
                    <div class="w-full mt-2.5 pt-2 pb-1.5 px-1.5 sm:px-2 rounded-xl bg-slate-50/90 group-hover:bg-orange-50/60 border border-slate-200/90 group-hover:border-orange-300 transition-all flex flex-col items-center justify-between min-h-[76px] sm:min-h-[82px] shadow-2xs">
                        <span class="inline-block px-1.5 py-0.5 rounded-md text-[9px] font-black border ${catInfo.color} truncate max-w-full mb-1">
                            ${catInfo.shortName}
                        </span>
                        <div class="w-full flex-1 flex items-center justify-center text-center">
                            <p class="text-[10px] sm:text-[10.5px] font-bold text-slate-800 group-hover:text-[#FA541C] leading-snug line-clamp-2 break-words transition-colors text-center" title="${title}">
                                ${title}
                            </p>
                        </div>
                    </div>

                </div>
            `;
        }).join('');
    }

    // 3. Render Tier 2: Category Breakdown (Symmetrical 4-Card Responsive Grid)
    const catContainer = document.getElementById('admin-category-breakdown-list');
    if (catContainer) {
        const isEn = (currentLang === 'en');
        const catConfig = {
            business: {
                name: isEn ? 'Business & Strategy' : 'ธุรกิจและกลยุทธ์',
                color: 'from-blue-500 to-indigo-600',
                textColor: 'text-blue-600'
            },
            leadership: {
                name: isEn ? 'Leadership & Management' : 'ภาวะผู้นำและการจัดการ',
                color: 'from-emerald-500 to-teal-600',
                textColor: 'text-emerald-600'
            },
            innovation: {
                name: isEn ? 'Innovation & Design' : 'นวัตกรรมและการออกแบบ',
                color: 'from-purple-500 to-pink-600',
                textColor: 'text-purple-600'
            },
            softskills: {
                name: isEn ? 'Soft Skills & Communication' : 'ทักษะปฏิสัมพันธ์และการสื่อสาร',
                color: 'from-orange-500 to-amber-600',
                textColor: 'text-orange-600'
            }
        };

        const catTotals = {
            business: 0,
            leadership: 0,
            innovation: 0,
            softskills: 0
        };

        allCourses.forEach(c => {
            const cViews = views[c.id] || 0;
            if (catTotals[c.category] !== undefined) {
                catTotals[c.category] += cViews;
            }
        });

        catContainer.innerHTML = Object.keys(catTotals).map(catKey => {
            const conf = catConfig[catKey] || { name: catKey, color: 'from-slate-500 to-slate-700', textColor: 'text-slate-600' };
            const catViews = catTotals[catKey];
            const percent = totalCourseViews > 0 ? ((catViews / totalCourseViews) * 100).toFixed(1) : 0;

            return `
                <div class="space-y-2.5 p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all group">
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800 truncate group-hover:text-slate-950">${conf.name}</span>
                        <span class="font-black ${conf.textColor} text-xs shrink-0">${percent}%</span>
                    </div>
                    <div class="flex items-baseline justify-between">
                        <span class="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">${catViews.toLocaleString()}</span>
                        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${isEn ? 'views' : 'ครั้ง'}</span>
                    </div>
                    <div class="w-full h-2.5 rounded-full bg-slate-100 border border-slate-200/70 p-0.5 shadow-inner overflow-hidden">
                        <div class="h-full rounded-full bg-gradient-to-r ${conf.color} shadow-xs transition-all duration-700" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 4. Render Tier 3: 12-Month Rolling Trend Graph (Current Year 2026)
    renderMonthlyTrendChart();

    // 5. Render Tier 3: Month-over-Month (MoM) Growth Matrix Table
    render2YearMonthlyMatrixTable();
}

let currentTrendGraphYear = '2026'; // '2026' | '2025'

function setTrendGraphYear(year) {
    currentTrendGraphYear = year;
    const btn2026 = document.getElementById('admin-trend-btn-2026');
    const btn2025 = document.getElementById('admin-trend-btn-2025');
    const activeClass = "px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#FF8A48] via-[#FA541C] to-[#D4380D] text-white shadow-xs transition-all cursor-pointer whitespace-nowrap";
    const inactiveClass = "px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer whitespace-nowrap";
    
    if (btn2026) btn2026.className = (year === '2026') ? activeClass : inactiveClass;
    if (btn2025) btn2025.className = (year === '2025') ? activeClass : inactiveClass;
    
    renderMonthlyTrendChart();
}

function renderMonthlyTrendChart() {
    const container = document.getElementById('admin-monthly-trend-bars-container');
    if (!container) return;

    const timeseries = getStoredTimeseriesViews();
    const monthlyData = timeseries.monthlyDistribution2026 || DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2026;

    const isEn = (currentLang === 'en');
    const months = isEn 
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    const currentMonthIdx = 9; // October (0-indexed)
    const maxVal = Math.max(...monthlyData, 200);

    container.innerHTML = months.map((monthName, idx) => {
        const val = monthlyData[idx] || 0;
        const isCurrent = idx === currentMonthIdx;
        const isFuture = idx > currentMonthIdx;
        const heightPercent = maxVal > 0 ? Math.max(isFuture ? 6 : 10, (val / maxVal) * 100) : 10;

        let barColor = 'bg-gradient-to-t from-slate-400 via-slate-300 to-slate-200 group-hover:from-orange-500 group-hover:to-orange-400 shadow-xs';
        let badgeStyle = 'bg-white/95 text-slate-700 border border-slate-200/90 shadow-2xs font-bold';
        let cardBg = 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md';

        if (isCurrent) {
            barColor = 'bg-gradient-to-t from-[#B32400] via-[#FA541C] to-[#FFA940] shadow-[0_6px_22px_rgba(250,84,28,0.55)] ring-2 ring-orange-400/80';
            badgeStyle = 'bg-gradient-to-r from-[#FF8A48] via-[#FA541C] to-[#D4380D] text-white font-black shadow-md shadow-orange-500/35 border border-orange-300 ring-2 ring-orange-200';
            cardBg = 'bg-gradient-to-b from-orange-50/90 via-white to-orange-50/60 border-orange-300 ring-2 ring-orange-400/25 shadow-lg shadow-orange-500/15 -translate-y-1.5';
        } else if (isFuture) {
            barColor = 'bg-slate-200/40 border border-dashed border-slate-300';
            badgeStyle = 'bg-slate-100/70 text-slate-400 border border-dashed border-slate-200 font-medium';
            cardBg = 'bg-slate-50/40 border-dashed border-slate-200/80 opacity-70';
        }

        return `
            <div class="flex flex-col items-center justify-end h-full gap-2 p-1.5 sm:p-2 rounded-2xl border ${cardBg} transition-all duration-300 group cursor-default select-none relative admin-pillar-stage">
                <!-- Value Stat Badge -->
                <div class="text-center w-full">
                    <span class="px-1.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono ${badgeStyle} block whitespace-nowrap">
                        ${isFuture ? '-' : val.toLocaleString()}
                    </span>
                    ${isCurrent ? `
                        <div class="flex items-center justify-center gap-1 mt-0.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#FA541C] animate-pulse"></span>
                            <span class="text-[9px] font-black text-[#FA541C] tracking-tight">MTD</span>
                        </div>
                    ` : ''}
                </div>

                <!-- Clean Column Slot -->
                <div class="w-full flex flex-col justify-end items-center h-28 sm:h-34 bg-slate-100/70 rounded-xl p-1 border border-slate-200/70 relative overflow-hidden">
                    <!-- Subtle height line indicator -->
                    <div class="absolute inset-x-0 top-1/2 border-b border-slate-200/60 pointer-events-none"></div>

                    <!-- Clean Bar -->
                    <div class="w-full max-w-[26px] sm:max-w-[32px] rounded-t-lg rounded-b-sm ${barColor} transition-all duration-700 ease-out relative" style="height: ${heightPercent}%;"></div>
                </div>

                <!-- Month Label -->
                <div class="text-center pt-1 border-t border-slate-200/70 w-full">
                    <span class="text-[10px] sm:text-xs font-black ${isCurrent ? 'text-[#FA541C]' : 'text-slate-700'} block truncate">
                        ${monthName}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function render2YearMonthlyMatrixTable() {
    const container = document.getElementById('admin-monthly-2year-matrix-container');
    if (!container) return;

    const timeseries = getStoredTimeseriesViews();
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const currentActualYear = 2026;
    const currentActualMonthIdx = 9; // October (0-indexed)

    // Select dataset according to currentMoMYear
    let monthlyData = [];
    if (currentMoMYear === 2026) {
        monthlyData = timeseries.monthlyDistribution2026 || DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2026;
    } else if (currentMoMYear === 2025) {
        monthlyData = timeseries.monthlyDistribution2025 || DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2025;
    } else if (currentMoMYear === 2027) {
        monthlyData = timeseries.monthlyDistribution2027 || DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2027;
    } else if (currentMoMYear === 2028) {
        monthlyData = timeseries.monthlyDistribution2028 || DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2028;
    } else {
        monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    
    const monthsFull = isEn ? [
        'January (Jan)', 'February (Feb)', 'March (Mar)', 'April (Apr)',
        'May (May)', 'June (Jun)', 'July (Jul)', 'August (Aug)',
        'September (Sep)', 'October (Oct)', 'November (Nov)', 'December (Dec)'
    ] : [
        'มกราคม (Jan)', 'กุมภาพันธ์ (Feb)', 'มีนาคม (Mar)', 'เมษายน (Apr)',
        'พฤษภาคม (May)', 'มิถุนายน (Jun)', 'กรกฎาคม (Jul)', 'สิงหาคม (Aug)',
        'กันยายน (Sep)', 'ตุลาคม (Oct)', 'พฤศจิกายน (Nov)', 'ธันวาคม (Dec)'
    ];

    let cumulativeTotal = 0;
    let recordedMonthsCount = 0;

    const rowsHtml = monthsFull.map((mName, idx) => {
        const val = (monthlyData && typeof monthlyData[idx] === 'number') ? monthlyData[idx] : 0;
        
        let isPastMonth = false;
        let isCurrentMonth = false;
        let isFutureMonth = false;

        if (currentMoMYear < currentActualYear) {
            isPastMonth = true;
        } else if (currentMoMYear > currentActualYear) {
            isFutureMonth = true;
        } else {
            // Year 2026
            if (idx < currentActualMonthIdx) {
                isPastMonth = true;
            } else if (idx === currentActualMonthIdx) {
                isCurrentMonth = true;
            } else {
                isFutureMonth = true;
            }
        }

        let viewsDisplay = '-';
        let prevMonthStr = '-';
        let deltaStr = '-';
        let growthStr = '-';
        let cumulativeStr = '-';
        let statusBadge = '';

        if (isFutureMonth) {
            viewsDisplay = '<span class="text-slate-400 font-mono">-</span>';
            prevMonthStr = '<span class="text-slate-400 font-mono">-</span>';
            deltaStr = '<span class="text-slate-400 font-mono">-</span>';
            growthStr = '<span class="text-slate-400 font-mono">-</span>';
            cumulativeStr = '<span class="text-slate-400 font-mono">-</span>';
            statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 border border-slate-200 text-[11px] font-medium whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span><span>${isEn ? 'Upcoming' : 'ยังไม่ถึงรอบ'}</span></span>`;
        } else {
            // Past or Current month (Elapsed round)
            recordedMonthsCount++;
            cumulativeTotal += val;
            cumulativeStr = `${cumulativeTotal.toLocaleString()}`;

            if (isCurrentMonth) {
                viewsDisplay = `${val.toLocaleString()} <span class="text-[10px] font-black text-[#FA541C] bg-orange-100/90 px-2 py-0.5 rounded-md border border-orange-300/80 ml-1">MTD</span>`;
            } else {
                viewsDisplay = `<span class="${val > 0 ? 'text-slate-900 font-bold' : 'text-slate-500'} font-mono">${val.toLocaleString()}</span>`;
            }

            if (idx === 0) {
                // January: Baseline Month
                prevMonthStr = `<span class="text-slate-400 font-medium">${isEn ? 'Baseline' : 'เดือนเริ่มต้น'}</span>`;
                deltaStr = '<span class="text-slate-400 font-mono">0</span>';
                growthStr = '<span class="text-slate-400 font-medium">Base</span>';
                statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-black whitespace-nowrap shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span><span>${isEn ? 'Baseline' : 'เริ่มต้น (Base)'}</span></span>`;
            } else {
                const prevVal = (monthlyData && typeof monthlyData[idx - 1] === 'number') ? monthlyData[idx - 1] : 0;
                prevMonthStr = `${prevVal.toLocaleString()}`;

                const delta = val - prevVal;
                const isPos = delta > 0;
                const isZero = delta === 0;

                let growthPct = '0.00';
                if (prevVal > 0) {
                    growthPct = ((delta / prevVal) * 100).toFixed(2);
                } else if (val > 0) {
                    growthPct = '100.00';
                }

                if (isZero) {
                    deltaStr = `<span class="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">0</span>`;
                    growthStr = `<span class="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">0.00%</span>`;
                } else if (isPos) {
                    deltaStr = `<span class="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">+${delta.toLocaleString()}</span>`;
                    growthStr = `<span class="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">+${growthPct}%</span>`;
                } else {
                    deltaStr = `<span class="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">${delta.toLocaleString()}</span>`;
                    growthStr = `<span class="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">${growthPct}%</span>`;
                }

                if (isCurrentMonth) {
                    statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-300 text-[11px] font-black whitespace-nowrap shadow-xs ring-1 ring-amber-300/40"><span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span><span>${isEn ? 'Current (MTD)' : 'ปัจจุบัน (MTD)'}</span></span>`;
                } else if (val === 0 && prevVal === 0) {
                    statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-bold whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span><span>${isEn ? 'Recorded (0 views)' : 'ผ่านรอบแล้ว (0 วิว)'}</span></span>`;
                } else if (isPos) {
                    statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-black whitespace-nowrap shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span><span>${isEn ? 'Growing (+MoM)' : 'เติบโต (+MoM)'}</span></span>`;
                } else {
                    statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-black whitespace-nowrap shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span><span>${isEn ? 'Declining (-MoM)' : 'ชะลอตัว (-MoM)'}</span></span>`;
                }
            }
        }

        const rowHighlight = isCurrentMonth 
            ? 'bg-gradient-to-r from-orange-50/90 via-amber-50/40 to-transparent border-l-4 border-l-[#FA541C] shadow-xs' 
            : 'hover:bg-slate-50/90 transition-colors border-b border-slate-100';

        return `
            <tr class="${rowHighlight} text-xs">
                <td class="py-3 px-3 sm:px-4 font-bold ${isCurrentMonth ? 'text-[#FA541C]' : 'text-slate-900'} whitespace-nowrap">${mName}</td>
                <td class="py-3 px-3 sm:px-4 font-black ${isCurrentMonth ? 'text-[#FA541C]' : 'text-slate-900'} font-mono whitespace-nowrap">${viewsDisplay}</td>
                <td class="py-3 px-3 sm:px-4 text-slate-600 font-mono whitespace-nowrap">${prevMonthStr}</td>
                <td class="py-3 px-3 sm:px-4 whitespace-nowrap">${deltaStr}</td>
                <td class="py-3 px-3 sm:px-4 whitespace-nowrap">${growthStr}</td>
                <td class="py-3 px-3 sm:px-4 font-mono font-bold text-slate-800 whitespace-nowrap">${cumulativeStr}</td>
                <td class="py-3 px-3 sm:px-4 text-right whitespace-nowrap">${statusBadge}</td>
            </tr>
        `;
    }).join('');

    const monthlyAvg = recordedMonthsCount > 0 ? Math.round(cumulativeTotal / recordedMonthsCount) : 0;
    const janVal = (monthlyData && typeof monthlyData[0] === 'number') ? monthlyData[0] : 0;
    const lastRecordedVal = (recordedMonthsCount > 0 && monthlyData) ? (monthlyData[recordedMonthsCount - 1] || 0) : 0;
    const totalGrowth = janVal > 0 ? (((lastRecordedVal - janVal) / janVal) * 100).toFixed(2) : '0.00';

    container.innerHTML = `
        <div class="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs bg-white">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 tracking-wider bg-slate-50/80">
                        <th class="py-3.5 px-3 sm:px-4 rounded-tl-xl whitespace-nowrap">${isEn ? 'Month' : 'เดือน'}</th>
                        <th class="py-3 px-3 sm:px-4 whitespace-nowrap">
                            <div class="inline-flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-2xs hover:border-[#FA541C] transition-colors">
                                <label for="admin-mom-year-select" class="text-slate-600 font-bold text-[11px] cursor-pointer">${isEn ? 'Year' : 'ยอดปี'}:</label>
                                <select id="admin-mom-year-select" onchange="setAdminMoMYear(this.value)" class="bg-transparent font-black text-slate-900 text-xs focus:outline-none cursor-pointer">
                                    <option value="2026" ${currentMoMYear === 2026 ? 'selected' : ''}>2026 (${isEn ? 'Current' : 'ปัจจุบัน'})</option>
                                    <option value="2027" ${currentMoMYear === 2027 ? 'selected' : ''}>2027 (${isEn ? 'Next' : 'ปีถัดไป'})</option>
                                    <option value="2028" ${currentMoMYear === 2028 ? 'selected' : ''}>2028</option>
                                    <option value="2025" ${currentMoMYear === 2025 ? 'selected' : ''}>2025 (${isEn ? 'Archive' : 'ย้อนหลัง'})</option>
                                </select>
                                <span class="text-[10px] text-slate-400 font-mono">(Views)</span>
                            </div>
                        </th>
                        <th class="py-3.5 px-3 sm:px-4 whitespace-nowrap">${isEn ? 'Previous Month' : 'เดือนก่อนหน้า'}</th>
                        <th class="py-3.5 px-3 sm:px-4 whitespace-nowrap">${isEn ? 'Delta' : 'ผลต่าง (Delta)'}</th>
                        <th class="py-3.5 px-3 sm:px-4 whitespace-nowrap">${isEn ? '% Growth (MoM)' : '% เติบโต (MoM)'}</th>
                        <th class="py-3.5 px-3 sm:px-4 whitespace-nowrap">${isEn ? 'Cumulative (YTD)' : 'ยอดสะสม (YTD)'}</th>
                        <th class="py-3.5 px-3 sm:px-4 text-right rounded-tr-xl whitespace-nowrap">${isEn ? 'Trend Status' : 'สถานะแนวโน้ม'}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${rowsHtml}
                </tbody>
                <tfoot>
                    <tr class="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 font-black text-xs text-slate-900 border-t-2 border-slate-300">
                        <td class="py-4 px-3 sm:px-4 rounded-bl-xl whitespace-nowrap">${isEn ? `Total Cumulative (${currentMoMYear} YTD)` : `รวมสะสมทั้งปี (${currentMoMYear} YTD)`}</td>
                        <td class="py-4 px-3 sm:px-4 font-mono text-[#FA541C] whitespace-nowrap">${cumulativeTotal.toLocaleString()} ${isEn ? 'views' : 'วิว'}</td>
                        <td class="py-4 px-3 sm:px-4 text-slate-500 font-medium whitespace-nowrap">${isEn ? 'Avg' : 'เฉลี่ย'} ${monthlyAvg.toLocaleString()}/${isEn ? 'mo.' : 'ด.'}</td>
                        <td class="py-4 px-3 sm:px-4 font-mono text-emerald-600 whitespace-nowrap">${(lastRecordedVal >= janVal ? '+' : '')}${(lastRecordedVal - janVal).toLocaleString()}</td>
                        <td class="py-4 px-3 sm:px-4 font-mono text-emerald-600 whitespace-nowrap">${(parseFloat(totalGrowth) >= 0 ? '+' : '')}${totalGrowth}%</td>
                        <td class="py-4 px-3 sm:px-4 font-mono text-slate-900 whitespace-nowrap">${cumulativeTotal.toLocaleString()}</td>
                        <td class="py-4 px-3 sm:px-4 text-right text-[11px] text-slate-500 font-medium rounded-br-xl whitespace-nowrap">${recordedMonthsCount} ${isEn ? 'months recorded' : 'เดือนที่บันทึกแล้ว'}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
}

function exportCourseViewsCSV() {
    try {
        const timeseries = getStoredTimeseriesViews();
        const views = timeseries[currentAdminTimeFilter] || timeseries.all;
        const weekNum = getISOWeekNumber(new Date());
        const periodNames = {
            all: 'ภาพรวมทั้งหมด (All-Time Cumulative)',
            week: `ประจำสัปดาห์นี้ (This Week - W${String(weekNum).padStart(2, '0')})`,
            month: 'ประจำเดือนนี้ (This Month - ตุลาคม 2026)',
            year2026: 'ประจำปี 2026 (Year 2026)'
        };
        const periodLabel = periodNames[currentAdminTimeFilter] || 'All-Time';
        const portalVisits = (timeseries.portalVisits && typeof timeseries.portalVisits[currentAdminTimeFilter] === 'number') 
            ? timeseries.portalVisits[currentAdminTimeFilter] 
            : ((timeseries.portalVisits && typeof timeseries.portalVisits.all === 'number') 
                ? timeseries.portalVisits.all 
                : 0);

        let totalCourseViews = 0;
        const sorted = [...allCourses].map(c => {
            const v = views[c.id] || 0;
            totalCourseViews += v;
            return { ...c, views: v };
        }).sort((a, b) => b.views - a.views);

        const convRate = portalVisits > 0 ? ((totalCourseViews / portalVisits) * 100).toFixed(2) + '%' : '0%';

        const rows = [
            ['====================================================================================================', ''],
            ['รายงานสรุปสถิติยอดการเข้าชม 3 มิติ (BAFS GROUP Smart Learning Platform Analytics Report)', ''],
            ['แพลตฟอร์มการจัดการความรู้ BAFS GROUP Smart Learning Platform • แผนกพัฒนาองค์กร (HOD)', ''],
            [`วันที่ออกรายงาน (Export Date): ${new Date().toLocaleString('th-TH')}`, ''],
            [`ช่วงเวลาตัวกรองที่เลือก (Active Filter Range): ${periodLabel}`, ''],
            ['====================================================================================================', ''],
            [],
            ['[ส่วนที่ 1: สถิติการเข้าดู Website (Portal Traffic & Visitor Engagement)]', ''],
            ['ตัวชี้วัด (Metric)', 'ค่าสถิติ (Value)', 'คำอธิบาย (Description)'],
            ['ยอดเข้าชมเว็บไซต์ (Portal Visits)', portalVisits, 'จำนวนผู้เข้าชมหน้าแรกสะสม'],
            ['ยอดเปิดดูหลักสูตรสะสม (Total Course Views)', totalCourseViews, 'จำนวนครั้งที่เปิดดูเนื้อหา 9 หลักสูตรหลัก'],
            ['อัตรา Engagement / Conversion Rate', convRate, 'สัดส่วนผู้เข้าชมเว็บที่เปิดดูบทเรียน'],
            ['สถานะเชื่อมต่อ Google Sheets Live Sync', 'Active & Real-Time', 'https://docs.google.com/spreadsheets/d/1wo3o3hNVNTFmWEk44SZMSyEPvEaZ7asEFeDthkD8pUk/edit'],
            [],
            ['[ส่วนที่ 2: สถิติความนิยมรายหลักสูตร (9 Masterclasses Course-Level Analytics)]', ''],
            ['อันดับ (Rank)', 'รหัสหลักสูตร (ID)', 'ชื่อหลักสูตร (Course Title)', 'หมวดหมู่ (Category)', 'ปีหลักสูตร (Course Year)', 'วิทยากร / ผู้สอน (Instructor)', `จำนวนครั้งที่เข้าชม (${periodLabel})`, 'สัดส่วนเปอร์เซ็นต์ (% Share)'],
        ];

        sorted.forEach((c, idx) => {
            const percent = totalCourseViews > 0 ? ((c.views / totalCourseViews) * 100).toFixed(2) + '%' : '0%';
            rows.push([
                idx + 1,
                c.id,
                `"${(c.title_th || c.title).replace(/"/g, '""')}"`,
                `"${(c.badgeText_th || c.badgeText).replace(/"/g, '""')}"`,
                c.year,
                `"${(c.instructor_th || c.instructor || '').replace(/"/g, '""')}"`,
                c.views,
                percent
            ]);
        });

        rows.push([]);
        rows.push(['สรุปรวม 9 หลักสูตร (Course Views Total)', '', '', '', '', '', totalCourseViews, '100.00%']);
        rows.push(['ค่าเฉลี่ยต่อหลักสูตร (Course Views Average)', '', '', '', '', '', Math.round(totalCourseViews / 9), '']);
        rows.push([]);

        // Section 3: 2026 Month-over-Month (MoM) Trend Table
        const data2026 = timeseries.monthlyDistribution2026 || DEFAULT_TIMESERIES_VIEWS.monthlyDistribution2026;
        const monthsFull = [
            'มกราคม (Jan)', 'กุมภาพันธ์ (Feb)', 'มีนาคม (Mar)', 'เมษายน (Apr)',
            'พฤษภาคม (May)', 'มิถุนายน (Jun)', 'กรกฎาคม (Jul)', 'สิงหาคม (Aug)',
            'กันยายน (Sep)', 'ตุลาคม (Oct)', 'พฤศจิกายน (Nov)', 'ธันวาคม (Dec)'
        ];

        rows.push(['[ส่วนที่ 3: ตารางวิเคราะห์แนวโน้มการเติบโตรายเดือนปี 2026 (2026 Month-over-Month MoM Trend Analytics)]', '']);
        rows.push(['เดือน (Month)', 'ยอดเข้าชมปี 2026 (Monthly Views)', 'ยอดเดือนก่อนหน้า (Previous Month)', 'ผลต่างเทียบ MoM (Delta)', 'อัตราเติบโต MoM (% Growth)', 'ยอดสะสมต้นปี (Cumulative YTD)', 'สถานะแนวโน้ม']);

        let cumSum = 0;
        monthsFull.forEach((mName, idx) => {
            const v26 = data2026[idx];
            const isFuture = idx > 9;
            let prevMonth = '-';
            let delta = '-';
            let growth = '-';
            let cumStr = '-';
            let status = isFuture ? 'ยังไม่ถึงรอบบันทึก' : (idx === 9 ? 'อยู่ระหว่างรอบเดือน (MTD)' : 'ปกติ');

            if (!isFuture && v26 !== undefined && v26 > 0) {
                cumSum += v26;
                cumStr = cumSum;
                if (idx === 0) {
                    prevMonth = 'Baseline';
                    delta = '0';
                    growth = '0.00%';
                    status = 'เดือนเริ่มต้น (Baseline)';
                } else {
                    const pVal = data2026[idx - 1] || 0;
                    prevMonth = pVal;
                    const d = v26 - pVal;
                    delta = `${d >= 0 ? '+' : ''}${d}`;
                    growth = `${d >= 0 ? '+' : ''}${pVal > 0 ? ((d / pVal) * 100).toFixed(2) : 0}%`;
                    if (idx !== 9) {
                        status = d >= 0 ? 'เติบโตเพิ่มขึ้น (MoM Growth)' : 'ชะลอตัวลง (Decline)';
                    }
                }
            }

            rows.push([
                mName,
                isFuture ? '-' : (v26 || 0),
                prevMonth,
                delta,
                growth,
                cumStr,
                status
            ]);
        });

        rows.push([]);
        rows.push(['รวมสะสมปี 2026 (YTD 2026 Total)', cumSum, `เฉลี่ย ${Math.round(cumSum / 10)} views/เดือน`, '', '', cumSum, '10 เดือนบันทึกผล']);

        const csvContent = '\uFEFF' + rows.map(e => e.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        const dateStr = new Date().toISOString().slice(0, 10);
        link.setAttribute('download', `BAFS_Executive_View_Analytics_Report_${dateStr}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToastNotification(currentLang === 'en' ? 'Exported Full Executive CSV Report successfully!' : 'ส่งออกรายงาน Full Executive CSV ครบ 3 มิติเรียบร้อยแล้ว!');
    } catch (e) {
        console.error('Error exporting CSV:', e);
        alert('เกิดข้อผิดพลาดในการส่งออกไฟล์ CSV');
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
function initApp() {
    trackPortalVisit();
    setupSearchListeners();
    applyCatalogFilters();
    fetchWisdomFromGoogleSheets();
    renderFeaturedMasterclasses();
    initRadarChart();
    setLanguage('th');
    syncDashboardFromGoogleSheets();
    if (typeof initBafsShelf === 'function') {
        initBafsShelf();
    }
}

// ==========================================
// RENDER FUNCTIONS
// ==========================================
function renderCourseCatalog(coursesToRender) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    if (coursesToRender.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center text-slate-400 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-8 space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <h3 class="text-base font-black text-slate-800">${currentLang === 'en' ? 'No courses found matching your criteria' : 'ไม่พบหลักสูตรที่ตรงกับเงื่อนไขการค้นหา'}</h3>
                <p class="text-xs text-slate-500 max-w-sm mx-auto">${currentLang === 'en' ? 'Try searching different keywords or reset category and year filters.' : 'ลองเปลี่ยนคำค้นหา หรือเลือกหมวดเนื้อหาและปีการอบรมใหม่อีกครั้ง'}</p>
                <button onclick="resetCatalogFilters()" class="mt-2 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-orange-50 text-[#FA541C] hover:bg-[#FA541C] hover:text-white font-bold text-xs transition-all shadow-sm cursor-pointer">
                    <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <span>${currentLang === 'en' ? 'Reset All Filters' : 'ล้างตัวกรองทั้งหมด'}</span>
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = coursesToRender.map(course => {
        const isCompleted = completedCourses.includes(course.id);
        const title = currentLang === 'en' ? (course.title_en || course.title) : (course.title_th || course.title);
        const desc = currentLang === 'en' ? (course.desc_en || course.desc) : (course.desc_th || course.desc);
        const duration = currentLang === 'en' ? (course.duration_en || course.duration) : (course.duration_th || course.duration);
        const learners = currentLang === 'en' ? (course.learners_en || `${course.learners} learners`) : (course.learners_th || `${course.learners} คน`);
        const yearLabel = currentLang === 'en' ? `Year ${course.year}` : `ปี ${course.year}`;
        const actionText = currentLang === 'en' ? 'Start Course' : 'เข้าสู่บทเรียน';
        const completedText = currentLang === 'en' ? 'Completed' : 'เรียนจบแล้ว';
        const badge = currentLang === 'en' ? (course.badgeText_en || course.badgeText) : (course.badgeText_th || course.badgeText);
        const viewsCount = getCourseViews(course.id);

        return `
            <div class="card-course flex flex-col group cursor-pointer" onclick="openCourseModal(${course.id})">
                <!-- Course Cover -->
                <div class="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img src="${course.cover}" alt="${title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='hero_conicle_illustration.png'">
                    <div class="absolute top-3 left-3">
                        <span class="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase badge-${course.badgeColor}">
                            ${badge}
                        </span>
                    </div>
                    <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-slate-800 shadow-sm flex items-center gap-1">
                        <svg class="w-3 h-3 fill-amber-400 stroke-amber-500" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                        <span>${course.rating}</span>
                    </div>
                    ${isCompleted ? `
                        <div class="absolute bottom-3 right-3 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-md">
                            <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                            <span>${completedText}</span>
                        </div>
                    ` : ''}
                </div>

                <!-- Content -->
                <div class="p-5 flex flex-col flex-1 justify-between">
                    <div class="space-y-2.5">
                        <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                            <span class="inline-flex items-center gap-1">
                                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>${duration}</span>
                            </span>
                            <span class="text-slate-300">•</span>
                            <span class="inline-flex items-center gap-1">
                                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span>${yearLabel}</span>
                            </span>
                            <span class="text-slate-300">•</span>
                            <span class="inline-flex items-center gap-1">
                                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                <span>${viewsCount.toLocaleString()} ${currentLang === 'en' ? 'views' : 'ครั้ง'}</span>
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 group-hover:text-[#FA541C] transition-colors leading-snug line-clamp-2">
                            ${title}
                        </h3>
                        <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            ${desc}
                        </p>
                    </div>

                    <!-- Tags & Action -->
                    <div class="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div class="flex items-center gap-1.5 min-w-0 overflow-hidden">
                            ${course.tags.slice(0, 2).map(tag => `
                                <span class="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-semibold text-slate-500 truncate whitespace-nowrap">
                                    #${tag}
                                </span>
                            `).join('')}
                        </div>
                        <span class="text-xs font-black text-[#FA541C] group-hover:translate-x-1 transition-transform flex items-center gap-1 whitespace-nowrap shrink-0">
                            <span>${actionText}</span>
                            <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderFeaturedMasterclasses() {
    const featuredContainer = document.getElementById('featured-courses-row');
    if (!featuredContainer) return;

    const featured = allCourses.slice(0, 4);
    featuredContainer.innerHTML = featured.map(c => {
        const title = currentLang === 'en' ? (c.title_en || c.title) : (c.title_th || c.title);
        const duration = currentLang === 'en' ? (c.duration_en || c.duration) : (c.duration_th || c.duration);
        const badge = currentLang === 'en' ? (c.badgeText_en || c.badgeText) : (c.badgeText_th || c.badgeText);
        const viewText = currentLang === 'en' ? 'View Details' : 'ดูรายละเอียด';
        const viewsCount = getCourseViews(c.id);

        return `
            <div class="card-course flex-shrink-0 w-80 flex flex-col group cursor-pointer" onclick="openCourseModal(${c.id})">
                <div class="relative h-40 w-full overflow-hidden bg-slate-100">
                    <img src="${c.cover}" alt="${title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='hero_conicle_illustration.png'">
                    <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black badge-${c.badgeColor}">
                        ${badge}
                    </span>
                </div>
                <div class="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                            <span class="inline-flex items-center gap-1">
                                <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>${duration}</span>
                            </span>
                            <span class="text-slate-300">•</span>
                            <span class="inline-flex items-center gap-1 text-amber-600 font-semibold">
                                <svg class="w-3 h-3 fill-amber-400 stroke-amber-500 shrink-0" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                                <span>${c.rating}</span>
                            </span>
                            <span class="text-slate-300">•</span>
                            <span class="inline-flex items-center gap-1">
                                <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                <span>${viewsCount.toLocaleString()}</span>
                            </span>
                        </div>
                        <h4 class="text-sm font-black text-slate-900 line-clamp-2 mt-1.5 group-hover:text-[#FA541C] transition-colors leading-snug">
                            ${title}
                        </h4>
                    </div>
                    <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-black text-[#FA541C]">
                        <span>${viewText}</span>
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderWisdomCards() {
    const mainContainer = document.getElementById('wisdom-posts-list-main');
    const homeContainer = document.getElementById('wisdom-posts-list');
    const countBadge = document.getElementById('wisdom-posts-count-badge');

    // 1. Filter Posts
    let filtered = wisdomPosts.filter(post => {
        // Category filter
        if (activeWisdomCategory !== 'all' && post.category !== activeWisdomCategory) {
            return false;
        }
        // Tag filter
        if (activeWisdomTag && !post.tags.includes(activeWisdomTag)) {
            return false;
        }
        // Search Query filter
        if (wisdomSearchQuery) {
            const q = wisdomSearchQuery.toLowerCase();
            const matchTitle = post.title.toLowerCase().includes(q);
            const matchContent = post.content.toLowerCase().includes(q);
            const matchAuthor = post.author.toLowerCase().includes(q);
            const matchTag = post.tags.some(t => t.toLowerCase().includes(q));
            if (!matchTitle && !matchContent && !matchAuthor && !matchTag) {
                return false;
            }
        }
        return true;
    });

    // 2. Sort Posts
    if (currentWisdomSort === 'popular') {
        filtered.sort((a, b) => b.likes - a.likes);
    } else {
        // 'latest'
        filtered.sort((a, b) => (b.id > a.id ? 1 : -1));
    }

    // 3. Update Count Badge
    if (countBadge) {
        countBadge.textContent = currentLang === 'en' ? `${filtered.length} Insights` : `${filtered.length} เรื่อง`;
    }

    // 4. Empty State
    if (filtered.length === 0) {
        const isNoPostsYet = wisdomPosts.length === 0;
        const emptyHtml = isNoPostsYet ? `
            <div class="col-span-full [column-span:all] p-12 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                <div class="w-12 h-12 mx-auto rounded-2xl bg-orange-100 text-[#FA541C] flex items-center justify-center shadow-xs">
                    <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                </div>
                <h4 class="text-sm font-black text-slate-800">${currentLang === 'en' ? 'No shared insights yet' : 'ยังไม่มีข้อมูลการแบ่งปันองค์ความรู้'}</h4>
                <p class="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">${currentLang === 'en' ? 'Be the first to share your knowledge, experience, or best practices with colleagues!' : 'ร่วมเป็นคนแรกในการแบ่งปันประสบการณ์ เทคนิคการทำงาน หรือ Best Practice ให้กับเพื่อนร่วมงาน!'}</p>
                <button onclick="openWisdomShareModal()" class="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF8A48] via-[#FA541C] to-[#D4380D] text-white text-xs font-black shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 mx-auto">
                    <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                    </svg>
                    <span>${currentLang === 'en' ? 'Share Knowledge Now' : 'แบ่งปันความรู้ใหม่'}</span>
                </button>
            </div>
        ` : `
            <div class="col-span-full [column-span:all] p-12 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                <div class="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-xs">
                    <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <h4 class="text-sm font-black text-slate-800">${currentLang === 'en' ? 'No insights found matching your criteria' : 'ไม่พบองค์ความรู้ที่ตรงกับเงื่อนไข'}</h4>
                <p class="text-xs text-slate-500 max-w-sm mx-auto">${currentLang === 'en' ? 'Try searching different keywords or resetting filters.' : 'ลองเปลี่ยนคำค้นหา หรือคลิกดูหมวดหมู่ทั้งหมด'}</p>
                <button onclick="filterWisdomByCategory('all', null); clearWisdomSearch();" class="mt-2 px-4 py-2 rounded-xl bg-orange-50 text-[#FA541C] text-xs font-bold hover:bg-[#FA541C] hover:text-white transition-all cursor-pointer">
                    ${currentLang === 'en' ? 'Reset Filters' : 'ล้างตัวกรองทั้งหมด'}
                </button>
            </div>
        `;
        if (mainContainer) mainContainer.innerHTML = emptyHtml;
        if (homeContainer) homeContainer.innerHTML = emptyHtml;
        updateWisdomStats();
        return;
    }

    // 5. Generate Cards HTML (High-Contrast White Theme Cards with Rich Deep Contrast)
    const isEn = currentLang === 'en';
    const htmlContent = filtered.map(post => {
        const catLabel = isEn ? (post.catLabel_en || 'Insight') : (post.catLabel_th || 'องค์ความรู้');
        
        const catBadgeMap = {
            operations: 'bg-blue-100/90 text-blue-800 border-blue-200',
            leadership: 'bg-orange-100/90 text-[#FA541C] border-orange-200',
            tech: 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
            innovation: 'bg-purple-100/90 text-purple-800 border-purple-200',
            softskills: 'bg-amber-100/90 text-amber-900 border-amber-200',
            other: 'bg-slate-100 text-slate-800 border-slate-200'
        };
        const badgeClass = catBadgeMap[post.category] || 'bg-orange-100/90 text-[#FA541C] border-orange-200';
        
        const isCommentsOpen = openCommentsPostIds.has(post.id);
        const isExpanded = expandedWisdomPostIds.has(post.id);
        const commentCount = post.comments ? post.comments.length : 0;
        const initialLetter = post.author ? post.author.trim().charAt(0) : 'B';

        const ratingHtml = post.rating ? `
            <div class="flex items-center gap-0.5 text-amber-500 text-xs select-none">
                ${'★'.repeat(post.rating)}${'☆'.repeat(5 - post.rating)}
            </div>
        ` : '';

        return `
            <div id="wisdom-card-${post.id}" onclick="openWisdomDetailModal('${post.id}')" class="wisdom-card-white-darkshadow break-inside-avoid mb-4 p-5 rounded-3xl text-slate-800 flex flex-col justify-between space-y-3 group text-left cursor-pointer select-none">
                
                <!-- 1. Header: ชื่อผู้แชร์ & หมวด -->
                <div class="flex items-center justify-between gap-2.5">
                    <!-- ชื่อผู้แชร์ -->
                    <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-8 h-8 rounded-2xl bg-gradient-to-tr from-[#FF7A45] via-[#FA541C] to-[#E53935] flex items-center justify-center text-white font-black text-xs shadow-sm shadow-orange-500/20 shrink-0">
                            ${initialLetter}
                        </div>
                        <div class="min-w-0">
                            <h4 class="text-xs font-black text-slate-900 truncate leading-tight group-hover:text-[#FA541C] transition-colors">${post.author}</h4>
                            <p class="text-[10px] text-slate-600 truncate font-semibold">${post.dept || ''}</p>
                        </div>
                    </div>
                    <!-- หมวดหมู่ Tag -->
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 ${badgeClass}">
                        ${catLabel}
                    </span>
                </div>

                <!-- 2. หัวข้อเนื้อหา (Title) -->
                <h4 class="text-sm font-black text-slate-900 leading-snug group-hover:text-[#FA541C] transition-colors">
                    ${post.title}
                </h4>

            </div>
        `;
    }).join('');

    if (mainContainer) mainContainer.innerHTML = htmlContent;
    if (homeContainer) homeContainer.innerHTML = htmlContent;
    updateWisdomStats();
}

function updateWisdomStats() {
    const totalInsightsEl = document.getElementById('stat-total-insights');
    if (totalInsightsEl) totalInsightsEl.textContent = wisdomPosts.length;

    const monthlyRateEl = document.getElementById('stat-monthly-rate');
    if (monthlyRateEl) monthlyRateEl.textContent = wisdomPosts.length;

    const contributorsEl = document.getElementById('stat-active-contributors');
    if (contributorsEl) {
        const uniqueAuthors = new Set(wisdomPosts.map(p => p.author)).size;
        contributorsEl.textContent = uniqueAuthors;
    }

    const totalLikesEl = document.getElementById('stat-total-likes');
    if (totalLikesEl) {
        const totalLikes = wisdomPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
        totalLikesEl.textContent = totalLikes.toLocaleString();
    }

    // Category button counts
    const cats = ['operations', 'leadership', 'tech', 'innovation', 'softskills'];
    cats.forEach(cat => {
        const count = wisdomPosts.filter(p => p.category === cat).length;
        const catCard = document.getElementById(`wisdom-catcard-${cat}`);
        if (catCard) {
            const badge = catCard.querySelector('span.px-2');
            if (badge) {
                badge.textContent = currentLang === 'en' ? `${count} posts` : `${count} เรื่อง`;
            }
        }
    });
}

// ==========================================
// HERO MASCOT INTERACTION (immersive-motion-web-architect)
// ==========================================
function handleHeroMascotTilt(event, container) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const imgWrap = document.getElementById('hero-mascot-img-wrap');
    if (!imgWrap) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3-degree max tilt
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    imgWrap.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
}

function resetHeroMascotTilt(container) {
    const imgWrap = document.getElementById('hero-mascot-img-wrap');
    if (!imgWrap) return;
    imgWrap.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
}

function triggerHeroMascotClick() {
    const mascotImg = document.getElementById('hero-mascot-img');
    if (mascotImg) {
        mascotImg.classList.add('scale-105');
        setTimeout(() => mascotImg.classList.remove('scale-105'), 250);
    }
}

// ==========================================
// SEARCH & AUTOCOMPLETE LOGIC
// ==========================================
function setupSearchListeners() {
    const searchInput = document.getElementById('hero-search-input');
    const dropdown = document.getElementById('search-autocomplete-dropdown');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length === 0) {
            if (dropdown) dropdown.classList.add('hidden');
            return;
        }

        const matches = allCourses.filter(c => 
            c.title.toLowerCase().includes(query) ||
            c.tags.some(t => t.toLowerCase().includes(query)) ||
            c.desc.toLowerCase().includes(query) ||
            c.badgeText.toLowerCase().includes(query)
        );

        if (dropdown) {
            const isEn = currentLang === 'en';
            dropdown.classList.remove('hidden');
            dropdown.innerHTML = `
                <div class="p-3 border-b border-slate-100 bg-orange-50/50 flex items-center justify-between">
                    <span class="text-xs font-black text-[#FA541C] flex items-center gap-1.5">
                        <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                        </svg>
                        <span>${isEn ? `Smart Search for "${query}"` : `ผลการค้นหาอัจฉริยะสำหรับ "${query}"`}</span>
                    </span>
                    <span class="text-[10px] text-slate-600 font-semibold">${isEn ? `Found ${matches.length} results` : `พบ ${matches.length} รายการ`}</span>
                </div>
                <div class="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    ${matches.length > 0 ? matches.map(c => {
                        const title = isEn ? (c.title_en || c.title) : (c.title_th || c.title);
                        const badge = isEn ? (c.badgeText_en || c.badgeText) : (c.badgeText_th || c.badgeText);
                        const duration = isEn ? (c.duration_en || c.duration) : (c.duration_th || c.duration);
                        return `
                            <div onclick="openCourseModal(${c.id}); hideAutocomplete();" class="p-3.5 hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer">
                                <img src="${c.cover}" class="w-12 h-10 rounded-lg object-cover bg-slate-200 shrink-0" onerror="this.src='hero_conicle_illustration.png'">
                                <div class="flex-1 min-w-0 text-left">
                                    <h5 class="text-xs font-black text-slate-800 truncate">${title}</h5>
                                    <div class="flex items-center gap-2 mt-0.5 text-[10px] text-slate-600 font-semibold">
                                        <span class="font-bold text-[#FA541C]">${badge}</span>
                                        <span>•</span>
                                        <span class="flex items-center gap-1">
                                            <svg class="w-3 h-3 stroke-current text-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                                <circle cx="12" cy="12" r="9"/>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 3"/>
                                            </svg>
                                            <span>${duration}</span>
                                        </span>
                                    </div>
                                </div>
                                <svg class="w-3.5 h-3.5 text-slate-400 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                        `;
                    }).join('') : `
                        <div class="p-6 text-center text-xs text-slate-500">
                            ${isEn ? `No masterclasses directly match "${query}"` : `ไม่พบหลักสูตรที่ตรงกับ "${query}" โดยตรง`}<br>
                            <button onclick="triggerAISearch('${query}'); hideAutocomplete();" class="mt-2 text-xs font-black text-[#FA541C] underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer">
                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                </svg>
                                <span>${isEn ? 'Let AI build personalized pathway' : 'ให้ AI ช่วยสร้างเส้นทางการเรียนรู้'}</span>
                            </button>
                        </div>
                    `}
                </div>
            `;
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#hero-search-wrapper') && dropdown) {
            dropdown.classList.add('hidden');
        }
    });
}

function hideAutocomplete() {
    const dropdown = document.getElementById('search-autocomplete-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
}

function handleHeroSearchSubmit(event) {
    if (event) event.preventDefault();
    const searchInput = document.getElementById('hero-search-input');
    if (!searchInput) return;

    const query = searchInput.value.trim();
    if (!query) return;

    hideAutocomplete();
    quickTagSearch(query);
}

function quickTagSearch(keyword) {
    switchTab(1);
    const catalogSearchInput = document.getElementById('catalog-search-input');
    if (catalogSearchInput) {
        catalogSearchInput.value = keyword;
    }
    applyCatalogFilters();

    const catalogView = document.getElementById('view-catalog');
    if (catalogView) {
        catalogView.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================
// CATALOG MULTI-FILTER ENGINE (Keyword, Category, Year)
// ==========================================
function applyCatalogFilters() {
    const searchInput = document.getElementById('catalog-search-input');
    const catSelect = document.getElementById('catalog-category-select');
    const yearSelect = document.getElementById('catalog-year-select');
    const clearBtn = document.getElementById('catalog-search-clear');

    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedCat = catSelect ? catSelect.value : 'all';
    const selectedYear = yearSelect ? yearSelect.value : 'all';

    if (clearBtn) {
        if (query) {
            clearBtn.classList.remove('hidden');
            clearBtn.classList.add('flex');
        } else {
            clearBtn.classList.add('hidden');
            clearBtn.classList.remove('flex');
        }
    }

    const filtered = allCourses.filter(c => {
        // Category condition
        let matchesCat = true;
        if (selectedCat === 'recommended') {
            matchesCat = parseFloat(c.rating) >= 4.92;
        } else if (selectedCat !== 'all') {
            matchesCat = (c.category === selectedCat);
        }

        // Year condition
        let matchesYear = true;
        if (selectedYear !== 'all') {
            matchesYear = (c.year === selectedYear);
        }

        // Keyword query condition
        let matchesQuery = true;
        if (query) {
            matchesQuery = c.title.toLowerCase().includes(query) ||
                c.desc.toLowerCase().includes(query) ||
                (c.instructor && c.instructor.toLowerCase().includes(query)) ||
                (c.badgeText && c.badgeText.toLowerCase().includes(query)) ||
                (c.tags && c.tags.some(t => t.toLowerCase().includes(query)));
        }

        return matchesCat && matchesYear && matchesQuery;
    });

    filtered.sort((a, b) => a.title.localeCompare(b.title));

    renderCourseCatalog(filtered);

    // Update Result Count
    const countEl = document.getElementById('catalog-result-count');
    if (countEl) {
        countEl.innerHTML = `พบ <span class="text-[#FA541C] font-black">${filtered.length}</span> หลักสูตร (จากทั้งหมด ${allCourses.length})`;
    }
}

function clearCatalogSearch() {
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) searchInput.value = '';
    applyCatalogFilters();
}

function resetCatalogFilters() {
    activeCategory = 'all';
    const searchInput = document.getElementById('catalog-search-input');
    const catSelect = document.getElementById('catalog-category-select');
    const yearSelect = document.getElementById('catalog-year-select');

    if (searchInput) searchInput.value = '';
    if (catSelect) catSelect.value = 'all';
    if (yearSelect) yearSelect.value = 'all';

    document.querySelectorAll('.cat-chip').forEach((c, idx) => {
        if (idx === 0 || c.getAttribute('data-cat') === 'all') c.classList.add('active');
        else c.classList.remove('active');
    });

    applyCatalogFilters();

    if (typeof shelfJumpToCategory === 'function' && typeof bafsShelfState !== 'undefined' && bafsShelfState.viewMode === 'shelf') {
        shelfJumpToCategory('all');
    }
}

function setQuickCategory(catKey, el) {
    const catSelect = document.getElementById('catalog-category-select');
    if (catSelect) catSelect.value = catKey;
    
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');

    applyCatalogFilters();

    if (typeof shelfJumpToCategory === 'function' && typeof bafsShelfState !== 'undefined' && bafsShelfState.viewMode === 'shelf') {
        shelfJumpToCategory(catKey);
    }
}

function filterCategory(catKey, el) {
    activeCategory = catKey;
    const catSelect = document.getElementById('catalog-category-select');
    if (catSelect) {
        catSelect.value = catKey;
    }
    
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    if (el && el.classList.contains('cat-chip')) el.classList.add('active');

    applyCatalogFilters();

    if (typeof shelfJumpToCategory === 'function' && typeof bafsShelfState !== 'undefined' && bafsShelfState.viewMode === 'shelf') {
        shelfJumpToCategory(catKey);
    }
}

function resetCourseFilter() {
    resetCatalogFilters();
}

// ==========================================
// COURSE DETAIL FULL-PAGE CONTROLLER (3 INNER MENUS)
// 1. แนะนำหลักสูตร | 2. Infographic สรุปหลักสูตร | 3. Mini Quiz
// ==========================================
let currentActiveCourseId = 1;
let currentCourseQuizAnswers = {};

const localInfographics = {
    1: "infographics/New infographic_intrapreneurship.png",
    2: "infographics/New infographic_business_acumen.png",
    3: "infographics/New infographic_servant_leadership.png",
    4: "infographics/New infographic_stakeholder_management.png",
    5: "infographics/New infographic_Design thinking.png",
    6: "infographics/New infographic_presentation.png",
    7: "infographics/New infographic_finance_non_finance.png",
    8: "infographics/New infographic_business_dining.png",
    9: "infographics/New infographic_personality.png"
};

// ==========================================
// COURSE BENTO MICRO-DASHBOARD DATABASE (9 MASTERCLASSES)
// ==========================================
const courseBentoDatabase = {
    1: {
        hero_th: "คิดและทำแบบผู้ประกอบการในองค์กร พร้อมเครื่องมือมองภาพอนาคตเพื่อสร้างโอกาสทางธุรกิจใหม่ๆ",
        hero_en: "Cultivate an intrapreneurship mindset and apply strategic foresight to unlock new enterprise growth opportunities.",
        purpose_th: [
            "ปลดล็อกพลังความคิดสร้างสรรค์ด้วย Hand-Core Thinking (LEGO® SERIOUS PLAY®)",
            "วิเคราะห์ 5 Mega Trends และตรวจจับสัญญาณเตือนภัยล่วงหน้า (Early Signposts) เพื่อปรับกลยุทธ์เชิงรุก"
        ],
        purpose_en: [
            "Unlock creative insights through Hand-Core Thinking using LEGO® SERIOUS PLAY®",
            "Scan 5 Global Megatrends & detect early weak signals for proactive strategy"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "สแกน 5 Mega Trends", desc: "วิเคราะห์ PESTEL & สัญญาณเตือนภัย" },
            { num: "02", tag: "Develop", title: "ออกแบบ 4 ฉากทัศน์", desc: "วาง Scenario Matrix รับมือวิกฤต" },
            { num: "03", tag: "Deliver", title: "ต่อโมเดล Lego LSP", desc: "สร้างภาพอนาคตร่วมกันเป็นรูปธรรม" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "Scan 5 Megatrends", desc: "PESTEL & weak signals radar" },
            { num: "02", tag: "Develop", title: "4 Scenario Matrix", desc: "Plausible future contingency plans" },
            { num: "03", tag: "Deliver", title: "Build Lego Models", desc: "Collaborative 3D strategy models" }
        ],
        level_th: "Executive & Strategy",
        level_en: "Executive & Strategy"
    },
    2: {
        hero_th: "เข้าใจภาพรวมธุรกิจและกลไกสร้างผลกำไร ผ่าน 5 Business Drivers และเกมจำลองสถานการณ์จริง",
        hero_en: "Master holistic business acumen and profitability drivers via the 5 Business Drivers framework and live simulation.",
        purpose_th: [
            "เข้าใจกลไกการสร้างกำไร สภาพคล่อง และกระแสเงินสดหมุนเวียนในภาพรวมองค์กร",
            "กำหนดกลยุทธ์เชิงรุก-รับด้วย TOWS Matrix และออกแบบ Business Model Canvas (BMC 9 ช่อง)"
        ],
        purpose_en: [
            "Understand enterprise cash flow, profit margins, and asset productivity",
            "Formulate TOWS strategies & map value creation on 9-block Business Model Canvas"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "5 Business Drivers", desc: "Cash, Profit, Assets, Growth, People" },
            { num: "02", tag: "Develop", title: "TOWS & BMC 9 ช่อง", desc: "วางกลยุทธ์เชิงรุก-รับ & โมเดลธุรกิจ" },
            { num: "03", tag: "Deliver", title: "Ground Floor Game", desc: "จำลองตัดสินใจลงทุน & บริหารกระแสเงินสด" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "5 Business Drivers", desc: "Cash, Profit, Assets, Growth, People" },
            { num: "02", tag: "Develop", title: "TOWS & 9-Block BMC", desc: "Strategic mapping & business design" },
            { num: "03", tag: "Deliver", title: "Ground Floor Sim", desc: "Live capital allocation & P&L review" }
        ],
        level_th: "Management & Business",
        level_en: "Management & Business"
    },
    3: {
        hero_th: "พัฒนาภาวะผู้นำแบบผู้สนับสนุน เพื่อสร้างความปลอดภัยทางใจและดึงศักยภาพสูงสุดของทีมงาน",
        hero_en: "Develop empowering servant leadership to cultivate psychological safety and maximize team potential.",
        purpose_th: [
            "สร้างบรรยากาศความปลอดภัยทางใจ 4 ระดับ (4 Stages of Psychological Safety)",
            "ปรับสไตล์การดูแลลูกทีมตามกรอบ Skill/Will Matrix และติดตามงานทรงพลังด้วย ABCD Model"
        ],
        purpose_en: [
            "Foster 4 stages of psychological safety (Inclusion to Challenger safety)",
            "Tailor coaching styles via Skill/Will Matrix & run ABCD 1-on-1 check-ins"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "4 Stages of Safety", desc: "สร้างพื้นที่ปลอดภัยทางใจ & ปลดล็อกศักยภาพ" },
            { num: "02", tag: "Develop", title: "Skill / Will Matrix", desc: "จำแนกลูกทีม 4 กลุ่ม (Direct-Guide-Delegate)" },
            { num: "03", tag: "Deliver", title: "ABCD Model & ฟังเชิงรุก", desc: "ประชุมติดตามงาน & ฟังลึกซึ้ง (Active Listen)" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "4 Safety Stages", desc: "From Inclusion to Challenger Safety" },
            { num: "02", tag: "Develop", title: "Skill/Will Matrix", desc: "Direct, Guide, Motivate, Delegate" },
            { num: "03", tag: "Deliver", title: "ABCD & Active Listen", desc: "1-on-1 check-ins & empathetic listening" }
        ],
        level_th: "Leadership & People",
        level_en: "Leadership & People"
    },
    4: {
        hero_th: "สร้างความร่วมมือกับทุกฝ่าย และเจรจาต่อรองอย่างสร้างสรรค์เพื่อความสำเร็จร่วมกัน (Win-Win Solution)",
        hero_en: "Master stakeholder management and strategic win-win negotiation leveraging Trust Equation and BATNA/ZOPA dynamics.",
        purpose_th: [
            "วิเคราะห์และจัดลำดับความสำคัญของผู้มีส่วนได้ส่วนเสียด้วย Power-Interest Grid",
            "สร้างความไว้วางใจด้วย Trust Equation และสื่อสารตรงประเด็นด้วย HARD Communication"
        ],
        purpose_en: [
            "Map stakeholders accurately across Power-Interest quadrants",
            "Build credibility via Trust Equation & negotiate win-win agreements via ZOPA"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "Power-Interest Grid", desc: "วิเคราะห์ & จัดกลุ่มผู้มีส่วนได้ส่วนเสีย" },
            { num: "02", tag: "Develop", title: "สมการ Trust Equation", desc: "สร้างความไว้วางใจ & กฎสื่อสาร 7-38-55" },
            { num: "03", tag: "Deliver", title: "BATNA & ZOPA Matrix", desc: "เจรจาต่อรอง Win-Win & โมเดล HARD" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "Power-Interest Grid", desc: "Categorize & prioritize key stakeholders" },
            { num: "02", tag: "Develop", title: "Trust Equation", desc: "Build rapport & master 7-38-55 rule" },
            { num: "03", tag: "Deliver", title: "BATNA & ZOPA", desc: "Win-Win negotiation & HARD model" }
        ],
        level_th: "Leadership & Negotiation",
        level_en: "Leadership & Negotiation"
    },
    5: {
        hero_th: "คิดค้นนวัตกรรมที่ตอบโจทย์ผู้ใช้จริง จากการเข้าใจปัญหาเชิงลึกสู่การสร้างต้นแบบอย่างรวดเร็ว",
        hero_en: "Drive user-centric innovation from deep empathetic insight discovery to rapid iterative MVP prototyping.",
        purpose_th: [
            "เข้าถึงความต้องการที่แท้จริงของผู้ใช้ด้วย Empathy Map และ Customer Persona Canvas",
            "ระดมไอเดียไร้ขีดจำกัดด้วย IDEO Rules และออกแบบการทดลองด้วย The Experiment Canvas"
        ],
        purpose_en: [
            "Uncover unmet needs with Empathy Maps & Persona profiles",
            "Brainstorm wild ideas via IDEO rules & design agile Experiment Canvases"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "Empathy & Persona", desc: "สัมภาษณ์เชิงลึก & ค้นหา Pain Point" },
            { num: "02", tag: "Develop", title: "ตีกรอบ POV & IDEO", desc: "ตั้งโจทย์ปัญหา & ระดมสมองไร้ขีดจำกัด" },
            { num: "03", tag: "Deliver", title: "Rapid MVP Prototype", desc: "สร้างชิ้นงานต้นแบบ & ทดสอบสมมติฐาน" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "Empathy & Persona", desc: "Deep user interviews & pain points" },
            { num: "02", tag: "Develop", title: "POV & IDEO Ideation", desc: "Problem framing & creative brainstorming" },
            { num: "03", tag: "Deliver", title: "Rapid MVP Prototype", desc: "Build low-fi prototypes & test canvas" }
        ],
        level_th: "Innovation & Design",
        level_en: "Innovation & Design"
    },
    6: {
        hero_th: "สื่อสารและนำเสนออย่างมืออาชีพ ร้อยเรียงเนื้อหาให้เข้าใจง่ายและตรึงใจผู้ฟังทุกระดับ",
        hero_en: "Deliver high-impact executive presentations combining structured storytelling, C.R.A.P. slide design, and stage presence.",
        purpose_th: [
            "ร้อยเรียง Storyline ทรงพลังตามโครงสร้าง Plan-Plot-Present และ Analytical Essay",
            "ออกแบบสไลด์ระดับมืออาชีพด้วยหลัก C.R.A.P. และฝึกการสบตา 3-Zone Eye Contact"
        ],
        purpose_en: [
            "Structure executive storylines using Plan-Plot-Present and Analytical Essay",
            "Design clean visual slides via C.R.A.P. principles & 3-Zone eye contact"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "Plan & Audience Scan", desc: "วิเคราะห์ผู้ฟัง & ตั้ง Hook Headline" },
            { num: "02", tag: "Develop", title: "Plot & C.R.A.P. Slides", desc: "วาง 3 เสาหลัก & จัดสไลด์ระดับมืออาชีพ" },
            { num: "03", tag: "Deliver", title: "Present & Sandwich", desc: "ส่งมอบด้วย Sandwich Model & 3-Zone Eye" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "Plan & Audience Scan", desc: "Analyze audience & craft hook headline" },
            { num: "02", tag: "Develop", title: "Plot & C.R.A.P. Slides", desc: "3 logical pillars & clean slide layout" },
            { num: "03", tag: "Deliver", title: "Present & Sandwich", desc: "Deliver with Sandwich Model & 3-Zone eye" }
        ],
        level_th: "Communication & Soft Skills",
        level_en: "Communication & Soft Skills"
    },
    7: {
        hero_th: "ถอดรหัสตัวเลขการเงิน เข้าใจโครงสร้างงบ P&L และบริหารต้นทุนโครงการอย่างมีประสิทธิภาพ",
        hero_en: "Master financial acumen for non-finance managers: decode P&L waterfalls, analyze cost behavior, and evaluate payback periods.",
        purpose_th: [
            "วิเคราะห์กำไร 4 ระดับ (GP, EBITDA, EBIT, NP) และอ่านงบ Universal P&L Waterfall",
            "จำแนกต้นทุน Fixed vs Variable และคำนวณระยะเวลาคืนทุน (Payback Period) ก่อนของบลงทุน"
        ],
        purpose_en: [
            "Analyze 4 profit tiers (GP, EBITDA, EBIT, NP) & understand P&L waterfall",
            "Differentiate fixed vs variable costs & calculate project payback period"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "งบ Universal P&L", desc: "อ่านงบกำไรขาดทุน & กำไร 4 ระดับ" },
            { num: "02", tag: "Develop", title: "พฤติกรรมต้นทุน & ผลต่าง", desc: "วิเคราะห์ Fixed/Variable & Variance" },
            { num: "03", tag: "Deliver", title: "Payback Period", desc: "คำนวณคืนทุน & ประมาณการ P&L โครงการ" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "Universal P&L", desc: "Read P&L waterfalls & 4 profit tiers" },
            { num: "02", tag: "Develop", title: "Cost Matrix & Variance", desc: "Analyze fixed/variable & price variances" },
            { num: "03", tag: "Deliver", title: "Payback Period", desc: "Calculate payback period & project modeling" }
        ],
        level_th: "Finance & Strategy",
        level_en: "Finance & Strategy"
    },
    8: {
        hero_th: "ศิลปะและมารยาทบนโต๊ะอาหารสากล เพื่อสร้างความประทับใจและความสัมพันธ์ทางธุรกิจอย่างมืออาชีพ",
        hero_en: "Excel in international business dining diplomacy: master seating protocols, table etiquette, and strategic small talk.",
        purpose_th: [
            "เข้าใจบทบาทเจ้าภาพ vs แขก (Host vs Guest) และการจัดผังที่นั่งเกียรติยศ (Seating Diplomacy)",
            "ใช้อุปกรณ์บนโต๊ะตามกฎ Outside-In และสนทนาธุรกิจเชิงบวกด้วย FORM Framework"
        ],
        purpose_en: [
            "Master Host vs Guest dynamics & executive seating diplomacy",
            "Use utensils outside-in & steer engaging dinner talk with FORM model"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "Seating Diplomacy", desc: "จัดผังที่นั่งเกียรติยศ & บทบาทเจ้าภาพ" },
            { num: "02", tag: "Develop", title: "อุปกรณ์ Outside-In", desc: "ลำดับการใช้ช้อนส้อม & แก้วเครื่องดื่ม" },
            { num: "03", tag: "Deliver", title: "FORM Small Talk", desc: "สนทนาสร้างสัมพันธ์ Family-Job-Goal" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "Seating Diplomacy", desc: "VIP seating protocols & Host playbook" },
            { num: "02", tag: "Develop", title: "Outside-In Cutlery", desc: "Utensil progression & glassware etiquette" },
            { num: "03", tag: "Deliver", title: "FORM Small Talk", desc: "Strategic networking with FORM topics" }
        ],
        level_th: "Executive Presence & Etiquette",
        level_en: "Executive Presence & Etiquette"
    },
    9: {
        hero_th: "ยกระดับบุคลิกภาพและความมั่นใจระดับผู้นำ ผ่านการแต่งกายที่เหมาะสมและภาษากายที่น่าเชื่อถือ",
        hero_en: "Enhance executive presence through confident posture mastery, professional dress codes, and poised interpersonal etiquette.",
        purpose_th: [
            "ควบคุมภาษากายในเขต Power Sphere และการสร้างจุดยึดเหนี่ยวความมั่นใจ (Anchoring)",
            "เลือกระดับการแต่งกายตามกาลเทศะ (Dress Code Matrix) และการแลกนามบัตรสากล 5 ขั้นตอน"
        ],
        purpose_en: [
            "Master body language in the Power Sphere & psychological anchors",
            "Apply executive dress code matrices & 5-step business card protocols"
        ],
        journey_th: [
            { num: "01", tag: "Discover", title: "Power Sphere & Anchor", desc: "จัดระเบียบภาษากาย & ดึงความมั่นใจ" },
            { num: "02", tag: "Develop", title: "Tailoring & Dress Code", desc: "เลือกคัตติ้งเสื้อผ้า & บริหารระยะห่าง" },
            { num: "03", tag: "Deliver", title: "Triangle Gaze & นามบัตร", desc: "สบตาสามเหลี่ยม & แนะนำตัวอย่างสง่างาม" }
        ],
        journey_en: [
            { num: "01", tag: "Discover", title: "Power Sphere & Anchor", desc: "Ground body language & somatic anchor" },
            { num: "02", tag: "Develop", title: "Tailoring & Dress Code", desc: "Executive fit rules & proxemics distance" },
            { num: "03", tag: "Deliver", title: "Triangle Gaze & Cards", desc: "Triangle eye contact & 5-step introductions" }
        ],
        level_th: "Executive Presence & Image",
        level_en: "Executive Presence & Image"
    }
};

function openCourseModal(courseId, initialSubTab = 'intro') {
    openCoursePage(courseId, initialSubTab);
}

function openCoursePage(courseId, initialSubTab = 'intro') {
    try {
        currentActiveCourseId = courseId;
        incrementCourseView(courseId);
        const course = allCourses.find(c => c.id === courseId) || allCourses[0];
        const isEn = currentLang === 'en';
        const deepInfo = (isEn && typeof officialCourseIntros_EN !== 'undefined' && officialCourseIntros_EN[courseId])
            ? officialCourseIntros_EN[courseId]
            : ((typeof officialCourseIntros !== 'undefined' && officialCourseIntros[courseId]) ? officialCourseIntros[courseId] : null);

        const bento = (typeof courseBentoDatabase !== 'undefined' && courseBentoDatabase[courseId]) ? courseBentoDatabase[courseId] : null;

        const title = isEn ? (course.title_en || course.title) : (course.title_th || course.title);
        const badge = isEn ? (course.badgeText_en || course.badgeText) : (course.badgeText_th || course.badgeText);
        const duration = isEn ? (course.duration_en || course.duration) : (course.duration_th || course.duration);
        const instructor = isEn ? (course.instructor_en || course.instructor) : (course.instructor_th || course.instructor);

        // 1. Breadcrumbs & Header
        const catBreadcrumb = document.getElementById('detail-breadcrumb-cat');
        const titleBreadcrumb = document.getElementById('detail-breadcrumb-title');
        if (catBreadcrumb) catBreadcrumb.textContent = badge || 'Business & Strategy';
        if (titleBreadcrumb) titleBreadcrumb.textContent = deepInfo ? deepInfo.title : title;

        const badgeCat = document.getElementById('detail-badge-cat');
        if (badgeCat) {
            badgeCat.textContent = badge;
            badgeCat.className = `px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase badge-${course.badgeColor}`;
        }

        const badgeYear = document.getElementById('detail-badge-year');
        if (badgeYear) badgeYear.textContent = course.year;

        const durationEl = document.getElementById('detail-duration');
        if (durationEl) durationEl.textContent = duration;

        const ratingEl = document.getElementById('detail-rating');
        if (ratingEl) ratingEl.textContent = course.rating;

        const titleEl = document.getElementById('detail-title');
        if (titleEl) titleEl.textContent = deepInfo ? deepInfo.title : title;

        // 2. Bento Hero Value Proposition Text
        const overviewEl = document.getElementById('detail-overview-text');
        if (overviewEl) {
            const heroText = bento ? (isEn ? bento.hero_en : bento.hero_th) : (deepInfo ? deepInfo.overview : (isEn ? course.desc_en : course.desc_th));
            overviewEl.textContent = heroText;
        }

        // 2.1 Microchip Metric Badges (Duration & Tools Count)
        const metricDurEl = document.getElementById('detail-metric-duration');
        if (metricDurEl) {
            metricDurEl.innerHTML = `
                <span class="w-6 h-6 rounded-lg bg-orange-100/90 text-orange-600 flex items-center justify-center text-xs shrink-0 shadow-2xs">
                    <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <circle cx="12" cy="12" r="9"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 3"/>
                    </svg>
                </span>
                <span class="font-bold text-slate-800">${duration || (isEn ? '4.5 Hours' : '4.5 ชั่วโมง')}</span>
            `;
        }

        const toolsCount = deepInfo && deepInfo.tools ? deepInfo.tools.length : (course.tags ? course.tags.length : 4);
        const metricToolsEl = document.getElementById('detail-metric-tools-count');
        if (metricToolsEl) {
            metricToolsEl.innerHTML = `
                <span class="w-6 h-6 rounded-lg bg-orange-100/90 text-orange-600 flex items-center justify-center text-xs shrink-0 shadow-2xs">
                    <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                </span>
                <span class="font-bold text-[#FA541C]">${toolsCount} ${isEn ? 'Core Frameworks & Tools' : 'เฟรมเวิร์กปฏิบัติการ'}</span>
            `;
        }

        // 2.2 Section A (Top): Core Highlights & Business Value (Executive Clean Cards)
        const purposeContentEl = document.getElementById('detail-bento-purpose-content');
        if (purposeContentEl) {
            const outcomeList = bento ? (isEn ? bento.purpose_en : bento.purpose_th) : (deepInfo && deepInfo.outcomes ? deepInfo.outcomes.slice(0, 3) : [isEn ? 'Core competency mastery' : 'การประยุกต์ใช้องค์ความรู้เพื่อยกระดับประสิทธิภาพ']);
            purposeContentEl.innerHTML = outcomeList.map(item => `
                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/70 border border-slate-200/90">
                    <div class="w-6 h-6 rounded-lg bg-orange-50 border border-orange-200/80 text-[#FA541C] flex items-center justify-center shrink-0 mt-0.5 select-none">
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <span class="leading-relaxed text-slate-800 text-xs sm:text-[13px] font-semibold">${item}</span>
                </div>
            `).join('');
        }

        // 2.3 Section B (Bottom): Interactive Practical Toolbox (Vibrant Orange & Royal Violet Cards)
        const toolsEl = document.getElementById('detail-tools-container');
        if (toolsEl) {
            const toolList = deepInfo && deepInfo.tools ? deepInfo.tools : course.tags;
            toolsEl.innerHTML = toolList.map(tool => {
                const safeTool = tool.replace(/'/g, "\\'");
                const toolInfo = toolsDatabase[tool];
                let toolTitle = tool;
                if (toolInfo) {
                    toolTitle = isEn ? (toolInfo.title_en || tool) : (toolInfo.title_th || tool);
                }
                return `
                    <button type="button" onclick="openToolDetailModal('${safeTool}')" class="w-full text-left p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-300 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group cursor-pointer" title="${toolTitle}">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-lg bg-orange-50 group-hover:bg-orange-100 text-[#FA541C] flex items-center justify-center shrink-0 transition-colors">
                                <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <span class="font-bold text-slate-800 text-xs sm:text-[13px] group-hover:text-[#FA541C] transition-colors leading-snug">
                                ${toolTitle}
                            </span>
                        </div>
                        <svg class="w-4 h-4 text-slate-400 group-hover:text-[#FA541C] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                `;
            }).join('');
        }

        // 3. Infographic Image & Download Link
        const infoImg = document.getElementById('detail-infographic-img');
        const infoDownloadBtn = document.getElementById('infographic-download-btn');
        const imgPath = (typeof officialCourseInfographics !== 'undefined' && officialCourseInfographics[courseId])
            || localInfographics[courseId]
            || `infographics/New infographic_servant_leadership.png`;
        if (infoImg) {
            infoImg.src = imgPath;
            resetInfographicZoom();
        }
        if (infoDownloadBtn) {
            infoDownloadBtn.href = imgPath;
        }

        // 6.5 Render Podcast if available
        try { renderCoursePodcast(courseId); } catch (e) { console.warn('Podcast render:', e); }

        // 7. Render Course Curriculum (PDF Lessons)
        try { renderCourseCurriculum(courseId); } catch (e) { console.warn('Curriculum render:', e); }

        // 8. Render Mini Quiz
        try { renderFullPageQuiz(courseId); } catch (e) { console.warn('Quiz render:', e); }

        // 9. Switch to Subtab & Main View
        switchCourseSubTab(initialSubTab);
        switchTab(4);

        const courseDetailEl = document.getElementById('view-course-detail');
        if (courseDetailEl) {
            courseDetailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (err) {
        console.error('Error opening course page:', err);
        switchTab(4);
    }
}

let isMiniPodcastInitialized = false;

function formatAudioTime(seconds) {
    if (!seconds || isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function initMiniPodcastListeners() {
    if (isMiniPodcastInitialized) return;
    const audio = document.getElementById('course-podcast-audio');
    if (!audio) return;

    const syncAll = () => {
        updateMiniPodcastUI();
        updateMiniPodcastProgress();
    };

    audio.addEventListener('play', () => {
        syncAll();
        const activeSubtab = getCurrentActiveCourseSubtab();
        if (activeSubtab === 'infographic' || activeSubtab === 'curriculum') {
            showStickyMiniPodcast();
        } else {
            hideStickyMiniPodcast();
        }
    });

    audio.addEventListener('playing', syncAll);
    audio.addEventListener('pause', syncAll);
    audio.addEventListener('seeked', syncAll);
    audio.addEventListener('timeupdate', updateMiniPodcastProgress);
    audio.addEventListener('ended', () => {
        syncAll();
        hideStickyMiniPodcast();
    });

    isMiniPodcastInitialized = true;
}

function getCurrentActiveCourseSubtab() {
    const subtabs = ['intro', 'infographic', 'podcast', 'curriculum', 'quiz'];
    for (const t of subtabs) {
        const btn = document.getElementById(`subtab-btn-${t}`);
        if (btn && btn.classList.contains('active')) return t;
    }
    return 'intro';
}

function showStickyMiniPodcast() {
    const mini = document.getElementById('sticky-mini-podcast-player');
    if (mini) mini.classList.remove('hidden');
    updateMiniPodcastUI();
    updateMiniPodcastProgress();
}

function hideStickyMiniPodcast() {
    const mini = document.getElementById('sticky-mini-podcast-player');
    if (mini) mini.classList.add('hidden');
}

function updateMiniPodcastUI() {
    const audio = document.getElementById('course-podcast-audio');
    const playBtn = document.getElementById('mini-podcast-play-btn');
    const indicator = document.getElementById('mini-podcast-indicator');
    if (!audio || !playBtn) return;

    const isPlaying = !audio.paused && !audio.ended;
    if (isPlaying) {
        playBtn.innerHTML = `
            <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `;
        playBtn.title = 'หยุดชั่วคราว';
    } else {
        playBtn.innerHTML = `
            <svg class="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        playBtn.title = 'เล่นต่อ';
    }

    if (indicator) {
        if (isPlaying) {
            indicator.classList.add('animate-bounce-short');
        } else {
            indicator.classList.remove('animate-bounce-short');
        }
    }
}

function updateMiniPodcastProgress() {
    const audio = document.getElementById('course-podcast-audio');
    const timeEl = document.getElementById('mini-podcast-time');
    const progressBar = document.getElementById('mini-progress-bar');
    if (!audio) return;

    updateMiniPodcastUI();

    const current = audio.currentTime || 0;
    const total = audio.duration || 0;

    if (timeEl) {
        timeEl.textContent = `${formatAudioTime(current)} / ${formatAudioTime(total)}`;
    }
    if (progressBar && total > 0) {
        const pct = Math.min(100, Math.max(0, (current / total) * 100));
        progressBar.style.width = `${pct}%`;
    }
}

function toggleMiniPodcastPlay() {
    const audio = document.getElementById('course-podcast-audio');
    if (!audio) return;
    if (audio.paused) {
        audio.play().catch(e => console.warn('Play error:', e));
    } else {
        audio.pause();
    }
    setTimeout(updateMiniPodcastUI, 50);
}

function seekMiniPodcast(secondsDelta) {
    const audio = document.getElementById('course-podcast-audio');
    if (!audio) return;
    const newTime = (audio.currentTime || 0) + secondsDelta;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, newTime));
}

function seekMiniProgressBar(event) {
    const audio = document.getElementById('course-podcast-audio');
    const container = document.getElementById('mini-progress-container');
    if (!audio || !container || !audio.duration) return;

    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = ratio * audio.duration;
}

function expandToFullPodcast() {
    switchCourseSubTab('podcast');
    const playerCard = document.getElementById('course-subtab-podcast');
    if (playerCard) {
        playerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function closeMiniPodcast() {
    pauseCoursePodcast();
    hideStickyMiniPodcast();
}

function pauseCoursePodcast() {
    try {
        const podcastAudio = document.getElementById('course-podcast-audio');
        if (podcastAudio && typeof podcastAudio.pause === 'function' && !podcastAudio.paused) {
            podcastAudio.pause();
        }
        updateMiniPodcastUI();
    } catch (e) {
        console.warn('Podcast pause error:', e);
    }
}

function switchCourseSubTab(tabName) {
    const subtabs = ['intro', 'infographic', 'podcast', 'curriculum', 'quiz'];
    subtabs.forEach(t => {
        const btn = document.getElementById(`subtab-btn-${t}`);
        const content = document.getElementById(`course-subtab-${t}`);

        if (btn) {
            if (t === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }

        if (content) {
            if (t === tabName) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        }
    });

    // Check podcast audio state: Show sticky mini player ONLY on 'infographic' and 'curriculum' tabs
    const isTargetSubtab = (tabName === 'infographic' || tabName === 'curriculum');
    const podcastAudio = document.getElementById('course-podcast-audio');
    const isAudioActive = podcastAudio && (!podcastAudio.paused || (podcastAudio.currentTime > 0 && !podcastAudio.ended));

    if (isTargetSubtab && isAudioActive) {
        showStickyMiniPodcast();
    } else {
        hideStickyMiniPodcast();
    }

    if (tabName === 'infographic') {
        resetInfographicZoom();
    }
}

function renderCoursePodcast(courseId) {
    const podcastBtn = document.getElementById('subtab-btn-podcast');
    const introPodcastBtn = document.getElementById('btn-intro-to-podcast');
    const infoPodcastBtn = document.getElementById('btn-info-to-podcast');
    const podcastAudio = document.getElementById('course-podcast-audio');
    const podcastSource = document.getElementById('course-podcast-source');
    const podcastTitle = document.getElementById('podcast-title');
    const podcastDesc = document.getElementById('podcast-desc');
    const podcastDuration = document.getElementById('podcast-duration-badge');
    const podcastCover = document.getElementById('podcast-cover-img');
    const podcastDownloadBtn = document.getElementById('podcast-download-btn');
    const chaptersContainer = document.getElementById('podcast-chapters-list');

    const podcastData = (typeof officialCoursePodcasts !== 'undefined' && officialCoursePodcasts[courseId])
        ? officialCoursePodcasts[courseId]
        : null;

    if (!podcastData) {
        if (podcastBtn) podcastBtn.classList.add('hidden');
        if (introPodcastBtn) introPodcastBtn.classList.add('hidden');
        if (infoPodcastBtn) infoPodcastBtn.classList.add('hidden');
        if (podcastAudio && typeof podcastAudio.pause === 'function') {
            podcastAudio.pause();
        }
        hideStickyMiniPodcast();
        return;
    }

    // Show Podcast Button & Intro CTAs
    if (podcastBtn) podcastBtn.classList.remove('hidden');
    if (introPodcastBtn) introPodcastBtn.classList.remove('hidden');
    if (infoPodcastBtn) infoPodcastBtn.classList.remove('hidden');

    const isEn = currentLang === 'en';
    const title = isEn ? (podcastData.title_en || podcastData.title) : (podcastData.title_th || podcastData.title);
    const desc = isEn ? (podcastData.description_en || podcastData.description) : (podcastData.description_th || podcastData.description);
    const duration = isEn ? (podcastData.duration_en || podcastData.duration) : (podcastData.duration_th || podcastData.duration);

    if (podcastTitle) podcastTitle.textContent = title;
    if (podcastDesc) podcastDesc.textContent = desc;
    if (podcastDuration) podcastDuration.textContent = `⏱️ ${duration}`;
    if (podcastCover && podcastData.cover) podcastCover.src = podcastData.cover;

    // Sync Mini Player Metadata
    const miniCover = document.getElementById('mini-podcast-cover');
    const miniTitle = document.getElementById('mini-podcast-title');
    const miniSeriesTag = document.getElementById('mini-podcast-series-tag');
    if (miniCover && podcastData.cover) miniCover.src = podcastData.cover;
    if (miniTitle) miniTitle.textContent = title;
    if (miniSeriesTag) miniSeriesTag.textContent = `BAFS PODCAST • ${podcastData.duration_th || podcastData.duration || ''}`;

    initMiniPodcastListeners();

    if (podcastAudio && podcastSource) {
        podcastSource.src = podcastData.audioFile;
        podcastAudio.load();
    }
    if (podcastDownloadBtn) {
        podcastDownloadBtn.href = podcastData.audioFile;
    }

    // Render Chapters (Top-to-Bottom then Left-to-Right column flow)
    if (chaptersContainer && podcastData.chapters) {
        const renderChapterItem = (ch) => {
            const chTitle = isEn ? (ch.title_en || ch.title) : (ch.title_th || ch.title);
            return `
            <button type="button" onclick="jumpPodcastToTime(${ch.seconds})" class="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/80 border border-slate-200/80 hover:border-orange-300 transition-all flex items-center justify-between gap-3 group cursor-pointer shadow-xs text-left">
                <div class="flex items-center gap-3 min-w-0">
                    <span class="px-2.5 py-1 rounded-xl bg-orange-100 group-hover:bg-[#FA541C] text-[#FA541C] group-hover:text-white font-mono font-black text-xs transition-colors shrink-0">
                        ${ch.time}
                    </span>
                    <span class="text-xs font-bold text-slate-800 group-hover:text-[#FA541C] leading-snug transition-colors">
                        ${chTitle}
                    </span>
                </div>
                <span class="text-slate-400 group-hover:text-[#FA541C] text-sm shrink-0 transition-colors font-bold">
                    ▶
                </span>
            </button>
            `;
        };

        const chapters = podcastData.chapters;
        const mid = Math.ceil(chapters.length / 2);
        const leftChapters = chapters.slice(0, mid);
        const rightChapters = chapters.slice(mid);

        chaptersContainer.innerHTML = `
            <div class="space-y-3">
                ${leftChapters.map(renderChapterItem).join('')}
            </div>
            <div class="space-y-3">
                ${rightChapters.map(renderChapterItem).join('')}
            </div>
        `;
    }
}

function seekPodcast(secondsOffset) {
    const audio = document.getElementById('course-podcast-audio');
    if (audio) {
        audio.currentTime = Math.max(0, Math.min(audio.duration || 9999, audio.currentTime + secondsOffset));
    }
}

function jumpPodcastToTime(seconds) {
    const audio = document.getElementById('course-podcast-audio');
    if (audio) {
        audio.currentTime = seconds;
        audio.play().catch(e => console.log(e));
    }
}

function setPodcastSpeed(speed, btnEl) {
    const audio = document.getElementById('course-podcast-audio');
    if (audio) {
        audio.playbackRate = speed;
    }
    document.querySelectorAll('.podcast-speed-btn').forEach(b => {
        b.classList.remove('bg-[#FA541C]', 'text-white');
        b.classList.add('text-slate-300');
    });
    if (btnEl) {
        btnEl.classList.remove('text-slate-300');
        btnEl.classList.add('bg-[#FA541C]', 'text-white');
    }
}

function isCoursePdfDownloadDisabled(courseId) {
    const currData = (typeof officialCourseCurriculum !== 'undefined' && officialCourseCurriculum[courseId])
        ? officialCourseCurriculum[courseId]
        : null;
    return Boolean((currData && currData.disablePdfDownload) || String(courseId) === '7');
}

function renderCourseCurriculum(courseId) {
    const modulesContainer = document.getElementById('detail-curriculum-modules-list');
    const pdfViewerBtn = document.getElementById('detail-pdf-viewer-btn');
    const pdfDlBtn = document.getElementById('detail-pdf-download-btn');
    const pdfEmbedContainer = document.getElementById('pdf-embed-container');
    const pdfReadonlyBadge = document.getElementById('detail-pdf-readonly-badge');
    const pdfReadonlyLabel = document.getElementById('label-pdf-readonly-badge');
    const pdfPreviewReadonlyTag = document.getElementById('pdf-preview-readonly-tag');

    const currData = (typeof officialCourseCurriculum !== 'undefined' && officialCourseCurriculum[courseId])
        ? officialCourseCurriculum[courseId]
        : null;

    const isPdfLocked = isCoursePdfDownloadDisabled(courseId);
    const pdfPath = currData ? (currData.pdfFile || `pdf/course_${courseId}.pdf`) : `pdf/course_${courseId}.pdf`;
    const isEnLang = currentLang === 'en';

    if (pdfViewerBtn) {
        if (isPdfLocked) {
            pdfViewerBtn.classList.add('hidden');
            pdfViewerBtn.classList.remove('flex');
            pdfViewerBtn.setAttribute('aria-hidden', 'true');
            pdfViewerBtn.href = '#';
            pdfViewerBtn.removeAttribute('download');
        } else {
            pdfViewerBtn.classList.remove('hidden');
            pdfViewerBtn.classList.add('flex');
            pdfViewerBtn.removeAttribute('aria-hidden');
            pdfViewerBtn.href = pdfPath;
            pdfViewerBtn.removeAttribute('download');
            const labelSpan = document.getElementById('label-btn-pdf-full');
            if (labelSpan) labelSpan.textContent = isEnLang ? 'Open Full PDF Slide Deck' : 'เปิดดูสไลด์ PDF ฉบับเต็ม';
        }
    }

    if (pdfReadonlyBadge) {
        if (isPdfLocked) {
            pdfReadonlyBadge.classList.remove('hidden');
            pdfReadonlyBadge.classList.add('inline-flex');
            if (pdfReadonlyLabel) {
                pdfReadonlyLabel.textContent = isEnLang
                    ? 'Read-Only on Platform (PDF Download Disabled)'
                    : 'อ่านบนแพลตฟอร์มเท่านั้น (งดดาวน์โหลด PDF)';
            }
        } else {
            pdfReadonlyBadge.classList.add('hidden');
            pdfReadonlyBadge.classList.remove('inline-flex');
        }
    }

    if (pdfPreviewReadonlyTag) {
        if (isPdfLocked) {
            pdfPreviewReadonlyTag.classList.remove('hidden');
            pdfPreviewReadonlyTag.classList.add('inline-flex');
            pdfPreviewReadonlyTag.textContent = isEnLang ? 'Read-Only • No Download' : 'อ่านออนไลน์ • งดดาวน์โหลด';
        } else {
            pdfPreviewReadonlyTag.classList.add('hidden');
            pdfPreviewReadonlyTag.classList.remove('inline-flex');
        }
    }

    if (pdfDlBtn) {
        if (isPdfLocked) {
            pdfDlBtn.classList.add('hidden');
            pdfDlBtn.href = '#';
        } else {
            pdfDlBtn.classList.remove('hidden');
            pdfDlBtn.href = pdfPath;
        }
        pdfDlBtn.removeAttribute('download');
    }

    if (pdfEmbedContainer) {
        if (isPdfLocked) {
            pdfEmbedContainer.setAttribute('oncontextmenu', 'return false');
            pdfEmbedContainer.oncontextmenu = (e) => e.preventDefault();
            pdfEmbedContainer.innerHTML = `<iframe id="detail-pdf-iframe" src="${pdfPath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH" class="w-full h-full border-0" title="Course PDF Deck (Read-Only)"></iframe>`;
        } else {
            pdfEmbedContainer.removeAttribute('oncontextmenu');
            pdfEmbedContainer.oncontextmenu = null;
            pdfEmbedContainer.innerHTML = `<iframe id="detail-pdf-iframe" src="${pdfPath}#toolbar=1&view=FitH" class="w-full h-full border-0" title="Course PDF Deck"></iframe>`;
        }
    }

    if (!modulesContainer) return;

    if (!currData || !currData.modules || currData.modules.length === 0) {
        modulesContainer.innerHTML = `
            <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
                ${currentLang === 'en' ? 'Curriculum data is being loaded...' : 'กำลังโหลดโครงสร้างเนื้อหาหลักสูตร...'}
            </div>
        `;
        return;
    }

    const keyTakeawayHeader = currentLang === 'en' ? 'Key Takeaways & Topics:' : 'สาระสำคัญและหัวข้อย่อยในบทเรียน (Key Takeaways):';
    const isEn = currentLang === 'en';

    modulesContainer.innerHTML = currData.modules.map(m => {
        const title = isEn ? (m.title_en || m.title) : (m.title_th || m.title);
        const desc = isEn ? (m.desc_en || m.desc) : (m.desc_th || m.desc);
        const keyPoints = isEn ? (m.keyPoints_en || m.keyPoints) : (m.keyPoints_th || m.keyPoints);

        return `
            <div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-[#FA541C] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                        ${m.number}
                    </div>
                    <div class="space-y-1 flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-black text-[#FA541C] uppercase tracking-wider">MODULE ${m.number}</span>
                            <span class="text-[10px] text-slate-400">• UL&YT 2025 OFFICIAL SLIDE DECK</span>
                        </div>
                        <h4 class="text-base sm:text-lg font-black text-slate-900 leading-snug">
                            ${title}
                        </h4>
                        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">
                            ${desc}
                        </p>
                    </div>
                </div>

                <!-- Key Takeaways / Sub-topics -->
                <div class="p-4 rounded-xl bg-orange-50/40 border border-orange-100/80 space-y-2">
                    <span class="text-[11px] font-black text-[#FA541C] uppercase tracking-wider flex items-center gap-1.5">
                        ${keyTakeawayHeader}
                    </span>
                    <ul class="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                        ${(keyPoints || []).map(kp => `<li class="flex items-start gap-2"><span class="text-amber-500 font-bold">▪</span> <span>${kp}</span></li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }).join('');
}

let isPdfEmbedVisible = true;
function togglePdfEmbedViewer() {
    const container = document.getElementById('pdf-embed-container');
    const label = document.getElementById('label-toggle-pdf-text');
    if (!container) return;
    
    isPdfEmbedVisible = !isPdfEmbedVisible;
    if (isPdfEmbedVisible) {
        container.classList.remove('hidden');
        if (label) label.textContent = currentLang === 'en' ? 'Hide PDF Viewer' : 'ซ่อน PDF Viewer ในหน้าเว็บ';
    } else {
        container.classList.add('hidden');
        if (label) label.textContent = currentLang === 'en' ? 'Show PDF Viewer' : 'แสดง PDF Viewer ในหน้าเว็บ';
    }
}

function zoomInfographic(factor) {
    const img = document.getElementById('detail-infographic-img');
    if (!img) return;
    currentInfographicZoom = Math.max(0.6, Math.min(3.0, currentInfographicZoom * factor));
    img.style.transform = `scale(${currentInfographicZoom})`;
}

function resetInfographicZoom() {
    const img = document.getElementById('detail-infographic-img');
    if (!img) return;
    currentInfographicZoom = 1.0;
    img.style.transform = 'scale(1)';
}

// ==========================================
// INFOGRAPHIC FULL-SCREEN LIGHTBOX POPUP
// ==========================================
function openInfographicLightbox() {
    const modal = document.getElementById('infographic-lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-infographic-img');
    const lightboxDl = document.getElementById('lightbox-download-btn');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxSubtitle = document.getElementById('lightbox-subtitle');
    const detailImg = document.getElementById('detail-infographic-img');

    if (!modal) return;

    const course = allCourses.find(c => c.id === currentActiveCourseId);
    const isEn = currentLang === 'en';

    const imgSrc = (typeof officialCourseInfographics !== 'undefined' && officialCourseInfographics[currentActiveCourseId])
        || (typeof localInfographics !== 'undefined' && localInfographics[currentActiveCourseId])
        || (detailImg && detailImg.src ? detailImg.src : `infographics/New infographic_servant_leadership.png`);

    if (detailImg) {
        detailImg.src = imgSrc;
    }

    if (lightboxImg) {
        lightboxImg.src = imgSrc;
    }
    if (lightboxDl) {
        lightboxDl.href = imgSrc;
    }
    if (lightboxTitle && course) {
        const courseTitle = isEn ? (course.title_en || course.title) : (course.title_th || course.title);
        lightboxTitle.textContent = isEn ? `Infographic: ${courseTitle}` : `Infographic สรุปสำคัญ: ${courseTitle}`;
    }
    if (lightboxSubtitle) {
        lightboxSubtitle.textContent = isEn ? 'BAFS Group Executive Upskilling Series (High Resolution)' : 'BAFS Group Executive Masterclass Series (ความละเอียดสูง HD)';
    }

    resetLightboxZoom();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeInfographicLightbox() {
    const modal = document.getElementById('infographic-lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
        resetLightboxZoom();
    }
    document.body.style.overflow = ''; // Restore background scroll
}

function zoomLightbox(factor) {
    const wrapper = document.getElementById('lightbox-img-wrapper');
    if (!wrapper) return;
    currentLightboxZoom = Math.max(0.5, Math.min(3.5, currentLightboxZoom * factor));
    wrapper.style.transform = `scale(${currentLightboxZoom})`;
}

function resetLightboxZoom() {
    const wrapper = document.getElementById('lightbox-img-wrapper');
    currentLightboxZoom = 1.0;
    if (wrapper) {
        wrapper.style.transform = 'scale(1)';
    }
}

function handleLightboxBackdropClick(event) {
    const modal = document.getElementById('infographic-lightbox-modal');
    const scrollContainer = document.getElementById('lightbox-scroll-container');
    if (event.target === modal || event.target === scrollContainer) {
        closeInfographicLightbox();
    }
}

// Listen for ESC key to close lightbox and modals
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        const modal = document.getElementById('infographic-lightbox-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeInfographicLightbox();
        }
        const toolModal = document.getElementById('tool-detail-modal');
        if (toolModal && !toolModal.classList.contains('hidden')) {
            closeToolDetailModal();
        }
        const certModal = document.getElementById('certificate-modal');
        if (certModal && !certModal.classList.contains('hidden')) {
            closeCertificateModal();
        }
        const wisdomModal = document.getElementById('wisdom-detail-modal');
        if (wisdomModal && !wisdomModal.classList.contains('hidden')) {
            closeWisdomDetailModal();
        }
        const wisdomShareModal = document.getElementById('wisdom-share-modal');
        if (wisdomShareModal && !wisdomShareModal.classList.contains('hidden')) {
            closeWisdomShareModal();
        }
        const adminPinModal = document.getElementById('admin-pin-modal');
        if (adminPinModal && !adminPinModal.classList.contains('hidden')) {
            closeAdminAuthModal();
        }
    }
});

function shareCurrentCourse() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('คัดลอกลิงก์หลักสูตรสำเร็จแล้ว!');
        }).catch(() => {
            alert('แชร์หลักสูตรนี้ให้เพื่อนร่วมงานของคุณได้เลย');
        });
    } else {
        alert('แชร์หลักสูตรนี้ให้เพื่อนร่วมงานของคุณได้เลย');
    }
}

// ==========================================
// INTERACTIVE SINGLE-QUESTION MINI QUIZ ENGINE
// (ทำทีละข้อ / Interactive / เฉลยแบบอธิบายทันที)
// ==========================================
let currentQuizQuestionIndex = 0;
let currentQuizQuestionsList = [];
let currentQuizUserAnswers = {}; // { questionIndex: { selectedIndex: X, isCorrect: bool } }

function renderFullPageQuiz(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    const courseKey = `course_${courseId}`;
    
    if (typeof officialCourseQuizzes !== 'undefined' && officialCourseQuizzes[courseKey]) {
        currentQuizQuestionsList = officialCourseQuizzes[courseKey];
    } else {
        currentQuizQuestionsList = [
            {
                question: "หัวใจสำคัญของการนำองค์ความรู้ในหลักสูตรนี้ไปปรับใช้คือข้อใด?",
                options: [
                    "การท่องจำทฤษฎีโดยไม่ลงมือปฏิบัติ",
                    "การนำเครื่องมือและเฟรมเวิร์กไปประยุกต์ใช้เพื่อแก้ปัญหาหน้างานจริง และสร้างการมีส่วนร่วมในทีม",
                    "การทำงานคนเดียวเพื่อความรวดเร็ว",
                    "การหลีกเลี่ยงการเปลี่ยนแปลงทุกรูปแบบ"
                ],
                answerIndex: 1,
                feedback: "การเรียนรู้ที่เกิดประโยชน์สูงสุดคือการนำ Framework ไปทดลองปฏิบัติจริงในบริบทงาน BAFS"
            }
        ];
    }

    currentQuizQuestionIndex = 0;
    currentQuizUserAnswers = {};

    const titleEl = document.getElementById('quiz-page-title');
    if (titleEl) {
        titleEl.textContent = currentLang === 'en'
            ? `Knowledge Check: ${course ? (course.title_en || course.title) : ''}`
            : `แบบทดสอบวัดความรู้: ${course ? course.title : ''}`;
    }

    const summaryContainer = document.getElementById('detail-quiz-results-summary');
    if (summaryContainer) {
        summaryContainer.classList.add('hidden');
        summaryContainer.innerHTML = '';
    }

    const questionView = document.getElementById('single-question-view');
    if (questionView) questionView.classList.remove('hidden');

    displayCurrentQuizQuestion();
}

function displayCurrentQuizQuestion() {
    const qIndex = currentQuizQuestionIndex;
    const totalQ = currentQuizQuestionsList.length;
    const q = currentQuizQuestionsList[qIndex];
    if (!q) return;

    const isEn = currentLang === 'en';

    // 1. Update Header Counters
    const counterEl = document.getElementById('quiz-question-counter');
    if (counterEl) counterEl.textContent = isEn ? `Question ${qIndex + 1} of ${totalQ}` : `ข้อที่ ${qIndex + 1} / ${totalQ}`;

    const answeredKeys = Object.keys(currentQuizUserAnswers);
    const correctCount = answeredKeys.filter(k => currentQuizUserAnswers[k].isCorrect).length;
    const scoreBadge = document.getElementById('quiz-current-score-badge');
    if (scoreBadge) scoreBadge.textContent = isEn ? `Score: ${correctCount} / ${answeredKeys.length}` : `คะแนน: ${correctCount} / ${answeredKeys.length}`;

    // 2. Update Progress Bar
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        const pct = Math.round(((qIndex + 1) / totalQ) * 100);
        progressFill.style.width = `${pct}%`;
    }

    // 3. Update Step Circles Navigator
    const stepsStrip = document.getElementById('quiz-steps-strip');
    if (stepsStrip) {
        stepsStrip.innerHTML = currentQuizQuestionsList.map((_, idx) => {
            const isAnswered = currentQuizUserAnswers[idx] !== undefined;
            const isCurrent = idx === qIndex;
            const isCorrect = isAnswered ? currentQuizUserAnswers[idx].isCorrect : false;

            let circleClass = "w-8 h-8 shrink-0 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer select-none ";
            if (isCurrent) {
                circleClass += "bg-[#FA541C] text-white ring-4 ring-orange-200 shadow-sm font-black";
            } else if (isAnswered) {
                circleClass += isCorrect ? "bg-emerald-500 text-white shadow-xs" : "bg-rose-500 text-white shadow-xs";
            } else {
                circleClass += "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800";
            }

            return `<button onclick="jumpToQuizQuestion(${idx})" class="${circleClass}">${idx + 1}</button>`;
        }).join('');
    }

    // 4. Render Active Question Card
    const container = document.getElementById('single-question-view');
    if (!container) return;

    const answerInfo = currentQuizUserAnswers[qIndex];
    const isAnswered = answerInfo !== undefined;
    const optionLetters = isEn ? ['A', 'B', 'C', 'D', 'E'] : ['ก', 'ข', 'ค', 'ง', 'จ'];

    const correctLabel = isEn ? 'Correct' : 'ถูกต้อง';
    const incorrectLabel = isEn ? 'Incorrect' : 'ไม่ถูกต้อง';
    const greatJobTitle = isEn ? 'Great Job! Correct!' : 'ถูกต้องยอดเยี่ยม!';
    const explanationTitle = isEn ? 'Detailed Explanation' : 'เฉลยและคำอธิบายเชิงลึก (Explanation)';
    const prevBtnText = isEn ? 'Previous' : 'ข้อก่อนหน้า';
    const nextBtnText = isEn ? 'Next Question' : 'ข้อถัดไป';
    const finishBtnText = isEn ? 'View Final Score & Assessment' : 'ดูผลคะแนนรวมและการประเมิน';
    const promptChooseText = isEn ? 'Please select an option to view detailed explanation.' : 'กรุณาคลิกเลือกคำตอบ 1 ข้อ เพื่อดูเฉลยอธิบาย';

    container.innerHTML = `
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            
            <!-- Question Title -->
            <div class="flex items-start gap-3.5">
                <div class="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 text-[#FA541C] flex items-center justify-center shrink-0 font-bold text-xs select-none">
                    ${qIndex + 1}
                </div>
                <div class="space-y-1">
                    <span class="text-[11px] font-black text-[#FA541C] uppercase tracking-wider">QUESTION ${qIndex + 1} OF ${totalQ}</span>
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        ${q.question}
                    </h3>
                </div>
            </div>

            <!-- Options Grid -->
            <div class="space-y-3 pt-2">
                ${q.options.map((opt, optIdx) => {
                    let optionStyle = "w-full p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center gap-3.5 ";
                    let badgeStyle = "w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ";
                    let icon = "";

                    if (!isAnswered) {
                        // Unanswered state
                        optionStyle += "border-slate-300 bg-white hover:border-[#FA541C] hover:bg-orange-50/70 cursor-pointer text-slate-800 shadow-2xs hover:shadow-xs";
                        badgeStyle += "bg-slate-200 text-slate-800 shadow-2xs";
                    } else {
                        // Answered state
                        const isSelected = answerInfo.selectedIndex === optIdx;
                        const isCorrectOption = optIdx === q.answerIndex;

                        if (isCorrectOption) {
                            optionStyle += "border-emerald-500 bg-emerald-100/95 text-emerald-950 font-black shadow-md ring-2 ring-emerald-300/60";
                            badgeStyle += "bg-emerald-600 text-white shadow-xs";
                            icon = `<span class="ml-auto px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs shadow-xs flex items-center gap-1">${correctLabel}</span>`;
                        } else if (isSelected && !isCorrectOption) {
                            optionStyle += "border-rose-500 bg-rose-100/95 text-rose-950 font-black shadow-md ring-2 ring-rose-300/60";
                            badgeStyle += "bg-rose-600 text-white shadow-xs";
                            icon = `<span class="ml-auto px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs shadow-xs flex items-center gap-1">${incorrectLabel}</span>`;
                        } else {
                            optionStyle += "border-slate-200 bg-slate-100/90 text-slate-800 font-semibold";
                            badgeStyle += "bg-slate-300 text-slate-700";
                        }
                    }

                    const clickHandler = !isAnswered ? `onclick="selectQuizAnswer(${qIndex}, ${optIdx})"` : '';

                    return `
                        <div ${clickHandler} class="${optionStyle}">
                            <div class="${badgeStyle}">${optionLetters[optIdx] || optIdx + 1}</div>
                            <span class="flex-1">${opt}</span>
                            ${icon}
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- Instant Detailed Explanation Box (เฉลยแบบอธิบาย - สีทึบคมชัด) -->
            ${isAnswered ? `
                <div class="p-5 sm:p-6 rounded-2xl ${answerInfo.isCorrect ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-950 shadow-sm' : 'bg-orange-100 border-2 border-orange-400 text-orange-950 shadow-sm'} space-y-2 animate-fadeIn">
                    <div class="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                        <span>${answerInfo.isCorrect ? greatJobTitle : explanationTitle}</span>
                    </div>
                    <p class="text-xs sm:text-sm font-bold leading-relaxed">
                        ${q.feedback || (isEn ? 'Correct answer based on the learning curriculum.' : 'คำตอบที่ถูกต้องตามหลักสูตรการเรียนรู้')}
                    </p>
                </div>
            ` : ''}

            <!-- Navigation Controls -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
                <button onclick="prevQuizQuestion()" ${qIndex === 0 ? 'disabled class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-300 text-xs font-bold cursor-not-allowed"' : 'class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all"'}>
                    ${prevBtnText}
                </button>

                ${isAnswered ? (
                    qIndex < totalQ - 1 ? `
                        <button onclick="nextQuizQuestion()" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FA541C] to-[#E53935] hover:opacity-95 text-white font-black text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer">
                            <span>${nextBtnText}</span>
                            <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </button>
                    ` : `
                        <button onclick="finishQuizSummary()" class="px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-black text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer">
                            <span>${finishBtnText}</span>
                            <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </button>
                    `
                ) : `
                    <span class="text-xs text-slate-400 font-medium">${promptChooseText}</span>
                `}
            </div>

        </div>
    `;
}

function selectQuizAnswer(qIndex, selectedOptIdx) {
    const q = currentQuizQuestionsList[qIndex];
    if (!q) return;

    const isCorrect = selectedOptIdx === q.answerIndex;
    currentQuizUserAnswers[qIndex] = {
        selectedIndex: selectedOptIdx,
        isCorrect: isCorrect
    };

    displayCurrentQuizQuestion();
}

function nextQuizQuestion() {
    if (currentQuizQuestionIndex < currentQuizQuestionsList.length - 1) {
        currentQuizQuestionIndex++;
        displayCurrentQuizQuestion();
        const qView = document.getElementById('single-question-view');
        if (qView) qView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function prevQuizQuestion() {
    if (currentQuizQuestionIndex > 0) {
        currentQuizQuestionIndex--;
        displayCurrentQuizQuestion();
        const qView = document.getElementById('single-question-view');
        if (qView) qView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function jumpToQuizQuestion(index) {
    if (index >= 0 && index < currentQuizQuestionsList.length) {
        const questionView = document.getElementById('single-question-view');
        const summaryContainer = document.getElementById('detail-quiz-results-summary');
        if (questionView) questionView.classList.remove('hidden');
        if (summaryContainer) summaryContainer.classList.add('hidden');
        currentQuizQuestionIndex = index;
        displayCurrentQuizQuestion();
    }
}

function escapeQuizHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function animateQuizScoreGauge(targetPercent) {
    const ringEl = document.getElementById('quiz-score-ring-arc');
    const counterEl = document.getElementById('quiz-score-counter-num');
    const circumference = 263.89;
    const clampedPct = Math.max(0, Math.min(100, Number(targetPercent) || 0));
    const targetOffset = circumference * (1 - clampedPct / 100);

    const prefersReducedMotion = typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        if (ringEl) ringEl.style.strokeDashoffset = String(targetOffset);
        if (counterEl) counterEl.textContent = `${clampedPct}%`;
        return;
    }

    if (ringEl) {
        ringEl.style.strokeDashoffset = String(circumference);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ringEl.style.strokeDashoffset = String(targetOffset);
            });
        });
    }

    if (counterEl) {
        const duration = 900;
        const start = performance.now();
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counterEl.textContent = `${Math.round(clampedPct * eased)}%`;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counterEl.textContent = `${clampedPct}%`;
            }
        };
        requestAnimationFrame(step);
    }
}

function triggerQuizConfettiBurst(containerEl) {
    if (!containerEl) return;
    const prefersReducedMotion = typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const existing = containerEl.querySelector('.quiz-confetti-layer');
    if (existing) existing.remove();

    const layer = document.createElement('div');
    layer.className = 'quiz-confetti-layer';
    layer.setAttribute('aria-hidden', 'true');

    const palette = ['#FA541C', '#FF8A48', '#10B981', '#F59E0B', '#0F172A', '#34D399'];
    const totalPieces = 38;

    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement('span');
        piece.className = 'quiz-confetti-piece';
        const leftPct = 8 + Math.random() * 84;
        const sizeW = 6 + Math.floor(Math.random() * 6);
        const sizeH = Math.random() > 0.4 ? sizeW * 1.6 : sizeW;
        const delayMs = Math.floor(Math.random() * 320);
        const durationMs = 1400 + Math.floor(Math.random() * 750);
        const dxMid = Math.round((Math.random() - 0.5) * 60);
        const dxEnd = Math.round(dxMid + (Math.random() - 0.5) * 90);
        const rot = Math.round(280 + Math.random() * 440) * (Math.random() > 0.5 ? 1 : -1);

        piece.style.left = `${leftPct}%`;
        piece.style.width = `${sizeW}px`;
        piece.style.height = `${sizeH}px`;
        piece.style.backgroundColor = palette[i % palette.length];
        piece.style.animationDelay = `${delayMs}ms`;
        piece.style.animationDuration = `${durationMs}ms`;
        piece.style.setProperty('--confetti-dx-mid', `${dxMid}px`);
        piece.style.setProperty('--confetti-dx-end', `${dxEnd}px`);
        piece.style.setProperty('--confetti-rot', `${rot}deg`);
        layer.appendChild(piece);
    }

    containerEl.appendChild(layer);
    setTimeout(() => {
        if (layer && layer.parentNode) {
            layer.parentNode.removeChild(layer);
        }
    }, 2600);
}

function finishQuizSummary(options = {}) {
    const totalQ = currentQuizQuestionsList.length;
    const answeredKeys = Object.keys(currentQuizUserAnswers);
    const correctCount = answeredKeys.filter(k => currentQuizUserAnswers[k].isCorrect).length;
    const percent = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const isPassed = percent >= 70;
    const courseId = currentActiveCourseId;
    const isEn = currentLang === 'en';

    const course = (typeof allCourses !== 'undefined') ? (allCourses.find(c => c.id === courseId) || allCourses[0]) : null;
    const shelfMeta = (typeof BAFS_SHELF_COURSES !== 'undefined') ? BAFS_SHELF_COURSES.find(s => s.id === courseId) : null;
    const courseCode = (shelfMeta && shelfMeta.code) ? shelfMeta.code : `BAFS-KM-0${courseId}`;
    const courseCover = (course && course.cover) || (shelfMeta && shelfMeta.cover) || 'Cover/06_Servant_Leadership.png';
    const courseNameEn = (course && (course.title_en || course.title)) || (shelfMeta && shelfMeta.title_en) || 'BAFS Executive Masterclass';
    const courseNameTh = (course && course.title_th) || (shelfMeta && shelfMeta.title_th) || '';
    const courseCategory = isEn
        ? ((course && course.badgeText_en) || (shelfMeta && shelfMeta.categoryName_en) || 'Executive Masterclass')
        : ((course && course.badgeText_th) || (shelfMeta && shelfMeta.categoryName_th) || 'หลักสูตรพัฒนาศักยภาพ BAFS');

    let completedDateStr = '';
    try {
        completedDateStr = new Date().toLocaleDateString(isEn ? 'en-GB' : 'th-TH', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch (e) {
        completedDateStr = new Date().toISOString().slice(0, 10);
    }

    if (isPassed && !completedCourses.includes(courseId)) {
        completedCourses.push(courseId);
        renderCourseCatalog(allCourses);
    }

    // Update top progress header to completed state cleanly
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) progressFill.style.width = '100%';
    const scoreBadge = document.getElementById('quiz-current-score-badge');
    if (scoreBadge) {
        scoreBadge.textContent = isEn ? `Final Score: ${correctCount} / ${totalQ}` : `คะแนนรวม: ${correctCount} / ${totalQ}`;
    }

    const questionView = document.getElementById('single-question-view');
    if (questionView) questionView.classList.add('hidden');

    const statusBadgeText = isPassed
        ? (isEn ? 'COMPLETED • Learning Standard Met' : 'COMPLETED • สำเร็จการเรียนรู้แล้ว')
        : (isEn ? 'NEEDS REVIEW • Benchmark 70% Required' : 'NEEDS REVIEW • ทบทวนเพิ่มเติม');

    const headlineHtml = isPassed
        ? (isEn
            ? `You have successfully completed <span class="text-[#FA541C]">${escapeQuizHtml(courseNameEn)}</span>`
            : `คุณได้สำเร็จการเรียนรู้หลักสูตร <span class="text-[#FA541C]">${escapeQuizHtml(courseNameEn)}</span> แล้ว`)
        : (isEn
            ? `Assessment threshold not met for <span class="text-[#FA541C]">${escapeQuizHtml(courseNameEn)}</span>`
            : `ยังไม่ผ่านเกณฑ์การประเมินหลักสูตร <span class="text-[#FA541C]">${escapeQuizHtml(courseNameEn)}</span>`);

    const descText = isPassed
        ? (isEn
            ? 'Congratulations! You have passed the BAFS knowledge assessment and your learning completion status has been recorded for this course.'
            : 'ขอแสดงความยินดี! คุณผ่านการประเมินองค์ความรู้และสมรรถนะตามมาตรฐาน BAFS สำหรับหลักสูตรนี้เรียบร้อยแล้ว')
        : (isEn
            ? `You scored ${percent}% (passing threshold is 70% or higher). Review the highlighted focus topics below before retaking the quiz.`
            : `คะแนนของคุณอยู่ที่ ${percent}% (เกณฑ์มาตรฐาน ≥ 70%) แนะนำให้ทบทวนหัวข้อสำคัญด้านล่าง แล้วกลับมาทำแบบทดสอบใหม่ได้ทันที`);

    const correctLabel = isEn ? 'SCORE' : 'คะแนนที่ได้';
    const benchmarkLabel = isEn ? 'BENCHMARK' : 'เกณฑ์ผ่าน';
    const statusLabel = isEn ? 'STATUS' : 'สถานะ';
    const statusVal = isPassed ? (isEn ? 'Completed' : 'สำเร็จการเรียนรู้') : (isEn ? 'Needs Review' : 'ต้องทบทวน');

    const catalogBtnText = isEn ? 'Explore More Courses' : 'เรียนหลักสูตรอื่นต่อ (คลังความรู้)';
    const retakeBtn = isEn ? 'Retake Quiz' : 'ทำแบบทดสอบใหม่อีกครั้ง';
    const retakeShortBtn = isEn ? 'Retake' : 'ทำซ้ำอีกครั้ง';
    const infoBtn = isEn ? 'Review Infographic' : 'ดู Infographic สรุปบทเรียน';
    const isPdfLocked = typeof isCoursePdfDownloadDisabled === 'function' && isCoursePdfDownloadDisabled(courseId);
    const pdfBtn = isPdfLocked
        ? (isEn ? 'Review Lesson Slides' : 'อ่านทบทวนสไลด์ในบทเรียน')
        : (isEn ? 'Review PDF Deck' : 'เปิดดูสไลด์ PDF ฉบับเต็ม');

    // Collect every question index that was answered incorrectly OR skipped
    const needsReviewIndices = currentQuizQuestionsList
        .map((_, idx) => idx)
        .filter(idx => !currentQuizUserAnswers[idx] || !currentQuizUserAnswers[idx].isCorrect);

    let focusReviewSection = '';
    if (!isPassed && needsReviewIndices.length > 0) {
        focusReviewSection = `
            <div class="rounded-3xl border border-orange-200/90 bg-orange-50/40 p-6 sm:p-8 text-left space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-200/70">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 text-[#FA541C] flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-sm sm:text-base font-black text-slate-900">${isEn ? 'Focus Topics to Review' : 'หัวข้อที่ควรเน้นและทบทวนเพิ่มเติม'}</h4>
                            <p class="text-xs text-slate-500 font-medium">${isEn ? 'Key learning points from questions to reinforce before your next attempt' : 'สรุปจุดเน้นและสาระสำคัญจากข้อที่ตอบผิดหรือข้ามไป เพื่อให้คุณทบทวนก่อนเริ่มทำใหม่'}</p>
                        </div>
                    </div>
                    <span class="inline-flex items-center px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FA541C] text-xs font-black shrink-0 self-start sm:self-center shadow-2xs">
                        ${isEn ? `${needsReviewIndices.length} Topics to Review` : `${needsReviewIndices.length} หัวข้อที่ต้องเน้น`}
                    </span>
                </div>

                <div class="grid grid-cols-1 gap-3.5">
                    ${needsReviewIndices.map(qIdx => {
                        const q = currentQuizQuestionsList[qIdx];
                        if (!q) return '';
                        const wasSkipped = !currentQuizUserAnswers[qIdx];
                        const stateChip = wasSkipped
                            ? (isEn ? 'Unanswered' : 'ยังไม่ได้ตอบ')
                            : (isEn ? 'Incorrect' : 'ตอบไม่ถูกต้อง');
                        return `
                            <div class="rounded-2xl bg-white border border-slate-200/90 hover:border-orange-300/90 p-4 sm:p-5 shadow-xs transition-colors space-y-2.5">
                                <div class="flex flex-wrap items-center justify-between gap-2">
                                    <span class="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FA541C] text-[10px] font-black uppercase tracking-wider">
                                        ${isEn ? `Question ${qIdx + 1}` : `ข้อที่ ${qIdx + 1}`}
                                    </span>
                                    <span class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                                        ${stateChip}
                                    </span>
                                </div>
                                <h5 class="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                    ${escapeQuizHtml(q.question)}
                                </h5>
                                <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-slate-700 space-y-1">
                                    <span class="font-black text-[#FA541C] flex items-center gap-1.5">
                                        <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span>${isEn ? 'Key Learning Point:' : 'จุดเน้นและสาระสำคัญที่ถูกต้อง:'}</span>
                                    </span>
                                    <p class="leading-relaxed pl-5 font-medium text-slate-700">${escapeQuizHtml(q.feedback || (isEn ? 'Review the course module materials for this topic.' : 'ทบทวนเนื้อหาในบทเรียนและสไลด์ประกอบการสอนของหัวข้อนี้'))}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Review Shortcuts -->
                <div class="pt-2 flex flex-wrap items-center gap-2.5">
                    <button type="button" onclick="switchCourseSubTab('infographic')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-orange-50 text-[#FA541C] border border-orange-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs">
                        <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>${isEn ? 'Review Infographic Summary' : 'เปิดดู Infographic สรุปภาพรวม'}</span>
                    </button>
                    <button type="button" onclick="switchCourseSubTab('curriculum')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs">
                        <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <span>${isPdfLocked ? (isEn ? 'Review Lesson Slides' : 'อ่านทบทวนสไลด์ในบทเรียน') : (isEn ? 'Review Course Slide Deck (PDF)' : 'เปิดดูสไลด์ PDF ทบทวน')}</span>
                    </button>
                </div>
            </div>
        `;
    }

    const coverBadgeHtml = isPassed
        ? `<div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/95 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                <svg class="w-3 h-3 stroke-white" fill="none" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>VERIFIED</span>
           </div>`
        : `<div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FA541C]/95 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                <span>REVIEW NEEDED</span>
           </div>`;

    const actionButtonsHtml = isPassed
        ? `
            <button type="button" onclick="switchTab(1)" class="h-11 px-5 rounded-xl bg-gradient-to-r from-[#FF8A48] via-[#FA541C] to-[#D4380D] hover:brightness-105 text-white font-black text-xs shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer group">
                <span>${catalogBtnText}</span>
                <svg class="w-4 h-4 stroke-current group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.25">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
            </button>
            <button type="button" onclick="switchCourseSubTab('infographic')" class="h-11 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FA541C] border border-orange-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>${infoBtn}</span>
            </button>
            <button type="button" onclick="switchCourseSubTab('curriculum')" class="h-11 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <span>${pdfBtn}</span>
            </button>
            <button type="button" onclick="renderFullPageQuiz(${courseId})" class="h-11 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>${retakeShortBtn}</span>
            </button>
        `
        : `
            <button type="button" onclick="renderFullPageQuiz(${courseId})" class="h-11 px-5 rounded-xl bg-gradient-to-r from-[#FF8A48] via-[#FA541C] to-[#D4380D] hover:brightness-105 text-white font-black text-xs shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-4 h-4 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>${retakeBtn}</span>
            </button>
            <button type="button" onclick="switchCourseSubTab('infographic')" class="h-11 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FA541C] border border-orange-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>${infoBtn}</span>
            </button>
            <button type="button" onclick="switchCourseSubTab('curriculum')" class="h-11 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <span>${pdfBtn}</span>
            </button>
            <button type="button" onclick="switchTab(1)" class="h-11 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <span>${isEn ? 'Course Catalog' : 'คลังความรู้'}</span>
            </button>
        `;

    const summaryContainer = document.getElementById('detail-quiz-results-summary');
    if (summaryContainer) {
        summaryContainer.className = 'relative space-y-6 text-left';
        summaryContainer.innerHTML = `
            <!-- SPLIT EXECUTIVE ACHIEVEMENT CARD -->
            <div class="quiz-result-split-card relative rounded-3xl border border-slate-200/90 bg-white shadow-xl overflow-hidden flex flex-col lg:flex-row">
                
                <!-- LEFT PANEL: Dark Navy BAFS Showcase -->
                <div class="w-full lg:w-5/12 quiz-executive-showcase-panel text-white p-6 sm:p-8 flex flex-col justify-between gap-5 relative overflow-hidden shrink-0">
                    <!-- Subtle Focal Corner Ambient Accent -->
                    <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full ${isPassed ? 'bg-emerald-500/15' : 'bg-[#FA541C]/15'} blur-3xl pointer-events-none"></div>

                    <!-- Top Metadata Row -->
                    <div class="relative z-10 flex flex-wrap items-center justify-between gap-2">
                        <span class="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white/95 font-mono text-[11px] font-bold tracking-wider">
                            ${escapeQuizHtml(courseCode)}
                        </span>
                        <span class="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 text-[11px] font-bold">
                            ${escapeQuizHtml(courseCategory)}
                        </span>
                    </div>

                    <!-- 16:9 Course Cover Showcase -->
                    <div class="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-950">
                        <img src="${courseCover}" alt="${escapeQuizHtml(courseNameEn)}" class="w-full h-full object-cover">
                        ${coverBadgeHtml}
                    </div>

                    <!-- Course Identity -->
                    <div class="relative z-10 space-y-2">
                        <div class="space-y-1">
                            <span class="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
                                ${isPassed ? (isEn ? 'BAFS LEARNING COMPLETION' : 'BAFS EXECUTIVE LEARNING RECORD') : (isEn ? 'BAFS KNOWLEDGE ASSESSMENT' : 'BAFS ASSESSMENT SUMMARY')}
                            </span>
                            <h4 class="text-base sm:text-lg font-black text-white leading-snug">
                                ${escapeQuizHtml(courseNameEn)}
                            </h4>
                            ${courseNameTh ? `<p class="text-xs font-medium text-slate-300 leading-relaxed">${escapeQuizHtml(courseNameTh)}</p>` : ''}
                        </div>
                        <div class="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] text-slate-400 font-medium">
                            <span>${escapeQuizHtml(completedDateStr)}</span>
                            <span>${isEn ? 'Standard ≥ 70%' : 'เกณฑ์มาตรฐาน ≥ 70%'}</span>
                        </div>
                    </div>
                </div>

                <!-- RIGHT PANEL: Crisp Gallery White Summary & Animated Gauge -->
                <div class="w-full lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white relative">
                    
                    <!-- Top Row: Status & Headline + SVG Circular Progress Ring -->
                    <div class="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-5">
                        <div class="space-y-3 flex-1 min-w-0">
                            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${isPassed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-[#FA541C] border-orange-200'}">
                                ${isPassed
                                    ? `<svg class="w-3.5 h-3.5 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
                                    : `<svg class="w-3.5 h-3.5 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
                                }
                                <span>${statusBadgeText}</span>
                            </div>

                            <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug" style="text-wrap: balance;">
                                ${headlineHtml}
                            </h3>

                            <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed" style="text-wrap: pretty;">
                                ${descText}
                            </p>
                        </div>

                        <!-- Animated SVG Circular Score Gauge -->
                        <div class="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 self-center sm:self-start select-none">
                            <svg class="w-full h-full" viewBox="0 0 100 100" role="img" aria-label="${percent}% score">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" stroke-width="8"></circle>
                                <circle
                                    id="quiz-score-ring-arc"
                                    class="quiz-ring-progress"
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="${isPassed ? '#10B981' : '#FA541C'}"
                                    stroke-width="8"
                                    stroke-linecap="round"
                                    transform="rotate(-90 50 50)"
                                    stroke-dasharray="263.89"
                                    stroke-dashoffset="263.89"
                                ></circle>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span id="quiz-score-counter-num" class="text-xl sm:text-2xl font-black text-slate-900 tabular-nums leading-none">0%</span>
                                <span class="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mt-1">${isEn ? 'SCORE' : 'ผลคะแนน'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Middle Row: Crisp 3-Column KPI Strip -->
                    <div class="grid grid-cols-3 divide-x divide-slate-200/90 rounded-2xl bg-slate-50/90 border border-slate-200/80 py-3.5 px-2 text-center">
                        <div class="px-2 space-y-1">
                            <span class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">${correctLabel}</span>
                            <div class="text-base sm:text-lg font-black text-slate-900 tabular-nums">
                                ${correctCount} <span class="text-xs font-bold text-slate-400">/ ${totalQ}</span>
                            </div>
                        </div>
                        <div class="px-2 space-y-1">
                            <span class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">${benchmarkLabel}</span>
                            <div class="text-base sm:text-lg font-black text-slate-700 tabular-nums">
                                &ge; 70%
                            </div>
                        </div>
                        <div class="px-2 space-y-1">
                            <span class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">${statusLabel}</span>
                            <div class="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black ${isPassed ? 'text-emerald-600' : 'text-[#FA541C]'} pt-0.5">
                                <span class="w-2 h-2 rounded-full ${isPassed ? 'bg-emerald-500' : 'bg-[#FA541C]'} shrink-0"></span>
                                <span class="truncate">${statusVal}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Row: Executive Action Bar -->
                    <div class="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                        ${actionButtonsHtml}
                    </div>

                </div>
            </div>

            ${focusReviewSection}
        `;

        summaryContainer.classList.remove('hidden');
        animateQuizScoreGauge(percent);
        if (isPassed && !options.skipConfetti) {
            triggerQuizConfettiBurst(summaryContainer);
        }
        if (!options.skipScroll) {
            summaryContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function closeQuizModal() {
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
}

// ==========================================
// CERTIFICATE GENERATOR (DEPRECATED - REPLACED BY DIRECT COMPLETION STATUS)
// ==========================================
function showCertificateModal(courseId, score) {
    // Deprecated: Completion badge is now displayed directly in quiz summary
}

function closeCertificateModal() {
    const certModal = document.getElementById('certificate-modal');
    if (certModal) certModal.classList.add('hidden');
}

function printCertificate() {
    window.print();
}

// ==========================================
// AI PATHWAY & COPILOT
// ==========================================
function triggerAISearch(initialPrompt = '') {
    const modal = document.getElementById('ai-pathway-modal');
    if (modal) {
        modal.classList.remove('hidden');
        if (initialPrompt) {
            document.getElementById('ai-goal-input').value = initialPrompt;
        }
    }
}

function closeAIPathwayModal() {
    const modal = document.getElementById('ai-pathway-modal');
    if (modal) modal.classList.add('hidden');
}

function generatePersonalizedAIPath(event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    const deptEl = document.getElementById('ai-dept-select');
    const roleEl = document.getElementById('ai-role-select');
    const goalEl = document.getElementById('ai-goal-input');

    const dept = deptEl ? deptEl.value : '';
    const role = roleEl ? roleEl.value : '';
    const rawGoal = goalEl ? goalEl.value.trim() : '';
    const goal = rawGoal.toLowerCase();

    // Intelligent Matching Engine across 9 BAFS Masterclasses
    const scoredCourses = allCourses.map(course => {
        let score = 0;
        const searchableText = `${course.title} ${course.desc || ''} ${(course.tags || []).join(' ')} ${course.category || ''}`.toLowerCase();

        // 1. Keyword search relevance
        if (goal) {
            const keywords = goal.split(/[\s,]+/);
            keywords.forEach(kw => {
                if (kw.length >= 2) {
                    if (course.title.toLowerCase().includes(kw)) score += 12;
                    if ((course.tags || []).some(t => t.toLowerCase().includes(kw))) score += 8;
                    if (searchableText.includes(kw)) score += 4;
                }
            });
        }

        // 2. Department relevance
        if (dept.includes('การเงิน') || dept.includes('พัฒนาธุรกิจ')) {
            if ([1, 2, 7].includes(course.id)) score += 6;
        } else if (dept.includes('นวัตกรรม') || dept.includes('เทคโนโลยี')) {
            if ([1, 5, 6].includes(course.id)) score += 6;
        } else if (dept.includes('ทรัพยากรบุคคล') || dept.includes('HR')) {
            if ([3, 4, 9].includes(course.id)) score += 6;
        } else if (dept.includes('ปฏิบัติการ') || dept.includes('Aviation')) {
            if ([3, 4, 6].includes(course.id)) score += 5;
        }

        // 3. Role level relevance
        if (role.includes('Manager') || role.includes('ผู้จัดการ')) {
            if ([1, 2, 3, 4, 7].includes(course.id)) score += 4;
        } else if (role.includes('Supervisor') || role.includes('หัวหน้างาน')) {
            if ([3, 4, 6, 8].includes(course.id)) score += 4;
        } else {
            // Specialist / Officer
            if ([5, 6, 8, 9].includes(course.id)) score += 4;
        }

        return { course, score };
    });

    // Sort descending by score, select top 3 distinct courses
    scoredCourses.sort((a, b) => b.score - a.score);
    const topPicks = scoredCourses.slice(0, 3).map(item => item.course);

    const phases = [
        { phase: 'Phase 1: Foundation (เดือนที่ 1)', badgeColor: 'border-orange-200 bg-orange-50 text-[#FA541C]' },
        { phase: 'Phase 2: Core Competency (เดือนที่ 2)', badgeColor: 'border-blue-200 bg-blue-50 text-blue-700' },
        { phase: 'Phase 3: Impact & Mastery (เดือนที่ 3)', badgeColor: 'border-purple-200 bg-purple-50 text-purple-700' }
    ];

    const resultBox = document.getElementById('ai-pathway-result');
    if (!resultBox) return;

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
        <div class="p-6 rounded-2xl bg-white border border-slate-200 text-left space-y-4 shadow-sm">
            <div class="flex items-center gap-2 text-[#FA541C] font-black text-sm">
                <svg class="w-4 h-4 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span>แผนพัฒนาทักษะเฉพาะบุคคล (AI Upskill Roadmap)</span>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-semibold">
                <div>สายงาน: <strong class="text-slate-900">${dept || 'ทั่วไป'} (${role || 'พนักงาน'})</strong></div>
                <div class="mt-0.5">เป้าหมายการพัฒนา: <strong class="text-[#FA541C]">"${rawGoal || 'เพิ่มทักษะความเป็นเลิศและต่อยอดศักยภาพในงาน'}"</strong></div>
            </div>
            
            <!-- Milestones -->
            <div class="space-y-3 pt-1">
                ${topPicks.map((c, idx) => `
                    <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#FA541C]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div class="space-y-1">
                            <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${phases[idx].badgeColor}">
                                ${phases[idx].phase}
                            </span>
                            <h5 class="text-xs font-black text-slate-800 leading-tight">
                                ${c.title}
                            </h5>
                            <p class="text-[11px] text-slate-500 line-clamp-1">
                                ${c.desc || ''}
                            </p>
                        </div>
                        <button onclick="openCoursePage(${c.id}); closeAIPathwayModal();" class="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8A48] via-[#FA541C] to-[#D4380D] hover:opacity-95 text-white font-black text-[11px] shrink-0 shadow-xs transition-all cursor-pointer">
                            เริ่มเรียน
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    return topPicks;
}

// ==========================================
// WISDOM EXCHANGE ACTIONS & COMMUNITY LOGIC
// ==========================================

function likeWisdomPost(postId, btn) {
    const post = wisdomPosts.find(p => p.id === postId);
    if (!post) return;

    post.isLiked = !post.isLiked;
    if (post.isLiked) {
        post.likes += 1;
    } else {
        post.likes = Math.max(0, post.likes - 1);
    }

    // Update community total likes stat
    const totalLikesEl = document.getElementById('stat-total-likes');
    if (totalLikesEl) {
        const currentTotal = parseInt(totalLikesEl.textContent.replace(/,/g, '')) || 1420;
        totalLikesEl.textContent = (currentTotal + (post.isLiked ? 1 : -1)).toLocaleString();
    }

    renderWisdomCards();
}

function toggleWisdomComments(postId) {
    if (openCommentsPostIds.has(postId)) {
        openCommentsPostIds.delete(postId);
    } else {
        openCommentsPostIds.add(postId);
    }
    renderWisdomCards();
    
    // Focus input if opened
    if (openCommentsPostIds.has(postId)) {
        setTimeout(() => {
            const input = document.getElementById(`wisdom-comment-input-${postId}`);
            if (input) input.focus();
        }, 50);
    }
}

function addWisdomComment(postId, event) {
    if (event) event.preventDefault();
    const input = document.getElementById(`wisdom-comment-input-${postId}`);
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    const post = wisdomPosts.find(p => p.id === postId);
    if (post) {
        if (!post.comments) post.comments = [];
        post.comments.push({
            author: currentLang === 'en' ? 'Sutthichai K. (You)' : 'คุณสุทธิชัย กิตติคุณ (คุณ)',
            time: currentLang === 'en' ? 'Just now' : 'เมื่อสักครู่',
            text: text
        });

        // Update community engagement stat
        const totalLikesEl = document.getElementById('stat-total-likes');
        if (totalLikesEl) {
            const currentTotal = parseInt(totalLikesEl.textContent.replace(/,/g, '')) || 1420;
            totalLikesEl.textContent = (currentTotal + 1).toLocaleString();
        }

        renderWisdomCards();
    }
}

function toggleBookmarkWisdom(postId, btn) {
    const post = wisdomPosts.find(p => p.id === postId);
    if (!post) return;

    post.isBookmarked = !post.isBookmarked;
    renderWisdomCards();

    // Show feedback toast
    showToastNotification(post.isBookmarked 
        ? (currentLang === 'en' ? 'Saved to personal knowledge vault' : 'บันทึกเข้าคลังปัญญาส่วนตัวแล้ว') 
        : (currentLang === 'en' ? 'Removed from personal knowledge vault' : 'นำออกจากคลังปัญญาส่วนตัวแล้ว'));
}

function shareWisdomPost(postId) {
    const post = wisdomPosts.find(p => p.id === postId);
    const title = post ? post.title : 'BAFS Wisdom Hub';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#wisdom-${postId}`);
    }
    showToastNotification(currentLang === 'en' ? `Link copied: "${title.substring(0, 30)}..."` : `คัดลอกลิงก์ "${title.substring(0, 30)}..." แล้ว`);
}

function showToastNotification(msg) {
    let toast = document.getElementById('bafs-global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'bafs-global-toast';
        toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-700 z-50 transition-all duration-300 pointer-events-none opacity-0';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, -8px)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 0)';
    }, 2500);
}

function filterWisdomByCategory(category, btnEl) {
    if (activeWisdomCategory === category && category !== 'all') {
        activeWisdomCategory = 'all';
    } else {
        activeWisdomCategory = category;
    }
    
    // Update visual category card styling
    const catCards = document.querySelectorAll('.wisdom-cat-card');
    catCards.forEach(card => {
        card.classList.remove('ring-2', 'ring-[#FA541C]', 'shadow-md', 'scale-[1.02]');
    });

    const allBtn = document.getElementById('wisdom-catcard-all');
    if (allBtn) {
        if (activeWisdomCategory === 'all') {
            allBtn.className = "px-3.5 py-1.5 rounded-xl bg-[#FA541C] text-white font-black text-xs shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer";
        } else {
            allBtn.className = "px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer";
        }
    }

    if (activeWisdomCategory !== 'all') {
        const activeCard = document.getElementById(`wisdom-catcard-${activeWisdomCategory}`);
        if (activeCard) {
            activeCard.classList.add('ring-2', 'ring-[#FA541C]', 'shadow-md', 'scale-[1.02]');
        }
    }

    // Update status label
    const statusLabel = document.getElementById('wisdom-filter-status-label');
    if (statusLabel) {
        const isEn = currentLang === 'en';
        const catMap = {
            all: isEn ? 'All Categories' : 'ทุกหมวดความรู้',
            operations: isEn ? 'Category: Operations & Safety' : 'หมวด: Operations & Safety',
            leadership: isEn ? 'Category: Leadership & OD' : 'หมวด: Leadership & OD',
            tech: isEn ? 'Category: Tech & Automation' : 'หมวด: Tech & Automation',
            innovation: isEn ? 'Category: Innovation & Strategy' : 'หมวด: Innovation & Strategy',
            softskills: isEn ? 'Category: Soft Skills & Communication' : 'หมวด: Soft Skills & Communication',
            other: isEn ? 'Category: Other Topics' : 'หมวด: อื่นๆ'
        };
        statusLabel.textContent = catMap[activeWisdomCategory] || (isEn ? 'All Categories' : 'ทุกหมวดความรู้');
    }

    // Toggle reset filter button
    const resetBtn = document.getElementById('wisdom-reset-filter-btn');
    if (resetBtn) {
        if (activeWisdomCategory !== 'all' || activeWisdomTag) {
            resetBtn.classList.remove('hidden');
        } else {
            resetBtn.classList.add('hidden');
        }
    }

    renderWisdomCards();
}

function filterWisdomByTag(tag) {
    if (activeWisdomTag === tag) {
        activeWisdomTag = '';
    } else {
        activeWisdomTag = tag;
    }

    // Toggle reset filter button
    const resetBtn = document.getElementById('wisdom-reset-filter-btn');
    if (resetBtn) {
        if (activeWisdomCategory !== 'all' || activeWisdomTag) {
            resetBtn.classList.remove('hidden');
        } else {
            resetBtn.classList.add('hidden');
        }
    }

    renderWisdomCards();
}

function handleWisdomSearch(query) {
    wisdomSearchQuery = query.trim();
    const clearBtn = document.getElementById('wisdom-search-clear-btn');
    if (clearBtn) {
        if (wisdomSearchQuery.length > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }
    renderWisdomCards();
}

function clearWisdomSearch() {
    const input = document.getElementById('wisdom-search-input');
    if (input) input.value = '';
    wisdomSearchQuery = '';
    const clearBtn = document.getElementById('wisdom-search-clear-btn');
    if (clearBtn) clearBtn.classList.add('hidden');
    renderWisdomCards();
}

function sortWisdomPosts(criteria) {
    currentWisdomSort = criteria;
    const btnLatest = document.getElementById('sort-btn-latest');
    const btnPopular = document.getElementById('sort-btn-popular');
    
    if (btnLatest && btnPopular) {
        if (criteria === 'latest') {
            btnLatest.className = 'px-3.5 py-1.5 rounded-xl bg-white text-[#FA541C] shadow-sm font-black text-xs transition-all cursor-pointer';
            btnPopular.className = 'px-3.5 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-xs transition-all cursor-pointer';
        } else {
            btnPopular.className = 'px-3.5 py-1.5 rounded-xl bg-white text-[#FA541C] shadow-sm font-black text-xs transition-all cursor-pointer';
            btnLatest.className = 'px-3.5 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-xs transition-all cursor-pointer';
        }
    }
    renderWisdomCards();
}

function toggleExpandWisdomPost(postId) {
    if (expandedWisdomPostIds.has(postId)) {
        expandedWisdomPostIds.delete(postId);
    } else {
        expandedWisdomPostIds.add(postId);
    }
    renderWisdomCards();
}

function openWisdomShareModal(templateType) {
    const modal = document.getElementById('wisdom-share-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (templateType) {
            applyWisdomTemplate(templateType);
        }
    }
}

function closeWisdomShareModal() {
    const modal = document.getElementById('wisdom-share-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function scrollToWisdomForm() {
    openWisdomShareModal();
}

function applyWisdomTemplate(type) {
    openWisdomShareModal();
    const titleInput = document.getElementById('wisdom-input-title');
    const catSelect = document.getElementById('wisdom-input-cat');
    const contentText = document.getElementById('wisdom-input-content');
    const tagsInput = document.getElementById('wisdom-input-tags');

    if (!titleInput || !contentText) return;

    if (type === 'quick_tip') {
        titleInput.value = 'เทคนิคการตรวจเช็คหน้างานให้รวดเร็วและแม่นยำ';
        if (catSelect) catSelect.value = 'operations';
        contentText.value = '1. ตรวจสอบจุดเชื่อมต่อหลักตาม Checklist มาตรฐาน\n2. สังเกตสัญญาณเตือนเบื้องต้นก่อนเริ่มเดินระบบ\n3. ทวนสอบค่าพารามิเตอร์ซ้ำอีกครั้ง เพื่อป้องกันข้อผิดพลาด 100%';
        if (tagsInput) tagsInput.value = '#QuickTip #OperationalExcellence #BestPractice';
    } else if (type === 'troubleshooting') {
        titleInput.value = 'แนวทางแก้ไขปัญหาเมื่อระบบแสดงสัญญาณเตือนแรงดัน';
        if (catSelect) catSelect.value = 'tech';
        contentText.value = 'อาการที่พบ: ระบบมีค่าความดันคลาดเคลื่อนเล็กน้อย\nวิธีแก้ไข: ให้ทำ Zero-Calibration หัวเซนเซอร์ใหม่ และตรวจดู O-Ring\nผลลัพธ์: ระบบกลับมาทำงานปกติภายใน 3 นาที โดยไม่ต้องหยุดเครื่องจักร';
        if (tagsInput) tagsInput.value = '#Troubleshooting #ProblemSolving #Maintenance';
    } else if (type === 'ai_prompt') {
        titleInput.value = 'สูตร Prompt ChatGPT สำหรับสรุปประเด็นการประชุม 5 นาที';
        if (catSelect) catSelect.value = 'tech';
        contentText.value = 'Prompt: "คุณเป็นผู้เชี่ยวชาญด้านบริหารจัดการ ช่วยสรุปบันทึกการประชุมนี้เป็น 3 หัวข้อ: 1. ข้อตกลงร่วม 2. สิ่งที่ต้องทำต่อ (Action Items) พร้อมระบุผู้รับผิดชอบ 3. กำหนดส่งงาน"';
        if (tagsInput) tagsInput.value = '#ChatGPT #PromptEngineering #Productivity';
    } else if (type === 'safety') {
        titleInput.value = 'กฎเหล็กความปลอดภัย 3 ประการในการปฏิบัติงานลานบิน';
        if (catSelect) catSelect.value = 'operations';
        contentText.value = '1. สวมใส่อุปกรณ์ PPE ครบชุดทุกครั้งในเขต Airside\n2. ยึดหลัก FOD Check (Foreign Object Debris) ตรวจสอบสิ่งแปลกปลอมรอบพื้นที่\n3. ใช้สิทธิ์หยุดงานทันที (Stop Work Authority) หากพบเงื่อนไขที่ไม่ปลอดภัย';
        if (tagsInput) tagsInput.value = '#SafetyFirst #AviationSafety #ZeroAccident';
    }

    showToastNotification('นำเข้าเทมเพลตตัวอย่างเรียบร้อยแล้ว');
}

function handleAddWisdomSubmit(event) {
    event.preventDefault();
    const author = document.getElementById('wisdom-input-author')?.value.trim() || 'คุณสุทธิชัย กิตติคุณ (คุณ)';
    const title = document.getElementById('wisdom-input-title').value.trim();
    const content = document.getElementById('wisdom-input-content').value.trim();
    const category = document.getElementById('wisdom-input-cat').value;
    const rawTags = document.getElementById('wisdom-input-tags')?.value.trim() || '';

    if (!title || !content) return;

    // Parse Tags
    let parsedTags = ['BAFS KM', 'Best Practice'];
    if (rawTags) {
        parsedTags = rawTags.split(/[\s,#]+/).filter(t => t.trim().length > 0);
    }

    const catBadgeMap = {
        operations: 'bg-blue-50 text-blue-700 border-blue-200',
        leadership: 'bg-orange-50 text-[#FA541C] border-orange-200',
        tech: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        innovation: 'bg-purple-50 text-purple-700 border-purple-200',
        softskills: 'bg-amber-50 text-amber-800 border-amber-200',
        other: 'bg-slate-100 text-slate-700 border-slate-300'
    };

    const catLabelMap = {
        operations: 'Operations & Safety',
        leadership: 'Leadership & OD',
        tech: 'Tech & Automation',
        innovation: 'Innovation & Strategy',
        softskills: 'Soft Skills & Communication',
        other: 'General / Other'
    };

    const newPost = {
        id: `w_${Date.now()}`,
        author: author,
        dept: 'สายงานสังกัด BAFS Group',
        role: 'Staff Contributor',
        time: currentLang === 'en' ? 'Just now' : 'เมื่อสักครู่',
        title: title,
        category: category,
        catLabel_th: catLabelMap[category] || 'องค์ความรู้',
        catLabel_en: catLabelMap[category] || 'Insight',
        catBadge: catBadgeMap[category] || 'bg-orange-50 text-[#FA541C] border-orange-200',
        content: content,
        likes: 1,
        isLiked: true,
        isBookmarked: false,
        tags: parsedTags,
        comments: []
    };

    wisdomPosts.unshift(newPost);
    localStorage.setItem('bafs_km_wisdom_posts', JSON.stringify(wisdomPosts));

    renderWisdomCards();
    document.getElementById('wisdom-add-form').reset();
    closeWisdomShareModal();

    // Send payload to Google Sheets if API URL is configured
    if (GOOGLE_SHEET_API_URL) {
        const payload = {
            author: author,
            dept: 'สายงานสังกัด BAFS Group',
            category: category,
            title: title,
            content: content,
            tags: parsedTags,
            attachmentUrl: ''
        };
        fetch(GOOGLE_SHEET_API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.warn('Syncing post to Google Sheet:', err));
    }

    // Show Reward Celebration Toast
    const toast = document.getElementById('wisdom-reward-toast');
    if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3500);
    }
}

// ==========================================
// DASHBOARD & CHART.JS
// ==========================================
let radarChartInstance = null;
function initRadarChart() {
    const ctx = document.getElementById('skillsRadarChart');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    const isEn = currentLang === 'en';

    if (typeof Chart !== 'undefined') {
        if (radarChartInstance) radarChartInstance.destroy();

        radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Leadership', 'Strategic Foresight', 'Business Acumen', 'Innovation & Design', 'Tech & AI', 'Communication'],
                datasets: [{
                    label: isEn ? 'Your Current Skill Level' : 'ระดับทักษะปัจจุบันของคุณ',
                    data: [85, 90, 78, 88, 92, 80],
                    backgroundColor: 'rgba(250, 84, 28, 0.25)',
                    borderColor: '#FA541C',
                    borderWidth: 2,
                    pointBackgroundColor: '#FA541C',
                    pointBorderColor: isDark ? '#0F172A' : '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#FA541C'
                }, {
                    label: isEn ? 'Department Benchmark' : 'เป้าหมายมาตรฐานตำแหน่งงาน',
                    data: [75, 75, 70, 80, 85, 75],
                    backgroundColor: 'rgba(2, 132, 199, 0.15)',
                    borderColor: '#0284C7',
                    borderWidth: 1.5,
                    borderDash: [4, 4],
                    pointBackgroundColor: '#0284C7'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: isDark ? '#334155' : '#E2E8F0' },
                        grid: { color: isDark ? '#334155' : '#F1F5F9' },
                        pointLabels: {
                            font: { family: 'Prompt', size: 11, weight: 'bold' },
                            color: isDark ? '#CBD5E1' : '#475569'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: isDark ? '#64748B' : '#94A3B8'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Prompt', size: 11, weight: 'bold' },
                            color: isDark ? '#E2E8F0' : '#334155'
                        }
                    }
                }
            }
        });
    }
}

// ==========================================
// WISDOM DETAIL MODAL POPUP (อ่านข้อมูลเต็ม)
// ==========================================
let currentModalPostId = null;

function openWisdomDetailModal(postId) {
    const post = wisdomPosts.find(p => p.id === postId);
    if (!post) return;
    currentModalPostId = postId;

    const modal = document.getElementById('wisdom-detail-modal');
    if (!modal) return;

    const isEn = currentLang === 'en';
    const initialLetter = post.author ? post.author.trim().charAt(0) : 'B';
    
    const avatarEl = document.getElementById('wisdom-modal-avatar');
    if (avatarEl) avatarEl.textContent = initialLetter;

    const authorEl = document.getElementById('wisdom-modal-author');
    if (authorEl) authorEl.textContent = post.author;

    const deptEl = document.getElementById('wisdom-modal-dept');
    if (deptEl) deptEl.textContent = `${post.dept || post.role || ''} • ${post.time}`;

    const catBadgeMap = {
        operations: 'bg-blue-100/90 text-blue-800 border-blue-200',
        leadership: 'bg-orange-100/90 text-[#FA541C] border-orange-200',
        tech: 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
        innovation: 'bg-purple-100/90 text-purple-800 border-purple-200',
        softskills: 'bg-amber-100/90 text-amber-900 border-amber-200',
        other: 'bg-slate-100 text-slate-800 border-slate-200'
    };

    const catBadge = document.getElementById('wisdom-modal-category-badge');
    if (catBadge) {
        const catLabel = isEn ? (post.catLabel_en || 'Insight') : (post.catLabel_th || 'Insight');
        catBadge.textContent = catLabel;
        catBadge.className = `px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${catBadgeMap[post.category] || 'bg-orange-100/90 text-[#FA541C] border-orange-200'}`;
    }

    const ratingEl = document.getElementById('wisdom-modal-rating');
    if (ratingEl) {
        ratingEl.innerHTML = post.rating ? `${'★'.repeat(post.rating)}${'☆'.repeat(5 - post.rating)}` : '';
    }

    const titleEl = document.getElementById('wisdom-modal-title');
    if (titleEl) titleEl.textContent = post.title;

    const contentEl = document.getElementById('wisdom-modal-content');
    if (contentEl) contentEl.textContent = post.content;

    // Tags
    const tagsContainer = document.getElementById('wisdom-modal-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = (post.tags || []).map(t => `
            <button onclick="closeWisdomDetailModal(); filterWisdomByTag('${t}');" class="px-3 py-1 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-[#FA541C] hover:border-orange-300 text-slate-700 text-xs font-bold border border-slate-300 shadow-xs transition-colors cursor-pointer">
                #${t}
            </button>
        `).join('');
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeWisdomDetailModal() {
    const modal = document.getElementById('wisdom-detail-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// ==========================================
// TOOLS & MODELS QUICK MODAL DATABASE
// ==========================================
const toolsDatabase = {
    // Course 1: Intrapreneurship & Strategic Foresight
    "5 Mega Trends": {
        title_th: "5 Mega Trends (5 เมกะเทรนด์โลก)",
        title_en: "5 Mega Trends",
        desc_th: "การวิเคราะห์ 5 แนวโน้มการเปลี่ยนแปลงระดับโลก ได้แก่ การเปลี่ยนแปลงสภาพภูมิอากาศ, สังคมสูงวัย, ความก้าวหน้าทางเทคโนโลยี, การขยายตัวของเมือง และการเปลี่ยนขั้วเศรษฐกิจโลก เพื่อตั้งรับความเสี่ยงและหาโอกาสทางธุรกิจใหม่",
        desc_en: "Analysis of 5 global megatrends (Climate Change, Aging Society, Tech Breakthroughs, Urbanization, Economic Shifts) to identify emerging business opportunities and strategic risks.",
        model: {
            type: "flow",
            title_th: "5 เมกะเทรนด์ขับเคลื่อนอนาคต (5 Global Megatrends)",
            title_en: "5 Global Megatrends Flow",
            items_th: ["1. Climate & Net-Zero", "2. Aging Society", "3. AI & Deep Tech", "4. Rapid Urbanization", "5. Geopolitics & Economic Shift"],
            items_en: ["1. Climate & Net-Zero", "2. Aging Society", "3. AI & Deep Tech", "4. Rapid Urbanization", "5. Geopolitics & Economic Shift"]
        }
    },
    "PESTEL Analysis": {
        title_th: "PESTEL Analysis",
        title_en: "PESTEL Analysis",
        desc_th: "เครื่องมือวิเคราะห์สภาพแวดล้อมมหภาคภายนอก 6 มิติ (Political, Economic, Social, Technological, Environmental, Legal) เพื่อประเมินผลกระทบ ปัจจัยขับเคลื่อน และความท้าทายที่อาจเกิดขึ้นต่อการดำเนินธุรกิจขององค์กร",
        desc_en: "Framework analyzing 6 macro-environmental dimensions (Political, Economic, Social, Technological, Environmental, Legal) impacting organizational strategy.",
        model: {
            type: "grid",
            title_th: "6 มิติสภาพแวดล้อมมหภาค (PESTEL Dimensions)",
            title_en: "6 Macro Environmental Dimensions",
            items_th: [
                { label: "P - Political", desc: "นโยบายรัฐ เสถียรภาพการเมือง ข้อตกลงระหว่างประเทศ" },
                { label: "E - Economic", desc: "เงินเฟ้อ อัตราดอกเบี้ย ภาวะเศรษฐกิจโลกและราคาน้ำมัน" },
                { label: "S - Social", desc: "โครงสร้างประชากร ค่านิยมและพฤติกรรมผู้บริโภค" },
                { label: "T - Technological", desc: "AI ระบบอัตโนมัติ และดิจิทัลทรานส์ฟอร์เมชัน" },
                { label: "E - Environmental", desc: "เป้าหมาย ESG สภาพภูมิอากาศ และพลังงานสะอาด" },
                { label: "L - Legal", desc: "กฎหมายคุ้มครองข้อมูล ข้อบังคับอุตสาหกรรมการบิน" }
            ],
            items_en: [
                { label: "P - Political", desc: "Government policies & international trade agreements" },
                { label: "E - Economic", desc: "Inflation, interest rates, fuel prices & macro cycles" },
                { label: "S - Social", desc: "Demographics, workforce dynamics & cultural shifts" },
                { label: "T - Technological", desc: "AI, robotics, automation & aviation technology" },
                { label: "E - Environmental", desc: "Net-zero goals, ESG metrics & clean SAF fuels" },
                { label: "L - Legal", desc: "Compliance, labor laws & aviation regulations" }
            ]
        }
    },
    "Scenario Matrix (4 Futures)": {
        title_th: "Scenario Matrix (ภาพอนาคต 4 รูปแบบ)",
        title_en: "Scenario Matrix (4 Futures)",
        desc_th: "การสร้างฉากทัศน์ภาพอนาคต 4 รูปแบบ โดยนำปัจจัยความไม่แน่นอนสูงสุดที่มีผลกระทบสูง (Critical Uncertainties) มาตัดกันเป็น 2 แกน เพื่อจำลองสถานการณ์และออกแบบแผนกลยุทธ์ที่ยืดหยุ่นล่วงหน้า",
        desc_en: "2x2 matrix intersecting critical uncertainties to create 4 plausible future scenarios and build resilient contingency strategies.",
        model: {
            type: "matrix",
            title_th: "ฉากทัศน์ภาพอนาคต 4 รูปแบบ (2x2 Uncertainty Matrix)",
            title_en: "2x2 Plausible Futures Matrix",
            items_th: [
                "Quadrant 1 (Green & Boom): เติบโตยั่งยืน พลังงานสะอาดได้รับความนิยมสูง",
                "Quadrant 2 (Tech Disruption): เปลี่ยนผ่านสู่นวัตกรรมใหม่ ดิจิทัลครองตลาด",
                "Quadrant 3 (Stagnation): เศรษฐกิจชะลอตัว การลงทุนชะลอตาม",
                "Quadrant 4 (High Volatility): วิกฤตภูมิรัฐศาสตร์และต้นทุนพลังงานพุ่งสูง"
            ],
            items_en: [
                "Quadrant 1 (Green & Boom): High sustainability adoption & steady economic expansion",
                "Quadrant 2 (Tech Disruption): Rapid AI automation transforms legacy business models",
                "Quadrant 3 (Stagnation): Low market growth and constrained capital investments",
                "Quadrant 4 (High Volatility): Geopolitical fragmentation & energy cost spikes"
            ]
        }
    },
    "LEGO® SERIOUS PLAY® (LSP)": {
        title_th: "LEGO® SERIOUS PLAY® (LSP)",
        title_en: "LEGO® SERIOUS PLAY® (LSP)",
        desc_th: "ระเบียบวิธีการคิดและแก้ปัญหาผ่านการต่อตัวต่อเลโก้ (Hand-Core Thinking) ช่วยปลดล็อกความคิดสร้างสรรค์ สะท้อนมุมมองเชิงลึก และสื่อสารแนวคิดนามธรรมให้เห็นเป็นรูปธรรมร่วมกันในทีม",
        desc_en: "Facilitated methodology using LEGO bricks to unlock creative thinking, explore complex insights, and enhance team alignment.",
        model: {
            type: "flow",
            title_th: "กระบวนการ 4 ขั้นตอน (4-Step LSP Process)",
            title_en: "4-Step LSP Facilitation Flow",
            items_th: ["1. Challenge (ตั้งโจทย์คำถาม)", "2. Build (ลงมือต่อโมเดล 3D)", "3. Share (เล่าความหมายเชิงสัญลักษณ์)", "4. Reflect (สะท้อนคิดร่วมกัน)"],
            items_en: ["1. Challenge Framing", "2. 3D Model Building", "3. Storytelling & Sharing", "4. Reflection & Synthesis"]
        }
    },
    "Early Signposts Monitoring": {
        title_th: "Early Signposts Monitoring (การเฝ้าระวังสัญญาณเตือนภัยล่วงหน้า)",
        title_en: "Early Signposts Monitoring",
        desc_th: "ระบบเฝ้าระวังและตรวจจับสัญญาณเตือนภัยล่วงหน้า (Weak Signals / Leading Indicators) เพื่อช่วยให้องค์กรปรับตัวเชิงรุกได้ทันท่วงทีก่อนที่วิกฤตหรือภาพอนาคตจะเกิดขึ้นจริง",
        desc_en: "Monitoring system tracking early indicators and weak signals to trigger proactive strategic pivots ahead of disruptions.",
        model: {
            type: "flow",
            title_th: "ลำดับการตรวจจับสัญญาณเตือนภัย (Foresight Ladder)",
            title_en: "3-Tier Foresight Radar",
            items_th: ["1. Weak Signals (สัญญาณเตือนจุดเล็ก)", "2. Emerging Trends (เริ่มก่อตัวเป็นแนวโน้ม)", "3. Mainstream Impact (ผลกระทบเชิงกลยุทธ์วงกว้าง)"],
            items_en: ["1. Weak Signals Detection", "2. Emerging Trend Clustering", "3. Strategic Mainstream Impact"]
        }
    },

    // Course 2: Business Acumen
    "5 Business Drivers Model": {
        title_th: "5 Business Drivers Model (5 ตัวขับเคลื่อนธุรกิจ)",
        title_en: "5 Business Drivers Model",
        desc_th: "แบบจำลองตัวขับเคลื่อนธุรกิจหลัก 5 ด้าน ประกอบด้วย เงินสด (Cash), กำไร (Profit), สินทรัพย์ (Assets), การเติบโต (Growth) และบุคลากร (People) เพื่อทำความเข้าใจภาพรวมสถานะการเงินและการดำเนินงานขององค์กร",
        desc_en: "Holistic model covering Cash, Profit, Assets, Growth, and People to understand enterprise financial and operational dynamics.",
        model: {
            type: "grid",
            title_th: "5 ตัวขับเคลื่อนธุรกิจหลัก (5 Core Business Drivers)",
            title_en: "5 Core Business Drivers",
            items_th: [
                { label: "1. Cash (เงินสด)", desc: "สภาพคล่องและกระแสเงินสดหมุนเวียนในการดำเนินงาน" },
                { label: "2. Profit (กำไร)", desc: "ความสามารถในการสร้างกำไรและควบคุมต้นทุนอย่างมีประสิทธิภาพ" },
                { label: "3. Assets (สินทรัพย์)", desc: "ผลตอบแทนจากการใช้สินทรัพย์และทรัพยากรให้คุ้มค่าสูงสุด" },
                { label: "4. Growth (การเติบโต)", desc: "การขยายรายได้ ส่วนแบ่งตลาด และขยายขอบเขตธุรกิจ" },
                { label: "5. People (บุคลากร)", desc: "วัฒนธรรมองค์กร ขวัญกำลังใจ และสมรรถนะของทีมงาน" }
            ],
            items_en: [
                { label: "1. Cash", desc: "Liquidity, cash flow generation & solvency" },
                { label: "2. Profit", desc: "Margin optimization & cost discipline" },
                { label: "3. Assets", desc: "Asset utilization & capital return efficiency" },
                { label: "4. Growth", desc: "Sustainable revenue & market expansion" },
                { label: "5. People", desc: "Workforce competency, morale & team alignment" }
            ]
        }
    },
    "TOWS Matrix (SO/ST/WO/WT)": {
        title_th: "TOWS Matrix (SO/ST/WO/WT)",
        title_en: "TOWS Matrix (SO/ST/WO/WT)",
        desc_th: "ตารางวิเคราะห์กลยุทธ์ต่อยอดจาก SWOT โดยจับคู่จุดแข็ง/จุดอ่อนภายในกับโอกาส/อุปสรรคภายนอก ออกมาเป็น 4 กลยุทธ์เชิงรุกและเชิงรับ ได้แก่ SO (รุก), ST (ป้องกัน), WO (พัฒนา), และ WT (รับมือ/ลดความเสี่ยง)",
        desc_en: "Strategic matching matrix converting SWOT factors into 4 actionable strategies: Strengths-Opportunities (SO), Strengths-Threats (ST), Weaknesses-Opportunities (WO), and Weaknesses-Threats (WT).",
        model: {
            type: "matrix",
            title_th: "4 กลยุทธ์ต่อยอดจาก SWOT (TOWS Strategic Matrix)",
            title_en: "TOWS 4 Strategic Quadrants",
            items_th: [
                "SO Strategies (Maxi-Maxi): ใช้จุดแข็งภายในเพื่อคว้าโอกาสใหม่จากภายนอก",
                "ST Strategies (Maxi-Mini): ใช้จุดแข็งภายในเพื่อป้องกันและรับมืออุปสรรคภายนอก",
                "WO Strategies (Mini-Maxi): พัฒนาและลดจุดอ่อนภายในเพื่อไม่ให้พลาดโอกาสภายนอก",
                "WT Strategies (Mini-Mini): ลดจุดอ่อนภายในและหลีกเลี่ยงอุปสรรคภายนอกเพื่อลดความเสียหาย"
            ],
            items_en: [
                "SO (Maxi-Maxi): Leverage internal strengths to seize market opportunities",
                "ST (Maxi-Mini): Deploy strengths to mitigate external threats and risks",
                "WO (Mini-Maxi): Overcome internal weaknesses by exploiting external opportunities",
                "WT (Mini-Mini): Minimize internal weaknesses and avoid external threats"
            ]
        }
    },
    "Business Model Canvas (9 Blocks)": {
        title_th: "Business Model Canvas (BMC 9 ช่อง)",
        title_en: "Business Model Canvas (9 Blocks)",
        desc_th: "ผืนผ้าใบโมเดลธุรกิจ 9 ช่อง ช่วยอธิบาย ออกแบบ และประเมินคุณค่าทางธุรกิจ ตั้งแต่กลุ่มลูกค้า คุณค่าที่ส่งมอบ ช่องทาง รายได้ ไปจนถึงพันธมิตร กิจกรรม และโครงสร้างต้นทุน",
        desc_en: "9-block visual canvas for mapping, designing, and testing how an organization creates, delivers, and captures value.",
        model: {
            type: "grid",
            title_th: "9 องค์ประกอบโมเดลธุรกิจ (9 Building Blocks)",
            title_en: "9 Building Blocks of Business Model",
            items_th: [
                { label: "Value Propositions", desc: "คุณค่าและประโยชน์ที่ส่งมอบให้ลูกค้า" },
                { label: "Customer Segments", desc: "กลุ่มลูกค้าเป้าหมายที่ต้องการส่งมอบบริการ" },
                { label: "Channels", desc: "ช่องทางการสื่อสาร การขาย และการส่งมอบ" },
                { label: "Customer Relationships", desc: "รูปแบบการสร้างและรักษาสัมพันธภาพกับลูกค้า" },
                { label: "Revenue Streams", desc: "โครงสร้างแหล่งที่มาของรายได้ทั้งหมด" },
                { label: "Key Resources", desc: "สินทรัพย์ ทรัพยากร และบุคคลสำคัญในการสร้างผลงาน" },
                { label: "Key Activities", desc: "กิจกรรมหลักในการดำเนินธุรกิจให้สำเร็จ" },
                { label: "Key Partnerships", desc: "เครือข่ายพันธมิตรและคู่ค้าเชิงกลยุทธ์" },
                { label: "Cost Structure", desc: "โครงสร้างต้นทุนคงที่และต้นทุนผันแปร" }
            ],
            items_en: [
                { label: "Value Propositions", desc: "Unique value bundles delivered to customers" },
                { label: "Customer Segments", desc: "Target audience personas and markets" },
                { label: "Channels", desc: "Direct and indirect distribution touchpoints" },
                { label: "Customer Relationships", desc: "Engagement and retention strategies" },
                { label: "Revenue Streams", desc: "Income models and monetization mechanisms" },
                { label: "Key Resources", desc: "Core assets, infrastructure, and talent" },
                { label: "Key Activities", desc: "Essential operations and execution tasks" },
                { label: "Key Partnerships", desc: "Strategic suppliers and ecosystem alliances" },
                { label: "Cost Structure", desc: "Major cost drivers, fixed & variable costs" }
            ]
        }
    },
    "Balanced Scorecard (BSC)": {
        title_th: "Balanced Scorecard (BSC - 4 มิติประเมินผลเชิงกลยุทธ์)",
        title_en: "Balanced Scorecard (BSC)",
        desc_th: "กรอบการประเมินและบริหารผลงานเชิงกลยุทธ์ 4 มิติ เพื่อสร้างความสมดุลระหว่างผลการดำเนินงานทางการเงินระยะสั้น และการสร้างขีดความสามารถในการเติบโตระยะยาวขององค์กร",
        desc_en: "Strategic performance management framework balancing short-term financial results with long-term strategic capabilities across 4 core perspectives.",
        model: {
            type: "grid",
            title_th: "4 มิติประเมินผลเชิงกลยุทธ์ (4 Balanced Perspectives)",
            title_en: "4 Strategic BSC Perspectives",
            items_th: [
                { label: "1. Financial (ด้านการเงิน)", desc: "กำไรสุทธิ สภาพคล่อง กระแสเงินสดหมุนเวียน และผลตอบแทนจากการลงทุน (ROI)" },
                { label: "2. Customer (ด้านลูกค้า)", desc: "ความพึงพอใจ ภาพลักษณ์ ความไว้วางใจ และการรักษาฐานลูกค้าสายการบิน" },
                { label: "3. Internal Processes (กระบวนการภายใน)", desc: "ประสิทธิภาพหน้างาน ความแม่นยำ และมาตรฐานความปลอดภัยลานบินระดับสากล" },
                { label: "4. Learning & Growth (การเรียนรู้และพัฒนา)", desc: "ทักษะบุคลากร เครื่องมือเทคโนโลยีดิจิทัล และวัฒนธรรมนวัตกรรมองค์กร" }
            ],
            items_en: [
                { label: "1. Financial Perspective", desc: "Profitability, operating cash flow, liquidity & capital ROI" },
                { label: "2. Customer Perspective", desc: "Customer satisfaction, trust, loyalty & market share retention" },
                { label: "3. Internal Processes", desc: "Operational excellence, lean workflows & aviation safety standards" },
                { label: "4. Learning & Growth", desc: "Workforce upskilling, digital enablement & innovation culture" }
            ]
        }
    },
    "Ground Floor Simulation": {
        title_th: "Ground Floor Simulation (เกมจำลองธุรกิจเสมือนจริง)",
        title_en: "Ground Floor Simulation",
        desc_th: "ระบบจำลองสถานการณ์ทางธุรกิจเสมือนจริง ช่วยให้ผู้เรียนได้ฝึกตัดสินใจลงทุน บริหารต้นทุน กระแสเงินสด และแข่งขันในตลาดจริงแบบ Interactive โดยเห็นผลลัพธ์ทันที",
        desc_en: "Interactive business simulation for practicing executive decisions in capital allocation, cost control, cash flow, and market competition.",
        model: {
            type: "flow",
            title_th: "วงจรจำลองการตัดสินใจทางธุรกิจ (Simulation Cycle)",
            title_en: "Business Simulation Decision Loop",
            items_th: [
                "1. Market Scan (วิเคราะห์ตลาด)",
                "2. Capital Allocation (จัดสรรงบประมาณ)",
                "3. Operations (บริหารจัดการหน้างาน)",
                "4. Review P&L (ประเมินกำไร/ขาดทุน)"
            ],
            items_en: [
                "1. Market Scanning",
                "2. Capital Allocation",
                "3. Operational Execution",
                "4. P&L & Cash Evaluation"
            ]
        }
    },

    // Course 3: Servant Leadership
    "4 Stages of Psychological Safety": {
        title_th: "4 Stages of Psychological Safety (4 ระดับความปลอดภัยทางใจ)",
        title_en: "4 Stages of Psychological Safety",
        desc_th: "ลำดับขั้นการสร้างความปลอดภัยทางใจ 4 ระดับ ได้แก่ Inclusion Safety (รู้สึกเป็นส่วนหนึ่ง), Learner Safety (กล้าเรียนรู้/ถาม), Contributor Safety (กล้าลงมือทำ), และ Challenger Safety (กล้าท้าทายเพื่อสิ่งที่ดีกว่า)",
        desc_en: "4 progressive stages of psychological safety: Inclusion Safety, Learner Safety, Contributor Safety, and Challenger Safety.",
        model: {
            type: "flow",
            title_th: "4 ลำดับขั้นความปลอดภัยทางใจ (Psychological Safety Ladder)",
            title_en: "4 Stages of Psychological Safety",
            items_th: [
                "Stage 1: Inclusion Safety (รู้สึกปลอดภัยที่ได้เป็นส่วนหนึ่ง)",
                "Stage 2: Learner Safety (กล้าถาม กล้าทดลอง และเรียนรู้จากข้อผิดพลาด)",
                "Stage 3: Contributor Safety (กล้าออกความคิดเห็นและลงมือทำอย่างเต็มความสามารถ)",
                "Stage 4: Challenger Safety (กล้าท้าทายสถานะเดิมเพื่อพัฒนาสิ่งใหม่โดยไม่กลัวการถูกตำหนิ)"
            ],
            items_en: [
                "Stage 1: Inclusion Safety (Felt sense of belonging)",
                "Stage 2: Learner Safety (Safe to ask questions and learn from mistakes)",
                "Stage 3: Contributor Safety (Safe to participate and utilize full talents)",
                "Stage 4: Challenger Safety (Safe to challenge the status quo for positive change)"
            ]
        }
    },
    "Skill/Will Matrix": {
        title_th: "Skill/Will Matrix (ตารางทักษะและความตั้งใจ)",
        title_en: "Skill/Will Matrix",
        desc_th: "ตารางประเมินลูกทีมตามแกนทักษะ (Skill) และความตั้งใจ (Will) แบ่งพนักงานเป็น 4 กลุ่มเพื่อปรับสไตล์การดูแลและมอบหมายงานอย่างเหมาะสม (Direct, Guide, Motivate, Delegate)",
        desc_en: "2x2 grid assessing employees on Skill vs Will to choose the optimal leadership style: Direct, Guide, Motivate, or Delegate.",
        model: {
            type: "matrix",
            title_th: "สไตล์การบริหารลูกทีม 4 กลุ่ม (Skill vs Will Matrix)",
            title_en: "Skill vs Will Leadership Matrix",
            items_th: [
                "High Skill + High Will ➔ Delegate (มอบหมายงาน ให้อิสระ และผลักดันสู่ผู้นำ)",
                "Low Skill + High Will ➔ Guide / Coach (สอนงาน แนะนำขั้นตอน และให้คำปรึกษาใกล้ชิด)",
                "High Skill + Low Will ➔ Motivate (สร้างแรงบันดาลใจ ค้นหาจุดติดขัด และฟื้นฟูพลังใจ)",
                "Low Skill + Low Will ➔ Direct (กำหนดกรอบชัดเจน สั่งการเป็นขั้นเป็นตอน และติดตามสม่ำเสมอ)"
            ],
            items_en: [
                "High Skill / High Will ➔ Delegate (Empower with autonomy & strategic scope)",
                "Low Skill / High Will ➔ Guide / Coach (Provide technical coaching & clear steps)",
                "High Skill / Low Will ➔ Motivate (Identify blockers, align purpose & re-energize)",
                "Low Skill / Low Will ➔ Direct (Set structured boundaries, clear tasks & check in often)"
            ]
        }
    },
    "ABCD Meeting Framework": {
        title_th: "ABCD Meeting Framework",
        title_en: "ABCD Meeting Framework",
        desc_th: "โครงสร้างการประชุมและติดตามงาน 4 ส่วน: Action (ทบทวนงานที่ทำ), Behind/Blocker (อุปสรรคที่พบ), Core Priority (เป้าหมายสำคัญถัดไป), และ Decision/Help Needed (สิ่งที่ต้องการให้หัวหน้าช่วยตัดสินใจ)",
        desc_en: "4-part structured check-in framework: Action taken, Behind/Blockers, Core priorities, and Decisions/Help needed.",
        model: {
            type: "grid",
            title_th: "โครงสร้างการติดตามงาน 1-on-1 (ABCD Framework)",
            title_en: "ABCD 1-on-1 Meeting Model",
            items_th: [
                { label: "[A] Action Taken", desc: "ทบทวนผลงานและความคืบหน้าที่ทำสำเร็จในรอบที่ผ่านมา" },
                { label: "[B] Behind / Blocker", desc: "ปัญหา อุปสรรค และจุดที่ล่าช้ากว่าเป้าหมายที่ตั้งไว้" },
                { label: "[C] Core Priority", desc: "เป้าหมายหลักที่สำคัญที่สุดที่ต้องทำให้สำเร็จในสัปดาห์ถัดไป" },
                { label: "[D] Decision & Help", desc: "สิ่งที่ต้องการให้หัวหน้าช่วยตัดสินใจ ปลดล็อก หรือสนับสนุน" }
            ],
            items_en: [
                { label: "[A] Action Taken", desc: "Key milestones accomplished during the past period" },
                { label: "[B] Behind / Blocker", desc: "Bottlenecks, delays, and friction points encountered" },
                { label: "[C] Core Priority", desc: "Top critical outcomes to achieve in the upcoming sprint" },
                { label: "[D] Decision & Help", desc: "Decisions, approvals, and leadership resources requested" }
            ]
        }
    },
    "Active Listening Model": {
        title_th: "Active Listening Model (การฟังเชิงรุก)",
        title_en: "Active Listening Model",
        desc_th: "ศิลปะการฟังเชิงรุกแบบลึกซึ้ง (Deep Listening) ฟังทั้งเนื้อหา อารมณ์ความรู้สึก และเจตนาที่ซ่อนอยู่ โดยไม่ด่วนตัดสินหรือขัดจังหวะ เพื่อสร้างความเข้าใจและความไว้วางใจสูงสุด",
        desc_en: "Empathetic listening technique focusing on content, emotions, and underlying needs without premature judgment or interruption.",
        model: {
            type: "flow",
            title_th: "3 ระดับการฟังอย่างลึกซึ้ง (3 Levels of Listening)",
            title_en: "3 Levels of Active Listening",
            items_th: [
                "Level 1: Internal Listening (ฟังเพื่อรอจังหวะตอบกลับในมุมมองตนเอง)",
                "Level 2: Focused Listening (ฟังเนื้อหาและจับประเด็นใจความของคู่สนทนา)",
                "Level 3: Global / Deep Listening (ฟังน้ำเสียง อารมณ์ ภาษากาย และเจตนาที่ซ่อนอยู่)"
            ],
            items_en: [
                "Level 1: Internal Listening (Listening through personal lens & preparing response)",
                "Level 2: Focused Listening (Attentive to words, tone, and explicit message)",
                "Level 3: Global Listening (Deep empathy tuned to emotions, unsaid needs & environment)"
            ]
        }
    },
    "Behavioral Change Loop (Thinking-Feeling-Action-Result)": {
        title_th: "Behavioral Change Loop (วงจรปรับเปลี่ยนพฤติกรรม)",
        title_en: "Behavioral Change Loop (T-F-A-R)",
        desc_th: "วงจรการปรับเปลี่ยนพฤติกรรม โดยเริ่มจากการปรับกรอบความคิด (Thinking) ซึ่งจะส่งผลต่อความรู้สึก (Feeling) นำไปสู่การลงมือทำ (Action) และเกิดเป็นผลลัพธ์ใหม่ (Result) ที่ยั่งยืน",
        desc_en: "Mental model linking thoughts, emotions, and behaviors: Changing core Thinking shifts Feelings, drives Actions, and generates new Results.",
        model: {
            type: "flow",
            title_th: "วงจรการปรับเปลี่ยนพฤติกรรม (T-F-A-R Cycle)",
            title_en: "Thinking-Feeling-Action-Result Loop",
            items_th: [
                "Thinking (ปรับกรอบความคิด)",
                "Feeling (ความรู้สึกและทัศนคติ)",
                "Action (การลงมือทำและพฤติกรรม)",
                "Result (ผลลัพธ์ใหม่ที่ยั่งยืน)"
            ],
            items_en: [
                "Thinking (Mindset & Beliefs)",
                "Feeling (Emotions & Attitude)",
                "Action (Behavioral Habits)",
                "Result (Sustainable Outcomes)"
            ]
        }
    },

    // Course 4: Stakeholder Management & Negotiation
    "Power-Interest Grid": {
        title_th: "Power-Interest Grid (ตารางอำนาจและความสนใจ)",
        title_en: "Power-Interest Grid",
        desc_th: "ตารางวิเคราะห์ผู้มีส่วนได้ส่วนเสีย 4 กลุ่มตามระดับอำนาจ (Power) และความสนใจ (Interest) เพื่อวางแผนการสื่อสารและการมีส่วนร่วมได้อย่างตรงจุด (Manage Closely, Keep Satisfied, Keep Informed, Monitor)",
        desc_en: "Stakeholder mapping matrix evaluating Power vs Interest to determine optimal engagement strategies: Manage Closely, Keep Satisfied, Keep Informed, or Monitor.",
        model: {
            type: "matrix",
            title_th: "ตารางบริหารผู้มีส่วนได้ส่วนเสีย (Power-Interest Matrix)",
            title_en: "Power-Interest Engagement Matrix",
            items_th: [
                "High Power + High Interest ➔ Manage Closely (บริหารจัดการอย่างใกล้ชิดและให้มีส่วนร่วมหลัก)",
                "High Power + Low Interest ➔ Keep Satisfied (ดูแลให้พึงพอใจและรักษาความสัมพันธ์ที่ดี)",
                "Low Power + High Interest ➔ Keep Informed (สื่อสารและอัปเดตข้อมูลความคืบหน้าสม่ำเสมอ)",
                "Low Power + Low Interest ➔ Monitor (ติดตามสถานการณ์โดยใช้ทรัพยากรน้อยที่สุด)"
            ],
            items_en: [
                "High Power / High Interest ➔ Manage Closely (Key decision-makers, direct collaboration)",
                "High Power / Low Interest ➔ Keep Satisfied (Consult regularly and ensure expectations met)",
                "Low Power / High Interest ➔ Keep Informed (Proactive communication & progress updates)",
                "Low Power / Low Interest ➔ Monitor (Periodic checks with minimal effort)"
            ]
        }
    },
    "Trust Equation": {
        title_th: "Trust Equation (สมการความไว้วางใจ)",
        title_en: "Trust Equation",
        desc_th: "สมการความไว้วางใจ Trust = (Credibility + Reliability + Intimacy) / Self-Orientation ยิ่งลดการเห็นแก่ตนเองลง ความไว้วางใจจากผู้อื่นจะยิ่งเพิ่มสูงขึ้นอย่างทวีคูณ",
        desc_en: "Mathematical trust formula: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. Lower self-orientation dramatically boosts overall trust.",
        model: {
            type: "formula",
            title_th: "สูตรสร้างความไว้วางใจ (The Trust Equation)",
            title_en: "The Trust Equation (Charles H. Green)",
            items_th: [
                "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation",
                "• Credibility (ความน่าเชื่อถือ): เชี่ยวชาญในงาน รู้จริง พูดความจริง",
                "• Reliability (ความสม่ำเสมอ): รักษาสัญญา ทำตามที่พูด ตรงต่อเวลา",
                "• Intimacy (ความปลอดภัยทางใจ): สนิทใจ กล้าเปิดใจ และเก็บความลับได้",
                "• Self-Orientation (ความมุ่งเน้นตนเอง): ตัวหารที่ยิ่งน้อย ความไว้วางใจจะยิ่งสูง"
            ],
            items_en: [
                "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation",
                "• Credibility: Words, technical expertise and intellectual honesty",
                "• Reliability: Consistency, keeping commitments and punctuality",
                "• Intimacy: Emotional safety, empathy and confidentiality",
                "• Self-Orientation: Focus on personal interest vs client interest (lower is superior)"
            ]
        }
    },
    "7-38-55 Communication Rule": {
        title_th: "7-38-55 Communication Rule (กฎการสื่อสาร 7-38-55)",
        title_en: "7-38-55 Communication Rule",
        desc_th: "กฎสัดส่วนการรับรู้สารของมนุษย์ โดย 7% มาจากถ้อยคำที่พูด, 38% มาจากน้ำเสียงและจังหวะ, และ 55% มาจากภาษากายและการแสดงออกทางสีหน้า",
        desc_en: "Albert Mehrabian’s communication rule: 7% words, 38% tone of voice, and 55% body language in emotional message delivery.",
        model: {
            type: "formula",
            title_th: "สัดส่วนการรับรู้สาร (Mehrabian's Communication Rule)",
            title_en: "Mehrabian's Communication Rule",
            items_th: [
                "Total Impact = 7% Words + 38% Tone + 55% Body Language",
                "• 7% Words: ถ้อยคำและเนื้อหาภาษาที่พูด",
                "• 38% Tone of Voice: น้ำเสียง จังหวะ และการเน้นเสียง",
                "• 55% Body Language: สีหน้า แววตา ท่าทาง และภาษากาย"
            ],
            items_en: [
                "Total Impact = 7% Words + 38% Tone + 55% Body Language",
                "• 7% Spoken Words: Literal meaning and factual statements",
                "• 38% Tone of Voice: Pitch, modulation, pacing, and resonance",
                "• 55% Body Language: Posture, facial expression, eye contact, and gestures"
            ]
        }
    },
    "HARD Model (Honest, Action, Respectful, Direct)": {
        title_th: "HARD Communication Model",
        title_en: "HARD Model (Honest, Action, Respectful, Direct)",
        desc_th: "เฟรมเวิร์กการสื่อสารในสถานการณ์ยากลำบากอย่างมืออาชีพ ประกอบด้วยความซื่อสัตย์จริงใจ (Honest), มุ่งเน้นการแก้ปัญหา (Action), ให้เกียรติซึ่งกันและกัน (Respectful) และตรงประเด็น (Direct)",
        desc_en: "High-stakes communication framework built on being Honest, Action-oriented, Respectful, and Direct.",
        model: {
            type: "grid",
            title_th: "4 เสาหลักการสื่อสารสถานการณ์ยาก (HARD Model)",
            title_en: "HARD Communication Pillars",
            items_th: [
                { label: "H - Honest", desc: "ซื่อสัตย์ จริงใจ อยู่บนพื้นฐานของข้อเท็จจริง" },
                { label: "A - Action", desc: "มุ่งเน้นทางออก การลงมือปฏิบัติ และทางแก้ปัญหา" },
                { label: "R - Respectful", desc: "ให้เกียรติ รับฟัง และรักษาศักดิ์ศรีของคู่สนทนา" },
                { label: "D - Direct", desc: "ตรงประเด็น ไม่อ้อมค้อม และชัดเจนในสิ่งที่ต้องการ" }
            ],
            items_en: [
                { label: "H - Honest", desc: "Truthful and transparent with factual grounding" },
                { label: "A - Action", desc: "Solution-focused on pragmatic next steps" },
                { label: "R - Respectful", desc: "Preserves dignity and shows empathetic listening" },
                { label: "D - Direct", desc: "Clear, concise, unambiguous, and to the point" }
            ]
        }
    },
    "BATNA & ZOPA Matrix": {
        title_th: "BATNA & ZOPA Matrix (การเจรจาต่อรอง)",
        title_en: "BATNA & ZOPA Matrix",
        desc_th: "กลยุทธ์การเจรจาต่อรองแบบ Win-Win โดย BATNA คือทางเลือกที่ดีที่สุดหากตกลงกันไม่ได้ (Best Alternative to a Negotiated Agreement) และ ZOPA คือพื้นที่ข้อตกลงร่วมกัน (Zone of Possible Agreement)",
        desc_en: "Negotiation essentials: BATNA defines your fallback alternative power, while ZOPA maps common mutually acceptable agreement ground.",
        model: {
            type: "matrix",
            title_th: "กลยุทธ์การเจรจาต่อรอง (BATNA & ZOPA Matrix)",
            title_en: "BATNA & ZOPA Negotiation Dynamics",
            items_th: [
                "BATNA: Best Alternative to a Negotiated Agreement (ทางเลือกสำรองที่ดีที่สุด ยิ่ง BATNA แข็งแกร่ง อำนาจต่อรองยิ่งสูง)",
                "ZOPA: Zone of Possible Agreement (พื้นที่ทับซ้อนที่ทั้งสองฝ่ายยอมรับได้และเกิดข้อตกลงแบบ Win-Win)"
            ],
            items_en: [
                "BATNA: Best Alternative to a Negotiated Agreement (your fallback walk-away leverage)",
                "ZOPA: Zone of Possible Agreement (the overlap between buyer maximum and seller minimum)"
            ]
        }
    },

    // Course 5: Design Thinking & Innovation Sprint
    "Outside-In & Empathy Map": {
        title_th: "Outside-In & Empathy Map",
        title_en: "Outside-In & Empathy Map",
        desc_th: "แผนภาพทำความเข้าใจผู้ใช้งาน 4 ด้าน (Says, Thinks, Does, Feels) ช่วยให้ทีมมองปัญหาจากมุมมองลูกค้าภายนอกเข้ามาสู่ภายในองค์กรเพื่อหา Pain Points ที่แท้จริง",
        desc_en: "4-quadrant visual tool (Says, Thinks, Does, Feels) to develop deep user empathy from an outside-in customer perspective.",
        model: {
            type: "matrix",
            title_th: "4 ด้านความเข้าใจผู้ใช้ (Empathy Quadrants)",
            title_en: "4 Empathy Map Quadrants",
            items_th: [
                "Says (คำพูดที่ผู้ใช้พูดออกมาตรงๆ): คำสัมภาษณ์ ข้อเสนอแนะ",
                "Thinks (ความคิดและความเชื่อในใจ): สิ่งที่คาดหวังแต่ไม่ได้พูด",
                "Does (การกระทำและพฤติกรรมจริง): ขั้นตอนการทำงานจริงหน้างาน",
                "Feels (อารมณ์ ความกังวล และความสุข): ความหงุดหงิด ความภูมิใจ"
            ],
            items_en: [
                "Says: Explicit user quotes, direct feedback & stated requests",
                "Thinks: Underlying beliefs, silent expectations & unspoken assumptions",
                "Does: Observable physical actions, operational routines & workarounds",
                "Feels: Emotional anxieties, friction pain points & moments of delight"
            ]
        }
    },
    "Customer Persona Canvas": {
        title_th: "Customer Persona Canvas",
        title_en: "Customer Persona Canvas",
        desc_th: "แบบจำลองโปรไฟล์ลูกค้าตัวแทนกลุ่มเป้าหมาย ระบุข้อมูลประชากร พฤติกรรม แรงจูงใจ (Gains) และจุดติดขัดความเจ็บปวด (Pains) เพื่อให้ออกแบบบริการได้ตรงใจ",
        desc_en: "Semi-fictional archetypal representation of target users detailing goals, behaviors, pain points, and core motivations.",
        model: {
            type: "grid",
            title_th: "โครงสร้างตัวแทนผู้ใช้ (Persona Structure)",
            title_en: "Customer Persona Architecture",
            items_th: [
                { label: "Profile & Role", desc: "ข้อมูลพื้นฐาน ตำแหน่งหน้าที่ และบริบทการทำงาน" },
                { label: "Goals & Gains", desc: "เป้าหมาย แรงจูงใจ และผลประโยชน์ที่ต้องการได้รับ" },
                { label: "Pain Points", desc: "ปัญหา ความยุ่งยาก และจุดติดขัดที่กำลังเผชิญ" },
                { label: "Key Behaviors", desc: "พฤติกรรมประจำวัน และช่องทางที่ใช้งานบ่อย" }
            ],
            items_en: [
                { label: "Profile & Role", desc: "Demographic profile, responsibilities & working environment" },
                { label: "Goals & Gains", desc: "Target aspirations, success criteria & desired rewards" },
                { label: "Pain Points", desc: "Obstacles, bottlenecks & frustrating friction points" },
                { label: "Key Behaviors", desc: "Daily habits, decision processes & communication tools" }
            ]
        }
    },
    "Problem Statement Template": {
        title_th: "Problem Statement Template (การตีกรอบปัญหา)",
        title_en: "Problem Statement Template",
        desc_th: "โครงสร้างการตีกรอบโจทย์ปัญหาที่แท้จริงในรูปแบบ '[ผู้ใช้] ต้องการ [ความต้องการ] เพราะ [ข้อมูลเชิงลึก/เหตุผล]' เพื่อใช้เป็นจุดตั้งต้นในการคิดค้นนวัตกรรม",
        desc_en: "Structured framing format: '[User] needs [Need] because [Surprising Insight]' to anchor innovation sprints.",
        model: {
            type: "formula",
            title_th: "สูตรตีกรอบโจทย์ปัญหา (Point of View Formula)",
            title_en: "POV Problem Statement Formula",
            items_th: [
                "[ผู้ใช้ / User] ต้องการ [ความต้องการ / Need] เพราะ [ข้อมูลเชิงลึก / Deep Insight]",
                "• ตัวอย่าง: 'เจ้าหน้าที่เติมน้ำมัน ต้องการระบบบันทึกดิจิทัลที่หน้าลานจอด เพราะต้องการลดเวลาเดินเอกสารและลดความผิดพลาดในการลงบันทึก'"
            ],
            items_en: [
                "[User] needs [Specific Need] because [Surprising Insight]",
                "• Example: 'Aircraft refuelers need a mobile tablet app on apron because manual paperwork delays flight dispatch audits.'"
            ]
        }
    },
    "IDEO Ideation Rules": {
        title_th: "IDEO Ideation Rules (กฎการระดมความคิด)",
        title_en: "IDEO Ideation Rules",
        desc_th: "กฎทองในการระดมไอเดีย ได้แก่ ชะลอการตัดสิน, เน้นปริมาณไอเดีย, ต่อยอดจากไอเดียผู้อื่น, ส่งเสริมไอเดียหลุดโลก, ให้เห็นภาพชัดเจน และทุกคนมีส่วนร่วม",
        desc_en: "Classic brainstorming rules: Defer judgment, encourage wild ideas, build on ideas of others, stay focused on topic, be visual, and go for quantity.",
        model: {
            type: "grid",
            title_th: "กฎการระดมสมองเชิงสร้างสรรค์ (IDEO Brainstorming)",
            title_en: "IDEO Brainstorming Rules",
            items_th: [
                { label: "1. Defer Judgment", desc: "งดเว้นการวิจารณ์หรือตัดสินความคิดคนอื่นในขั้นต้น" },
                { label: "2. Go for Quantity", desc: "เน้นปริมาณไอเดียให้มากที่สุดเพื่อเพิ่มโอกาสพบนวัตกรรม" },
                { label: "3. Build on Others", desc: "ต่อยอดไอเดียผู้อื่นด้วยแนวคิด 'Yes, and...'" },
                { label: "4. Wild Ideas", desc: "เปิดรับไอเดียแหวกแนวเพื่อหาทางออกที่คิดไม่ถึง" }
            ],
            items_en: [
                { label: "1. Defer Judgment", desc: "No criticism; keep the creative pipeline open" },
                { label: "2. Go for Quantity", desc: "Aim for a high volume of divergent concepts" },
                { label: "3. Build on Others", desc: "Combine and expand ideas using 'Yes, and...'" },
                { label: "4. Wild Ideas", desc: "Encourage audacious thinking to break mental barriers" }
            ]
        }
    },
    "MVP Catalogue & Rapid Prototyping": {
        title_th: "MVP Catalogue & Rapid Prototyping",
        title_en: "MVP Catalogue & Rapid Prototyping",
        desc_th: "วิธีการสร้างชิ้นงานหรือแบบจำลองต้นแบบอย่างรวดเร็ว (Minimum Viable Product) เพื่อนำไปทดสอบสมมติฐานสำคัญกับผู้ใช้จริงโดยใช้เวลาและงบประมาณน้อยที่สุด",
        desc_en: "Fast iterative prototyping methodology to validate core hypotheses with minimum cost, time, and effort.",
        model: {
            type: "flow",
            title_th: "ระดับการสร้างชิ้นงานต้นแบบ (Prototyping Ladder)",
            title_en: "Rapid Prototyping Fidelity Ladder",
            items_th: [
                "Low-Fi (Sketch / กระดาษ)",
                "Mid-Fi (Wireframe / ผังจำลอง)",
                "High-Fi (Interactive Pilot / ทดลองใช้งานจริง)"
            ],
            items_en: [
                "Low-Fi (Paper Sketches & Storyboards)",
                "Mid-Fi (Interactive Wireframes & Mockups)",
                "High-Fi (Working Pilot & Live Apron Testing)"
            ]
        }
    },
    "The Experiment Canvas": {
        title_th: "The Experiment Canvas (ผืนผ้าใบการทดลอง)",
        title_en: "The Experiment Canvas",
        desc_th: "ผืนผ้าใบออกแบบการทดลองนวัตกรรม ระบุสมมติฐานความเสี่ยง วิธีการทดสอบ ตัวชี้วัดผล และเกณฑ์ความสำเร็จ (Success Criteria) เพื่อวัดผลและปรับปรุงให้แม่นยำ",
        desc_en: "Strategic experiment sheet defining critical assumptions, test methods, key metrics, and go/no-go success criteria.",
        model: {
            type: "flow",
            title_th: "วงจรทดสอบสมมติฐานนวัตกรรม (Experiment Loop)",
            title_en: "Hypothesis Validation Cycle",
            items_th: [
                "1. Hypothesis (สมมติฐานสำคัญ)",
                "2. Experiment (วิธีทดลอง)",
                "3. Metric (ตัวชี้วัดผล)",
                "4. Learn / Pivot (สรุปและปรับทิศทาง)"
            ],
            items_en: [
                "1. Critical Hypothesis",
                "2. Experiment Design",
                "3. Success Metric",
                "4. Learn & Pivot Decision"
            ]
        }
    },

    // Course 6: High-Impact Presentation
    "Sandwich Communication Model": {
        title_th: "Sandwich Communication Model",
        title_en: "Sandwich Communication Model",
        desc_th: "เทคนิคการจัดโครงสร้างการสื่อสารแบบ 3 ชั้น (เปิดด้วยประเด็นบวก/บริบท -> สอดไส้เนื้อหาหลัก/จุดปรับปรุง -> ปิดท้ายด้วยข้อสรุปและแนวทางเชิงบวก) ช่วยให้ผู้ฟังเปิดใจรับฟัง",
        desc_en: "3-layer communication technique: Open with positive context, deliver core message/constructive feedback in the middle, and close with inspiring forward actions.",
        model: {
            type: "flow",
            title_th: "ลำดับการสื่อสาร 3 ชั้น (3-Layer Feedback Flow)",
            title_en: "Sandwich Communication Flow",
            items_th: [
                "Top Bread (ชื่นชมจุดแข็งและสร้างบรรยากาศเชิงบวก)",
                "Filling (สอดไส้เนื้อหาหลักและข้อเสนอแนะปรับปรุง)",
                "Bottom Bread (ตอกย้ำความเชื่อมั่นและให้กำลังใจ)"
            ],
            items_en: [
                "Top Layer (Genuine praise & positive context)",
                "Filling (Constructive feedback & core message)",
                "Bottom Layer (Encouraging commitment & forward roadmap)"
            ]
        }
    },
    "Plan-Plot-Present Framework": {
        title_th: "Plan-Plot-Present Framework (โครงสร้าง 3P)",
        title_en: "Plan-Plot-Present Framework",
        desc_th: "กระบวนการนำเสนอ 3 ขั้นตอน: Plan (วิเคราะห์ผู้ฟังและเป้าหมาย), Plot (วางโครงเรื่องและเรียบเรียง Storyline), Present (การถ่ายทอดด้วยสไลด์ เสียง และภาษากายอย่างมืออาชีพ)",
        desc_en: "End-to-end presentation methodology: Plan (Audience & Goal), Plot (Storyline & Structure), and Present (Delivery & Visuals).",
        model: {
            type: "flow",
            title_th: "กระบวนการนำเสนอ 3P (3P Presentation Model)",
            title_en: "3P Presentation Workflow",
            items_th: [
                "1. Plan (วิเคราะห์ผู้ฟังและเป้าหมาย)",
                "2. Plot (ร้อยเรียง Storyline และโครงเรื่อง)",
                "3. Present (การถ่ายทอดด้วยสไลด์ เสียง และภาษากาย)"
            ],
            items_en: [
                "1. Plan (Audience Analysis & Core Objectives)",
                "2. Plot (Storyline Structure & Logical Flow)",
                "3. Present (Visual Slide Design & High-Impact Delivery)"
            ]
        }
    },
    "Analytical Essay Structure": {
        title_th: "Analytical Essay Structure",
        title_en: "Analytical Essay Structure",
        desc_th: "โครงสร้างการจัดลำดับเนื้อหาเชิงตรรกะแบบบทความวิเคราะห์ เริ่มจาก Headline ข่าวหลัก -> เหตุผลสนับสนุน 3 ข้อ -> หลักฐานอ้างอิง -> ข้อสรุป/สิ่งที่ต้องดำเนินการ",
        desc_en: "Logical content flow structuring presentations like analytical essays: Strong Headline -> 3 Supporting Pillars -> Evidence -> Clear Call-to-Action.",
        model: {
            type: "grid",
            title_th: "โครงสร้างบทวิเคราะห์เชิงตรรกะ (Narrative Flow)",
            title_en: "Analytical Narrative Structure",
            items_th: [
                { label: "1. Hook & Headline", desc: "เปิดด้วยประเด็นหรือตัวเลขสำคัญที่น่าสนใจและดึงดูดใจ" },
                { label: "2. 3 Core Pillars", desc: "3 เหตุผลหลักพร้อมข้อมูลและหลักฐานสนับสนุนเชิงประจักษ์" },
                { label: "3. Action Recommendation", desc: "ข้อเสนอแนะเชิงกลยุทธ์และขั้นตอนการดำเนินงานถัดไป" }
            ],
            items_en: [
                { label: "1. Hook & Headline", desc: "Compelling executive opening with key metric or question" },
                { label: "2. 3 Core Pillars", desc: "3 structured arguments backed by empirical data" },
                { label: "3. Action Recommendation", desc: "Concrete business recommendation & next steps" }
            ]
        }
    },
    "C.R.A.P. Slide Design Principles": {
        title_th: "C.R.A.P. Slide Design Principles",
        title_en: "C.R.A.P. Slide Design Principles",
        desc_th: "กฎ 4 ข้อในการออกแบบสไลด์ให้อ่านง่ายและสวยงามระดับมืออาชีพ: Contrast (ความเปรียบต่าง), Repetition (ความต่อเนื่องของสไตล์), Alignment (การจัดแนวระเบียบ), Proximity (การจัดกลุ่มสิ่งที่เกี่ยวข้องกัน)",
        desc_en: "4 graphic design principles for slides: Contrast (visual hierarchy), Repetition (consistency), Alignment (clean structure), and Proximity (logical grouping).",
        model: {
            type: "grid",
            title_th: "4 หลักการออกแบบสไลด์ (C.R.A.P. Principles)",
            title_en: "4 Slide Design Principles (CRAP)",
            items_th: [
                { label: "C - Contrast", desc: "เน้นความแตกต่างของสีและขนาดให้จุดสำคัญเด่นชัดเจน" },
                { label: "R - Repetition", desc: "ใช้ฟอนต์และธีมสีสม่ำเสมอตลอดทั้งชุดสไลด์" },
                { label: "A - Alignment", desc: "จัดแนวองค์ประกอบให้ตรงเส้นเพื่อความเป็นระเบียบ" },
                { label: "P - Proximity", desc: "จัดกลุ่มข้อมูลที่สัมพันธ์กันไว้ใกล้กันและเว้นพื้นที่ว่าง" }
            ],
            items_en: [
                { label: "C - Contrast", desc: "Create visual hierarchy using contrasting colors and sizes" },
                { label: "R - Repetition", desc: "Maintain consistent typography, colors, and design motifs" },
                { label: "A - Alignment", desc: "Align visual blocks along clean grids for crisp layout" },
                { label: "P - Proximity", desc: "Group related content items together with intentional whitespace" }
            ]
        }
    },
    "3-Zone Eye Contact & Delivery Toolkit": {
        title_th: "3-Zone Eye Contact & Delivery Toolkit",
        title_en: "3-Zone Eye Contact & Delivery Toolkit",
        desc_th: "เทคนิคการกวาดสายตาสบตาผู้ฟัง 3 โซน (ซ้าย กลาง ขวา) ร่วมกับการใช้น้ำเสียง การเว้นจังหวะหยุด (Pause) และภาษากายเพื่อตรึงความสนใจของห้องประชุม",
        desc_en: "Delivery techniques dividing audience into 3 viewing zones, combined with vocal variety, strategic pauses, and confident stage presence.",
        model: {
            type: "grid",
            title_th: "การสบตาผู้ฟัง 3 โซน (3-Zone Eye Contact)",
            title_en: "3-Zone Audience Engagement",
            items_th: [
                { label: "Left Zone (โซนซ้าย)", desc: "สบตาผู้ฟังฝั่งซ้ายค้างไว้ 3-5 วินาทีเพื่อสร้างความรู้สึกมีส่วนร่วม" },
                { label: "Center Zone (โซนกลาง)", desc: "สบตาผู้ฟังกลุ่มหลักตรงกลางและผู้มีอำนาจตัดสินใจ" },
                { label: "Right Zone (โซนขวา)", desc: "กวาดสายตาครอบคลุมผู้ฟังฝั่งขวาให้รู้สึกเชื่อมโยงเท่าเทียม" }
            ],
            items_en: [
                { label: "Left Zone", desc: "Engage left wing for 3-5 second intervals" },
                { label: "Center Zone", desc: "Anchor key messages to primary central stakeholders" },
                { label: "Right Zone", desc: "Sweep right wing to maintain comprehensive room inclusion" }
            ]
        }
    },

    // Course 7: Finance for Non-Finance
    "Universal P&L Structure": {
        title_th: "Universal P&L Structure (โครงสร้างงบกำไรขาดทุน)",
        title_en: "Universal P&L Structure",
        desc_th: "โครงสร้างงบกำไรขาดทุนสากล แสดงลำดับขั้นจากรายได้ (Revenue) -> ต้นทุนขาย (COGS) -> ค่าใช้จ่ายดำเนินงาน (SG&A) -> กำไรจากการดำเนินงาน จนถึงกำไรสุทธิ (Net Profit)",
        desc_en: "Standard Profit & Loss structure tracing financial flow from Revenue down through COGS, Gross Profit, SG&A, and Net Profit.",
        model: {
            type: "flow",
            title_th: "โครงสร้างงบกำไรขาดทุน (P&L Waterfall Structure)",
            title_en: "Universal P&L Waterfall",
            items_th: [
                "Revenue (รายได้รวม)",
                "− COGS (ต้นทุนขายตรง)",
                "= Gross Profit (กำไรขั้นต้น GP)",
                "− SG&A (ค่าใช้จ่ายขายและบริหาร)",
                "= EBITDA / EBIT (กำไรจากการดำเนินงาน)",
                "− Tax & Interest (ภาษีและดอกเบี้ย)",
                "= Net Profit (กำไรสุทธิ NP)"
            ],
            items_en: [
                "Revenue",
                "− COGS",
                "= Gross Profit (GP)",
                "− SG&A Expenses",
                "= Operating Profit (EBITDA / EBIT)",
                "− Interest & Taxes",
                "= Net Profit (Bottom Line)"
            ]
        }
    },
    "Cost Behavior Matrix (Fixed/Variable & COGS/SG&A)": {
        title_th: "Cost Behavior Matrix (พฤติกรรมต้นทุน)",
        title_en: "Cost Behavior Matrix (Fixed/Variable & COGS/SG&A)",
        desc_th: "เมทริกซ์จำแนกพฤติกรรมต้นทุนระหว่างต้นทุนคงที่ (Fixed Cost) ที่ไม่เปลี่ยนตามยอดขาย และต้นทุนผันแปร (Variable Cost) ที่ผันตามปริมาณกิจกรรม เพื่อบริหารจุดคุ้มทุน",
        desc_en: "Cost classification matrix separating Fixed vs Variable costs and COGS vs SG&A to optimize cost structures and break-even points.",
        model: {
            type: "matrix",
            title_th: "ตารางจำแนกพฤติกรรมต้นทุน (Cost Behavior Matrix)",
            title_en: "Cost Behavior 2x2 Matrix",
            items_th: [
                "Direct Cost (COGS): ต้นทุนตรงผันแปรตามปริมาณการผลิต/การเติมน้ำมัน",
                "Indirect Cost (SG&A): ค่าใช้จ่ายส่วนกลางในการสนับสนุนการดำเนินงาน",
                "Fixed Cost: ต้นทุนคงที่ไม่เปลี่ยนตามยอดขาย (เช่น ค่าเช่าพื้นที่, ค่าเสื่อมราคา)",
                "Variable Cost: ต้นทุนผันแปรที่เพิ่มขึ้นหรือลดลงตามปริมาณการดำเนินงานจริง"
            ],
            items_en: [
                "Direct Cost (COGS): Directly tied to unit volume of goods or fueling operations",
                "Indirect Cost (SG&A): Overhead support and administrative business expenses",
                "Fixed Cost: Costs constant regardless of output volume (rent, depreciation)",
                "Variable Cost: Costs varying proportionally with volume of activity"
            ]
        }
    },
    "Profit Tiers Analysis (GP, EBIT, EBITDA, NP)": {
        title_th: "Profit Tiers Analysis (กำไร 4 ระดับ)",
        title_en: "Profit Tiers Analysis (GP, EBIT, EBITDA, NP)",
        desc_th: "การวิเคราะห์กำไร 4 ระดับ: กำไรขั้นต้น (Gross Profit), กำไรจากการดำเนินงาน (EBIT), กำไรก่อนหักดอกเบี้ย ภาษี ค่าเสื่อม (EBITDA), และกำไรสุทธิ (Net Profit) เพื่อประเมินประสิทธิภาพที่แท้จริง",
        desc_en: "Step-by-step breakdown of profit metrics (GP, EBIT, EBITDA, NP) to accurately measure operational health and cash-generating power.",
        model: {
            type: "grid",
            title_th: "4 ระดับการวัดผลกำไร (4 Profitability Tiers)",
            title_en: "4 Profitability Tiers Breakdown",
            items_th: [
                { label: "1. Gross Profit (GP)", desc: "รายได้ − COGS: วัดประสิทธิภาพการตั้งราคาและควบคุมต้นทุนตรง" },
                { label: "2. EBITDA", desc: "กำไรจากการดำเนินงานก่อนหักค่าเสื่อม: สะท้อนกระแสเงินสดจริง" },
                { label: "3. EBIT", desc: "กำไรจากการดำเนินงานหลังรวมค่าใช้จ่ายบริหาร SG&A" },
                { label: "4. Net Profit (NP)", desc: "กำไรสุทธิบรรทัดสุดท้ายที่เหลือเพื่อผู้ถือหุ้นและกิจการ" }
            ],
            items_en: [
                { label: "1. Gross Profit (GP)", desc: "Revenue minus COGS: Measures pricing power & unit cost efficiency" },
                { label: "2. EBITDA", desc: "Operating profit before non-cash D&A: Reflects real operational cash power" },
                { label: "3. EBIT", desc: "Core operating earnings after overhead & SG&A expenses" },
                { label: "4. Net Profit (NP)", desc: "Final bottom-line net income available to shareholders" }
            ]
        }
    },
    "Variance Analysis Model (Price vs Efficiency)": {
        title_th: "Variance Analysis Model (การวิเคราะห์ผลต่าง)",
        title_en: "Variance Analysis Model (Price vs Efficiency)",
        desc_th: "โมเดลวิเคราะห์ผลต่างระหว่างงบประมาณจริงกับแผน โดยแยกแยะว่าเกิดจากปัจจัยด้านราคา (Price Variance) หรือปัจจัยด้านปริมาณ/ประสิทธิภาพ (Efficiency/Volume Variance)",
        desc_en: "Financial variance model isolating whether budget deviations stem from price fluctuations or volume/efficiency differences.",
        model: {
            type: "formula",
            title_th: "โมเดลวิเคราะห์ผลต่างต้นทุน (Cost Variance Breakdown)",
            title_en: "Cost Variance Analysis Formula",
            items_th: [
                "Total Variance = Price Variance + Efficiency / Volume Variance",
                "• Price Variance (ผลต่างด้านราคา): เกิดจากการซื้อวัตถุดิบ/บริการในราคาที่ต่างจากงบ",
                "• Efficiency Variance (ผลต่างด้านประสิทธิภาพ): เกิดจากการใช้วัตถุดิบ/ชั่วโมงทำงาน มากหรือน้อยกว่าเกณฑ์"
            ],
            items_en: [
                "Total Variance = Price Variance + Efficiency / Volume Variance",
                "• Price Variance: Difference caused by paying more or less per unit of input",
                "• Efficiency Variance: Difference caused by consuming more or less quantity of input"
            ]
        }
    },
    "Rough P&L Modeling & Payback Period Calculator": {
        title_th: "Rough P&L Modeling & Payback Period",
        title_en: "Rough P&L Modeling & Payback Period Calculator",
        desc_th: "แบบจำลองการประมาณการงบกำไรขาดทุนเบื้องต้นและการคำนวณระยะเวลาคืนทุน (Payback Period) สำหรับใช้ประเมินความคุ้มค่าทางการเงินก่อน Pitch โครงการใหม่",
        desc_en: "Quick P&L forecasting tool and payback period calculator for vetting new business cases and investment proposals.",
        model: {
            type: "formula",
            title_th: "สูตรคำนวณระยะเวลาคืนทุน (Payback Period Formula)",
            title_en: "Payback Period Investment Formula",
            items_th: [
                "Payback Period (ระยะเวลาคืนทุน) = เงินลงทุนเริ่มแรก / กระแสเงินสดสุทธิรายปี",
                "• ตัวอย่าง: ลงทุน 2,000,000 บาท สร้างเงินสดสุทธิปีละ 500,000 บาท ➔ คืนทุนใน 4 ปี"
            ],
            items_en: [
                "Payback Period = Initial Investment Capital / Annual Net Cash Inflow",
                "• Example: CapEx $2,000,000 generating $500,000 annual net cash return = 4-Year Payback Period"
            ]
        }
    },

    // Course 8: Business Dining
    "Host vs Guest Playbook": {
        title_th: "Host vs Guest Playbook (บทบาทเจ้าภาพและแขก)",
        title_en: "Host vs Guest Playbook",
        desc_th: "คู่มือบทบาทและมารยาทของเจ้าภาพ (Host) ในการดูแลแขก การเลือกร้าน การสั่งอาหาร และการชำระเงิน เทียบกับบทบาทของแขก (Guest) ในการให้เกียรติและตรงต่อเวลา",
        desc_en: "Essential etiquette guide outlining the distinct responsibilities of the Host (curating, ordering, paying) versus the Guest (punctuality, respect).",
        model: {
            type: "matrix",
            title_th: "บทบาทเจ้าภาพ vs แขกคนสำคัญ (Host vs Guest)",
            title_en: "Host vs Guest Dining Roles",
            items_th: [
                "Role of Host (เจ้าภาพ): กำหนดสถานที่ แนะนำที่นั่ง นำบทสนทนา และดูแลค่าใช้จ่ายอย่างแนบเนียน",
                "Role of Guest (แขก): ตรงต่อเวลา รอสัญญาณจากเจ้าภาพ ปรับจังหวะ และกล่าวขอบคุณอย่างจริงใจ"
            ],
            items_en: [
                "Host Role: Select venue, guide seating, direct conversational flow, and settle bill discreetly",
                "Guest Role: Arrive punctually, follow host cues, adapt dining tempo, and extend warm appreciation"
            ]
        }
    },
    "Seating Diplomacy Protocols (The Right Hand of Honor)": {
        title_th: "Seating Diplomacy Protocols (ผังที่นั่งสากล)",
        title_en: "Seating Diplomacy Protocols (The Right Hand of Honor)",
        desc_th: "ผังที่นั่งสากลตามหลักการทูตธุรกิจ โดยแขกคนสำคัญที่สุด (VIP) จะนั่งอยู่ทาง 'ขวามือ' ของเจ้าภาพเสมอ และหลีกเลี่ยงการให้แขกนั่งหันหลังให้ประตูทางเข้า",
        desc_en: "Diplomatic seating protocol placing the most honored guest immediately to the Host's right hand, with strategic sightlines away from kitchen doors.",
        model: {
            type: "grid",
            title_th: "การจัดลำดับที่นั่งเกียรติยศ (Seating Diplomacy)",
            title_en: "Executive Diplomatic Seating",
            items_th: [
                { label: "1. Right of Host", desc: "ที่นั่งด้านขวามือของเจ้าภาพ = แขกเกียรติยศสูงสุด (VIP 1)" },
                { label: "2. Left of Host", desc: "ที่นั่งด้านซ้ายมือของเจ้าภาพ = แขกเกียรติยศลำดับสอง (VIP 2)" },
                { label: "3. Opposite Host", desc: "ที่นั่งตรงข้ามเจ้าภาพ = ผู้ร่วมเป็นเจ้าภาพ (Co-Host)" }
            ],
            items_en: [
                { label: "1. Right of Host", desc: "Position of highest honor directly to host's right (VIP 1)" },
                { label: "2. Left of Host", desc: "Second seat of honor to host's left (VIP 2)" },
                { label: "3. Opposite Host", desc: "Co-host or secondary organization leader seat" }
            ]
        }
    },
    "Outside-In Cutlery Anatomy": {
        title_th: "Outside-In Cutlery Anatomy (การใช้อุปกรณ์บนโต๊ะ)",
        title_en: "Outside-In Cutlery Anatomy",
        desc_th: "กฎการใช้อุปกรณ์ช้อน ส้อม มีด บนโต๊ะอาหารสากล โดยเริ่มหยิบใช้จาก 'คู่นอกสุด' เข้าสู่ 'คู่ในสุด' ตามลำดับคอร์สอาหารที่เสิร์ฟ",
        desc_en: "Universal dining rule of using utensils arranged from the outside in as each respective course is served.",
        model: {
            type: "flow",
            title_th: "ลำดับการใช้อุปกรณ์จากนอกเข้าใน (Cutlery Flow)",
            title_en: "Outside-In Utensil Progression",
            items_th: [
                "Outer Layer (ช้อน/ส้อมสลัดและอาหารเรียกน้ำย่อย)",
                "Middle Layer (ช้อนซุปและมีด/ส้อมปลา)",
                "Inner Layer (มีด/ส้อมจานหลัก)",
                "Top Layer (ช้อน/ส้อมของหวานด้านบน)"
            ],
            items_en: [
                "Outer Layer (Appetizer & Salad utensils)",
                "Middle Layer (Soup spoon & Fish course utensils)",
                "Inner Layer (Main meat & entrée cutlery)",
                "Top Layer (Dessert spoon & fork above plate)"
            ]
        }
    },
    "Napkin Etiquette Rules": {
        title_th: "Napkin Etiquette Rules (มารยาทการใช้ผ้าเช็ดปาก)",
        title_en: "Napkin Etiquette Rules",
        desc_th: "มารยาทการใช้ผ้าเช็ดปาก วางบนตักทันทีเมื่อนั่ง พับครึ่งโดยเปิดส่วนพับเข้าหาตัว และวางไว้ทางซ้ายของจานเมื่อรับประทานเสร็จ",
        desc_en: "Proper napkin protocols: Place on lap upon sitting, fold in half towards you, and place loosely to the left of your plate when finished.",
        model: {
            type: "flow",
            title_th: "ลำดับการใช้ผ้าเช็ดปาก (Napkin Flow)",
            title_en: "Napkin Protocol Steps",
            items_th: [
                "1. Seated (คลี่ผ้าพับครึ่งวางบนตักทันทีที่นั่งลง)",
                "2. Temporary Leaving (พับผ้าวางบนเก้าอี้หากลุกชั่วคราว)",
                "3. Finished (พับผ้าวางทางซ้ายของจานเมื่อทานเสร็จ)"
            ],
            items_en: [
                "1. Upon Seating (Unfold in half and place on lap)",
                "2. Temporary Leaving (Place loosely on chair seat)",
                "3. Meal Concluded (Place neatly on left side of plate)"
            ]
        }
    },
    "Glassware & Beverage Protocols": {
        title_th: "Glassware & Beverage Protocols (มารยาทการดื่มเครื่องดื่ม)",
        title_en: "Glassware & Beverage Protocols",
        desc_th: "มารยาทการจับแก้วไวน์ที่ก้านแก้วเพื่อรักษาอุณหภูมิ การจิบน้ำ และการปฏิเสธเครื่องดื่มแอลกอฮอล์อย่างสุภาพโดยไม่ต้องคว่ำแก้ว",
        desc_en: "Proper glassware holding by the stem to preserve wine temperature, subtle water sipping etiquette, and polite alcohol declining protocols.",
        model: {
            type: "grid",
            title_th: "ตำแหน่งแก้วเครื่องดื่ม (Glassware Layout)",
            title_en: "Glassware Layout & Protocols",
            items_th: [
                { label: "Water Goblet", desc: "แก้วน้ำใบใหญ่สุด วางอยู่เหนือมีดจานหลักโดยตรง" },
                { label: "White Wine Glass", desc: "แก้วขนาดกลาง ทรงกระเปาะแคบ วางทางขวาของแก้วน้ำ" },
                { label: "Red Wine Glass", desc: "แก้วขนาดใหญ่ ทรงกระเปาะกว้าง สำหรับให้ไวน์ได้สัมผัสอากาศ" },
                { label: "Champagne Flute", desc: "แก้วทรงสูงเรียว สำหรับการเฉลิมฉลองหรือกล่าว Toast" }
            ],
            items_en: [
                { label: "Water Goblet", desc: "Largest glass positioned directly above the main knife" },
                { label: "White Wine", desc: "Medium bowl preserving chilled temperature" },
                { label: "Red Wine", desc: "Larger rounded bowl allowing optimal aeration" },
                { label: "Champagne Flute", desc: "Tall slender flute for sparkling toasts" }
            ]
        }
    },
    "FORM Small Talk Framework": {
        title_th: "FORM Small Talk Framework (หัวข้อสนทนาธุรกิจ)",
        title_en: "FORM Small Talk Framework",
        desc_th: "กรอบหัวข้อสนทนา 4 ด้านที่ปลอดภัยและสร้างสรรค์บนโต๊ะอาหาร: Family (ครอบครัว/พื้นเพ), Occupation (หน้าที่การงาน), Recreation (กิจกรรมยามว่าง/ท่องเที่ยว), และ Motivation (เป้าหมาย/แรงบันดาลใจ)",
        desc_en: "4 safe and engaging business dining conversation topics: Family, Occupation, Recreation, and Motivation.",
        model: {
            type: "grid",
            title_th: "4 หัวข้อสนทนาสร้างสัมพันธ์ (FORM Topics)",
            title_en: "FORM Small Talk Framework",
            items_th: [
                { label: "F - Family", desc: "ครอบครัวและภูมิลำเนา (ในระดับที่เหมาะสมและไม่ก้าวก่าย)" },
                { label: "O - Occupation", desc: "หน้าที่การงาน สายอาชีพ และความเชี่ยวชาญในวิชาชีพ" },
                { label: "R - Recreation", desc: "งานอดิเรก กีฬา การท่องเที่ยว อาหาร และกิจกรรมยามว่าง" },
                { label: "M - Motivation", desc: "เป้าหมาย แรงบันดาลใจ และวิสัยทัศน์ในอนาคต" }
            ],
            items_en: [
                { label: "F - Family", desc: "General roots and background with natural boundaries" },
                { label: "O - Occupation", desc: "Career, industry trends, and professional expertise" },
                { label: "R - Recreation", desc: "Hobbies, travel stories, sports, and favorite cuisine" },
                { label: "M - Motivation", desc: "Future passions, aspirations, and meaningful milestones" }
            ]
        }
    },

    // Course 9: Personality
    "Psychological Gesture & Anchor Technique": {
        title_th: "Psychological Gesture & Anchor Technique",
        title_en: "Psychological Gesture & Anchor Technique",
        desc_th: "จิตวิทยาภาษากาย การสร้างจุดยึดเหนี่ยวความมั่นใจ (Anchoring) เพื่อลดความประหม่า และการส่งสัญญาณความมั่นใจผ่านท่าทางสงบนิ่งและมั่นคง",
        desc_en: "Somatic anchoring technique using subtle physical cues to ground confidence, reduce nervousness, and project poise.",
        model: {
            type: "flow",
            title_th: "ลำดับการสร้างจุดยึดเหนี่ยวความมั่นใจ (Anchoring Flow)",
            title_en: "Psychological Anchoring Sequence",
            items_th: [
                "1. Centering (ปรับลมหายใจให้สงบ)",
                "2. Micro-Anchor (แตะนิ้วหรือสัมผัสเพื่อดึงความมั่นใจ)",
                "3. Poised Delivery (สื่อสารอย่างสง่างาม)"
            ],
            items_en: [
                "1. Breath Centering & Mental Reset",
                "2. Somatic Micro-Anchor Activation",
                "3. Confident & Poised Delivery"
            ]
        }
    },
    "Executive Dress Code & Tailoring Matrix": {
        title_th: "Executive Dress Code & Tailoring Matrix",
        title_en: "Executive Dress Code & Tailoring Matrix",
        desc_th: "กฎการแต่งกายระดับผู้บริหาร 'Fit is King' การเลือกคัตติ้งเสื้อผ้าที่พอดีตัว โทนสีสุภาพ และการปรับระดับความทางการให้เข้ากับกาลเทศะ",
        desc_en: "Executive dress guidelines centered on tailored fit ('Fit is King'), professional color palettes, and dress-code appropriateness.",
        model: {
            type: "matrix",
            title_th: "ระดับการแต่งกายตามกาลเทศะ (Dress Code Matrix)",
            title_en: "Executive Dress Hierarchy Matrix",
            items_th: [
                "Boardroom Formal: สูทสากลระดับทางการสูงสุด สีกรมท่า/ดำ เนคไทสุภาพ",
                "Executive Business: สูทสากลคลาสสิก เชิ้ตขาว/ฟ้า รองเท้าหนังขัดเงา",
                "Smart Business Casual: เบลเซอร์คู่กับกางเกงสแล็ค เชิ้ตคอปกไม่ผูกเนคไท",
                "Site Visit / Casual: เชิ้ตหรือโปโลทางการ พร้อมรองเท้าเซฟตี้/หุ้มส้นสำหรับหน้างาน"
            ],
            items_en: [
                "Boardroom Formal: Dark tailored two-piece suit with executive silk tie",
                "Executive Business: Classic navy/charcoal suit, crisp shirt, oxford shoes",
                "Smart Business Casual: Tailored blazer with slacks/chinos, collared shirt",
                "Operational Site Visit: Professional company polo with site safety footwear"
            ]
        }
    },
    "Posture Mastery & The Power Sphere": {
        title_th: "Posture Mastery & The Power Sphere",
        title_en: "Posture Mastery & The Power Sphere",
        desc_th: "การควบคุมท่ายืน ท่านั่ง และการใช้พื้นที่ภาษากายใน 'Power Sphere' (ระดับหน้าอกถึงเอว) เพื่อแสดงความมั่นใจ เป็นมิตร และน่าเชื่อถือ",
        desc_en: "Posture mastery keeping hand gestures within the 'Power Sphere' (chest to navel zone) to project authority and warmth.",
        model: {
            type: "grid",
            title_th: "อาณาเขตภาษากายสร้างความน่าเชื่อถือ (The Power Sphere)",
            title_en: "The Power Sphere Anatomy",
            items_th: [
                { label: "Power Sphere Zone", desc: "ควบคุมการใช้มือให้อยู่ระหว่างระดับหน้าอกถึงสะดือ สื่อถึงความมั่นคง" },
                { label: "Shoulder Alignment", desc: "ยืดอก เปิดไหล่ ไม่ห่อตัว เพื่อแสดงความเปิดกว้างและพร้อมรับฟัง" },
                { label: "Grounding Stance", desc: "ยืนทิ้งน้ำหนักลงบนขาทั้งสองข้างอย่างสมดุล (ระยะห่างเท่าช่วงไหล่)" }
            ],
            items_en: [
                { label: "Power Sphere Zone", desc: "Contain hand gestures within chest-to-navel box to project authority" },
                { label: "Shoulder Alignment", desc: "Roll shoulders back to project poise, openness, and executive presence" },
                { label: "Grounding Stance", desc: "Distribute weight evenly across feet shoulder-width apart" }
            ]
        }
    },
    "Triangle Eye Contact & Open Gestures": {
        title_th: "Triangle Eye Contact & Open Gestures",
        title_en: "Triangle Eye Contact & Open Gestures",
        desc_th: "เทคนิคการสบตาแบบสามเหลี่ยม (ตาทั้งสองข้างและจุดกึ่งกลางหน้าผาก) ร่วมกับการเปิดฝ่ามือ (Open Palms) เพื่อสร้างความเป็นมิตรและความน่าไว้วางใจ",
        desc_en: "Strategic triangle eye contact technique (eyes and forehead center) paired with open-palm gestures to project authenticity and trustworthiness.",
        model: {
            type: "formula",
            title_th: "เทคนิคการสบตาและผายมือ (Triangle & Open Palms)",
            title_en: "Triangle Gaze & Open Palm Technique",
            items_th: [
                "Triangle Gaze = สลับสบตา ตากลมซ้าย ➔ ตากลมอขวา ➔ กึ่งกลางหน้าผาก",
                "• Open Palms: การผายมือและเปิดฝ่ามือในระดับเอว สื่อถึงความโปร่งใสและจริงใจ",
                "• Natural Pace: สลับตำแหน่งการมองทุก 3-5 วินาที ไม่จ้องตาเขม็งข้างเดียวนานเกินไป"
            ],
            items_en: [
                "Triangle Gaze = Cycle Left Eye ➔ Right Eye ➔ Forehead Midpoint",
                "• Open Palms: Open-hand gestures at waist height signal honesty & warmth",
                "• Natural Pacing: Rotate gaze every 3-5 seconds to prevent fixed staring"
            ]
        }
    },
    "Business Card & Introduction Protocols": {
        title_th: "Business Card & Introduction Protocols",
        title_en: "Business Card & Introduction Protocols",
        desc_th: "มารยาทการแนะนำตัว การจับมือ (Handshake) และการยื่น-รับนามบัตรสากลด้วยสองมือพร้อมกล่าวคำทักทายอย่างให้เกียรติ",
        desc_en: "International protocol for executive introductions, firm handshakes, and respectful two-handed business card exchanges.",
        model: {
            type: "flow",
            title_th: "5 ขั้นตอนการแนะนำตัวและแลกนามบัตร (5-Step Protocol)",
            title_en: "5-Step Executive Introduction Protocol",
            items_th: [
                "1. Stand Up (ลุกขึ้นยืน)",
                "2. Eye Contact (สบตาพร้อมรอยยิ้ม)",
                "3. Introduce (แนะนำชื่อและตำแหน่ง)",
                "4. Handshake (จับมือ/ไหว้ทักทาย)",
                "5. Two-Handed Card (ยื่น-รับนามบัตรด้วยสองมือ)"
            ],
            items_en: [
                "1. Stand Up",
                "2. Eye Contact & Smile",
                "3. State Full Name & Title",
                "4. Firm Handshake / Greeting",
                "5. Two-Handed Card Exchange"
            ]
        }
    },
    "Proxemics Space Management": {
        title_th: "Proxemics Space Management (การบริหารระยะห่าง)",
        title_en: "Proxemics Space Management",
        desc_th: "ศาสตร์การบริหารระยะห่างระหว่างบุคคลในงานสังคมและธุรกิจ (Social vs Personal Zone) เพื่อให้คู่สนทนารู้สึกสบายใจและให้เกียรติซึ่งกันและกัน",
        desc_en: "Spatial distance etiquette (Proxemics) managing personal and social zones to ensure comfort and respect in professional settings.",
        model: {
            type: "grid",
            title_th: "ระยะห่างระหว่างบุคคล 4 ระดับ (Proxemics Distance)",
            title_en: "4 Zones of Interpersonal Distance",
            items_th: [
                { label: "1. Intimate Zone (0 - 45 ซม.)", desc: "ระยะใกล้ชิดพิเศษ สำหรับคนในครอบครัวและคนสนิท" },
                { label: "2. Personal Zone (45 - 120 ซม.)", desc: "ระยะสนทนาแบบเป็นกันเองสำหรับการพูดคุยในที่ทำงานทั่วไป" },
                { label: "3. Social Zone (1.2 - 3.6 ม.)", desc: "ระยะการประชุมทางธุรกิจ งานเลี้ยงต้อนรับ และปฏิสัมพันธ์ทั่วไป" },
                { label: "4. Public Zone (> 3.6 ม.)", desc: "ระยะการนำเสนอบนเวทีต่อหน้าผู้ฟังจำนวนมาก" }
            ],
            items_en: [
                { label: "1. Intimate Zone (0 - 45 cm)", desc: "Reserved for close personal relationships" },
                { label: "2. Personal Zone (45 - 120 cm)", desc: "Comfortable professional peer conversations" },
                { label: "3. Social Zone (1.2 - 3.6 m)", desc: "Business meetings and group networking" },
                { label: "4. Public Zone (> 3.6 m)", desc: "Keynote presentation and stage distance" }
            ]
        }
    }
};

function renderToolModelHTML(modelData, isEn) {
    if (!modelData) return '';

    const title = isEn ? (modelData.title_en || modelData.title_th) : (modelData.title_th || modelData.title_en);
    const type = modelData.type || 'flow';

    // 8 distinct vibrant colorful card themes
    const CARD_PALETTES = [
        { bg: "bg-blue-50/90", border: "border-blue-200/90", badgeBg: "bg-blue-500", badgeText: "text-white", titleText: "text-blue-900", descText: "text-slate-600", lightBadge: "bg-blue-100 text-blue-800" },
        { bg: "bg-amber-50/90", border: "border-amber-200/90", badgeBg: "bg-amber-500", badgeText: "text-white", titleText: "text-amber-900", descText: "text-slate-600", lightBadge: "bg-amber-100 text-amber-800" },
        { bg: "bg-emerald-50/90", border: "border-emerald-200/90", badgeBg: "bg-emerald-500", badgeText: "text-white", titleText: "text-emerald-900", descText: "text-slate-600", lightBadge: "bg-emerald-100 text-emerald-800" },
        { bg: "bg-purple-50/90", border: "border-purple-200/90", badgeBg: "bg-purple-500", badgeText: "text-white", titleText: "text-purple-900", descText: "text-slate-600", lightBadge: "bg-purple-100 text-purple-800" },
        { bg: "bg-rose-50/90", border: "border-rose-200/90", badgeBg: "bg-rose-500", badgeText: "text-white", titleText: "text-rose-900", descText: "text-slate-600", lightBadge: "bg-rose-100 text-rose-800" },
        { bg: "bg-sky-50/90", border: "border-sky-200/90", badgeBg: "bg-sky-500", badgeText: "text-white", titleText: "text-sky-900", descText: "text-slate-600", lightBadge: "bg-sky-100 text-sky-800" },
        { bg: "bg-teal-50/90", border: "border-teal-200/90", badgeBg: "bg-teal-500", badgeText: "text-white", titleText: "text-teal-900", descText: "text-slate-600", lightBadge: "bg-teal-100 text-teal-800" },
        { bg: "bg-indigo-50/90", border: "border-indigo-200/90", badgeBg: "bg-indigo-500", badgeText: "text-white", titleText: "text-indigo-900", descText: "text-slate-600", lightBadge: "bg-indigo-100 text-indigo-800" }
    ];

    let contentHtml = '';

    if (type === 'flow') {
        const items = isEn ? (modelData.items_en || modelData.items_th) : (modelData.items_th || modelData.items_en);
        const colCount = items.length <= 3 ? 'sm:grid-cols-3' : (items.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3');
        contentHtml = `
            <div class="space-y-3">
                <div class="font-black text-slate-800 text-xs flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#FA541C] animate-pulse"></span>
                    <span>${title}</span>
                </div>
                <div class="grid grid-cols-1 ${colCount} gap-2.5">
                    ${items.map((item, idx) => {
                        const palette = CARD_PALETTES[idx % CARD_PALETTES.length];
                        const stepNum = String(idx + 1).padStart(2, '0');
                        let mainText = item;
                        let subText = '';
                        if (item.includes(':')) {
                            const parts = item.split(':');
                            mainText = parts[0].trim();
                            subText = parts.slice(1).join(':').trim();
                        } else if (item.includes('(') && item.endsWith(')')) {
                            const openParen = item.indexOf('(');
                            mainText = item.substring(0, openParen).trim();
                            subText = item.substring(openParen + 1, item.length - 1).trim();
                        }
                        return `
                            <div class="p-3.5 rounded-2xl ${palette.bg} border ${palette.border} shadow-2xs flex flex-col justify-between space-y-1.5 transition-all hover:scale-[1.02]">
                                <div class="flex items-center justify-between gap-1.5">
                                    <span class="px-2 py-0.5 rounded-lg ${palette.badgeBg} ${palette.badgeText} text-[10px] font-black tracking-wider shadow-2xs">
                                        STEP ${stepNum}
                                    </span>
                                    ${idx < items.length - 1 ? '<span class="hidden lg:inline text-slate-400 font-black text-xs">➔</span>' : ''}
                                </div>
                                <div class="font-bold ${palette.titleText} text-xs leading-snug">
                                    ${mainText}
                                </div>
                                ${subText ? `<div class="${palette.descText} text-[11px] leading-relaxed font-medium">${subText}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    } else if (type === 'matrix') {
        const items = isEn ? (modelData.items_en || modelData.items_th) : (modelData.items_th || modelData.items_en);
        contentHtml = `
            <div class="space-y-3">
                <div class="font-black text-slate-800 text-xs flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#FA541C] animate-pulse"></span>
                    <span>${title}</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    ${items.map((item, idx) => {
                        const palette = CARD_PALETTES[idx % CARD_PALETTES.length];
                        let qTitle = `Quadrant ${idx + 1}`;
                        let qBody = item;
                        if (item.includes('➔')) {
                            const parts = item.split('➔');
                            qTitle = parts[0].trim();
                            qBody = parts.slice(1).join('➔').trim();
                        } else if (item.includes(':')) {
                            const parts = item.split(':');
                            qTitle = parts[0].trim();
                            qBody = parts.slice(1).join(':').trim();
                        }
                        return `
                            <div class="p-3.5 rounded-2xl ${palette.bg} border ${palette.border} shadow-2xs space-y-1.5 transition-all hover:scale-[1.01]">
                                <div class="flex items-center justify-between">
                                    <span class="px-2.5 py-0.5 rounded-lg ${palette.lightBadge} font-black text-[10px] tracking-wide border border-current/20">
                                        ${qTitle}
                                    </span>
                                </div>
                                <div class="${palette.titleText} text-xs font-semibold leading-relaxed">
                                    ${qBody}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    } else if (type === 'grid') {
        const items = isEn ? (modelData.items_en || modelData.items_th) : (modelData.items_th || modelData.items_en);
        const gridCols = items.length <= 4 ? 'sm:grid-cols-2' : (items.length <= 6 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3');
        contentHtml = `
            <div class="space-y-3">
                <div class="font-black text-slate-800 text-xs flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#FA541C] animate-pulse"></span>
                    <span>${title}</span>
                </div>
                <div class="grid grid-cols-1 ${gridCols} gap-2.5">
                    ${items.map((item, idx) => {
                        const palette = CARD_PALETTES[idx % CARD_PALETTES.length];
                        return `
                            <div class="p-3.5 rounded-2xl ${palette.bg} border ${palette.border} shadow-2xs space-y-1.5 transition-all hover:scale-[1.01]">
                                <div class="font-bold ${palette.titleText} text-xs flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full ${palette.badgeBg}"></span>
                                    <span>${item.label}</span>
                                </div>
                                <div class="${palette.descText} text-[11px] leading-relaxed font-medium">
                                    ${item.desc}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    } else if (type === 'formula') {
        const items = isEn ? (modelData.items_en || modelData.items_th) : (modelData.items_th || modelData.items_en);
        const formulaFormula = items[0] || '';
        const formulaDetails = items.slice(1);
        contentHtml = `
            <div class="space-y-3">
                <div class="font-black text-slate-800 text-xs flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#FA541C] animate-pulse"></span>
                    <span>${title}</span>
                </div>
                <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-emerald-500/15 border-2 border-orange-300/80 font-mono font-bold text-xs sm:text-sm text-[#FA541C] text-center shadow-xs">
                    ${formulaFormula}
                </div>
                ${formulaDetails.length > 0 ? `
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        ${formulaDetails.map((d, idx) => {
                            const palette = CARD_PALETTES[idx % CARD_PALETTES.length];
                            return `
                                <div class="p-2.5 rounded-xl ${palette.bg} border ${palette.border} text-xs text-slate-700 leading-snug flex items-start gap-2 font-medium">
                                    <svg class="w-3.5 h-3.5 text-emerald-600 stroke-current shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>${d.replace(/^•\s*/, '')}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    return contentHtml;
}

function openToolDetailModal(toolName) {
    const modal = document.getElementById('tool-detail-modal');
    const titleEl = document.getElementById('tool-modal-title');
    const descEl = document.getElementById('tool-modal-desc');
    const badgeEl = document.getElementById('tool-modal-badge');
    const highlightBox = document.getElementById('tool-modal-highlight-box');
    const highlightText = document.getElementById('tool-modal-highlight-text');
    const modelContainer = document.getElementById('tool-modal-model-container');
    const modelContent = document.getElementById('tool-modal-model-content');
    const modelTitle = document.getElementById('tool-modal-model-title');
    const descTitle = document.getElementById('tool-modal-desc-title');

    if (!modal) return;

    const isEn = currentLang === 'en';
    
    // Normalize matching
    let found = toolsDatabase[toolName];
    if (!found) {
        const normalize = str => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const normTarget = normalize(toolName);
        const cleanKey = Object.keys(toolsDatabase).find(k => {
            const normK = normalize(k);
            return normK === normTarget || (normK.length > 3 && normTarget.includes(normK)) || (normTarget.length > 3 && normK.includes(normTarget)) ||
                   k.toLowerCase().includes(toolName.toLowerCase()) || toolName.toLowerCase().includes(k.toLowerCase());
        });
        if (cleanKey) {
            found = toolsDatabase[cleanKey];
        }
    }

    const title = found ? (isEn ? (found.title_en || toolName) : (found.title_th || toolName)) : toolName;
    const desc = found ? (isEn ? (found.desc_en || found.desc_th) : (found.desc_th || found.desc_en)) : (isEn ? 'Essential operational methodology for professional execution and business impact.' : 'เครื่องมือและโมเดลนี้เป็นส่วนหนึ่งของชุดทักษะสำคัญในการขับเคลื่อนผลลัพธ์การทำงานอย่างมืออาชีพ');

    if (titleEl) titleEl.textContent = title;
    if (badgeEl) badgeEl.textContent = isEn ? 'Tool & Model' : 'เครื่องมือ & โมเดล';
    if (descTitle) descTitle.textContent = isEn ? 'Key Concept & Takeaways' : 'แนวคิดและจุดเด่นการประยุกต์ใช้';
    if (modelTitle) modelTitle.textContent = isEn ? 'Model & Framework Structure' : 'โครงสร้างโมเดล (Model & Structure)';

    // 1. Populate 1-Sentence Punchy Highlight Takeaway Banner
    if (highlightText) {
        // Extract punchy 1-sentence summary
        let summarySentence = desc;
        if (desc.includes('.')) {
            summarySentence = desc.split('.')[0] + '.';
        } else if (desc.includes(' เพื่อ')) {
            summarySentence = desc.split(' เพื่อ')[0] + ' เพื่อให้เกิดประสิทธิภาพสูงสุด';
        }
        highlightText.innerHTML = `<strong>${isEn ? 'Core Takeaway:' : 'สรุปใจความสำคัญ:'}</strong> ${summarySentence}`;
    }

    // 2. Format Key Concept Description into Concise Bullet Points
    if (descEl) {
        // Break into clean points if contains delimiters or render cleanly
        const points = desc.split(/(?=[0-9]\.\s*)|(?<=;)\s*/g).filter(Boolean);
        if (points.length > 1) {
            descEl.innerHTML = `
                <div class="space-y-2">
                    ${points.map(p => `
                        <div class="flex items-start gap-2.5">
                            <svg class="w-4 h-4 text-[#FA541C] stroke-current shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                            <span class="leading-relaxed">${p.trim()}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            descEl.innerHTML = `
                <div class="flex items-start gap-2.5">
                    <svg class="w-4 h-4 text-[#FA541C] stroke-current shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="leading-relaxed">${desc}</span>
                </div>
            `;
        }
    }

    // 3. Handle Model Structure Box
    if (found && found.model) {
        const modelHtml = renderToolModelHTML(found.model, isEn);
        if (modelHtml && modelContent && modelContainer) {
            modelContent.innerHTML = modelHtml;
            modelContainer.classList.remove('hidden');
        } else if (modelContainer) {
            modelContainer.classList.add('hidden');
        }
    } else if (modelContainer) {
        modelContainer.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeToolDetailModal() {
    const modal = document.getElementById('tool-detail-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function handleToolModalBackdropClick(event) {
    if (event.target.id === 'tool-detail-modal') {
        closeToolDetailModal();
    }
}

// ==========================================
// TAB NAVIGATION (LEFT SIDEBAR)
// ==========================================
function switchTab(tabIndex) {
    // Automatically pause podcast and hide sticky player when navigating away from course detail page
    if (tabIndex !== 4) {
        pauseCoursePodcast();
        hideStickyMiniPodcast();
    }

    // Always reset catalog filters to show all courses when navigating to Knowledge Catalog (tabIndex === 1)
    if (tabIndex === 1) {
        resetCatalogFilters();
    }

    const tabs = [
        'view-home',          // 0: หน้าหลัก
        'view-catalog',       // 1: คลังความรู้
        'view-passport',      // 2: สถิติรายบุคคล
        'view-wisdom',        // 3: แลกเปลี่ยนความรู้
        'view-course-detail', // 4: หน้าหลักสูตรเต็ม
        'view-admin'          // 5: ระบบผู้ดูแล
    ];

    tabs.forEach((tabId, idx) => {
        const el = document.getElementById(tabId);
        const sideBtn = document.getElementById(`nav-side-${idx}`);

        if (el) {
            if (idx === tabIndex) {
                el.classList.remove('hidden');
                // Trigger Apple-Style Slide-Up & Fade-In
                el.classList.remove('anim-page-enter', 'anim-page-leave');
                void el.offsetWidth; // Force Reflow
                el.classList.add('anim-page-enter');
            } else {
                el.classList.add('hidden');
                el.classList.remove('anim-page-enter', 'anim-page-leave');
            }
        }

        if (sideBtn) {
            if (idx === tabIndex || (tabIndex === 4 && idx === 1)) {
                sideBtn.className = "nav-side-item active w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold bg-orange-50/80 text-[#FA541C] border-l-2 border-[#FA541C] transition-all text-left cursor-pointer group";
            } else {
                sideBtn.className = "nav-side-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-l-2 border-transparent transition-all text-left cursor-pointer group";
            }
        }
    });

    // Handle Admin Header button active highlight
    const adminHeaderBtn = document.getElementById('nav-header-admin');
    if (adminHeaderBtn) {
        if (tabIndex === 5) {
            adminHeaderBtn.className = "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-[#FA541C] text-xs font-bold transition-all group cursor-pointer";
        } else {
            adminHeaderBtn.className = "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all shadow-xs group cursor-pointer";
        }
    }

    // Toggle Sidebar visibility: Hide sidebar on Course Detail (tabIndex === 4) and Admin view (tabIndex === 5)
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
        if (tabIndex === 4 || tabIndex === 5) {
            sidebar.classList.add('lg:hidden');
            sidebar.classList.remove('lg:flex', 'anim-sidebar-in');
        } else {
            const wasHidden = sidebar.classList.contains('lg:hidden');
            sidebar.classList.remove('lg:hidden');
            sidebar.classList.add('lg:flex');
            if (wasHidden) {
                sidebar.classList.remove('anim-sidebar-in', 'anim-sidebar-out');
                void sidebar.offsetWidth;
                sidebar.classList.add('anim-sidebar-in');
            }
        }
    }

    // Lifecycle notification for 3D Shelf View
    if (tabIndex === 1) {
        if (typeof onEnterCatalogTab === 'function') {
            requestAnimationFrame(() => {
                onEnterCatalogTab();
            });
        }
    } else {
        if (typeof onLeaveCatalogTab === 'function') {
            onLeaveCatalogTab();
        }
    }

    if (tabIndex === 2) {
        setTimeout(initRadarChart, 100);
    } else if (tabIndex === 3) {
        fetchWisdomFromGoogleSheets();
    } else if (tabIndex === 5) {
        renderAdminDashboard();
        startAdminAutoSync();
    }

    // Stop real-time sync when navigating away from Admin Dashboard
    if (tabIndex !== 5) {
        stopAdminAutoSync();
    }

    // Close mobile drawer if open on small screens
    if (sidebar && sidebar.classList.contains('fixed') && window.innerWidth < 1024) {
        toggleMobileSidebar();
    }

    // Scroll to top of content
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('hidden');
        sidebar.classList.toggle('fixed');
        sidebar.classList.toggle('inset-y-0');
        sidebar.classList.toggle('left-0');
        sidebar.classList.toggle('z-50');
    }
}

// ==========================================
// NOTIFICATIONS SYSTEM (หลักสูตรใหม่ถูกอัปโหลด)
// ==========================================
function toggleNotificationsDropdown() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('hidden');
}

function closeNotificationsDropdown() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
}

function handleNotificationClick(type, id) {
    closeNotificationsDropdown();
    if (type === 'course' && id) {
        openCourseModal(id);
    } else if (type === 'wisdom') {
        switchTab(3);
    }
}

function markAllNotificationsAsRead() {
    const ping = document.getElementById('notif-dot-ping');
    const dot = document.getElementById('notif-dot');
    const count = document.getElementById('notif-unread-count');
    if (ping) ping.classList.add('hidden');
    if (dot) dot.classList.add('hidden');
    if (count) {
        count.textContent = currentLang === 'en' ? '0 New' : '0 ใหม่';
        count.className = 'px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold';
    }
    showToastNotification(currentLang === 'en' ? 'All notifications marked as read' : 'ทำเครื่องหมายว่าอ่านแล้วทั้งหมด');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    const bellBtn = document.getElementById('notifications-bell-btn');
    const dropdown = document.getElementById('notifications-dropdown');
    if (dropdown && !dropdown.classList.contains('hidden')) {
        if (bellBtn && !bellBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    }
});

// ==========================================
// BILINGUAL LANGUAGE SYSTEM (TH / EN)
// ==========================================
const i18nDict = {
    th: {
        nav_side_0: 'หน้าหลัก',
        nav_side_1: 'คลังความรู้',
        nav_side_2: 'ข้อมูลสถิติการเรียนรู้',
        nav_side_3: 'พื้นที่แบ่งปัน',
        sidebar_pop_cats: 'หมวดยอดฮิต',
        
        hero_tag: 'BAFS GROUP KNOWLEDGE PORTAL',
        hero_title: 'ศูนย์รวมองค์ความรู้และสมรรถนะแห่งอนาคต',
        hero_desc: 'แพลตฟอร์มการเรียนรู้และพัฒนาศักยภาพด้วยตนเอง ทุกที่ ทุกเวลา เพื่อ Upskill ทักษะการทำงานและเติบโตอย่างต่อเนื่องสำหรับชาว BAFS Group',
        hero_search_btn: 'AI ค้นหา',
        hero_search_input_ph: 'ค้นหาเนื้อหาการเรียน, ทักษะที่อยากพัฒนา, แผนพัฒนาตำแหน่งงาน, แผนพิชิตเป้าหมาย,...',
        
        catalog_tag: 'BAFS KNOWLEDGE CURRICULUM • UL&YT 2025',
        catalog_title: 'คลังหลักสูตรและองค์ความรู้ทั้งหมด',
        cat_select_all: 'ทุกหมวดเนื้อหา (All)',
        cat_select_biz: 'Business & Strategy',
        cat_select_lead: 'Leadership & Management',
        cat_select_inno: 'Innovation & Design',
        cat_select_soft: 'Soft Skills & Communication',
        year_select_all: 'ทุกปี',
        year_select_2025: 'ปี 2025',
        reset_filters: 'ล้างตัวกรอง',
        
        tbc_heading: 'To be continued',
        tbc_phase: 'PHASE 2',
        tbc_step_design: 'ออกแบบ',
        tbc_step_build: 'กำลังพัฒนา',
        tbc_step_launch: 'เปิดใช้งาน',

        passport_title: 'ข้อมูลสถิติการเรียนรู้',
        passport_tbc_desc: 'กำลังเชื่อมต่อชั่วโมงอบรมและผลประเมินรายบุคคลเข้ากับฐานข้อมูล HR & LMS ของ BAFS',
        passport_feat1: 'ชั่วโมงอบรม',
        passport_feat2: 'สมรรถนะ 4 ด้าน',
        passport_feat3: 'ผล Mini Quiz',
        passport_btn_home: 'กลับหน้าหลัก',
        passport_btn_catalog: 'ดูคลังความรู้',

        wisdom_title: 'พื้นที่แบ่งปัน',
        wisdom_tbc_desc: 'ศูนย์แลกเปลี่ยนบทเรียนจากหน้างานและกรณีศึกษาของ BAFS Group กำลังอยู่ระหว่างพัฒนา',
        wisdom_feat1: 'บทเรียนหน้างาน',
        wisdom_feat2: 'กรณีศึกษา',
        wisdom_feat3: 'เครดิตผู้แบ่งปัน',
        wisdom_btn_home: 'กลับหน้าหลัก',
        wisdom_btn_catalog: 'ดูคลังความรู้',

        subtab_intro: 'แนะนำ',
        subtab_infographic: 'Infographic',
        subtab_podcast: 'Podcast',
        subtab_curriculum: 'เนื้อหาหลักสูตร',
        subtab_quiz: 'Mini Quiz',
        back_btn: 'กลับไปคลังความรู้',
        share_btn: 'แชร์หลักสูตร',
        overview_title: 'ภาพรวมหลักสูตร (Course Overview)',
        target_title: 'กลุ่มเป้าหมายผู้เรียน (Target Persona)',
        outcomes_title: 'ผลลัพธ์การเรียนรู้ (Learning Outcomes)',
        tools_title: 'คลังเครื่องมือปฏิบัติการ (Practical Toolbox)',
        bento_hero_badge: 'CORE VALUE PROPOSITION • สาระสำคัญหลักสูตร',
        bento_purpose_title: 'แก่นสำคัญ & ปัญหาที่ตอบโจทย์ (Core Purpose)',
        bento_journey_title: 'เส้นทาง 3 ขั้นตอน (3-Step Action Journey)',
        bento_tools_hint: 'คลิกดูรายละเอียดเครื่องมือ',
        curriculum_header: 'โครงสร้างและเนื้อหาหลักสูตรฉบับสมบูรณ์',
        curriculum_sub: 'สังเคราะห์องค์ความรู้จากเอกสารประกอบการสอนทางการ (Official Slide Deck & Handout จาก UL&YT 2025)',
        btn_pdf_full: 'เปิดดูสไลด์ PDF ฉบับเต็ม',
        btn_pdf_dl: 'ดาวน์โหลด PDF',
        intro_info_btn: 'ดู Infographic สรุปบทเรียน',
        intro_quiz_btn: 'เริ่มทำ Mini Quiz ประเมินความรู้',
        zoom_in_btn: 'ซูมเข้า',
        zoom_out_btn: 'ซูมออก',
        actual_size_btn: 'ขนาดจริง',
        full_view_btn: 'เปิดภาพขนาดใหญ่เต็มจอ',
        download_info_btn: 'ดาวน์โหลด Infographic',

        quiz_header_tag: 'INTERACTIVE KNOWLEDGE CHECK',
        quiz_header_title: 'แบบทดสอบวัดความรู้',
        quiz_header_desc: 'ทดสอบความเข้าใจทีละข้อ พร้อมระบบตรวจคำตอบและคำอธิบายเฉลยทันที',
        btn_prev_q: 'ข้อก่อนหน้า',
        btn_next_q: 'ข้อถัดไป',
        btn_finish_quiz: 'ดูผลคะแนนรวมและการประเมิน',
        select_one_answer: 'กรุณาคลิกเลือกคำตอบ 1 ข้อ เพื่อดูเฉลยอธิบาย',
        passed_title: 'ยินดีด้วย! คุณผ่านการทดสอบวัดความรู้',
        failed_title: 'พยายามได้ดีมาก! มาทบทวนบทเรียนกัน',
        get_cert_btn: 'รับใบประกาศนียบัตรดิจิทัล',
        retake_quiz_btn: 'ทำแบบทดสอบใหม่อีกครั้ง',
        review_infographic_btn: 'ดู Infographic สรุปบทเรียน',
        view_details_btn: 'ดูรายละเอียด'
    },
    en: {
        nav_side_0: 'Home',
        nav_side_1: 'Knowledge Catalog',
        nav_side_2: 'Learning Analytics',
        nav_side_3: 'Sharing Space',
        sidebar_pop_cats: 'POPULAR CATEGORIES',

        hero_tag: 'BAFS GROUP KNOWLEDGE PORTAL',
        hero_title: 'Future Knowledge & Competency Hub',
        hero_desc: 'Self-paced learning and upskilling platform anytime, anywhere to empower sustainable growth for BAFS Group personnel.',
        hero_search_btn: 'AI Search',
        hero_search_input_ph: 'Search learning content, target skills, career pathways, targets...',

        catalog_tag: 'BAFS KNOWLEDGE CURRICULUM • UL&YT 2025',
        catalog_title: 'Masterclasses & Knowledge Catalog',
        cat_select_all: 'All Categories',
        cat_select_biz: 'Business & Strategy',
        cat_select_lead: 'Leadership & Management',
        cat_select_inno: 'Innovation & Design',
        cat_select_soft: 'Soft Skills & Communication',
        year_select_all: 'All Years',
        year_select_2025: 'Training Year 2025',
        reset_filters: 'Reset Filters',

        tbc_heading: 'To be continued',
        tbc_phase: 'PHASE 2',
        tbc_step_design: 'Design',
        tbc_step_build: 'In development',
        tbc_step_launch: 'Launch',

        passport_title: 'Learning Analytics',
        passport_tbc_desc: 'Connecting training hours and assessment scores with BAFS Group HR & LMS records.',
        passport_feat1: 'Study Hours',
        passport_feat2: '4 Competencies',
        passport_feat3: 'Mini Quiz Results',
        passport_btn_home: 'Back to Home',
        passport_btn_catalog: 'Explore Catalog',

        wisdom_title: 'Sharing Space',
        wisdom_tbc_desc: 'A hub for frontline field lessons and cross-team case studies across BAFS Group.',
        wisdom_feat1: 'Field Notes',
        wisdom_feat2: 'Case Studies',
        wisdom_feat3: 'Contributors',
        wisdom_btn_home: 'Back to Home',
        wisdom_btn_catalog: 'Explore Catalog',

        subtab_intro: 'Overview',
        subtab_infographic: 'Infographic',
        subtab_podcast: 'Podcast',
        subtab_curriculum: 'Curriculum',
        subtab_quiz: 'Mini Quiz',
        back_btn: 'Back to Catalog',
        share_btn: 'Share Course',
        overview_title: 'Course Overview',
        target_title: 'Target Persona',
        outcomes_title: 'Learning Outcomes',
        tools_title: 'Practical Toolbox',
        bento_hero_badge: 'CORE VALUE PROPOSITION',
        bento_purpose_title: 'Core Purpose & Value',
        bento_journey_title: '3-Step Action Journey',
        bento_tools_hint: 'Click to view tool details',
        curriculum_header: 'Complete Course Curriculum & Modules',
        curriculum_sub: 'Synthesized learning modules from official training decks (UL&YT 2025 Official Slides & Handouts)',
        btn_pdf_full: 'View Full PDF Deck',
        btn_pdf_dl: 'Download PDF',
        intro_info_btn: 'View Infographic Summary',
        intro_quiz_btn: 'Take Knowledge Quiz',
        zoom_in_btn: 'Zoom In',
        zoom_out_btn: 'Zoom Out',
        actual_size_btn: 'Reset Zoom',
        full_view_btn: 'Fullscreen View',
        download_info_btn: 'Download Infographic',

        quiz_header_tag: 'INTERACTIVE KNOWLEDGE CHECK',
        quiz_header_title: 'Interactive Knowledge Quiz',
        quiz_header_desc: 'Step-by-step interactive questions with instant feedback and in-depth explanations.',
        btn_prev_q: 'Previous Question',
        btn_next_q: 'Next Question',
        btn_finish_quiz: 'View Final Score & Assessment',
        select_one_answer: 'Please select an option to view detailed explanation.',
        passed_title: 'Congratulations! You passed the assessment',
        failed_title: 'Great effort! Review the lesson and try again',
        get_cert_btn: 'Get Digital Certificate',
        retake_quiz_btn: 'Retake Quiz',
        review_infographic_btn: 'Review Infographic',
        view_details_btn: 'View Details'
    }
};

function setLanguage(lang) {
    currentLang = lang;
    const btnTh = document.getElementById('lang-btn-th');
    const btnEn = document.getElementById('lang-btn-en');
    const activeClass = "px-3 py-1 rounded-lg text-xs font-extrabold bg-white text-slate-900 shadow-2xs border border-slate-200/80 transition-all cursor-pointer";
    const inactiveClass = "px-3 py-1 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer";

    if (btnTh && btnEn) {
        if (lang === 'th') {
            btnTh.className = activeClass;
            btnEn.className = inactiveClass;
        } else {
            btnEn.className = activeClass;
            btnTh.className = inactiveClass;
        }
    }

    updateLanguageUI();
}

function updateLanguageUI() {
    const dict = i18nDict[currentLang] || i18nDict['th'];

    // 1. Sidebar Links - Safely update the text span inside the button, preserving the SVG icon
    const side0Span = document.querySelector('#nav-side-0 span:last-child');
    if (side0Span) side0Span.textContent = dict.nav_side_0;

    const side1Span = document.querySelector('#nav-side-1 span:last-child');
    if (side1Span) side1Span.textContent = dict.nav_side_1;

    const side2Span = document.querySelector('#nav-side-2 span:last-child');
    if (side2Span) side2Span.textContent = dict.nav_side_2;

    const side3Span = document.querySelector('#nav-side-3 span:last-child');
    if (side3Span) side3Span.textContent = dict.nav_side_3;

    const navHeaderAdmin = document.getElementById('label-nav-header-admin');
    if (navHeaderAdmin) navHeaderAdmin.textContent = currentLang === 'en' ? 'Admin Portal' : 'ผู้ดูแลระบบ';

    const adminModalTitle = document.getElementById('admin-modal-title');
    if (adminModalTitle) adminModalTitle.textContent = currentLang === 'en' ? 'Admin Portal Login' : 'เข้าสู่ระบบผู้ดูแล';

    const adminModalDesc = document.getElementById('admin-modal-desc');
    if (adminModalDesc) adminModalDesc.textContent = currentLang === 'en' ? 'Please enter Admin password' : 'กรุณากรอกรหัสผ่านผู้ดูแลระบบ';

    const adminPinInput = document.getElementById('admin-pin-input');
    if (adminPinInput) adminPinInput.placeholder = currentLang === 'en' ? 'Enter admin password' : 'กรอกรหัสผ่านผู้ดูแลระบบ';

    const adminEyeBtn = document.getElementById('toggle-admin-password-btn');
    if (adminEyeBtn) adminEyeBtn.setAttribute('aria-label', currentLang === 'en' ? 'Show or hide password' : 'แสดงหรือซ่อนรหัสผ่าน');

    // Sidebar popular category header
    const popHeader = document.querySelector('#main-sidebar h4');
    if (popHeader) popHeader.textContent = dict.sidebar_pop_cats;

    // 2. Hero Section
    const heroTag = document.getElementById('hero-eyebrow-tag');
    if (heroTag) heroTag.textContent = dict.hero_tag;

    const heroSearchBtn = document.querySelector('#hero-search-wrapper button');
    if (heroSearchBtn) heroSearchBtn.title = currentLang === 'en' ? 'Search' : 'ค้นหา';

    const heroDesc = document.querySelector('#view-home p');
    if (heroDesc) heroDesc.textContent = dict.hero_desc;

    const heroInput = document.getElementById('hero-search-input');
    if (heroInput) heroInput.placeholder = dict.hero_search_input_ph;

    const catalogInput = document.getElementById('catalog-search-input');
    if (catalogInput) catalogInput.placeholder = dict.hero_search_input_ph;

    // 3. Catalog Section
    const catTag = document.querySelector('#view-catalog span');
    if (catTag) catTag.textContent = dict.catalog_tag;

    const catTitle = document.querySelector('#view-catalog h2');
    if (catTitle) catTitle.textContent = dict.catalog_title;

    // Category & Year Select Options
    const catSelect = document.getElementById('catalog-category-select');
    if (catSelect && catSelect.options.length >= 5) {
        catSelect.options[0].text = dict.cat_select_all;
        catSelect.options[1].text = dict.cat_select_biz;
        catSelect.options[2].text = dict.cat_select_lead;
        catSelect.options[3].text = dict.cat_select_inno;
        catSelect.options[4].text = dict.cat_select_soft;
    }

    const yearSelect = document.getElementById('catalog-year-select');
    if (yearSelect && yearSelect.options.length >= 2) {
        yearSelect.options[0].text = dict.year_select_all;
        yearSelect.options[1].text = dict.year_select_2025;
    }

    const resetFiltersBtn = document.getElementById('catalog-reset-filters-btn');
    if (resetFiltersBtn) resetFiltersBtn.textContent = dict.reset_filters;

    // 4. Passport / Statistics & 5. Sharing Space Sections
    const statusViewBindings = [
        ['tag-passport-status', 'tbc_heading'],
        ['label-passport-phase', 'tbc_phase'],
        ['label-passport-title', 'passport_title'],
        ['label-passport-tbc-desc', 'passport_tbc_desc'],
        ['passport-step-design', 'tbc_step_design'],
        ['passport-step-build', 'tbc_step_build'],
        ['passport-step-launch', 'tbc_step_launch'],
        ['label-passport-feat1', 'passport_feat1'],
        ['label-passport-feat2', 'passport_feat2'],
        ['label-passport-feat3', 'passport_feat3'],
        ['label-btn-passport-home', 'passport_btn_home'],
        ['label-btn-passport-catalog', 'passport_btn_catalog'],
        ['tag-wisdom-status', 'tbc_heading'],
        ['label-wisdom-phase', 'tbc_phase'],
        ['label-wisdom-hub-title', 'wisdom_title'],
        ['label-wisdom-tbc-desc', 'wisdom_tbc_desc'],
        ['wisdom-step-design', 'tbc_step_design'],
        ['wisdom-step-build', 'tbc_step_build'],
        ['wisdom-step-launch', 'tbc_step_launch'],
        ['label-wisdom-feat1', 'wisdom_feat1'],
        ['label-wisdom-feat2', 'wisdom_feat2'],
        ['label-wisdom-feat3', 'wisdom_feat3'],
        ['label-btn-wisdom-home', 'wisdom_btn_home'],
        ['label-btn-wisdom-catalog', 'wisdom_btn_catalog']
    ];
    statusViewBindings.forEach(([elementId, dictKey]) => {
        const el = document.getElementById(elementId);
        if (el && dict[dictKey]) el.textContent = dict[dictKey];
    });

    // 6. Course Detail Subtab Buttons (5 Subtabs - preserve SVG icons & step pills)
    const subIntro = document.getElementById('label-subtab-intro');
    if (subIntro) subIntro.textContent = dict.subtab_intro;

    const subInfo = document.getElementById('label-subtab-infographic');
    if (subInfo) subInfo.textContent = dict.subtab_infographic;

    const subPodcast = document.getElementById('label-subtab-podcast');
    if (subPodcast) subPodcast.textContent = dict.subtab_podcast;

    const subCurr = document.getElementById('label-subtab-curriculum');
    if (subCurr) subCurr.textContent = dict.subtab_curriculum;

    const subQuiz = document.getElementById('label-subtab-quiz');
    if (subQuiz) subQuiz.textContent = dict.subtab_quiz;

    // Detail Action Buttons (preserve SVG icons)
    const backBtnSpan = document.getElementById('detail-btn-back-text');
    if (backBtnSpan) backBtnSpan.textContent = dict.back_btn;

    const shareBtnSpan = document.querySelector('#view-course-detail button[onclick="shareCurrentCourse()"] span');
    if (shareBtnSpan) shareBtnSpan.textContent = dict.share_btn;

    // Headings inside Intro Subtab
    const heroPropBadge = document.getElementById('label-hero-proposition-badge');
    if (heroPropBadge) heroPropBadge.textContent = dict.bento_hero_badge;

    const bentoPurposeHeading = document.getElementById('label-intro-purpose-heading') || document.getElementById('label-bento-purpose-heading');
    if (bentoPurposeHeading) bentoPurposeHeading.textContent = currentLang === 'en' ? 'Core Highlights & Value' : 'แก่นสำคัญ & ประโยชน์ที่ได้รับ';

    const toolsHeading = document.getElementById('label-intro-tools-heading');
    if (toolsHeading) toolsHeading.textContent = currentLang === 'en' ? 'Interactive Toolbox & Frameworks' : 'คลังเครื่องมือและโมเดลปฏิบัติการ';

    const toolsHint = document.getElementById('label-bento-tools-hint');
    if (toolsHint) toolsHint.textContent = dict.bento_tools_hint;

    // Curriculum Section (preserve SVG icon)
    const currHeaderSpan = document.querySelector('#label-curriculum-header span:last-child');
    if (currHeaderSpan) currHeaderSpan.textContent = dict.curriculum_header;

    const currSub = document.getElementById('label-curriculum-sub');
    if (currSub) currSub.textContent = dict.curriculum_sub;

    const pdfFullBtn = document.getElementById('label-btn-pdf-full');
    if (pdfFullBtn) pdfFullBtn.textContent = dict.btn_pdf_full;

    const pdfReadonlyLabel = document.getElementById('label-pdf-readonly-badge');
    if (pdfReadonlyLabel) {
        pdfReadonlyLabel.textContent = currentLang === 'en'
            ? 'Read-Only on Platform (PDF Download Disabled)'
            : 'อ่านบนแพลตฟอร์มเท่านั้น (งดดาวน์โหลด PDF)';
    }

    const pdfPreviewReadonlyTag = document.getElementById('pdf-preview-readonly-tag');
    if (pdfPreviewReadonlyTag) {
        pdfPreviewReadonlyTag.textContent = currentLang === 'en'
            ? 'Read-Only • No Download'
            : 'อ่านออนไลน์ • งดดาวน์โหลด';
    }

    const pdfDlBtn = document.getElementById('label-btn-pdf-dl');
    if (pdfDlBtn) pdfDlBtn.textContent = dict.btn_pdf_dl;

    const infoFullBtn = document.getElementById('label-btn-infographic-fullscreen');
    if (infoFullBtn) infoFullBtn.textContent = currentLang === 'en' ? 'Fullscreen View' : 'เปิดภาพเต็มจอ';

    // Quiz Header
    const quizTag = document.querySelector('#course-subtab-quiz span');
    if (quizTag) quizTag.textContent = dict.quiz_header_tag;

    const quizTitle = document.getElementById('quiz-page-title');
    if (quizTitle) quizTitle.textContent = dict.quiz_header_title;

    const quizDesc = document.querySelector('#course-subtab-quiz p');
    if (quizDesc) quizDesc.textContent = dict.quiz_header_desc;

    // Re-render Wisdom Cards & Catalog Cards
    renderWisdomCards();

    if (typeof allCourses !== 'undefined') {
        applyCatalogFilters();
        const courseDetailView = document.getElementById('view-course-detail');
        if (courseDetailView && !courseDetailView.classList.contains('hidden') && typeof currentActiveCourseId !== 'undefined') {
            const currentSubTabActive = document.querySelector('.course-subtab-btn.active')?.id?.replace('subtab-btn-', '') || 'intro';
            const summaryEl = document.getElementById('detail-quiz-results-summary');
            const wasSummaryOpen = summaryEl && !summaryEl.classList.contains('hidden');
            const savedQuizAnswers = wasSummaryOpen ? { ...currentQuizUserAnswers } : null;
            openCoursePage(currentActiveCourseId, currentSubTabActive);
            if (wasSummaryOpen && savedQuizAnswers) {
                currentQuizUserAnswers = savedQuizAnswers;
                finishQuizSummary({ skipScroll: true, skipConfetti: true });
            }
        }
    }

    if (typeof updateShelfLanguage === 'function') {
        updateShelfLanguage(currentLang);
    }

    // 7. Update Admin Dashboard Language & Re-render Dashboard
    if (typeof updateAdminDashboardLanguage === 'function') {
        updateAdminDashboardLanguage();
    }
    if (typeof renderAdminDashboard === 'function') {
        renderAdminDashboard();
    }

    // 8. Update Footer Language
    if (typeof updateFooterLanguage === 'function') {
        updateFooterLanguage();
    }
}

function updateAdminDashboardLanguage() {
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    
    // Header & Action Bar
    const adminHeaderTitle = document.getElementById('admin-header-title');
    if (adminHeaderTitle) {
        adminHeaderTitle.textContent = isEn 
            ? 'Executive 3-Tier View Analytics & Dashboard'
            : 'ระบบรายงานและวิเคราะห์ผลยอด View 3 มิติ';
    }

    const adminHeaderDesc = document.getElementById('admin-header-desc');
    if (adminHeaderDesc) {
        adminHeaderDesc.textContent = isEn
            ? 'Executive Overview: Website Traffic • 9-Course Performance Ranking • Current Year 2026 MoM Growth Matrix for BAFS GROUP Smart Learning Platform'
            : 'ศูนย์ข้อมูลสถิติภาพรวม: ยอดเข้าชม Website • สถิติรายหลักสูตร 9 วิชา • สถิติแนวโน้มการเติบโตรายเดือนเฉพาะปีปัจจุบัน 2026 (Month-over-Month MoM Trend) สำหรับผู้บริหารและผู้ดูแลระบบ BAFS GROUP Smart Learning Platform';
    }

    const btnBackHome = document.getElementById('admin-btn-back-home');
    if (btnBackHome) btnBackHome.textContent = isEn ? 'Home Hub' : 'กลับหน้าหลัก';

    const btnOpenGSheet = document.getElementById('admin-btn-open-gsheet');
    if (btnOpenGSheet) btnOpenGSheet.textContent = isEn ? 'Google Sheets ↗' : 'Google Sheets ↗';

    const btnSyncGSheet = document.getElementById('admin-btn-sync-gsheet');
    if (btnSyncGSheet) btnSyncGSheet.textContent = isEn ? 'Live Sync' : 'ซิงก์ข้อมูลสด';

    const btnResetTop = document.getElementById('admin-btn-reset-views-top');
    if (btnResetTop) btnResetTop.textContent = isEn ? 'Reset Views' : 'รีเซ็ตยอดวิว';

    const btnGuide = document.getElementById('admin-btn-guide');
    if (btnGuide) btnGuide.textContent = isEn ? 'System Guide' : 'คู่มือระบบ';

    const btnLogout = document.getElementById('admin-btn-logout');
    if (btnLogout) btnLogout.textContent = isEn ? 'Logout' : 'ออกจากระบบ';

    // Time Filter
    const filterTitle = document.getElementById('admin-filter-title');
    if (filterTitle) filterTitle.textContent = isEn ? 'Time Range Analytics' : 'ตัวกรองสถิติตามช่วงเวลา (Time Range Analytics)';

    const timeBtnAll = document.getElementById('admin-time-btn-all');
    if (timeBtnAll) timeBtnAll.textContent = isEn ? 'All-Time' : 'ทั้งหมด (All-Time)';

    const timeBtnWeek = document.getElementById('admin-time-btn-week');
    if (timeBtnWeek) timeBtnWeek.textContent = isEn ? 'This Week' : 'สัปดาห์นี้ (This Week)';

    const timeBtnMonth = document.getElementById('admin-time-btn-month');
    if (timeBtnMonth) timeBtnMonth.textContent = isEn ? 'This Month' : 'เดือนนี้ (This Month)';

    const timeBtnYear = document.getElementById('admin-time-btn-year2026');
    if (timeBtnYear) timeBtnYear.textContent = isEn ? 'Year 2026' : 'ปี 2026 (ปีปัจจุบัน)';

    // KPI Labels
    const kpiVisitsLabel = document.getElementById('admin-kpi-portal-visits-label');
    if (kpiVisitsLabel) kpiVisitsLabel.textContent = isEn ? 'Website Visits' : 'ยอดเข้าชม Website';

    const kpiVisitsSub = document.getElementById('admin-kpi-portal-visits-sub');
    if (kpiVisitsSub) kpiVisitsSub.textContent = isEn ? 'Cumulative KM Portal visitors' : 'ผู้เข้าชมหน้าหลัก KM Portal สะสม';

    const kpiViewsLabel = document.getElementById('admin-kpi-total-views-label');
    if (kpiViewsLabel) kpiViewsLabel.textContent = isEn ? 'Course Views' : 'ยอดเปิดดูหลักสูตร';

    const kpiViewsSub = document.getElementById('admin-kpi-total-views-sub');
    if (kpiViewsSub) kpiViewsSub.textContent = isEn ? 'Recorded views across 9 core courses' : 'บันทึกสะสม 9 หลักสูตรหลัก';

    const kpiSyncLabel = document.getElementById('admin-kpi-sync-status-label');
    if (kpiSyncLabel) kpiSyncLabel.textContent = isEn ? 'Sync Status' : 'สถานะระบบจัดเก็บ';

    const kpiSyncTitle = document.getElementById('admin-kpi-sync-title');
    if (kpiSyncTitle) kpiSyncTitle.textContent = isEn ? 'Google Sheets Live Sync' : 'Google Sheets Live Sync';

    const kpiSyncBadge = document.getElementById('admin-kpi-sync-badge');
    if (kpiSyncBadge) kpiSyncBadge.textContent = isEn ? 'Live Two-Way Cloud Sync' : 'Live Two-Way Cloud Sync';

    // Tier 2.1 Category Share
    const headingCatShare = document.getElementById('admin-heading-category-share');
    if (headingCatShare) headingCatShare.textContent = isEn ? 'Category Share Breakdown' : 'สัดส่วนยอดการเข้าชมตามหมวดหมู่วิชา (Category Share Breakdown)';

    const subCatShare = document.getElementById('admin-sub-category-share');
    if (subCatShare) subCatShare.textContent = isEn ? 'Learner interest distribution across 4 core curriculum categories' : 'วิเคราะห์สัดส่วนความสนใจของผู้เรียนแยกตาม 4 หมวดหมู่วิชาหลัก';

    const badgeCatShare = document.getElementById('admin-badge-category-share');
    if (badgeCatShare) badgeCatShare.textContent = isEn ? '4 Core Categories' : '4 หมวดหมู่วิชาหลัก';

    // Tier 2.2 Course Views Ranked Chart
    const headingRanked = document.getElementById('admin-heading-courses-ranked');
    if (headingRanked) headingRanked.textContent = isEn ? '9 Masterclasses Views Ranking (Course Views Ranked Chart)' : 'แผนภูมิสถิติยอดการเข้าชม 9 หลักสูตร (Course Views Ranked Chart)';

    const subRanked = document.getElementById('admin-sub-courses-ranked');
    if (subRanked) subRanked.textContent = isEn ? 'Compare real-time view statistics across all courses, ranked from high to low' : 'เปรียบเทียบสถิติการเปิดดูของแต่ละหลักสูตร เรียงลำดับจากมากไปน้อยแบบ Real-time';

    const btnSeedViews = document.getElementById('admin-btn-seed-views');
    if (btnSeedViews) btnSeedViews.textContent = isEn ? 'Simulate Views (+10 Views)' : 'จำลองยอดวิว (+10 Views)';

    const btnResetViews = document.getElementById('admin-btn-reset-views');
    if (btnResetViews) btnResetViews.textContent = isEn ? 'Reset to Defaults' : 'รีเซ็ตค่าเริ่มต้น';

    // Tier 3.1 12-Month Trend Graph
    const headingTrend = document.getElementById('admin-heading-monthly-trend');
    if (headingTrend) headingTrend.textContent = isEn ? 'Monthly Views Trend 2026 (12-Month Trend Graph - Current Year)' : 'แนวโน้มยอดการเข้าชมรายเดือนปี 2026 (12-Month Trend Graph - Current Year)';

    const subTrend = document.getElementById('admin-sub-monthly-trend');
    if (subTrend) subTrend.textContent = isEn ? 'Cumulative monthly view counts (January - December 2026), highlighting current month MTD' : 'สถิติจำนวนครั้งการเข้าชมหลักสูตรสะสมแยกตามรายเดือน (มกราคม - ธันวาคม 2026) ไฮไลต์เดือนปัจจุบัน (ตุลาคม MTD)';

    const badgeYear = document.getElementById('admin-badge-current-year');
    if (badgeYear) badgeYear.textContent = isEn ? 'Year 2026 (Current Year)' : 'ปี 2026 (ปีปัจจุบัน)';

    // Tier 3.2 MoM Matrix Table
    const headingMom = document.getElementById('admin-heading-mom-matrix');
    if (headingMom) headingMom.textContent = isEn ? `Month-over-Month Growth Matrix (${currentMoMYear} MoM Matrix)` : `ตารางวิเคราะห์แนวโน้มการเติบโตรายเดือน (${currentMoMYear} Month-over-Month MoM Growth Matrix)`;

    const subMom = document.getElementById('admin-sub-mom-matrix');
    if (subMom) subMom.textContent = isEn ? 'Month-over-month comparison with Delta variance, % MoM Growth rate, Cumulative YTD, and trend status' : 'เปรียบเทียบยอดการเข้าชมของแต่ละเดือนเทียบกับเดือนก่อนหน้า (MoM) พร้อมผลต่าง (Delta), อัตราการเติบโต (% MoM Growth), ยอดสะสม (Cumulative YTD) และสถานะแนวโน้ม';

    const badgeMom = document.getElementById('admin-badge-mom-active');
    if (badgeMom) badgeMom.textContent = `${currentMoMYear} MoM Matrix Active`;
}

function updateFooterLanguage() {
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

    const col1Desc = document.getElementById('footer-col1-desc');
    if (col1Desc) {
        col1Desc.textContent = isEn
            ? "BAFS Group's integrated knowledge hub and future-skills learning platform for all employees and executives (Create Future Learning | Grow Up Better Skills)"
            : "ระบบจัดการความรู้และยกระดับสมรรถนะบุคลากรกลุ่มบริษัท BAFS รวบรวมหลักสูตรพัฒนาศักยภาพและพื้นที่แลกเปลี่ยนองค์ความรู้หน้างาน (Create Future Learning | Grow Up Better Skills)";
    }

    const col2Heading = document.getElementById('footer-col2-heading');
    if (col2Heading) col2Heading.textContent = isEn ? 'Navigation' : 'เมนูหลัก';

    const linkHome = document.getElementById('footer-link-home');
    if (linkHome) linkHome.textContent = isEn ? 'Home Hub' : 'หน้าหลัก';

    const linkCat = document.getElementById('footer-link-catalog');
    if (linkCat) linkCat.textContent = isEn ? 'Course Catalog (9 Courses)' : 'คลังความรู้';

    const linkAnalytics = document.getElementById('footer-link-analytics');
    if (linkAnalytics) linkAnalytics.textContent = isEn ? 'Learning Analytics' : 'ข้อมูลสถิติการเรียนรู้';

    const linkSharing = document.getElementById('footer-link-sharing');
    if (linkSharing) linkSharing.textContent = isEn ? 'Sharing Space' : 'พื้นที่แบ่งปัน';

    const col3Heading = document.getElementById('footer-col3-heading');
    if (col3Heading) col3Heading.textContent = isEn ? 'Course Categories' : 'หมวดหมู่หลักสูตร';

    const catBiz = document.getElementById('footer-cat-biz');
    if (catBiz) catBiz.textContent = isEn ? 'Business & Strategy' : 'ธุรกิจและกลยุทธ์';

    const catLead = document.getElementById('footer-cat-lead');
    if (catLead) catLead.textContent = isEn ? 'Leadership & Management' : 'ภาวะผู้นำและการจัดการ';

    const catInno = document.getElementById('footer-cat-inno');
    if (catInno) catInno.textContent = isEn ? 'Innovation & Design' : 'นวัตกรรมและการออกแบบ';

    const catSoft = document.getElementById('footer-cat-soft');
    if (catSoft) catSoft.textContent = isEn ? 'Soft Skills & Communication' : 'ทักษะปฏิสัมพันธ์';

    const col4Heading = document.getElementById('footer-col4-heading');
    if (col4Heading) col4Heading.textContent = isEn ? 'Contact & Support' : 'ติดต่อและสนับสนุน';

    const contactDept = document.getElementById('footer-contact-dept');
    if (contactDept) contactDept.textContent = isEn ? 'Organization Development Department (HOD)' : 'แผนกพัฒนาองค์กร (HOD)';

    const contactDiv = document.getElementById('footer-contact-div');
    if (contactDiv) contactDiv.textContent = isEn ? 'Human Resources Division (HZ - BAFS)' : 'ฝ่ายกิจการบุคคล (HZ - BAFS)';

    const copyright = document.getElementById('footer-copyright');
    if (copyright) {
        copyright.textContent = "© 2026 BAFS GROUP Smart Learning Platform. All rights reserved.";
    }

    const orgSub = document.getElementById('footer-org-subtitle');
    if (orgSub) {
        orgSub.remove();
    }
}

// ==========================================
// EXPLICIT GLOBAL WINDOW SCOPE EXPORTS
// (Guarantees inline HTML onclick/onchange handlers always resolve)
// ==========================================
if (typeof window !== 'undefined') {
    window.openCourseModal = openCourseModal;
    window.openCoursePage = openCoursePage;
    window.switchTab = switchTab;
    window.switchCourseSubTab = switchCourseSubTab;
    window.pauseCoursePodcast = pauseCoursePodcast;
    window.toggleMiniPodcastPlay = toggleMiniPodcastPlay;
    window.seekMiniPodcast = seekMiniPodcast;
    window.seekMiniProgressBar = seekMiniProgressBar;
    window.expandToFullPodcast = expandToFullPodcast;
    window.closeMiniPodcast = closeMiniPodcast;
    window.showStickyMiniPodcast = showStickyMiniPodcast;
    window.hideStickyMiniPodcast = hideStickyMiniPodcast;
    window.filterCategory = filterCategory;
    window.applyCatalogFilters = applyCatalogFilters;
    window.resetCatalogFilters = resetCatalogFilters;
    window.setQuickCategory = setQuickCategory;
    window.quickTagSearch = quickTagSearch;
    window.clearCatalogSearch = clearCatalogSearch;
    window.handleHeroSearchSubmit = handleHeroSearchSubmit;
    window.setLanguage = setLanguage;
    window.openInfographicLightbox = openInfographicLightbox;
    window.closeInfographicLightbox = closeInfographicLightbox;
    window.zoomLightbox = zoomLightbox;
    window.resetLightboxZoom = resetLightboxZoom;
    window.zoomInfographic = zoomInfographic;
    window.resetInfographicZoom = resetInfographicZoom;
    window.handleLightboxBackdropClick = handleLightboxBackdropClick;
    window.togglePdfEmbedViewer = togglePdfEmbedViewer;
    window.handleNotificationClick = handleNotificationClick;
    window.toggleNotificationsDropdown = toggleNotificationsDropdown;
    window.closeNotificationsDropdown = closeNotificationsDropdown;
    window.markAllNotificationsAsRead = markAllNotificationsAsRead;
    window.filterWisdomByCategory = filterWisdomByCategory;
    window.filterWisdomByTag = filterWisdomByTag;
    window.handleWisdomSearch = handleWisdomSearch;
    window.clearWisdomSearch = clearWisdomSearch;
    window.sortWisdomPosts = sortWisdomPosts;
    window.likeWisdomPost = likeWisdomPost;
    window.toggleLikeWisdomPost = likeWisdomPost;
    window.toggleBookmarkWisdom = toggleBookmarkWisdom;
    window.toggleBookmarkWisdomPost = toggleBookmarkWisdom;
    window.shareWisdomPost = shareWisdomPost;
    window.openWisdomDetailModal = openWisdomDetailModal;
    window.closeWisdomDetailModal = closeWisdomDetailModal;
    window.openWisdomShareModal = openWisdomShareModal;
    window.closeWisdomShareModal = closeWisdomShareModal;
    window.applyWisdomTemplate = applyWisdomTemplate;
    window.handleAddWisdomSubmit = handleAddWisdomSubmit;
    window.selectQuizAnswer = selectQuizAnswer;
    window.jumpToQuizQuestion = jumpToQuizQuestion;
    window.prevQuizQuestion = prevQuizQuestion;
    window.nextQuizQuestion = nextQuizQuestion;
    window.finishQuizSummary = finishQuizSummary;
    window.showCertificateModal = showCertificateModal;
    window.closeCertificateModal = closeCertificateModal;
    window.printCertificate = printCertificate;
    window.shareCurrentCourse = shareCurrentCourse;
    window.seekPodcast = seekPodcast;
    window.jumpPodcastToTime = jumpPodcastToTime;
    window.setPodcastSpeed = setPodcastSpeed;
    window.openToolDetailModal = openToolDetailModal;
    window.closeToolDetailModal = closeToolDetailModal;
    window.handleToolModalBackdropClick = handleToolModalBackdropClick;
    window.toggleMobileSidebar = toggleMobileSidebar;
    window.fetchWisdomFromGoogleSheets = fetchWisdomFromGoogleSheets;
    window.openAdminAuthModal = openAdminAuthModal;
    window.closeAdminAuthModal = closeAdminAuthModal;
    window.toggleAdminPasswordVisibility = toggleAdminPasswordVisibility;
    window.handleAdminModalBackdropClick = handleAdminModalBackdropClick;
    window.handleAdminPinSubmit = handleAdminPinSubmit;
    window.logoutAdmin = logoutAdmin;
    window.startAdminAutoSync = startAdminAutoSync;
    window.stopAdminAutoSync = stopAdminAutoSync;
    window.toggleAdminAutoSync = toggleAdminAutoSync;
    window.openAdminGuideModal = openAdminGuideModal;
    window.closeAdminGuideModal = closeAdminGuideModal;
    window.handleAdminGuideModalBackdropClick = handleAdminGuideModalBackdropClick;
    window.openSmartLearningInfoModal = openSmartLearningInfoModal;
    window.closeSmartLearningInfoModal = closeSmartLearningInfoModal;
    window.handleSmartLearningInfoBackdropClick = handleSmartLearningInfoBackdropClick;
    window.toggleKmCaseStudies = toggleKmCaseStudies;
    window.renderAdminDashboard = renderAdminDashboard;
    window.updateAdminDashboardLanguage = updateAdminDashboardLanguage;
    window.updateFooterLanguage = updateFooterLanguage;
    window.setAdminTimeFilter = setAdminTimeFilter;
    window.setTrendGraphYear = setTrendGraphYear;
    window.renderMonthlyTrendChart = renderMonthlyTrendChart;
    window.render2YearMonthlyMatrixTable = render2YearMonthlyMatrixTable;
    window.exportCourseViewsCSV = exportCourseViewsCSV;
    window.seedDemoViews = seedDemoViews;
    window.resetCourseViews = resetCourseViews;
    window.getCourseViews = getCourseViews;
    window.incrementCourseView = incrementCourseView;
    window.syncDashboardFromGoogleSheets = syncDashboardFromGoogleSheets;
    window.initApp = initApp;
    window.setCatalogViewMode = setCatalogViewMode;
    window.shelfPrev = shelfPrev;
    window.shelfNext = shelfNext;
    window.shelfJumpToCategory = shelfJumpToCategory;
    window.openActiveShelfCourse = openActiveShelfCourse;
    window.openShelfCourseShowcase = openShelfCourseShowcase;
    window.closeShelfCourseShowcase = closeShelfCourseShowcase;
    window.startLearningFromShowcase = startLearningFromShowcase;
    window.openShowcaseInfographic = openShowcaseInfographic;
    window.handleBookShelfClick = handleBookShelfClick;
    window.initBafsShelf = initBafsShelf;
    window.onEnterCatalogTab = onEnterCatalogTab;
    window.onLeaveCatalogTab = onLeaveCatalogTab;
    window.updateShelfLanguage = updateShelfLanguage;
}

// ==========================================================================
// 15. BAFS 3D VIRTUAL BOOKSHELF MODULE (Option 1: Hybrid Mode)
// Pure CSS 3D Transforms + rAF Smooth Physics Engine + Mouse Tilt
// ==========================================================================

const BAFS_SHELF_COURSES = [
    {
        id: 3,
        code: "BAFS-KM-01",
        category: "leadership",
        categoryName_th: "ภาวะผู้นำและการจัดการ",
        categoryName_en: "Leadership & Management",
        title_th: "ภาวะผู้นำแบบผู้สนับสนุน",
        title_en: "Servant Leadership: Empowering Teams",
        subtitle_th: "ผู้นำผู้สร้างความปลอดภัยทางใจและส่งเสริมศักยภาพทีมงาน",
        subtitle_en: "Unlocking Supportive Leadership & Psychological Safety",
        desc_th: "เจาะลึก 10 คุณลักษณะของผู้นำแบบผู้สนับสนุน การสร้าง Psychological Safety และการโค้ชทีมงาน BAFS สู่ความเป็นเลิศ",
        desc_en: "10 core traits of supportive leaders, psychological safety stages, and people empowerment.",
        cover: "Cover/06_Servant_Leadership.png",
        duration_th: "21:14 นาที",
        duration_en: "21:14 mins"
    },
    {
        id: 4,
        code: "BAFS-KM-02",
        category: "leadership",
        categoryName_th: "ภาวะผู้นำและการจัดการ",
        categoryName_en: "Leadership & Management",
        title_th: "การบริหารผู้มีส่วนได้ส่วนเสียและการเจรจาต่อรอง",
        title_en: "Stakeholder Management & Negotiation",
        subtitle_th: "การบริหารผู้มีส่วนได้ส่วนเสียและการเจรจาต่อรองเชิงกลยุทธ์",
        subtitle_en: "Strategic Stakeholder Alignment & Win-Win Negotiation",
        desc_th: "เทคนิคการจัดลำดับ Stakeholder ด้วย Power-Interest Grid และกลยุทธ์เจรจาต่อรองแบบ Win-Win ในองค์กร",
        desc_en: "Power-Interest Matrix mapping, empathy mapping, and principle-based negotiation mastery.",
        cover: "Cover/07_Stakeholder Management & Negotiation.png",
        duration_th: "24:35 นาที",
        duration_en: "24:35 mins"
    },
    {
        id: 1,
        code: "BAFS-KM-03",
        category: "business",
        categoryName_th: "ธุรกิจและกลยุทธ์",
        categoryName_en: "Business & Strategy",
        title_th: "การเป็นผู้ประกอบการในองค์กรและการมองอนาคต",
        title_en: "Intrapreneurship & Strategic Foresight",
        subtitle_th: "จิตวิญญาณผู้ประกอบการและการมองภาพอนาคตเชิงกลยุทธ์",
        subtitle_en: "Corporate Entrepreneurship & Future Scenario Scanning",
        desc_th: "ปลูกฝัง Mindset ผู้ประกอบการภายในองค์กร การมองอนาคตด้วย Foresight Scenarios และการขับเคลื่อนนวัตกรรม",
        desc_en: "Deep dive into intrapreneurship mindset, foresight tools, and innovative leadership.",
        cover: "Cover/03_Intrapreneurship & Strategic Foresight.png",
        duration_th: "04:54 นาที",
        duration_en: "04:54 mins"
    },
    {
        id: 2,
        code: "BAFS-KM-04",
        category: "business",
        categoryName_th: "ธุรกิจและกลยุทธ์",
        categoryName_en: "Business & Strategy",
        title_th: "เสริมความเฉียบคมทางธุรกิจและการจำลองธุรกิจ",
        title_en: "Business Acumen with Business Simulation",
        subtitle_th: "ความเฉียบคมทางธุรกิจและการจำลองการตัดสินใจ",
        subtitle_en: "Mastering 5 Business Drivers & Strategic Acumen",
        desc_th: "ทำความเข้าใจภาพรวมธุรกิจ 5 Business Drivers การวิเคราะห์โอกาสและการตัดสินใจเพื่อสร้างผลลัพธ์ที่ยั่งยืน",
        desc_en: "Mastering 5 business drivers, strategic scanning, and sound financial decision making.",
        cover: "Cover/08_Business Acumen with Business Simulation.png",
        duration_th: "21:52 นาที",
        duration_en: "21:52 mins"
    },
    {
        id: 7,
        code: "BAFS-KM-05",
        category: "business",
        categoryName_th: "ธุรกิจและกลยุทธ์",
        categoryName_en: "Business & Strategy",
        title_th: "การเงินสำหรับผู้บริหารที่ไม่ใช่สายการเงิน",
        title_en: "Finance for Non-Finance (THE ENTREPRENEUR)",
        subtitle_th: "การเงินสำหรับผู้บริหารและคนทำงานยุคใหม่",
        subtitle_en: "Financial Statements, Cash Flow & Value Creation",
        desc_th: "อ่านงบการเงิน งบดุล งบกำไรขาดทุน และกระแสเงินสด เข้าใจภาษาการเงินเพื่อการตัดสินใจทางธุรกิจที่แม่นยำ",
        desc_en: "Decipher balance sheets, P&L, cash flows, and financial KPIs with confidence.",
        cover: "Cover/02_Finance for Non-Finance (THE ENTREPRENEUR).png",
        duration_th: "15:20 นาที",
        duration_en: "15:20 mins"
    },
    {
        id: 5,
        code: "BAFS-KM-06",
        category: "innovation",
        categoryName_th: "นวัตกรรมและการออกแบบ",
        categoryName_en: "Innovation & Design",
        title_th: "กระบวนการคิดเชิงออกแบบและนวัตกรรม",
        title_en: "Design Thinking & Innovation Sprint",
        subtitle_th: "กระบวนการคิดเชิงออกแบบและนวัตกรรมเพื่อผู้ใช้",
        subtitle_en: "Human-Centred Innovation & Rapid Prototyping",
        desc_th: "เรียนรู้ 5 ขั้นตอนของ Design Thinking ตั้งแต่ Empathize, Define, Ideate, Prototype สู่ Test เพื่อสร้างคุณค่าใหม่",
        desc_en: "Human-centered problem solving, empathy mapping, ideation, and rapid prototyping sprint.",
        cover: "Cover/01_Design_Thinking.png",
        duration_th: "18:40 นาที",
        duration_en: "18:40 mins"
    },
    {
        id: 6,
        code: "BAFS-KM-07",
        category: "softskills",
        categoryName_th: "ทักษะปฏิสัมพันธ์และการสื่อสาร",
        categoryName_en: "Soft Skills & Communication",
        title_th: "ศิลปะการนำเสนอและการ Pitching อย่างมืออาชีพ",
        title_en: "High-Impact Presentation & Pitching",
        subtitle_th: "การนำเสนออย่างทรงพลังและการเล่าเรื่องเชิงโน้มน้าว",
        subtitle_en: "Executive Storytelling, Slide Design & Impactful Delivery",
        desc_th: "โครงสร้างการเล่าเรื่องแบบ Storytelling การออกแบบสไลด์สไตล์ Executive และเทคนิคการนำเสนอที่ตรึงใจผู้ฟัง",
        desc_en: "Master executive storytelling frameworks, slide hierarchy, and persuasive speech delivery.",
        cover: "Cover/05_Impactful Presentation.png",
        duration_th: "22:10 นาที",
        duration_en: "22:10 mins"
    },
    {
        id: 8,
        code: "BAFS-KM-08",
        category: "softskills",
        categoryName_th: "ทักษะปฏิสัมพันธ์และการสื่อสาร",
        categoryName_en: "Soft Skills & Communication",
        title_th: "ศิลปะการรับประทานอาหารเพื่อธุรกิจ",
        title_en: "The Art of Business Dining & Executive Etiquette",
        subtitle_th: "ศิลปะการรับประทานอาหารและมารยาทธุรกิจสากล",
        subtitle_en: "International Table Manners & Professional Protocol",
        desc_th: "มารยาทบนโต๊ะอาหารสากล การวางตำแหน่งอุปกรณ์ และการสนทนาในมื้อธุรกิจเพื่อสร้างภาพลักษณ์มืออาชีพ",
        desc_en: "Western & Asian business dining etiquette, seating protocols, and professional networking manners.",
        cover: "Cover/09_The Art of Business Dining.png",
        duration_th: "19:45 นาที",
        duration_en: "19:45 mins"
    },
    {
        id: 9,
        code: "BAFS-KM-09",
        category: "softskills",
        categoryName_th: "ทักษะปฏิสัมพันธ์และการสื่อสาร",
        categoryName_en: "Soft Skills & Communication",
        title_th: "ภาพลักษณ์และบุคลิกภาพแบบมืออาชีพ",
        title_en: "Professional Personality & Executive Presence",
        subtitle_th: "การพัฒนาบุคลิกภาพและภาพลักษณ์ผู้นำมืออาชีพ",
        subtitle_en: "Professional Branding, Posture & Executive Charisma",
        desc_th: "การเสริมสร้างความมั่นใจ ภาษากาย (Body Language) การแต่งกายตามกาลเทศะ และการสร้างความประทับใจแรกพบ",
        desc_en: "Building authentic professional charisma, executive wardrobe, body language, and poise.",
        cover: "Cover/04_Personality & Executive Presence.png",
        duration_th: "20:30 นาที",
        duration_en: "20:30 mins"
    }
];

let bafsShelfState = {
    totalItems: 9,
    copies: 1,
    totalVirtual: 9,
    s: 0.0,
    T: 0.0,
    activeIdx: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartT: 0,
    hasDragged: false,
    mx: 0,
    my: 0,
    tiltX: 0,
    tiltY: 0,
    tiltXTarget: 0,
    tiltYTarget: 0,
    lifts: new Array(9).fill(0),
    liftTargets: new Array(9).fill(0),
    bookElements: [],
    rAFId: null,
    isRunning: true,
    lastTime: 0,
    wheelTimeout: null,
    viewMode: 'shelf'
};

let bafsShelfDims = {
    H: 210,
    ws: 46,
    d: 373,
    gap: 10
};

function updateShelfDimensions() {
    const stage = document.getElementById('bafs-shelf-stage');
    const viewport = document.getElementById('bafs-shelf-viewport');
    if (!stage || !viewport) return;

    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const H = isMobile ? 180 : (isTablet ? 195 : 210);
    const d = Math.round(H * (16 / 9)); // Exactly 16:9 widescreen ratio matching official Cover art
    const ws = isMobile ? 40 : 46;
    const gap = isMobile ? 8 : 10;

    bafsShelfDims = { H, ws, d, gap };

    stage.style.setProperty('--bafs-H', `${H}px`);
    stage.style.setProperty('--bafs-ws', `${ws}px`);
    stage.style.setProperty('--bafs-d', `${d}px`);
    stage.style.setProperty('--bafs-gap', `${gap}px`);

    // Ensure direct inline style updates on all rendered faces as solid guarantee
    if (bafsShelfState.bookElements && bafsShelfState.bookElements.length > 0) {
        bafsShelfState.bookElements.forEach(book => {
            const sp = book.querySelector('.bafs-sp');
            const cv = book.querySelector('.bafs-cv');
            if (sp) {
                sp.style.width = `${ws}px`;
                sp.style.height = `${H}px`;
                sp.style.left = `${-ws / 2}px`;
                sp.style.top = `${-H / 2}px`;
                sp.style.transform = `translateZ(${d / 2}px)`;
            }
            if (cv) {
                cv.style.width = `${d}px`;
                cv.style.height = `${H}px`;
                cv.style.left = `${-d / 2}px`;
                cv.style.top = `${-H / 2}px`;
                cv.style.transform = `rotateY(90deg) translateZ(${ws / 2}px)`;
            }
        });
    }

    const hitbox = document.getElementById('bafs-shelf-active-hitbox');
    if (hitbox) {
        hitbox.style.width = `${d + 10}px`;
        hitbox.style.height = `${H + 10}px`;
    }
}

function handleBookShelfClick(i, e) {
    if (bafsShelfState.hasDragged || bafsShelfState.isDragging) return;
    if (e && e.stopPropagation) e.stopPropagation();

    const currentS = bafsShelfState.s;
    const r = i - currentS;

    // If clicking the active book facing the viewer (or very close)
    if (Math.abs(r) < 0.45 || i === bafsShelfState.activeIdx) {
        openShelfCourseShowcase(i);
    } else {
        // If clicking another book on the shelf: turn/slide shelf to that book!
        bafsShelfState.T = i;
    }
}

function initBafsShelf() {
    window.handleBookShelfClick = handleBookShelfClick;
    const stage = document.getElementById('bafs-shelf-stage');
    const viewport = document.getElementById('bafs-shelf-viewport');
    if (!stage || !viewport) return;

    // Check saved view preference
    try {
        const savedView = localStorage.getItem('bafs_catalog_view_mode');
        if (savedView === 'grid') {
            setCatalogViewMode('grid');
        } else {
            setCatalogViewMode('shelf');
        }
    } catch (e) {}

    updateShelfDimensions();

    // Check if 9 book elements are already in DOM (pre-rendered in HTML)
    const existingBooks = stage.querySelectorAll('.bafs-book');
    if (existingBooks.length === 9) {
        bafsShelfState.bookElements = Array.from(existingBooks);
    } else {
        // Clear any existing children and generate exactly 9 books
        stage.innerHTML = '';
        bafsShelfState.bookElements = [];

        for (let i = 0; i < 9; i++) {
            const item = BAFS_SHELF_COURSES[i];

            const book = document.createElement('div');
            book.className = 'bafs-book';
            book.dataset.cat = item.category;
            book.dataset.index = i;
            book.dataset.courseId = item.id;

            // Spine Face
            const spine = document.createElement('div');
            spine.className = 'bafs-book-face bafs-sp';
            spine.style.width = `${bafsShelfDims.ws}px`;
            spine.style.height = `${bafsShelfDims.H}px`;
            spine.style.left = `${-bafsShelfDims.ws / 2}px`;
            spine.style.top = `${-bafsShelfDims.H / 2}px`;
            spine.style.transform = `translateZ(${bafsShelfDims.d / 2}px)`;
            spine.innerHTML = `
                <div class="bafs-sp-top">
                    <span class="bafs-sp-badge">${item.code}</span>
                </div>
                <div class="bafs-sp-title">${item.title_th}</div>
                <div class="bafs-sp-bottom">
                    <span>BAFS</span>
                    <span>HOD</span>
                </div>
            `;

            // Cover Face
            const cover = document.createElement('div');
            cover.className = 'bafs-book-face bafs-cv';
            cover.style.width = `${bafsShelfDims.d}px`;
            cover.style.height = `${bafsShelfDims.H}px`;
            cover.style.left = `${-bafsShelfDims.d / 2}px`;
            cover.style.top = `${-bafsShelfDims.H / 2}px`;
            cover.style.transform = `rotateY(90deg) translateZ(${bafsShelfDims.ws / 2}px)`;
            cover.style.backgroundImage = `url('${encodeURI(item.cover)}')`;

            book.appendChild(spine);
            book.appendChild(cover);
            stage.appendChild(book);

            bafsShelfState.bookElements.push(book);
        }
    }

    // Attach click and hover listeners to all books and their faces
    bafsShelfState.bookElements.forEach((book, i) => {
        book.style.cursor = 'pointer';
        book.dataset.index = i;
        book.setAttribute('title', 'คลิกเพื่อเปิดดูหลักสูตร');

        book.onclick = (e) => window.handleBookShelfClick(i, e);

        const faces = book.querySelectorAll('.bafs-book-face');
        faces.forEach(face => {
            face.style.cursor = 'pointer';
            face.onclick = (e) => window.handleBookShelfClick(i, e);
        });

        book.onpointerenter = () => {
            if (Math.abs(i - bafsShelfState.s) >= 0.5) {
                bafsShelfState.liftTargets[i] = 1;
            }
        };
        book.onpointerleave = () => {
            bafsShelfState.liftTargets[i] = 0;
        };
    });

    // Viewport drag interactions (Clean separation between click and drag)
    let pointerDownX = 0;
    let pointerDownY = 0;
    let pointerDownTime = 0;
    let pointerDownTarget = null;

    viewport.addEventListener('pointerdown', (e) => {
        if (e.target.closest('button')) return;

        pointerDownX = e.clientX;
        pointerDownY = e.clientY;
        pointerDownTime = performance.now();
        pointerDownTarget = e.target;
        bafsShelfState.isDragging = false;
        bafsShelfState.hasDragged = false;
        bafsShelfState.dragStartX = e.clientX;
        bafsShelfState.dragStartT = bafsShelfState.T;
    });

    viewport.addEventListener('pointermove', (e) => {
        const rect = viewport.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        bafsShelfState.mx = e.clientX - cx;
        bafsShelfState.my = e.clientY - cy;

        if (e.buttons > 0) {
            const dx = e.clientX - pointerDownX;
            const dy = e.clientY - pointerDownY;
            const dist = Math.hypot(dx, dy);

            // Only enter drag mode if pointer actually moved more than 14px (Prevents accidental micro-drag on clicks)
            if (!bafsShelfState.isDragging && dist > 14) {
                bafsShelfState.isDragging = true;
                bafsShelfState.hasDragged = true;
                try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
            }

            if (bafsShelfState.isDragging) {
                const unit = bafsShelfDims.ws + bafsShelfDims.gap;
                const newT = bafsShelfState.dragStartT - (dx / unit) * 0.95;
                bafsShelfState.T = Math.max(-0.25, Math.min(8.25, newT));
            }
        }
    });

    const endDrag = (e) => {
        if (bafsShelfState.isDragging) {
            bafsShelfState.isDragging = false;
            bafsShelfState.T = Math.max(0, Math.min(8, Math.round(bafsShelfState.T)));
            try { viewport.releasePointerCapture(e.pointerId); } catch (err) {}
            setTimeout(() => { bafsShelfState.hasDragged = false; }, 80);
            return;
        }

        // Clean Click / Tap Handling on Viewport (with Geometric Hit-Testing Fallback)
        const elapsed = performance.now() - pointerDownTime;
        const dist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);

        if (dist <= 14 && elapsed < 800) {
            // Ignore if clicked on arrow buttons or control buttons
            if (e.target && e.target.closest('button')) return;

            // 1. Direct Book Element Hit-Test
            const target = e.target || pointerDownTarget;
            const bookEl = target ? target.closest('.bafs-book') : null;
            if (bookEl) {
                const idx = parseInt(bookEl.dataset.index, 10);
                if (!isNaN(idx)) {
                    handleBookShelfClick(idx, e);
                    return;
                }
            }

            // 2. Geometric Hit-Testing (Foolproof resolution when Chromium 3D raycasting returns viewport)
            const rect = viewport.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            const cx = (rect.width / 2) + (bafsShelfState.activeBookX || 0);
            const cy = rect.height / 2;

            const halfCoverW = Math.round(bafsShelfDims.d * 0.5) + 12;
            const halfCoverH = Math.round(bafsShelfDims.H * 0.5) + 15;

            // Center Zone: Active Book Cover (Exact 16:9 Landscape Boundary)
            if (Math.abs(clickX - cx) <= halfCoverW && Math.abs(clickY - cy) <= halfCoverH) {
                console.log('🎯 Geometric Hit on Active Center Book! Opening Course Showcase...');
                openShelfCourseShowcase();
                return;
            }

            // Right Zone: Shelf Spines (Books to the right of active cover)
            if (clickX > cx + halfCoverW && Math.abs(clickY - cy) <= halfCoverH + 25) {
                const offset = clickX - (cx + halfCoverW);
                const step = bafsShelfDims.ws + bafsShelfDims.gap;
                const bookStep = Math.floor(offset / step) + 1;
                const targetIdx = Math.min(8, Math.round(bafsShelfState.s) + bookStep);
                console.log('🎯 Geometric Hit on Right Spine -> sliding to index:', targetIdx);
                bafsShelfState.T = targetIdx;
                return;
            }

            // Left Zone: Shelf Spines (Books to the left of active cover, if scrolled)
            if (clickX < cx - halfCoverW && Math.abs(clickY - cy) <= halfCoverH + 25) {
                const offset = (cx - halfCoverW) - clickX;
                const step = bafsShelfDims.ws + bafsShelfDims.gap;
                const bookStep = Math.floor(offset / step) + 1;
                const targetIdx = Math.max(0, Math.round(bafsShelfState.s) - bookStep);
                console.log('🎯 Geometric Hit on Left Spine -> sliding to index:', targetIdx);
                bafsShelfState.T = targetIdx;
                return;
            }
        }
    };
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    // Mouse wheel scrubbing
    viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const unit = bafsShelfDims.ws + bafsShelfDims.gap;
        bafsShelfState.T = Math.max(-0.25, Math.min(8.25, bafsShelfState.T + (delta / unit) * 0.35));

        if (bafsShelfState.wheelTimeout) clearTimeout(bafsShelfState.wheelTimeout);
        bafsShelfState.wheelTimeout = setTimeout(() => {
            bafsShelfState.T = Math.max(0, Math.min(8, Math.round(bafsShelfState.T)));
        }, 140);
    }, { passive: false });

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
        const showcaseModal = document.getElementById('bafs-course-quickview-modal');
        const isShowcaseOpen = showcaseModal && !showcaseModal.classList.contains('hidden');

        if (isShowcaseOpen) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeShelfCourseShowcase();
                return;
            }
            const scrollBody = document.getElementById('showcase-scroll-body');
            const mobCard = document.getElementById('bafs-quickview-card');
            const scrollTarget = (scrollBody && scrollBody.scrollHeight > scrollBody.clientHeight + 4)
                ? scrollBody
                : ((mobCard && mobCard.scrollHeight > mobCard.clientHeight + 4) ? mobCard : null);

            if (scrollTarget && (e.key === 'ArrowDown' || e.key === 'PageDown')) {
                e.preventDefault();
                const step = e.key === 'PageDown' ? Math.max(180, scrollTarget.clientHeight * 0.75) : 72;
                scrollTarget.scrollBy({ top: step, behavior: 'smooth' });
                return;
            }
            if (scrollTarget && (e.key === 'ArrowUp' || e.key === 'PageUp')) {
                e.preventDefault();
                const step = e.key === 'PageUp' ? Math.max(180, scrollTarget.clientHeight * 0.75) : 72;
                scrollTarget.scrollBy({ top: -step, behavior: 'smooth' });
                return;
            }
            if (e.key === 'Enter') {
                const activeBtn = document.activeElement && document.activeElement.closest('#bafs-course-quickview-modal button, #bafs-course-quickview-modal [role="button"]');
                if (!activeBtn) {
                    e.preventDefault();
                    startLearningFromShowcase();
                }
                return;
            }
        }

        const catView = document.getElementById('view-catalog');
        if (!catView || catView.classList.contains('hidden')) return;
        if (bafsShelfState.viewMode !== 'shelf') return;
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;

        if (e.key === 'Escape') {
            if (typeof closeInfographicLightbox === 'function') closeInfographicLightbox();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            shelfPrev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            shelfNext();
        } else if (e.key === 'Enter') {
            if (catView && !catView.classList.contains('hidden') && bafsShelfState.viewMode === 'shelf') {
                e.preventDefault();
                openShelfCourseShowcase();
            }
        }
    });

    window.addEventListener('resize', () => {
        updateShelfDimensions();
        updateShelfCategoryIndicator();
        updateShowcaseScrollCue();
    });

    // Initial setup
    updateShelfCategoryIndicator();
    updateShelfCaption(0, 1);

    // Initial frame execution so all book elements get their 3D transforms immediately
    bafsShelfState.isRunning = true;
    bafsShelfFrame(performance.now());
    console.log('✅ BAFS 3D Shelf initialized: exactly 9 unique masterclass books mounted');
}

function bafsShelfFrame(now) {
    if (!bafsShelfState.isRunning) return;

    if (!bafsShelfState.lastTime) bafsShelfState.lastTime = now;
    const dt = Math.min(0.05, (now - bafsShelfState.lastTime) / 1000);
    bafsShelfState.lastTime = now;

    // Physics spring for scroll position
    const k = bafsShelfState.isDragging ? 18 : 5.2;
    bafsShelfState.s += (bafsShelfState.T - bafsShelfState.s) * (1 - Math.exp(-k * dt));

    if (Math.abs(bafsShelfState.T - bafsShelfState.s) < 0.0001) {
        bafsShelfState.s = bafsShelfState.T;
    }

    // Clamp scroll position strictly to 0..8
    bafsShelfState.s = Math.max(-0.25, Math.min(8.25, bafsShelfState.s));

    // Mouse tilt tracking on active cover
    const distToActive = Math.abs(bafsShelfState.T - bafsShelfState.s);
    if (distToActive < 0.35 && Math.abs(bafsShelfState.mx) < bafsShelfDims.d * 0.75 && Math.abs(bafsShelfState.my) < bafsShelfDims.H * 0.6) {
        bafsShelfState.tiltYTarget = (bafsShelfState.mx / (bafsShelfDims.d * 0.6)) * 9;
        bafsShelfState.tiltXTarget = -(bafsShelfState.my / (bafsShelfDims.H * 0.5)) * 6;
    } else {
        bafsShelfState.tiltYTarget = (bafsShelfState.mx / (window.innerWidth || 1200)) * 4;
        bafsShelfState.tiltXTarget = 0;
    }
    bafsShelfState.tiltY += (bafsShelfState.tiltYTarget - bafsShelfState.tiltY) * (1 - Math.exp(-7 * dt));
    bafsShelfState.tiltX += (bafsShelfState.tiltXTarget - bafsShelfState.tiltX) * (1 - Math.exp(-7 * dt));

    const totalV = 9;

    // Pass 1: Compute raw horizontal positions & bounding box of all 9 books so the entire group stays centered on the shelf board
    const rawX = new Array(totalV);
    const openRatio = new Array(totalV);
    let minLeftEdge = Infinity;
    let maxRightEdge = -Infinity;

    for (let v = 0; v < totalV; v++) {
        const r = v - bafsShelfState.s;
        let B = 0;
        if (Math.abs(r) < 1) {
            B = (r + Math.sin(Math.PI * r) / Math.PI) / 2;
        } else {
            B = 0.5 * Math.sign(r);
        }
        const xVal = r * (bafsShelfDims.ws + bafsShelfDims.gap) + (bafsShelfDims.d - bafsShelfDims.ws + 1.6 * bafsShelfDims.gap) * B;
        const u = Math.max(0, 1 - Math.abs(r));
        const o = u * u * (3 - 2 * u);

        rawX[v] = xVal;
        openRatio[v] = o;

        const halfWidth = 0.5 * (bafsShelfDims.ws + (bafsShelfDims.d - bafsShelfDims.ws) * o);
        if (xVal - halfWidth < minLeftEdge) minLeftEdge = xVal - halfWidth;
        if (xVal + halfWidth > maxRightEdge) maxRightEdge = xVal + halfWidth;
    }

    const centerOffset = (minLeftEdge + maxRightEdge) * 0.5;
    bafsShelfState.centerOffset = centerOffset;
    const nearestIdx = Math.max(0, Math.min(totalV - 1, Math.round(bafsShelfState.s)));
    bafsShelfState.activeBookX = rawX[nearestIdx] - centerOffset;

    const hitboxEl = document.getElementById('bafs-shelf-active-hitbox');
    if (hitboxEl) {
        hitboxEl.style.left = `calc(50% + ${bafsShelfState.activeBookX.toFixed(1)}px)`;
    }

    // Pass 2: Update each of the 9 books with centered x-position and upright 0deg posture
    for (let v = 0; v < totalV; v++) {
        const bookEl = bafsShelfState.bookElements[v];
        if (!bookEl) continue;

        bookEl.style.display = 'block';

        const x = rawX[v] - centerOffset;
        const o = openRatio[v];

        // Hover lift easing
        bafsShelfState.lifts[v] += (bafsShelfState.liftTargets[v] - bafsShelfState.lifts[v]) * (1 - Math.exp(-12 * dt));
        const lift = bafsShelfState.lifts[v];

        // 3D rotations & translations (rotZ = 0 keeps open book upright parallel to shelf board)
        const rotY = -90 * o + bafsShelfState.tiltY * o;
        const rotX = bafsShelfState.tiltX * o;
        const rotZ = 0;
        const transZ = o * (0.22 * bafsShelfDims.H);
        const transY = -o * (0.018 * bafsShelfDims.H) - lift * (0.04 * bafsShelfDims.H);

        bookEl.style.transform = `translate3d(${x.toFixed(2)}px, ${transY.toFixed(2)}px, ${transZ.toFixed(2)}px) rotateZ(${rotZ.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

        // Dynamic Shading
        bookEl.style.setProperty('--shade-sp', (o * 0.55).toFixed(3));
        bookEl.style.setProperty('--shade-cv', ((1 - o) * 0.5).toFixed(3));
    }

    // Active course change detection
    const currentActive = Math.max(0, Math.min(8, Math.round(bafsShelfState.s)));
    if (currentActive !== bafsShelfState.activeIdx) {
        const dir = Math.sign(bafsShelfState.T - bafsShelfState.s) || 1;
        bafsShelfState.activeIdx = currentActive;
        updateShelfCaption(currentActive, dir);
        updateShelfCategoryIndicator();
    }

    bafsShelfState.rAFId = requestAnimationFrame(bafsShelfFrame);
}

function shelfPrev() {
    bafsShelfState.T = Math.max(0, Math.round(bafsShelfState.T) - 1);
}

function shelfNext() {
    bafsShelfState.T = Math.min(8, Math.round(bafsShelfState.T) + 1);
}

function shelfJumpToCategory(cat) {
    let targetIdx = 0;
    if (cat === 'all' || cat === 'leadership') {
        targetIdx = 0; // KM-01 Servant Leadership
    } else if (cat === 'business') {
        targetIdx = 2; // KM-03 Intrapreneurship
    } else if (cat === 'innovation') {
        targetIdx = 5; // KM-06 Design Thinking
    } else if (cat === 'softskills') {
        targetIdx = 6; // KM-07 High-Impact Presentation
    }
    bafsShelfState.T = targetIdx;
    updateShelfCategoryIndicator(cat);
}

function updateShelfCategoryIndicator(explicitCat = null) {
    const activeCourse = BAFS_SHELF_COURSES[bafsShelfState.activeIdx];
    const targetCat = explicitCat || (activeCourse ? activeCourse.category : 'all');
    const tabsWrapper = document.getElementById('bafs-shelf-tabs-wrapper');
    const indicator = document.getElementById('bafs-shelf-tab-indicator');
    if (!tabsWrapper || !indicator) return;

    const matchingTab = tabsWrapper.querySelector(`.bafs-shelf-tab[data-cat="${targetCat}"]`) || tabsWrapper.querySelector('.bafs-shelf-tab[data-cat="all"]');
    if (!matchingTab) return;

    const allTabs = tabsWrapper.querySelectorAll('.bafs-shelf-tab');
    allTabs.forEach(t => {
        if (t === matchingTab) {
            t.classList.add('active', 'text-white');
            t.classList.remove('text-slate-600');
        } else {
            t.classList.remove('active', 'text-white');
            t.classList.add('text-slate-600');
        }
    });

    indicator.style.width = `${matchingTab.offsetWidth}px`;
    indicator.style.height = `${matchingTab.offsetHeight}px`;
    indicator.style.left = `${matchingTab.offsetLeft}px`;
    indicator.style.top = `${matchingTab.offsetTop}px`;
}

function updateShelfCaption(idx, dir = 1) {
    const course = BAFS_SHELF_COURSES[idx];
    if (!course) return;

    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    const title = isEn ? course.title_en : course.title_th;
    const subtitle = isEn ? course.subtitle_en : course.subtitle_th;
    const desc = isEn ? course.desc_en : course.desc_th;
    const duration = isEn ? course.duration_en : course.duration_th;
    const catName = isEn ? course.categoryName_en : course.categoryName_th;

    const titleEl = document.getElementById('bafs-shelf-title');
    const subEl = document.getElementById('bafs-shelf-subtitle');
    const descEl = document.getElementById('bafs-shelf-desc');
    const badgeCatEl = document.getElementById('bafs-shelf-badge-cat');
    const badgeCodeEl = document.getElementById('bafs-shelf-badge-code');
    const badgeDurEl = document.getElementById('bafs-shelf-badge-duration');

    const animateMaskedElement = (el, text, isHtml = false) => {
        if (!el) return;
        if (typeof el.animate === 'function') {
            const anim = el.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: `translateY(${-dir * 105}%)`, opacity: 0 }
            ], { duration: 180, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });

            anim.onfinish = () => {
                if (isHtml) el.innerHTML = text; else el.textContent = text;
                el.animate([
                    { transform: `translateY(${dir * 105}%)`, opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 }
                ], { duration: 240, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
            };
        } else {
            if (isHtml) el.innerHTML = text; else el.textContent = text;
        }
    };

    if (titleEl) animateMaskedElement(titleEl, title);
    if (subEl) animateMaskedElement(subEl, subtitle);
    if (descEl) animateMaskedElement(descEl, desc);
    if (badgeCatEl) animateMaskedElement(badgeCatEl, catName);
    if (badgeCodeEl) badgeCodeEl.textContent = course.code;
    if (badgeDurEl) badgeDurEl.textContent = duration;
}

let currentShowcaseCourseId = 3;

function openShelfCourseShowcase(targetIdx = null) {
    const idx = targetIdx !== null ? targetIdx : Math.max(0, Math.min(8, Math.round(bafsShelfState.s)));
    bafsShelfState.activeIdx = idx;
    const shelfItem = BAFS_SHELF_COURSES[idx];
    if (!shelfItem) return;

    currentShowcaseCourseId = shelfItem.id;
    const fullCourse = allCourses.find(c => c.id === shelfItem.id) || shelfItem;
    const isEn = currentLang === 'en';

    // Deep info from course_full_data.js
    const deepInfo = (isEn && typeof officialCourseIntros_EN !== 'undefined' && officialCourseIntros_EN[shelfItem.id])
        ? officialCourseIntros_EN[shelfItem.id]
        : ((typeof officialCourseIntros !== 'undefined' && officialCourseIntros[shelfItem.id]) ? officialCourseIntros[shelfItem.id] : null);

    const bento = (typeof courseBentoDatabase !== 'undefined' && courseBentoDatabase[shelfItem.id]) ? courseBentoDatabase[shelfItem.id] : null;

    // Elements in Modal
    const modal = document.getElementById('bafs-course-quickview-modal');
    const posterImg = document.getElementById('showcase-poster-img');
    const badgeCode = document.getElementById('showcase-badge-code');
    const ratingEl = document.getElementById('showcase-rating');
    const badgeCat = document.getElementById('showcase-badge-cat');
    const instructorEl = document.getElementById('showcase-instructor');
    const titleTh = document.getElementById('showcase-title-th');
    const titleEn = document.getElementById('showcase-title-en');
    const descEl = document.getElementById('showcase-desc');
    const durationEl = document.getElementById('showcase-duration');
    const toolsCountEl = document.getElementById('showcase-tools-count');
    const outcomesContainer = document.getElementById('showcase-outcomes-container');

    if (!modal) return;

    // 1. Image Poster
    if (posterImg) {
        posterImg.src = encodeURI(shelfItem.cover || fullCourse.cover || 'hero_conicle_illustration.png');
        posterImg.alt = shelfItem.title_th;
    }

    // 2. Badges & Meta
    if (badgeCode) badgeCode.textContent = shelfItem.code || `BAFS-KM-0${shelfItem.id}`;
    if (ratingEl) ratingEl.textContent = fullCourse.rating || '4.95';
    if (badgeCat) {
        badgeCat.textContent = isEn ? (shelfItem.categoryName_en || shelfItem.categoryName_th) : shelfItem.categoryName_th;
    }
    if (instructorEl) {
        instructorEl.textContent = isEn ? (fullCourse.instructor_en || fullCourse.instructor) : (fullCourse.instructor_th || fullCourse.instructor || 'BAFS Executive Series');
    }

    // 3. Titles & Synopsis
    if (titleTh) titleTh.textContent = isEn ? (shelfItem.title_en || shelfItem.title_th) : shelfItem.title_th;
    if (titleEn) titleEn.textContent = isEn ? shelfItem.title_th : (shelfItem.subtitle_th || shelfItem.title_en);
    if (descEl) {
        const descText = deepInfo ? deepInfo.overview : (isEn ? shelfItem.desc_en : shelfItem.desc_th);
        descEl.textContent = descText;
    }

    // 4. Stats
    if (durationEl) durationEl.textContent = isEn ? shelfItem.duration_en : shelfItem.duration_th;
    const toolsNum = deepInfo && deepInfo.tools ? deepInfo.tools.length : (fullCourse.tags ? fullCourse.tags.length : 4);
    if (toolsCountEl) toolsCountEl.textContent = `${toolsNum} Frameworks`;

    // 5. Key Outcomes (2-3 Bullet Points with modern checkmark icons)
    if (outcomesContainer) {
        const outcomeList = bento ? (isEn ? bento.purpose_en : bento.purpose_th) 
            : (deepInfo && deepInfo.outcomes ? deepInfo.outcomes.slice(0, 3) 
            : [
                'ทำความเข้าใจกรอบความคิดและทักษะเชิงลึกเพื่อการประยุกต์ใช้จริงในองค์กร',
                'ฝึกฝนการใช้ Frameworks & Tools มาตรฐานสากลเพื่อยกระดับผลลัพธ์การทำงาน',
                'ประเมินความพร้อมและวางแผนปฏิบัติการร่วมกับทีมงาน BAFS Group อย่างเป็นรูปธรรม'
            ]);

        outcomesContainer.innerHTML = outcomeList.map(item => `
            <div class="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-sm">
                <span class="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                </span>
                <span class="text-xs text-slate-800 font-semibold leading-relaxed">${item}</span>
            </div>
        `).join('');
    }

    // 6. Bilingual Labels & Scroll Cue Binding
    syncShowcaseModalI18n(isEn);

    // 7. Show Modal & Reset Scroll Positions
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const scrollBody = document.getElementById('showcase-scroll-body');
    const quickCard = document.getElementById('bafs-quickview-card');
    if (quickCard) quickCard.scrollTop = 0;
    if (scrollBody) {
        scrollBody.scrollTop = 0;
        if (!scrollBody.dataset.cueBound) {
            scrollBody.addEventListener('scroll', updateShowcaseScrollCue, { passive: true });
            scrollBody.dataset.cueBound = '1';
        }
    }

    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => updateShowcaseScrollCue());
    } else {
        updateShowcaseScrollCue();
    }
    setTimeout(updateShowcaseScrollCue, 150);
}

function syncShowcaseModalI18n(isEn) {
    const bindings = [
        ['showcase-label-zoom', isEn ? 'Expand Infographic' : 'ขยายดู Infographic'],
        ['showcase-label-infographic', isEn ? 'Open Key Infographic' : 'เปิดดู Infographic สรุปสาระสำคัญ'],
        ['showcase-label-outcomes', isEn ? 'KEY LEARNING OUTCOMES' : 'สิ่งที่คุณจะได้เรียนรู้จากหลักสูตรนี้ (Key Outcomes)'],
        ['showcase-label-duration', isEn ? 'Duration' : 'เวลาเรียน'],
        ['showcase-label-tools', isEn ? 'Practical Tools' : 'เครื่องมือปฏิบัติ'],
        ['showcase-label-level', isEn ? 'Level' : 'ระดับหลักสูตร'],
        ['showcase-label-start', isEn ? 'Start Learning (Full Course)' : 'เข้าสู่ห้องเรียนเต็มรูปแบบ (Start Learning)'],
        ['showcase-label-back', isEn ? 'Back' : 'ย้อนกลับ'],
        ['showcase-label-scroll-cue', isEn ? 'Scroll down for more' : 'เลื่อนลงดูเพิ่มเติม']
    ];
    bindings.forEach(([id, txt]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    });
}

function updateShowcaseScrollCue() {
    const modal = document.getElementById('bafs-course-quickview-modal');
    const scrollBody = document.getElementById('showcase-scroll-body');
    const cueWrap = document.getElementById('showcase-scroll-cue-wrap');
    if (!cueWrap) return;

    if (!modal || modal.classList.contains('hidden') || !scrollBody || window.innerWidth < 768) {
        cueWrap.classList.add('hidden');
        cueWrap.classList.remove('flex');
        return;
    }

    const remaining = scrollBody.scrollHeight - scrollBody.scrollTop - scrollBody.clientHeight;
    if (remaining > 10) {
        cueWrap.classList.remove('hidden');
        cueWrap.classList.add('flex');
    } else {
        cueWrap.classList.add('hidden');
        cueWrap.classList.remove('flex');
    }
}

function scrollShowcaseBodyStep() {
    const scrollBody = document.getElementById('showcase-scroll-body');
    if (!scrollBody) return;
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = Math.max(140, Math.round(scrollBody.clientHeight * 0.55));
    scrollBody.scrollBy({
        top: step,
        behavior: reduced ? 'auto' : 'smooth'
    });
    setTimeout(updateShowcaseScrollCue, reduced ? 20 : 320);
}

function closeShelfCourseShowcase() {
    const modal = document.getElementById('bafs-course-quickview-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    document.body.style.overflow = '';
}

function startLearningFromShowcase() {
    closeShelfCourseShowcase();
    if (typeof openCoursePage === 'function') {
        openCoursePage(currentShowcaseCourseId);
    }
}

function openShowcaseInfographic() {
    const courseId = currentShowcaseCourseId;
    closeShelfCourseShowcase();
    if (typeof openInfographicLightbox === 'function') {
        currentActiveCourseId = courseId;
        openInfographicLightbox();
    }
}

function openActiveShelfCourse() {
    openShelfCourseShowcase();
}

function setCatalogViewMode(mode) {
    bafsShelfState.viewMode = mode;
    try {
        localStorage.setItem('bafs_catalog_view_mode', mode);
    } catch (e) {}

    const shelfView = document.getElementById('catalog-3d-shelf-view');
    const gridView = document.getElementById('catalog-grid-view');
    const btnShelf = document.getElementById('toggle-view-shelf-btn');
    const btnGrid = document.getElementById('toggle-view-grid-btn');

    if (mode === 'shelf') {
        if (shelfView) shelfView.classList.remove('hidden');
        if (gridView) gridView.classList.add('hidden');

        if (btnShelf) {
            btnShelf.className = "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white text-[#FA541C] shadow-xs";
        }
        if (btnGrid) {
            btnGrid.className = "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900";
        }
        onEnterCatalogTab();
    } else {
        if (shelfView) shelfView.classList.add('hidden');
        if (gridView) gridView.classList.remove('hidden');

        if (btnShelf) {
            btnShelf.className = "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900";
        }
        if (btnGrid) {
            btnGrid.className = "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white text-[#FA541C] shadow-xs";
        }
        onLeaveCatalogTab();
    }
}

function onEnterCatalogTab() {
    if (bafsShelfState.viewMode === 'shelf') {
        bafsShelfState.isRunning = true;
        bafsShelfState.lastTime = 0;
        updateShelfDimensions();
        updateShelfCategoryIndicator();
        // Render current frame immediately
        bafsShelfFrame(performance.now());
        if (bafsShelfState.rAFId) {
            cancelAnimationFrame(bafsShelfState.rAFId);
            bafsShelfState.rAFId = null;
        }
        bafsShelfState.rAFId = requestAnimationFrame(bafsShelfFrame);
    }
}

function onLeaveCatalogTab() {
    bafsShelfState.isRunning = false;
    if (bafsShelfState.rAFId) {
        cancelAnimationFrame(bafsShelfState.rAFId);
        bafsShelfState.rAFId = null;
    }
}

function updateShelfLanguage(lang) {
    const isEn = lang === 'en';
    const labelShelf = document.getElementById('label-view-shelf');
    const labelGrid = document.getElementById('label-view-grid');
    const labelOpen = document.getElementById('label-shelf-open-action');

    if (labelShelf) labelShelf.textContent = isEn ? '3D Bookshelf' : 'ชั้นหนังสือ 3D';
    if (labelGrid) labelGrid.textContent = isEn ? 'Grid Cards' : 'การ์ดตาราง';
    if (labelOpen) labelOpen.textContent = isEn ? 'PREVIEW COURSE (ENTER)' : 'เปิดดูตัวอย่างหลักสูตร (ENTER)';

    // Update spine titles
    bafsShelfState.bookElements.forEach((book, v) => {
        const item = BAFS_SHELF_COURSES[v % bafsShelfState.totalItems];
        const titleEl = book.querySelector('.bafs-sp-title');
        if (titleEl && item) {
            titleEl.textContent = isEn ? (item.title_en || item.title_th) : item.title_th;
        }
    });

    updateShelfCaption(bafsShelfState.activeIdx, 1);
    updateShelfCategoryIndicator();
    syncShowcaseModalI18n(isEn);
    const showcaseModal = document.getElementById('bafs-course-quickview-modal');
    if (showcaseModal && !showcaseModal.classList.contains('hidden')) {
        openShelfCourseShowcase(bafsShelfState.activeIdx);
    }
}

// Global window exposure for 3D shelf debugging & manual triggers
if (typeof window !== 'undefined') {
    window.openActiveShelfCourse = openActiveShelfCourse;
    window.openShelfCourseShowcase = openShelfCourseShowcase;
    window.closeShelfCourseShowcase = closeShelfCourseShowcase;
    window.startLearningFromShowcase = startLearningFromShowcase;
    window.openShowcaseInfographic = openShowcaseInfographic;
    window.scrollShowcaseBodyStep = scrollShowcaseBodyStep;
    window.updateShowcaseScrollCue = updateShowcaseScrollCue;
    window.syncShowcaseModalI18n = syncShowcaseModalI18n;
    window.handleBookShelfClick = handleBookShelfClick;
    window.bafsShelfState = bafsShelfState;
    window.bafsShelfDims = bafsShelfDims;
    window.initBafsShelf = initBafsShelf;
    window.bafsShelfFrame = bafsShelfFrame;
    window.setCatalogViewMode = setCatalogViewMode;
}

// Auto-initialize entire application once all definitions are loaded
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
}

