'use client';


import { useState } from "react";

const WORLD_MODEL = {
  "US→CA": {
    label: "United States → Canada", data_cutoff: "March 11, 2026",
    tariff: { mfn_base: "Free (HTS 8516.80); 0% USMCA [USITC]", applied_usmca: "0% — USMCA-qualifying goods exempt from Section 122 [S122]", applied_non_usmca: "10% Section 122 global surcharge [S122]", prior_ieepa: "35% (IEEPA, Aug 1 2025–Feb 24 2026) — STRUCK DOWN [SCOTUS][BDO]", basis: "Section 122 Proclamation, Feb 20 2026, effective Feb 24 2026. Expires Jul 24 2026. [WH]", s232: "25% on steel & aluminum — NOT struck down, remains in force regardless of USMCA [SCOTUS][BDO]", usmca_note: "~90–95% of Canadian exports USMCA-compliant [FASKEN]. ~10% Thermon COGS exposed [EC-Q3-25].", thermon_specific: "Canada +1% revenue Q3 FY2026. Five CA Process Heating facilities. IEEPA refund eligible. [EC-Q3-26]", volatility: "HIGH", status: "10% S122 IN FORCE · EXPIRES Jul 24 2026" },
    hs_codes: [{ code: "8516.80.80", desc: "Electric heating resistors — heat tracing cable", mfn: "Free [USITC]", usmca: "0%", non_usmca: "10% S122", s232: "N/A" }, { code: "8516.80.40", desc: "Electric heating resistors — anti-icing/de-icing", mfn: "Free [USITC]", usmca: "0%", non_usmca: "10% S122", s232: "N/A" }, { code: "9032.10", desc: "Thermostats / temperature controllers", mfn: "Free", usmca: "0%", non_usmca: "10% S122", s232: "N/A" }, { code: "8537.10", desc: "Control panels / switchgear assemblies", mfn: "Free", usmca: "0%", non_usmca: "10% S122", s232: "N/A" }, { code: "7208–7229", desc: "Steel products (structural/enclosures)", mfn: "0–2.9%", usmca: "25% S232", non_usmca: "25% S232 (S122 not additive)", s232: "25%" }, { code: "7601–7608", desc: "Aluminum products", mfn: "2.6–5%", usmca: "25% S232", non_usmca: "25% S232", s232: "25%" }],
    ntb: [{ type: "USMCA Rules of Origin Documentation", detail: "Chapter 4 RVC and tariff classification change tests. Thermon must document qualifying content for all intracompany flows from five Canadian Process Heating facilities.", severity: "HIGH" }, { type: "IEEPA Refund Opportunity", detail: "IEEPA tariffs paid Mar 2025–Feb 24 2026 at 25–35% on non-USMCA Canadian goods are potentially refundable per CIT proceedings. File CIT protests immediately to preserve refund rights. [BDO]", severity: "HIGH" }, { type: "Section 232 Permanent Exposure", detail: "25% S232 on Canadian steel and aluminum remains in force regardless of SCOTUS ruling and USMCA status. Affects US manufacturing facilities.", severity: "MEDIUM" }, { type: "CSA vs UL Certification", detail: "Canadian Standards Association electrical certification required for equipment sold in Canada. Not mutually recognized with UL.", severity: "MEDIUM" }],
    sources: ["USITC HTS 2025 Rev 29", "S122 Proclamation Feb 20 2026", "EY Global Tax Alert Feb 24 2026", "Fasken Feb 2026", "BDO IEEPA Refund FAQs Mar 2026", "Blake Cassels & Graydon"],
  },
  "CA→US": {
    label: "Canada → United States", data_cutoff: "March 11, 2026",
    tariff: { mfn_base: "0% USMCA / ~4% WTO MFN average", applied_usmca: "0%", applied_non_usmca: "25% Canadian retaliatory surtax (CA law — unaffected by SCOTUS)", basis: "Government of Canada Finance Dept retaliatory surtax, effective Mar 13 2025. CA$29.8B tranche. Independent of US tariff architecture. [BLAKES]", remission: "Canada remission orders extended to Jun 30 2026 for steel/aluminum used in manufacturing. [BLAKES]", volatility: "HIGH", status: "25% CA RETALIATORY IN FORCE · INDEPENDENT OF SCOTUS" },
    hs_codes: [{ code: "8516.80", desc: "US-made heat tracing cable", mfn: "0% (USMCA)", usmca: "0%", non_usmca: "25% CA retaliatory surtax", s232: "N/A" }, { code: "7208–7229", desc: "US steel products", mfn: "0% (USMCA)", usmca: "Subject to CA review", non_usmca: "25% CA surtax on steel derivatives", s232: "CA own 25% surtax" }],
    ntb: [{ type: "Oil Sands Capital Spending", detail: "AER tariff scenario: 11.1% reduction in Alberta CapEx if tariffs persist. However four largest oil sands producers targeting $14B CapEx 2026 (+5%). Baseload production economics — inelastic to price. [AER][ARGUS]", severity: "MEDIUM" }, { type: "Canadian Procurement Preferences", detail: "Federal and provincial procurement favouring Canadian-content suppliers. May affect Thermon's Alberta oil sands customer relationships.", severity: "MEDIUM" }],
    sources: ["Government of Canada Finance Dept", "Blake Cassels & Graydon", "AER ST98 Outlook 2025", "Argus Media Jan 2026"],
  },
  "US→CN": {
    label: "United States → China", data_cutoff: "March 11, 2026",
    tariff: { mfn_base: "3.5% WTO simple average Chapter 85 [WTO]", applied_stack: "Free MFN (HTS 8516.80) + 25% S301 (List 1/2) + 10% S122 = ~35% total", semiconductor_stack: "Free MFN + 50% S301 (raised Jan 1 2025) + 10% S122 = ~60% on HTS 8541–8542", ieepa_note: "IEEPA fentanyl tariff (20%) and IEEPA reciprocal (peak 145%) STRUCK DOWN Feb 24 2026. [SCOTUS][BDO]", basis: "Section 301 (USTR Lists 1–4A) + Section 122. S301 upheld Federal Circuit Sep 2025; unaffected by SCOTUS. USTR raised S301 on semiconductors to 50% Jan 1 2025. [S301]", s232: "25% on steel/aluminum — not additive with S122", thermon_specific: "China exposure: ~5% of total revenue combined with Mexico [EC-Q3-25]. No Thermon manufacturing in China. Single-source Chinese electronic controller components. Alt supplier: 12–24 months. [10-K24]", volatility: "HIGH", status: "S301 + S122 IN FORCE · IEEPA STRUCK DOWN · REFUND ELIGIBLE" },
    hs_codes: [{ code: "8516.80.80", desc: "Heat tracing cable / electric heating resistors", mfn: "Free [USITC]", s301: "25% List 1/2", s122: "+10%", total: "~35%", note: "Main product" }, { code: "9032.10/9032.89", desc: "Temperature controllers / thermostats", mfn: "Free", s301: "25% List 3", s122: "+10%", total: "~35%", note: "Single-source risk" }, { code: "8537.10", desc: "Control panels / switchgear", mfn: "Free", s301: "25% List 1", s122: "+10%", total: "~35%", note: "Industrial controls" }, { code: "8541–8542", desc: "Semiconductors / ICs (controller board inputs)", mfn: "Free", s301: "50% (raised Jan 1 2025)", s122: "+10%", total: "~60%", note: "HIGHEST EXPOSURE" }, { code: "7208–7229", desc: "Steel (if Chinese origin)", mfn: "0–2.9%", s301: "25%", s122: "N/A (S232)", total: "25% S232 + 25% S301", note: "S232 not additive with S122" }],
    ntb: [{ type: "BIS Entity List / Export Controls", detail: "EAR export controls restrict advanced components. Thermon electronic control systems may require license review for China-destination goods.", severity: "HIGH" }, { type: "Chinese Critical Mineral Export Controls", detail: "China controls on gallium, germanium, graphite, antimony (2024–2025). Directly relevant to Thermon controller supply chain.", severity: "HIGH" }, { type: "IEEPA Refund on Chinese Inputs", detail: "IEEPA tariffs paid Feb 2025–Feb 24 2026 on Chinese-origin electronic inputs may be refundable. File CIT protests. [BDO]", severity: "MEDIUM" }],
    sources: ["USTR Section 301 Register", "USITC HTS 2025", "S122 Proclamation", "BDO Mar 2026", "Federal Circuit Sep 2025", "Thermon 10-K24"],
  },
  "CN→US": {
    label: "China → United States", data_cutoff: "March 11, 2026",
    tariff: { mfn_base: "7.5% WTO average", applied: "25% MOFCOM retaliatory tariffs on US goods — China sovereign policy, unaffected by SCOTUS", basis: "MOFCOM retaliatory schedule. Independent of US legal framework.", volatility: "ELEVATED", status: "CHINESE RETALIATORY IN FORCE · INDEPENDENT OF SCOTUS" },
    hs_codes: [{ code: "8516, 9032, 8537", desc: "US-made heating/control equipment exported to China", mfn: "~3–5% China MFN", total: "25% CN retaliatory (US origin)", note: "~5% combined CN+MX revenue" }],
    ntb: [{ type: "Critical Mineral Export Controls", detail: "China export controls on gallium, germanium, graphite, antimony constrain US controller manufacturing. No viable short-term substitutes at scale.", severity: "HIGH" }],
    sources: ["MOFCOM", "Chinese State Council"],
  },
  "US→EU": {
    label: "United States → European Union", data_cutoff: "March 11, 2026",
    tariff: { mfn_base: "3.5% WTO average", applied: "10% Section 122 global surcharge (EU is non-USMCA) [S122]", ieepa_note: "Prior IEEPA 10% struck down. S122 replaces at same rate but expires Jul 24 2026.", basis: "Section 122 Proclamation, Feb 20 2026. Plus S232 on steel/aluminum.", s232: "25% on steel; 25% aluminum — remains in force, not additive with S122", thermon_specific: "EMEA revenue Q3 FY2026: +37% YoY [EC-Q3-26]. FATI (Milan) doubled operations in <18 months. Medium voltage heater pipeline >$150M.", volatility: "MODERATE", status: "10% S122 IN FORCE · EXPIRES Jul 24 2026" },
    hs_codes: [{ code: "8516.80", desc: "Electric heating resistors (US to EU)", mfn: "3.5% EU MFN approx", usmca: "N/A", non_usmca: "10% S122 on US imports", s232: "N/A" }, { code: "8540–8543", desc: "Electronic industrial apparatus (FATI products)", mfn: "3–4%", usmca: "N/A", non_usmca: "10% S122 on US-bound", s232: "N/A" }],
    ntb: [{ type: "CBAM — Carbon Border Adjustment Mechanism", detail: "Full operation Jan 1 2026. FATI's Milan facility manufacturing steel-component heaters faces embedded carbon reporting and certificate purchase. [EU Reg 2023/956]", severity: "HIGH" }, { type: "EU Machinery Regulation 2023/1230", detail: "Effective January 2027. All Thermon/FATI EU products require updated conformity assessment.", severity: "MEDIUM" }, { type: "EU-US Framework Deal Uncertainty", detail: "US-EU framework agreement negotiated under IEEPA — status uncertain post-SCOTUS. [WilmerHale]", severity: "MEDIUM" }],
    sources: ["S122 Proclamation", "EU Regulation 2023/956 (CBAM)", "Thermon EC-Q3-26", "Thermon 8K-FATI"],
  },
  "EU→US": {
    label: "European Union → United States", data_cutoff: "March 11, 2026",
    tariff: { mfn_base: "Free (HTS 8516.80) / 3.3% WTO average [USITC][WTO]", applied: "Free MFN + 10% S122 on EU-origin goods entering US [S122]", basis: "Section 122 applies uniformly to non-S232, non-USMCA goods. FATI Milan products entering US: 10% total.", volatility: "MODERATE", status: "10% S122 ON EU GOODS ENTERING US · EXPIRES Jul 24 2026" },
    hs_codes: [{ code: "8516.80", desc: "FATI/Thermon EU-made heaters entering US", mfn: "Free [USITC]", usmca: "N/A", non_usmca: "10% S122", s232: "N/A" }],
    ntb: [{ type: "FATI European Certification Value", detail: "FATI's IECEx, ATEX, CE certifications are strategic assets enabling EU and Asian market entry. Reduces NTB exposure. [8K-FATI]", severity: "LOW (mitigant)" }],
    sources: ["S122 Proclamation", "USITC HTS 2025", "Thermon 8K-FATI"],
  },
  "US→IN": {
    label: "United States → India", data_cutoff: "March 11, 2026",
    tariff: { mfn_base: "Free (HTS 8516.80) [USITC]", applied: "10% Section 122 [S122]. Prior IEEPA 26% reciprocal tariff struck down.", ieepa_note: "India IEEPA 26% rate invalid. S122 at 10% flat — net improvement for Thermon APAC cost structure.", basis: "Section 122, Feb 24 2026.", thermon_specific: "APAC revenue Q3 FY2026: +9% YoY [EC-Q3-26]. Pune India assembly. APAC ~10% of total revenue.", volatility: "MODERATE", status: "10% S122 IN FORCE · IEEPA 26% STRUCK DOWN" },
    hs_codes: [{ code: "8516.80", desc: "Heat tracing cable to India (Pune assembly)", mfn: "Free [USITC]", usmca: "N/A", non_usmca: "10% S122", s232: "N/A" }, { code: "9032", desc: "Controllers to India", mfn: "Free", usmca: "N/A", non_usmca: "10% S122", s232: "N/A" }],
    ntb: [{ type: "India BIS Certification", detail: "Bureau of Indian Standards mandatory certification for electrical goods. Separate from IEC and UL standards.", severity: "MEDIUM" }],
    sources: ["S122 Proclamation", "USITC HTS 2025", "Thermon EC-Q3-26"],
  },
};

