using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Codefiction.CodefictionTech.CodefictionApi.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        private static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                   .UseStartup<Startup>()
                   .Build();
    }
}
