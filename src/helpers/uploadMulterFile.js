const multer = require("multer");
const path = require("path");

const uploadImage = async (req, res, folderName) => {
  try {
    // Configure Multer with the specified upload directory
    const upload = multer({ dest: `./uploads/${folderName}` });

    // Apply Multer middleware to the file upload route
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Extract file details
      const filePath = req.file.path;
      const fileName = req.file.filename;
      const fileExtension = path.extname(fileName);

      // Generate unique filename (optional)
      const uniqueFileName = `${Date.now()}${fileExtension}`;

      // Move the uploaded file to the specified folder with the unique filename
      await fs.renameSync(
        filePath,
        `./uploads/${folderName}/${uniqueFileName}`
      );

      // Construct the display URL
      const displayURL = `/uploads/${folderName}/${uniqueFileName}`;

      // Return the display URL
      res.json({ message: "File uploaded successfully", url: displayURL });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

module.exports = { uploadImage };
