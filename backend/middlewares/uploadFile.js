import multer from "multer";
import path from "path";
import fs from "fs";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "uploads";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() + "_" + file.fieldname + path.extname(file.originalname)
//     );
//   },
// });

const storage = multer.memoryStorage()
export const upload = multer({ storage });
