import { Request, Response } from "express";

export type RouteMiddleware<TNext extends Function = Function> = (
  req: Request,
  res: Response,
  next: TNext
) => Promise<unknown>;

export type ErrorMiddleware<
  TError extends Error = Error,
  TNext extends Function = Function
> = (err: TError, req: Request, res: Response, next: TNext) => Promise<unknown>;
