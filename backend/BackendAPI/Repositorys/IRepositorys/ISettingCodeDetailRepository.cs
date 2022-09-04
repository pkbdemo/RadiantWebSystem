namespace BackendAPI.Repositorys.IRepositorys;

using BackendAPI.Entitys.Enum;

public interface ISettingCodeDetailRepository
{
    IList<SettingCodeDetailEntity> Search(ReqSettingCodeDetail req);
}
