namespace BackendAPI.Repositorys.IRepositorys;

public interface IInvestMainRepository
{
    IList<InvestMainEntity> Query(string userId);

}
