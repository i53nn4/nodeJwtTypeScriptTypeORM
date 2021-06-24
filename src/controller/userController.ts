import {Response, Request} from "express";

import {UserEntity} from "../models/userEntity";
import {UserService} from "../services/userService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService(); // Create a new instance of UserController
    }

    public index = async (req: Request, res: Response) => {
        const users = await this.userService.index();
        res.send(users).json();
    }

    public create = async (req: Request, res: Response) => {
        const user = req['body'] as UserEntity;
        const newUser = await this.userService.create(user);
        res.send(newUser);
    }

    public update = async (req: Request, res: Response) => {
        const user = req['body'] as UserEntity;
        const id = req['params']['id'];

        res.send(this.userService.update(user, Number(id)));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.send(this.userService.delete(Number(id)));
    }
}
