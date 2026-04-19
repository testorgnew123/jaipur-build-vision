export type Bank = {
  name: string;
  short: string;
  accent: string;
};

export const banks: Bank[] = [
  { name: "HDFC Bank", short: "HDFC", accent: "#004C8F" },
  { name: "ICICI Bank", short: "ICICI", accent: "#B02A30" },
  { name: "State Bank of India", short: "SBI", accent: "#22409A" },
  { name: "Axis Bank", short: "AXIS", accent: "#97144D" },
  { name: "Kotak Mahindra Bank", short: "KOTAK", accent: "#ED1C24" },
  { name: "Bank of Baroda", short: "BoB", accent: "#F6921E" },
  { name: "Punjab National Bank", short: "PNB", accent: "#682161" },
  { name: "LIC Housing Finance", short: "LIC HF", accent: "#FFB81C" },
];
