import React from "react";
import TestimonialCard from "./TestimonialCard";
import GuaranteeStrip from "./Guarantees";
import { Icon } from "@iconify/react";

/* small sample data — replace with real testimonials & partner logos */
const TESTIMONIALS = [
  { quote: "Fantastic service — clothes came crisp and on time.", author: "Asha R.", role: "Designer", rating: 5 },
  { quote: "Easy pickup, great finish. My favorite laundry service.", author: "Rohit K.", role: "Teacher", rating: 5 },
  { quote: "Reliable and friendly. Highly recommended.", author: "Maya S.", role: "Manager", rating: 5 },
];

const PARTNERS = [
  { id: "p1", name: "Cafe Tonic", logo: "mdi:coffee" },
  { id: "p2", name: "Co-Work", logo: "mdi:office-building" },
  { id: "p3", name: "Hotel Lux", logo: "mdi:hotel" },
];

export default function SocialProof() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="text-sm text-gray-600">Trusted by customers & partners</div>
          <h3 className="text-3xl font-extrabold mt-2">Loved by thousands — quality you can rely on</h3>
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold">4.9</div>
              <div className="flex items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => <Icon key={i} icon="mdi:star" width="16" height="16" />)}
              </div>
              <div className="text-sm text-gray-500 ml-2">· 12k+ ratings</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-3">Trusted partners</div>
          <div className="flex items-center gap-6">
            {PARTNERS.map((p) => (
              <div key={p.id} className="flex items-center gap-2 text-gray-600">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-white border">
                  <Icon icon={p.logo} width="20" height="20" />
                </div>
                <div className="text-sm font-medium">{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <GuaranteeStrip />
        </div>
      </div>
    </section>
  );
}