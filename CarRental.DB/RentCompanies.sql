CREATE TABLE [dbo].[RentCompanies]
(
	[Name] NCHAR(10) NOT NULL, 
    [StreetNumber] INT NOT NULL, 
    [CityId] INT NOT NULL, 
    [CountryId] INT NOT NULL, 
    [StreetId] INT NOT NULL, 
    [Id] INT NOT NULL IDENTITY, 
    CONSTRAINT [PK_RentCompanies] PRIMARY KEY ([Id]) 
)
