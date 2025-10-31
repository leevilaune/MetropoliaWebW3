import {addCat, findCatById, listAllCats, updateCat, removeCat} from "../models/cat-model.js";

const getCats = (req, res) => {
    res.json(listAllCats());
};

const getCatById = (req, res) => {
    const cat = findCatById(req.params.id);
    if(cat){
        res.json(cat);
    }else{
        res.sendStatus(404);
    }
};

const postCat = (req, res) => {
    const result = addCat(req.body);
    if(result.cat_id){
        res.status(201);
        res.json({message: "New cat added: ", result});
    }else {
        res.sendStatus(400);
    }
};

const putCat = (req, res) => {
    const updated = updateCat(req.body);
    if (updated) {
        res.json({message: 'Cat item updated.'});
    } else {
        res.sendStatus(404);
    }
};

const deleteCat = (req, res) => {
    const delSatus = removeCat(req.body);
    if(delSatus){
        res.json({message: 'Cat item deleted.'});
    }else{
        res.sendStatus(401);
    }
};

export {getCats, getCatById, postCat, putCat, deleteCat};