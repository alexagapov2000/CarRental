CREATE TABLE [dbo].[Cars]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NCHAR(500) NOT NULL, 
	[RentCompanyId] INT NULL, 
    [BookedBefore] DATE NULL, 
    [CostPerDay] INT NULL, 
    CONSTRAINT [FK_Cars_RentCompanies] FOREIGN KEY ([RentCompanyId]) REFERENCES [RentCompanies]([Id])
)
