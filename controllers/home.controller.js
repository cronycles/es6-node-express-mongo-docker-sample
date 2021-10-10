export default class HomeController {
    index = (req, res, next) => {
        res.render("index", {title: "home page"});
    }
}