namespace BackendAPI.Controllers;

[Route(IMSConstants.ControllerRoute)]
[Produces(IMSConstants.ControllerProducesContentType)]
public class SettingController : ControllerBase
{
    private readonly ISettingService _settingService;
    private readonly ILogger<SettingController> _logger;

    public SettingController(ISettingService settingService, ILogger<SettingController> logger)
    {
        this._settingService = settingService;
        this._logger = logger;
    }

    [HttpPost]
    public ActionResult<BasicSettingEntity> QueryAll()
    {
        _settingService.QueryAll();
        return Ok();
    }

}