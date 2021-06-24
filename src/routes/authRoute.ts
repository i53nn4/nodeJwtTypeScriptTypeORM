import {Router} from "express";

import {AuthController} from '../controller/authController';

export class AuthRouter {
    private authController: AuthController;

    public router: Router;

    constructor() {
        this.authController = new AuthController(); // Create a new instance of AuthController

        this.router = Router();
        this.routes();
    }

    /**
     * Configure the routes of controller
     */
    public routes() {
        this.router.post('/', this.authController.authenticate);
    }
}
