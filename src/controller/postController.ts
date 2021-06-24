import {Response, Request} from "express";
import {PostEntity} from "../models/postEntity";

import {PostService} from "../services/postService";

export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService(); // Create a new instance of PostController
    }

    public index = async (req: Request, res: Response) => {
        const posts = await this.postService.index();
        res.send(posts).json();
    }

    public create = async (req: Request, res: Response) => {
        const post = req['body'] as PostEntity;
        const newPost = await this.postService.create(post);
        res.send(newPost);
    }

    public update = async (req: Request, res: Response) => {
        const post = req['body'] as PostEntity;
        const id = req['params']['id'];

        res.send(this.postService.update(post, Number(id)));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.send(this.postService.delete(Number(id)));
    }
}
