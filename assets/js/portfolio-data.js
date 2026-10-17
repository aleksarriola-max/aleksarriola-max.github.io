window.PORTFOLIO = (() => {
const L = (label, href) => ({ label, href });
const achievements = [
  { n: '01', kicker: '1st Place — Local AI Hackathon, Dell & NVIDIA', title: 'Lifeline', t: "Took 1st place among 40 teams at BuilderBase's Local AI Hackathon with Dell Technologies and NVIDIA — one of 150 builders selected for a single-day build on a Dell Pro Max with GB10. Co-engineered Lifeline, a geospatial disaster-triage agent running entirely on-device, with zero cloud dependency." },
  { n: '02', kicker: 'Most Innovative — IBM SkillsBuild AI Builders Challenge', title: 'PitMind', t: 'Won Most Innovative for PitMind, a telemetry-driven race-strategy simulator built on IBM Granite AI. Also engineered MatchMind, an explainable-AI system with a dual-layer hallucination firewall for evidentiary sports analysis, and StoryForge, a cryptographic provenance ledger for AI-assisted creative work, under the same IBM-sponsored cohort.' },
  { n: '03', kicker: 'IBM Bob AI Challenge', title: 'MissionMind', t: "Engineered MissionMind, an explainable-AI mission-control console for space operations — surfacing the evidentiary basis behind autonomous decisions so human operators can audit the system's reasoning, not just observe its output." },
];
const toolkit = ['Python', 'LangGraph / LLM Agents', 'Financial Modeling', 'DCF · LBO · Comps', 'SEC EDGAR / XBRL', 'Equity Research', 'Excel Automation', 'NumPy · SciPy', 'Streamlit', 'Sui · Move', 'Risk & Controls', 'Bloomberg Terminal', 'Bilingual (EN / ES)'];
const habits = [
  { n: '01', h: 'Deep work is scheduled, not scavenged', t: "I protect a block on my calendar before the week starts, like a meeting I can't move — not whatever's left over after classes and outreach. Deep, absorbed work only shows up on purpose when the slot was already decided in advance." },
  { n: '02', h: 'Rejections are data, not verdicts', t: "I track internship applications like a pipeline — sent, screened, interviewed, offered — and treat every rejection as a prompt to rewrite the weak line, the same night it lands, while the reason it didn't work is still fresh." },
  { n: '03', h: 'Treat it like drills, not reading', t: "Soccer taught me the drill: fail in public, immediately, then run it again. I build finance the same way — I've rebuilt the same DCF logic four times this month. If I can't reproduce a number without notes, I don't actually know it yet, no matter how well I explained it back five minutes ago." },
];
const featured = [
  { n: '02', kicker: 'Most Innovative · IBM SkillsBuild', title: 'PitMind', line: 'AI-powered F1 strategy platform with Fan and Engineer modes, using IBM Granite AI and 2025 live telemetry — making pit-wall analysis accessible worldwide.', specs: [{ k: 'Models', v: 'Driver Soul · Momentum · Race Forecast' }, { k: 'Stack', v: 'Python · Streamlit · IBM Granite AI' }], links: [L('Launch live app ↗', 'https://pitmind-bvihgej8qmkzrergphk4xb.streamlit.app/'), L('Code ↗', 'https://github.com/aleksarriola-max/pitMind')] },
  { n: '03', kicker: 'Live product · outsette.com', title: 'Outsette', line: 'A student intelligence platform on its own domain — AI-curated daily briefings, an internship & role tracker, an AI career advisor, and club events.', specs: [{ k: 'Stack', v: 'Next.js · AI advisor' }, { k: 'Status', v: 'Real accounts, production pipeline' }], links: [L('Launch live app ↗', 'https://www.outsette.com/')] },
  { n: '04', kicker: 'Equity research automation', title: 'Orcen Valuation Kit', line: 'One YAML config → 84-sheet Excel model + Word report + PPTX deck. Verified end-to-end with real Apple FY2024 data.', specs: [{ k: 'Methods', v: 'DCF · comps · LBO · precedents' }, { k: 'Scale', v: '~39,000 lines of Python · 7 bias modules' }], links: [L('Apple model ↗', 'Apple_Valuation_v45.xlsx'), L('Word report ↗', 'Apple_Valuation_v29_Report.docx')] },
];
const coding = [
  { title: 'Outsette', kicker: 'Live product · Student intelligence platform', cats: ['AI & Agents', 'Live Apps'], t: 'A student intelligence platform live at its own domain, outsette.com. AI-curated daily briefings at 4 PM, an opportunity tracker for internships and roles, an AI career advisor trained on your profile, and club events — with real accounts, auth, and a production pipeline behind it.', tags: ['Next.js', 'AI Advisor', 'Full Product', 'outsette.com'], links: [L('Launch live app ↗', 'https://www.outsette.com/')] },
  { title: 'MissionMind', kicker: 'Explainable AI · JavaScript', cats: ['AI & Agents', 'Live Apps', 'Award Winners'], t: 'Explainable-AI mission control for space operations (IBM Bob AI Challenge). A live ops console — mission dashboard, anomaly investigation, an autonomy explainer, and plan-vs-actual tracking — that makes autonomous decisions auditable for the humans in the loop.', tags: ['Explainable AI', 'Mission Control', 'JavaScript', 'IBM Bob Challenge'], links: [L('Launch live app ↗', 'https://aleksarriola-max.github.io/missionmind/'), L('Code ↗', 'https://github.com/aleksarriola-max/missionmind')] },
  { title: 'StoryForge', kicker: 'Creative provenance · IBM AI Builders Challenge', cats: ['AI & Agents', 'Live Apps'], t: 'Cryptographic provenance for AI-assisted creative work. Logs every AI and human contribution automatically, hash-chains and cryptographically signs the record, and lets anyone verify it offline in the browser — zero trust required. Built with IBM Granite.', tags: ['IBM Granite', 'Cryptographic Signing', 'Hash-Chain', 'Provenance'], links: [L('Launch live app ↗', 'https://storyforge-client-smoky.vercel.app/')] },
  { title: 'PitMind', kicker: 'Most Innovative · IBM SkillsBuild AI Builders Challenge', cats: ['AI & Agents', 'Live Apps', 'Award Winners'], t: 'AI-powered Formula 1 strategy platform with Fan and Engineer modes, using IBM Granite AI and 2025 telemetry. Three custom models — Driver Soul, Momentum, and Race Forecast — simulate performance and strategy, making elite racing analysis accessible to anyone worldwide.', tags: ['Python', 'Streamlit', 'Live App'], links: [L('Launch live app ↗', 'https://pitmind-bvihgej8qmkzrergphk4xb.streamlit.app/'), L('Code ↗', 'https://github.com/aleksarriola-max/pitMind')] },
  { title: 'MatchMind', kicker: 'AI · Sports analytics', cats: ['AI & Agents', 'Live Apps'], t: 'AI system that explains football decisions with a two-layer hallucination firewall — combining a lexical evidence check and a second IBM Granite validation pass. Outputs are labeled Verified or Unverified with full evidence trails, every metric computed from real formulas. Uses live and historical World Cup data with five persona-based explanation styles.', tags: ['IBM Granite AI', 'Hallucination Detection', 'Live Data', 'Sports Analytics'], links: [L('Launch live app ↗', 'https://mainpy-hpdupmoyakddvxo348e4yn.streamlit.app/'), L('Code ↗', 'https://github.com/aleksarriola-max/matchMind')] },
  { title: 'Adaptive Funding Engine', kicker: 'Blockchain · Sui · DeFi', cats: ['Blockchain', 'Live Apps'], t: 'Fully on-chain scholarship and grant system built on Sui that replaces fixed payouts with milestone-based adaptive funding. Recipients earn bonuses for early delivery, lose value for delays, and unused funds recycle to waitlisted applicants. Move smart contracts, escrow locking, quorum-based approvals, configurable vesting curves, and soulbound credentials.', tags: ['Sui Blockchain', 'Move Smart Contracts', 'DeFi'], links: [L('Launch live app ↗', 'https://adaptive-funding-deepsurge.vercel.app/'), L('Code ↗', 'https://github.com/aleksarriola-max/adaptive-funding-engine')] },
  { title: 'DeepBook Market OS', kicker: 'Blockchain · Sui · Trading', cats: ['Blockchain', 'Finance', 'Live Apps'], t: 'Market operating system built on Sui’s DeepBookV3 combining spot, margin, and prediction markets into one unified console. Runs entirely on live on-chain data with no backend or mock inputs — all analytics computed client-side with transparent formulas.', tags: ['Sui Blockchain', 'DeepBookV3', 'On-Chain Analytics', 'Trading Systems'], links: [L('Launch live app ↗', 'https://aleksarriola-max.github.io/deepbook-market-os/'), L('Code ↗', 'https://github.com/aleksarriola-max/deepbook-market-os')] },
  { title: 'OpsFlow', kicker: 'Blockchain · Sui · AI agent', cats: ['AI & Agents', 'Blockchain', 'Live Apps'], t: 'Policy-bound AI operations agent built on Sui that turns natural-language requests into secure, stateful on-chain workflows. The LLM proposes actions, but deterministic code and Move smart contracts enforce decisions, approvals, and payments.', tags: ['Sui Blockchain', 'AI Agent', 'Move', 'Autonomous Systems'], links: [L('Launch live app ↗', 'https://opsflow-hso3.onrender.com/'), L('Code ↗', 'https://github.com/aleksarriola-max/opsflow')] },
  { title: 'Auto Company Valuation Kit — Orcen Capital', kicker: 'Equity research automation · Finance × Code', cats: ['Finance'], t: 'Single-analyst equity research system that takes one YAML config and outputs an 84-sheet Excel model, CFA-style Word report, and 16-slide PPTX deck in one command. Full valuation stack — DCF, comps, precedent transactions, LBO, blended fair value — layered with 7 cognitive bias-correction modules. ~39,000 lines of Python.', tags: ['Python', 'DCF · LBO · Comps', 'SEC EDGAR API', 'Streamlit'], links: [L('Apple model (v45) ↗', 'Apple_Valuation_v45.xlsx'), L('Word report ↗', 'Apple_Valuation_v29_Report.docx')] },
];
const lifelineSpecs = [{ k: 'Result', v: '1st of 40 teams' }, { k: 'Build window', v: 'One day, 150 builders' }, { k: 'Compute', v: 'Dell Pro Max · GB10, fully on-device' }, { k: 'Damage intelligence', v: 'Copernicus EMS + Maxar imagery' }, { k: 'Dispatch optimization', v: 'Google OR-Tools, 3 rescue teams' }, { k: 'Command interface', v: 'Telegram, human-approved dispatch' }];
const client = [
  { title: 'AeroShield — KPI Performance Dashboard', kicker: 'Live client · Operations & analytics', team: 'Group', t: 'Designed a 19-sheet KPI dashboard for AeroShield, a deeptech manufacturer scaling from 6 to 300 units/week. Identified the production vessel as the #1 bottleneck (38 of 101 cycle hours) and built a centralized tracking system covering output, quality gates, vessel utilization, cycle time, labor productivity, and energy intensity. Projected $40–80K in annual savings with a ~12-month payback period.', tags: ['Operations Management', 'KPI Design', 'Excel Dashboard', 'Power BI'] },
  { title: 'Jet Rose — US Market Expansion Strategy', kicker: 'Live client · Strategy & market entry', team: 'Group', t: 'Developed a full go-to-market expansion strategy for Jet Rose, a European bespoke private aviation broker entering the Americas. Delivered a self-funded growth model, competitive analysis against Jettly, JetFinder, and Amalfi Jets, a $99/month membership pricing framework, and a brand differentiation strategy positioning Jet Rose as the European expert in the US market.', tags: ['Market Entry Strategy', 'Competitive Analysis', 'Pricing Strategy', 'Private Aviation'] },
];
const marketing = [
  { title: 'Coachella TikTok — Predictive Attention Analysis', kicker: 'Marketing analytics · Research project', team: 'Group', t: 'Built a predictive attention framework for Coachella TikTok content using R, analyzing 1,351 videos across 2018–2026. Developed 3 regression models (Baseline, Sentiment Amplification, Topic Model), implemented Z-Score early warning signals to detect pre-burst windows, and recommended a share-seeding managerial lever based on coefficient analysis.', tags: ['R / Statistical Modeling', 'Sentiment Analysis', 'Forecasting'] },
  { title: 'Far Out Ice Cream — Winter Strategy & Menu Innovation', kicker: 'Live client · Brand & growth strategy', team: 'Group', t: 'Developed a full winter strategy for Far Out Ice Cream, a Kiwi-style ice cream brand facing seasonal slowdown: a "Winter Warm-Up" menu, seasonal flavor calendar, holiday gift kit strategy, culinary school partnerships, and a catering launch plan with influencer campaign and loyalty program to drive year-round revenue.', tags: ['Brand Strategy', 'Menu Innovation', 'Seasonal Marketing'] },
  { title: 'Kaktus Somabay — Customer Experience & Loyalty Strategy', kicker: 'Live client · Hospitality & guest experience', team: 'Group', t: 'Designed a guest experience and loyalty strategy for Kaktus Somabay, a luxury resort on Egypt’s Red Sea coast: loyalty program architecture, a local partnership ecosystem, a curated boutique retail concept, and niche wellness programming to drive repeat engagement and premium positioning.', tags: ['Hospitality Strategy', 'Loyalty Programs', 'Luxury Branding'] },
  { title: 'Explurger — US Market Entry Strategy', kicker: 'Live client · Growth & market entry · May 2025', team: 'Group', t: 'Developed a US market entry strategy for Explurger, a gamified travel-social app competing with Instagram, TikTok, and TripAdvisor: a 3-phase launch roadmap, competitive feature analysis, persona mapping, a full conversion funnel, and channel prioritization across TikTok, Instagram, and YouTube.', tags: ['Market Entry Strategy', 'Growth Marketing', 'Channel Strategy'] },
  { title: 'The GLP-1 Revolution — Influencer & Market Analysis', kicker: 'Marketing research · Individual project', team: 'Solo', t: 'Strategic marketing analysis of the GLP-1 weight-loss medication market (Ozempic, Wegovy). Mapped information diffusion across Broadcaster, Viral Spreader, and Community Builder roles, built a Priority Map and Virality Map, and revealed that mid-sized creators outperform headline influencers in conversion efficiency.', tags: ['Market Research', 'Influencer Strategy', 'Healthcare Marketing'] },
];
const financeFlagships = [
  { title: 'Company Health Red-Flag Scanner', t: 'A screening tool that quantitatively evaluates 600+ US-listed companies using SEC EDGAR XBRL data. Runs 11 models — 5 bankruptcy (Altman Z in three variants, Springate, Zmijewski) and 6 earnings-quality and accounting red-flag (Beneish M, Dechow F, Montier C, Sloan accruals, Lev–Thiagarajan signals, revenue quality) — plus Piotroski F, producing a composite Health Score (0–100), an earnings-quality risk rating, and an auto-generated analysis card per company.', stats: [{ v: '600+', k: 'Companies screened' }, { v: '11', k: 'Risk models' }, { v: '80', k: 'Financial ratios' }], links: [L('Download the Excel (all 600 companies) ↗', 'Company_Health_Scanner.xlsx')] },
  { title: 'Auto Company Valuation Kit — Orcen Capital', t: 'A single-analyst equity research automation system that turns one YAML config into a full research package — 84-sheet Excel model, CFA-style Word report, and 16-slide PPTX deck — in one command. DCF, comparable companies, precedent transactions, LBO returns, and blended fair value, layered with seven bias-correction modules targeting anchoring, optimism bias, and narrative contamination. Verified end-to-end with real Apple FY2024 data, producing a live HOLD verdict.', stats: [{ v: '84', k: 'Excel sheets / company' }, { v: '7', k: 'Bias-correction modules' }, { v: '39K', k: 'Lines of Python' }], links: [L('Apple model (v45) ↗', 'Apple_Valuation_v45.xlsx'), L('Word report ↗', 'Apple_Valuation_v29_Report.docx')] },
];
const areas = [
  { h: 'Investment Analysis', t: 'Equity research, sector analysis, and company valuation work completed through Forage simulations at Fidelity International and Goldman Sachs.' },
  { h: 'Banking & Credit', t: 'Commercial lending, credit underwriting, and relationship banking practice across simulations at Wells Fargo, Citi, and Bank of America.' },
  { h: 'Risk & Audit', t: 'Market risk, credit risk, and internal audit workflows at Goldman Sachs — stress testing, VaR analysis, and control gap identification.' },
  { h: 'Sales & Trading', t: 'Simulated equity and fixed income trading at Citi and Bank of America — market commentary, trade execution, and client pitching.' },
  { h: 'Tax & Transaction Advisory', t: "M&A tax due diligence and transaction structuring through Ryan LLC's Transaction Tax Consulting simulation." },
  { h: 'Bloomberg Terminal', t: 'Bloomberg Essentials certified — equity and fixed income data, core terminal functions (DES, GP, YAS), and market data navigation.' },
];
const roles = [
  { title: 'Finance Intern', cat: 'Finance', org: 'The 1525', place: 'Remote', dates: 'May – Sep 2026', b: ['Built a semi-automated Python screening pipeline that raised analyst throughput an estimated 400× — cutting review from roughly 2 hours per company to screening 2,000+ companies in ~10 hours.', 'Turned a manual, analyst-by-analyst review into a repeatable, automated screen that surfaces the names worth a closer look.', 'Scoped assignments that arrived without fixed parameters — working out what data was needed, resolving the ambiguity, and delivering finished analysis without step-by-step direction.', 'Wrote findings up around the decision they informed rather than the numbers alone, so each piece of analysis connected to something the business actually had to choose.', 'Taught and guided the other interns on running the screening pipeline, turning a tool I had built into one the rest of the team could use without me.'], tags: ['Python', 'Equity Screening', 'Automation', 'Analyst Workflow'] },
  { title: 'Client Specialist', cat: 'Sales / Client', org: 'SeOnline', place: 'Guatemala City', dates: 'May – Aug 2025', b: ['Managed the full sales cycle from outreach through contract close, and redesigned the client-onboarding process — improving efficiency by 35%.', 'Prospected new business through outbound cold calling, led needs-assessment meetings, and built tailored proposals that converted leads into signed contracts.', 'Ran the whole relationship remotely — outreach, negotiation and closing conducted over chat and video.', 'That gain came from structure rather than effort: reorganizing how client information was stored and standardizing how sales calls were run.', 'Carried both Guatemalan and United States clients through to close, helping the company reach new markets rather than only serving the ones it already had.'], tags: ['Client Management', 'Full Sales Cycle', 'Negotiation', 'Process Design'] },
  { title: 'Digital Marketing Intern', cat: 'Marketing', org: 'Western Union', place: 'Guatemala City', dates: 'Jun – Aug 2024', b: ['Reported directly to the Digital Marketing Director at Western Union’s central agency in Guatemala, supporting the planning, execution and tracking of multi-channel campaigns across Central America.', 'Contributed to regional brand-awareness initiatives spanning billboard placements, print collateral, and broader marketing efforts.', 'Helped organize a Father’s Day event and the process behind it, from distribution through to promotion across all of Western Union’s social channels.'], tags: ['Campaign Strategy', 'Multi-Channel', 'Brand Awareness'] },
  { title: 'Cashier & Remittance', cat: 'Operations', org: 'Western Union Sub-Agency', place: 'Guatemala City', dates: 'Summer 2023', b: ['Managed daily cash operations of up to Q15,000, processing remittances and financial transactions accurately.', 'Handled ~50 daily transactions and improved service speed by 10% through efficient cash reconciliation.', 'Served as the primary point of contact for customers sending and receiving remittances.'], tags: ['Cash Operations', 'Remittances', 'Reconciliation', 'Customer Service'] },
];
const cases = [
  { id: 'case-scanner', n: '01', kicker: 'Quant / Model Risk', title: 'Company Health Red-Flag Scanner', tldr: "An ensemble of 11 bankruptcy and earnings-quality models, cross-checked across 600+ companies' SEC filings, so no single ratio decides the verdict.", risk: "Before trusting a company's reported health, where is the accounting most likely stretched — and is a distress signal real, or a sector artifact?",
    s: [
      { h: 'The uncertainty', t: "Reported earnings diverge from the cash a business actually generates (accruals). Any single model is a noisy read, XBRL fields aren't tagged uniformly across filers, and base rates differ by sector." },
      { h: 'How I got here', t: 'I started with a single model — Altman’s Z-score. It broke fast: any one model is a noisy read, and a single mis-tagged XBRL field can flip the verdict. So I stopped trusting any single number and built an ensemble across bankruptcy and earnings-quality models, then added sector benchmarking so a low score in a capital-heavy sector wasn’t misread as distress.' },
      { h: 'Control & monitoring I designed', t: 'Eleven models — five for bankruptcy risk and six for earnings quality and accounting red flags — plus Piotroski collapse into one composite Health Score and a separate earnings-quality risk score. A flag requires convergence across independent models, not any single trigger.' },
      { h: 'Trade-offs it introduced', t: 'Convergence suppresses false alarms but adds lag — the Z-Score often flags only after the accruals gap has widened for years. The model is deliberately conservative, so it structurally over-flags capital-intensive industrials and pre-revenue biotech.' },
      { h: 'How I tested failure modes', t: 'Stress-tested the XBRL parser against non-standard tag formats — a real defect where certain filers tagged fields differently produced anomalous scores, caught by reconciling raw → cleaned → model-input data rather than re-checking the formulas.' },
      { h: 'Key assumptions', t: 'Scores assume SEC EDGAR XBRL fields are tagged consistently across filers (they aren’t always), that academic model thresholds still hold today, and that sector medians are a fair benchmark. When a filing lacks the inputs, the model is left blank rather than guessed.' },
      { h: 'Reproducible & reviewable', t: 'Every run recomputes every ratio from the source filings — same inputs, same output, no manual edits, versioned in git. A reviewer can trace any company’s health score back through the ratios to the exact source XBRL field.' },
      { h: "When I'd distrust it — and the safeguard I'd add", t: "I distrust a single high score in a capital-intensive or pre-revenue name, and re-anchor to sector base rates before acting on it. Next safeguard: a sector-adjusted overlay plus a data-quality confidence flag." },
    ],
    terms: [{ k: 'Model risk', v: "each score's reliability is documented by sector" }, { k: 'Limits', v: 'composite thresholds define the watchlist' }, { k: 'Escalation', v: 'convergent red flags auto-generate a manual analysis card' }, { k: 'Explainability', v: 'every score reconciles to its inputs, with no gaps' }, { k: 'Early warning', v: 'the accruals gap moves before solvency models react' }] },
  { id: 'case-opsflow', n: '02', kicker: 'Governance / Controls', title: 'OpsFlow — Policy-Bound AI Operations Agent', tldr: 'An AI agent that can propose but never execute — deterministic policy and on-chain smart contracts enforce every payment, so a hallucination gets blocked, not acted on.', risk: 'Should an AI agent be allowed to move money and route approvals on its own — and what has to be true before it can?',
    s: [
      { h: 'The uncertainty', t: 'LLM plans are strong but occasionally wrong. A single hallucination, misread context, or ambiguous instruction can send a payment to the wrong party or skip a required review — and by the time a human notices, the action is already done.' },
      { h: 'How I got here', t: 'I first let the LLM plan and act freely — then realized a single hallucination could route a payment to the wrong party. So I inverted the design: I bound it with explicit policy and budget rules enforced on-chain, so anything outside the approved envelope is blocked before it happens and escalated to a human.' },
      { h: 'Control & monitoring I designed', t: 'Reasoning is separated from execution: the LLM only proposes an action plan; a deterministic policy layer and Move smart contracts enforce every decision — approved-vendor check, payment within an authorized range, quorum met for the approval tier.' },
      { h: 'Trade-offs it introduced', t: "Hard policy boundaries cost flexibility and speed — the agent can't improvise around an edge case — in exchange for a bounded blast radius when the model is wrong. For anything touching money, that trade is the whole point." },
      { h: 'How I tested failure modes', t: 'Probed the cases most demos skip: an approval chain that breaks halfway through, a payment outside the authorized range, a vendor not on the approved list — confirming the policy layer blocks the action rather than the model talking its way past it.' },
      { h: 'Key assumptions', t: 'The agent assumes the policy and budget rules are complete and current, that the on-chain contracts enforce what the policy intends, and that a human is reachable for anything outside the approved envelope. Where those break, the action is blocked — never guessed.' },
      { h: 'Reproducible & reviewable', t: 'Every agent decision is logged with the policy that gated it and the state it read, so the whole run is auditable and replayable.' },
      { h: "When I'd distrust it — and the safeguard I'd add", t: "I never let the model's confidence override the policy layer — a confident wrong plan is still blocked. The safeguard I lean on: human validation on any novel action type, plus rollback capability." },
    ],
    terms: [{ k: 'Limits', v: 'authorized payment ranges and vendor allow-lists' }, { k: 'Escalation', v: 'quorum thresholds and veto windows route to the right authority' }, { k: 'Model risk', v: 'LLM unreliability is contained, not trusted' }, { k: 'Explainability & audit', v: 'a verifiable trail of what was proposed, validated, rejected, and why' }, { k: 'Controls', v: "deterministic enforcement the model can't override" }] },
  { id: 'case-orcen', n: '03', kicker: 'Model Risk / Valuation', title: 'Orcen Capital — Auto Valuation Kit', tldr: 'One YAML config generates a full DCF + comps + LBO valuation stack with 7 bias-correction modules — the output is a range, not a false-precision number.', risk: 'How much of this valuation is analysis, and how much is an assumption dressed up as a number — and where does the answer actually live?', fig: true,
    s: [
      { h: 'The uncertainty', t: 'In most DCFs, terminal value is 60–80% of enterprise value, so what a single point of terminal growth is worth depends on how close the discount rate already sits to it. Analysts also anchor on narratives and on their own prior targets.' },
      { h: 'How I got here', t: 'The first version was one DCF. Building it, I watched terminal value swamp 60–80% of the answer — the “number” was really an assumption in disguise. I added comps, LBO, and precedent transactions as independent cross-checks and layered in bias-correction modules.' },
      { h: 'Control & monitoring I designed', t: 'A blended fair value cross-checks the Gordon Growth terminal against an exit-multiple and a reinvestment-adjusted growth estimate — when the three diverge, the divergence is flagged rather than averaged away.' },
      { h: 'Trade-offs it introduced', t: 'Surfacing disagreement instead of resolving it to a single tidy number is less clean to present — but it shows where the uncertainty is instead of hiding it.' },
      { h: 'How I tested failure modes', t: 'Ran explicit terminal-value sensitivity so the output is a range with a clear statement of how far it moves as assumptions change, and cross-checked the DCF against comparable transactions and an LBO return.' },
      { h: 'Key assumptions', t: 'The blended value assumes the four methods are semi-independent reads (they partly aren’t), that the discount rate and terminal growth hold across the forecast, and that FY2024 XBRL fields map cleanly to the model’s line items.' },
      { h: 'Reproducible & reviewable', t: 'The entire 84-sheet model is generated from a single YAML config and versioned in git — change an input, rerun, and every sheet recalculates identically.' },
      { h: "When I'd distrust it — and the safeguard I'd add", t: 'I distrust any DCF where terminal value dominates and the growth assumption is doing the heavy lifting. My safeguard: present the sensitivity range and the method spread by default, never a single number.' },
    ],
    terms: [{ k: 'Model risk', v: 'terminal-value sensitivity is made explicit, not buried' }, { k: 'Limits', v: 'a valuation range, not a false-precision point target' }, { k: 'Explainability', v: 'every output reconciles to its inputs and its method' }, { k: 'Decision link', v: 'the blended output and HOLD verdict tie to a buy / hold / sell call' }] },
  { id: 'case-lifeline', n: '04', kicker: 'Decision Support / Triage', title: 'Lifeline — Post-Earthquake Triage & Dispatch', tldr: 'A ranking that orders rescue effort by survivor likelihood, built so that a human commander approves every dispatch and an absent signal is never read as an absent person. Team-built in one day; 1st of 40 teams.', risk: 'In the first hours after an earthquake, which collapsed structures should rescue teams reach first — and how much authority should an automated ranking be allowed to hold over that order?',
    s: [
      { h: 'The uncertainty', t: 'Every input is a proxy for the thing that actually matters. Satellite damage grading describes a building’s exterior, not who is alive inside it. Life-sign sensing is sparse, noisy, and silent for reasons that have nothing to do with whether anyone is there.' },
      { h: 'How we got here', t: 'The first version produced a ranked list and stopped there — and a ranked list reads as authority whether or not it has earned it. So the design question became “how do we make the ranking state what it does not know.” One rule was written into the system — no signal never means nobody.' },
      { h: 'Controls we built in', t: 'The agent proposes; it never dispatches. Assignments are routed with Google OR-Tools and surfaced to a human commander over Telegram for approval. Every inference runs locally through Ollama, with no cloud calls and no API keys.' },
      { h: 'Trade-offs it introduced', t: 'Local-only inference removes the cloud dependency at the cost of model size and speed. Requiring human approval on every dispatch costs minutes — accepted, because an automated dispatch acting on a wrong ranking costs more than a delayed one.' },
      { h: 'How we tested failure modes', t: 'Run against a replay of a real event — Copernicus EMS activation EMSR648, Kahramanmaraş, February 2023 — probing deteriorating vitals forcing a re-rank mid-operation, and sensor silence at a high-damage site.' },
      { h: 'Key assumptions', t: 'Graded exterior damage correlates with survivor likelihood inside, the replayed activation is representative of a live feed, and a commander is reachable. Life-sign readings are simulated in the current build, and the system says so on its own outputs.' },
      { h: 'Reproducible & reviewable', t: 'The whole stack runs on one machine from public data — Copernicus EMS and Maxar Open Data — so a reviewer can re-run the scenario end to end without credentials or a cloud account.' },
      { h: 'When I’d distrust it — and the safeguard we built', t: 'Not in a situation unlike the one it was tested against. The safeguard is the one rule the system refuses to break — a site with no signal is never dropped from the queue.' },
    ],
    terms: [{ k: 'Decision aid vs. decision', v: 'the model orders the queue; the human authorises the action' }, { k: 'Model risk', v: 'damage grade is a proxy for occupancy, and is labelled as one' }, { k: 'Data lineage', v: 'every input is traceable to Copernicus EMS or Maxar' }, { k: 'Escalation', v: 'deteriorating readings re-order the queue' }, { k: 'Known limits', v: 'absence of signal is explicitly not evidence of absence' }] },
];
const C = (title, org, date, cat) => ({ title, org, date, cat });
const certs = [
  C('Sustainability in Banking', 'ACCA & CIMB', 'Sep 2026', 'Banking'), C('Understanding the Deal Lifecycle', 'Vista Equity Partners', 'Sep 2026', 'Finance'), C('Company Essentials: Citi', 'Citi', 'Sep 2026', 'Banking'), C('Tech Explorer', 'Commonwealth Bank', 'Sep 2026', 'Tech & Data'), C('Overview of Financial Services and Banking', 'PNC', 'Sep 2026', 'Tech & Data'), C('Professionalism & Power Skills', 'PNC', 'Sep 2026', 'Tech & Data'), C('Key Roles and Business Segments', 'PNC', 'Aug 2026', 'Tech & Data'), C('Web Development Fundamentals', 'IBM SkillsBuild', 'Aug 2026', 'Tech & Data'), C('Lab: Troubleshoot Your Code Using IBM Bob', 'IBM SkillsBuild', 'Jul 2026', 'Tech & Data'),
  C('Power BI for Beginners: Interactive Dashboard Fundamentals', 'Coursera', 'Apr 2026', 'Coursera'), C('Emotional Intelligence: Cultivating Immensely Human Interactions', 'University of Michigan', 'Apr 2026', 'Coursera'), C('Introduction to Personal Finance', 'SoFi', 'Apr 2026', 'Coursera'), C('Modern Art & Ideas', 'The Museum of Modern Art', 'Feb 2026', 'Coursera'), C('Introduction to Financial Accounting', 'University of Pennsylvania', 'Feb 2026', 'Coursera'), C('Creative Thinking: Techniques and Tools for Success', 'Imperial College London', 'Dec 2025', 'Coursera'),
  C('Markets Sales & Trading', 'Citi', 'May 2026', 'Banking'), C('Banking at PNC: Building Career Skills', 'PNC', 'May 2026', 'Banking'), C('Business & Commercial Banking Introduction', 'Lloyds Banking Group', 'Apr 2026', 'Banking'), C('Commercial Banking', 'Wells Fargo', 'Apr 2026', 'Banking'), C('Personal Banker', 'Wells Fargo', 'Apr 2026', 'Banking'), C('Consumer & Small Business Banking', 'Wells Fargo', '2026', 'Banking'), C('Bank Teller', 'Wells Fargo', '2026', 'Banking'), C('U.S. Consumer Cards', 'Citi', '2026', 'Banking'), C('Treasury & Trade Solutions', 'Citi', '2026', 'Banking'), C('Private Bank', 'Bank of America', '2026', 'Banking'),
  C('Investment Management', 'Fidelity International', 'May 2026', 'Finance'), C('Operations', 'Goldman Sachs', 'Apr 2026', 'Finance'), C('Internal Audit', 'Goldman Sachs', 'Apr 2026', 'Finance'), C('Bloomberg Essentials', 'Bloomberg', 'Apr 2026', 'Finance'), C('Client Service', 'Bloomberg', '2026', 'Finance'), C('Risk', 'Goldman Sachs', '2026', 'Finance'), C('Controllers', 'Goldman Sachs', '2026', 'Finance'), C('Sales & Trading Analyst', 'Bank of America', '2026', 'Finance'), C('Investment Banking', 'Bank of America', '2026', 'Finance'), C('Financial Analyst', 'New York Jobs CEO Council', '2026', 'Finance'), C('Accounting', 'Koch', '2026', 'Finance'), C('Run Your Own Business', 'Chartered Accountants ANZ', '2026', 'Finance'), C('Transaction Tax Consulting', 'Ryan, LLC', 'May 2026', 'Finance'),
  C('Intro to Strategy Consulting', 'BCG', '2026', 'Consulting'), C('Advisors & Consulting Services', 'Mastercard', 'Mar 2026', 'Consulting'), C('Ryan Company Pathway', 'Ryan', '2026', 'Consulting'), C('UX Design Introduction', 'Lloyds Banking Group', 'Apr 2026', 'Consulting'), C('Branding & Design', 'Sydney Romantics', '2026', 'Consulting'),
  C('Cybersecurity', 'Mastercard', 'Apr 2026', 'Tech & Data'), C('AI in Action', 'Vista Equity Partners', '2026', 'Tech & Data'), C('Resume Writing with AI Support', 'Forage Learning', 'Mar 2026', 'Tech & Data'),
  C('London Market Claims Adjuster', 'London Insurance Life', 'Apr 2026', 'Insurance'), C('London Market Claims Operations', 'London Insurance Life', 'Apr 2026', 'Insurance'), C('Underwriting', 'AIG', '2026', 'Insurance'), C('Credit Analyst', 'Standard Chartered', 'Jul 2026', 'Banking'), C('Client Engagement', 'Bloomberg', 'Jul 2026', 'Finance'), C('Quantitative Research', 'J.P. Morgan', 'Jun 2026', 'Finance'), C('Actuarial Analyst', 'AIG', 'Jun 2026', 'Insurance'),
];
const selectedCreds = [{ org: 'Goldman Sachs', t: 'Operations · Internal Audit · Risk · Controllers' }, { org: 'J.P. Morgan', t: 'Quantitative Research' }, { org: 'Bank of America', t: 'Investment Banking · Sales & Trading · Private Bank' }, { org: 'Bloomberg', t: 'Essentials · Client Service · Client Engagement' }, { org: 'Citi', t: 'Markets Sales & Trading · Treasury & Trade Solutions' }, { org: 'Wells Fargo', t: 'Commercial Banking · Personal Banker · Consumer & Small Business' }];
const E = (tag, date, title) => ({ tag, date, title });
const essays = [
  E('Finance', 'Oct 11', 'Altman Z-Score Works Until Management Knows It Exists'), E('Perspective', 'Oct 10', 'What Doing Predictive Attention Analysis Taught Me About Hype Cycles'), E('Perspective', 'Oct 9', 'Why the Finance Page and the Coding Page Live on the Same Site'), E('Perspective', 'Oct 8', 'The Best Career Advice I Got Wasn’t About Skills'), E('Perspective', 'Oct 7', 'Why I Stopped Using Templates for Market Expansion Work'), E('Perspective', 'Oct 6', 'What a KPI Dashboard Taught Me About What Executives Actually Want'), E('Perspective', 'Oct 5', 'Why I Chase Certifications That Don’t Show Up in Interviews'), E('Perspective', 'Oct 4', 'The Unglamorous Work Behind Every Portfolio Project'), E('Perspective', 'Oct 3', 'What Switching Between Finance and Marketing Case Studies Taught Me About Audience'), E('Perspective', 'Oct 2', 'Why I Took the Cashier Job Before I Touched a Model'), E('Perspective', 'Oct 1', 'What Three Years of Client Work Taught Me About Scope'),
  E('AI Systems', 'Sep 30', 'Why I Measure Latency Before I Measure Accuracy'), E('AI Systems', 'Sep 29', 'Schema Validation Fixed More Bugs Than Any Model Upgrade'), E('AI Systems', 'Sep 28', 'Planning and Execution Need Different Agents'), E('AI Systems', 'Sep 27', 'What I Stopped Letting Agents Write Directly'), E('AI Systems', 'Sep 26', 'DeepBook Market OS: The Boring Ninety Percent'), E('AI Systems', 'Sep 25', 'The Adaptive Funding Engine’s Feedback Loop Is the Whole Point'), E('AI Systems', 'Sep 24', 'MatchMind and the Limits of Letting a Model Search'), E('AI Systems', 'Sep 23', 'Why PitMind Extracts Instead of Generates'), E('AI Systems', 'Sep 22', 'OpsFlow and the Case for Narrow Agents'), E('AI Systems', 'Sep 21', 'What a Multi-Agent Deal Swarm Taught Me About Coordination Cost'),
  E('Finance', 'Sep 20', 'The Auto Valuation Kit’s Real Job Is Catching My Own Mistakes'), E('Finance', 'Sep 19', 'Why I Rebuild Every Model From the Filing, Not the Summary'), E('Finance', 'Sep 18', 'Attention Is a Leading Indicator, Not a Proxy for Revenue'), E('Finance', 'Sep 17', 'What a Repricing Narrative Does to a Sector'), E('Finance', 'Sep 16', 'What Risk and Audit Work Reveals About Control Failures'), E('Finance', 'Sep 15', 'What Sales and Trading Teaches About Spreads as Information'), E('Finance', 'Sep 14', 'Tax Structure Is Where Deal Value Actually Moves'), E('Finance', 'Sep 13', 'What the Bloomberg Terminal Certification Doesn’t Teach You'), E('Finance', 'Sep 12', 'The Valuation Kit Taught Me Valuation Is a Pipeline Problem'), E('Finance', 'Sep 11', 'What the Red-Flag Scanner Actually Looks For'),
  E('Perspective', 'Sep 10', 'Optionality Is a Career Strategy, Not Just a Greek'), E('Perspective', 'Sep 9', 'What Cold Emails Taught Me About Signal'), E('Perspective', 'Sep 8', 'The Underrated Value of Finishing Small Things'), E('Perspective', 'Sep 7', 'Why I Study the Boundary Between Two Fields'), E('Perspective', 'Sep 6', 'Being International Made Me a Better Builder'), E('Perspective', 'Sep 5', 'The Skill That Doesn’t Show Up on a Transcript'), E('Perspective', 'Sep 4', 'Learning in Public Is a Forcing Function'), E('Perspective', 'Sep 3', 'Why I Write These Essays'), E('Perspective', 'Sep 2', 'The Portfolio Is the Resume Now'), E('Perspective', 'Sep 1', 'Depth Compounds Faster Than Breadth'),
  E('AI Systems', 'Aug 31', 'Latency Is a Correctness Problem for Agents'), E('AI Systems', 'Aug 30', 'Why Most Agent Failures Are Data Problems in Disguise'), E('AI Systems', 'Aug 29', 'Human-in-the-Loop Is a Design Decision, Not a Fallback'), E('AI Systems', 'Aug 28', 'The Context Window Is a Budget, Spend It Deliberately'), E('AI Systems', 'Aug 27', 'Why Guardrails Belong in the Environment, Not the Prompt'), E('AI Systems', 'Aug 26', 'Determinism Is a Feature You Have to Engineer'), E('AI Systems', 'Aug 25', 'Evaluation Is the Product, Not the Afterthought'), E('AI Systems', 'Aug 24', 'The Hidden Cost of Every Extra Agent Step'), E('AI Systems', 'Aug 23', 'Why Tool Design Matters More Than Model Choice'), E('AI Systems', 'Aug 22', 'Retrieval Is Not Memory'),
  E('Finance', 'Aug 21', 'Why Margin of Safety Survives Every Market Regime'), E('Finance', 'Aug 20', 'The Quiet Power of the Cash Conversion Cycle'), E('Finance', 'Aug 19', 'Segment Reporting Is Where the Real Business Lives'), E('Finance', 'Aug 18', 'Goodwill Is a Bet You Can Read on the Balance Sheet'), E('Finance', 'Aug 17', 'Sensitivity Tables Are the Most Honest Part of a Model'), E('Finance', 'Aug 16', 'What a Debt Schedule Reveals That an Income Statement Hides'), E('Finance', 'Aug 15', 'Precedent Transactions Lie About Control Premiums'), E('Finance', 'Aug 14', 'Why Free Cash Flow Beats Earnings, Until It Doesn’t'), E('Finance', 'Aug 13', 'The Cost of Capital Is a Judgment Call Dressed as Math'), E('Finance', 'Aug 12', 'Working Capital Is Where Value Quietly Leaks'), E('Finance', 'Aug 11', 'Comparable Companies Analysis Is Storytelling With Numbers'),
  E('AI Systems', 'Aug 10', 'The Case for Boring AI Architecture'), E('Perspective', 'Aug 9', 'Why I Build Things I Can’t Fully Use'), E('Finance', 'Aug 8', 'What Quality of Earnings Analysis Actually Catches'),
];
const featuredEssay = ['The Altman Z-Score is almost fifty years old, and I still run it on every company in the Red-Flag Scanner. It blends five ratios of working capital, retained earnings, operating profit, market value and sales into a single number, and companies below the distress threshold have historically failed far more often than the rest. When I first saw it flag a name I already thought was fragile, I felt validated. When it flagged a name I loved, I felt something more useful, which was doubt about my own thesis.', 'But the score has a quiet weakness. Every input is something management can influence. Retained earnings can be dressed up by capitalizing costs, working capital can be managed around quarter-end, and sales can be pulled forward. A model built on reported numbers inherits every choice behind those numbers. Altman published the original in 1968, and a model that old has been read by every finance team on earth. Any metric people know about becomes a metric people manage toward.', 'That is why I never let the Z-Score stand alone in the scanner. It sits next to the Beneish M-Score and the Dechow F-Score, which ask a different question: not whether the company looks healthy, but whether the numbers look manipulated. Disagreement between the models is where I learn the most. A healthy Z-Score paired with an ugly accruals profile tells me the safety is cosmetic. My takeaway is that no single distress model is a verdict. It is a witness, and like any witness it needs to be cross-examined by another one.'];
return { achievements, toolkit, habits, featured, coding, lifelineSpecs, client, marketing, financeFlagships, areas, roles, cases, certs, selectedCreds, essays, featuredEssay };
})();

