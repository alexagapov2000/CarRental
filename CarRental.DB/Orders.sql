CREATE TABLE [dbo].[Orders]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [BookedFrom] DATE NOT NULL, 
    [BookedTo] DATE NOT NULL, 
    [PersonId] INT NOT NULL, 
    [CarId] INT NOT NULL, 
    CONSTRAINT [FK_Orders_Persons] FOREIGN KEY ([PersonId]) REFERENCES [Persons]([Id]), 
    CONSTRAINT [FK_Orders_Cars] FOREIGN KEY ([CarId]) REFERENCES [Cars]([Id])
)
