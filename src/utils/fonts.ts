import { Domine, Montserrat, Inter } from "next/font/google";

export const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
});