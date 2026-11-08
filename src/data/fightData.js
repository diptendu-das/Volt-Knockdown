// Fight Data & Championship Configuration for the School of Electrical Banter Match
export const EVENT_DETAILS = {
  eventName: "THE LUNCH BREAK BRAWL",
  tagline: "HIGH VOLTAGE BANTER: 6'7\" GOLIATH VS 4-FOOT SPARKY",
  subheading: "SCHOOL OF ELECTRICAL PRESENTS: THE SEMINAR HALL TITLE FIGHT",
  presentedBy: "SCHOOL OF ELECTRICAL",
  venue: "SEMINAR HALL (ELECTRICAL BLOCK)",
  city: "COLLEGE CAMPUS",
  date: "MONDAY, NOVEMBER 9, 2026",
  targetDate: "2026-11-09T13:00:00+05:30",
  mainCardTime: "1:00 PM SHARP (LUNCH BREAK SPECIAL)",
  sanctioningBody: "DEPARTMENT OF ELECTRICAL ENGINEERING & HOSTEL CANTEEN COUNCIL",
  rounds: "3 ROUNDS OF PURE ACTION (SEMINAR HALL)",
  rules: "UNIFIED HOSTEL BANTER RULES (NO PULLING LAB COATS, VIVA SCHEDULED AT 2 PM)",
  developerName: "Diptendu Das",
};

export const FIGHTERS = {
  red: {
    id: "arman",
    corner: "RED CORNER",
    firstName: "ARMAN",
    lastName: "THE BEHEMOTH",
    nickname: "CHAMP-ISH",
    moniker: "THE 6'7\" CIRCUIT CRUSHER",
    image: "./arman.jpg",
    record: "48-0-0",
    wins: 48,
    losses: 0,
    draws: 0,
    koWins: 47,
    subWins: 0,
    decWins: 1,
    koPercentage: "97.9%",
    country: "ELECTRICAL BLOCK",
    flag: "⚡",
    originCity: "Hostel Block A • Heavyweight Gym",
    trainingCamp: "Transformer Core Heavyweight Division",
    age: 21,
    height: "6'7\" (201 cm)",
    weight: "235 lbs (106 kg)",
    reach: "86.0\" (Reaches across 3 lab tables)",
    legReach: "48.0\"",
    stance: "Towering Over Srichandan",
    fightingStyle: "Megawatt Overhand & Samosa Powered Slams",
    signatureMove: "The High-Voltage Choke-Slam & Desk Destroyer",
    quote: "Srichandan has guts, but against 6'7\" power, one tap and he's going straight to earth ground.",
    themeColor: "from-red-600 to-rose-900",
    glowColor: "rgba(239, 68, 68, 0.7)",
    accentHex: "#ef4444",
    borderGlow: "shadow-[0_0_40px_rgba(220,38,38,0.55)]",
    stats: {
      strikingPower: 99,
      handSpeed: 89,
      chinDurability: 99,
      heightAdvantage: 100,
      hostelReputation: 100,
      brutalityIndex: 99,
      samosaConsumption: 100,
      firstRoundKOs: 45,
    },
    odds: {
      moneyline: -950,
      decimal: 1.11,
      impliedWinProb: "90.5%",
    },
    recentFights: [
      { opponent: "Canteen Samosa Plate", result: "WIN - Clean Sweep in 45 sec", event: "Break 1", title: "Snack Championship" },
      { opponent: "Lab Assignment Deadline", result: "WIN - Submitted with 1 sec left", event: "Midterm", title: "Semester Survival" },
      { opponent: "Hostel Bench Press", result: "WIN - 120kg Easy Reps", event: "Hostel Gym", title: "Heavyweight Title" },
      { opponent: "Srichandan (Friendly Spar)", result: "WIN - Srichandan flew into corridor", event: "Hostel Room", title: "Exhibition" },
    ],
    strengths: [
      "Gigantic 6'7\" height — looks down on Srichandan from orbit",
      "86-inch reach advantage (can punch Srichandan from another classroom)",
      "Unstoppable knockout power backed by daily canteen diet",
      "Undefeated 48-0 record in Electrical Seminar history"
    ]
  },
  blue: {
    id: "srichandan",
    corner: "BLUE CORNER",
    firstName: "SRICHANDAN",
    lastName: "THE DYNAMO",
    nickname: "SPEEDY",
    moniker: "THE POCKET DYNAMO",
    image: null,
    record: "5-14-1",
    wins: 5,
    losses: 14,
    draws: 1,
    koWins: 4,
    subWins: 1,
    decWins: 0,
    koPercentage: "80.0%",
    country: "SEMINAR BENCH",
    flag: "⚡",
    originCity: "Front Row Desk 1 • Electrical Dept",
    trainingCamp: "Agility & High Speed Counter Lab",
    age: 20,
    height: "4'0\" (122 cm)",
    weight: "92 lbs (41.7 kg)",
    reach: "38.0\"",
    legReach: "26.0\"",
    stance: "Agile Low Stance Hunter",
    fightingStyle: "Speed Counter-Striking & Low Angle Ankle Pick",
    signatureMove: "The Low Voltage Ankle Strike & Quick Dodge",
    quote: "Size isn't everything! I've knocked out 4 guys in the hostel by moving faster than their reflexes!",
    themeColor: "from-sky-500 to-blue-900",
    glowColor: "rgba(14, 165, 233, 0.6)",
    accentHex: "#0ea5e9",
    borderGlow: "shadow-[0_0_40px_rgba(14,165,233,0.45)]",
    stats: {
      strikingPower: 45,
      handSpeed: 96,
      chinDurability: 60,
      heightAdvantage: 30,
      runningSpeed: 99,
      agilityScore: 98,
      surpriseFactor: 90,
      firstRoundKOs: 4,
    },
    odds: {
      moneyline: +650,
      decimal: 7.50,
      impliedWinProb: "13.3%",
    },
    recentFights: [
      { opponent: "Rohan 'The Sleeper'", result: "WIN - KO Round 1 (Fast Counter)", event: "Hostel Brawl", title: "Junior Division" },
      { opponent: "Sameer (Civil Dept)", result: "WIN - Submission (Guillotine)", event: "Ground 2", title: "Inter-Dept Bout" },
      { opponent: "Aditya (Hostel Block B)", result: "WIN - KO Round 2 (Ankle Kick)", event: "Canteen War", title: "Featherweight" },
      { opponent: "Arman (Arm Wrestling)", result: "DRAW - Stalemate 2 minutes", event: "Canteen", title: "Legendary Clash" },
    ],
    strengths: [
      "5 solid career wins with 4 explosive knockouts under his belt",
      "Low center of gravity makes him tricky for tall fighters to target",
      "Lightning hand speed (96/100) — strikes before you blink",
      "Elite foot agility and quick slipping under heavy punches"
    ]
  }
};

