import Koa from "koa";
import Router from "@koa/router";
import { RegisterRoutes } from "./routes/routes";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import Redis from 'ioredis';
import "reflect-metadata";
import { createConnection } from "typeorm";
import UserResponseModel from "./models/user/user-response.model";
import WalkModel from "./models/walk/walk.model";
import ReelModel from "./models/reels/reel.model";
import CollectionModel from "./models/reels/collection.model";
import { environment } from "./environments/environment";

const app = new Koa();

export const redis = new Redis({
    host: environment.redisUrl,
    port: environment.redisPort,
});

app.use(cors({
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "OPTIONS"],
    origin: ctx => {
        return ctx.request.headers.origin ?? "";
    }
}))

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ ctx.method } ${ ctx.url } - ${ rt }`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ ms }ms`);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err: any) {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized: Invalid or missing token' };
        } else {
            throw err;
        }
    }
});

app.use(bodyParser());

createConnection({
    type: 'sqlite',
    database: './db.sqlite3', // Specify the path to your SQLite database file
    entities: [
        UserResponseModel,
        WalkModel,
        ReelModel,
        CollectionModel,
    ],
    synchronize: true, // Set to false in production
}).then(connection => {
    console.log("Database connected!");
    
    const router = new Router();
    RegisterRoutes(router);
    app.use(router.routes())
    
    app.listen(3000);
    
    console.log('started');
}).catch(error => console.log("Database connection error: ", error));