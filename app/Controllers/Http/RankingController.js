"use strict";

const User = use("App/Models/User");

class RankingController {
  async index() {
    const users = await User.query()
      .orderBy("points", "DESC")
      .fetch();

    return users;
  }
}

module.exports = RankingController;
