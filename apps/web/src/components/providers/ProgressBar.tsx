"use client";

import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AppProgressBar
        height="4px"
        color="#cb1515"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
