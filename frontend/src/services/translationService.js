const translations = {
  en: {
    dashboard: "Dashboard",
    farms: "Farms",
    assets: "Assets",
    maintenance: "Maintenance",
    technicians: "Technicians",
    totalAssets: "Total Assets",
    healthyAssets: "Healthy Assets",
    assetsToMonitor: "Assets to Monitor",
    criticalAssets: "Critical Assets",
    energyAtRisk: "Energy at Risk",
    revenueAtRisk: "Revenue at Risk",
    analyzeFarm: "Analyze Farm with AI",
    maintenancePriority: "Maintenance Priority",
    recentAlerts: "Recent Alerts",
    farmHealth: "Farm Health",
    viewDetails: "View Details",
    riskScore: "Risk Score",
    healthScore: "Health Score",
  },

  gu: {
    dashboard: "ડેશબોર્ડ",
    farms: "ફાર્મ્સ",
    assets: "એસેટ્સ",
    maintenance: "મેન્ટેનન્સ",
    technicians: "ટેકનિશિયન",
    totalAssets: "કુલ એસેટ્સ",
    healthyAssets: "સ્વસ્થ એસેટ્સ",
    assetsToMonitor: "મોનીટર કરવાના એસેટ્સ",
    criticalAssets: "ગંભીર એસેટ્સ",
    energyAtRisk: "જોખમમાં ઊર્જા",
    revenueAtRisk: "જોખમમાં આવક",
    analyzeFarm: "AI વડે ફાર્મનું વિશ્લેષણ કરો",
    maintenancePriority: "મેન્ટેનન્સ પ્રાથમિકતા",
    recentAlerts: "તાજેતરના એલર્ટ્સ",
    farmHealth: "ફાર્મની સ્થિતિ",
    viewDetails: "વિગતો જુઓ",
    riskScore: "જોખમ સ્કોર",
    healthScore: "હેલ્થ સ્કોર",
  },
};

export function getTranslation(language, key) {
  return translations[language]?.[key] || translations.en[key] || key;
}

export default translations;