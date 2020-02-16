"use strict";

const RankingHook = (exports = module.exports = {});

RankingHook.setPosition = async usersInstance => {
  usersInstance.forEach((item, i) => (item.position = i + 1));
};
