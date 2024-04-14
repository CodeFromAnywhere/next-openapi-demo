import { operations } from "./types";
import openapi from "../openapi.json";
import type { NextApiRequest, NextApiResponse } from "next";

export type PromiseOrNot<T> = Promise<T> | T;

export type Endpoint<T extends keyof operations> = (
  context: operations[T]["requestBody"]["content"]["application/json"],
) => PromiseOrNot<
  operations[T]["responses"][200]["content"]["application/json"]
>;

/** Use this to create an endpoint based on an openapi definition */
export const makeEndpoint = (fn: Endpoint<any>) => {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    // TODO: parse req.body according to schema from openapi

    // TODO: find the Operation with operationId (available at fn.name)
    const operation = openapi.paths["/function/testEndpoint"].post;

    const schema = operation.requestBody.content["application/json"].schema;
    // validate this schema and return early if it fails

    const result = await fn(req.body);
    res.status(200).json(result);
  };
};
