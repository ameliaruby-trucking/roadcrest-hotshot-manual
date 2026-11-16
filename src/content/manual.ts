export const desks = ["manual", "rates", "weight", "secure", "launch"] as const;
export type Desk = (typeof desks)[number];

export const deskMeta: Record<Desk, { label: string; short: string }> = {
  manual: { label: "Manual", short: "Read" },
  rates: { label: "Rate desk", short: "Rates" },
  weight: { label: "Weight line", short: "Weight" },
  secure: { label: "Securement", short: "Straps" },
  launch: { label: "Launch list", short: "Launch" },
};

export const FACEBOOK_CAPTION = `Save this if you’re getting into hotshot.

Roadcrest Logistics turned the owner-operator handbook into a phone desk you can run before you book a load:

→ The 26,001 lb line (CDL vs non-CDL)
→ Your real cost per mile, deadhead included
→ How many straps the freight actually needs
→ The filing order that gets authority active
→ The six rules that keep year one from going broke

New drivers: run your numbers before you say yes.
Followers: send this to somebody buying their first truck.`;

type Callout = { type: "callout"; tone: "rule" | "warn" | "go"; title: string; text: string };
type Paragraph = { type: "p"; text: string };
type ListBlock = { type: "list"; items: { title: string; text: string }[] };
type Compare = { type: "compare"; rows: { factor: string; non: string; cdl: string }[] };
type TableBlock = { type: "table"; headers: [string, string, string]; rows: [string, string, string][] };
type Steps = { type: "steps"; items: { title: string; text: string }[] };
type Jump = { type: "jump"; desk: Desk; label: string };

export type Block = Paragraph | Callout | ListBlock | Compare | TableBlock | Steps | Jump;

