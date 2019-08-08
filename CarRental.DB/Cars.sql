CREATE TABLE [dbo].[Cars]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[RentCompanyId] INT NULL, 
    [CarMarkId] INT NOT NULL, 
    [Price] MONEY NULL, 
    CONSTRAINT [FK_Cars_RentCompanies] FOREIGN KEY ([RentCompanyId]) REFERENCES [RentCompanies]([Id]), 
    CONSTRAINT [FK_Cars_CarMarks] FOREIGN KEY ([CarMarkId]) REFERENCES [CarMarks]([Id])
)
