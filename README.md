# Spotify-clone project

Spotify-clone using Next.js 13 App Router.

This Project was inspired by Antonio's tutorial! A Spotify clone that we can listen to our favorite music! I didn't use the Spotify API since this work is also for personal use. I also made some improvements in functionality, a better music bar interface, removed some unnecessary package and using native audio html (So it work on mobile web).

Stacks use for this project:

* Next.js 13 app directory
* TailwindCss and Radix UI for modal/tooltip
* Supabase 
* Stripe

Some other Tools

* TypeScript 
* Zustand for state management.

Features:

* OAuth integration with Supabase 
* User can upload Song and image once signed in.
* User can "liked" a list of favorite song in order play the select list in the liked section page
* Stripe membership integration in order to subscribe as a Premium or All-access user. (Only in test-mode to learn the functionality) 

Restrictions:

* For personal use so other user cannot Update or Delete Songs in the public lists even after uploading on their own.