namespace BackendAPI.Services.IServices;

using BackendAPI.Entitys.Enum;

public interface IUtilitiesService
{
    IList<SearchCodeListEntity> SearchCodeList(ReqSettingCodeName req, string loginUserID);
}
