import React from "react";
import { Icon } from "@iconify/react";

/*
  Map simple icon keys to Iconify icons (safe fallbacks).
  You can change these to any Iconify icon names you prefer.
*/
const ICON_MAP = {
  tshirt: "mdi:tshirt-crew",
  tshirt_alt: "mdi:tshirt-crew-outline",
  pants: "mdi:trousers", // fallback: if missing, Iconify will ignore rendering
  coat: "mdi:coat-rack",
  washing: "mdi:washing-machine",
  dryclean: "mdi:tag", // fallback if no direct dry-clean icon available
  "shirt-formal": "mdi:shirt",
  // shorthand keys used in Services.jsx
  tshirt: "mdi:tshirt-crew",
  pants: "mdi:trousers",
  coat: "mdi:coat-rack",
  washing: "mdi:washing-machine",
  dryclean: "mdi:dry-cleaning", // if not present, will fallback to tag below
};

export default function ServiceCard({ service, onAdd }) {
  const { title, price, note, eta, icon } = service;
  const iconName = ICON_MAP[icon] || ICON_MAP["tshirt"] || "mdi:tag";

  return (
    <article className="flex items-center gap-4  bg-white shadow-lg rounded-2xl p-6 border border-slate-100 hover:shadow-cyan-100 transition
" >
      <div className="flex-shrink-0">
        <div className="w-14 h-14 rounded-md flex items-center justify-center bg-gradient-to-br from-teal-400 to-violet-600 text-white">
          <Icon icon={iconName} width="24" height="24" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
          <div className="text-sm font-bold text-gray-900">₹{price}</div>
        </div>
        <p className="text-xs text-gray-500 mt-1 truncate">{note} · {eta}</p>
        <div className="mt-3">
          <button onClick={onAdd} className="text-sm px-3 py-1 rounded-md bg-teal-500 text-white">
            Add
          </button>
        </div>
      </div>
    </article>
  );
}