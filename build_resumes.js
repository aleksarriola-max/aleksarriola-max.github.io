const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, BorderStyle, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

// ─── Shared helpers ────────────────────────────────────────────────────────
const NAVY = "1F3864";
const GOLD = "B8860B";
const DARK = "1A1A1A";
const GRAY = "555555";

const NAME_SIZE = 32;
const SECTION_SIZE = 22;
const BODY_SIZE = 20;
const SMALL_SIZE = 18;

const sectionDivider = (title) => [
  new Paragraph({
    spacing: { before: 160, after: 40 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 } },
    children: [new TextRun({ text: title.toUpperCase(), bold: true, size: SECTION_SIZE, color: NAVY, font: "Arial" })]
  })
];

const bullet = (text, bold_part = null) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 20, after: 20 },
  children: bold_part
    ? [new TextRun({ text: bold_part, bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
       new TextRun({ text: text, size: BODY_SIZE, color: DARK, font: "Arial" })]
    : [new TextRun({ text, size: BODY_SIZE, color: DARK, font: "Arial" })]
});

const roleHeader = (title, company, location, dates) => new Paragraph({
  spacing: { before: 100, after: 20 },
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
  children: [
    new TextRun({ text: `${title}  ·  ${company}`, bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
    new TextRun({ text: `\t${location}  ·  ${dates}`, size: SMALL_SIZE, color: GRAY, font: "Arial" })
  ]
});

const projectLine = (name, stack, desc) => [
  new Paragraph({
    spacing: { before: 100, after: 20 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: name, bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
      new TextRun({ text: `\t${stack}`, size: SMALL_SIZE, color: GRAY, font: "Arial" })
    ]
  }),
  ...desc.map(d => bullet(d))
];

const clientLine = (name, desc) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 20, after: 20 },
  children: [
    new TextRun({ text: `${name}  — `, bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
    new TextRun({ text: desc, size: BODY_SIZE, color: DARK, font: "Arial" })
  ]
});

const NUMBERING = {
  config: [{
    reference: "bullets",
    levels: [{
      level: 0, format: LevelFormat.BULLET, text: "•",
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 360, hanging: 180 } } }
    }]
  }]
};

