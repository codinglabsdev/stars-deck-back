"use strict";

const api = require("../../Services/api");

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    const { username, email, password } = request.all();

    try {
      const githubData = await api.get(`/users/${username}`);

      const {
        data: { avatar_url: avatar, html_url: url, name, bio }
      } = githubData;

      const user = await User.create({
        username,
        email,
        password,
        avatar,
        url,
        name,
        bio
      });

      return user;
    } catch (error) {
      if (error.response.status === 404)
        return response.status(404).json({
          error: { message: "Github username not found" }
        });
    }
  }

  async show({ params }) {
    return await User.query()
      .where("username", params.id)
      .with("events", query => query.select().orderBy("date", "DESC"))
      .firstOrFail();
  }
}

module.exports = UserController;
