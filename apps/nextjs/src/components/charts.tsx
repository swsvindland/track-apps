import React, { FC } from "react";
import { BloodPressureChart } from "./bloodPressureChart";
import { HeartRateChart } from "./heartRateChart";

export const Charts: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <BloodPressureChart />
      <HeartRateChart />
    </div>
  );
};
