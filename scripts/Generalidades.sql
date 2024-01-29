/*
  CONSULTAS GENERALES

  - INFO DE VERSION
  - SETEOS DE CONEXION
  - LENGUAJES Y COLLATIONS
*/

select  
  serverproperty('MachineName') AS ComputerName,
  serverproperty('ServerName') AS InstanceName,  
  serverproperty('Edition') AS Edition,
  serverproperty('ProductVersion') AS ProductVersion,  
  serverproperty('ProductLevel') AS ProductLevel,
  @@VERSION as VersionFriendly

--  SET
dbcc useroptions()

set language english

set language spanish

select * from sys.fn_helpcollations() where  name like '%spanish%'

select * into #tt 

execute sp_sqlexec 'sp_who2'


--  ojo sp_who2 usa una tabla temporal de salida y no se puede determinar el esquema
--
select * into #spwho
from openrowset('SQLNCLI', 
  'Server=(localdb)\libreriaPTR;Trusted_Connection=yes;Database=Libreria;', 'sp_who')

select * from #spwho



sp_configure 'show advanced options', 1
reconfigure

sp_configure 'Ad Hoc Distributed Queries', 1
reconfigure