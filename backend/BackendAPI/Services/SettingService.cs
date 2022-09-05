namespace BackendAPI.Services;

public class SettingService : ISettingService
{
    private readonly ISettingRepository _settingRepository;

    public SettingService(ISettingRepository settingRepository)
    {
        this._settingRepository = settingRepository;
    }

    public BasicSettingEntity QueryAll()
    {
        return _settingRepository.QueryAll();
    }
}