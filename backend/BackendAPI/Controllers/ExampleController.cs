namespace BackendAPI.Controllers;

[Route(IMSConstants.ControllerRoute)]
[Produces(IMSConstants.ControllerProducesContentType)]
public class ExampleController : ControllerBase
{
    private readonly IExampleService _exampleService;
    private readonly ILogger<ExampleController> _logger;

    public ExampleController(IExampleService exampleService, ILogger<ExampleController> logger)
    {
        this._exampleService = exampleService;
        this._logger = logger;
    }

    [HttpGet]
    [Route("{userId}")]
    public ActionResult<ExampleEntity> QueryExampleById(int userId)
    {
        var result = _exampleService.QueryById(userId);
        return Ok(result);
    }

    [HttpPost]
    public ActionResult AddExample(string name, int age)
    {
        string? loginUserID = User.Identity?.Name?.ToUpper();

        ExampleEntity exampleEntity = new ExampleEntity();
        exampleEntity.Name = name;
        exampleEntity.Age = age;
        exampleEntity.Createby = loginUserID;
        _exampleService.AddExample(exampleEntity);

        return Ok();
    }

    [HttpPut]
    public ActionResult UpdateExample(int userID, string name, int age)
    {
        string? loginUserID = User.Identity?.Name?.ToUpper();

        ExampleEntity exampleEntity = new ExampleEntity();
        exampleEntity.User_ID = userID;
        exampleEntity.Name = name;
        exampleEntity.Age = age;
        exampleEntity.Modifyby = loginUserID;
        _exampleService.UpdateExample(exampleEntity);

        return Ok();
    }

    [HttpDelete]
    public ActionResult DeleteExample(int userId)
    {
        _exampleService.DeleteExample(userId);
        return Ok();
    }

    [HttpPost]
    public ActionResult<IList<decimal>> QueryAll()
    {
        var result = _exampleService.QueryAll();
        return Ok(result);
    }

    [HttpPost]
    public ActionResult<PageModel<ExampleEntity>> GetPageList(
        string? name,
        int? age,
        string? sortProperty,
        IMSConstants.SortDirection? sortDirection,
        int page = 1,
        int pageSize = IMSConstants.DefaultPageSize)
    {
        var result = _exampleService.GetPageList(sortProperty, sortDirection, page, pageSize, name, age);
        return Ok(result);
    }

    /// <summary>
    /// This is a logging example.
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public ActionResult LoggingTest()
    {
        _logger.LogInformation("This is an info log.");
        _logger.LogInformation("This is an info log and have some placeholders. {0} + {1} = {2} ", 5, 6, 11);
        _logger.LogWarning("This is a warning log.");
        _logger.LogError("This is an error log.");

        return Ok();
    }
}