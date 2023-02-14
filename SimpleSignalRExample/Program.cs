using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using SimpleSignalRExample.Hubs;
using Test;
using VueCliMiddleware;

namespace SimpleSignalRExample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (!CommandLine.Arguments.TryGetOptions(args, true, out string mode, out ushort port, out bool https)) return;

            if (mode == "kill")
            {
                Console.WriteLine($"Killing process serving port {port}...");
                PidUtils.KillPort(port, true, true);
                return;
            }
            var app = CreateHostBuilder(args).Build();

            Task.Factory.StartNew(async () =>
            {
                var progress = 0;
                var hub = (IHubContext<TestHub, ITestHub>)app.Services.GetService(typeof(IHubContext<TestHub, ITestHub>));

                while (true)
                {
                    try {
                    await Task.Delay(100);
                    progress = ++progress % 100;
                    await hub.Clients.All.SendMultiArgumentProgressAsync("loading", progress);
                    await hub.Clients.All.SendProgressAsync(progress);
                    } catch {}
                }
            }, TaskCreationOptions.LongRunning);

            app.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
