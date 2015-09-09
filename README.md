# Hamsterace

A front-end for a connected wheel for hamster using LumX

## Installation

- git clone http://github.com/huitre/hamster-frontend-lumx myApp
- cd myApp
- npm install
- gulp

That's it. Now visit [http://localhost:4242](http://localhost:4242) and profit.

## What's in the box
  - uses Browserify to build the client code from the `client` to the `public` folder
  - uses **$stateProvider** for the (HTML5 PushState supported) routing
  - uses **SASS** as pre processor
  - uses **Gulp** as build tool that does:
  	- view compiling
  	- sass conversion
  	- browserify-ing all teh things
  	- cleaning the build folder
  	- jshinting your beautiful code

Based on boiler-plate app ([http://github.com/Hyra/Frickle.git]Frickle) 