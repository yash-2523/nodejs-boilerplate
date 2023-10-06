import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../helpers/customError";
import {
	createValidator
  } from 'express-joi-validation'
import { headerValidationSchema} from "../helpers/requestValidatorSchema";
const Joi = require('joi');
const multiparty = require('multiparty');
  const validator = createValidator({
	passError: true
  })
export async function headerValidatorMiddleware(
    req: any,
    res: Response,
    next: NextFunction
) {
    const { error } = headerValidationSchema.validate(req.headers);
    if(error){
        return next(new ExpressError(error.message, 400));
    }else{
        next();
    }
}