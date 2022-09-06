namespace BackendAPI.Repositorys.IRepositorys;

public interface ISettingRepository
{
    BasicSettingEntity QueryAll();
    int AddData(WaterTemp temp);
}