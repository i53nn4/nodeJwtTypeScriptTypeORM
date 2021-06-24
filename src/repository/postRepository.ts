import {EntityRepository, Repository} from "typeorm";
import {PostEntity} from "../models/postEntity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {

}
