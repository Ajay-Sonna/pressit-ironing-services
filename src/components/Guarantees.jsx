import React from "react";
import { Icon } from "@iconify/react";

const guarantees = [
  { key: "satisfaction", title: "Satisfaction Guarantee", desc: "We re-work any item free until you’re happy.", icon: "mdi:thumb-up-outline" },
  { key: "ontime", title: "On-time Delivery", desc: "Pickup & delivery windows you can trust.", icon: "mdi:truck-check" },
  { key: "safety", title: "Safe Handling", desc: "Hypoallergenic detergents & garment-safe processes.", icon: "mdi:shield-check" },
];

export default function GuaranteeStrip() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {guarantees.map((g) => (
          <div key={g.key} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-teal-50 text-teal-600">
              <Icon icon={g.icon} width="20" height="20" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{g.title}</div>
              <div className="text-xs text-gray-500 mt-1">{g.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}