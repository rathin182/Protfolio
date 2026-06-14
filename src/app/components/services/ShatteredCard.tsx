"use client";

import CardFragment from "./CardFragment";
import { fragments } from "@/app/lib/fragments";

export default function ShatteredCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0">
      {fragments.map(
        (fragment, index) => (
          <CardFragment
            key={index}
            clipPath={fragment}
            index={index}
          >
            {children}
          </CardFragment>
        )
      )}
    </div>
  );
}