export type Chapter = {
  id: string;
  numeral: string;
  title: string;
  lede: string;
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    id: "weight",
    numeral: "01",
    title: "The line is on the doorjamb, not the scale",
    lede: "Federal rules judge the combination by manufacturer GVWR. One pound over 26,000 combined, with a trailer over 10,000, and you are a Class A operation.",
    blocks: [
      {
        type: "callout",
        tone: "rule",
        title: "Core rule",
        text: "Gross Vehicle Weight Rating is stamped on the truck doorjamb and the trailer neck. What the cat scale says today does not decide your license, IFTA, IRP, or drug-testing duty.",
      },
      {
        type: "p",
        text: "Under 49 CFR § 383.91, a Class A CDL is required for a combination with a GCWR of 26,001 lbs or more when the towed unit is rated 10,001 lbs or more. Almost every commercial gooseneck is 14,000 lbs or higher, so the truck’s sticker is what picks your side of the line.",
      },
      {
        type: "compare",
        rows: [
          {
            factor: "Typical truck",
            non: "Class 2b ¾-ton, or a derated 1-ton, at 10,000 lbs GVWR. Ram 2500 or F-250 diesel.",
            cdl: "Class 3 dually at 14,000 lbs, or a Class 4/5 chassis cab. F-350, Ram 3500, F-450/550.",
          },
          {
            factor: "Typical trailer",
            non: "14,000 to 16,000 lbs. Tandem 7k or 8k axles. A 15,900 or 16,000 trailer on a 10,000 truck sits at 25,900–26,000.",
            cdl: "20,000 to 25,900 lbs. Tandem 10k or 12k dual-wheel axles.",
          },
          {
            factor: "Legal payload band",
            non: "About 7,500 to 9,200 lbs of cargo.",
            cdl: "About 13,000 to 18,500+ lbs of cargo.",
          },
          {
            factor: "IRP plates",
            non: "Not required. A standard commercial state plate.",
            cdl: "Mandatory for interstate travel over 26,000 lbs, or 3+ power-unit axles.",
          },
          {
            factor: "IFTA fuel tax",
            non: "Not required for a 2-axle power unit at or under 26,000 lbs.",
            cdl: "Quarterly mileage and fuel-purchase reports.",
          },
          {
            factor: "Drug & alcohol",
            non: "Exempt from the Clearinghouse and random consortium.",
            cdl: "Pre-employment test, random consortium, and a Clearinghouse query. You are both employer and driver.",
          },
          {
            factor: "Freight you can actually take",
            non: "Lighter partials, cars, small machinery. More trucks chasing the same loads.",
            cdl: "Heavy equipment, oilfield pipe, multi-pallet LTL, and the higher-paying board.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Trim eats payload",
        text: "A loaded ¾-ton crew cab in a high trim can weigh 8,000 lbs empty. That leaves almost no tongue-weight margin. Buy the work trim — Tradesman, XL — not the luxury package.",
      },
      {
        type: "jump",
        desk: "weight",
        label: "Add your two stickers on the weight desk",
      },
    ],
  },
  {
    id: "path",
    numeral: "02",
    title: "Your numbers, or a carrier’s",
    lede: "Own authority keeps 100% of the linehaul and all of the paperwork. Leasing on trades a cut of gross for insurance, freight, and a driving record you can survive year one on.",
    blocks: [
      {
        type: "list",
        items: [
          {
            title: "Own authority",
            text: "You hold the USDOT and MC, buy primary liability, and deal with brokers yourself. First-year premiums often land at $1,200–$2,500 a month. Broker credit commonly takes 30–45 days. You keep every dollar of linehaul — and every compliance miss.",
          },
          {
            title: "Lease on",
            text: "You run under a carrier’s authority and their primary policy. Typical split is 75–88% to the truck; the carrier keeps 12–25% for dispatch, insurance admin, and factoring. You get freight and a policy without the new-venture down payment, and you start a verifiable commercial history.",
          },
        ],
      },
      {
        type: "callout",
        tone: "go",
        title: "When leasing is the adult decision",
        text: "If the cash reserve is thin and you do not already have a commercial driving record, leasing on is how you learn the board without insuring a brand-new authority at new-venture rates. Own authority is a second step, not a personality.",
      },
    ],
  },
  {
    id: "filings",
    numeral: "03",
    title: "Eight filings, in this order",
    lede: "A name that does not match — state filing, IRS letter, FMCSA application — stalls authority and costs an amendment. Do not skip ahead.",
    blocks: [
      {
        type: "steps",
        items: [
          {
            title: "Form the entity",
            text: "LLC or corporation with your Secretary of State. Clean name, no collision with a carrier already on the road. Keep the stamped Articles and write an operating agreement.",
          },
          {
            title: "Get the EIN yourself",
            text: "Free on the IRS site. Do not pay a filing mill. The legal name on the CP 575 must match the state filing letter for letter.",
          },
          {
            title: "Bank account and a real address",
            text: "Business checking in the entity’s name. FMCSA wants a physical location. Plenty of insurers and brokers reject a P.O. box or a virtual mailbox as the primary address.",
          },
          {
            title: "USDOT and MC",
            text: "File in the FMCSA Unified Registration System as a for-hire interstate carrier if you will cross state lines. The USDOT posts immediately at no charge. Interstate MC authority is a non-refundable $300.",
          },
          {
            title: "Protest window and BMC-91",
            text: "After the MC filing there is a mandatory 20-to-25-day vetting window. Your insurer must transmit BMC-91 or BMC-91X electronically. Authority stays Inactive until that filing posts.",
          },
          {
            title: "BOC-3",
            text: "A process-agent blanket company files this for you, one agent in every state. One-time, about $40–$75. You cannot file it yourself.",
          },
          {
            title: "UCR",
            text: "Annual Unified Carrier Registration before you cross a state line. The 0–2 vehicle bracket is $46.",
          },
          {
            title: "State miles and intrastate",
            text: "Freight that starts and ends in one state needs that state’s intrastate authority. Before you roll into Kentucky, New Mexico, New York, or Oregon, open the weight-distance account: KYU, WDT, HUT, Weight-Mile.",
          },
        ],
      },
      {
        type: "jump",
        desk: "launch",
        label: "Work the launch list and check them off",
      },
    ],
  },
  {
    id: "equipment",
    numeral: "04",
    title: "Buy a revenue tool, not a lifestyle truck",
    lede: "Gasoline will not do this job. You want a heavy-duty turbo-diesel, a factory exhaust brake, and a transmission built to tow every week — then a trailer whose axles match the license you chose.",
    blocks: [
      {
        type: "list",
        items: [
          {
            title: "Non-CDL truck",
            text: "Ram 2500 with the 6.7 Cummins, or F-250 with the 6.7 Power Stroke, stickered at exactly 10,000 lbs GVWR. Pair it with a 15,900 or 16,000 lb trailer and you use the legal payload without crossing the line.",
          },
          {
            title: "Ram CDL",
            text: "3500 dually, or 4500/5500 chassis cab. 6.7 Cummins High Output and the Aisin AS69RC. 4.10 gears if you live in the mountains with 15,000+ lbs. 3.73 if the work is flat highway.",
          },
          {
            title: "Ford CDL",
            text: "F-350 dually, or F-450/F-550. 6.7 Power Stroke and the TorqShift 10-speed. The F-450’s wide-track axle turns tighter and the 19.5-inch commercial tires are built for 80,000+ miles a set.",
          },
          {
            title: "GM CDL",
            text: "Silverado or Sierra 3500HD dually. 6.6 Duramax L5P and the Allison 10-speed. Independent front suspension rides quieter; emissions hardware has a decent service record.",
          },
        ],
      },
      {
        type: "p",
        text: "Upfits that earn their keep: a DOT-legal in-bed diesel transfer tank, 50–100 gallons, tied into the main tank so you can buy fuel in cheaper states; a turnover-ball gooseneck hitch rated 30,000 lbs; a 7-way plug in the bed wall; rear air-ride bags so the headlights stay aimed under tongue weight.",
      },
      {
        type: "table",
        headers: ["Spec", "Standard", "Why it matters"],
        rows: [
          ["Deck", "40 ft × 102 in. 35+5 dovetail, or a straight 40.", "Two 20-ft containers, three vehicles, or 18–20 pallets."],
          ["Frame", "12-inch I-beam, 14 or 19 lb/ft, with a torque tube.", "Stops twist and deck bow under a machine sitting on a small footprint."],
          ["Pierced option", "Crossmembers pierced, deck at 32–34 in.", "Lower center of gravity, and you still clear a 13 ft 6 in bridge."],
          ["Axles", "7k/8k single for non-CDL. 10k/12k dual, air or Hutch, for CDL.", "The axle rating is the GVWR. Oil-bath hubs fail less often."],
          ["Ramps", "Full-width, spring-assisted, fold-flat mega ramps.", "Equipment drives on. Long freight can ride over the tail."],
          ["Tie points", "Stake pockets every 24 in, plus a sliding winch track.", "A place for a 4-inch strap anywhere along the rail."],
        ],
      },
      {
        type: "p",
        text: "Brands with a shop history: PJ (LS, LD), Big Tex (14GN, 22GN), Load Trail (GP, GQ), MAXX-D (LDX, YDX), Diamond C (FMAX), Caliber. On a used neck, look at weld penetration on the gooseneck gussets, prefer electric-over-hydraulic disc brakes once you are at CDL weights, and test the breakaway battery.",
      },
    ],
  },
  {
    id: "insurance",
    numeral: "05",
    title: "Insurance is the rent, not a line item",
    lede: "Under 24 months of authority you are a new venture. Expect a 300–500 mile radius unless you already hold CDL experience, and a down payment of 15–25% of the annual premium.",
    blocks: [
      {
        type: "table",
        headers: ["Coverage", "Limit to quote", "What it is actually for"],
        rows: [
          ["Primary auto liability", "$1,000,000 CSL", "FMCSA’s floor is $750,000. Almost every broker wants a million combined."],
          ["Motor truck cargo", "$100,000", "Their freight, in your care. Read the holes: unattended truck, tarp failure, used autos."],
          ["Physical damage", "Stated value", "Your truck and trailer. Required if it is financed. Roughly 3–5% of stated value."],
          ["General liability", "$1M / $2M", "The dock you clip, the door you take out. Not a driving loss."],
          ["Non-trucking / bobtail", "$1,000,000", "Personal miles while you are leased on and off dispatch."],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Quote the VIN before you sign",
        text: "Get a bindable quote on the exact truck and trailer VINs before the purchase contract. Underwriters price the driver MVR, the garaging ZIP, credit, and what the unit is worth. A surprise at the finance office is how people buy a truck they cannot insure.",
      },
    ],
  },
  {
    id: "compliance",
    numeral: "06",
    title: "The cab file, the clock, and the audit",
    lede: "Interstate, 10,001 lbs or more — CDL or not — you are an FMCSA carrier. Roadside inspections apply. A new entrant safety audit shows up inside 12 months.",
    blocks: [
      {
        type: "list",
        items: [
          {
            title: "Med card",
            text: "CDL and non-CDL interstate drivers. Exam by a clinician on the National Registry, good for up to 24 months. CDL holders self-certify and file the card with the state DMV.",
          },
          {
            title: "Driver qualification file",
            text: "Even a one-truck operation keeps a DQ file under Part 391: application (3 years, 10 if CDL), initial and annual MVR, license, med card, road-test certificate or a copy of the CDL, and a yearly list of violations.",
          },
          {
            title: "Annual inspection",
            text: "Truck and trailer, 49 CFR § 396.17, by a qualified inspector. Report in the cab. Decal on each unit.",
          },
          {
            title: "IRP and IFTA, CDL only",
            text: "Apportioned cab card listing states and provinces, plus quarterly fuel decals. Odometer and fuel receipts by state, every day you run.",
          },
          {
            title: "Clearinghouse, CDL only",
            text: "Join a consortium. Register as employer and as driver. Negative pre-employment test before the first CDL mile.",
          },
        ],
      },
      {
        type: "callout",
        tone: "rule",
        title: "Hours of Service",
        text: "Interstate property, over 10,000 lbs: Part 395, on a registered ELD. The short-haul exception is a 150-air-mile radius and a return inside 14 hours — not “I stay local most days.”",
      },
      {
        type: "list",
        items: [
          {
            title: "11-hour drive",
            text: "11 hours of driving after 10 consecutive hours off.",
          },
          {
            title: "14-hour window",
            text: "No driving after the 14th hour from coming on duty. Off-duty breaks do not pause it.",
          },
          {
            title: "30-minute break",
            text: "After 8 hours of driving time. Off duty, sleeper, or on duty not driving.",
          },
          {
            title: "60 / 70",
            text: "60 hours in 7 days, or 70 in 8. A 34-hour restart resets the cycle.",
          },
          {
            title: "No fake sleeper",
            text: "A pickup rear seat is not a sleeper berth. § 393.76 wants dimensions, a mattress, and an opening. Without a certified conversion, off-duty time is a hotel or home — log it that way.",
          },
        ],
      },
    ],
  },
  {
    id: "cargo",
    numeral: "07",
    title: "Tie it for the regulation, not for the photo",
    lede: "A bad securement is a fast out-of-service and a CSA hit. Part 393: the aggregate working load limit of your tie-downs must be at least half the weight of the cargo.",
    blocks: [
      {
        type: "list",
        items: [
          {
            title: "5 feet or shorter, 1,100 lbs or less",
            text: "One tie-down.",
          },
          {
            title: "5 feet or shorter, over 1,100 lbs",
            text: "Two tie-downs.",
          },
          {
            title: "Longer than 5, up to 10 feet",
            text: "Two tie-downs, whatever it weighs.",
          },
          {
            title: "Longer than 10 feet",
            text: "Two for the first 10 feet, plus one more for every extra 10 feet or part of 10.",
          },
          {
            title: "Wheeled machine over 10,000 lbs",
            text: "Four separate chains and binders, front and rear, each on its own frame point. Never one chain looped through two points. Add another tie-down for a boom or bucket.",
          },
        ],
      },
      {
        type: "p",
        text: "Budget $2,500–$3,800 before the first load. 4-inch winch straps are 5,400 lbs WLL; a 3/8-inch Grade 70 chain is 6,600. Use ratchet binders, not lever binders — the snap-back is how people lose teeth. Edge protectors are not optional on steel and lumber; DOT will write it.",
      },
      {
        type: "jump",
        desk: "secure",
        label: "Count the tie-downs for a piece of freight",
      },
    ],
  },
  {
    id: "money",
    numeral: "08",
    title: "Know the floor before you touch the board",
    lede: "Most new hotshots do not starve for freight. They haul under their cost until the note and the insurance eat the truck. DAT, Truckstop, Central Dispatch — none of them know your number. You do.",
    blocks: [
      {
        type: "callout",
        tone: "rule",
        title: "The formula",
        text: "All-in cost per mile = (monthly fixed ÷ monthly miles) + fuel per mile + maintenance per mile + the wage you pay yourself. Deadhead miles are in the denominator when you price a load, not a footnote.",
      },
      {
        type: "table",
        headers: ["Cost", "Working range", "How to hold it"],
        rows: [
          ["Truck and trailer notes", "$1,400–$2,400 / mo", "Work trim. Do not finance a luxury cab to feel like an owner."],
          ["Commercial insurance", "$1,200–$2,300 / mo", "Drops in year two with a clean MVR and zero cargo claims."],
          ["ELD, boards, books", "$200–$350 / mo", "One ELD, one board you actually use, one set of books."],
          ["Diesel, loaded 8–11 mpg", "$0.35–$0.52 / mi", "TCS, EFS, Mudflap. $0.30–$0.70 a gallon is real money at 9,000 miles."],
          ["Maintenance and tires", "$0.15–$0.22 / mi", "Move it to a separate account every week. Oil, DEF, rubber."],
          ["Your wage", "$0.55–$0.75 / mi", "Pay yourself apart from profit. Profit is not groceries."],
        ],
      },
      {
        type: "p",
        text: "The handbook’s worked floor: $3,200 fixed over 9,000 miles is $0.36, plus $0.42 fuel, $0.18 maintenance, and $0.60 wage. That is $1.56 per all-in mile, empty miles included. A $900 load for 450 loaded miles looks like $2.00 until you add 150 miles of deadhead. Then it is $1.50. Under the floor. Leave it.",
      },
      {
        type: "list",
        items: [
          {
            title: "Keep $15,000–$25,000 liquid",
            text: "Fuel, rooms, and the tire shop want money today. Brokers pay net-30. Undercapitalized drivers take cheap freight or a factor that keeps a brutal cut.",
          },
          {
            title: "Vet the broker before you load",
            text: "Credit tool on the board, and an active bond on the FMCSA licensing and insurance site. Under an 85 credit score, or slower than 35 days, do not haul it unless non-recourse factoring is already confirmed.",
          },
          {
            title: "Stack partials",
            text: "One light load at $1.50 is a hobby. A 12-foot skid, two pallets, and a compact tractor on the same corridor can gross $3.00-plus a mile. Compatibility and securement still come first.",
          },
          {
            title: "Price hub to hub",
            text: "Revenue divided by loaded miles plus deadhead. Always. The board’s “rate per mile” is marketing.",
          },
          {
            title: "Mark the bill before you sign",
            text: "Four sides, photos, and every scratch, dent, rust spot, or torn wrap written on the shipper’s BOL. A clean signature makes pre-existing damage yours at delivery.",
          },
          {
            title: "Do not drive into a hole",
            text: "South Florida, northern Maine, remote mountain states — check the outbound board before you accept the inbound. A pretty rate that strands you 400 miles from freight is a loss.",
          },
        ],
      },
      {
        type: "jump",
        desk: "rates",
        label: "Put your own floor on the rate desk",
      },
    ],
  },
];

export const gearItems: { id: string; name: string; spec: string; note: string }[] = [
  {
    id: "winch",
    name: "4-inch winch straps",
    spec: "12–16 straps, 30 ft, flat hooks, plus a winch bar",
    note: "5,400 lbs WLL each. They live on the sliding track.",
  },
  {
    id: "ratchet",
    name: "2-inch ratchet straps",
    spec: "8–10 straps, 27 ft, J-hooks or flat hooks",
    note: "3,333 lbs WLL. Pallets, crates, dunnage — not the machine.",
  },
  {
    id: "chain",
    name: "Chains and binders",
    spec: "6–8 Grade 70, 3/8 in × 20 ft, ratchet binders",
    note: "6,600 lbs WLL. Leave lever binders in the store.",
  },
  {
    id: "tarps",
    name: "Tarps and bungees",
    spec: "2 lumber tarps 16×24 with 8 ft drop, 2 steel tarps, 100 bungees",
    note: "Lumber, machines, and steel that cannot see rain.",
  },
  {
    id: "edge",
    name: "Edge protectors and dunnage",
    spec: "24 plastic or felt corners, 8 hardwood 4×4×8 timbers",
    note: "Sharp edges cut straps. DOT treats that as a violation.",
  },
  {
    id: "safety",
    name: "DOT emergency kit",
    spec: "10-lb BC extinguisher mounted, 3 triangles, spare fuses",
    note: "Add wheel chocks, a gladhand / 7-way tester, and a high-vis vest.",
  },
  {
    id: "road",
    name: "Roadside kit",
    spec: "20-ton bottle jack, 1/2 in impact, spare hub, two spare tires",
    note: "Blowouts and wheel bearings are the downtime that actually happens.",
  },
];

export const launchItems: { id: string; phase: string; title: string; text: string }[] = [
  {
    id: "vin",
    phase: "Before you buy",
    title: "Bindable insurance quote on the real VINs",
    text: "MVR, ZIP, credit, and stated value. If the quote does not work, the truck does not work.",
  },
  {
    id: "cash",
    phase: "Before you buy",
    title: "Cash reserve of $15,000–$25,000",
    text: "Separate from the down payment. This is fuel, rooms, and the first repair while brokers are still on net-30.",
  },
  {
    id: "entity",
    phase: "Entity",
    title: "LLC or corporation filed",
    text: "Stamped articles in hand. Operating agreement written. Name checked against carriers already running.",
  },
  {
    id: "ein",
    phase: "Entity",
    title: "EIN from the IRS, free",
    text: "CP 575 name matches the state filing exactly.",
  },
  {
    id: "bank",
    phase: "Entity",
    title: "Business checking and a physical address",
    text: "No P.O. box as the FMCSA primary location.",
  },
  {
    id: "usdot",
    phase: "Federal",
    title: "USDOT and MC application",
    text: "For-hire, interstate if you will cross lines. $300 MC fee. USDOT is immediate.",
  },
  {
    id: "bmc",
    phase: "Federal",
    title: "BMC-91 / 91X during the protest window",
    text: "20–25 days. Authority does not go Active until the insurer’s electronic filing posts.",
  },
  {
    id: "boc",
    phase: "Federal",
    title: "BOC-3 process agents",
    text: "Blanket company, about $40–$75. Not a DIY filing.",
  },
  {
    id: "ucr",
    phase: "Federal",
    title: "UCR paid",
    text: "$46 for a one- or two-truck fleet, before the first interstate mile.",
  },
  {
    id: "state",
    phase: "State",
    title: "Intrastate authority and mileage accounts",
    text: "Home state if you haul in-state. KYU, New Mexico WDT, New York HUT, Oregon weight-mile before you enter.",
  },
  {
    id: "med",
    phase: "Cab",
    title: "Med card and DQ file started",
    text: "National Registry exam. Application, MVR, license copy, road test or CDL copy.",
  },
  {
    id: "inspect",
    phase: "Cab",
    title: "Annual inspection on truck and trailer",
    text: "Report in the cab, decal on each unit. ELD mounted if you are outside the 150-air-mile exception.",
  },
];

export const handbookFloor = {
  fixed: 3200,
  miles: 9000,
  fuel: 0.42,
  maint: 0.18,
  wage: 0.6,
  pay: 900,
  loaded: 450,
  deadhead: 150,
};

export const stackExample = [
  { id: "skid", label: "12-ft skid", pay: 550 },
  { id: "pallets", label: "Two pallets", pay: 425 },
  { id: "tractor", label: "Compact tractor", pay: 525 },
];
