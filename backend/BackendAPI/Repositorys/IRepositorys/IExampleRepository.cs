namespace BackendAPI.Repositorys.IRepositorys;

public interface IExampleRepository
{
    ExampleEntity QueryById(int userId);
    int AddExample(ExampleEntity bASExampleEntity);
    int UpdateExample(ExampleEntity bASExampleEntity);
    int DeleteExample(int userId);
    IList<decimal> QueryAll();
    PageModel<ExampleEntity> GetPageList(string? sortProperty, IMSConstants.SortDirection? sortDirection, int page, int pageSize, string? name, int? age);
}