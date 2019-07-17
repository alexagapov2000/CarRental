CREATE TABLE [dbo].[Persons]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Username] NCHAR(500) NOT NULL, 
    [Password] NCHAR(500) NOT NULL, 
    [Role] NCHAR(50) NOT NULL
)
