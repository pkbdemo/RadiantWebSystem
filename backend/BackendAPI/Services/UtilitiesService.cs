namespace BackendAPI.Services;

using BackendAPI.Entitys.Enum;

public class UtilitiesService : IUtilitiesService
{
    private readonly ISettingCodeListRepository _settingCodeNameRepository;

    public UtilitiesService(ISettingCodeListRepository settingCodeNameRepository)
    {
        this._settingCodeNameRepository = settingCodeNameRepository;
    }

    public IList<SearchCodeListEntity> SearchCodeList(ReqSettingCodeName req, string loginUserID)
    {
        return _settingCodeNameRepository.Query(req);
    }
}
