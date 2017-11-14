# Loopback Scripts

These are a couple of helper scripts meant to just do one thing. Help quickly and
(as much as I could) painlessly, create a (at least more) scalable file structure
for the business logic code within the models. Hope this makes sense.

## Instructions
```bash
$ npm install lb-scripts --save
$ # Or if you use yarn
$ yarn add lb-scripts
```

Then edit your `package.json` file, and add these lines within the `scripts` object:
```javascripT
{
  // ...
  "scripts": {
    // ...
    "provision:project": "lb-scripts -p",
    "provision:model": "lb-scripts -m"
  },
  // ...
}
```

## Usage: provision:project
```bash
$ npm run provision:project
```

Run this only once on the project, this will create some bootstrap files
and directories that should be of help on your backend needs.

## Usage: provision:model
```bash
$ npm run provision:model <model-name>
```

This will change the contents of the `/common/models/model-name.js` file
and will create folders with modules for each way Loopback provides
to add business logic.

## Usage: creating business logic (the blog post isn't published yet!)
For now, the only guide out there is the [blog post] which explains how to
use this script. If you have any other question, please create issue and
I'll try to answer them quickly enough.

## Reasons of the existance of this package
For one, I wanted to write down a [blog post] (coming soon) for expressing my opinion on a better
way to write a quick and sensible backend app with REST powers without too much sore.

Also, wanted to share this in case someone actually wants to use it in their
environment, so to make it easier.

---
## TODO
Error handling... Mostly.


[blog post]: <https://gorillalogic.com/blog/>
[video]: <https://www.youtube.com/channel/UCKRTJTFgyQByGCOonUatSfw>
