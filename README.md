[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)


# Introduction

Build with:

- Angular v16.1.3
- Electron v25.2.0

## Getting Started

*Clone repository:*

``` bash
git clone <repo>
```

*Install dependencies*

``` bash
npm install
```

*Install  angular cli in npm global context*

``` bash
npm install -g @angular/cli
```

*Install NodeJS dependencies (Electron main process):*

``` bash
cd app/
npm install
```

This project use [Electron Builder two package.json structure] approach (https://www.electron.build/tutorials/two-package-structure)

## To build development

- **run** -> npm start

Both Angular and Electron will run

## How to add dependency with ng-add

Note: there are difficulties with `ng-add` command, because project doesn't use the default angular builder


