namespace BackendAPI.Common;

using System.Security.Cryptography;

public class EncryptionHelper
{
    public const string KEY = "45BLO2yoJkvBwz99kBEMlNkxvL40vUSGaqr/WBu3+Vg=";
    public const string IV = "Ou3fn+I9SVicGWMLkFEgZQ==";

    public static string AESEncrypt(string input)
    {
        byte[] keyArray = Convert.FromBase64String(KEY);
        byte[] ivArray = Convert.FromBase64String(IV);
        byte[] inputArray = Encoding.UTF8.GetBytes(input);

        Aes aes = Aes.Create();
        aes.Key = keyArray;

        byte[] resultArray = aes.EncryptCbc(inputArray, ivArray);
        return Convert.ToBase64String(resultArray);
    }

    public static string AESDecrypt(string cipherText)
    {
        byte[] keyArray = Convert.FromBase64String(KEY);
        byte[] ivArray = Convert.FromBase64String(IV);
        byte[] cipherTextArray = Convert.FromBase64String(cipherText);

        Aes aes = Aes.Create();
        aes.Key = keyArray;

        byte[] resultArray = aes.DecryptCbc(cipherTextArray, ivArray);
        return Encoding.UTF8.GetString(resultArray);
    }
}
