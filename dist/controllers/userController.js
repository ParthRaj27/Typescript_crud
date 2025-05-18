"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const user = await User_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to create user" });
    }
};
exports.createUser = createUser;
const getUsers = async (_req, res) => {
    const users = await User_1.default.find();
    res.json(users);
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const user = await User_1.default.findById(req.params.id);
    if (user)
        res.json(user);
    else
        res.status(404).json({ error: "User not found" });
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user)
        res.json(user);
    else
        res.status(404).json({ error: "User not found" });
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const user = await User_1.default.findByIdAndDelete(req.params.id);
    if (user)
        res.json({ message: "User deleted" });
    else
        res.status(404).json({ error: "User not found" });
};
exports.deleteUser = deleteUser;
