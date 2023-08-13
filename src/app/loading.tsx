"use client"

import Box from "@/components/Box";
import ScaleLoader from "react-spinners/ScaleLoader"


const Loading = () => {

  return (
    <Box className="flex items-center justify-center h-full">
      <ScaleLoader 
        color="#22c55e" 
        height={40}
        aria-label="Loading Spinner"
      />
    </Box>
  )
}

export default Loading;