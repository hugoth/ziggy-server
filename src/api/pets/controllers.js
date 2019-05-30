const Pet = require("./model");

async function calculDailyNeeds(req, res) {
  const {
    name,
    species,
    breedfactor,
    breed,
    secondbreed,
    age,
    weight,
    sterilized,
    purebreed,
    gender,
    physiology,
    idealweight,
    fitness,
    healthcare,
    foodsupply,
    allergic,
    allergicto,
    specialdiet
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

    const newPet = new Pet({
      name,
      species,
      breedfactor,
      breed,
      age,
      weight,
      sterilized,
      purebreed,
      secondbreed,
      gender,
      physiology,
      idealweight,
      fitness,
      healthcare,
      foodsupply,
      allergic,
      allergicto,
      specialdiet
    });
    // await newPet.save();

    const catFinalNeeds = catDailyNeeds.toFixed(2);
    const dogFinalNeeds = dogDailyNeeds.toFixed(2);

    const { pet } = req.body;
    if (species === "chien") {
      res.json({ dogFinalNeeds, pet });
    } else if (species === "chat") {
      res.json({ catFinalNeeds });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
}

module.exports.calculDailyNeeds = calculDailyNeeds;
