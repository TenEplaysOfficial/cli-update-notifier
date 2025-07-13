/// <reference types="node" />

declare module "cli-update-notifier" {
  type PackageManager = "npm" | "yarn" | "pnpm" | "bun" | "deno";

  /**
   * Detects the current package manager being used.
   */
  function detectPackageManager(): PackageManager;

  /**
   * Generates the install command for a given package name and package manager.
   * @param name The package name
   * @param manager The package manager
   */
  function getInstallCommand(name: string, manager: PackageManager): string;

  /**
   * Notifies if an update is available by comparing current and latest versions.
   * Suppresses console.log temporarily while fetching metadata.
   * @param name The package name
   * @param currentVersion The current version of the package
   * @param title Box title for the notification (default: "Update Available")
   * @param titleAlignment Alignment of the title (default: "center")
   * @param padding Padding for the box (default: 1)
   * @param borderColor Border color for the box (default: "green")
   */
  export default function notify(
    name: string,
    currentVersion: string,
    title?: string,
    titleAlignment?: "left" | "center" | "right",
    padding?: number,
    borderColor?: string
  ): Promise<void>;
}
