"use strict";

const User = use("App/Models/User");

const RankingHook = (exports = module.exports = {});

RankingHook.setPosition = async userInstance => {
  const users = await User.query()
    .orderBy("points", "DESC")
    .fetch();
  const usersJSON = users.toJSON();

  const index = usersJSON.findIndex(({ id }) => id === userInstance.id);
  userInstance.position = index + 1;
};
