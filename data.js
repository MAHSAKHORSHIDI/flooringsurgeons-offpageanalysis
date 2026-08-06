/* ==========================================================================
   data.js
   Real data extracted from backlink_analysis_report.xlsx
   (flooringsurgeons.co.uk vs 12 UK flooring competitors)
   Regenerate this file after each new Ahrefs export + analysis run.
   ========================================================================== */

const OWN_DOMAIN = "flooringsurgeons.co.uk";

/* ---- Summary: one row per site -------------------------------------- */
const SUMMARY = [
  { domain: "flooringsuperstore.com",       totalBacklinks: 2500, active: 2041, refDomains: 1534, avgDR: 21.0, medianDR: 10, avgTraffic: 1232274,  dofollow: 61.4, spam: 36.0, lost: 18.4 },
  { domain: "luxuryflooring.co.uk",         totalBacklinks: 2500, active: 2222, refDomains: 1513, avgDR: 37.2, medianDR: 37, avgTraffic: 10236,     dofollow: 63.4, spam: 27.9, lost: 11.1 },
  { domain: "woodandbeyond.com",            totalBacklinks: 1998, active: 1671, refDomains: 1426, avgDR: 21.4, medianDR: 10, avgTraffic: 2124607,   dofollow: 66.1, spam: 25.7, lost: 16.4 },
  { domain: "storiesflooring.co.uk",        totalBacklinks: 4902, active: 3960, refDomains: 1391, avgDR: 26.0, medianDR: 25, avgTraffic: 47632,     dofollow: 57.7, spam: 38.1, lost: 19.2 },
  { domain: "woodfloorwarehouse.co.uk",     totalBacklinks: 3574, active: 2954, refDomains: 1381, avgDR: 25.9, medianDR: 24, avgTraffic: 1636490,   dofollow: 78.7, spam: 30.2, lost: 17.3 },
  { domain: "quick-step.co.uk",             totalBacklinks: 2363, active: 1867, refDomains: 1366, avgDR: 23.0, medianDR: 13, avgTraffic: 8969544,   dofollow: 74.2, spam: 17.8, lost: 21.0 },
  { domain: "flooring365.co.uk",            totalBacklinks: 2500, active: 1932, refDomains: 1331, avgDR: 30.3, medianDR: 29, avgTraffic: 802670,    dofollow: 69.0, spam: 24.6, lost: 22.7 },
  { domain: "factory-direct-flooring.co.uk",totalBacklinks: 2142, active: 1842, refDomains: 1187, avgDR: 28.3, medianDR: 25, avgTraffic: 146873,    dofollow: 52.3, spam: 44.0, lost: 14.0 },
  { domain: "ukflooringdirect.co.uk",       totalBacklinks: 1925, active: 1611, refDomains: 1156, avgDR: 31.4, medianDR: 24, avgTraffic: 4002995,   dofollow: 54.0, spam: 39.2, lost: 16.3 },
  { domain: "flooringsupplies.co.uk",       totalBacklinks: 1474, active: 1235, refDomains: 1088, avgDR: 23.2, medianDR: 14, avgTraffic: 1926806,   dofollow: 54.1, spam: 49.0, lost: 16.2 },
  { domain: "discountflooringdepot.co.uk",  totalBacklinks: 1484, active: 1265, refDomains: 953,  avgDR: 20.7, medianDR: 5,  avgTraffic: 4557934,   dofollow: 75.4, spam: 36.2, lost: 14.8 },
  { domain: "tapi.co.uk",                   totalBacklinks: 2500, active: 2168, refDomains: 832,  avgDR: 43.5, medianDR: 45, avgTraffic: 9716301,   dofollow: 64.5, spam: 4.0,  lost: 13.3 },
  { domain: "flooringsurgeons.co.uk",       totalBacklinks: 1951, active: 1669, refDomains: 580,  avgDR: 8.3,  medianDR: 0,  avgTraffic: 2461710,   dofollow: 81.2, spam: 16.8, lost: 14.5, isUs: true },
];