export const TICKET_TIERS = [
  {
    id: "seminar-vip",
    name: "SEMINAR HALL FRONT ROW (SPLASH ZONE)",
    badge: "FRONT ROW ACTION",
    badgeColor: "bg-red-600 text-white",
    price: 150,
    originalPrice: 200,
    availableSeats: 4,
    totalSeats: 20,
    description: "Desk 1 right in front of the podium. Unfiltered view of Arman's power and Srichandan's counter-attacks.",
    features: [
      "Front-Row Bench Seat (Desk 1-2)",
      "Direct Line of Sight to the Heavyweight Faceoff",
      "High Energy Canteen Atmosphere",
      "Complimentary Hot Canteen Chai & Samosa",
      "Post-Fight Photo with Both Fighters"
    ],
    zone: "Front Row Desk 1",
    popular: true
  },
  {
    id: "seminar-middle",
    name: "MIDDLE BENCH (BALANCED VIEW)",
    badge: "POPULAR",
    badgeColor: "bg-amber-500 text-black",
    price: 80,
    originalPrice: 100,
    availableSeats: 16,
    totalSeats: 60,
    description: "Row 3-5 behind the projector screen. Perfect elevation to record fight videos for the college WhatsApp group.",
    features: [
      "Safe from Flying Chalk & Samosas",
      "Unobstructed Panoramic Sightline",
      "Priority Access to Video Highlights",
      "Free Samosa Coupon for Department Canteen"
    ],
    zone: "Middle Concourse",
    popular: false
  },
  {
    id: "back-bench",
    name: "BACK BENCHER BALCONY",
    badge: "FAN ZONE",
    badgeColor: "bg-zinc-700 text-zinc-200",
    price: 40,
    originalPrice: 50,
    availableSeats: 45,
    totalSeats: 100,
    description: "The loudest section in the Seminar Hall. Eat lunch with friends while cheering for your favorite fighter.",
    features: [
      "Freedom to Eat Tiffin During the Fight",
      "Cheer loudly with the hostel crowd",
      "Safe from Professor Inspection",
      "Digital Commemorative Meme Ticket"
    ],
    zone: "Last 2 Benches",
    popular: false
  },
  {
    id: "hostel-stream-pass",
    name: "HOSTEL LIVE STREAM PASS (WHATSAPP 4K)",
    badge: "HOSTEL ROOM",
    badgeColor: "bg-emerald-600 text-white",
    price: 20,
    originalPrice: 30,
    availableSeats: "Unlimited",
    totalSeats: "Hostel Wide",
    description: "Watch live from your hostel bed through someone's phone camera with background cheering audio.",
    features: [
      "Live Shaky Phone Stream with Unfiltered Hostel Commentary",
      "Immediate Meme Replays in Dept WhatsApp Group",
      "Zero Attendance Deduction Risk"
    ],
    zone: "Online Hostel Stream",
    popular: false
  }
];

