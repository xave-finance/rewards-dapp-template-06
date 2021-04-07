import React from "react";
import Farm from "../../components/farm";

import { STABLE_COIN } from "../../helpers/stableCoin/constants";

import "./styles.scss";

export default function StableCoin() {
  return (
    <>
      <div className="root fdi-valut-container">
        <div className="content-1">
          <Farm data={STABLE_COIN} type="FDI" />
        </div>
      </div>
    </>
  );
}
