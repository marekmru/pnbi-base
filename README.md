# pnbi-base

> DOCUMENTATION: https://bi.plan-net.com/styleguide/

> Authentication, Helpers and Components for PNBI webapps based on VueJS

## Installation

```
yarn add pnbi-base
```

## Development Workflow

1. cd into root directory
2. use the command `yarn link`
3. cd into pnbi-base/starter
4. Run `yarn` for instaling dependencies
5. use the command `yarn link "pnbi-base"`
6. Serve with `yarn run dev` in starter
7. Edit pnbi-base/src
8. Live reload works
9. commit changes after editing
   > Explanation: npm link creates a symlink to root of pnbi-base, so it is not neccessary to edit node_modules/pnbi-base
   > See docs: https://yarnpkg.com/en/docs/cli/link

#### package.json

```bash
"pnbi-base": "https://github.com/marekmru/pnbi-base.git#candidate"
// oder
"pnbi-base": "https://github.com/marekmru/pnbi-base.git"
```