export const BETTING_MARKETS = [
  {
    id: "moneyline",
    title: "MATCH WINNER (MONEYLINE)",
    category: "Main",
    options: [
      { id: "ml-arman", name: "Arman (The 6'7\" Behemoth)", odds: -950, decimal: 1.11, fighter: "arman" },
      { id: "ml-srichandan", name: "Srichandan (The 4-Foot Dynamo)", odds: +650, decimal: 7.50, fighter: "srichandan" }
    ]
  },
  {
    id: "method",
    title: "HOW WILL THE BOUT END?",
    category: "Specials",
    options: [
      { id: "meth-arman-ko", name: "Arman by Knockout (Heavy Right Hand)", odds: -220, decimal: 1.45, fighter: "arman" },
      { id: "meth-arman-tko", name: "Arman by TKO (Corner Throwing In Towel)", odds: +160, decimal: 2.60, fighter: "arman" },
      { id: "meth-sri-ko", name: "Srichandan by Surprise Counter KO (6th Win!)", odds: +700, decimal: 8.00, fighter: "srichandan" },
      { id: "meth-sri-dec", name: "Srichandan Out-Points Arman by Agility (Decision)", odds: +500, decimal: 6.00, fighter: "srichandan" },
      { id: "meth-prof-stop", name: "Fight stopped by HOD / Department Professor", odds: +180, decimal: 2.80, fighter: "neutral" },
    ]
  },
  {
    id: "rounds",
    title: "ROUND & TIME PROPS",
    category: "Rounds",
    options: [
      { id: "rnd-a-r1", name: "Arman finishes inside Round 1", odds: -140, decimal: 1.71, fighter: "arman" },
      { id: "rnd-s-r2", name: "Srichandan pushes fight into Round 2 or 3", odds: +160, decimal: 2.60, fighter: "srichandan" },
      { id: "rnd-distance", name: "Fight Goes Full 3 Rounds (War of Attrition)", odds: +320, decimal: 4.20, fighter: "neutral" },
      { id: "rnd-under-2m", name: "Total Fight Time: UNDER 2 Minutes", odds: -150, decimal: 1.67, fighter: "neutral" }
    ]
  },
  {
    id: "banter-props",
    title: "SEMINAR HALL BANTER SPECIALS",
    category: "Props",
    options: [
      { id: "prop-sri-hit", name: "Srichandan lands a clean punch on Arman's chin", odds: -110, decimal: 1.91, fighter: "srichandan" },
      { id: "prop-samosa-drop", name: "Someone in Front Row drops their canteen samosa", odds: -150, decimal: 1.67, fighter: "neutral" },
      { id: "prop-lift-up", name: "Arman lifts Srichandan off the floor", odds: -300, decimal: 1.33, fighter: "arman" },
      { id: "prop-viva-excuse", name: "Srichandan yells 'Bhai 2 baje Viva hai!'", odds: -350, decimal: 1.29, fighter: "srichandan" },
      { id: "prop-diptendu-ref", name: "Developer Diptendu Das steps in as Guest Referee", odds: -200, decimal: 1.50, fighter: "neutral" },
    ]
  }
];

export const UNDERCARD_FIGHTS = [
  {
    id: "co-main",
    division: "CO-MAIN EVENT - CANTEEN SAMOSA SPEED CONTEST",
    weightClass: "SNACK WEIGHT",
    f1: { name: "SUBHAM 'THE VACUUM'", nickname: "6 SAMOSAS IN 1 MIN", record: "14-0", flag: "🥟", odds: "-220" },
    f2: { name: "PRITAM 'THE SLOW CHEWER'", nickname: "CHAI DIPPER", record: "8-2", flag: "☕", odds: "+180" },
    status: "3 ROUNDS",
    hype: "High stakes canteen feud over the last hot samosa plate."
  },
  {
    id: "feature-1",
    division: "LAB RECORD SIGNATURE RACE",
    weightClass: "SUBMISSION SPRINT",
    f1: { name: "ROHIT (LATE SUBMISSION)", nickname: "PRINTS AT 12:59 PM", record: "2-12", flag: "📄", odds: "+190" },
    f2: { name: "ANIKET (TOPPER PRIVILEGE)", nickname: "SIGNED 2 DAYS AGO", record: "15-0", flag: "🖋️", odds: "-250" },
    status: "1 ROUND",
    hype: "Who gets the Professor's signature before the 1:00 PM bell?"
  }
];

export const PRESS_QUOTES = [
  {
    speaker: "Arman (6'7\" Goliath)",
    corner: "red",
    quote: "Srichandan has won 5 fights before, but facing 6'7\" power is a whole different beast.",
    timestamp: "Hostel Corridor Press Conference"
  },
  {
    speaker: "Srichandan (4'0\" Dynamo)",
    corner: "blue",
    quote: "People underestimate me because of my 4-foot height, but I have 5 wins and 4 KOs. Speed beats power!",
    timestamp: "Department Canteen Interview"
  },
  {
    speaker: "Diptendu Das (Lead Developer & Matchmaker)",
    corner: "gold",
    quote: "6'7\" Behemoth vs 4'0\" Lightning Dynamo. This will be the most talked-about lunch break in Electrical history.",
    timestamp: "Official Developer Statement"
  }
];
