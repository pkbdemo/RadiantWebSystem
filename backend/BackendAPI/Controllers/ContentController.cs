namespace BackendAPI.Controllers;

[Route(IMSConstants.ControllerRoute)]
[Produces(IMSConstants.ControllerProducesContentType)]
public class ContentController : ControllerBase
{
    private readonly IContentService _contentService;
    private readonly ILogger<ContentController> _logger;

    public ContentController(IContentService contentService, ILogger<ContentController> logger)
    {
        this._contentService = contentService;
        this._logger = logger;
    }

    [HttpPost]
    public ActionResult<IList<decimal>> QueryAll()
    {
        var result = _contentService.QueryAll();
        return Ok(result);
    }

}