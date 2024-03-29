const Pet = require("./model");
const User = require("../users/model");

async function calculDailyNeeds(req, res) {
  const {
    name,
    species,
    breedfactor,
    breed,
    age,
    weight,
    sterilized,
    purebreed,
    gender,
    physiology,
    fitness,
    healthcare,
    foodsupply,
    allergic,
    appetite,
    eatcandies,
    candytype,
    owner,
    userID
  } = req.body.pet;

  try {
    let fitnessFactor = 0;
    let ageFactor = 0;
    let sterilizedFactor = 0;
    let physiologyFactor = 0;

    if (species === "chien") {
      if (age <= 4) {
        ageFactor = 2;
      } else if (age > 4 && age <= 9) {
        ageFactor = 1.6;
      } else if (age > 9 && age <= 96) {
        ageFactor = 1.25;
      } else if (age > 96) {
        ageFactor = 0.9;
      }
      if (fitness == 1) {
        fitnessFactor = 0.7;
      } else if (fitness == 2) {
        fitnessFactor = 0.8;
      } else if (fitness == 3) {
        fitnessFactor = 0.9;
      } else if (fitness == 4) {
        fitnessFactor = 1;
      } else if (fitness == 5) {
        fitnessFactor = 1.1;
      }
      if (sterilized === true) {
        sterilizedFactor = 0.8;
      } else {
        sterilizedFactor = 1;
      }
      if (physiology == 1) {
        physiologyFactor = 1.15;
      } else if (physiology == 2) {
        physiologyFactor = 1;
      } else if (physiology == 3) {
        physiologyFactor = 0.85;
      }
    }

    //
    else if (species === "chat") {
      if (physiology == 1) {
        physiologyFactor = 1.15;
      } else if (physiology == 2) {
        physiologyFactor = 1;
      } else if (physiology == 3) {
        physiologyFactor = 0.85;
      }
      if (sterilized === true) {
        sterilizedFactor = 0.8;
      } else {
        sterilizedFactor = 1;
      }
    }

    const dogTheoreticalNeeds = weight ** 0.75 * 130;
    const catTheoreticalNeeds = weight ** 0.67 * 100;

    const dogDailyNeeds =
      dogTheoreticalNeeds *
      breedfactor *
      fitnessFactor *
      ageFactor *
      sterilizedFactor *
      physiologyFactor;

    const catDailyNeeds =
      catTheoreticalNeeds * sterilizedFactor * physiologyFactor;

    const catFinalNeeds = catDailyNeeds.toFixed(2);
    const dogFinalNeeds = dogDailyNeeds.toFixed(2);

    let dailyNeeds = 0;
    if (species === "chien") {
      dailyNeeds = dogFinalNeeds;
    } else if (species === "chat") {
      dailyNeeds = catFinalNeeds;
    }

    const newPet = new Pet({
      name,
      species,
      breedfactor,
      breed,
      age,
      weight,
      sterilized,
      purebreed,
      gender,
      physiology,
      fitness,
      healthcare,
      foodsupply,
      allergic,
      appetite,
      eatcandies,
      candytype,
      owner,
      dailyNeeds
    });
    await newPet.save();

    if (userID) {
      const searchUser = await User.findById(userID);
      if (searchUser) {
        searchUser.pets.push(newPet._id);
        await searchUser.save();
      }
    }

    if (species === "chien") {
      res.json({ dogFinalNeeds, newPet });
    } else if (species === "chat") {
      res.json({ catFinalNeeds, newPet });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSpecies(req, res) {
  try {
    const pets = await Pet.find({ species: req.params.species });
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getPets(req, res) {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updatePets(req, res) {
  try {
    const searchPet = await Pet.findById(req.body.pet.id);
    if (!searchPet) {
      res.status(403).json("pet don't exist");
    }
    console.log(searchPet);
    const {
      name,
      species,
      breedfactor,
      breed,
      age,
      weight,
      sterilized,
      gender,
      physiology,
      fitness,
      healthcare,
      foodsupply,
      allergic,
      appetite,
      eatcandies,
      candytype
    } = req.body.pet;

    let fitnessFactor = 0;
    let ageFactor = 0;
    let sterilizedFactor = 0;
    let physiologyFactor = 0;

    if (species === "chien") {
      if (age <= 4) {
        ageFactor = 2;
      } else if (age > 4 && age <= 9) {
        ageFactor = 1.6;
      } else if (age > 9 && age <= 96) {
        ageFactor = 1.25;
      } else if (age > 96) {
        ageFactor = 0.9;
      }
      if (fitness == 1) {
        fitnessFactor = 0.7;
      } else if (fitness == 2) {
        fitnessFactor = 0.8;
      } else if (fitness == 3) {
        fitnessFactor = 0.9;
      } else if (fitness == 4) {
        fitnessFactor = 1;
      } else if (fitness == 5) {
        fitnessFactor = 1.1;
      }
      if (sterilized === true) {
        sterilizedFactor = 0.8;
      } else {
        sterilizedFactor = 1;
      }
      if (physiology == 1) {
        physiologyFactor = 1.15;
      } else if (physiology == 2) {
        physiologyFactor = 1;
      } else if (physiology == 3) {
        physiologyFactor = 0.85;
      }
    }

    //
    else if (species === "chat") {
      if (physiology == 1) {
        physiologyFactor = 1.15;
      } else if (physiology == 2) {
        physiologyFactor = 1;
      } else if (physiology == 3) {
        physiologyFactor = 0.85;
      }
      if (sterilized === true) {
        sterilizedFactor = 0.8;
      } else {
        sterilizedFactor = 1;
      }
    }

    const dogTheoreticalNeeds = weight ** 0.75 * 130;
    const catTheoreticalNeeds = weight ** 0.67 * 100;

    const dogDailyNeeds =
      dogTheoreticalNeeds *
      breedfactor *
      fitnessFactor *
      ageFactor *
      sterilizedFactor *
      physiologyFactor;

    const catDailyNeeds =
      catTheoreticalNeeds * sterilizedFactor * physiologyFactor;

    const catFinalNeeds = catDailyNeeds.toFixed(2);
    const dogFinalNeeds = dogDailyNeeds.toFixed(2);

    if (species === "chien") {
      dailyNeeds = dogFinalNeeds;
    } else if (species === "chat") {
      dailyNeeds = catFinalNeeds;
    }

    searchPet.name = name;
    searchPet.species = species;
    searchPet.breedfactor = breedfactor;
    searchPet.breed = breed;
    searchPet.gender = gender;
    searchPet.age = age;
    searchPet.weight = weight;
    searchPet.sterilized = sterilized;
    searchPet.fitness = fitness;
    searchPet.physiology = physiology;
    searchPet.healthcare = healthcare;
    searchPet.allergic = allergic;
    searchPet.appetite = appetite;
    searchPet.candytype = candytype;
    searchPet.dailyNeeds = dailyNeeds;
    searchPet.eatcandies = eatcandies;
    searchPet.foodsupply = foodsupply;

    await searchPet.save();

    if (species === "chien") {
      res.json({ dogFinalNeeds, searchPet });
    } else if (species === "chat") {
      res.json({ catFinalNeeds, searchPet });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.calculDailyNeeds = calculDailyNeeds;
module.exports.getSpecies = getSpecies;
module.exports.getPets = getPets;
module.exports.updatePets = updatePets;
