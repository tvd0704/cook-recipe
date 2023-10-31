import { updateRecipe } from './recipe.service';
import path from 'path';
import { Router } from "express";
import { validateDto } from "../../utilities/validate";
import * as recipeDto from "./model/recipe.dto"
import { authJwt } from "../../middleware/authentication";
import { checkRole } from "../../middleware/authorization";
import { UserRole } from "../../common";
import { catchError } from "../../utilities/errorHandler";
import * as recipeController from "./recipe.controller"
import multer from 'multer';



var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,path.join(__dirname, '../../uploads'));
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});


// img filter
const isImage = (req:any,file:any,callback:any)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

export const recipeRouter = Router();

recipeRouter.post('/', authJwt, checkRole([UserRole.User]),upload.single("photo"),catchError(recipeController.addRecipe))

recipeRouter.delete('/:recipeId',validateDto(recipeDto.deleteRecipe), authJwt, checkRole([UserRole.User]),catchError(recipeController.deleteRecipe))

recipeRouter.put('/:recipeId',validateDto(recipeDto.updateRecipe), authJwt, checkRole([UserRole.User]),catchError(recipeController.updateRecipe))

recipeRouter.get('/',validateDto(recipeDto.getAllRecipe), authJwt, checkRole([UserRole.User]),catchError(recipeController.getAllRecipe))

recipeRouter.get('/:recipeId',validateDto(recipeDto.getRecipe), authJwt, checkRole([UserRole.User]), catchError(recipeController.getRecipe))

