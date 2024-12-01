/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, KoaTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../controllers/users.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WalksController } from './../controllers/walks.controller';
import type { Context, Next, Middleware, Request as KRequest, Response as KResponse } from 'koa';
import type * as KoaRouter from '@koa/router';


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserResponseModel": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "token": {"dataType":"string","default":""},
            "username": {"dataType":"string","default":""},
            "email": {"dataType":"string","default":""},
            "phone": {"dataType":"string"},
            "password": {"dataType":"string","default":""},
            "location": {"dataType":"string"},
            "friends": {"dataType":"array","array":{"dataType":"refObject","ref":"UserResponseModel"}},
            "future_walks": {"dataType":"array","array":{"dataType":"refObject","ref":"WalkModel"}},
            "history_walks": {"dataType":"array","array":{"dataType":"refObject","ref":"WalkModel"}},
            "collections": {"dataType":"array","array":{"dataType":"refObject","ref":"CollectionModel"}},
            "likes": {"dataType":"array","array":{"dataType":"refObject","ref":"ReelModel"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalkModel": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "date": {"dataType":"string","default":""},
            "time": {"dataType":"string","default":""},
            "name": {"dataType":"string","default":""},
            "description": {"dataType":"string","default":""},
            "history_friends": {"dataType":"array","array":{"dataType":"refObject","ref":"UserResponseModel"}},
            "future_friends": {"dataType":"array","array":{"dataType":"refObject","ref":"UserResponseModel"}},
            "reels": {"dataType":"array","array":{"dataType":"refObject","ref":"ReelModel"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReelModel": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "image": {"dataType":"string","default":""},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "user": {"ref":"UserResponseModel","required":true},
            "walk": {"ref":"WalkModel","required":true},
            "collections": {"dataType":"array","array":{"dataType":"refObject","ref":"CollectionModel"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CollectionModel": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "user": {"dataType":"array","array":{"dataType":"refObject","ref":"UserResponseModel"},"required":true},
            "reels": {"dataType":"array","array":{"dataType":"refObject","ref":"ReelModel"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRegisterModel": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginModel": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReelDtoModel": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "image": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "user": {"ref":"UserResponseModel","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalkDtoModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "history_friends": {"dataType":"array","array":{"dataType":"refObject","ref":"UserResponseModel"}},
            "future_friends": {"dataType":"array","array":{"dataType":"refObject","ref":"UserResponseModel"}},
            "reels": {"dataType":"array","array":{"dataType":"refObject","ref":"ReelDtoModel"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new KoaTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


export function RegisterRoutes(router: KoaRouter) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


        router.post('/auth/register',
            ...(fetchMiddlewares<Middleware>(UsersController)),
            ...(fetchMiddlewares<Middleware>(UsersController.prototype.registerUser)),

            async function UsersController_registerUser(context: Context, next: Next) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user: {"in":"body","name":"user","required":true,"ref":"UserRegisterModel"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new UsersController();

            return templateService.apiHandler({
              methodName: 'registerUser',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/auth/login',
            ...(fetchMiddlewares<Middleware>(UsersController)),
            ...(fetchMiddlewares<Middleware>(UsersController.prototype.loginUser)),

            async function UsersController_loginUser(context: Context, next: Next) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    user: {"in":"body","name":"user","required":true,"ref":"UserLoginModel"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new UsersController();

            return templateService.apiHandler({
              methodName: 'loginUser',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/auth/profile/:userId',
            ...(fetchMiddlewares<Middleware>(UsersController)),
            ...(fetchMiddlewares<Middleware>(UsersController.prototype.getProfile)),

            async function UsersController_getProfile(context: Context, next: Next) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new UsersController();

            return templateService.apiHandler({
              methodName: 'getProfile',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/walks/create',
            ...(fetchMiddlewares<Middleware>(WalksController)),
            ...(fetchMiddlewares<Middleware>(WalksController.prototype.registerUser)),

            async function WalksController_registerUser(context: Context, next: Next) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    walk: {"in":"body","name":"walk","required":true,"ref":"WalkDtoModel"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new WalksController();

            return templateService.apiHandler({
              methodName: 'registerUser',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/walks/future/:userId',
            ...(fetchMiddlewares<Middleware>(WalksController)),
            ...(fetchMiddlewares<Middleware>(WalksController.prototype.getFutureWalksByUserId)),

            async function WalksController_getFutureWalksByUserId(context: Context, next: Next) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new WalksController();

            return templateService.apiHandler({
              methodName: 'getFutureWalksByUserId',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/walks/history/:userId',
            ...(fetchMiddlewares<Middleware>(WalksController)),
            ...(fetchMiddlewares<Middleware>(WalksController.prototype.getHistoryWalksByUserId)),

            async function WalksController_getHistoryWalksByUserId(context: Context, next: Next) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new WalksController();

            return templateService.apiHandler({
              methodName: 'getHistoryWalksByUserId',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/walks/walk/:walkId',
            ...(fetchMiddlewares<Middleware>(WalksController)),
            ...(fetchMiddlewares<Middleware>(WalksController.prototype.getWalkById)),

            async function WalksController_getWalkById(context: Context, next: Next) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    walkId: {"in":"path","name":"walkId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new WalksController();

            return templateService.apiHandler({
              methodName: 'getWalkById',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
