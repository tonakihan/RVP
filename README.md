# Replace Video Player

## Install

[Install the 'RVP' userscript](https://raw.githubusercontent.com/tonakihan/RVP/refs/heads/releases/index.user.js)  
P.S. Needed [tampermonkey](https://www.tampermonkey.net/)

## Configuration

In `index.user.js`, you will be able to access the variable `config` at the beginning of the script.

### Available players

| Player | description |
|--------|-------------|
| `default` | Build-in player in your browser |
| [`OPlayer`](https://github.com/shiyiya/oplayer) | <a href="https://github.com/tonakihan/RVP-player-OPlayer">Userscript</a> |

---

## Paths for specific sites

We also have paths for specific sites. These are used if
you encounter visual bugs after applying RVP. You can
find your site's path in the `paths for specific sites` folder.

For install
- Follow your script (on Github)
- click the `Raw` button (you can find it by using `Ctrl+F` in your browser)

## Manual build 
> [!INFO]
> In this case, a local server will be created — without it, the script won't work

0. Clone this repo

```sh
git clone --depth=1 https://github.com/tonakihan/RVP
cd RVP
```

1. Prepare files

```sh
pnpm install
pnpm dev:build
```

2. Copy script (installing)

```sh
# Or on Linux systems, you can run the following command to isntall the script to your browser:
pnpm dev:install
```
On other OS, you can copy the contents of the `build/index.user.js` file
and insert it into your [tampermonkey](https://www.tampermonkey.net/)

3. Launch local server

```sh
pnpm dev:server
```

4. Ending

Use a browser with a script that depends on the local server from the previous
steps, keeping it running.