const DIGITAL_TWIN = {
  firm: "Thermon Group Holdings, Inc.", ticker: "NYSE: THR",
  hq: "7171 Southwest Parkway, Building 300, Suite 200, Austin, TX 78735 [10-K25]",
  financials: { fy2025_revenue: "$536M bookings / ~$509M revenue [8K-Q4-25]", fy2026_guidance_raised: "$516–526M revenue, $114–120M Adj. EBITDA [EC-Q3-26]", q3_fy2026_revenue: "$147.3M (+9.6% YoY, ALL ORGANIC) [EC-Q3-26]", q3_fy2026_gross_margin: "46.6% (+40bps YoY) [EC-Q3-26]", q3_fy2026_adj_ebitda: "$35.6M (24.2% margin) [EC-Q3-26]", q3_fy2026_backlog: "$259.4M (+10.1% YoY) [EC-Q3-26]", net_debt_dec2025: "$96.3M, leverage 0.8x [10-Q3-26]", credit_facility: "$125M term loan + $115M revolver, due Jul 24 2030, JPMorgan Chase [CRED-25]", borrowers: "Thermon Holding Corp (US), Thermon Canada Inc, Thermon Europe B.V. [CRED-25]", market_cap: "~$1.5B (Feb 5 2026) [EC-Q3-26]", acquisition_alert: "PENDING ACQUISITION: Feb 24 2026: CECO Environmental (Nasdaq: CECO) announced definitive agreement to acquire Thermon in ~$2.2B stock+cash deal. Shareholders elect $63.89/share cash, 0.8110 CECO shares, or mixed consideration. 26.8% premium to Feb 23 close. Expected close mid-2026, subject to regulatory clearance. [THR 8-K Feb 24 2026]", revenue_mix: ">70% from non-oil-and-gas end markets [10-K25]" },
  employees: { total: "1,568 employees + 227 contingent workers at Mar 31 2025 [10-K25]", us_lam: "43.9%", canada: "32.8%", emea: "11.2%", apac: "12.1%", safety: "TRIR 0.2, LTIR 0.0, zero fatal incidents FY2024 and FY2025 [10-K25]" },
  primary_hs_codes: [{ code: "8516.80.80", desc: "Electric heating resistors (heat tracing cable) — MFN: Free [USITC confirmed]" }, { code: "9032.10 / 9032.89", desc: "Thermostats / automatic temperature regulators" }, { code: "8537.10", desc: "Industrial control panels, circuit breaker panels" }, { code: "8541–8542", desc: "Semiconductor inputs (controller boards) — 50% S301 from Jan 1 2025" }],
  acquisitions: [
    { name: "Vapor Power International", date: "January 2, 2024", price: "cash + term loan [8K-VP]", revenue: ">$50M (CY2023)", description: "Electric, electrode, and gas-fired boilers; steam generators. Chicago IL + Morristown TN. $55–59M FY2025 contribution." },
    { name: "F.A.T.I. (Milan, Italy)", date: "October 3, 2024", price: "€12.5M cash [8K-FATI]", revenue: ">€12M (CY2023)", description: "Founded 1945. Electrical heaters, heating systems, heat exchangers, process skids. 30+ countries. IECEx/ATEX/CE certified. Operations doubled in <18 months." },
  ],
  segments: [
    { name: "United States & Latin America (US-LAM)", revenue_share: "~45%", revenue_fy2025: "~$229M est.", q3_fy2026: "+10% YoY [EC-Q3-26]", manufacturing: ["San Marcos, TX — primary (heat tracing cables, controls)", "Chicago, IL — Vapor Power (boilers)", "Morristown, TN — Vapor Power (specialty boilers)", "Salt Lake City, UT", "Houston, TX — assembly", "Mexico City, Mexico — safety stock only"], relevant_pairs: ["US→CA", "US→CN"], notes: "Primary manufacturing base. Tariff exposure: Canadian intracompany shipments (10% S122, down from 35% IEEPA) + Chinese electronic controllers (~35% stack). Growth: Poseidon liquid load banks (data centers, $60M quote log, 40 units ordered), medium voltage heaters (>$150M pipeline), power bid pipeline $180M (+58%). [EC-Q3-26]" },
    { name: "Canada", revenue_share: "~30%", revenue_fy2025: "~$153M est.", q3_fy2026: "+1% YoY [EC-Q3-26]", manufacturing: ["Calgary, AB — Process Heating (oil sands proximity)", "Edmonton, AB — Process Heating (oil sands proximity)", "Fort McMurray, AB — Process Heating (oil sands direct)", "Oakville, ON — Process Heating", "Orillia, ON — Process Heating"], relevant_pairs: ["US→CA", "CA→US"], notes: "Five Process Heating facilities. ~10% of COGS on US-Canada tariff flows [EC-Q3-25]. Three Alberta facilities serve oil sands operators (CNRL, Cenovus, Suncor). Oil sands CapEx 2026: $14B (+5%) [ARGUS]. Canada +1% Q3 FY2026 — tariff uncertainty dampening demand. IEEPA refund opportunity on Mar 2025–Feb 2026 tariff overpayments.", fx: "CAD/USD translation: ~30% revenue in Canada. Thermon holds CAD forward hedges [10-Q3-26]" },
    { name: "Europe, Middle East & Africa (EMEA)", revenue_share: "~15%", revenue_fy2025: "~$76M est.", q3_fy2026: "+37% YoY — strongest segment [EC-Q3-26]", manufacturing: ["Milan (Cusago), Italy — F.A.T.I. (electrical heaters, heat exchangers, process skids)", "Pijnacker, Netherlands — European distribution hub (Thermon Europe B.V.)"], relevant_pairs: ["US→EU", "EU→US"], notes: "Fastest-growing segment Q3 FY2026 (+37%). FATI operations doubled in <18 months; expected to double again. CBAM exposure from Jan 2026 on FATI steel-component manufacturing. Thermon Europe B.V. is a named borrower under JPMorgan credit facility." },
    { name: "Asia-Pacific (APAC)", revenue_share: "~10%", revenue_fy2025: "~$51M est.", q3_fy2026: "+9% YoY [EC-Q3-26]", manufacturing: ["Pune, India — assembly", "Melbourne, Australia — safety stock"], relevant_pairs: ["US→IN"], notes: "India assembly. Australia + Middle East via distribution. S122 10% improvement over 26% IEEPA for India. FATI European certifications accelerating Asian market entry. 100+ independent agents/distributors in 30+ countries. [10-K25]" },
  ],
  supply_chain: [
    { input: "Copper (wire, bus conductors)", origin: "North American primary", tariff_pair: null, risk: "LOW", note: "Commodity — multiple suppliers. Price risk only." },
    { input: "Specialty fluoropolymers (cable insulation)", origin: "US, Europe, partial Asian", tariff_pair: "US→CN (partial)", risk: "MEDIUM", note: "Chinese-origin grades: ~35% stack (S301+S122). Some North American substitution." },
    { input: "Electronic controllers / thermostats", origin: "Partially Chinese single-source", tariff_pair: "US→CN", risk: "HIGH", note: "Single-source dependency [10-K24]. ~35% stack. Alt supplier 12–24 months. IEEPA refund eligible." },
    { input: "Semiconductor components (controller boards)", origin: "Asian, partially Chinese", tariff_pair: "US→CN", risk: "HIGH", note: "HTS 8541–8542: 50% S301 + 10% S122 = ~60% if Chinese origin. Highest remaining stack." },
    { input: "Steel (structural, enclosures)", origin: "North American primary", tariff_pair: "CA→US (S232)", risk: "MEDIUM", note: "25% S232 on Canadian steel regardless of USMCA. Unaffected by SCOTUS. [BDO]" },
    { input: "Aluminum (enclosures, heat sinks)", origin: "North American primary", tariff_pair: "CA→US (S232)", risk: "LOW-MEDIUM", note: "25% S232 on Canadian aluminum. S232 confirmed in force post-SCOTUS." },
    { input: "Process skid components (F.A.T.I.)", origin: "European (Italian supply chain)", tariff_pair: "EU→US", risk: "LOW", note: "CBAM applies to steel/aluminum content. 10% S122 on FATI products entering US." },
  ],
  tariff_quantification: { fy2026_gross_impact: "$16–20M annualized before mitigation [EC-Q4-25]", mitigation_status: "Successfully mitigated Q1, Q2, Q3 FY2026. Gross margin sustained/improved. [EC-Q3-26]", cogs_exposure: "~10% of total COGS on US-Canada tariff flows [EC-Q3-25 CFO]", ieepa_overpayment: "IEEPA 35% tariffs paid Mar 2025–Feb 24 2026 on Canadian flows potentially refundable. File CIT protests. [BDO]", in_country_strategy: "No manufacturing in China or Mexico. [CEO Thames EC-Q3-25]", guidance_basis: "Q3 FY2026 guidance raised to $516–526M based on successful mitigation. [EC-Q3-26]" },
  disclosed_exposures: [
    { category: "Intracompany CA→US process heating shipments", severity: "HIGH", channel: "COGS", current_rate: "10% S122 (non-USMCA) — down from 35% IEEPA [S122][FASKEN]", prior_rate: "35% IEEPA (Aug 1 2025–Feb 24 2026) — STRUCK DOWN", detail: "~10% of total COGS on US-Canada tariff flows [EC-Q3-25]. Five CA Process Heating facilities. USMCA qualification is the operative compliance question. Canada +1% Q3 FY2026.", time_horizon: "Immediate. S122 expires Jul 24 2026.", ieepa_refund: "IEEPA tariffs paid Mar 2025–Feb 24 2026 potentially refundable. File CIT protests. [BDO]" },
    { category: "Electronic controllers (Chinese origin, single-source)", severity: "HIGH", channel: "Supply chain / COGS", current_rate: "~35% (Free MFN + 25% S301 + 10% S122)", prior_rate: "Peak ~170% IEEPA stack — IEEPA component struck down", detail: "Single-source Chinese manufacturer [10-K24]. S301 permanent (upheld Federal Circuit Sep 2025). Alt supplier: 12–24 months. CN+MX ~5% of revenue [EC-Q3-25].", time_horizon: "S301 permanent. S122 expires Jul 24 2026.", ieepa_refund: "IEEPA tariffs paid Feb–Feb 2026 on Chinese inputs potentially refundable [BDO]." },
    { category: "Semiconductor inputs (controller boards, Chinese origin)", severity: "HIGH", channel: "Supply chain / COGS", current_rate: "~60% (Free MFN + 50% S301 + 10% S122)", prior_rate: "50% S301 raised Jan 1 2025 — independent of IEEPA", detail: "HTS 8541–8542. USTR 4-year review raised S301 to 50% Jan 1 2025, unaffected by SCOTUS. Highest remaining tariff stack.", time_horizon: "Structural — S301 permanent.", ieepa_refund: "N/A" },
    { category: "CBAM — F.A.T.I. Milan manufacturing", severity: "MEDIUM", channel: "Regulatory / cost", current_rate: "Full CBAM operation Jan 1 2026 — carbon reporting + certificate purchase [EU Reg 2023/956]", prior_rate: "Transitional reporting period 2024–2025", detail: "FATI Milan manufactures steel-component heaters. CBAM applies to embedded carbon. Cost scales with EU ETS carbon price.", time_horizon: "Structural — permanent EU regulation.", ieepa_refund: "N/A" },
    { category: "Steel & aluminum inputs (Canadian, Section 232)", severity: "MEDIUM", channel: "COGS", current_rate: "25% S232 — confirmed in force [SCOTUS][BDO]", prior_rate: "25% S232 — in force since 2018/2025", detail: "S232 unaffected by SCOTUS ruling. Applies regardless of USMCA. Affects US manufacturing (San Marcos TX primary).", time_horizon: "Structural — S232 no expiry.", ieepa_refund: "N/A" },
    { category: "CAD/USD FX translation", severity: "LOW-MEDIUM", channel: "Revenue translation", current_rate: "Market rate — CAD forward hedges held [10-Q3-26]", prior_rate: "CAD/USD ~US$0.73 (2024) [AER]", detail: "~30% of revenue in Canadian operations. Tariff rate reduction (35%→10%) reduces margin pressure on Canadian segment.", time_horizon: "Ongoing", ieepa_refund: "N/A" },
    { category: "Oil sands end-market concentration (Canada segment)", severity: "MEDIUM", channel: "Revenue / demand", current_rate: "N/A — end-market exposure, not tariff", prior_rate: "N/A", detail: "Three of five Canadian facilities serve oil sands directly. $14B CapEx 2026 (+5%) from four largest producers [ARGUS]. Baseload — inelastic to price.", time_horizon: "Structural — long-cycle capex. Post-2028 pipeline constraints flagged.", ieepa_refund: "N/A" },
  ],
  growth_platforms: { "data_centers": "Poseidon liquid load banks. 20 units shipped, 40 ordered, $60M quote log (doubled from $30M Sep 2025). Dedicated production line scaling. [EC-Q3-26]", "medium_voltage_heaters": "Pipeline >$150M; backlog >$11M; quotes through FY2027–28. FATI Milan capacity expanding. [EC-Q3-26]", "power_generation": "Bid pipeline $180M (+58%), >60% US. LNG, midstream gas, sustainable aviation fuels. Large project revenue Q3 FY2026: $25.4M (+37%). [EC-Q3-26]", "3D_strategy": "Decarbonization, Diversification, Digitization. $93M revenue FY2025. 28 new products/software in FY2025. [EC-Q4-25]", "genesis_network": "Proprietary IIoT heat tracing monitoring. Real-time diagnostics, predictive maintenance, centralized monitoring. Next-generation Jan 2024. [10-K25]" },
  competitive_landscape: {
    market_size: "$2.96B global EHT market (2024) → $4.34B (2029), CAGR 7.9% [M&M]",
    key_event: "nVent divested Raychem/Tracer to Brookfield $1.7B (Aug 2024). Thermon and Brookfield/Raychem now primary standalone thermal specialists. [MORD]",
    competitors: [{ name: "Raychem/Tracer (Brookfield, formerly nVent)", note: "Largest pure-play thermal competitor" }, { name: "Chromalox (Spirax-Sarco)", note: "US-based, Electric Thermal Solutions segment" }, { name: "BARTEC Top Holding GmbH", note: "Hazardous area heating specialist" }, { name: "Danfoss", note: "Nordic/commercial heat trace" }, { name: "Watlow Electric Manufacturing", note: "Thermal systems, industrial controls" }, { name: "NIBE Group (Sweden)", note: "Climate solutions, includes heating cables" }, { name: "Emerson Electric (DeltaV)", note: "Industrial controls and process heating" }],
    thermon_differentiators: "In-country manufacturing (no China/Mexico exposure). Genesis Network IIoT platform. FATI European certifications. 70-year installed base.",
  },
};

