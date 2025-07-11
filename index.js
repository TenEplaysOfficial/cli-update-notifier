import { metadata } from "npm-metadata";
import boxen from "boxen";
import chalk from "chalk";

const detectPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.startsWith("yarn")) return "yarn";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("bun")) return "bun";

  if (typeof Deno !== "undefined") return "deno";
  if (typeof Bun !== "undefined") return "bun";

  return "npm";
};

const getInstallCommand = (name, manager) => {
  switch (manager) {
    case "yarn":
      return `yarn global add ${name}`;
    case "pnpm":
      return `pnpm add -g ${name}`;
    case "bun":
      return `bun add -g ${name}`;
    case "npm":
      return `npm i -g ${name}`;
    case "deno":
      return `deno install -g npm:${name}`;
  }
};

export default async function notify(
  name,
  currentVersion,
  title = "Update Available",
  titleAlignment = "center",
  padding = 1,
  borderColor = "green"
) {
  const originalLog = console.log;
  console.log = () => {};

  const latestVersion = await metadata(name).then(
    (result) => result["dist-tags"].latest
  );

  console.log = originalLog;

  if (latestVersion === currentVersion) {
    return;
  }

  const manager = detectPackageManager();
  const installCommand = getInstallCommand(name, manager);

  const message = [
    `${chalk.gray("Package:")}        ${chalk.bold.cyan(name)}`,
    `${chalk.gray("Current:")}        v${currentVersion}`,
    `${chalk.gray("Latest:")}         ${chalk.bold.yellow(
      `v${latestVersion}`
    )}`,
    ``,
    `${chalk.gray("Update using:")}`,
    `  ${chalk.cyan(installCommand)}`,
  ].join("\n");

  console.log(
    boxen(message, {
      title,
      titleAlignment,
      padding,
      borderColor,
    })
  );
}
