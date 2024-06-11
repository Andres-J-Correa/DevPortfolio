using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using DevPortfolio.Data;

namespace DevPortfolio
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApiContext>(
                opt => opt.UseInMemoryDatabase("DevPortfolioDb"));

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // Add logging
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddConsole();
                loggingBuilder.AddDebug();
                // You can add more logging providers here if needed
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                // Use a global exception handler in production
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // Configure global exception handling middleware
            app.Use(async (context, next) =>
            {
                try
                {
                    await next.Invoke();
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An unhandled exception occurred.");

                    // Set the response status code and content
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("An unexpected error occurred. Please try again later.");
                }
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
