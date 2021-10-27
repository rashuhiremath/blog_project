import { body } from "express-validator"

export const blogValidationMiddlewares = [
  body("name").exists().withMessage("Name is a mandatory field!"),
  body("surname").exists().withMessage("surname is a mandatory field!"),
  body("email").exists().withMessage("email is a mandatory field!"),
  body("DOB").exists().withMessage("DOB is a mandatory field!"),
  
]