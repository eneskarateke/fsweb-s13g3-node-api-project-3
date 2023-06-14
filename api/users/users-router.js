// importlarımız

const express = require("express");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

const usersModel = require("./users-model.js");

const postsModel = require("../posts/posts-model.js");

const {
  validateUser,
  validateUserId,
  validatePost,
} = require("../middleware/middleware.js");

router.get("/", async (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN

  try {
    const users = await usersModel.get();
    res.status(201).json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateUserId, async (req, res, next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir

  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateUser, async (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try {
    const user = await usersModel.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  const id = req.params.id;

  try {
    const updatedUser = await usersModel.update(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  const id = req.params.id;

  try {
    await usersModel.remove(id);

    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.

  const id = req.params.id;

  try {
    const userPosts = await usersModel.getUserPosts(id);
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.

    try {
      const post = await postsModel.insert({
        user_id: req.params.id,
        text: req.body.text,
      });
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

// routerı dışa aktarmayı unutmayın

module.exports = router;
