import {Router} from "express";

import {PostController} from '../controller/postController';

export class PostRouter {
    private postController: PostController;

    public router: Router;

    constructor() {
        this.postController = new PostController(); // Create a new instance of PostController

        this.router = Router();
        this.routes();
    }

    /**
     * Configure the routes of controller
     */
    public routes() {
        this.router.get('/', this.postController.index);
        this.router.post('/', this.postController.create);
        this.router.put('/:id', this.postController.update);
        this.router.delete('/:id', this.postController.delete);
    }
}
