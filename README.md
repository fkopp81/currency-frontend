# currency-frontend

## the challenge

We are a company based in Munich, Germany and are expanding internationally to the US and Switzerland. We need to price our products in CHF and USD. Our pricing team needs a dashboard that show the current value of a EUR amount in CHF and USD. Also we would like to have an overview of the last two weeks conversion rates in a graphical chart.

## the data

Please use https://currencylayer.com/ to retrieve raw currency data, and please utilize the client library provided here: (https://www.npmjs.com/package/currencylayer-client). 

## requirements

#### Functional requirements:
- be able to convert currencies from and to the target currencies mentioned above 
- be able to retrieve historical currency conversion rates
- show a chart of daily currency rates for a selected list of target currencies (multi-select)
- 'correct' handling of currency rates in Javascript

#### Non functional requirements:
- The app should have certain optimization levels concerning querying/data fetching.  
- Implement the necessary logic/wrapper to cover the limitation of the free plan provided by `currencylayer-client`.
- Explicit error handling strategy.

## your stack

Try to use a modern JS stack, e.g. React or Vue. You can use any boilerplate or framework you like, for React we recommend create-react-app or next.js, for Vue you could for instance use nuxt.js. If you prefer it this way, you can sprinkle your code with some typescript, but this is not a must.

## optionals

Local storage, unit tests, PWA, anything you want to show off...
