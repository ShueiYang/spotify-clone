
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Box from "@/components/Box";


export default function LikeLoader() {

  return (
    <SkeletonTheme baseColor="#303030" highlightColor="#525252">
      <Box className="flex flex-col h-auto items-center justify-center bg-gradient-to-b from-teal-700 to-neutral-900/95 via-neutral-900 via-20%">
        
        <div className="flex flex-col w-full md:flex-row items-center gap-x-5 px-6 pb-6 mt-32">
          <div className="relative h-32 w-32 lg:w-44 lg:h-44">
            <Skeleton  className="h-full" containerClassName="flex-1"/>
          </div>
          <div className="flex flex-col gap-2 mt-4 md:mt-0">
            <span className="hidden md:block font-semibold text-sm">
              <Skeleton  className="h-full" width={64}/>
            </span>
            <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold">
              <Skeleton className="h-full" width={300}/>
            </h1>
          </div>
        </div>  
        <div className="w-full mt-2 mb-7 px-6">
          <div className="flex flex-col w-full gap-y-2">
            {[...new Array(16)].map((_, index) => {
              return (
                <div className="w-full md:w-[75%] xl:w-[50%] p-2" key={index}>
                  <div className="flex items-center gap-x-3">
                    <Skeleton width={48} height={48} />
                    <div className="flex flex-col gap-y-1">
                      <Skeleton count={1} width={125} height={15} />
                      <Skeleton count={1} width={215} height={15} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Box>
    </SkeletonTheme>
  )
}