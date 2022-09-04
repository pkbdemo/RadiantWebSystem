namespace BackendAPI.Repositorys.IRepositorys;

using BackendAPI.Entitys.Enum;

public interface ISettingCodeMasterRepository
{
    SettingCodeMasterEntity Find(string kind_Id);
}
