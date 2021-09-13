# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?
- `lodash-es` A ES port of famous library `lodash` to allow tree-shaking during builds, which provides a lot of useful helper functions 
- `bluebird` A promise library, from which I only used its concurrency and delay control over API calling series
- `vuex` state management
- `vue-content-loader` Svg based loading effect
- `@fawmi/vue-google-maps` Google Maps library

### Q) What's the command to start the application locally?

These are necessary commands for quick start, more detailed information can be found at [README.md file](./README.md)

- Please run this command to install required dependencies
  ```
  yarn
  ```
- Create an `.env` in your project folder (beside `.env.example`) with your [Google API key](https://console.cloud.google.com/apis/credentials) (with Maps JS, Geocoder permissions)
  ```
  GOOGLE_API_KEY=<api-key>
  ```
- This command will start a quasar development server, which will also watch your file changes to live-reload
  ```
  yarn start
  ```
  You can preview your changes at http://localhost:8080

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

- I would have added some e2e or functional test cases, which are useful for quality assurance
- I would add something like vuex persist, to persist fetched data for hub addresses into local storage, which will help us to avoid re-calling Google APIs over again for fetching positions (lat-long)
- A full fledge setup of CI/CD process bound into git flow, coverage tests, fuzzy tests, code quality ... or even QraphQL. Well, a lot of fun things to do

### Q) Which parts are you most proud of? And why?

I think it's working with Quasar. This is my first time with it and got some difficulties during early setup but the more I use it, the more I love it. The framework is pretty brilliant, it also saved me a lot of time dealing with boilerplate code.

I also used Quasar's `boot` function for dependency injection thing - booting some services ahead so they can be used in my components and store actions.

### Q) Which parts did you spend the most time with? What did you find most difficult?

I think it's finding a right library for working with Google Maps during this experiment. I went through like 5 or 6 of them, some only work with Vue 2, some don't have clear documents, some have critical bugs or avoid exposing Google Maps API instance. 

The final one I got doesn't support typescript, but it's working fine for me.

Anyway, this is the first time I do maps with VueJS (I pretty did them in some other ways). It's really great that it's working.

### Q) How did you find the test overall? Did you have any issues or have difficulties completing?If you have any suggestions on how we can improve the test, we'd love to hear them.

It works for me. I really had fun with it.