/* Verification links and descriptions for each credential, keyed by title (carried over from the previous site). */
window.CERT_INFO = {
 "Power BI for Beginners: Interactive Dashboard Fundamentals": {
  "href": "https://www.coursera.org/account/accomplishments/verify/WGHKBHTETJEI",
  "kind": "Course Certificate",
  "desc": "Learned to build interactive business dashboards in Microsoft Power BI — connecting data sources, creating visualizations, designing reports, and publishing dashboards for business decision-making.",
  "skills": [
   "Power BI",
   "Data Visualization",
   "Dashboards",
   "Business Intelligence"
  ]
 },
 "Emotional Intelligence: Cultivating Immensely Human Interactions": {
  "href": "https://www.coursera.org/account/accomplishments/verify/R617YT5LUCCC",
  "kind": "Course Certificate",
  "desc": "Explored the science of emotional intelligence — self-awareness, empathy, social skills, and managing emotions in professional and personal contexts to build stronger, more productive relationships.",
  "skills": [
   "Emotional Intelligence",
   "Leadership",
   "Communication",
   "Self-Awareness"
  ]
 },
 "Introduction to Personal Finance": {
  "href": "https://www.coursera.org/account/accomplishments/verify/RYPLVDYR8Q9M",
  "kind": "Course Certificate",
  "desc": "Covered the fundamentals of personal financial planning — budgeting, saving, investing, debt management, credit, and building long-term financial wellness strategies.",
  "skills": [
   "Personal Finance",
   "Budgeting",
   "Investing",
   "Financial Planning"
  ]
 },
 "Modern Art & Ideas": {
  "href": "https://www.coursera.org/account/accomplishments/verify/0KCAU21YO9OE",
  "kind": "Course Certificate",
  "desc": "Explored modern and contemporary art through MoMA's collection — analyzing movements, understanding how art reflects cultural and social contexts, and developing visual literacy and creative perspective.",
  "skills": [
   "Art History",
   "Visual Literacy",
   "Critical Thinking",
   "Cultural Analysis"
  ]
 },
 "Introduction to Financial Accounting": {
  "href": "https://www.coursera.org/account/accomplishments/verify/NDF7LBXB8MJO",
  "kind": "Course Certificate",
  "desc": "Wharton School's foundational accounting course — reading and interpreting financial statements, understanding GAAP, balance sheet analysis, income statements, and cash flow reporting.",
  "skills": [
   "Financial Accounting",
   "GAAP",
   "Financial Statements",
   "Balance Sheet",
   "Wharton"
  ]
 },
 "Creative Thinking: Techniques and Tools for Success": {
  "href": "https://www.coursera.org/account/accomplishments/verify/CQD1SPCH78L5",
  "kind": "Course Certificate",
  "desc": "Developed structured creative thinking skills using proven ideation frameworks — brainstorming techniques, lateral thinking, problem reframing, and applying creativity to business and engineering challenges.",
  "skills": [
   "Creative Thinking",
   "Problem Solving",
   "Ideation",
   "Innovation",
   "Design Thinking"
  ]
 },
 "Markets Sales & Trading": {
  "href": "https://www.theforage.com/completion-certificates/8eNRcRqBZM9HLvwGw/gJjSg64PLtchbxKgj_8eNRcRqBZM9HLvwGw_QpfYdzXEDmNXLhqhA_1780207374200_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated working on Citi's Markets desk — analyzing market conditions, building trade ideas, and understanding how sales and trading teams communicate with institutional clients. Covered equity derivatives, bond markets, and client pitching.",
  "skills": [
   "Derivatives",
   "Market Analysis",
   "Client Pitching",
   "Fixed Income"
  ]
 },
 "Banking at PNC: Building Career Skills": {
  "href": "https://www.theforage.com/completion-certificates/3W4C6QjJzfhEmi4Ay/nuPcwecBkeF9iyRJX_3W4C6QjJzfhEmi4Ay_QpfYdzXEDmNXLhqhA_1778997516266_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored core career skills needed in a banking environment at PNC — including financial counseling, customer relationship management, and understanding retail banking products. Focused on real-world client scenarios.",
  "skills": [
   "Retail Banking",
   "Customer Relations",
   "Financial Counseling"
  ]
 },
 "Business & Commercial Banking Introduction": {
  "href": "https://www.theforage.com/completion-certificates/Zbnc2o4ok6kD2NEXx/fPrHvjDcgMMh6drzh_Zbnc2o4ok6kD2NEXx_QpfYdzXEDmNXLhqhA_1777414554400_completion_certificate.pdf",
  "kind": "",
  "desc": "Gained exposure to commercial lending, business credit assessment, and how banks support SME clients. Worked through loan structuring scenarios and assessed business risk for corporate clients.",
  "skills": [
   "Commercial Lending",
   "Credit Analysis",
   "Business Banking",
   "Risk Assessment"
  ]
 },
 "Commercial Banking": {
  "href": "https://www.theforage.com/completion-certificates/nkmk7gJitYs4TBvoA/AQKJ8jdotFCzz5WmM_nkmk7gJitYs4TBvoA_QpfYdzXEDmNXLhqhA_1775090881321_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated the role of a commercial banker at Wells Fargo — evaluating business loan applications, analyzing company financials, and structuring credit facilities for middle-market clients.",
  "skills": [
   "Credit Underwriting",
   "Financial Analysis",
   "Loan Structuring"
  ]
 },
 "Personal Banker": {
  "href": "https://www.theforage.com/completion-certificates/nkmk7gJitYs4TBvoA/owmbvXSPLTqePC5gQ_nkmk7gJitYs4TBvoA_QpfYdzXEDmNXLhqhA_1775072139437_completion_certificate.pdf",
  "kind": "",
  "desc": "Took on the role of a personal banker helping clients with deposit accounts, lending products, and financial planning. Practiced consultative selling and needs-based product recommendations.",
  "skills": [
   "Retail Banking",
   "Consultative Sales",
   "Financial Planning"
  ]
 },
 "Consumer & Small Business Banking": {
  "href": "https://www.theforage.com/completion-certificates/nkmk7gJitYs4TBvoA/hSxoHCmRFdekdAEem_nkmk7gJitYs4TBvoA_QpfYdzXEDmNXLhqhA_1773361466202_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored Wells Fargo's consumer and small business banking division — from deposit products and cash management to small business credit solutions and digital banking tools.",
  "skills": [
   "Small Business Banking",
   "Cash Management",
   "Consumer Finance"
  ]
 },
 "Bank Teller": {
  "href": "https://www.theforage.com/completion-certificates/nkmk7gJitYs4TBvoA/BsDjEuPJhapP4QGyj_nkmk7gJitYs4TBvoA_QpfYdzXEDmNXLhqhA_1771291196605_completion_certificate.pdf",
  "kind": "",
  "desc": "Shadowed the frontline banking experience — processing transactions, identifying fraud indicators, and delivering excellent customer service in a branch environment.",
  "skills": [
   "Transaction Processing",
   "Fraud Detection",
   "Customer Service"
  ]
 },
 "U.S. Consumer Cards": {
  "href": "https://www.theforage.com/completion-certificates/8eNRcRqBZM9HLvwGw/uXC3LSjpH4J7Z9x2M_8eNRcRqBZM9HLvwGw_QpfYdzXEDmNXLhqhA_1771632992461_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored Citi's consumer banking operations — understanding personal loan products, credit card services, and how relationship managers engage retail clients across different life stages.",
  "skills": [
   "Consumer Products",
   "Client Relationships",
   "Credit Cards"
  ]
 },
 "Treasury & Trade Solutions": {
  "href": "https://www.theforage.com/completion-certificates/8eNRcRqBZM9HLvwGw/tJ3ENBW8jgwYzTRmv_8eNRcRqBZM9HLvwGw_QpfYdzXEDmNXLhqhA_1770504747216_completion_certificate.pdf",
  "kind": "",
  "desc": "Dived into Citi's TTS division — how the bank manages global cash flow, trade finance, and cross-border payment solutions for multinational corporate clients.",
  "skills": [
   "Trade Finance",
   "Cash Management",
   "FX",
   "Global Payments"
  ]
 },
 "Private Bank": {
  "href": "https://www.theforage.com/completion-certificates/fMCqmt8qR4G85Puue/Lu5h6FDrPES9mKn3h_fMCqmt8qR4G85Puue_QpfYdzXEDmNXLhqhA_1770495954498_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated working with ultra-high-net-worth clients in BofA's private banking division — providing bespoke wealth management solutions, trust services, and portfolio advisory.",
  "skills": [
   "Wealth Management",
   "UHNW Clients",
   "Trust & Estate",
   "Portfolio Advisory"
  ]
 },
 "Investment Management": {
  "href": "https://www.theforage.com/completion-certificates/jWDZPYPGpsMrk2vJq/hgCWHF8riBbyFjPfd_jWDZPYPGpsMrk2vJq_QpfYdzXEDmNXLhqhA_1779525087842_completion_certificate.pdf",
  "kind": "",
  "desc": "Practiced the investment process at a global asset manager — conducting equity research, building financial models, and presenting investment recommendations within a portfolio context.",
  "skills": [
   "Equity Research",
   "Financial Modeling",
   "Portfolio Management",
   "DCF"
  ]
 },
 "Operations": {
  "href": "https://www.theforage.com/completion-certificates/MBA4MnZTNFEoJZGnk/wNge9cjzNTXD2acrv_MBA4MnZTNFEoJZGnk_QpfYdzXEDmNXLhqhA_1777234405347_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored the operations function at Goldman Sachs — managing post-trade processes, settlement, reconciliation, and ensuring accurate books and records across business divisions.",
  "skills": [
   "Trade Settlement",
   "Reconciliation",
   "Risk Controls",
   "Operations"
  ]
 },
 "Internal Audit": {
  "href": "https://www.theforage.com/completion-certificates/MBA4MnZTNFEoJZGnk/dC4ChhAkhpgB7QvGd_MBA4MnZTNFEoJZGnk_QpfYdzXEDmNXLhqhA_1776038518248_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated conducting an internal audit at Goldman Sachs — identifying control gaps, assessing operational risk, and writing audit findings for senior management review.",
  "skills": [
   "Audit Planning",
   "Risk Assessment",
   "Control Testing",
   "Reporting"
  ]
 },
 "Bloomberg Essentials": {
  "href": "",
  "kind": "Forage Short Course",
  "desc": "Completed Bloomberg's foundational training on the Bloomberg Terminal — navigating equity, fixed income, and derivatives data, using core functions (DES, GP, YAS), and building market awareness.",
  "skills": [
   "Bloomberg Terminal",
   "Equity Data",
   "Fixed Income",
   "Market Data"
  ]
 },
 "Client Service": {
  "href": "https://www.theforage.com/completion-certificates/pNeDZ9MsW9WShojQm/sqYY2sxG2zNqXfHjJ_pNeDZ9MsW9WShojQm_QpfYdzXEDmNXLhqhA_1772226277812_completion_certificate.pdf",
  "kind": "",
  "desc": "Practiced resolving client issues in Bloomberg's customer-facing support environment — troubleshooting terminal questions, communicating complex financial data clearly, and maintaining client satisfaction.",
  "skills": [
   "Client Support",
   "Bloomberg Terminal",
   "Communication",
   "Problem Solving"
  ]
 },
 "Risk": {
  "href": "https://www.theforage.com/completion-certificates/MBA4MnZTNFEoJZGnk/ETGMhLB5eCrYjcH8o_MBA4MnZTNFEoJZGnk_QpfYdzXEDmNXLhqhA_1773013487666_completion_certificate.pdf",
  "kind": "",
  "desc": "Analyzed market and credit risk scenarios at Goldman Sachs — using quantitative tools to assess portfolio exposure, stress test positions, and communicate risk to trading desks.",
  "skills": [
   "Market Risk",
   "Credit Risk",
   "VaR",
   "Stress Testing"
  ]
 },
 "Controllers": {
  "href": "https://www.theforage.com/completion-certificates/MBA4MnZTNFEoJZGnk/vjFao7z4tXKe2EwvK_MBA4MnZTNFEoJZGnk_QpfYdzXEDmNXLhqhA_1771290611068_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored the Controllers division at Goldman Sachs — financial reporting, P&L attribution, and ensuring the accuracy of the firm's balance sheet across business lines.",
  "skills": [
   "Financial Reporting",
   "P&L Attribution",
   "Accounting",
   "Controls"
  ]
 },
 "Sales & Trading Analyst": {
  "href": "https://www.theforage.com/completion-certificates/fMCqmt8qR4G85Puue/rKCBL7y5yKgzDGZmR_fMCqmt8qR4G85Puue_QpfYdzXEDmNXLhqhA_1771018296018_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated the analyst experience on BofA's sales and trading floor — executing equity and fixed income trades, preparing market commentary, and supporting senior traders with research.",
  "skills": [
   "Equity Trading",
   "Fixed Income",
   "Market Commentary",
   "Analytics"
  ]
 },
 "Investment Banking": {
  "href": "https://www.theforage.com/completion-certificates/fMCqmt8qR4G85Puue/Hi8MJQE5T3MeTRWQR_fMCqmt8qR4G85Puue_QpfYdzXEDmNXLhqhA_1733875943975_completion_certificate.pdf",
  "kind": "",
  "desc": "Identified an ideal acquisition target through SWOT analysis and strategic alignment assessment. Constructed a DCF model to determine the target's equity and share value, then applied sensitivity analysis to illustrate how valuation fluctuates based on variable shifts — presenting findings to simulate a real IB deal process.",
  "skills": [
   "DCF Modeling",
   "SWOT Analysis",
   "M&A",
   "Sensitivity Analysis",
   "Equity Valuation"
  ]
 },
 "Financial Analyst": {
  "href": "https://www.theforage.com/completion-certificates/9nvkLZzZEKAdrhjrX/TtC5eCKD3FFzH5xcz_9nvkLZzZEKAdrhjrX_QpfYdzXEDmNXLhqhA_1759096409694_completion_certificate.pdf",
  "kind": "",
  "desc": "Executed an investment banking simulation analyzing the feasibility of a strategic partnership with a major technology firm. Synthesized data-driven findings and presented recommendations to senior bankers to guide high-stakes decision-making.",
  "skills": [
   "Investment Banking",
   "Strategic Analysis",
   "Financial Modeling",
   "Presentation",
   "Due Diligence"
  ]
 },
 "Accounting": {
  "href": "https://www.theforage.com/completion-certificates/Koch%20Industries/ZHCtj63xFHrfEC7G6_Koch%20Industries_QpfYdzXEDmNXLhqhA_1711937130252_completion_certificate.pdf",
  "kind": "",
  "desc": "Worked through core accounting concepts in a Koch Industries context — journal entries, financial statement preparation, and understanding how accounting supports business decision-making.",
  "skills": [
   "Accounting",
   "Financial Statements",
   "Journal Entries",
   "GAAP"
  ]
 },
 "Run Your Own Business": {
  "href": "https://www.theforage.com/completion-certificates/RYe4hNnCZtPZEuJDx/uE2goa9xW2R28g5sK_RYe4hNnCZtPZEuJDx_QpfYdzXEDmNXLhqhA_1763252223383_completion_certificate.pdf",
  "kind": "",
  "desc": "Completed a financial analysis simulation assessing business performance through P&L statements and break-even analysis. Developed data-driven pricing strategy recommendations designed to enhance revenue potential for a small business client.",
  "skills": [
   "P&L Analysis",
   "Break-Even Analysis",
   "Pricing Strategy",
   "Financial Planning",
   "Small Business"
  ]
 },
 "Transaction Tax Consulting": {
  "href": "https://www.theforage.com/completion-certificates/Meh5Ym4DNuXyBMJxP/M5kGv9fSSu455Kbkz_Meh5Ym4DNuXyBMJxP_QpfYdzXEDmNXLhqhA_1778194624497_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated transaction tax consulting at Ryan — identifying tax savings opportunities in M&A deals, reviewing tax due diligence materials, and advising clients on transaction structuring.",
  "skills": [
   "Tax Consulting",
   "M&A Tax",
   "Due Diligence",
   "Transaction Structuring"
  ]
 },
 "Intro to Strategy Consulting": {
  "href": "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/4Rfzeut8gXmNwfxXv_SKZxezskWgmFjRvj9_QpfYdzXEDmNXLhqhA_1774131538164_completion_certificate.pdf",
  "kind": "",
  "desc": "Learned how BCG approaches complex business problems — structuring issues using MECE frameworks, conducting market sizing, synthesizing data, and presenting recommendations to client leadership.",
  "skills": [
   "Problem Structuring",
   "MECE",
   "Market Sizing",
   "Slide Decks",
   "Consulting"
  ]
 },
 "Advisors & Consulting Services": {
  "href": "https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/DZxgGgvMB6cEtEyJg_mfxGwGDp6WkQmtmTf_QpfYdzXEDmNXLhqhA_1774383140337_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated working on Mastercard's consulting arm — analyzing client data, building data-driven recommendations, and helping financial institutions optimize loyalty and payments strategy.",
  "skills": [
   "Data Analytics",
   "Client Strategy",
   "Loyalty Programs",
   "Payments"
  ]
 },
 "Ryan Company Pathway": {
  "href": "",
  "kind": "Forage Short Course",
  "desc": "Explored Ryan's tax consulting practice areas — from property tax and sales tax to credits and incentives — learning how a global tax firm delivers value to clients.",
  "skills": [
   "Tax Advisory",
   "Property Tax",
   "Incentives",
   "Client Consulting"
  ]
 },
 "UX Design Introduction": {
  "href": "https://www.theforage.com/completion-certificates/Zbnc2o4ok6kD2NEXx/N65hfzBKXRiATv6yd_Zbnc2o4ok6kD2NEXx_QpfYdzXEDmNXLhqhA_1777410408824_completion_certificate.pdf",
  "kind": "",
  "desc": "Applied human-centered design principles within a banking context at Lloyds — conducting user research, sketching wireframes, and iterating on digital product designs for banking customers.",
  "skills": [
   "UX Research",
   "Wireframing",
   "User Testing",
   "Design Thinking"
  ]
 },
 "Branding & Design": {
  "href": "https://www.theforage.com/completion-certificates/kW3rjhp6NodzrSZKK/MpLhQxNfziD3bq8Y8_kW3rjhp6NodzrSZKK_QpfYdzXEDmNXLhqhA_1745619737371_completion_certificate.pdf",
  "kind": "",
  "desc": "Created a branding strategy and visual design assets for a creative business — developing brand identity, color systems, and marketing materials aligned to a target audience.",
  "skills": [
   "Brand Strategy",
   "Visual Design",
   "Marketing",
   "Creative Direction"
  ]
 },
 "Cybersecurity": {
  "href": "https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_QpfYdzXEDmNXLhqhA_1775335930094_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated working on Mastercard's cybersecurity team — identifying phishing threats, analyzing security vulnerabilities in business processes, and recommending controls to protect payment infrastructure.",
  "skills": [
   "Phishing Analysis",
   "Threat Detection",
   "Security Controls",
   "Risk Mitigation"
  ]
 },
 "AI in Action": {
  "href": "https://www.theforage.com/completion-certificates/BotenCEjm3LFxtq9A/EregFenDKXDDeTGR2_BotenCEjm3LFxtq9A_QpfYdzXEDmNXLhqhA_1774130194937_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored how AI is being applied in private equity and enterprise software — from automating due diligence workflows to using machine learning for portfolio company performance analysis.",
  "skills": [
   "AI/ML",
   "Private Equity",
   "Due Diligence",
   "Automation",
   "Data Analysis"
  ]
 },
 "Resume Writing with AI Support": {
  "href": "https://www.theforage.com/completion-certificates/rm6of58ywoJoNuiBt/ohm6nvufSdZc2aQAA_rm6of58ywoJoNuiBt_QpfYdzXEDmNXLhqhA_1774823703709_completion_certificate.pdf",
  "kind": "",
  "desc": "Practiced crafting compelling, ATS-optimized resumes with AI assistance — learning how to tailor experience bullets to job descriptions, highlight transferable skills, and present a professional brand.",
  "skills": [
   "Resume Writing",
   "ATS Optimization",
   "Personal Branding",
   "Career Development"
  ]
 },
 "London Market Claims Adjuster": {
  "href": "https://www.theforage.com/completion-certificates/neftF7ys5jPJaBTGK/4DhLgypweHC58wkZ8_neftF7ys5jPJaBTGK_QpfYdzXEDmNXLhqhA_1777418625060_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated the claims adjuster role in the London insurance market — evaluating claim validity, reviewing policy coverage, and negotiating settlements for complex commercial insurance claims.",
  "skills": [
   "Claims Assessment",
   "Policy Review",
   "Negotiation",
   "Commercial Insurance"
  ]
 },
 "London Market Claims Operations": {
  "href": "https://www.theforage.com/completion-certificates/neftF7ys5jPJaBTGK/3ZsiCQpTkTLaMRKM7_neftF7ys5jPJaBTGK_QpfYdzXEDmNXLhqhA_1777236539506_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored the operations side of Lloyd's of London-style claims processing — managing documentation, coordinating between underwriters and brokers, and ensuring accurate claims records.",
  "skills": [
   "Claims Operations",
   "Lloyd's Market",
   "Broking",
   "Documentation"
  ]
 },
 "Underwriting": {
  "href": "https://www.theforage.com/completion-certificates/4nAmAbTbHbnGMNSyo/6miFEe83Y7PdzWJD6_4nAmAbTbHbnGMNSyo_QpfYdzXEDmNXLhqhA_1773011663418_completion_certificate.pdf",
  "kind": "",
  "desc": "Practiced underwriting decisions at AIG — assessing risk profiles for commercial insurance applications, pricing policies, and determining coverage terms based on client risk data.",
  "skills": [
   "Risk Assessment",
   "Policy Pricing",
   "Commercial Insurance",
   "Underwriting"
  ]
 },
 "Credit Analyst": {
  "href": "https://www.theforage.com/completion-certificates/ZsgybEFo5RxyHxwXL/TwxTEuyPugfgMGm8H_ZsgybEFo5RxyHxwXL_QpfYdzXEDmNXLhqhA_1783209664841_completion_certificate.pdf",
  "kind": "",
  "desc": "Simulated the role of a credit analyst at Standard Chartered — assessing creditworthiness of corporate borrowers, analyzing financial statements, calculating key credit ratios, and preparing credit approval memos for lending decisions.",
  "skills": [
   "Credit Analysis",
   "Financial Statement Analysis",
   "Credit Risk",
   "Loan Structuring",
   "Corporate Banking"
  ]
 },
 "Client Engagement": {
  "href": "https://www.theforage.com/completion-certificates/pNeDZ9MsW9WShojQm/cezQYMNq3M3y8pDHw_pNeDZ9MsW9WShojQm_QpfYdzXEDmNXLhqhA_1783209180087_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored how Bloomberg's client-facing teams deliver data solutions to institutional clients — understanding terminal workflows, communicating complex financial data products, and building relationships with traders, analysts, and portfolio managers.",
  "skills": [
   "Client Engagement",
   "Financial Data",
   "Bloomberg Terminal",
   "Institutional Sales",
   "Communication"
  ]
 },
 "Quantitative Research": {
  "href": "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/bWqaecPDbYAwSDqJy_Sj7temL583QAYpHXD_QpfYdzXEDmNXLhqhA_1780785408175_completion_certificate.pdf",
  "kind": "",
  "desc": "Applied quantitative methods to financial research in a J.P. Morgan context — building models, working with large datasets, backtesting strategies, and producing quantitative insights for trading and investment decisions.",
  "skills": [
   "Quantitative Research",
   "Python",
   "Statistical Modeling",
   "Backtesting",
   "Financial Modeling"
  ]
 },
 "Sustainability in Banking": {
  "href": "https://www.theforage.com/completion-certificates/MuLqSKBp5sav83L6j/uY9Mkm9Emf8frDPeb_MuLqSKBp5sav83L6j_QpfYdzXEDmNXLhqhA_1789700631536_completion_certificate.pdf",
  "kind": "",
  "desc": "Worked on a banking team focused on sustainability — wrote a sustainability due diligence report on a prospective palm-oil-sector client, selected the KPIs and sustainability performance targets for a sustainability-linked loan, and scoped an internal audit of the bank's GHG emissions reporting process.",
  "skills": [
   "ESG Analysis",
   "Sustainable Finance",
   "Sustainability Metrics",
   "Risk Analysis",
   "Auditing"
  ]
 },
 "Understanding the Deal Lifecycle": {
  "href": "https://www.theforage.com/completion-certificates/BotenCEjm3LFxtq9A/LsT7QKBzRpRZ7XNSv_BotenCEjm3LFxtq9A_QpfYdzXEDmNXLhqhA_1788761175473_completion_certificate.pdf",
  "kind": "",
  "desc": "Followed a private equity deal from sourcing through diligence, purchase and value creation at Vista Equity Partners — applying public comps, transaction comps and DCF valuation, and mapping how deal, finance, tax & legal and operating teams divide the work.",
  "skills": [
   "Valuation Techniques",
   "Deal Management",
   "Financial Literacy",
   "Cross-Functional Teamwork",
   "Strategic Thinking"
  ]
 },
 "Company Essentials: Citi": {
  "href": "",
  "kind": "Forage Short Course",
  "desc": "Short course on how Citi's businesses serve their clients, how the firm is organized, and what early-career paths at Citi look like.",
  "skills": [
   "Financial Services",
   "Banking Industry Knowledge",
   "Career Planning"
  ]
 },
 "Tech Explorer": {
  "href": "https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/GYcpProEZQFCiSmT6_2sNmYuurxgpFYawco_QpfYdzXEDmNXLhqhA_1788308893684_completion_certificate.pdf",
  "kind": "",
  "desc": "Rotated through Commonwealth Bank's technology teams — software engineering, tech analysis, cybersecurity and data science — gathering stakeholder requirements, deciding which user groups should get access to which tools, and analyzing customer demographics to target the launch of a new banking app.",
  "skills": [
   "Requirements Gathering",
   "Data Analysis",
   "Problem Solving",
   "Design Thinking",
   "Communication"
  ]
 },
 "Overview of Financial Services and Banking": {
  "href": "https://www.theforage.com/completion-certificates/3W4C6QjJzfhEmi4Ay/KfhEd8StnWdjsTGsw_3W4C6QjJzfhEmi4Ay_QpfYdzXEDmNXLhqhA_1788307736282_completion_certificate.pdf",
  "kind": "",
  "desc": "Built a working picture of how financial institutions serve customers, businesses and communities, how the different financial-services sectors fit together, and why trust and responsible decision-making matter.",
  "skills": [
   "Customer Focus",
   "Decision Making",
   "Ethical Reasoning",
   "Risk Management",
   "Analytical Thinking"
  ]
 },
 "Professionalism & Power Skills": {
  "href": "https://www.theforage.com/completion-certificates/3W4C6QjJzfhEmi4Ay/WknMT9xuFHr8MaB8T_3W4C6QjJzfhEmi4Ay_QpfYdzXEDmNXLhqhA_1788306386431_completion_certificate.pdf",
  "kind": "",
  "desc": "Practiced professional communication and teamwork in PNC workplace scenarios — writing clear emails, handling deadlines and disagreements, and taking accountability for mistakes and feedback.",
  "skills": [
   "Professional Writing",
   "Active Listening",
   "Conflict Management",
   "Accountability",
   "Teamwork"
  ]
 },
 "Key Roles and Business Segments": {
  "href": "https://www.theforage.com/completion-certificates/3W4C6QjJzfhEmi4Ay/uhmcdWhe4D2aaYpWN_3W4C6QjJzfhEmi4Ay_QpfYdzXEDmNXLhqhA_1787626943098_completion_certificate.pdf",
  "kind": "",
  "desc": "Explored how PNC's business segments work together to serve clients and run operations, and mapped career paths across client-facing, analytical, technology and operations roles.",
  "skills": [
   "Business Acumen",
   "Client Services",
   "Product Expertise",
   "Team Collaboration",
   "Career Planning"
  ]
 },
 "Web Development Fundamentals": {
  "href": "https://www.credly.com/badges/cf792b1c-e443-4dc6-af78-871b64d225ce",
  "kind": "Credly Digital Badge",
  "desc": "IBM SkillsBuild credential covering the building blocks of the web: structuring pages with HTML, styling them with CSS and adding interactivity with JavaScript. Issued August 25, 2026.",
  "skills": [
   "HTML",
   "CSS",
   "JavaScript",
   "Web Development"
  ]
 },
 "Lab: Troubleshoot Your Code Using IBM Bob": {
  "href": "certificates/IBM_SkillsBuild_Troubleshoot_Code_IBM_Bob.pdf",
  "kind": "Completion Certificate",
  "desc": "Hands-on IBM SkillsBuild lab on finding and fixing bugs in code with IBM Bob, IBM's AI-assisted development tool. Completed July 16, 2026 (30 learning minutes).",
  "skills": [
   "Debugging",
   "AI-Assisted Development",
   "Troubleshooting"
  ]
 },
 "Actuarial Analyst": {
  "href": "https://www.theforage.com/completion-certificates/4nAmAbTbHbnGMNSyo/b7MfbG9W4iCNGnd23_4nAmAbTbHbnGMNSyo_QpfYdzXEDmNXLhqhA_1780785305259_completion_certificate.pdf",
  "kind": "",
  "desc": "Practiced actuarial analysis at AIG — using statistical models to assess insurance risk, pricing products, projecting loss reserves, and communicating quantitative findings to underwriting and finance teams.",
  "skills": [
   "Actuarial Science",
   "Risk Modeling",
   "Statistical Analysis",
   "Loss Reserving",
   "Insurance Pricing"
  ]
 }
};

