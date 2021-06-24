import {getConnection} from 'typeorm';
import jwt from "jsonwebtoken";

import {UserEntity} from '../models/userEntity';
import {AuthRepository} from '../repository/authRepository';

export class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = getConnection("connection").getCustomRepository(AuthRepository);
    }

    public authenticate = async (email: string) => {
        return await this.authRepository.findOne({where: {email}});
    }

    public getJwt = (newAuth: UserEntity) => {
        return jwt.sign({id: newAuth.id}, String(process.env.AUTH_SECRET), {expiresIn: String(process.env.AUTH_EXPIRES)})
    }
}
