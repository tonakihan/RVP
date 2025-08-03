# Replace Video Player

## How to use
Currently, the only option is to [build from source](#build-from-source-on-linux).

## Paths for specific sites
We also have paths for specific sites. These are used if
you encounter visual bugs after applying RVP. You can
find your site's path in the `paths for specific sites` folder.

For install
- Follow your script (on Github)
- click the `Raw` button (you can find it by using `Ctrl+F` in your browser)

## Build from source (on linux)
0. Clone this repo
```sh
git clone --depth=1 https://github.com/tonakihan/RVP
# Navigate into the new directory
cd RVP
```

1. Prepare files

```sh
npm i -D
# This will create a 'build' directory:
npm run dev-build

# Before installing the script, you need to run a local server:
npm run server
```

2. Copy script (installing)

Now you can copy the contents of the `build/index.user.js` file
and insert it into your [tampermonkey](https://www.tampermonkey.net/)
```sh
# Or on Linux systems, you can run the following command to isntall the script to your browser:
yarn dev-install
```

Save the script in tampermonkey.

3. Ending

Use a browser with a script that depends on the local server from the previous
steps, keeping it running.

## Developing
```sh
npm i -D
npm run dev-build
npm run server
npm run dev-install
```
Copy (or install with script `dev-build`) `build/index.user.js` into
[tampermonkey](https://www.tampermonkey.net/). The server will be available at `localhost:4000`.

---
## TODO
- [x] Замену только на default browser
- [ ] На CVP
- [x] Обработать только один video
- [x] Множество video
- [ ] Подумать о тестах
- [ ] Github action (automatic build)
- [ ] Use realises
- [ ] Выносим players в отдельный скрипт
---
- [ ] Fix 'allplay' player - don't work video.
