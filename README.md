# Motivation:

- Make desing-first approach for building OpenAPIs easy (following the [recommendation](https://learn.openapis.org/best-practices.html))

# Features:

This is a [Next.js](https://nextjs.org/) project based on [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). What it adds based on the standard configuration (typescript, pages router), is the following:

- `openapi.json` is your SSOT for your input/output
- `npm run dev` watches `openapi.json`
- Auto-generates types for your OpenAPI.
- Builds SDK Client for your OpenAPI.
- Makes it very easy to reuse your endpoints as regular functions or cli's as well.

# How to use

To work with this, change your functions and their IO in `openapi.json`, then run `npm run types` to re-generate your types.

Now, all you need to make sure to do, is to have a function for each endpoint you defined in your `api` folder, in this way:

```ts
import { Endpoint, makeEndpoint } from "@/api-util";

export const testEndpoint: Endpoint<"testEndpoint"> = async (context) => {
  // Your function
};

export default makeEndpoint(testEndpoint);
```

In the above example, the test endpoint is automatically typescript validated and also it can validate its input automatically, all based on your openapi spec.

# Wishlist

- Watch your `/api` folder and detect api paths that are available and compare that to the ones that are defined in OpenAPI. With this info, we can warn the user whether or not an API exists and should exist.
