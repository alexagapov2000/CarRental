CREATE TABLE [dbo].[RentCompanies]
(
	[Name] NCHAR(500) NOT NULL, 
    [CityId] INT NOT NULL, 
    [Id] INT NOT NULL IDENTITY, 
    [Adress] NCHAR(500) NOT NULL, 
    CONSTRAINT [PK_RentCompanies] PRIMARY KEY ([Id]) 
)
