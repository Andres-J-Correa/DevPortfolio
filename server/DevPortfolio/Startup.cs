using Microsoft.EntityFrameworkCore;
using DevPortfolio.Data;
using DevPortfolio.Config;
using DevPortfolio.Enums;
using DevPortfolio.Models;
using DevPortfolio.Services;
using DevPortfolio.Interfaces;

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

            services.AddMemoryCache();
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // Add logging
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddConsole();
                loggingBuilder.AddDebug();
            });

            // Register ReplicateService
            services.AddHttpClient<InterviewGradingService>();

            // Add configuration
            services.Configure<ReplicateSettings>(Configuration.GetSection("Replicate"));

            //Add Services
            services.AddSingleton<IInterviewGradingService, InterviewGradingService>();
            services.AddScoped<IInterviewQuestionsService, InterviewQuestionsService>();

            // Add CORS policy
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    builder =>
                    {
                        builder.WithOrigins("https://andres-j-correa.github.io")
                               .AllowAnyHeader()
                               .AllowAnyMethod()
                               .AllowCredentials();
                    });

                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
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
                app.UseCors("AllowAllOrigins");
            }
            else
            {
                app.UseHsts();
                app.UseCors("AllowSpecificOrigins");
            }

            using (var scope = app.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<ApiContext>();
                SeedData(context);
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseMiddleware<RateLimitingMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void SeedData(ApiContext context)
        {
            if (!context.InterviewQuestions.Any())
            {
                context.InterviewQuestions.AddRange(
                    // React Questions
                    new InterviewQuestion { Question = "What is React?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What are the features of React?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "In calling setState, when would you pick one method of calling this function over the other?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "Is setState a synchronous or async call?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What are the different ways that you can call setState?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "List some of the major advantages of React.", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What are the limitations of React?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What is JSX?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What is the virtual DOM? Explain how it works within ReactJS.", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "Why can’t browsers read JSX?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "How different is React’s ES6 syntax when compared to ES5?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "Differentiate between Real DOM and Virtual DOM. Real DOM vs Virtual DOM", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What do you understand from “In React, everything is a component.”", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "Explain the purpose of render() in React.", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "How can you embed two or more components into one?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What is Props?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What is a state in React and how is it used?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "How can you update the state of a component?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "What is arrow function in React? How is it used?", Topic = InterviewTopic.React },
                    new InterviewQuestion { Question = "Differentiate between stateful and stateless components. Stateful vs Stateless Components React", Topic = InterviewTopic.React },

                    // .Net Questions
                    new InterviewQuestion { Question = "What is Model Binding (ASP.Net) and why is it important?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What are the fundamentals that a developer should consider when working to wire up model binding correctly?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What are the differences between an API Controller and a “regular/view” Controller in .Net?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "When creating a new controller, what class do you inherit from?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "Write out the C# function that accepts two numbers - adds these numbers - returns the result of the addition:", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "Describe the main differences or considerations between the JS and C#.", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What is the generic name of the library used in .Net that is used to communicate with Databases?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What are the .Net objects and classes used to communicate and execute commands at the database?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What do you use to debug C#?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What is a Null Reference Exception?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What is an MVC View?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What is a Model?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What are C# extension methods?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What are Interfaces?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What is an abstract class and is this different than an interface?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "Can you create an instance of an abstract class?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What are the principles of object-oriented programming?", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "Write out an example class diagram (a diagram showing how several classes are related) for the objects described description.", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "What are Generics in .Net", Topic = InterviewTopic.DotNet },
                    new InterviewQuestion { Question = "Why are Generics so important?", Topic = InterviewTopic.DotNet },

                    // SQL Questions
                    new InterviewQuestion { Question = "What is a Database?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is a relational Database?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is a database “Table”?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is a Primary Key and how many can one table have?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is a Foreign Key and how many can one table have?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is a SQL Injection Attack and how do you protect yourself against these?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is a Sql Server stored procedure?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What language is used to write Stored procedures?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What language do you use to communicate with the database?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What are the different types of statements available to you in TSQL?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What are indexes?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "If you wanted to delete information from a table what statement would you use?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is the truncate statement used for? What is the key difference between this and your other options to remove data?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What are the basic parts of a simple TSQL Query", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "When are “Joins” used?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What are the different types of Joins? (Write examples of each)", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "What is data normalization?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "Why would we go through the process of normalizing our data?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "How many normal forms are there?", Topic = InterviewTopic.Sql },
                    new InterviewQuestion { Question = "How do you declare a variable in TSQL?", Topic = InterviewTopic.Sql }
                );
                context.SaveChanges();
            }
        }

    }
}