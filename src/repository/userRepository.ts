import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "../models/userEntity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

}
