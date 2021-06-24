import {getConnection} from 'typeorm';
import bcrypt from "bcryptjs";

import {UserEntity} from '../models/userEntity';
import {UserRepository} from '../repository/userRepository';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = getConnection("connection").getCustomRepository(UserRepository);
    }

    public index = async () => {
        return await this.userRepository.find().catch(e => {
            console.log(e);
        });
    }

    public create = async (user: UserEntity) => {
        user.password = await this.crypt(user.password);
        return await this.userRepository.save(user).catch(e => {
            console.log(e);
        });
    }

    public update = async (user: UserEntity, id: number) => {
        user.password = await this.crypt(user.password);
        return await this.userRepository.update(id, user).catch(e => {
            console.log(e);
        });
    }

    public delete = async (id: number) => {
        return await this.userRepository.delete(id).catch(e => {
            console.log(e);
        });
    }

    private crypt = async (password: string) => {
        const salt = await bcrypt.genSalt(8);
        return await bcrypt.hash(password, salt);
    }
}
