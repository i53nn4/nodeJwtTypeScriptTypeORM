import express, {Request, Response} from 'express';
import {createConnection} from "typeorm";
import * as dotenv from 'dotenv';

import AuthMiddleware from './middleware/authMiddleware';
import {AuthRouter} from './routes/authRoute';
import {UserRouter} from './routes/userRoute';
import {PostRouter} from './routes/postRoute';

class Server {
    private authRouter: AuthRouter;
    private userRouter: UserRouter;
    private postRouter: PostRouter;
    private app: express.Application;

    constructor() {
        dotenv.config();

        this.app = express(); // init the application
        this.configuration();
        this.routes().then(r => {
        });
    }

    /**
     * Method to configure the server,
     * If we didn't configure the port into the environment
     * variables it takes the default port 3000
     */
    public configuration() {
        this.app.set('port', process.env.HOST_PORT || 3000);
        this.app.use(express.json());
    }

    /**
     * Method to configure the connection
     */
    async connection() {
        await createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ["src/models/*.ts"],
            migrations: ["src/database/migrations/*.ts"],
            synchronize: true,
            name: "connection"
        });
    }

    /**
     * Method to configure the routes
     */
    public async routes() {
        await this.connection();

        this.authRouter = new AuthRouter();
        this.userRouter = new UserRouter();
        this.postRouter = new PostRouter();

        this.app.get("/", (req: Request, res: Response) => {
            res.send("Hello world!");
        });

        // Configure the new routes of the controller
        this.app.use(`/api/auth/`, this.authRouter.router);
        this.app.use(`/api/users/`, AuthMiddleware, this.userRouter.router);
        this.app.use(`/api/posts/`, AuthMiddleware, this.postRouter.router);
    }

    /**
     * Used to start the server
     */
    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        });
    }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
