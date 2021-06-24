import {getConnection} from 'typeorm';

import {PostEntity} from '../models/postEntity';
import {PostRepository} from '../repository/postRepository';

export class PostService {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = getConnection("connection").getCustomRepository(PostRepository);
    }

    public index = async () => {
        return await this.postRepository.find().catch(e => {
            console.log(e);
        });
    }

    public create = async (post: PostEntity) => {
        return await this.postRepository.save(post).catch(e => {
            console.log(e);
        });
    }

    public update = async (post: PostEntity, id: number) => {
        return await this.postRepository.update(id, post).catch(e => {
            console.log(e);
        });
    }

    public delete = async (id: number) => {
        return await this.postRepository.delete(id).catch(e => {
            console.log(e);
        });
    }
}
