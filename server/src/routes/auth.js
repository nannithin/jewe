
router.get("/me", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});
