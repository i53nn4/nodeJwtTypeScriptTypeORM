import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "../models/userEntity";

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {

}
