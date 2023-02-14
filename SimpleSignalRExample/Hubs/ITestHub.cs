using System.Threading.Tasks;

namespace SimpleSignalRExample.Hubs
{
    public interface ITestHub { 
        Task SendProgressAsync(int progress);
        Task SendMultiArgumentProgressAsync(string state, int progress);
    }
}