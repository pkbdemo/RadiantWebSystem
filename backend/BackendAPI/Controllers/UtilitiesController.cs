namespace BackendAPI.Controllers;
using BackendAPI.Entitys.Enum;
using BackendAPI.Models.Response;

[Route(IMSConstants.ControllerRoute)]
//[Authorize]
[Produces(IMSConstants.ControllerProducesContentType)]
public class UtilitiesController : ControllerBase
{
    private readonly IUtilitiesService _utilitiesService;
    private readonly ILogger<UtilitiesController> _logger;

    public UtilitiesController(IUtilitiesService utilitiesService, ILogger<UtilitiesController> logger)
    {
        this._utilitiesService = utilitiesService;
        this._logger = logger;
    }
    [HttpPost]
    public ActionResult<IList<SearchCodeListEntity>> SearchCodeList(ReqSettingCodeName req)
    {
        string? loginUserID = User.Identity?.Name?.ToUpper();
        var result = _utilitiesService.SearchCodeList(req, loginUserID);
        return Ok(result);
    }
}
