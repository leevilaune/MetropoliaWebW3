import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  findCatsByOwner,
} from "../models/cat-model.js";

const getCats = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error("Error getting cats:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

const getCatsByOwner = async (req, res) => {
  try {
    const cats = await findCatsByOwner(req.params.id);
    if (!cats) {
      res.json({ message: `No cats for owner ${req.params.id}` });
    }
    res.json(cats);
  } catch (error) {
    console.error("Error getting cats:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) {
      console.log(cat);
      res.json(cat);
    } else {
      res.status(404).json({ message: "Cat not found" });
    }
  } catch (error) {
    console.error("Error getting cat:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

const postCat = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    console.log(res.locals);

    if (!req.body.owner) {
      req.body.owner = res.locals.user.user_id;
    }

    const catData = {
      ...req.body,
      image: req.file ? req.file.filename : null,
    };

    const result = await addCat(catData);

    if (result.cat_id) {
      res.status(201).json({
        message: "New cat added",
        result,
      });
    } else {
      res.status(400).json({ error: "Failed to add cat" });
    }
  } catch (error) {
    console.error("Error adding cat:", error);
    res.status(500).json({ error: "Database insert failed" });
  }
};

const putCat = async (req, res) => {
  try {
    const resUserId = res.locals.user.user_id;
    console.log(req.params.id);
    let cat = await findCatById(req.params.id);
    const ownerId = cat.owner;
    console.log(ownerId);
    if (!(resUserId == ownerId) && !(res.locals.user.role == "admin")) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    const updated = await modifyCat({ cat_id: req.params.id, ...req.body });
    if (updated) {
      res.json({ message: "Cat item updated." });
    } else {
      res.status(404).json({ message: "Cat not found" });
    }
  } catch (error) {
    console.error("Error updating cat:", error);
    res.status(500).json({ error: "Database update failed" });
  }
};

const deleteCat = async (req, res) => {
  try {
    console.log(req.body);
    const resUserId = res.locals.user.user_id;
    console.log(req.params.id);
    let cat = await findCatById(req.params.id);
    const ownerId = cat.owner;
    if (!(resUserId == ownerId) && !(res.locals.user.role == "admin")) {
      res.sendStatus(403);
      return;
    }
    const delStatus = await removeCat(req.params.id);
    if (delStatus) {
      res.json({ message: "Cat item deleted." });
    } else {
      res.status(404).json({ message: "Cat not found" });
    }
  } catch (error) {
    console.error("Error deleting cat:", error);
    res.status(500).json({ error: "Database delete failed" });
  }
};

export { getCats, getCatById, postCat, putCat, deleteCat, getCatsByOwner };
