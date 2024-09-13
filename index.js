const express = require("express");
const { Animal } = require("./db");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ mssg: "Welcome to Zoo" });
});




// get method to retrive details of all the animals
app.get("/animals", async (req, res) => {
  try {
    const animals = await Animal.find({});
    res.status(200).json({ animals }); //
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve animals" });
  }
});




// post method to add animal in the database
// sample Input Body
// {
//     "name":"Cat"
// }
app.post("/addanimal", async (req, res) => {
  try {
    const name = req.body.name;

    //to validate input
    if (!name) {
      return res.status(400).json({ error: "Animal name is required" });
    }

    // creating instance of animal and saving to DB
    const newAnimal = new Animal({ Name: name });
    await newAnimal.save();

    res
      .status(201)
      .json({ message: "Animal added successfully", animal: newAnimal });
  } catch (error) {
    // This handles error
    console.log(error);
    res.status(500).json({ error: "Failed to add animal" });
  }
});




// update method that uodates the database by taking its id
// sample Input Body
// {
//     "name":"Cat"
// }
// provide the id in the params
app.put("/updateanimal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: "New animal name is required" });
    }

    // Update the animal in the database
    const updatedAnimal = await Animal.findByIdAndUpdate(
      id,
      { Name: name },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res
      .status(200)
      .json({ message: "Animal updated successfully", animal: updatedAnimal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update animal" });
  }
});




// delete method to remove the animal from DB
// sample Input Body
// {
//     "name":"Cat"
// }
// provide the id in the params
app.delete("/deleteanimal/:id", async (req, res) => {
  try {
    //getting the id
    const { id } = req.params;

    const deletedAnimal = await Animal.findByIdAndDelete(id);

    if (!deletedAnimal) {
      // if anmal not found
      return res.status(404).json({ error: "Animal not found" });
    }

    res
      .status(200)
      .json({ message: "Animal deleted successfully", animal: deletedAnimal });
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(500).json({ error: "Failed to delete animal" });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
