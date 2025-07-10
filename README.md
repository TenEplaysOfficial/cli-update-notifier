<h1 align="center">cli-update-notifier</h1>

_Notify users of CLI updates_

## Preview

![Preview](https://github.com/tenelabs/assets/raw/main/cli-update-notifier/preview.png)

## Install

```sh
npm install cli-update-notifier
# or
yarn add cli-update-notifier
```

## Usage

### Basic

```js
import notify from "cli-update-notifier";

await notify("react", "18.2.0");
```

### Using `package.json`

```js
import notify from "cli-update-notifier";
import pkg from "./package.json";

await notify(pkg.name, pkg.version);
```

## API

```ts
notify(
  name: string,
  currentVersion: string,
  title?: string = "Update Available",
  titleAlignment?: "left" | "center" | "right",
  padding?: number = 1,
  borderColor?: string = "green",
): Promise<void>
```

### Parameters

| Name             | Type                            | Default              | Description                      |
| ---------------- | ------------------------------- | -------------------- | -------------------------------- |
| `name`           | `string`                        | —                    | **(required)** NPM package name. |
| `currentVersion` | `string`                        | —                    | **(required)** Your version.     |
| `title`          | `string`                        | `"Update Available"` | Box header.                      |
| `titleAlignment` | `"left" \| "center" \| "right"` | `"center"`           | Title text alignment.            |
| `padding`        | `number`                        | `1`                  | Inner box padding.               |
| `borderColor`    | `string`                        | `"green"`            | Boxen border color.              |

## How It Works

1. Detects package manager via `npm_config_user_agent`.
2. Fetches `latest` version using `npm-metadata`.
3. Compares with `currentVersion`. If identical, does nothing.
4. Builds a formatted message of current and latest versions + update command.
5. Outputs a styled box using `boxen` and `chalk`.

## Example

```js
import notify from "cli-update-notifier";
import { name, version } from "./package.json";

await notify(name, version);
```

When an update is found, users see:

![Preview](https://github.com/tenelabs/assets/raw/main/cli-update-notifier/preview.png)

## Supported Package Managers

Package manager is auto‑detected:

- `npm`: `npm i -g <name>`
- `yarn`: `yarn global add <name>`
- `pnpm`: `pnpm add -g <name>`
- `bun`: `bun add -g <name>`

## Why Use This?

- Lightweight and fast
- Works with all major package managers
- Stylish, clear CLI updates
- Silent when no updates

## Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/...`)
3. Add tests or docs
4. Submit a PR

## License

MIT License
