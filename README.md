# immonex Kickstart

## WordPress-based Real Estate Site Development

<img src="assets/immonex-kickstart-logo.png" width="264" height="264" align="right" alt="immonex Kickstart">

immonex Kickstart is a **WordPress plugin** that provides essential customizable components (property seach, list and detail views, location maps etc.) for publishing imported **OpenImmo®-based property offers** in real estate websites built on **multi-purpose themes** in an easy and visually appealing way. Beyond that, it's also a framework for add-ons - separate plugins that extend the functionality on the same foundation.

### immonex®

**immonex** is the *PropTech umbrella brand* of a versatile portfolio of software solutions for the German-speaking real estate industry.

As a part of this, the **immonex WP Plugin Suite** includes a wide range of WordPress plugins for the implementation of sophisticated real estate agency websites and portals, which can be flexibly combined depending on the specific project requirements.

### OpenImmo®

[OpenImmo-XML](http://openimmo.de/) is a proven standard for the exchange of real estate data, which is supported primarily in German-speaking markets by almost all common software solutions and portals for real estate professionals in the form of corresponding import/export interfaces[^1].

## Basics & Scope

The stable version of immonex Kickstart is available in the official [WordPress Plugin Repository](https://wordpress.org/plugins/immonex-kickstart/).[^2]

A **user/dev documentation** including detailed instructions how to install, setup and customize the plugin (in German) is available here:

https://docs.immonex.de/kickstart/

Kickstart can be extended by *custom skins* (template sets) and *add-on plugins*. The following sections relate to the development of the **core plugin** in this repository only.

## Development

### Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [npm (Node.js)](https://www.npmjs.com/get-npm)
- [Composer](https://getcomposer.org/)
- [PHP_CodeSniffer](https://github.com/PHPCSStandards/PHP_CodeSniffer/)
- [WordPress Coding Standards for PHP_CodeSniffer](https://github.com/WordPress/WordPress-Coding-Standards)
- [WP-CLI](https://wp-cli.org/)
- ready-to-go [WordPress](https://wordpress.org/download/) installation on a local webserver

### Guidelines

**We keep it simple and rely on battle-proven standards and best practices whenever possible!**

- PHP compatibility: 7.4+ (switch to 8 envisaged for future releases)
- Coding Standard (PHP): [WordPress PHP Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/)
- Git branching strategy: [GitHub flow](https://guides.github.com/introduction/flow/)
- Git commit messages: [Conventional Commits](https://www.conventionalcommits.org/)
- CSS of *Core Skins* (template sets) shipped with this plugin are most widely built upon the [BEM methodology](https://en.bem.info/methodology/) with [Two Dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) as naming convention.
- Plugin and skin CSS files are being compiled from SCSS files during the build process using [node-sass](https://github.com/sass).

### Setup

Setting up a simple development environment starts by cloning this repository and installing dependencies:

```bash
$ cd ~/projects
$ git clone git@github.com:immonex/kickstart.git immonex-kickstart
$ cd immonex-kickstart
$ npm install
$ composer install
```
> :warning: PHP_CodeSniffer and the related WP sniffs are **not** part of the default dependencies and should be [installed globally](https://github.com/WordPress/WordPress-Coding-Standards?tab=readme-ov-file#composer-global-installation).

Then, a symlink to the `src` directory has to be created in the `plugins` folder of the local WP installation:

```bash
$ ln -s ~/projects/immonex-kickstart/src/ ~/htdocs/wp-dev-installation/wp-content/plugins/immonex-kickstart
```

Now, the plugin can be activated in the WP backend.

### Building

The JS/CSS build process is based on the module/asset bundler [webpack](https://webpack.js.org/). A set of simple **npm scripts** defined in `package.json` is used to perform the required steps (no Gulp or Grunt needed).

Create a **production version** of the sources in the `build` folder and a corresponding ZIP archive in `dist`:

```bash
$ npm run build
```

Create and serve a **development version** with automatic rebuild and browser reload whenever PHP, (S)CSS or JS files are updated:

```bash
$ npm run dev
```

For the latter option, a [Browsersync](https://github.com/BrowserSync/browser-sync) proxy URL to the **local WP dev installation** has to be defined in the file `.env` ([use .env.example](.env.example) as template).

### Coding Standard

The PHP source code formatting corresponds to the [WordPress PHP Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/).

The source files can be checked with PHP_CodeSniffer (if, as recommended, installed globally as described [here](https://github.com/WordPress/WordPress-Coding-Standards?tab=readme-ov-file#composer-global-installation)):

```bash
$ phpcs
```

To fix violations automatically as far as possible:

```bash
$ phpcbf
```

> :warning: The JavaScript code may differ from the (slightly dusty...) WP recommendations in favor of a more contemporary style.

### Testing

Locally running unit tests ([PHPUnit](https://phpunit.de/)) requires an additional **temporary** WordPress installation (see [infos on make.wordpress.org](https://make.wordpress.org/cli/handbook/plugin-unit-tests/#running-tests-locally)). To use the test install script included in this repository, the file `.env` containing credentials of a local test database has to be created or extended first (see [.env.example](.env.example)).

After that, the temporary testing environment can be installed:

```bash
$ npm run test:install
```

Running tests in the `tests` folder:

```bash
$ npm run test
```

### Translations

The **regular translations** for this plugin are provided via [translate.wordpress.org (GlotPress)](https://translate.wordpress.org/projects/wp-plugins/immonex-kickstart/).

Additionally, formal and informal German translations (PO/MO files) are available in the [src/languages](src/languages) folder, too. This directory also contains a current POT file (as base for custom/local translations) that can be updated with the following command:

```bash
$ npm run pot
```

### API Documentation

The API documentation based on the sources can be generated with the following command and is available in the `apidoc` folder afterwards:

```bash
$ npm run apidoc
```

To view it using a local webserver:

```bash
$ npm run apidoc:view
```

If these docs are not needed anymore, the respective folders can be deleted with this command:

```bash
$ npm run apidoc:delete
```

(The folder `apidoc` is meant to be used locally, it should **not** a part of any repository.)

### User/Integrator Documentation

The source files (markdown) of the [docs for users and integrators](https://docs.immonex.de/kickstart/) mentioned above are located in the `doc` folder. A globally installed *doc-gen* package (currently **not** available publicly) and a suitable user account are required for publishing...

```bash
$ npm run doc
```

...or publishing it under https://docs.immonex.de/kickstart/:

```bash
$ npm run doc:publish
```

## License

[GPLv2 or later](LICENSE)

Copyright (C) 2014, 2026 [inveris OHG](https://inveris.de/) / [immonex](https://immonex.dev/)

This plugin is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This plugin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

[^1]: [immonex OpenImmo2WP](https://plugins.inveris.de/wordpress-plugins/immonex-openimmo2wp), initially released in 2015, is a tried and tested solution for importing OpenImmo-XML data into WordPress sites that supports the specific data structures of various popular real estate themes and frontend plugins by means of customizable *mapping tables*.

[^2]: Current and fully functional versions (including betas) of all immonex plugins (free and premium) as well as OpenImmo demo data can be downloaded and licensed **free of charge** at the [immonex Developer Portal](https://immonex.dev/) for testing, development and demonstration purposes.