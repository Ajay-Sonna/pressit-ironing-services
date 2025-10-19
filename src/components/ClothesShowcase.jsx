// src/components/ClothesShowcase.jsx
import React from "react";
import ClothItem from "./ClothItem";

/**
 * ClothesShowcase: just map items, do not touch Home.jsx
 * Ensure images exist in public/images/
 */
const items = [
  {
    wrinkled: "/models/blue_w.png",
    folded: "/models/blue_i.png",
  },
  {
    wrinkled: "/models/red_w.png",
    folded: "/models/red_i.png",
  },
  {
    wrinkled: "/models/green_w.png",
    folded: "/models/green_i.png",
  },
  
];

export default function ClothesShowcase({ size = "lg" }) {
  return (
    <div className="w-full flex justify-center">
      <div
        className="flex gap-8 items-end"
        style={{
          // slightly angling layout for depth: center is taller
          alignItems: "flex-end",
        }}
      >
        {items.map((it, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* ClothItem accepts index for stagger and size */}
            <ClothItem
              wrinkledSrc={it.wrinkled}
              foldedSrc={it.folded}
              index={i}
              size={size}
            />
            {/* caption */}
            <div className="mt-3 text-sm text-gray-600">
              {["Checks", "Jeans", "Graphic Tee", "Formal", "Kurta", "Trousers"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// // src/components/ClothesShowcase.jsx
// import ClothItem from "./ClothItem";

// export default function ClothesShowcase() {
//   return (
//     <div className="flex flex-wrap gap-8 justify-center items-center mt-12">
//       <ClothItem 
//         wrinkledSrc="/models/blue_w.png" 
//         foldedSrc="/models/blue_i.png" 
//         delay={0} 
//       />
//       <ClothItem 
//         wrinkledSrc="/models/red_w.png" 
//         foldedSrc="/models/red_i.png" 
//         delay={1} 
//       />
//       <ClothItem 
//         wrinkledSrc="/models/green_w.png" 
//         foldedSrc="/models/green_i.png" 
//         delay={2} 
//       />
//     </div>
//   );
// }
