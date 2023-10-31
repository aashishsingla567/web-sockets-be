import { Router } from "express";

export const METHODS = ["get", "post", "put", "delete"];

export interface Route {
  path: string;
  router: Router;
}

export interface Endpoint {
  path: string;
  method: (typeof METHODS)[number];
  controller: Function;
}
