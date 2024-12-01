import { environment } from "../environments/environment";
import Koa from "koa";

export function isAuthorized(
    request: Koa.Request,
    securityName: string,
    scopes?: string[]
) {
    if (securityName === 'userAuth') {
        let token;
        if (request.query && request.query.access_token) {
            token = request.query.access_token;
        }
        console.log(token);
    } else return;
}

