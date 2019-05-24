CREATE TABLE [dbo].[CityStreets]
(
	[CityId] INT NOT NULL PRIMARY KEY, 
    [StreetId] INT NOT NULL, 
    CONSTRAINT [FK_CityStreets_Cities] FOREIGN KEY ([CityId]) REFERENCES [Cities]([Id]), 
    CONSTRAINT [FK_CityStreets_Streets] FOREIGN KEY ([StreetId]) REFERENCES [Streets]([Id])
)
