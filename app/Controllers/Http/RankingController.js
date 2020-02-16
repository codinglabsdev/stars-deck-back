"use strict";

const User = use("App/Models/User");

class RankingController {
  async index() {
    return User.query()
      .orderBy("points", "DESC")
      .fetch();
  }
}

module.exports = RankingController;
