"use strict";

const api = require("../../Services/api");

const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    const { username, email, password } = request.all();

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
  }

  async show({ params }) {
    return await User.query()
      .where("id", params.id)
      .with("events", query => query.select().orderBy("date", "DESC"))
      .firstOrFail();
  }
}

module.exports = UserController;
