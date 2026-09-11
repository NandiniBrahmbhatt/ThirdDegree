export const farm = {
  name: "Surya Green Energy Farm",
  location: "Gujarat, India",
  type: "Solar + Wind",
  capacity: "48.5 MW",
};

export const dashboardStats = {
  totalAssets: 86,
  healthyAssets: 68,
  monitorAssets: 9,
  criticalAssets: 3,
  energyAtRisk: "184 MWh",
  revenueAtRisk: "₹2.4L",
};

export const assets = [
  {
    id: "INV-001",
    name: "Inverter 01",
    type: "Solar Inverter",
    category: "solar",
    status: "Healthy",
    healthScore: 94,
    riskScore: 6,
    location: "Block A",
  },
  {
    id: "INV-007",
    name: "Inverter 07",
    type: "Solar Inverter",
    category: "solar",
    status: "Critical",
    healthScore: 31,
    riskScore: 89,
    location: "Block C",
  },
  {
    id: "WT-014",
    name: "Turbine 14",
    type: "Wind Turbine",
    category: "wind",
    status: "Monitor",
    healthScore: 68,
    riskScore: 42,
    location: "North Ridge",
  },
  {
    id: "INV-021",
    name: "Inverter 21",
    type: "Solar Inverter",
    category: "solar",
    status: "Warning",
    healthScore: 59,
    riskScore: 61,
    location: "Block F",
  },
];

export const alerts = [
  {
    asset: "Inverter 07",
    message: "Temperature rising while power output is declining.",
    status: "Critical",
    time: "12 min ago",
  },
  {
    asset: "Turbine 14",
    message: "Vibration levels are above normal operating range.",
    status: "Monitor",
    time: "28 min ago",
  },
  {
    asset: "Inverter 21",
    message: "Performance deviation detected.",
    status: "Warning",
    time: "1 hr ago",
  },
];