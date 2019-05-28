CREATE TABLE [dbo].[RentCompanyServices]
(
	[RentCompanyId] INT NOT NULL , 
    [ServiceId] INT NOT NULL, 
    PRIMARY KEY ([ServiceId], [RentCompanyId]), 
    CONSTRAINT [FK_RentCompanyServices_Services] FOREIGN KEY ([ServiceId]) REFERENCES [Services]([Id]), 
    CONSTRAINT [FK_RentCompanyServices_RentCompanies] FOREIGN KEY ([RentCompanyId]) REFERENCES [RentCompanies]([Id])
)