const M = "'IBM Plex Mono', 'Courier New', monospace";
const S = "'IBM Plex Sans', 'Helvetica Neue', sans-serif";
const SEV = { HIGH: { bg: "#2d1010", b: "#8b2020", t: "#e87070" }, MEDIUM: { bg: "#2a1f0a", b: "#7a5010", t: "#d4942a" }, LOW: { bg: "#0f1f10", b: "#205020", t: "#60b060" }, "LOW-MEDIUM": { bg: "#1a1f0a", b: "#506020", t: "#a0b040" }, ELEVATED: { bg: "#2a1a05", b: "#8a5010", t: "#e08030" }, MODERATE: { bg: "#0f1a20", b: "#205060", t: "#50a0c0" }, "LOW (mitigant)": { bg: "#0a1a0a", b: "#1a4020", t: "#50a060" } };
const Badge = ({ v, sm }) => { const s = SEV[v] || SEV.MEDIUM; return <span style={{ background: s.bg, border: `1px solid ${s.b}`, color: s.t, fontFamily: M, fontSize: sm ? "7px" : "8px", padding: "1px 5px", display: "inline-block", whiteSpace: "nowrap" }}>{v}</span>; };
const H = ({ c }) => <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6", letterSpacing: "0.16em", marginBottom: "6px", paddingBottom: "3px", borderBottom: "1px solid #1a2a1a" }}>▸ {c}</div>;
const R = ({ l, v, hi }) => <div style={{ display: "flex", gap: "8px", padding: "4px 0", borderBottom: "1px solid #0f1520" }}><div style={{ width: "170px", flexShrink: 0, fontFamily: M, fontSize: "10px", color: "#445", lineHeight: "1.4" }}>{l}</div><div style={{ flex: 1, fontFamily: M, fontSize: hi ? "10px" : "8px", color: hi ? "#e87070" : "#aab", lineHeight: "1.5" }}>{v}</div></div>;

