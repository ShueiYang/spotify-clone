"use client"

import Box from "@/components/Box";


export default function NotFound() {
  
  return (
    <Box className="h-full flex flex-col items-center justify-center">
      <h1 className="text-neutral-400 text-xl mb-6">
        404 This page could not be found.
      </h1>
      <a 
        href="/"
        rel="noopener noreferrer"
        className="item-link"
      >
        - Back to hompage -
      </a>
    </Box>
  );
};