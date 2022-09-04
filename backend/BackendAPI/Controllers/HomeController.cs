namespace BackendAPI.Controllers;

public class HomeController : Controller
{
    [HttpGet("/")]
    public ActionResult<string> Index()
    {
        return Ok("********** Hi~ guys, the backend is working, I am fine. Thank you! **********");
    }
}
