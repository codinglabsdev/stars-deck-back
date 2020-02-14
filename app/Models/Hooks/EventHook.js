"use strict";

const User = use("App/Models/User");

const EventHook = (exports = module.exports = {});

EventHook.setPoints = async eventInstance => {
  const getPoints = type => {
    if (type === "pr") return 3;
    if (type === "dojo") return 3;
    if (type === "presentation") return 2;
    if (type === "participation") return 1;
    return 0;
  };

  eventInstance.points = getPoints(eventInstance.type);
};
