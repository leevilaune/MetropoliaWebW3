import express from 'express';
import upload from "../middlewares/upload.js";
import createThumbnail from "../middlewares/thumbnail.js";

import{
    getCats,
    getCatById,
    postCat,
    putCat,
    deleteCat,
    getCatsByOwner,
} from "../controllers/cat-controller.js";

const catRouter = express.Router();

catRouter.route("/").get(getCats).post(upload.single("file"), createThumbnail, postCat);;
catRouter.route("/:id").get(getCatById).put(putCat).delete(deleteCat);
catRouter.route("/byowner/:id").get(getCatsByOwner);

export default catRouter;