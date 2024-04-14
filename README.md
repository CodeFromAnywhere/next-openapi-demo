This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It has been slightly changed to make it possible to use an OpenAPI as SSOT for your APIs.

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
