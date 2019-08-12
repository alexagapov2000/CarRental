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
USE [master];


GO

IF (DB_ID(N'$(DatabaseName)') IS NOT NULL) 
BEGIN
    ALTER DATABASE [$(DatabaseName)]
    SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [$(DatabaseName)];
END

GO
PRINT N'Выполняется создание $(DatabaseName)...'
GO
CREATE DATABASE [$(DatabaseName)]
    ON 
    PRIMARY(NAME = [$(DatabaseName)], FILENAME = N'$(DefaultDataPath)$(DefaultFilePrefix)_Primary.mdf')
    LOG ON (NAME = [$(DatabaseName)_log], FILENAME = N'$(DefaultLogPath)$(DefaultFilePrefix)_Primary.ldf') COLLATE SQL_Latin1_General_CP1_CI_AS
GO
USE [$(DatabaseName)];


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ANSI_NULLS ON,
                ANSI_PADDING ON,
                ANSI_WARNINGS ON,
                ARITHABORT ON,
                CONCAT_NULL_YIELDS_NULL ON,
                NUMERIC_ROUNDABORT OFF,
                QUOTED_IDENTIFIER ON,
                ANSI_NULL_DEFAULT ON,
                CURSOR_DEFAULT LOCAL,
                RECOVERY FULL,
                CURSOR_CLOSE_ON_COMMIT OFF,
                AUTO_CREATE_STATISTICS ON,
                AUTO_SHRINK OFF,
                AUTO_UPDATE_STATISTICS ON,
                RECURSIVE_TRIGGERS OFF 
            WITH ROLLBACK IMMEDIATE;
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_CLOSE OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ALLOW_SNAPSHOT_ISOLATION OFF;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET READ_COMMITTED_SNAPSHOT OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_UPDATE_STATISTICS_ASYNC OFF,
                PAGE_VERIFY NONE,
                DATE_CORRELATION_OPTIMIZATION OFF,
                DISABLE_BROKER,
                PARAMETERIZATION SIMPLE,
                SUPPLEMENTAL_LOGGING OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF IS_SRVROLEMEMBER(N'sysadmin') = 1
    BEGIN
        IF EXISTS (SELECT 1
                   FROM   [master].[dbo].[sysdatabases]
                   WHERE  [name] = N'$(DatabaseName)')
            BEGIN
                EXECUTE sp_executesql N'ALTER DATABASE [$(DatabaseName)]
    SET TRUSTWORTHY OFF,
        DB_CHAINING OFF 
    WITH ROLLBACK IMMEDIATE';
            END
    END
ELSE
    BEGIN
        PRINT N'Параметры базы данных изменить нельзя. Применить эти параметры может только пользователь SysAdmin.';
    END


GO
IF IS_SRVROLEMEMBER(N'sysadmin') = 1
    BEGIN
        IF EXISTS (SELECT 1
                   FROM   [master].[dbo].[sysdatabases]
                   WHERE  [name] = N'$(DatabaseName)')
            BEGIN
                EXECUTE sp_executesql N'ALTER DATABASE [$(DatabaseName)]
    SET HONOR_BROKER_PRIORITY OFF 
    WITH ROLLBACK IMMEDIATE';
            END
    END
ELSE
    BEGIN
        PRINT N'Параметры базы данных изменить нельзя. Применить эти параметры может только пользователь SysAdmin.';
    END


GO
ALTER DATABASE [$(DatabaseName)]
    SET TARGET_RECOVERY_TIME = 0 SECONDS 
    WITH ROLLBACK IMMEDIATE;


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET FILESTREAM(NON_TRANSACTED_ACCESS = OFF),
                CONTAINMENT = NONE 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_CREATE_STATISTICS ON(INCREMENTAL = OFF),
                MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT = OFF,
                DELAYED_DURABILITY = DISABLED 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF fulltextserviceproperty(N'IsFulltextInstalled') = 1
    EXECUTE sp_fulltext_database 'enable';


GO
PRINT N'Выполняется создание [dbo].[CarMarks]...';


GO
CREATE TABLE [dbo].[CarMarks] (
    [Id]              INT         IDENTITY (1, 1) NOT NULL,
    [Name]            NCHAR (500) NOT NULL,
    [FuelConsumption] INT         NOT NULL,
    [Seats]           INT         NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Cars]...';


GO
CREATE TABLE [dbo].[Cars] (
    [Id]            INT   IDENTITY (1, 1) NOT NULL,
    [RentCompanyId] INT   NULL,
    [CarMarkId]     INT   NOT NULL,
    [Price]         MONEY NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Cities]...';


GO
CREATE TABLE [dbo].[Cities] (
    [Id]        INT         IDENTITY (1, 1) NOT NULL,
    [Name]      NCHAR (500) NOT NULL,
    [CountryId] INT         NOT NULL,
    CONSTRAINT [PK_Cities] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Countries]...';


GO
CREATE TABLE [dbo].[Countries] (
    [Id]   INT         IDENTITY (1, 1) NOT NULL,
    [Name] NCHAR (500) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Orders]...';


GO
CREATE TABLE [dbo].[Orders] (
    [Id]         INT  IDENTITY (1, 1) NOT NULL,
    [BookedFrom] DATE NOT NULL,
    [BookedTo]   DATE NOT NULL,
    [PersonId]   INT  NOT NULL,
    [CarId]      INT  NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Persons]...';


