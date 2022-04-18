# Bostorgay

**Bostorgay** (meaning _sparrow_ in _[Crimean Tatar](https://en.wikipedia.org/wiki/Crimean_Tatar_language)_) is a simple personal music server written in **SvelteKit**, **Vue.js** and **Node.js**.

It's also a popular folk [song](https://www.youtube.com/watch?v=lje35XCtEA4).

## Intro & Installation

There are 3 different applications in the repository. _backend_, is where application logic resides & audio files are stored. _frontend_ is what your users see & where they listen your music. _frontend-admin_ is where you can add new songs & artists.

All of these 3 apps written in JS and are npm packages, so you can run them by typing `npm run dev` after installing required packages via `npm install` in respective folders.

In each of these folders you also had to create `.env` files and set required variables, which can be found in `.env.example` files in the folders.

## Deployment

Currently the only option the host your audio files are in the server, no object storage option is available. So any file you upload will be places in the `audio` folder in the backend and will be served from there.

If you want to use `nginx` to deploy these apps in the same server, you can use a configuration file similar to this one:

```
# backend
server {
    server_name api.bostorgay.com;
    location / {
        proxy_pass       http://127.0.0.1:2999;
    }
}
# frontend
server {
    server_name bostorgay.com;
    location / {
        proxy_pass       http://127.0.0.1:3000;
    }
}
# frontend-admin
server {
    server_name admin.bostorgay.com;
    root /root/bostorgay/frontend-admin/dist;
    index index.html;
    location / {
      try_files $uri $uri/ /index.html;
    }
}
```

Don't forget to install `ssl` and make necessary modifications in the configuration file.

## Management

First user to register is going to be system `admin`. After that you can add `editors` and modify / ban `users` in the admin panel. Editors can add & edit songs, but can not delete them. Users are only allowed to see, search & listen songs. Admin can do whatever he wants. Multiple admins are not supported this time.

## Contribution & Feature Suggestions

You can freely open new issues if you want to suggest or add a new feature. Keep in mind that I want to keep this app as simple as possible, but improvements are always welcomed.
