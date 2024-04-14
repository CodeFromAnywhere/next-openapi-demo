export interface paths {
    "/function/testEndpoint": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** This is to test to find a response and proper type validation. */
        post: operations["testEndpoint"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        StandardResponse: {
            isSuccessful: boolean;
            message?: string;
            priceCredit?: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    testEndpoint: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description Hey this is a */
                    a: string;
                    /** @description Hey this is b */
                    b?: number;
                };
            };
        };
        responses: {
            /** @description Standard response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StandardResponse"];
                };
            };
        };
    };
}


export type StandardResponse = components["schemas"]["StandardResponse"]
  
export const operationUrlObject = {
  "testEndpoint": {
    "method": "post",
    "path": "/function/testEndpoint"
  }
}
export const operationKeys = Object.keys(operationUrlObject);