const Planner = require('../model/planner');

const getPlanner = conditions => Planner.findOne(conditions);

const getPlanners = (conditions = {}) => Planner.find(conditions);

const countPlanner = (conditions = {}) => Planner.count(conditions);

const createPlanner = doc => Planner.create(doc);

const changePlanner = (conditions, doc) => Planner.updateOne(conditions, doc);

const changePlanners = (conditions, doc) => Planner.updateMany(conditions, doc);

const removePlanner = conditions => Planner.remove(conditions);

module.exports = {
    getPlanner,
    getPlanners,
    countPlanner,
    createPlanner,
    changePlanner,
    changePlanners,
    removePlanner,
};