export default function App() {
  const [tab, setTab] = useState("overview");
  const [pair, setPair] = useState("US→CA");
  const [seg, setSeg] = useState(null);
  const wm = WORLD_MODEL[pair];
  const tw = DIGITAL_TWIN;

  return (
    <div style={{ background: "#070c12", minHeight: "100vh", color: "#ccd", fontFamily: S, fontSize: "14px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e3}button{cursor:pointer}`}</style>
      <div style={{ background: "#0b1018", borderBottom: "1px solid #1a2530", padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: M, fontSize: "11px", color: "#3a6", letterSpacing: "0.15em" }}>WORLD MODEL v0.3</span>
          <span style={{ fontFamily: M, fontSize: "8px", color: "#334" }}>THERMON GROUP HOLDINGS DIGITAL TWIN · Mar 11 2026</span>
        </div>
        <div style={{ display: "flex", gap: "8px", fontFamily: M, fontSize: "8px", flexWrap: "wrap" }}>
          <span style={{ color: "#e87070" }}>⚠ POST-SCOTUS Feb 20 2026</span><span style={{ color: "#334" }}>·</span>
          <span style={{ color: "#2a5" }}>S122 10% thru Jul 24</span><span style={{ color: "#334" }}>·</span>
          <span style={{ color: "#3a6" }}>S232+S301 INTACT</span><span style={{ color: "#334" }}>·</span>
          <span style={{ color: "#d4942a" }}>IEEPA REFUND ELIGIBLE</span>
        </div>
      </div>
      <div style={{ background: "#100a04", borderBottom: "1px solid #3a2010", padding: "4px 14px", fontFamily: M, fontSize: "8px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ color: "#d4942a" }}>Feb 20 2026: SCOTUS strikes IEEPA [Learning Resources v. Trump, 6-3]</span><span style={{ color: "#445" }}>·</span>
        <span style={{ color: "#aab" }}>S122 10% effective Feb 24 · expires Jul 24 2026</span><span style={{ color: "#445" }}>·</span>
        <span style={{ color: "#60b060" }}>IEEPA tariffs Feb 2025–Feb 2026 refund eligible · CIT proceedings ongoing</span>
      </div>
      <div style={{ background: "#0b1018", borderBottom: "1px solid #1a2530", padding: "0 14px", display: "flex", flexWrap: "wrap" }}>
        {[["overview","OVERVIEW"],["world","WORLD MODEL"],["twin","DIGITAL TWIN"],["exposure","EXPOSURES"],["growth","GROWTH"],["comp","COMPETITIVE"],["hs","HS MAP"],["usmca","USMCA RENEG"]].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{ background: "none", border: "none", borderBottom: tab===id?"2px solid #3a6":"2px solid transparent", color: tab===id?"#3a6":"#334", fontFamily: M, fontSize: "10px", letterSpacing: "0.12em", padding: "7px 9px" }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: "12px 14px", maxWidth: "1400px" }}>

        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="THERMON GROUP HOLDINGS · NYSE: THR" />
              <div style={{ fontFamily: M, fontSize: "17px", color: "#dde", marginBottom: "2px" }}>{tw.firm}</div>
              <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "7px" }}>{tw.hq}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
                {[["FY2025 Revenue","~$509M [8K-Q4-25]"],["FY2026 Guidance","$516–526M raised [EC-Q3-26]"],["Q3 FY2026 Revenue","$147.3M (+10% organic) [EC-Q3-26]"],["Q3 Adj. EBITDA","$35.6M · 24.2% margin"],["Backlog Dec 2025","$259.4M (+10%) [EC-Q3-26]"],["Net Leverage","0.8x [10-Q3-26]"],["Employees","1,568 + 227 contingent [10-K25]"],["Market Cap","~$1.5B [EC-Q3-26]"]].map(([k,v]) => (
                  <div key={k} style={{ padding: "4px 6px", background: "#080c12", borderLeft: "2px solid #1a3020" }}>
                    <div style={{ fontFamily: M, fontSize: "7px", color: "#334", marginBottom: "1px" }}>{k}</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#aab" }}>{v}</div>
                  </div>
                ))}
              </div>
              <H c="ACQUISITIONS" />
              {tw.acquisitions.map(a => (
                <div key={a.name} style={{ padding: "5px 6px", background: "#080c12", borderLeft: "2px solid #1a2530", marginBottom: "3px" }}>
                  <span style={{ fontFamily: M, fontSize: "10px", color: "#3a6" }}>{a.name}</span>
                  <span style={{ fontFamily: M, fontSize: "8px", color: "#334", marginLeft: "7px" }}>{a.date} · {a.price}</span>
                  <div style={{ fontFamily: S, fontSize: "12px", color: "#556", marginTop: "2px" }}>{a.description.slice(0,85)}…</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="WORLD MODEL — ACTIVE PAIRS (post-SCOTUS S122)" />
              {Object.entries(WORLD_MODEL).map(([key, w]) => (
                <div key={key} onClick={() => { setPair(key); setTab("world"); }}
                  style={{ display: "flex", gap: "6px", alignItems: "center", padding: "5px 7px", background: "#080c12", border: "1px solid #1a2530", marginBottom: "3px", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor="#1e3"}
                  onMouseLeave={e => e.currentTarget.style.borderColor="#1a2530"}
                >
                  <div style={{ fontFamily: M, fontSize: "11px", color: "#ccd", width: "58px", flexShrink: 0 }}>{key}</div>
                  <div style={{ flex: 1, fontFamily: M, fontSize: "8px", color: "#334", lineHeight: "1.4" }}>{(w.tariff.applied_non_usmca || w.tariff.applied || w.tariff.applied_stack || "").slice(0,48)}</div>
                  <Badge v={w.tariff.volatility} sm />
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#2a5", whiteSpace: "nowrap" }}>{w.tariff.status.split("·")[0].trim()}</div>
                </div>
              ))}
            </div>
            <div style={{ gridColumn: "1/-1", background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="PRIORITY EXPOSURES — QUANTIFIED · POST-SCOTUS RATES" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "7px" }}>
                {tw.disclosed_exposures.filter(e => e.severity==="HIGH").map((e, i) => (
                  <div key={i} style={{ background: "#100808", border: "1px solid #2d1010", padding: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <div style={{ fontFamily: M, fontSize: "8px", color: "#e87070", flex: 1, paddingRight: "5px", lineHeight: "1.4" }}>{e.category.toUpperCase()}</div>
                      <Badge v={e.severity} sm />
                    </div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6", marginBottom: "2px" }}>NOW: {e.current_rate.split("[")[0].trim()}</div>
                    {e.prior_rate && e.prior_rate!=="N/A" && <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "3px" }}>PRIOR: {e.prior_rate.slice(0,45)}…</div>}
                    <div style={{ fontFamily: S, fontSize: "12px", color: "#778", lineHeight: "1.5" }}>{e.detail.slice(0,95)}…</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: "1/-1", background: "#080c12", border: "1px solid #1a3020", padding: "11px" }}>
              <H c="TARIFF QUANTIFICATION & MITIGATION STATUS [EC-Q4-25 / EC-Q3-26]" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                {Object.entries(tw.tariff_quantification).map(([k,v]) => (
                  <div key={k} style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #1a3020" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>{k.replace(/_/g," ").toUpperCase()}</div>
                    <div style={{ fontFamily: S, fontSize: "12px", color: "#778", lineHeight: "1.5" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "world" && (
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: "9px" }}>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "9px" }}>
              <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "5px" }}>PAIRS</div>
              {Object.keys(WORLD_MODEL).map(key => (
                <button key={key} onClick={() => setPair(key)} style={{ display: "block", width: "100%", textAlign: "left", background: pair===key?"#0f1e10":"none", border: `1px solid ${pair===key?"#1e3":"transparent"}`, color: pair===key?"#3a6":"#334", fontFamily: M, fontSize: "11px", padding: "5px 6px", marginBottom: "2px" }}>{key}</button>
              ))}
            </div>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>BILATERAL PAIR · {wm.data_cutoff}</div>
                  <div style={{ fontFamily: M, fontSize: "18px", color: "#dde" }}>{wm.label}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Badge v={wm.tariff.volatility} />
                  <div style={{ fontFamily: M, fontSize: "10px", color: "#2a5", marginTop: "3px" }}>{wm.tariff.status}</div>
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <H c="TARIFF ARCHITECTURE" />
                {Object.entries(wm.tariff).filter(([k])=>!["volatility","status"].includes(k)).map(([k,v]) => <R key={k} l={k.replace(/_/g," ").toUpperCase()} v={v} hi={["applied_non_usmca","applied_stack","applied"].includes(k)} />)}
              </div>
              {wm.hs_codes && (
                <div style={{ marginBottom: "12px" }}>
                  <H c="HTS CODE — THERMON PRODUCT LINES" />
                  <div style={{ display: "grid", gridTemplateColumns: "80px 150px 1fr 1fr 52px", gap: "3px", padding: "3px 6px", background: "#080c12", fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>
                    {["HTS","DESCRIPTION","MFN BASE","APPLIED","S232"].map(h => <div key={h}>{h}</div>)}
                  </div>
                  {wm.hs_codes.map((h, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 150px 1fr 1fr 52px", gap: "3px", padding: "5px 6px", background: i%2===0?"#080c12":"transparent", borderBottom: "1px solid #0f1520" }}>
                      <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6" }}>{h.code}</div>
                      <div style={{ fontFamily: S, fontSize: "11px", color: "#778", lineHeight: "1.4" }}>{h.desc}</div>
                      <div style={{ fontFamily: M, fontSize: "10px", color: "#aab" }}>{h.mfn}</div>
                      <div style={{ fontFamily: M, fontSize: "10px", color: h.total?"#e87070":"#d4942a" }}>{h.total||h.non_usmca||h.applied||h.applied_non_usmca}</div>
                      <div style={{ fontFamily: M, fontSize: "10px", color: "#334" }}>{h.s232||"—"}</div>
                    </div>
                  ))}
                </div>
              )}
              {wm.ntb && (
                <div>
                  <H c="NON-TARIFF BARRIERS" />
                  {wm.ntb.map((n, i) => (
                    <div key={i} style={{ padding: "7px", background: "#080c12", border: "1px solid #1a2530", marginBottom: "3px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                        <div style={{ fontFamily: M, fontSize: "10px", color: "#aab" }}>{n.type}</div>
                        <Badge v={n.severity} sm />
                      </div>
                      <div style={{ fontFamily: S, fontSize: "12px", color: "#667", lineHeight: "1.5" }}>{n.detail}</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: "7px", paddingTop: "5px", borderTop: "1px solid #0f1520", fontFamily: M, fontSize: "8px", color: "#334" }}>SOURCES: {wm.sources.join(" · ")}</div>
            </div>
          </div>
        )}

        {tab === "twin" && (
          <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "9px" }}>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "9px" }}>
              <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "5px" }}>SEGMENTS</div>
              <button onClick={() => setSeg(null)} style={{ display: "block", width: "100%", textAlign: "left", background: !seg?"#0f1e10":"none", border: `1px solid ${!seg?"#1e3":"transparent"}`, color: !seg?"#3a6":"#334", fontFamily: M, fontSize: "10px", padding: "4px 6px", marginBottom: "2px" }}>ALL</button>
              {tw.segments.map(s => (
                <button key={s.name} onClick={() => setSeg(s.name)} style={{ display: "block", width: "100%", textAlign: "left", background: seg===s.name?"#0f1e10":"none", border: `1px solid ${seg===s.name?"#1e3":"transparent"}`, color: seg===s.name?"#3a6":"#334", fontFamily: M, fontSize: "8px", padding: "4px 6px", marginBottom: "2px", lineHeight: "1.5" }}>
                  {s.name.split("(")[0].trim()}<br /><span style={{ color: "#2a5" }}>{s.revenue_share} · Q3: {s.q3_fy2026.split("[")[0].trim()}</span>
                </button>
              ))}
            </div>
            <div>
              {(seg ? tw.segments.filter(s => s.name===seg) : tw.segments).map(s => (
                <div key={s.name} style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px", marginBottom: "7px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                    <div>
                      <div style={{ fontFamily: M, fontSize: "14px", color: "#dde" }}>{s.name}</div>
                      <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6" }}>{s.revenue_share} · {s.revenue_fy2025} FY2025 · Q3 FY2026: {s.q3_fy2026}</div>
                    </div>
                    <div style={{ display: "flex", gap: "3px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {s.relevant_pairs?.map(p => <button key={p} onClick={() => { setPair(p); setTab("world"); }} style={{ fontFamily: M, fontSize: "8px", background: "#0f1e10", border: "1px solid #1e3", color: "#3a6", padding: "2px 5px" }}>{p} ↗</button>)}
                    </div>
                  </div>
                  <H c="MANUFACTURING FOOTPRINT" />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "7px" }}>
                    {s.manufacturing.map((m, i) => <div key={i} style={{ fontFamily: M, fontSize: "8px", color: "#667", background: "#080c12", border: "1px solid #1a2530", padding: "2px 6px" }}>{m}</div>)}
                  </div>
                  <div style={{ fontFamily: S, fontSize: "13px", color: "#667", lineHeight: "1.6", borderLeft: "2px solid #1a3020", paddingLeft: "9px" }}>{s.notes}</div>
                  {s.fx && <div style={{ fontFamily: M, fontSize: "10px", color: "#334", marginTop: "5px", paddingTop: "4px", borderTop: "1px solid #0f1520" }}>{s.fx}</div>}
                </div>
              ))}
              {!seg && (
                <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
                  <H c="SUPPLY CHAIN INPUTS — HTS + TARIFF MAPPING" />
                  <div style={{ display: "grid", gridTemplateColumns: "140px 100px 70px 52px 1fr", gap: "4px", padding: "3px 6px", background: "#080c12", fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>
                    {["INPUT","ORIGIN","TARIFF PAIR","RISK","NOTE"].map(h => <div key={h}>{h}</div>)}
                  </div>
                  {tw.supply_chain.map((sc, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 100px 70px 52px 1fr", gap: "4px", padding: "5px 6px", background: i%2===0?"#080c12":"transparent", borderBottom: "1px solid #0f1520", alignItems: "start" }}>
                      <div style={{ fontFamily: M, fontSize: "10px", color: "#aab", lineHeight: "1.4" }}>{sc.input}</div>
                      <div style={{ fontFamily: S, fontSize: "11px", color: "#556" }}>{sc.origin}</div>
                      <div style={{ fontFamily: M, fontSize: "8px", color: "#2a5" }}>{sc.tariff_pair||"—"}</div>
                      <Badge v={sc.risk} sm />
                      <div style={{ fontFamily: S, fontSize: "11px", color: "#445", lineHeight: "1.4" }}>{sc.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "exposure" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="THERMON EXPOSURE REGISTER — FULLY SOURCED · POST-SCOTUS RATES" />
              <div style={{ display: "grid", gridTemplateColumns: "140px 52px 115px 115px 1fr 125px", gap: "4px", padding: "3px 6px", background: "#080c12", fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>
                {["EXPOSURE","SEV","CURRENT RATE","PRIOR RATE","DETAIL","TIME HORIZON"].map(h => <div key={h}>{h}</div>)}
              </div>
              {tw.disclosed_exposures.map((e, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 52px 115px 115px 1fr 125px", gap: "4px", padding: "6px 6px", background: i%2===0?"#080c12":"transparent", borderBottom: "1px solid #0f1520", alignItems: "start" }}>
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#aab", lineHeight: "1.4" }}>{e.category}</div>
                  <Badge v={e.severity} sm />
                  <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070", lineHeight: "1.4" }}>{e.current_rate.split("[")[0].trim()}</div>
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#334", lineHeight: "1.4" }}>{e.prior_rate!=="N/A" ? e.prior_rate.slice(0,42) : "—"}</div>
                  <div style={{ fontFamily: S, fontSize: "12px", color: "#667", lineHeight: "1.5" }}>{e.detail}</div>
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#3a6", lineHeight: "1.5" }}>{e.time_horizon}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="SEGMENT × TRADING PAIR — CURRENT APPLIED RATE" />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: M, fontSize: "10px" }}>
                  <thead><tr>
                    <td style={{ padding: "4px 6px", color: "#334", borderBottom: "1px solid #1a2530" }}>SEGMENT</td>
                    {Object.keys(WORLD_MODEL).map(p => <td key={p} style={{ padding: "4px 6px", color: "#445", borderBottom: "1px solid #1a2530", textAlign: "center" }}>{p}</td>)}
                  </tr></thead>
                  <tbody>
                    {tw.segments.map((s, i) => (
                      <tr key={s.name} style={{ background: i%2===0?"#080c12":"transparent" }}>
                        <td style={{ padding: "5px 6px", color: "#778", borderBottom: "1px solid #0f1520", whiteSpace: "nowrap" }}>
                          {s.name.split("(")[0].trim()}<br /><span style={{ color: "#2a5", fontSize: "8px" }}>{s.revenue_share}</span>
                        </td>
                        {Object.keys(WORLD_MODEL).map(p => {
                          const rel = s.relevant_pairs?.includes(p);
                          const w = WORLD_MODEL[p];
                          const rate = w.tariff.applied_non_usmca||w.tariff.applied||w.tariff.applied_stack||"10% S122";
                          const short = rate.split(" ")[0] + (rate.includes("S122")?" S122":rate.includes("S301")?" S301":"");
                          return <td key={p} style={{ padding: "5px", textAlign: "center", borderBottom: "1px solid #0f1520" }}>
                            {rel ? <button onClick={() => { setPair(p); setTab("world"); }} style={{ background: "#2d1010", border: "1px solid #8b2020", color: "#e87070", fontFamily: M, fontSize: "8px", padding: "1px 4px" }}>{short}</button>
                                 : <span style={{ color: "#1a2530" }}>—</span>}
                          </td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === "growth" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
            {Object.entries(tw.growth_platforms).map(([k,v]) => (
              <div key={k} style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
                <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6", letterSpacing: "0.1em", marginBottom: "5px" }}>{k.replace(/_/g," ").toUpperCase()}</div>
                <div style={{ fontFamily: S, fontSize: "13px", color: "#778", lineHeight: "1.6" }}>{v}</div>
              </div>
            ))}
            <div style={{ gridColumn: "1/-1", background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="CANADIAN END MARKET — OIL SANDS CAPITAL INVESTMENT [AER][ARGUS]" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
                {[["Alberta total CapEx 2024","Cdn$30.9B (+2.2%) [AER]"],["Oil sands CapEx 2024","Cdn$13.3B (+6.4%) [AER]"],["4 largest producers 2026","$14B (+5% from 2025) [ARGUS]"],["AER tariff scenario","-11.1% CapEx if tariffs persist [AER]"],["CNRL 2026 target","1.62M boe/d (record) [ARGUS]"],["Cenovus 2026 target","985k boe/d [ARGUS]"],["Oil sands breakeven","~$40/bbl — baseload [ARGUS]"],["Alberta data center demand",">20GW proposed — overlaps Poseidon platform"]].map(([k,v]) => (
                  <div key={k} style={{ padding: "5px 6px", background: "#080c12", borderLeft: "2px solid #1a3020" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>{k}</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#aab" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "comp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="ELECTRIC HEAT TRACING MARKET [M&M][MORD]" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px", marginBottom: "10px" }}>
                {[["Global market 2024","$2.96B [M&M]"],["Global market 2029","$4.34B [M&M]"],["CAGR 2024–2029","7.9% [M&M]"],["North America share","~45% [MORF]"],["Key event Aug 2024","nVent divests Raychem/Tracer to Brookfield $1.7B"],["Thermon post-event","One of largest standalone thermal specialists [MORD]"]].map(([k,v]) => (
                  <div key={k} style={{ padding: "6px", background: "#080c12", borderLeft: "2px solid #1a2530" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>{k}</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#aab" }}>{v}</div>
                  </div>
                ))}
              </div>
              <H c="COMPETITOR LANDSCAPE" />
              {tw.competitive_landscape.competitors.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "9px", padding: "5px 6px", background: i%2===0?"#080c12":"transparent", borderBottom: "1px solid #0f1520" }}>
                  <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6", width: "240px", flexShrink: 0 }}>{c.name}</div>
                  <div style={{ fontFamily: S, fontSize: "12px", color: "#667" }}>{c.note}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
              <H c="THERMON KEY DIFFERENTIATORS" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
                <div style={{ padding: "7px", background: "#080c12", borderLeft: "2px solid #1a3020" }}>
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#3a6", marginBottom: "3px" }}>IN-COUNTRY MANUFACTURING</div>
                  <div style={{ fontFamily: S, fontSize: "12px", color: "#778", lineHeight: "1.6" }}>CEO Bruce Thames Q3 FY2025: "Our manufacturing strategy of producing in-country helps insulate us from tariffs." Five Canadian facilities for Canadian customers; San Marcos TX for US; FATI Milan for Europe. No manufacturing in China or Mexico. [EC-Q3-25]</div>
                </div>
                <div style={{ padding: "7px", background: "#080c12", borderLeft: "2px solid #1a3020" }}>
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#3a6", marginBottom: "3px" }}>GENESIS NETWORK PLATFORM</div>
                  <div style={{ fontFamily: S, fontSize: "12px", color: "#778", lineHeight: "1.6" }}>Proprietary IIoT heat tracing monitoring. Real-time analytics, predictive maintenance, centralized monitoring. Next-generation launched Jan 2024. Creates installed-base stickiness and recurring OpEx revenue stream. [10-K25][M&M]</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "hs" && (
          <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "11px" }}>
            <H c="HS CODE MAP — THERMON PRODUCTS × BILATERAL PAIRS [USITC; USTR; S122; S301; S232]" />
            <div style={{ fontFamily: S, fontSize: "12px", color: "#556", marginBottom: "9px", lineHeight: "1.6" }}>MFN rates: USITC HTS 2025 Rev 29. S301: USTR register Lists 1–4A. S122: 10% global surcharge, Feb 24 2026, expires Jul 24 2026. S232: 25% on steel/aluminum, permanent, unaffected by SCOTUS. USMCA: qualifying goods exempt from S122.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "7px" }}>
              {[
                { code: "8516.80.80", label: "Electric heating resistors, nesi", thermon: "Heat tracing cables — core product", mfn: "Free [USITC confirmed HTS 2025 Rev 29]", rates: [{ pair: "CA→US (USMCA)", rate: "0%", auth: "S122/USMCA" },{ pair: "CA→US (non-USMCA)", rate: "Free + 10% S122 = 10%", auth: "S122" },{ pair: "US→CA (USMCA)", rate: "0%", auth: "S122/USMCA" },{ pair: "US→CA (non-USMCA)", rate: "Free + 10% S122 = 10%", auth: "S122" },{ pair: "US→CN", rate: "Free + 25% S301 + 10% S122 = 35%", auth: "S301 List 1/2; S122" },{ pair: "EU→US (FATI Milan)", rate: "Free + 10% S122 = 10%", auth: "S122" },{ pair: "US→IN", rate: "Free + 10% S122 = 10%", auth: "S122" }] },
                { code: "9032.10 / 9032.89", label: "Automatic temperature regulators / thermostats", thermon: "Industrial process controls — single-source risk", mfn: "Free [USITC]", rates: [{ pair: "US→CN", rate: "Free + 25% S301 + 10% S122 = 35%", auth: "S301 List 3; S122" },{ pair: "CA→US (USMCA)", rate: "0%", auth: "USMCA" },{ pair: "CA→US (non-USMCA)", rate: "10% S122", auth: "S122" },{ pair: "US→IN", rate: "10% S122", auth: "S122" }] },
                { code: "8537.10", label: "Control panels / consoles — electrical control", thermon: "Industrial control panels, switchgear assemblies", mfn: "Free [USITC]", rates: [{ pair: "US→CN", rate: "Free + 25% S301 + 10% S122 = 35%", auth: "S301 List 1; S122" },{ pair: "CA→US", rate: "0% (USMCA) / 10% S122 (non-USMCA)", auth: "S122 / USMCA" }] },
                { code: "8541–8542", label: "Semiconductors / electronic integrated circuits", thermon: "Controller board inputs — HIGHEST TARIFF EXPOSURE", mfn: "Free [USITC]", rates: [{ pair: "US→CN", rate: "Free + 50% S301 + 10% S122 = 60%", auth: "S301 raised to 50% Jan 1 2025 [USTR]; S122" }] },
                { code: "7208–7229", label: "Steel products (flat-rolled, structural)", thermon: "Enclosures, structural fabrication inputs", mfn: "0–2.9%", rates: [{ pair: "CA→US (all, incl USMCA)", rate: "25% S232 (S122 not additive)", auth: "S232; SCOTUS confirmed [BDO]" },{ pair: "US→CA (all)", rate: "25% S232", auth: "S232" }] },
                { code: "7601–7608", label: "Aluminum products", thermon: "Heat sink and enclosure aluminum inputs", mfn: "2.6–5%", rates: [{ pair: "CA→US / US→CA (all)", rate: "25% S232 — confirmed in force", auth: "S232; SCOTUS [BDO]" }] },
              ].map((item, idx) => (
                <div key={idx} style={{ background: "#080c12", border: "1px solid #1a2530", padding: "9px" }}>
                  <div style={{ fontFamily: M, fontSize: "13px", color: "#3a6", marginBottom: "1px" }}>{item.code}</div>
                  <div style={{ fontFamily: M, fontSize: "10px", color: "#aab", marginBottom: "2px" }}>{item.label}</div>
                  <div style={{ fontFamily: S, fontSize: "11px", color: "#445", marginBottom: "4px", fontStyle: "italic" }}>Thermon: {item.thermon}</div>
                  <div style={{ fontFamily: M, fontSize: "8px", color: "#2a5", marginBottom: "5px" }}>MFN: {item.mfn}</div>
                  {item.rates.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: "6px", padding: "3px 0", borderBottom: "1px solid #0f1520", alignItems: "start" }}>
                      <div style={{ fontFamily: M, fontSize: "8px", color: "#334", width: "145px", flexShrink: 0 }}>{r.pair}</div>
                      <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070", flex: 1 }}>{r.rate}</div>
                      <div style={{ fontFamily: M, fontSize: "8px", color: "#2a5", whiteSpace: "nowrap" }}>[{r.auth}]</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "9px", paddingTop: "6px", borderTop: "1px solid #0f1520", fontFamily: M, fontSize: "8px", color: "#2a3" }}>SOURCES: USITC HTS 2025 Rev 29 · USTR S301 Register · S122 Proclamation Feb 20 2026 · S232 Proclamation · SCOTUS Feb 20 2026 · BDO Mar 2026 · Fasken Feb 2026 · Federal Circuit Sep 2025 · Thermon EC-Q3-25 / EC-Q4-25 / EC-Q3-26 · 10-K FY2025</div>
          </div>
        )}


        {tab === "usmca" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>

            {/* Header */}
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "13px" }}>
              <div style={{ fontFamily: M, fontSize: "16px", color: "#dde", marginBottom: "4px" }}>USMCA Joint Review — 2026</div>
              <div style={{ fontFamily: M, fontSize: "10px", color: "#d4942a", marginBottom: "8px" }}>MANDATORY REVIEW DATE: Jul 1 2026 · FORMAL NEGOTIATIONS COMMENCED Mar 16 2026 · DATA CUTOFF Mar 22 2026</div>
              <div style={{ fontFamily: S, fontSize: "12px", color: "#778", lineHeight: "1.7", marginBottom: "10px" }}>
                The USMCA Article 34.7 joint review commenced formally the week of March 16 2026, with US-Mexico bilateral technical talks launched. The US has not confirmed renewal; USTR Greer stated the agreement's shortcomings are "such that a rubberstamp is not in the national interest." Three outcome scenarios are structurally distinct in their exposure implications for firms with significant US-Canada intracompany flows.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                {[
                  ["Review deadline", "July 1 2026 [USMCA Art. 34.7]"],
                  ["Formal talks started", "Week of Mar 16 2026 [USTR]"],
                  ["US position", "Will not rubber-stamp; changes required [USTR Greer]"],
                  ["Failure consequence", "Annual reviews until 2036, then expiry [Art. 34.7]"],
                ].map(([k,v]) => (
                  <div key={k} style={{ padding: "6px 8px", background: "#080c12", borderLeft: "2px solid #1a3020" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>{k}</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#aab" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Three scenarios */}
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "13px" }}>
              <H c="THREE OUTCOME SCENARIOS — EXPOSURE IMPLICATIONS FOR THERMON" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "9px" }}>

                {/* Scenario A */}
                <div style={{ background: "#080c12", border: "1px solid #1a3020", padding: "11px" }}>
                  <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6", marginBottom: "4px", letterSpacing: "0.1em" }}>SCENARIO A</div>
                  <div style={{ fontFamily: M, fontSize: "13px", color: "#dde", marginBottom: "6px" }}>Renewal as-is</div>
                  <div style={{ fontFamily: M, fontSize: "9px", color: "#2a5", marginBottom: "8px" }}>All three parties confirm by Jul 1 2026</div>
                  <div style={{ fontFamily: S, fontSize: "11px", color: "#667", lineHeight: "1.6", marginBottom: "10px" }}>
                    USMCA extended 16 years to 2042. Current 0% rates on qualifying US-Canada flows preserved. Section 122 expires Jul 24 2026 regardless — goods currently at 0% USMCA remain at 0%. Section 232 (25% steel/aluminum) unaffected in all scenarios.
                  </div>
                  <div style={{ fontFamily: M, fontSize: "9px", color: "#3a6", marginBottom: "4px" }}>THERMON EXPOSURE IMPACT</div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #1a3020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>CA→US intracompany flows</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6" }}>0% maintained on USMCA-qualifying</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #1a3020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>~10% COGS exposure</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6" }}>Resolved — current compliance sufficient</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #1a3020" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>P&L impact vs. current</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#3a6" }}>Neutral — status quo maintained</div>
                  </div>
                  <div style={{ marginTop: "8px" }}><Badge v="LOW" /></div>
                </div>

                {/* Scenario B */}
                <div style={{ background: "#100808", border: "1px solid #2d1010", padding: "11px" }}>
                  <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070", marginBottom: "4px", letterSpacing: "0.1em" }}>SCENARIO B</div>
                  <div style={{ fontFamily: M, fontSize: "13px", color: "#dde", marginBottom: "6px" }}>Revised agreement</div>
                  <div style={{ fontFamily: M, fontSize: "9px", color: "#d4942a", marginBottom: "8px" }}>Tighter RoO / China-content restrictions</div>
                  <div style={{ fontFamily: S, fontSize: "11px", color: "#667", lineHeight: "1.6", marginBottom: "10px" }}>
                    Most probable outcome. US demands: tighter Chapter 85 rules of origin to limit non-market (Chinese) content in electronics, higher RVC thresholds, expanded anti-China investment provisions. Thermon's five Canadian Process Heating facilities must re-certify compliance under revised thresholds. Single-source Chinese controller dependency becomes a direct USMCA qualification risk — not just a tariff risk.
                  </div>
                  <div style={{ fontFamily: M, fontSize: "9px", color: "#e87070", marginBottom: "4px" }}>THERMON EXPOSURE IMPACT</div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>Chapter 85 RVC tightening</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070" }}>Chinese controller content may disqualify USMCA status</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>If disqualified: ~10% COGS</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070" }}>0% → 10%+ applied rate on CA flows</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>Compounding with S301</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070" }}>Chinese controller inputs: ~35% stack + USMCA loss</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>Governance action required</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#d4942a" }}>Accelerate alt supplier qualification (12–24mo); audit RVC on CA facilities</div>
                  </div>
                  <div style={{ marginTop: "8px" }}><Badge v="HIGH" /></div>
                </div>

                {/* Scenario C */}
                <div style={{ background: "#100808", border: "1px solid #8b2020", padding: "11px" }}>
                  <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070", marginBottom: "4px", letterSpacing: "0.1em" }}>SCENARIO C</div>
                  <div style={{ fontFamily: M, fontSize: "13px", color: "#dde", marginBottom: "6px" }}>Non-renewal / collapse</div>
                  <div style={{ fontFamily: M, fontSize: "9px", color: "#e87070", marginBottom: "8px" }}>US withholds consent · annual review cycle begins</div>
                  <div style={{ fontFamily: S, fontSize: "11px", color: "#667", lineHeight: "1.6", marginBottom: "10px" }}>
                    US withholds renewal, triggering annual review cycle. USMCA does not immediately terminate — it continues until 2036 but enters permanent renegotiation. Zero-tariff treatment remains in place during reviews, but investment certainty collapses. If USMCA eventually lapses, US-Canada reverts to WTO MFN — HTS 8516.80 MFN is Free, so direct tariff impact is limited, but Canadian retaliatory tariffs and political risk on Alberta CapEx become structural constraints.
                  </div>
                  <div style={{ fontFamily: M, fontSize: "9px", color: "#e87070", marginBottom: "4px" }}>THERMON EXPOSURE IMPACT</div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>Direct tariff impact (HTS 8516.80)</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#d4942a" }}>Limited — MFN rate is Free; no immediate tariff shock on core product</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>Alberta oil sands CapEx</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070" }}>Political uncertainty depresses long-cycle investment — structural demand headwind</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020", marginBottom: "4px" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>Canadian retaliatory surtax</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070" }}>25% CA surtax on US goods to Canada persists independently</div>
                  </div>
                  <div style={{ padding: "6px 8px", background: "#0d1520", borderLeft: "2px solid #8b2020" }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: "#334", marginBottom: "2px" }}>S232 steel/aluminum</div>
                    <div style={{ fontFamily: M, fontSize: "10px", color: "#e87070" }}>25% permanent — unaffected by USMCA outcome</div>
                  </div>
                  <div style={{ marginTop: "8px" }}><Badge v="ELEVATED" /></div>
                </div>

              </div>
            </div>

            {/* Critical timeline */}
            <div style={{ background: "#0d1520", border: "1px solid #1a2530", padding: "13px" }}>
              <H c="CRITICAL TIMELINE — USMCA + S122 INTERACTION" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                {[
                  ["Mar 16 2026", "US-Mexico formal talks begin [USTR]", "ACTIVE"],
                  ["Jul 24 2026", "S122 10% surcharge expires — rate reverts to 0% MFN on qualifying USMCA goods", "EXPIRY"],
                  ["Jul 1 2026", "USMCA joint review decision deadline — renewal, revision, or non-renewal [Art. 34.7]", "DECISION"],
                  ["Mid-2026", "Thermon/CECO merger expected to close — governance structure changes [THR 8-K]", "M&A"],
                ].map(([date, desc, tag]) => (
                  <div key={date} style={{ padding: "8px", background: "#080c12", borderLeft: `2px solid ${tag==="ACTIVE"?"#3a6":tag==="EXPIRY"?"#d4942a":tag==="DECISION"?"#e87070":"#50a0c0"}` }}>
                    <div style={{ fontFamily: M, fontSize: "8px", color: tag==="ACTIVE"?"#3a6":tag==="EXPIRY"?"#d4942a":tag==="DECISION"?"#e87070":"#50a0c0", marginBottom: "3px" }}>{date} · {tag}</div>
                    <div style={{ fontFamily: S, fontSize: "10px", color: "#778", lineHeight: "1.5" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CECO merger note */}
            <div style={{ background: "#0f1a20", border: "1px solid #205060", padding: "13px" }}>
              <H c="MATERIAL UPDATE: PENDING ACQUISITION — CECO ENVIRONMENTAL [THR 8-K FEB 24 2026]" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
                <div>
                  <div style={{ fontFamily: S, fontSize: "12px", color: "#778", lineHeight: "1.7" }}>
                    On February 24 2026, CECO Environmental Corp. (Nasdaq: CECO) announced a definitive agreement to acquire Thermon Group Holdings in a stock and cash transaction valued at approximately $2.2B. Thermon shareholders may elect $63.89/share cash, 0.8110 CECO shares, or mixed consideration ($10 cash + 0.6840 CECO shares). The mixed consideration represents a 26.8% premium to Thermon's Feb 23 close of $49.77. Transaction unanimously approved by both boards. Expected close mid-2026.
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: M, fontSize: "9px", color: "#50a0c0", marginBottom: "8px" }}>GOVERNANCE IMPLICATIONS FOR THIS ANALYSIS</div>
                  {[
                    "Digital Twin analysis reflects Thermon as standalone entity through close",
                    "Post-close: exposure profile migrates to CECO consolidated structure",
                    "CECO HQ: Addison TX — additional US manufacturing footprint",
                    "Combined entity: broader EHS + thermal platform; S232/USMCA exposure structure changes materially post-close",
                    "IEEPA refund claims should be filed by Thermon pre-close to preserve rights",
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: "6px", padding: "4px 0", borderBottom: "1px solid #0f1a20" }}>
                      <div style={{ fontFamily: M, fontSize: "8px", color: "#50a0c0", flexShrink: 0 }}>▸</div>
                      <div style={{ fontFamily: S, fontSize: "10px", color: "#778", lineHeight: "1.5" }}>{t}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "8px", fontFamily: M, fontSize: "8px", color: "#334" }}>SOURCE: THR 8-K filed Feb 24 2026 · CECO Environmental Globe Newswire Feb 24 2026 · Thermon IR press release Feb 24 2026</div>
            </div>

            {/* Sources */}
            <div style={{ background: "#080c12", border: "1px solid #1a2530", padding: "9px", fontFamily: M, fontSize: "8px", color: "#334" }}>
              SOURCES: USTR Federal Register Notice Sep 17 2025 · USTR Greer remarks to House Ways &amp; Means + Senate Finance Dec 16-17 2025 · USTR press release Mar 5 2026 (US-Mexico formal talks) · Brookings USMCA Forward 2026 · CSIS USMCA Review 2026 · White &amp; Case USMCA review alert · CRS Report R48787 · THR 8-K Feb 24 2026 · CECO Environmental press release Feb 24 2026 · USMCA Article 34.7
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
