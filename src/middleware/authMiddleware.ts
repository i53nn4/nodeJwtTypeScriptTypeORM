import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

interface ITokenPlayLoad {
    id: string;
    iat: number;
    exp: number;
}

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, String(process.env.AUTH_SECRET));

        const {id} = data as ITokenPlayLoad;

        req.userId = id;

        return next();
    } catch {
        return res.sendStatus(401);
    }
}