/* Full text of the recommendation letter (PDF: Aleks_Arriola_Recommendation_The1525.pdf). */
window.REC_LETTER = [
 "To Whom It May Concern:",
 "I am pleased to recommend Aleks Arriola, who worked with us as a Finance Intern at The 1525. During his time with our team, I had the opportunity to see firsthand how Aleks approaches complex assignments, works with others, and applies his analytical skills to real business challenges.",
 "What impressed me most about Aleks was his ability to take ownership of his work. In a fast-moving company, assignments are not always presented with perfectly defined parameters or step-by-step instructions. Aleks was comfortable operating in that environment. He could take an objective, determine what information was needed, work through ambiguity, and deliver thoughtful, polished work without requiring constant supervision. As a founder, that level of reliability is something I value tremendously.",
 "Aleks also demonstrated strong analytical ability and business judgment. He approached research and financial analysis with attention to detail, but he understood that analysis is only valuable if it helps a company make better decisions. Rather than simply presenting numbers or information, he worked to understand what the data meant, identify the most relevant insights, and connect his findings to practical business considerations. That ability to move between detailed analysis and the larger business picture will serve him particularly well in finance and other analytically demanding roles.",
 "I was equally impressed by Aleks’s willingness to embrace technology as a problem-solving tool. He showed an understanding of how emerging tools, including AI, automation, and data-driven workflows, can be used to work more efficiently and improve the quality of an end product. More importantly, he did not approach technology simply for the sake of using technology. He looked for ways it could solve an actual problem, streamline a process, or improve a deliverable. That combination of analytical thinking and technological fluency is becoming increasingly valuable in today’s business environment.",
 "Aleks was also an effective communicator and a strong member of our team. He was able to take complicated information and communicate it clearly, was receptive to constructive feedback, and consistently approached conversations professionally. When feedback was provided, he incorporated it into his work rather than becoming defensive about it. He demonstrated curiosity, maturity, and a genuine desire to improve throughout his internship.",
 "Internships are intended to give young professionals an opportunity to learn, but the strongest interns also find ways to create meaningful value for the organizations they join. Aleks did both. He took his responsibilities seriously, earned our trust, and demonstrated many of the qualities I would look for when evaluating someone for a full-time professional role.",
 "Based on my experience working with Aleks, I am confident that he will bring the same ownership, analytical rigor, curiosity, technological fluency, and professionalism to his next opportunity. I believe he has a very strong foundation for a successful career, and I am happy to recommend him without hesitation."
];
