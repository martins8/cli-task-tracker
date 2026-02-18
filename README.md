this is project to learn and practice
https://github.com/martins8/cli-task-tracker

## Usage

Install dependencies:

```bash
npm install
```

Run with tsx:

```bash
npx tsx index.ts add "Buy milk"
npx tsx index.ts list
npx tsx index.ts update 1 "Buy bread"
npx tsx index.ts delete 1
```

Common commands:

- add <description>
- update <id> <description>
- delete <id>
- list
- list <status> done || todo || in-progress
