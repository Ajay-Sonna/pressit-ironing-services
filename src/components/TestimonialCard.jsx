import React from "react";
import { Icon } from "@iconify/react";

export default function TestimonialCard({ quote, author, role, rating = 5, avatar }) {
  return (
    <article className="bg-white rounded-lg border p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {avatar ? <img src={avatar} alt={author} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 truncate">{author}</h4>
              {role && <div className="text-xs text-gray-500">{role}</div>}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} icon={i < rating ? "mdi:star" : "mdi:star-outline"} width="16" height="16" className="text-yellow-400" />
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-700 line-clamp-3">“{quote}”</p>
        </div>
      </div>
    </article>
  );
}