/* ---- Weaknesses vs competitor average / best ------------------------- */
const WEAKNESSES = [
  { metric: "Unique Referring Domains",     ours: 580,     avg: 1263.17,  best: 1534,   gap: -683.17,  status: "Weakness" },
  { metric: "Avg Domain Rating (DR)",       ours: 8.3,     avg: 27.66,    best: 43.5,   gap: -19.36,   status: "Weakness" },
  { metric: "Avg Referring Domain Traffic", ours: 2461710, avg: 2931196.83, best: 9716301, gap: -469486.83, status: "Weakness" },
  { metric: "Dofollow %",                   ours: 81.2,    avg: 64.23,    best: 78.7,   gap: 16.97,    status: "Strength" },
  { metric: "Lost %",                       ours: 14.5,    avg: 16.73,    best: 11.1,   gap: -2.23,    status: "Strength" },
  { metric: "Spam %",                       ours: 16.8,    avg: 31.06,    best: 4.0,    gap: -14.26,   status: "Strength" },
  { metric: "Anchor Text Diversity Ratio",  ours: 0.61,    avg: 0.43,     best: 0.63,   gap: 0.18,     status: "Strength" },
  { metric: "Homepage Link %",              ours: 27.0,    avg: 41.47,    best: 68.7,   gap: -14.47,   status: "Info" },
];

/* ---- Homepage vs Internal Page link ratio ---------------------------- */
const HOMEPAGE_INTERNAL = [
  { domain: "flooringsupplies.co.uk",        homepage: 68.7, internal: 31.3 },
  { domain: "factory-direct-flooring.co.uk", homepage: 66.1, internal: 33.9 },
  { domain: "ukflooringdirect.co.uk",        homepage: 56.7, internal: 43.3 },
  { domain: "storiesflooring.co.uk",         homepage: 54.4, internal: 45.6 },
  { domain: "woodfloorwarehouse.co.uk",      homepage: 40.6, internal: 59.4 },
  { domain: "discountflooringdepot.co.uk",   homepage: 36.1, internal: 63.9 },
  { domain: "tapi.co.uk",                    homepage: 35.7, internal: 64.3 },
  { domain: "flooring365.co.uk",             homepage: 33.6, internal: 66.4 },
  { domain: "woodandbeyond.com",             homepage: 31.7, internal: 68.3 },
  { domain: "luxuryflooring.co.uk",          homepage: 30.7, internal: 69.3 },
  { domain: "flooringsurgeons.co.uk",        homepage: 27.0, internal: 73.0, isUs: true },
  { domain: "flooringsuperstore.com",        homepage: 24.7, internal: 75.3 },
  { domain: "quick-step.co.uk",              homepage: 18.6, internal: 81.4 },
];

/* ---- Domain Rating distribution of referring domains (bucketed) ------ */
const DR_BUCKET_LABELS = ["0-9","10-19","20-29","30-39","40-49","50-59","60-69","70-79","80-89","90-100"];
const DR_DISTRIBUTION = [
  { domain: "flooring365.co.uk",             buckets: [614,226,419,515,238,185,73,129,48,53] },
  { domain: "luxuryflooring.co.uk",          buckets: [491,132,201,494,329,372,173,285,21,2] },
  { domain: "storiesflooring.co.uk",         buckets: [1876,314,500,866,390,342,298,234,62,20] },
  { domain: "tapi.co.uk",                    buckets: [533,268,214,166,108,351,63,374,363,60] },
  { domain: "discountflooringdepot.co.uk",   buckets: [803,122,156,109,50,58,54,27,50,55] },
  { domain: "factory-direct-flooring.co.uk", buckets: [770,212,251,234,158,204,94,111,53,55] },
  { domain: "flooringsuperstore.com",        buckets: [1244,229,299,220,99,153,63,127,40,26] },
  { domain: "flooringsupplies.co.uk",        buckets: [622,191,136,159,122,98,61,51,24,10] },
  { domain: "flooringsurgeons.co.uk",        buckets: [1559,72,80,70,39,55,18,41,4,13], isUs: true },
  { domain: "quick-step.co.uk",              buckets: [1062,292,203,242,170,106,88,124,61,15] },
  { domain: "ukflooringdirect.co.uk",        buckets: [713,205,164,167,107,128,73,211,91,66] },
  { domain: "woodandbeyond.com",             buckets: [989,207,195,175,89,119,59,111,31,23] },
  { domain: "woodfloorwarehouse.co.uk",      buckets: [1136,570,392,480,360,300,178,98,34,26] },
];

