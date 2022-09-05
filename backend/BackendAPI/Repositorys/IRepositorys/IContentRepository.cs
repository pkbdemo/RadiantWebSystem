namespace BackendAPI.Repositorys.IRepositorys;

public interface IContentRepository
{
    IList<decimal> QueryAll();
}