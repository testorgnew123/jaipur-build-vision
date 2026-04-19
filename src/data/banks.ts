import hdfc from "@/assets/banks/hdfc.png";
import icici from "@/assets/banks/icici.jpeg";
import sbi from "@/assets/banks/sbi.png";
import axis from "@/assets/banks/axis.jpeg";
import kotak from "@/assets/banks/kotak.png";
import bob from "@/assets/banks/bob.png";
import pnb from "@/assets/banks/pnb.png";
import lichf from "@/assets/banks/lichf.png";

export type Bank = {
  name: string;
  short: string;
  accent: string;
  logo: string;
};

export const banks: Bank[] = [
  { name: "HDFC Bank", short: "HDFC", accent: "#004C8F", logo: hdfc },
  { name: "ICICI Bank", short: "ICICI", accent: "#B02A30", logo: icici },
  { name: "State Bank of India", short: "SBI", accent: "#22409A", logo: sbi },
  { name: "Axis Bank", short: "AXIS", accent: "#97144D", logo: axis },
  { name: "Kotak Mahindra Bank", short: "KOTAK", accent: "#ED1C24", logo: kotak },
  { name: "Bank of Baroda", short: "BoB", accent: "#F6921E", logo: bob },
  { name: "Punjab National Bank", short: "PNB", accent: "#682161", logo: pnb },
  { name: "LIC Housing Finance", short: "LIC HF", accent: "#FFB81C", logo: lichf },
];