/* ---- Follow / Nofollow / UGC / Sponsored ------------------------------ */
const FOLLOW_STATUS = [
  { domain: "flooringsurgeons.co.uk",        dofollow: 81.2, nofollow: 18.8, ugc: 0.3, sponsored: 1.0, isUs: true },
  { domain: "woodfloorwarehouse.co.uk",      dofollow: 78.7, nofollow: 21.3, ugc: 0.5, sponsored: 0.0 },
  { domain: "discountflooringdepot.co.uk",   dofollow: 75.4, nofollow: 24.6, ugc: 0.4, sponsored: 0.0 },
  { domain: "quick-step.co.uk",              dofollow: 74.2, nofollow: 25.8, ugc: 1.8, sponsored: 0.0 },
  { domain: "flooring365.co.uk",             dofollow: 69.0, nofollow: 31.0, ugc: 0.2, sponsored: 0.7 },
  { domain: "woodandbeyond.com",             dofollow: 66.1, nofollow: 33.9, ugc: 0.5, sponsored: 0.1 },
  { domain: "tapi.co.uk",                    dofollow: 64.5, nofollow: 35.5, ugc: 0.2, sponsored: 0.2 },
  { domain: "luxuryflooring.co.uk",          dofollow: 63.4, nofollow: 36.6, ugc: 0.1, sponsored: 0.4 },
  { domain: "flooringsuperstore.com",        dofollow: 61.4, nofollow: 38.6, ugc: 0.3, sponsored: 0.5 },
  { domain: "storiesflooring.co.uk",         dofollow: 57.7, nofollow: 42.3, ugc: 0.7, sponsored: 1.2 },
  { domain: "flooringsupplies.co.uk",        dofollow: 54.1, nofollow: 45.9, ugc: 4.2, sponsored: 0.2 },
  { domain: "ukflooringdirect.co.uk",        dofollow: 54.0, nofollow: 46.0, ugc: 2.3, sponsored: 0.1 },
  { domain: "factory-direct-flooring.co.uk", dofollow: 52.3, nofollow: 47.7, ugc: 0.7, sponsored: 0.0 },
];

/* ---- Anchor text category breakdown ----------------------------------- */
const ANCHOR_CATEGORIES = [
  { domain: "flooring365.co.uk",             branded: 21.4, generic: 10.2, keyword: 68.0, naked: 0.0,  empty: 0.4 },
  { domain: "luxuryflooring.co.uk",          branded: 13.0, generic: 19.2, keyword: 67.0, naked: 0.6,  empty: 0.2 },
  { domain: "storiesflooring.co.uk",         branded: 34.6, generic: 19.5, keyword: 43.9, naked: 0.6,  empty: 1.4 },
  { domain: "tapi.co.uk",                    branded: 22.9, generic: 7.4,  keyword: 68.1, naked: 0.1,  empty: 1.4 },
  { domain: "discountflooringdepot.co.uk",   branded: 30.3, generic: 17.3, keyword: 51.0, naked: 0.0,  empty: 1.4 },
  { domain: "factory-direct-flooring.co.uk", branded: 45.6, generic: 21.9, keyword: 31.1, naked: 0.0,  empty: 1.3 },
  { domain: "flooringsuperstore.com",        branded: 24.8, generic: 25.6, keyword: 40.2, naked: 8.4,  empty: 1.1 },
  { domain: "flooringsupplies.co.uk",        branded: 58.4, generic: 21.9, keyword: 18.1, naked: 0.1,  empty: 1.4 },
  { domain: "flooringsurgeons.co.uk",        branded: 15.1, generic: 21.6, keyword: 62.5, naked: 0.0,  empty: 0.8, isUs: true },
  { domain: "quick-step.co.uk",              branded: 54.3, generic: 12.3, keyword: 28.7, naked: 0.5,  empty: 4.2 },
  { domain: "ukflooringdirect.co.uk",        branded: 53.5, generic: 18.2, keyword: 27.2, naked: 0.2,  empty: 0.9 },
  { domain: "woodandbeyond.com",             branded: 21.9, generic: 11.1, keyword: 54.1, naked: 11.4, empty: 1.5 },
  { domain: "woodfloorwarehouse.co.uk",      branded: 37.2, generic: 16.0, keyword: 46.3, naked: 0.1,  empty: 0.3 },
];

