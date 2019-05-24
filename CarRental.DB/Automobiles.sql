CREATE TABLE [dbo].[Automobiles]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NCHAR(10) NOT NULL, 
    [FuelConsumption] INT NOT NULL, 
    [GearboxId] INT NOT NULL, 
    [ManufacturerId] INT NOT NULL
)
