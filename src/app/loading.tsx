import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Box from "@/components/Box";

export default function MainLoader() {
  return (
    <SkeletonTheme
      baseColor="#303030"
      highlightColor="#525252"
    >
      <Box className="flex h-auto flex-col items-center justify-center bg-linear-to-b from-teal-700 via-neutral-900 via-20% to-neutral-900/95">
        <div className="mt-14 w-full p-6">
          <Skeleton
            width={200}
            height={36}
            containerClassName="flex-1"
          />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <Skeleton
              height={64}
              containerClassName="flex-1"
            />
          </div>
        </div>
        <div className="mt-2 mb-7 w-full px-6">
          <Skeleton
            width={155}
            height={32}
            containerClassName="flex-1"
          />
          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {[...new Array(16)].map((_, index) => {
              return (
                <div
                  key={`unique-${String.fromCharCode(index + 65)}`}
                  className="flex flex-col items-center justify-center gap-x-4 rounded-md bg-neutral-400/5 p-3"
                >
                  <div className="aspect-square h-full w-full rounded-md">
                    <Skeleton
                      className="h-full"
                      containerClassName="flex-1"
                    />
                  </div>
                  <div className="flex w-full flex-col items-start gap-y-1 pt-4">
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
              );
            })}
          </div>
        </div>
      </Box>
    </SkeletonTheme>
  );
}
