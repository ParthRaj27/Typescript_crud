"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const Item_1 = __importDefault(require("./models/Item"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
(0, db_1.default)(MONGO_URI);
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    try {
        const items = await Item_1.default.find().lean();
        res.render("index", { items });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
app.post("/api/items", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name)
            return res.status(400).json({ error: "Name is required" });
        const newItem = new Item_1.default({ name });
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
app.put("/api/items/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name)
            return res.status(400).json({ error: "Name is required" });
        const updatedItem = await Item_1.default.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedItem)
            return res.status(404).json({ error: "Item not found" });
        res.json(updatedItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
app.delete("/api/items/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item_1.default.findByIdAndDelete(id);
        if (!deletedItem)
            return res.status(404).json({ error: "Item not found" });
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
