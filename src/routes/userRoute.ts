import {Router} from "express";

import {UserController} from '../controller/userController';

export class UserRouter {
    private userController: UserController;

    public router: Router;

    constructor() {
        this.userController = new UserController(); // Create a new instance of UserController

        this.router = Router();
        this.routes();
    }

    /**
     * Configure the routes of controller
     */
    public routes() {
        this.router.get('/', this.userController.index);
        this.router.post('/', this.userController.create);
        this.router.put('/:id', this.userController.update);
        this.router.delete('/:id', this.userController.delete);
    }
}