const PAGE_PROPS = {
  page: {
    size: { width: 12240, height: 15840 },
    margin: { top: 864, right: 1008, bottom: 864, left: 1008 }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE RESUME
// ─────────────────────────────────────────────────────────────────────────────
const financeDoc = new Document({
  numbering: NUMBERING,
  styles: {
    default: { document: { run: { font: "Arial", size: BODY_SIZE, color: DARK } } }
  },
  sections: [{
    properties: { page: PAGE_PROPS.page },
    children: [
      // Name
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: "ALEKS GABRIEL ARRIOLA SOSA", bold: true, size: NAME_SIZE, color: NAVY, font: "Arial" })]
      }),
      // Contact
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "Cambridge, MA  ·  +1 (617) 256-0881  ·  aleksarriola@gmail.com  ·  linkedin.com/in/aleks-arriola", size: SMALL_SIZE, color: GRAY, font: "Arial" })]
      }),

      // EDUCATION
      ...sectionDivider("Education"),
      new Paragraph({
        spacing: { before: 80, after: 20 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: "Hult International Business School  ·  BBA, Double Major: Finance & Marketing", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "\tBoston, MA  ·  Expected May 2027", size: SMALL_SIZE, color: GRAY, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 20 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: "Colegio Interamericano  ·  International Baccalaureate Diploma", size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "\tGuatemala City  ·  May 2023", size: SMALL_SIZE, color: GRAY, font: "Arial" })
        ]
      }),

      // FLAGSHIP PROJECTS
      ...sectionDivider("Flagship Projects"),
      ...projectLine(
        "Company Health Red-Flag Scanner",
        "Python · Excel · SEC EDGAR API · 2025–Present",
        [
          "Built an institutional-grade screening tool analyzing 600+ US-listed companies using live SEC EDGAR XBRL data — the type of system typically reserved for hedge funds and forensic accounting teams.",
          "Runs 11 academic models (Altman Z-Score, Beneish M-Score, Piotroski F-Score, Dechow F-Score, Montier C-Score + more) producing a composite Health Score and auto-generated fraud risk card per company.",
          "Fully automated pipeline recalculates 80 financial ratios and 45 input variables per company on each new 10-K filing. Zero manual updates."
        ]
      ),
      ...projectLine(
        "PitMind",
        "Live Deployed Web App · Python · Streamlit · 2025",
        ["Designed and deployed a fully functional financial web application from scratch; live at pitmind-bvihgej8qmkzrergphk4xb.streamlit.app."]
      ),

      // EXPERIENCE
      ...sectionDivider("Professional Experience"),
      roleHeader("Finance Intern", "The 1525", "Remote", "May 2026 – Sep 2026"),
      bullet("Supporting fundraising efforts and creating financial models and investor documents for portfolio companies."),
      bullet("Building pitch decks and assisting with new client acquisition strategy under direct supervision of the Director."),

      roleHeader("Digital Marketing Intern", "Western Union", "Guatemala City", "Jun – Aug 2024"),
      bullet("Supported the Digital Marketing Director executing multi-channel campaigns — billboard placements, print collateral, and digital brand awareness across a regional central agency."),

      roleHeader("Client Specialist", "SeOnline", "Guatemala City", "May – Aug 2025"),
      bullet("Managed full sales lifecycle from outreach to contract close; redesigned client-onboarding system boosting process efficiency by 35%."),

      // SELECTED FINANCE PROJECTS
      ...sectionDivider("Selected Finance Projects"),
      clientLine("AeroShield", "Designed a 19-sheet KPI dashboard for a manufacturer scaling 6→300 units/week; identified top bottleneck and projected $40–80K annual savings with ~12-month payback."),
      clientLine("Jet Rose", "Built full US market entry strategy for a European private aviation broker: self-funded growth model, competitive positioning, and $99/month membership pricing framework."),
      clientLine("Coachella TikTok Analysis", "Built predictive attention framework in R analyzing 1,351 TikTok videos with 3 regression models and Z-Score early warning signals for viral content."),

      // SKILLS
      ...sectionDivider("Skills & Technologies"),
      new Paragraph({
        spacing: { before: 60, after: 20 },
        children: [
          new TextRun({ text: "Finance:  ", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "DCF Modeling, Financial Statement Analysis, Altman Z-Score, Beneish M-Score, Piotroski F-Score, Sensitivity Analysis, Fundraising Support, Investor Document Preparation", size: BODY_SIZE, color: DARK, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({ text: "Programming & Analytics:  ", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "Python (SEC EDGAR API, Automation), R (Regression, Statistical Modeling), Excel (Advanced), Power BI, Bloomberg Terminal (Certified), Streamlit", size: BODY_SIZE, color: DARK, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({ text: "Languages:  ", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "English (Fluent)  ·  Spanish (Native)", size: BODY_SIZE, color: DARK, font: "Arial" })
        ]
      }),

      // CERTIFICATIONS
      ...sectionDivider("Certifications"),
      new Paragraph({
        spacing: { before: 60, after: 20 },
        children: [new TextRun({ text: "38 Forage Simulations  (Goldman Sachs, Citi, Bank of America, BCG, Bloomberg, Wells Fargo, Mastercard, Fidelity International, AIG & more)  ·  6 Coursera Courses  (Wharton Financial Accounting, U of Michigan EQ, Power BI & more)", size: SMALL_SIZE, color: DARK, font: "Arial" })]
      }),
    ]
  }]
});

