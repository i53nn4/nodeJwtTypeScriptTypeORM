import {Response, Request} from "express";
import bcrypt from 'bcryptjs';

import {UserEntity} from "../models/userEntity";
import {AuthService} from "../services/authService";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService(); // Create a new instance of AuthController
    }

    public authenticate = async (req: Request, res: Response) => {
        const user = req['body'] as UserEntity;
        const newAuth = await this.authService.authenticate(user.email);

        if (!newAuth) {
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(user.password, newAuth.password);

        if (!isValidPassword) {
            return res.sendStatus(401);
        }

        const token = this.authService.getJwt(newAuth);

        return res.json({
            user: {
                id: newAuth.id,
                email: newAuth.email
            },
            token
        })
    }
}