/* ---- Anchor text diversity ratio (unique anchors / total) ------------ */
const ANCHOR_DIVERSITY = [
  { domain: "discountflooringdepot.co.uk",   unique: 920,  total: 1463, ratio: 0.629 },
  { domain: "flooringsurgeons.co.uk",        unique: 1172, total: 1935, ratio: 0.606, isUs: true },
  { domain: "woodandbeyond.com",             unique: 1187, total: 1969, ratio: 0.603 },
  { domain: "tapi.co.uk",                    unique: 1245, total: 2464, ratio: 0.505 },
  { domain: "quick-step.co.uk",              unique: 1094, total: 2263, ratio: 0.483 },
  { domain: "ukflooringdirect.co.uk",        unique: 922,  total: 1908, ratio: 0.483 },
  { domain: "flooringsuperstore.com",        unique: 1151, total: 2473, ratio: 0.465 },
  { domain: "luxuryflooring.co.uk",          unique: 1083, total: 2496, ratio: 0.434 },
  { domain: "factory-direct-flooring.co.uk", unique: 851,  total: 2114, ratio: 0.403 },
  { domain: "flooring365.co.uk",             unique: 866,  total: 2489, ratio: 0.348 },
  { domain: "flooringsupplies.co.uk",        unique: 494,  total: 1453, ratio: 0.340 },
  { domain: "storiesflooring.co.uk",         unique: 1059, total: 4832, ratio: 0.219 },
  { domain: "woodfloorwarehouse.co.uk",      unique: 695,  total: 3562, ratio: 0.195 },
];

/* ---- Overlap: how much of each competitor's link profile we share ---- */
const OVERLAP = [
  { competitor: "storiesflooring.co.uk",         theirDomains: 1391, sharedWithUs: 342, sharedPct: 24.6, onlyTheirs: 1049 },
  { competitor: "flooringsuperstore.com",        theirDomains: 1534, sharedWithUs: 265, sharedPct: 17.3, onlyTheirs: 1269 },
  { competitor: "flooringsupplies.co.uk",        theirDomains: 1088, sharedWithUs: 264, sharedPct: 24.3, onlyTheirs: 824 },
  { competitor: "ukflooringdirect.co.uk",        theirDomains: 1156, sharedWithUs: 258, sharedPct: 22.3, onlyTheirs: 898 },
  { competitor: "woodandbeyond.com",             theirDomains: 1426, sharedWithUs: 242, sharedPct: 17.0, onlyTheirs: 1184 },
  { competitor: "factory-direct-flooring.co.uk", theirDomains: 1187, sharedWithUs: 242, sharedPct: 20.4, onlyTheirs: 945 },
  { competitor: "discountflooringdepot.co.uk",   theirDomains: 953,  sharedWithUs: 235, sharedPct: 24.7, onlyTheirs: 718 },
  { competitor: "luxuryflooring.co.uk",          theirDomains: 1513, sharedWithUs: 230, sharedPct: 15.2, onlyTheirs: 1283 },
  { competitor: "quick-step.co.uk",              theirDomains: 1366, sharedWithUs: 211, sharedPct: 15.4, onlyTheirs: 1155 },
  { competitor: "flooring365.co.uk",             theirDomains: 1331, sharedWithUs: 209, sharedPct: 15.7, onlyTheirs: 1122 },
  { competitor: "woodfloorwarehouse.co.uk",      theirDomains: 1381, sharedWithUs: 209, sharedPct: 15.1, onlyTheirs: 1172 },
  { competitor: "tapi.co.uk",                    theirDomains: 832,  sharedWithUs: 22,  sharedPct: 2.6,  onlyTheirs: 810 },
];

