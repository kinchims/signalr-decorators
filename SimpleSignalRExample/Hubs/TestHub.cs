
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SimpleSignalRExample.Hubs;

namespace Test
{
    public class TestHub : Hub<ITestHub>
    {
    }
}