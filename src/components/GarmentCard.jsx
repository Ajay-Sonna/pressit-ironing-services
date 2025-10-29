import React from "react";
import { Icon } from "@iconify/react";

/*
  Garment tile. Icon is expected as Iconify name (e.g. "mdi:tshirt-crew").
  Fallbacks if icon missing.
*/
export default function GarmentCard({ item, onAdd }) {
  const { title, price, icon } = item;
  const iconName = icon || "mdi:tag";

  return (
    <article
      className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm cursor-pointer bg-white"
      onClick={() => onAdd?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onAdd?.(item); }}
    >
      <div className="w-12 h-12 rounded-md flex items-center justify-center bg-gradient-to-br from-teal-400 to-violet-600 text-white">
        <Icon icon={iconName} width="20" height="20" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{title}</div>
        <div className="text-xs text-gray-500">₹{price}</div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onAdd?.(item); }}
        className="px-2 py-1 rounded bg-teal-500 text-white text-xs"
        aria-label={`Add ${title}`}
      >
        Add
      </button>
    </article>
  );
}