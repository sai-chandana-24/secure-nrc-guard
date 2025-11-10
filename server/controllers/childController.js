import Child from "../models/childModel.js";

// Get all children for the logged-in teacher (default) or referred children for NRC/Admin
export const getChildren = async (req, res) => {
  try {
    // Assuming req.user is set by verifyToken middleware
    const userRole = req.user?.role;
    let filter = {};

    // Logic to differentiate based on role:
    if (userRole === "teacher") {
      filter = { teacherId: req.user.id };
    } else if (['admin', 'district', 'block', 'supervisor', 'nrc'].includes(userRole)) {
      filter = { };
    } else {
      // Default case: no access or minimal access
      return res.status(403).json({ message: "Access forbidden for this role." });
    }

    const children = await Child.find(filter).sort({ createdAt: -1 });
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch children", error: error.message });
  }
};

// Register a new child
export const registerChild = async (req, res) => {
  try {
    const { name, age, weight, height, muac, status, lastEntry, trend, weeklyChange } = req.body;

    const newChild = new Child({
      name,
      age,
      weight,
      height,
      muac,
      status,
      lastEntry,
      trend,
      weeklyChange,
      teacherId: req.user.id // Link to the currently logged-in teacher
    });

    const savedChild = await newChild.save();
    res.status(201).json(savedChild);
  } catch (error) {
    res.status(500).json({ message: "Failed to register child", error: error.message });
  }
};

// Assign doctor when child is referred
export const assignDoctor = async (req, res) => {
  try {
    const { doctorName } = req.body; // doctor info from frontend
    const { id } = req.params; // child ID

    if (!doctorName) {
      return res.status(400).json({ message: "Doctor name is required" });
    }

    const updatedChild = await Child.findByIdAndUpdate(
      id,
      { 
        assignedDoctor: doctorName,
        referred: true,
        referredAt: new Date()
      },
      { new: true }
    );

    if (!updatedChild) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.status(200).json(updatedChild);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign doctor", error: error.message });
  }
};