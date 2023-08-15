import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Box from "@/components/Box";



export default function AccountLoader() {

  return (
    <SkeletonTheme baseColor="#303030" highlightColor="#525252">
      <Box className="flex flex-col h-full items-center justify-center bg-neutral-900">
        <div className="w-full p-6 mt-14">
          <Skeleton width={250} height={36} containerClassName="flex-1"/>
        </div> 
        <div className="w-full mb-7 px-6">
          <div className="flex flex-col gap-y-6">
           <Skeleton width={150} height={24} />
           <Skeleton width={300} height={50} />
          </div>
        </div>
        <div className="w-full flex-1 mt-10 mb-7 px-6"></div>
      </Box>
    </SkeletonTheme>
  )
}