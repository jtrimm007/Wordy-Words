# Wordy Words
A Peer-2-Peer blockchain based word game that is stricktly decentrialized. 

## GPT

[Blockchain Gang GPT for coding help.](https://chatgpt.com/g/g-674fe5a240008191b5740437c77a68bd-blockchain-gang)

## UI Prototypes
![image](https://github.com/user-attachments/assets/8e856135-e68c-4a9f-8249-2fa8222689d9)
![image](https://github.com/user-attachments/assets/4d5a73a7-b6bc-44d9-b69e-770b5f11c26e)
![image](https://github.com/user-attachments/assets/8318f41d-6dbf-4402-8e01-00aa1ba11d46)
![image](https://github.com/user-attachments/assets/0621c3e0-3df0-4097-8f66-83e8ecdcff30)
![image](https://github.com/user-attachments/assets/5d7a27a9-9d7f-4795-8b12-0b6677749f12)



## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
