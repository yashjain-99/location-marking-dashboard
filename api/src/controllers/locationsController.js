import prisma from "../../prisma/client.js";

export const getLocations = async (req, res) => {
  try {
    const userId = req.userId;
    const locations = await prisma.locations.findMany({
      where: { userId },
    });
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addLocation = async (req, res) => {
  try {
    const userId = req.userId;
    const { lat, long, description } = req.body;

    if (!lat || !long) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const existingLocation = await prisma.locations.findFirst({
      where: {
        userId,
        lat,
        long,
      },
    });

    if (existingLocation) {
      return res.status(400).json({
        message:
          "A location with the same latitude and longitude already exists for this user.",
      });
    }

    const newLocation = await prisma.locations.create({
      data: {
        userId,
        lat,
        long,
        description,
      },
    });

    const locations = await prisma.locations.findMany({
      where: { userId },
    });

    res.status(201).json(locations);
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
