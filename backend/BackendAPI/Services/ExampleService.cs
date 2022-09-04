namespace BackendAPI.Services;

public class ExampleService : IExampleService
{
    private readonly IExampleRepository _exampleRepository;

    public ExampleService(IExampleRepository exampleRepository)
    {
        this._exampleRepository = exampleRepository;
    }

    public ExampleEntity QueryById(int userId)
    {
        return _exampleRepository.QueryById(userId);
    }

    public void AddExample(ExampleEntity exampleEntity)
    {
        _exampleRepository.AddExample(exampleEntity);
    }

    public void UpdateExample(ExampleEntity exampleEntity)
    {
        _exampleRepository.UpdateExample(exampleEntity);
    }

    public void DeleteExample(int userId)
    {
        _exampleRepository.DeleteExample(userId);
    }

    public IList<decimal> QueryAll()
    {
        return _exampleRepository.QueryAll();
    }

    public PageModel<ExampleEntity> GetPageList(string? sortProperty, IMSConstants.SortDirection? sortDirection, int page, int pageSize, string? name, int? age)
    {
        return _exampleRepository.GetPageList(sortProperty, sortDirection, page, pageSize, name, age);
    }
}