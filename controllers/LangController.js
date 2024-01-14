class LangController {
  setLang(req, res, next) {
    const locale = req.params.locale;
    console.log(locale);
    res.cookie('locale-lang', locale, {
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });

    res.redirect(req.get('referer'));
  }
}

module.exports = LangController;
