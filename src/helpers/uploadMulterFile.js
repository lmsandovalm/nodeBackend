const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuración de multer con almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.params.folderName; // Se obtiene el nombre de la carpeta de los parámetros de la ruta
    const uploadPath = path.join(__dirname, "../uploads", folderName);

    // Crear la carpeta si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadSigleFile = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error(err);
        return reject({ status: 500, message: "Error uploading file" });
      }

      if (!req.file) {
        return reject({ status: 400, message: "No file uploaded" });
      }

      // Obtener el esquema, host y puerto del servidor
      const protocol = req.protocol;
      const host = req.get("host");

      // Construir la URL de visualización completa
      const displayURL = `${protocol}://${host}/uploads/${req.params.folderName}/${req.file.filename}`;

      // Devolver la URL de visualización
      resolve({
        status: 201,
        message: "File uploaded successfully",
        url: displayURL,
      });
    });
  });
};

module.exports = { uploadSigleFile };
