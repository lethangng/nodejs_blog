class NewController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    // :slug : là một biến động, nhận nhiều cái giá trị ngẫu nhiên bên trên URL
    show(req, res) {
        res.send('New detail!!!');
    }
}

module.exports = new NewController();