/* ---- Cumulative unique referring domains over time (monthly) --------- */
const GROWTH_MONTHS = ["2023-10","2023-11","2023-12","2024-01","2024-02","2024-03","2024-04","2024-05","2024-06","2024-07","2024-08","2024-09","2024-10","2024-11","2024-12","2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03","2026-04","2026-05","2026-06","2026-07","2026-08"];

const GROWTH_SERIES = {
  "discountflooringdepot.co.uk":   [134,139,141,143,144,147,147,148,153,160,164,174,198,215,241,254,277,295,311,344,369,432,500,570,618,623,643,663,675,687,723,795,837,935,953],
  "factory-direct-flooring.co.uk": [148,150,156,158,163,169,173,174,183,193,211,221,235,245,285,307,322,344,361,394,410,449,500,565,611,619,722,769,820,839,876,981,1069,1171,1187],
  "flooring365.co.uk":             [387,397,406,415,419,426,433,434,443,453,462,474,491,509,531,548,563,589,613,642,650,685,723,772,803,815,841,896,918,932,968,1089,1186,1306,1331],
  "flooringsuperstore.com":        [283,301,314,325,327,333,337,342,351,367,376,391,397,424,443,472,509,544,576,617,649,727,797,860,889,895,919,951,969,991,1027,1147,1404,1513,1534],
  "flooringsupplies.co.uk":        [150,156,160,164,170,173,174,179,213,222,236,249,275,297,330,346,356,381,395,424,441,471,518,573,626,631,654,690,717,740,791,900,960,1059,1088],
  "flooringsurgeons.co.uk":        [20,20,20,21,21,23,23,26,28,30,33,38,39,44,46,50,60,71,82,84,92,119,145,160,173,174,193,205,223,242,306,382,457,564,580],
  "luxuryflooring.co.uk":          [6,6,6,6,6,6,6,6,6,7,8,9,17,17,58,127,168,273,333,394,415,484,556,644,723,778,868,938,968,999,1062,1215,1317,1490,1513],
  "quick-step.co.uk":              [444,465,474,482,489,494,504,511,523,551,574,586,598,612,638,661,680,707,724,747,769,800,834,899,952,961,995,1029,1050,1066,1105,1194,1252,1345,1366],
  "storiesflooring.co.uk":         [188,195,198,200,206,216,219,224,231,236,262,275,287,312,334,356,370,399,428,461,483,528,569,613,647,659,699,732,768,796,864,1061,1197,1365,1391],
  "tapi.co.uk":                    [96,101,102,106,111,112,114,117,123,224,265,309,334,353,447,486,504,541,551,577,583,604,656,683,706,713,725,742,761,774,794,811,820,829,832],
  "ukflooringdirect.co.uk":        [169,175,183,192,195,202,206,235,243,254,267,276,293,306,334,359,380,408,438,460,487,540,603,665,717,723,759,779,798,822,873,977,1037,1135,1156],
  "woodandbeyond.com":             [175,180,182,183,188,191,199,204,223,237,245,330,338,342,350,376,396,431,455,549,594,691,791,917,980,993,1031,1050,1068,1091,1135,1236,1303,1403,1426],
  "woodfloorwarehouse.co.uk":      [402,442,461,471,483,507,516,522,533,546,557,567,592,611,621,637,669,700,810,836,849,879,929,996,1036,1045,1070,1090,1101,1116,1150,1218,1276,1366,1381],
};

