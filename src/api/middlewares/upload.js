import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const parts = file.originalname.split(".");
    const ext = parts.length > 1 ? "." + parts.pop() : "";
    cb(null, req.body.cat_name.toLowerCase() + ext);
  },
});

const upload = multer({ storage });
export default upload;