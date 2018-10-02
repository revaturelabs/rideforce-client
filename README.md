# RideshareClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Information for developers

### Git directions

Here is an overview of the steps you need to take in order to make a
successful change to the repo. If you do not follow all these steps, there
may be problems!

```sh
git checkout -b your-branch # Omit the '-b' if the branch already exists.
# Make changes to branch...
git add .  # Assuming you are in the root directory.
git commit -m 'Descriptive commit message'
git push -u origin your-branch # You can use just 'git push' if you've already pushed.
```

Before you make a pull request, it's a good idea to merge any new changes
from the dev branch, especially if you've spent a decent amount of time on
your changes (making it more likely that the dev branch has changed). This is
the best way to detect merge conflicts early.

```sh
# To merge any new changes from the dev branch:
git checkout dev
git pull
git checkout your-branch
git merge dev
```

If you get any merge conflicts, resolve them and then make a new commit (`git add . && git commit -m 'Descriptive commit message`).
Once you've pushed your branch, make a pull request on GitHub and make sure
that your PR is based off the dev branch and not master!


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
