namespace BackendAPI.Repositorys.IRepositorys;

using BackendAPI.Entitys.Enum;

public interface ISettingCodeListRepository
{
    IList<SearchCodeListEntity> Query(ReqSettingCodeName req);
}
