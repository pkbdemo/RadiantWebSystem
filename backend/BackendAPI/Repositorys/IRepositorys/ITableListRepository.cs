namespace BackendAPI.Repositorys.IRepositorys;

using BackendAPI.Entitys.Enum;

public interface ITableListRepository
{
    IList<TableListEntity> QueryAll();
}
