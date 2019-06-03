CREATE TABLE [dbo].[Cars]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NCHAR(500) NOT NULL, 
    [FuelConsumption] INT NOT NULL, 
    [Gearbox] INT NOT NULL, 
    [CarMarkId] INT NOT NULL
)
