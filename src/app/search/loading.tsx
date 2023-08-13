
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Box from "@/components/Box";


export default function Loader() {

  return (
    <SkeletonTheme baseColor="#303030" highlightColor="#525252">
      <Box className="flex flex-col h-auto items-center justify-center bg-neutral-900">
        <div className="w-full p-6 mt-14">
          <Skeleton width={110} height={36} containerClassName="flex-1"/>
          <div className="w-full mt-5">
            <Skeleton height={46} containerClassName="flex-1"/>
          </div>
        </div> 
        <div className="w-full mt-10 mb-7 px-6">
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