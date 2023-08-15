import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Box from "@/components/Box";


export default function MainLoader() {

  return (
    <SkeletonTheme baseColor="#303030" highlightColor="#525252">
      <Box className="flex flex-col h-auto items-center justify-center bg-gradient-to-b from-teal-700 to-neutral-900/95 via-neutral-900 via-20%">
        <div className="w-full p-6 mt-14">
          <Skeleton 
            width={200} 
            height={36} 
            containerClassName="flex-1"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <Skeleton 
              height={64} 
              containerClassName="flex-1"
            />
          </div>
        </div> 
        <div className="w-full mt-2 mb-7 px-6">
          <Skeleton 
            width={155} 
            height={32} 
            containerClassName="flex-1"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mt-4">
            {[...new Array(16)].map((_, index) => {
              return (
                <div
                  key={index} 
                  className="flex flex-col items-center justify-center rounded-md gap-x-4 bg-neutral-400/5 p-3"
                >
                  <div className="aspect-square w-full h-full rounded-md">
                    <Skeleton 
                      className="h-full" 
                      containerClassName="flex-1"
                    />
                  </div>
                  <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                    <h3 className="w-full">
                      <Skeleton width={72} />
                    </h3>
                    <p className="w-full p-2">
                      <Skeleton 
                        count={2} 
                        height={14}
                        containerClassName="flex-1" 
                      />
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Box>
    </SkeletonTheme>
  )
};