GO
CREATE TABLE [dbo].[Persons] (
    [Id]       INT         IDENTITY (1, 1) NOT NULL,
    [Username] NCHAR (500) NOT NULL,
    [Password] NCHAR (500) NOT NULL,
    [Role]     NCHAR (50)  NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[RentCompanies]...';


GO
CREATE TABLE [dbo].[RentCompanies] (
    [Name]   NCHAR (500) NOT NULL,
    [CityId] INT         NOT NULL,
    [Id]     INT         IDENTITY (1, 1) NOT NULL,
    [Adress] NCHAR (500) NOT NULL,
    CONSTRAINT [PK_RentCompanies] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[RentCompanyServices]...';


GO
CREATE TABLE [dbo].[RentCompanyServices] (
    [RentCompanyId] INT NOT NULL,
    [ServiceId]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ServiceId] ASC, [RentCompanyId] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Services]...';


GO
CREATE TABLE [dbo].[Services] (
    [Id]   INT         IDENTITY (1, 1) NOT NULL,
    [Name] NCHAR (500) NOT NULL,
    [Cost] INT         NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[FK_Cars_RentCompanies]...';


GO
ALTER TABLE [dbo].[Cars]
    ADD CONSTRAINT [FK_Cars_RentCompanies] FOREIGN KEY ([RentCompanyId]) REFERENCES [dbo].[RentCompanies] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_Cars_CarMarks]...';


GO
ALTER TABLE [dbo].[Cars]
    ADD CONSTRAINT [FK_Cars_CarMarks] FOREIGN KEY ([CarMarkId]) REFERENCES [dbo].[CarMarks] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_Cities_Countries]...';


GO
ALTER TABLE [dbo].[Cities]
    ADD CONSTRAINT [FK_Cities_Countries] FOREIGN KEY ([CountryId]) REFERENCES [dbo].[Countries] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_Orders_Persons]...';


GO
ALTER TABLE [dbo].[Orders]
    ADD CONSTRAINT [FK_Orders_Persons] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Persons] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_Orders_Cars]...';


GO
ALTER TABLE [dbo].[Orders]
    ADD CONSTRAINT [FK_Orders_Cars] FOREIGN KEY ([CarId]) REFERENCES [dbo].[Cars] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_RentCompanies_Cities]...';


GO
ALTER TABLE [dbo].[RentCompanies]
    ADD CONSTRAINT [FK_RentCompanies_Cities] FOREIGN KEY ([CityId]) REFERENCES [dbo].[Cities] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_RentCompanyServices_Services]...';


GO
ALTER TABLE [dbo].[RentCompanyServices]
    ADD CONSTRAINT [FK_RentCompanyServices_Services] FOREIGN KEY ([ServiceId]) REFERENCES [dbo].[Services] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_RentCompanyServices_RentCompanies]...';


GO
ALTER TABLE [dbo].[RentCompanyServices]
    ADD CONSTRAINT [FK_RentCompanyServices_RentCompanies] FOREIGN KEY ([RentCompanyId]) REFERENCES [dbo].[RentCompanies] ([Id]);


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
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'b84b3f14-8b80-414e-b85f-05374ac4de42')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('b84b3f14-8b80-414e-b85f-05374ac4de42')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '948a8b4c-cbe2-4ccc-94bc-3c01ca4d4446')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('948a8b4c-cbe2-4ccc-94bc-3c01ca4d4446')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '1f2d71b9-f7ee-4f3c-a3c6-b0740e4673c4')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('1f2d71b9-f7ee-4f3c-a3c6-b0740e4673c4')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '57d07228-8f12-414e-8455-1979f50bf4ea')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('57d07228-8f12-414e-8455-1979f50bf4ea')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'e75924e2-972f-4e6a-85e6-daebdaa56ba1')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('e75924e2-972f-4e6a-85e6-daebdaa56ba1')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'b1fdef5c-7c93-484f-996c-eab56da4c6a9')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('b1fdef5c-7c93-484f-996c-eab56da4c6a9')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '7b763d2a-1766-4ef3-8c18-702039817063')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('7b763d2a-1766-4ef3-8c18-702039817063')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'af6b2d5e-7981-4e86-99e9-af75e6950088')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('af6b2d5e-7981-4e86-99e9-af75e6950088')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '2605e416-cf35-4e35-b2cd-3d9cc6b0e535')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('2605e416-cf35-4e35-b2cd-3d9cc6b0e535')

GO

GO
DECLARE @VarDecimalSupported AS BIT;

SELECT @VarDecimalSupported = 0;

IF ((ServerProperty(N'EngineEdition') = 3)
    AND (((@@microsoftversion / power(2, 24) = 9)
          AND (@@microsoftversion & 0xffff >= 3024))
         OR ((@@microsoftversion / power(2, 24) = 10)
             AND (@@microsoftversion & 0xffff >= 1600))))
    SELECT @VarDecimalSupported = 1;

IF (@VarDecimalSupported > 0)
    BEGIN
        EXECUTE sp_db_vardecimal_storage_format N'$(DatabaseName)', 'ON';
    END


GO
PRINT N'Обновление завершено.';


GO
