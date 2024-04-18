import { operations } from "./openapi-types";
import openapi from "../public/openapi.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { JSONSchemaType } from "ajv";
import { tryValidateSchema } from "./tryValidateSchema";

export type PromiseOrNot<T> = Promise<T> | T;

export type Endpoint<T extends keyof operations> = (
  context: operations[T]["requestBody"]["content"]["application/json"],
) => PromiseOrNot<
  operations[T]["responses"][200]["content"]["application/json"]
>;

/**
 * Handy function to get the keys of an object, but typed.
 *
 * NB: The only difference from Object.keys is that this returns the keys in a typesafe manner
 */
export const getObjectKeysArray = <TObject extends { [key: string]: any }>(
  object: TObject,
) => {
  return Object.keys(object) as Extract<keyof TObject, string>[];
};

/** Use this to create an endpoint based on an openapi definition */
export const makeEndpoint = (fn: Endpoint<any>, isFlyFn?: boolean) => {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const operations = openapi?.paths
      ? Object.values(openapi.paths)
          .map((item) => {
            const operations = getObjectKeysArray(item).map((method) => {
              return { ...item[method], method };
            });
            return operations;
          })
          .flat()
      : [];

    const operation = operations.find((x) => x.operationId === fn.name);

    if (!operation) {
      res.status(422).json({
        isSuccessful: false,
        message: "Operation not found for function " + fn.name,
      });
      return;
    }

    const data = req.body;

    if (req.headers["content-type"] !== "application/json") {
      res.status(422).json({
        isSuccessful: false,
        message: "Please specify content-type header to be application/json",
      });
      return;
    }
    console.log(data);
    const schema = operation.requestBody.content["application/json"]
      .schema as JSONSchemaType<any>;
    const errors = tryValidateSchema({ schema, data });
    // validate this schema and return early if it fails

    if (errors && errors.length > 0) {
      res.status(422).json({
        isSuccessful: false,
        message:
          "Invalid Input\n\n" +
          errors.map((x) => x.instancePath + ": " + x.message).join(" \n\n"),
        // errors,
      });
      return;
    }

    // For fly-required functions in vercel env, we want to fetch fly.dev
    if (isFlyFn && !process.env.IS_RUNNER) {
      // TODO: Get this by using the Fly API
      const FLY_DOMAIN = "bun-wijnand-falling-cloud-2567.fly.dev";
      const flyUrl = `https://${FLY_DOMAIN}/api/${fn.name}`;

      // TODO: should respond with something within 25s (see https://vercel.com/docs/functions/runtimes#max-duration) and finally respond with the response from the runner.
      const result = await fetch(flyUrl, { method: "POST", body: data }).then(
        (res) => res.json(),
      );

      //

      /** Use this to create an endpoint that spawns or finds a worker from a pool that can execute more long-running code that cannot be executed in Vercel */

      return;
    }
    const result = await fn(req.body);
    res.status(200).json(result);
    return;
  };
};