// ─────────────────────────────────────────────────────────────────────────────
// MARKETING RESUME
// ─────────────────────────────────────────────────────────────────────────────
const marketingDoc = new Document({
  numbering: NUMBERING,
  styles: {
    default: { document: { run: { font: "Arial", size: BODY_SIZE, color: DARK } } }
  },
  sections: [{
    properties: { page: PAGE_PROPS.page },
    children: [
      // Name
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: "ALEKS GABRIEL ARRIOLA SOSA", bold: true, size: NAME_SIZE, color: NAVY, font: "Arial" })]
      }),
      // Contact
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "Cambridge, MA  ·  +1 (617) 256-0881  ·  aleksarriola@gmail.com  ·  linkedin.com/in/aleks-arriola", size: SMALL_SIZE, color: GRAY, font: "Arial" })]
      }),

      // EDUCATION
      ...sectionDivider("Education"),
      new Paragraph({
        spacing: { before: 80, after: 20 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: "Hult International Business School  ·  BBA, Double Major: Finance & Marketing", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "\tBoston, MA  ·  Expected May 2027", size: SMALL_SIZE, color: GRAY, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 20 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: "Colegio Interamericano  ·  International Baccalaureate Diploma", size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "\tGuatemala City  ·  May 2023", size: SMALL_SIZE, color: GRAY, font: "Arial" })
        ]
      }),

      // FLAGSHIP PROJECTS
      ...sectionDivider("Flagship Projects"),
      ...projectLine(
        "PitMind",
        "Live Deployed Web App · Python · Streamlit · 2025",
        ["Designed and built a fully functional web application from scratch and deployed it live — demonstrating end-to-end product development and digital execution skills."]
      ),
      ...projectLine(
        "Coachella TikTok Virality Analysis",
        "R · Statistical Modeling · 2025",
        [
          "Built a predictive attention framework analyzing 1,351 TikTok videos with 3 regression models to identify early virality signals — quantifying what makes content break through at scale.",
          "Produced Z-Score early warning indicators and actionable recommendations for content strategy and timing."
        ]
      ),

      // EXPERIENCE
      ...sectionDivider("Professional Experience"),
      roleHeader("Digital Marketing Intern", "Western Union", "Guatemala City", "Jun – Aug 2024"),
      bullet("Worked directly under the Digital Marketing Director supporting multi-channel brand campaigns — billboard placements, print collateral, and digital brand awareness across a regional central agency."),
      bullet("Coordinated cross-functional execution across creative, media, and operations teams for a globally recognized financial brand."),

      roleHeader("Client Specialist", "SeOnline", "Guatemala City", "May – Aug 2025"),
      bullet("Owned full sales lifecycle from outreach to contract close for a digital services company; redesigned client-onboarding workflow boosting efficiency by 35%."),
      bullet("Built and managed client relationships, handled contract negotiations, and developed closing strategies for new accounts."),

      // SELECTED MARKETING PROJECTS
      ...sectionDivider("Selected Marketing & Strategy Projects"),
      clientLine("GLP-1 Revolution", "Conducted full market research and competitive analysis of the GLP-1 drug category; mapped influencer landscape and consumer behavior shifts driving the $50B+ market."),
      clientLine("Explurger (US Launch)", "Delivered a 3-phase US market entry roadmap for a gamified travel app: influencer seeding → city-by-city expansion → airport advertising, with full conversion funnel and channel strategy."),
      clientLine("Jet Rose (US Expansion)", "Built US market entry strategy for a European private aviation brand: brand positioning, competitive analysis, and $99/month membership pricing framework."),
      clientLine("Far Out Ice Cream", "Developed brand strategy and go-to-market plan for a challenger CPG brand entering a competitive retail environment."),

      // SKILLS
      ...sectionDivider("Skills & Technologies"),
      new Paragraph({
        spacing: { before: 60, after: 20 },
        children: [
          new TextRun({ text: "Marketing:  ", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "Brand Strategy, Go-to-Market Planning, Multi-Channel Campaign Execution, Influencer Marketing, Content Strategy, Market Research, Consumer Behavior Analysis, Competitive Analysis", size: BODY_SIZE, color: DARK, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({ text: "Analytics & Tools:  ", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "R (Regression Modeling), Power BI, Python, Excel (Advanced), Canva, Streamlit", size: BODY_SIZE, color: DARK, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({ text: "Languages:  ", bold: true, size: BODY_SIZE, color: DARK, font: "Arial" }),
          new TextRun({ text: "English (Fluent)  ·  Spanish (Native)", size: BODY_SIZE, color: DARK, font: "Arial" })
        ]
      }),

      // CERTIFICATIONS
      ...sectionDivider("Certifications"),
      new Paragraph({
        spacing: { before: 60, after: 20 },
        children: [new TextRun({ text: "38 Forage Simulations  (BCG, Mastercard, Goldman Sachs, Bank of America, Bloomberg & more)  ·  6 Coursera Courses  (Imperial College Creative Thinking, U of Michigan EQ, Power BI, MoMA Modern Art & more)", size: SMALL_SIZE, color: DARK, font: "Arial" })]
      }),
    ]
  }]
});

// Write both files
Packer.toBuffer(financeDoc).then(buf => {
  fs.writeFileSync('/sessions/admiring-zealous-hawking/mnt/outputs/Aleks_Arriola_Resume_Finance.docx', buf);
  console.log('Finance resume written.');
});
Packer.toBuffer(marketingDoc).then(buf => {
  fs.writeFileSync('/sessions/admiring-zealous-hawking/mnt/outputs/Aleks_Arriola_Resume_Marketing.docx', buf);
  console.log('Marketing resume written.');
});
