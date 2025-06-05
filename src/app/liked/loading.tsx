import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Box from "@/components/Box";

export default function LikeLoader() {
  return (
    <SkeletonTheme
      baseColor="#303030"
      highlightColor="#525252"
    >
      <Box className="flex h-auto flex-col items-center justify-center bg-linear-to-b from-teal-700 via-neutral-900 via-20% to-neutral-900/95">
        <div className="mt-32 flex w-full flex-col items-center gap-x-5 px-6 pb-6 md:flex-row">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <Skeleton
              className="h-full"
              containerClassName="flex-1"
            />
          </div>
          <div className="mt-4 flex flex-col gap-2 md:mt-0">
            <span className="hidden text-sm font-semibold md:block">
              <Skeleton
                className="h-full"
                width={64}
              />
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              <Skeleton
                className="h-full"
                width={300}
              />
            </h1>
          </div>
        </div>
        <div className="mt-2 mb-7 w-full px-6">
          <div className="flex w-full flex-col gap-y-2">
            {[...new Array(16)].map((_, index) => {
              return (
                <div
                  className="w-full p-2 md:w-[75%] xl:w-[50%]"
                  key={`unique-${String.fromCharCode(index + 65)}`}
                >
                  <div className="flex items-center gap-x-3">
                    <Skeleton
                      width={48}
                      height={48}
                    />
                    <div className="flex flex-col gap-y-1">
                      <Skeleton
                        count={1}
                        width={125}
                        height={15}
                      />
                      <Skeleton
                        count={1}
                        width={215}
                        height={15}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Box>
    </SkeletonTheme>
  );
}
