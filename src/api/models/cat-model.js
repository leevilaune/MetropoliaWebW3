const catItems = [
  {
    cat_id: 1,
    name: "Garfield",
    birthdate: "2015-04-20",
    weight: 27,
    owner: "Jon Arbuckle",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png",
  },
  {
    cat_id: 2,
    name: "Fat Cat",
    birthdate: "1920-06-09",
    weight: 150,
    owner: "US Govt",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/The_Subsidised_Mineowner.jpg"
  },
];

const listAllCats = ()=> {
    return catItems;
};

const findCatById = (id) => {
    return catItems.find(item => item.cat_id==Number(id));
};

const addCat = (cat) => {
    const {name, weight,birthdate,owner,image} = cat;
    const newId = catItems[catItems.length-1].cat_id+1;
    catItems.push({cat_id: newId, name,weight,birthdate,owner,image});
    return {cat_id: newId};
};

const removeCat = (id) => {
    try{
        catItems.splice(catItems.findIndex(item => item.cat_id==Number(id)));
        return {success: true, id: id};
    }catch{
        return {success: false};
    }
}

const updateCat = (catData) => {
    console.log(catData);
    const cat = catItems.find(item => item.cat_id === Number(catData.cat_id));

    if (!cat) {
        return { error: 'Cat not found' };
    }else if(cat.cat_id === undefined){
        return { error: 'cat_id required'};

    }

    if (catData.name !== undefined) cat.name = catData.name;
    if (catData.weight !== undefined) cat.weight = catData.weight;
    if (catData.birthdate !== undefined) cat.birthdate = catData.birthdate;
    if (catData.owner !== undefined) cat.owner = catData.owner;
    if (catData.image !== undefined) cat.image = catData.image;

    return {cat}
}

export {listAllCats, findCatById, addCat, removeCat, updateCat};