/* ---- Our own strongest referring domains (top 20 by DR) -------------- */
const OUR_TOP_REFERRERS = [
  { domain: "youtube.com",                 dr: 99, traffic: 2374912512, backlinks: 2 },
  { domain: "homebyme.pages.dev",          dr: 93, traffic: 8249674,    backlinks: 3 },
  { domain: "flooringsurgeons.webflow.io", dr: 92, traffic: 868035,     backlinks: 1 },
  { domain: "businessinsider.com",         dr: 92, traffic: 5912469,    backlinks: 1 },
  { domain: "heylink.me",                  dr: 92, traffic: 6445748,    backlinks: 1 },
  { domain: "provenexpert.com",            dr: 91, traffic: 58574,      backlinks: 2 },
  { domain: "yell.com",                    dr: 91, traffic: 1032778,    backlinks: 2 },
  { domain: "english.stackexchange.com",   dr: 91, traffic: 6573130,    backlinks: 1 },
  { domain: "buttondown.com",              dr: 84, traffic: 13064,      backlinks: 1 },
  { domain: "lnk.bio",                     dr: 83, traffic: 100168,     backlinks: 1 },
  { domain: "research.com",                dr: 83, traffic: 221414,     backlinks: 1 },
  { domain: "newsbreak.com",               dr: 83, traffic: 150544,     backlinks: 1 },
  { domain: "grokipedia.com",              dr: 78, traffic: 721789,     backlinks: 1 },
  { domain: "bmmagazine.co.uk",            dr: 77, traffic: 2367,       backlinks: 3 },
  { domain: "legalclarity.org",            dr: 75, traffic: 73,         backlinks: 1 },
  { domain: "accio.com",                   dr: 75, traffic: 340511,     backlinks: 10 },
  { domain: "find-us-here.com",            dr: 75, traffic: 232,        backlinks: 2 },
  { domain: "thomsonlocal.com",            dr: 74, traffic: 49411,      backlinks: 1 },
  { domain: "merlot.org",                  dr: 74, traffic: 96283,      backlinks: 1 },
];

/* ---- Link Gap Opportunities: domains linking to competitors, not us -- */
/* Auto-flagged by isBulkDirectory() in script.js based on naming pattern */
const LINK_GAP = [
["sitelike.org",11,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, storiesflooring.co.uk, tapi.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",66],
["diynot.com",11,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, storiesflooring.co.uk, tapi.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",44],
["highseo.shop",11,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",32],
["forums.moneysavingexpert.com",10,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, storiesflooring.co.uk, tapi.co.uk, ukflooringdirect.co.uk, woodandbeyond.com",84],
["factmags.com",10,"discountflooringdepot.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",74],
["p.eurekster.com",10,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",51],
["ratingfacts.com",10,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",43],
["abeautifulspace.co.uk",10,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, quick-step.co.uk, storiesflooring.co.uk, tapi.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",36],
["websitehubs.com",10,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",26],
["sbyme.com",10,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",24],
["list.show",10,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",15],
["crunchbase.com",9,"factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, storiesflooring.co.uk, tapi.co.uk, ukflooringdirect.co.uk, woodandbeyond.com",91],
["heavenarticle.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",61],
["socialzonedirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",52],
["linkpitcherdirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",52],
["superbhubdirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",51],
["webguestpostsdirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",50],
["subdomainfinder.c99.nl",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooringsuperstore.com, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, storiesflooring.co.uk, ukflooringdirect.co.uk, woodfloorwarehouse.co.uk",49],
["worldzonedirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",48],
["lovechicliving.co.uk",9,"factory-direct-flooring.co.uk, flooring365.co.uk, flooringsuperstore.com, luxuryflooring.co.uk, quick-step.co.uk, storiesflooring.co.uk, tapi.co.uk, ukflooringdirect.co.uk, woodfloorwarehouse.co.uk",47],
["mediapostdirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",47],
["topdomaindirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",47],
["besttopdirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",47],
["worldwebsitesdirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",47],
["topviraldirectory.com",9,"discountflooringdepot.co.uk, factory-direct-flooring.co.uk, flooring365.co.uk, flooringsupplies.co.uk, luxuryflooring.co.uk, quick-step.co.uk, ukflooringdirect.co.uk, woodandbeyond.com, woodfloorwarehouse.co.uk",47]
];
