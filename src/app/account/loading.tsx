import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Box from "@/components/Box";

export default function AccountLoader() {
  return (
    <SkeletonTheme
      baseColor="#303030"
      highlightColor="#525252"
    >
      <Box className="flex h-full flex-col items-center justify-center bg-neutral-900">
        <div className="mt-14 w-full p-6">
          <Skeleton
            width={250}
            height={36}
            containerClassName="flex-1"
          />
        </div>
        <div className="mb-7 w-full px-6">
          <div className="flex flex-col gap-y-6">
            <Skeleton
              width={150}
              height={24}
            />
            <Skeleton
              width={300}
              height={50}
            />
          </div>
        </div>
        <div className="mt-10 mb-7 w-full flex-1 px-6"></div>
      </Box>
    </SkeletonTheme>
  );
}
