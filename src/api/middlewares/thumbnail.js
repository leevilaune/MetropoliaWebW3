import sharp from "sharp";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);
  const thumbPath = `uploads/${req.body.name.toLowerCase()}_thumb.png`;
  await sharp(req.file.path)
    .resize(160, 160, {
      kernel: sharp.kernel.nearest,
      fit: "contain",
      position: "center",
      background: "white",
    })
    .toFile(thumbPath)
    .then(() => {
        req.body.image = thumbPath;
    });
  next();
};

export default createThumbnail;
