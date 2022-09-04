// namespace BackendAPI.Common;

// using Microsoft.IdentityModel.Tokens;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Cryptography;

// public interface IKeyCloakUtil
// {
//     string GetLoginUserID();
//     void ValidateTokenAndGetUserIDAsync(string token);
//     TokenValidationParameters GetTokenValidationParametersAsync();
// }

// public class KeyCloakUtil : IKeyCloakUtil
// {
//     private readonly IHttpClientFactory _clientFactory;
//     private readonly IHttpContextAccessor _httpContextAccessor;
//     private const string UserIDClaimType = "preferred_username";
//     private static string? RealmPublicKey = null;

//     public KeyCloakUtil(IHttpClientFactory clientFactory, IHttpContextAccessor httpContextAccessor)
//     {
//         _clientFactory = clientFactory;
//         _httpContextAccessor = httpContextAccessor;
//     }

//     public string GetLoginUserID()
//     {
//         HttpContext? httpContext = _httpContextAccessor.HttpContext;
//         if (httpContext == null)
//         {
//             return string.Empty;
//         }

//         string authString = httpContext.Request.Headers[IMSConstants.Header_Authorization].FirstOrDefault(string.Empty);
//         if (authString == string.Empty)
//         {
//             return string.Empty;
//         }

//         if (!authString.ToLower().StartsWith(JwtBearerDefaults.AuthenticationScheme))
//         {
//             return string.Empty;
//         }

//         string token = authString.Substring(JwtBearerDefaults.AuthenticationScheme.Length + 1);

//         var jwtHandler = new JwtSecurityTokenHandler();
//         JwtSecurityToken jwtToken = jwtHandler.ReadJwtToken(token);
//         return jwtToken.Claims.First(x => x.Type == UserIDClaimType).Value.ToUpper();
//     }

//     public void ValidateTokenAndGetUserIDAsync(string token)
//     {
//         if (token == null)
//         {
//             throw new IMSException("The access token is empty");
//         }

//         try
//         {
//             var jwtHandler = new JwtSecurityTokenHandler();
//             var validationParameters = GetTokenValidationParametersAsync();
//             jwtHandler.ValidateToken(token, validationParameters, out _);
//         }
//         catch (Exception ex) when (ex is ArgumentException || ex is SecurityTokenSignatureKeyNotFoundException)
//         {
//             throw new IMSException("The access token is invalid");
//         }
//         catch (Exception ex) when (ex is SecurityTokenExpiredException)
//         {
//             throw new IMSException("The access token is expired");
//         }
//     }

//     public TokenValidationParameters GetTokenValidationParametersAsync()
//     {
//         if (RealmPublicKey == null)
//         {
//             AppSettingsHelper appSettingsHelper = new AppSettingsHelper();
//             string keycloakDiscoveryUrl = appSettingsHelper.GetAppSettings("KeycloakDiscoveryUrl");

//             var client = _clientFactory.CreateClient();
//             HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, keycloakDiscoveryUrl);
//             var response = client.Send(request);

//             if (response.IsSuccessStatusCode)
//             {
//                 Stream stream = response.Content.ReadAsStream();
//                 StreamReader reader = new StreamReader(stream);
//                 string responseString = reader.ReadToEnd();

//                 byte[] array = Encoding.ASCII.GetBytes(responseString);
//                 MemoryStream ms = new MemoryStream(array);
//                 JsonDocument jsonDoc = JsonDocument.Parse(ms);
//                 RealmPublicKey = jsonDoc.RootElement.GetProperty("public_key").GetString();
//             }
//         }

//         if (RealmPublicKey == null)
//         {
//             throw new IMSException("The RealmPublicKey is empty");
//         }

//         var secretBytes = Convert.FromBase64String(RealmPublicKey);

//         RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
//         rsa.ImportSubjectPublicKeyInfo(secretBytes, out _);

//         var validationParameters = new TokenValidationParameters();
//         validationParameters.IssuerSigningKey = new RsaSecurityKey(rsa);
//         validationParameters.ValidateAudience = false;
//         validationParameters.ValidateIssuer = false;
//         validationParameters.NameClaimType = UserIDClaimType;

//         return validationParameters;
//     }
// }