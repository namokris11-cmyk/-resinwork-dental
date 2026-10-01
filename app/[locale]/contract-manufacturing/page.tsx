import React from "react";
import ContractHero from "./components/contract-hero";
import ContractTicker from "./components/contract-ticker";
import ContractIntro from "./components/contract-intro";
import ContractServices from "./components/contract-services";
import ContractExpertise from "./components/contract-expertise";
import ContractSectors from "./components/contract-sectors";
import ContractProcess from "./components/contract-process";
import ContractDifferentiators from "./components/contract-differentiators";

export default function ContractManufacturingPage() {
  return (
    <>
      <ContractHero />
      <ContractTicker />
      <ContractIntro />
      <ContractServices />
      <ContractExpertise />
      <ContractSectors />
      <ContractProcess />
      <ContractDifferentiators />
    </>
  );
}
