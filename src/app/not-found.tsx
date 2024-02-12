import Box from "@/components/Box";

export default function NotFound() {
  return (
    <Box className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-6 text-xl text-neutral-400">
        404 This page could not be found.
      </h1>
      <a href="/" rel="noopener noreferrer" className="item-link">
        - Back to hompage -
      </a>
    </Box>
  );
}
