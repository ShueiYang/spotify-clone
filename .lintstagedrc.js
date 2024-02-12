const path = require("path");

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const formatCommand = "prettier --write";

module.exports = {
  "**/*.(ts|tsx)": () => "pnpm tsc --noEmit",
  "*.{js,jsx,ts,tsx}": [formatCommand, eslintCommand],
};
