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
/*
Удаляется столбец [dbo].[RentCompanies].[CountryId], возможна потеря данных.

Удаляется столбец [dbo].[RentCompanies].[StreetId], возможна потеря данных.

Удаляется столбец [dbo].[RentCompanies].[StreetNumber], возможна потеря данных.

Необходимо добавить столбец [dbo].[RentCompanies].[Adress] таблицы [dbo].[RentCompanies], но он не содержит значения по умолчанию и не допускает значения NULL. Если таблица содержит данные, скрипт ALTER окажется неработоспособным. Чтобы избежать возникновения этой проблемы, необходимо выполнить одно из следующих действий: добавить в столбец значение по умолчанию, пометить его как допускающий значения NULL или разрешить формирование интеллектуальных умолчаний в параметрах развертывания.
*/

IF EXISTS (select top 1 1 from [dbo].[RentCompanies])
    RAISERROR (N'Обнаружены строки. Обновление схемы завершено из-за возможной потери данных.', 16, 127) WITH NOWAIT

GO
PRINT N'Указанная ниже операция создана из файла журнала рефакторинга b84b3f14-8b80-414e-b85f-05374ac4de42';

PRINT N'Переименование [dbo].[Automobiles].[GearboxId] в Gearbox';


GO
EXECUTE sp_rename @objname = N'[dbo].[Automobiles].[GearboxId]', @newname = N'Gearbox', @objtype = N'COLUMN';


GO
PRINT N'Указанная ниже операция создана из файла журнала рефакторинга 948a8b4c-cbe2-4ccc-94bc-3c01ca4d4446';

PRINT N'Переименование [dbo].[Automobiles].[ManufacturerId] в CarMarkId';


GO
EXECUTE sp_rename @objname = N'[dbo].[Automobiles].[ManufacturerId]', @newname = N'CarMarkId', @objtype = N'COLUMN';


GO
PRINT N'Выполняется изменение [dbo].[Cities]...';


GO
ALTER TABLE [dbo].[Cities] ALTER COLUMN [Name] NCHAR (500) NOT NULL;


GO
PRINT N'Выполняется изменение [dbo].[Countries]...';


GO
ALTER TABLE [dbo].[Countries] ALTER COLUMN [Name] NCHAR (500) NOT NULL;


GO
PRINT N'Выполняется изменение [dbo].[RentCompanies]...';


GO
ALTER TABLE [dbo].[RentCompanies] DROP COLUMN [CountryId], COLUMN [StreetId], COLUMN [StreetNumber];


GO
ALTER TABLE [dbo].[RentCompanies] ALTER COLUMN [Name] NCHAR (500) NOT NULL;


GO
ALTER TABLE [dbo].[RentCompanies]
    ADD [Adress] NCHAR (500) NOT NULL;


GO
PRINT N'Выполняется изменение [dbo].[Services]...';


GO
ALTER TABLE [dbo].[Services] ALTER COLUMN [Name] NCHAR (500) NOT NULL;


GO
PRINT N'Выполняется создание [dbo].[CarMarks]...';


GO
CREATE TABLE [dbo].[CarMarks] (
    [Id]   INT         IDENTITY (1, 1) NOT NULL,
    [Name] NCHAR (500) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Cars]...';


GO
CREATE TABLE [dbo].[Cars] (
    [Id]              INT         IDENTITY (1, 1) NOT NULL,
    [Name]            NCHAR (500) NOT NULL,
    [FuelConsumption] INT         NOT NULL,
    [Gearbox]         INT         NOT NULL,
    [CarMarkId]       INT         NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
-- Выполняется этап рефакторинга для обновления развернутых журналов транзакций на целевом сервере
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'b84b3f14-8b80-414e-b85f-05374ac4de42')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('b84b3f14-8b80-414e-b85f-05374ac4de42')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '948a8b4c-cbe2-4ccc-94bc-3c01ca4d4446')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('948a8b4c-cbe2-4ccc-94bc-3c01ca4d4446')

GO

GO
PRINT N'Обновление завершено.';


GO
