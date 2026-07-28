const router = require('express').Router();
const passport = require('passport');

// Inicia el proceso de autenticación con Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google redirige al usuario aquí después del login
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api-docs',
    session: true
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// Cerrar sesión
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/api-docs');
  });
});

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }

  res.status(200).json({
    message: 'User authenticated',
    user: {
      id: req.user.id,
      displayName: req.user.displayName,
      email: req.user.emails?.[0]?.value
    }
  });
});

module.exports = router;