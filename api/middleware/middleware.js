const usersModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  console.log(
    `[${new Date().toISOString()}]  ${req.method} to ${req.originalUrl}
    )}`
  );
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  const id = req.params.id;
  try {
    const user = await usersModel.getById(id);
    if (!user) {
      res.status(404).json({ message: "kullanıcı bulunamadı(not found)" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { name } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "gerekli name alanı eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { text } = req.body;
  try {
    if (!text) {
      res.status(400).json({ message: "gerekli text alanı eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost,
};
