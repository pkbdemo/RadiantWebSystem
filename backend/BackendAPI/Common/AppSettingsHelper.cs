namespace BackendAPI.Common;

public class AppSettingsHelper
{
    public string GetAppSettings(string arg)
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
        IConfiguration Configuration = builder.Build();
        string result = Configuration[arg];
        return result;
    }
}
