# Welcome to Readable Docs

[![Maintainability](https://api.codeclimate.com/v1/badges/6e3a426c443402a3f8ca/maintainability)](https://codeclimate.com/github/chrismaille/Readable/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4544c3a6880248d893cab1d12313dd9f)](https://www.codacy.com/app/chrismaille/Readable?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=chrismaille/Readable&amp;utm_campaign=Badge_Grade)


This is the project for the final assessment project for Udacity's Redux
course where you will build a content and comment web app. Users will be
able to post content to predefined categories, comment on their posts
and other users' posts, and vote on posts and comments. Users will also
be able to edit and delete posts and comments.

### API Server

Information about the API server and how to use it can be found in its
[README file](packages/api-server/README.md).

### Project design info

* Mockup:
  [Moqups](https://app.moqups.com/dzuoT76hjR/view/page/aa849dfe8?fit_width=1)
* [Components](https://github.com/chrismaille/Readable/issues/2)
* [Events/Actions](https://github.com/chrismaille/Readable/issues/3)


## Install

```bash
$ yarn install
$ cd ./packages/api-server && yarn install
$ cd ./packages/frontend && yarn install
```

## Run

```
$ cd ./packages/api-server && yarn start
$ cd ./packages/frontend && yarn start
```

Alternatively, you can use [lerna](https://lernajs.io/):

```bash
$ lerna bootstrap
$ lerna run start
```
