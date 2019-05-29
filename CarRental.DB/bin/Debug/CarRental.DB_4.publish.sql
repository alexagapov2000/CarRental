/*
Скрипт развертывания для CarRental

Этот код был создан программным средством.
Изменения, внесенные в этот файл, могут привести к неверному выполнению кода и будут потеряны
в случае его повторного формирования.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "CarRental"
:setvar DefaultFilePrefix "CarRental"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\"

GO
:on error exit
GO
/*
Проверьте режим SQLCMD и отключите выполнение скрипта, если режим SQLCMD не поддерживается.
Чтобы повторно включить скрипт после включения режима SQLCMD выполните следующую инструкцию:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'Для успешного выполнения этого скрипта должен быть включен режим SQLCMD.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'Операция рефакторинга Rename с помощью ключа d46141de-dd84-4079-901e-6a6e41120a0f пропущена, элемент [dbo].[FK_RentCompanyServices_ToTable] (SqlForeignKeyConstraint) не будет переименован в [FK_RentCompanyServices_RentCompanies]';


GO
PRINT N'Выполняется удаление [dbo].[FK_CityStreets_Cities]...';


GO
ALTER TABLE [dbo].[CityStreets] DROP CONSTRAINT [FK_CityStreets_Cities];


GO
PRINT N'Выполняется удаление [dbo].[FK_Cities_Countries]...';


GO
ALTER TABLE [dbo].[Cities] DROP CONSTRAINT [FK_Cities_Countries];


GO
PRINT N'Выполняется запуск перестройки таблицы [dbo].[RentCompanyServices]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_RentCompanyServices] (
    [RentCompanyId] INT NOT NULL,
    [ServiceId]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ServiceId] ASC, [RentCompanyId] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[RentCompanyServices])
    BEGIN
        INSERT INTO [dbo].[tmp_ms_xx_RentCompanyServices] ([ServiceId], [RentCompanyId])
        SELECT   [ServiceId],
                 [RentCompanyId]
        FROM     [dbo].[RentCompanyServices]
        ORDER BY [ServiceId] ASC, [RentCompanyId] ASC;
    END

DROP TABLE [dbo].[RentCompanyServices];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_RentCompanyServices]', N'RentCompanyServices';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Выполняется запуск перестройки таблицы [dbo].[Cities]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_Cities] (
    [Id]        INT        IDENTITY (1, 1) NOT NULL,
    [Name]      NCHAR (10) NOT NULL,
    [CountryId] INT        NOT NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_Cities1] PRIMARY KEY CLUSTERED ([Id] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[Cities])
    BEGIN
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Cities] ON;
        INSERT INTO [dbo].[tmp_ms_xx_Cities] ([Id], [Name], [CountryId])
        SELECT   [Id],
                 [Name],
                 [CountryId]
        FROM     [dbo].[Cities]
        ORDER BY [Id] ASC;
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Cities] OFF;
    END

DROP TABLE [dbo].[Cities];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_Cities]', N'Cities';

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_constraint_PK_Cities1]', N'PK_Cities', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Выполняется создание [dbo].[PK_CityStreets]...';


GO
ALTER TABLE [dbo].[CityStreets]
    ADD CONSTRAINT [PK_CityStreets] PRIMARY KEY CLUSTERED ([StreetId] ASC, [CityId] ASC);


GO
PRINT N'Выполняется создание [dbo].[FK_RentCompanyServices_Services]...';


GO
ALTER TABLE [dbo].[RentCompanyServices] WITH NOCHECK
    ADD CONSTRAINT [FK_RentCompanyServices_Services] FOREIGN KEY ([ServiceId]) REFERENCES [dbo].[Services] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_RentCompanyServices_RentCompanies]...';


GO
ALTER TABLE [dbo].[RentCompanyServices] WITH NOCHECK
    ADD CONSTRAINT [FK_RentCompanyServices_RentCompanies] FOREIGN KEY ([RentCompanyId]) REFERENCES [dbo].[RentCompanies] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_CityStreets_Cities]...';


GO
ALTER TABLE [dbo].[CityStreets] WITH NOCHECK
    ADD CONSTRAINT [FK_CityStreets_Cities] FOREIGN KEY ([CityId]) REFERENCES [dbo].[Cities] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_Cities_Countries]...';


GO
ALTER TABLE [dbo].[Cities] WITH NOCHECK
    ADD CONSTRAINT [FK_Cities_Countries] FOREIGN KEY ([CountryId]) REFERENCES [dbo].[Countries] ([Id]);


GO
-- Выполняется этап рефакторинга для обновления развернутых журналов транзакций на целевом сервере

IF OBJECT_ID(N'dbo.__RefactorLog') IS NULL
BEGIN
    CREATE TABLE [dbo].[__RefactorLog] (OperationKey UNIQUEIDENTIFIER NOT NULL PRIMARY KEY)
    EXEC sp_addextendedproperty N'microsoft_database_tools_support', N'refactoring log', N'schema', N'dbo', N'table', N'__RefactorLog'
END
GO
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'd46141de-dd84-4079-901e-6a6e41120a0f')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('d46141de-dd84-4079-901e-6a6e41120a0f')

GO

GO
PRINT N'Существующие данные проверяются относительно вновь созданных ограничений';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[RentCompanyServices] WITH CHECK CHECK CONSTRAINT [FK_RentCompanyServices_Services];

ALTER TABLE [dbo].[RentCompanyServices] WITH CHECK CHECK CONSTRAINT [FK_RentCompanyServices_RentCompanies];

ALTER TABLE [dbo].[CityStreets] WITH CHECK CHECK CONSTRAINT [FK_CityStreets_Cities];

ALTER TABLE [dbo].[Cities] WITH CHECK CHECK CONSTRAINT [FK_Cities_Countries];


GO
PRINT N'Обновление завершено.';


GO
