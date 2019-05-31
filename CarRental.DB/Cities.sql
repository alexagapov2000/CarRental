CREATE TABLE [dbo].[Cities]
(
	[Id] INT NOT NULL  IDENTITY, 
    [Name] NCHAR(500) NOT NULL, 
    [CountryId] INT NOT NULL, 
    CONSTRAINT [FK_Cities_Countries] FOREIGN KEY ([CountryId]) REFERENCES [Countries]([Id]), 
    CONSTRAINT [PK_Cities] PRIMARY KEY ([Id])
)
