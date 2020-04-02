A webapi built on ASP.Net core and hosted as Azure App Service. 
Also containarized with docker and Kubernetes orchestration 
 
The webapi is used by the h-mobile app posted here https://github.com/raynman1/hmobile. 
The whole application won second place in hackathon 2018 conducted by T-Mobile 2018
#Hacksgiving #tmobile

You can use Visual Studio 2017 /2019 to compile this project.

Swagger implementation is already there. You can navigate using <root url>/swagger. 
You may need to run Install-Package Swashbuckle.AspNetCore.Swagger -Version 4.0.1 from Packager Console.

The database script "hackathon-health-DB-DBScript.sql" can be used to create a SQL database. This can be installed in SQL Azure or SQL Server Standard.
The webapi is recommended to be published to Azure as an App Service

Startup.cs will have a simple implementation of dependency injection, Cors enabling, swagger and DB context.
You will see the usage of the Entity framework and basic Linq query.

Tools and Languages
ASP .NET core 
C#
SQL Azure database
Swagger
Entity Framework
Publish:
Microsoft Azure App Service
Azure Kubernetes Service
