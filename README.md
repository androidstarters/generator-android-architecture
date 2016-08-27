# generator-android-architecture
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Yeoman generator for googlesamples android-architecture.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-android-architecture using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-android-architecture
```

Then generate your new project:

```bash
mkdir NewApp && cd $_
yo android-architecture
```

## Example
```bash
➜  NewApp yo android-architecture

     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the badass  │
    |--(o)--|    │ generator-android-archit │
   `---------´   │     ecture generator!    │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? What are you calling your app? NewApp
? What package will you be publishing the app under? in.architecture.sample
? Choose architecture from https://github.com/googlesamples/android-architecture? (Use arrow keys)
❯ todo-mvp - Basic Model-View-Presenter architecture.
  todo-mvp-loaders - Based on todo-mvp, fetches data using Loaders.
  todo-mvp-databinding - Based on todo-mvp, uses the Data Binding Library.
  todo-mvp-clean - Based on todo-mvp, uses concepts from Clean Architecture.
  todo-mvp-dagger - Based on todo-mvp, uses Dagger2 for Dependency Injection
  todo-mvp-contentproviders - Based on todo-mvp-loaders, fetches data using Loaders and uses Content Providers
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [Ravindra Kumar](https://github.com/ravidsrk/)


[npm-image]: https://badge.fury.io/js/generator-android-architecture.svg
[npm-url]: https://npmjs.org/package/generator-android-architecture
[travis-image]: https://travis-ci.org/ravidsrk/generator-android-architecture.svg?branch=master
[travis-url]: https://travis-ci.org/ravidsrk/generator-android-architecture
[daviddm-image]: https://david-dm.org/ravidsrk/generator-android-architecture.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ravidsrk/generator-android-architecture
[coveralls-image]: https://coveralls.io/repos/ravidsrk/generator-android-architecture/badge.svg
[coveralls-url]: https://coveralls.io/r/ravidsrk/generator-android-architecture
