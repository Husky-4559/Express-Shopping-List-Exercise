// routes/items.js
const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");

// GET /items - list all items
router.get("/", (req, res) => {
	res.json(items);
});

// POST /items - add an item
router.post("/", (req, res) => {
	const newItem = req.body;
	items.push(newItem);
	res.status(201).json({ added: newItem });
});

// GET /items/:name - get a single item
router.get("/:name", (req, res) => {
	const item = items.find((i) => i.name === req.params.name);
	if (!item) {
		return res.status(404).json({ error: "Item not found" });
	}
	res.json(item);
});

// PATCH /items/:name - update an item
router.patch("/:name", (req, res) => {
	const item = items.find((i) => i.name === req.params.name);
	if (!item) {
		return res.status(404).json({ error: "Item not found" });
	}
	item.name = req.body.name || item.name;
	item.price = req.body.price || item.price;
	res.json({ updated: item });
});

// DELETE /items/:name - delete an item
router.delete("/:name", (req, res) => {
	const index = items.findIndex((i) => i.name === req.params.name);
	if (index === -1) {
		return res.status(404).json({ error: "Item not found" });
	}
	items.splice(index, 1);
	res.json({ message: "Deleted" });
});

module.exports = router;
