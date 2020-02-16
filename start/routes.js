"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/ranking", "RankingController.index");

Route.resource("users", "UserController")
  .apiOnly()
  .except(["index", "delete"])
  .middleware(new Map([[["update", "delete"], ["auth"]]]))
  .validator(new Map([[["store"], ["User"]]]));

Route.resource("events", "EventController")
  .apiOnly()
  .except(["index", "show", "delete"])
  .middleware(new Map([[["store", "update", "delete"], ["auth"]]]))
  .validator(new Map([[["store"], ["Event"]]]));

Route.post("sessions", "SessionController.store").validator("Session");
