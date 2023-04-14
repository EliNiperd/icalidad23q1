USE [iCalidadCCMSLP]
GO
/****** Object:  StoredProcedure [dbo].[PF_Gen_TMenu]    Script Date: 03/04/2023 02:48:33 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Elí Rodríguez
-- Create date: Febrero 2009
-- Modify date: December 2022
-- Description:	Recupera las opciones del menú
-- Se ajusta para que sea compatible con la versión 2023 Q1
-- =============================================
ALTER PROCEDURE [dbo].[PF_Gen_TMenu] 
	@p_IdEmpleado int
	, @p_Version int = 23
	, @p_IdMenuFather int = 149
	
AS
BEGIN
	-- PF_Gen_Tmenu 92, 23, 150
	--SELECT * FROM Gen_TEmpleado WHERE UserName = 'Rubenr'
	--SET NOCOUNT ON;
	DECLARE @v_IdMenuPadre int = @p_IdMenuFather;

--delete FROM sis_tPrueba Select * FROM sis_tprueba
/*
INSERT INTO Gen_TMenu (IdMenu, DescripcionMenu, Menu, Orden, URL, IdMenuPadre, IdEstatusMenu, Icono, IdRol, OrdenMenu)
SELECT 149 IdMenu, 'iCalidad' DescripcionMenu, 'iCalidad' Menu, 1 Orden, '/DashBoard' URL, 149 IdMenuPadre, 1 IdEstatusMenu, 'iCalidad' Icono, 1 IdRol, 1 OrdenMenu
UNION
SELECT 150 IdMenu, 'Poder Documental' DescripcionMenu, 'Poder Documental' Menu, 1 Orden, '/AdminDocument' URL, 1 IdMenuPadre, 1 IdEstatusMenu, 'Poder Documental' Icono, 1 IdRol, 2 OrdenMenu
UNION
SELECT 151 IdMenu, 'Auditorías' DescripcionMenu, 'Auditorías' Menu, 2 Orden, '/AdminAudit' URL, 149 IdMenuPadre, 1 IdEstatusMenu, 'Auditorías' Icono, 1 IdRol, 3 OrdenMenu
UNION
SELECT 152 IdMenu, 'Acciones' DescripcionMenu, 'Acciones' Menu, 3 Orden, '/AdminAction' URL, 149 IdMenuPadre, 1 IdEstatusMenu, 'Acciones' Icono, 1 IdRol, 4 OrdenMenu
UNION
SELECT 153 IdMenu, 'Personal Competente' DescripcionMenu, 'Personal Competente' Menu, 4 Orden, '/AdminPersonal' URL, 149 IdMenuPadre, 1 IdEstatusMenu, 'Personal Competente' Icono, 1 IdRol, 5 OrdenMenu
UNION
SELECT 154 IdMenu, 'Configuración iCalidad' DescripcionMenu, 'Configuración iCalidad' Menu, 5 Orden, '/AdminIcalidad' URL, 149 IdMenuPadre, 1 IdEstatusMenu, 'Configuración iCalidad' Icono, 1 IdRol, 6 OrdenMenu


******** Menú Poder Documental Administrador *****

INSERT INTO Gen_TMenu (IdMenu, DescripcionMenu, Menu, Orden, URL, IdMenuPadre, IdEstatusMenu, Icono, IdRol, OrdenMenu)
SELECT 155 IdMenu, 'Catálogos' DescripcionMenu, 'Catálogos' Menu, 1 Orden, '/' URL, 150 IdMenuPadre, 1 IdEstatusMenu, 'MdAdminPanelSet' Icono, 2 IdRol, 1 OrdenMenu
UNION
SELECT 156 IdMenu, 'Solicitudes' DescripcionMenu, 'Solicitudes' Menu, 2 Orden, '' URL, 150 IdMenuPadre, 1 IdEstatusMenu, 'MdTask' Icono, 2 IdRol, 2 OrdenMenu
UNION
SELECT 157 IdMenu, 'Documentos Admin' DescripcionMenu, 'Documentos Admin' Menu, 3 Orden, '' URL, 150 IdMenuPadre, 1 IdEstatusMenu, 'RiAdminFill' Icono, 2 IdRol, 3 OrdenMenu
UNION
SELECT 158 IdMenu, 'Carpetas' DescripcionMenu, 'Carpetas' Menu, 4 Orden, '' URL, 150 IdMenuPadre, 1 IdEstatusMenu, 'BsFolderFill' Icono, 2 IdRol, 4 OrdenMenu
UNION
SELECT 159 IdMenu, 'Registros' DescripcionMenu, 'Registros' Menu, 5 Orden, '' URL, 150 IdMenuPadre, 1 IdEstatusMenu, 'MdAppRegistratio' Icono, 2 IdRol, 5 OrdenMenu
UNION
SELECT 160 IdMenu, 'Reportes' DescripcionMenu, 'Reportes' Menu, 6 Orden, '' URL, 150 IdMenuPadre, 1 IdEstatusMenu, 'HiDocumentRepor' Icono, 2 IdRol, 6 OrdenMenu

UPDATE Gen_TMenu
SET idMenuPadre = 150
WHERE IdMenuPadre = 149

UPDATE Gen_TMenu
SET URL = '/AdminIcalidad'
WHERE IdMenu = 154


DELETE FROM Gen_TMenu WHERE IdMenu >= 150*/
--select  * FROM Gen_TMenu ORDER BY IdMenu
--select * from Gen_TRol
--SELECT IdRol FROM Gen_REmpleadoRol WHERE IdEmpleado = 92
insert into Sis_TPrueba(Texto, Entero, FechaHora)
SELECT 'IdEmpleado', @p_IdEmpleado, GETDATE() UNION
SELECT 'Versión', @p_Version, GETDATE() 
UNION
SELECT 'IdMenuFather', @p_IdMenuFather, GETDATE() 

	If @p_IdMenuFather = 0
		SET @p_IdMenuFather = 149

	if @p_Version = 23 
	BEGIN
		IF @p_IdMenuFather = 149
		BEGIN
			SELECT TOP 1 @v_IdMenuPadre =  MAX(ISNULL(IdMenuPadre, 1)) 
			FROM Gen_TMenu
			WHERE IdEstatusMenu = 1
				AND IdMenu >= 149
				AND IdRol IN (SELECT IdRol FROM Gen_REmpleadoRol WHERE IdEmpleado = @p_IdEmpleado UNION ALL SELECT 99)
			GROUP BY IdMenuPadre
				, OrdenMenu
			ORDER BY IdMenuPadre, OrdenMenu
		END
		SELECT MAX(IdMenu) IdMenu
			, MAX(ISNULL(IdMenuPadre, 1))  IdMenuPadre
			, Menu
			, ISNULL(Icono, '') LeftLogo
			, URL
			, OrdenMenu
		FROM Gen_TMenu
		WHERE IdEstatusMenu = 1
			AND IdMenu >= 149
			AND ISNULL(IdMenuPadre, 1) = @v_IdMenuPadre
			AND IdRol IN (SELECT IdRol FROM Gen_REmpleadoRol WHERE IdEmpleado = @p_IdEmpleado UNION ALL SELECT 99)
		GROUP BY IdMenuPadre
			, Menu
			, Icono
			, URL
			, OrdenMenu
		ORDER BY IdMenuPadre, OrdenMenu
	END
	ELSE
	BEGIN
		SELECT MAX(IdMenu) IdMenu
			, MAX(IdMenuPadre) IdMenuPadre
			, Menu
			, ISNULL(Icono, '') LeftLogo
			, URL
			, OrdenMenu
		FROM Gen_TMenu
		WHERE IdEstatusMenu = 1
			AND IdRol IN (SELECT IdRol FROM Gen_REmpleadoRol WHERE IdEmpleado = @p_IdEmpleado UNION ALL SELECT 99)
		GROUP BY IdMenuPadre
			, Menu
			, Icono
			, URL
			, OrdenMenu
		ORDER BY OrdenMenu
		
	END
END
