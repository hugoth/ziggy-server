const Pet = require("./model");

async function calculDailyNeed(req, res) {
  const { pet } = req.body;
  try {
    // const name = pet.name;
    const species = pet.species;
    const breedfactor = pet.breedfactor;
    // const breed = pet.breed;
    const age = pet.age;
    const weight = pet.weight;
    const sterilized = pet.sterilized;
    // const purebreed = pet.purebreed;
    // const gender = pet.purebreed;
    const physiology = pet.physiology;
    // const idealweight = pet.idealweight;
    const fitness = pet.fitness;
    // const hungerlevel = pet.hungerlevel;
    // const healthcare = pet.healthcare;
    // const foodsupply = pet.foodsupply;
    // const allergic = pet.allergic;
    // const allergicto = pet.allergicto;
    // const specialdiet = pet.specialdiet;

    let fitnessFactor = 0;
    if (fitness === "Très peu actif(ve), un peu feignant(e) !") {
      fitnessFactor = 0.7;
    } else if (fitness === "Plutôt calme, peu actif(ve)") {
      fitnessFactor = 0.8;
    } else if (fitness === "Normalement actif(ve)") {
      fitnessFactor = 0.9;
    } else if (fitness === "Très actif(ve)") {
      fitnessFactor = 1;
    } else if (fitness === "Une boule d'énergie !") {
      fitnessFactor = 1.1;
    }

    let sterilizedFactor = 0;
    if (sterilized === true) {
      sterilizedFactor = 0.8;
    } else {
      sterilizedFactor = 1;
    }

    let ageFactor = 0;
    if (species === "chien") {
      if (age <= 4) {
        ageFactor = 2;
      } else if (age > 4 && age <= 9) {
        ageFactor = 1.6;
      } else if (age > 9 && age <= 96) {
        ageFactor = 1.25;
      } else if (age < 96) {
        ageFactor = 0.9;
      }
    }

    let physiologyFactor = 0;
    if (physiology === "Mince") {
      physiologyFactor = 1.15;
    } else if (physiology === "Normal") {
      physiologyFactor = 1;
    } else {
      physiologyFactor = 0.85;
    }

    const theoreticalNeed = weight ** 0.75 * 130;
    console.log(theoreticalNeed);
    console.log(fitnessFactor);
    console.log(ageFactor);
    console.log(sterilizedFactor);
    console.log(physiologyFactor);

    const dailyneed =
      theoreticalNeed *
      breedfactor *
      fitnessFactor *
      ageFactor *
      sterilizedFactor *
      physiologyFactor;

    const finalNeed = dailyneed.toFixed(2) + " calories par jour";

    res.json({ "votre chien a besoin de": finalNeed });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
}

module.exports.calculDailyNeed = calculDailyNeed;