"use client";

import SmoothScroll from "@/app/components/animation/SmoothScroll";
import Loader from "./Loader";
import { useEffect, useState } from "react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!loading && <SmoothScroll />}

      {children}

      {loading && <Loader loading />}
    </>
  );
}