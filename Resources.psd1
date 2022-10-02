ConvertFrom-StringData @'

Info=Información

Warning=Advertencia

Error=Error

GrantedPermissions=Permisos de {0} concedidos a {1} en la ruta de acceso {2}.

NotGrantedPermissions=No se pudieron conceder permisos de {0} a {1} en la ruta de acceso {2}.

IsAdmin=Se confirmó que {0} es un miembro del grupo local Administradores.

CreatedUser=No se pudo encontrar una cuenta de usuario existente. Se creó el usuario local {0}.

AddedUserAsAdmin=Se agregó {0} al grupo local Administradores.

CheckIIS7Installed=No se pudo cargar Microsoft.Web.*.dll.  Compruebe que IIS 7 está instalado.

RuleNotCreated=Se pasó por alto la creación de la regla para {0} porque ya existe.

CreatedRule=Se creó la regla de delegación para proveedores: {0}.

NotServerOS=SKU actual no válido. Este script solamente se debe usar en un SKU de servidor.

WDeployNotInstalled=Web Deploy debe estar instalado antes de ejecutar este script.

HandlerNotInstalled=La característica Controlador de implementación de IIS 7 de Web Deploy debe estar instalada. Agregue esta característica mediante Agregar o quitar programas.

SharedConfigInUse=No se puede ejecutar este script cuando la configuración compartida está habilitada.

NoPasswordForGivenUser=Se necesita una contraseña si se especifica un usuario. Especifique la contraseña para {0} e inténtelo de nuevo.

PasswordWillBeReset=No se especificó una contraseña para {0}. La contraseña de usuario se restablecerá porque está establecida la opción para pasar por alto los errores de restablecimiento.

FailedToValidateUserWithSpecifiedPassword=No se pudo validar el usuario {0} con la contraseña especificada.

UpdatedRunAsForSpecificUser=Se actualizó la contraseña para el usuario runAs {1} que se especificó en la regla para {0}

SiteCreationFailed=No se pudo crear el sitio. El script se cerrará ahora.

FailedToGrantUserAccessToSite=No se pudieron conceder permisos del Administrador de IIS para {0} en el sitio {1}.

GrantedUserAccessToSite=Permisos del Administrador de IIS concedidos para {0} en el sitio {1}.

UserHasAccessToSite=Se confirmó que {0} tiene permisos del Administrador de IIS para el sitio {1}.

FailedToAccessScriptsFolder=No se pudo obtener acceso a la ubicación de almacenamiento de los archivos de configuración de publicación: {0}. La configuración no se guardará.

SavingPublishXmlToPath=Configuración de publicación guardada en {0}

FailedToWritePublishSettingsFile=No se pudo crear el archivo de configuración de publicación en {0}.

AppPoolCreated=Grupo de aplicaciones {0} creado.

AppPoolExists=El grupo de aplicaciones {0} ya existe. Otras aplicaciones pueden estar usando el grupo de aplicaciones. Es recomendable tener un grupo de aplicaciones por sitio o deshabilitar todas las reglas de delegación de appPoolPipeline, appPoolNetFx o recycleApp. 

SiteCreated=Sitio {0} creado.

SiteAppPoolUpdated=Se confirmó que el sitio {0} existe. El grupo de aplicaciones para el sitio cambió a {1}.

SiteExists=Se confirmó que el sitio {0} existe y utiliza el grupo de aplicaciones {1}.

SiteVirtualDirectoryExists=Omitiendo la creación del directorio del sitio porque el directorio {0} ya existe.  Puede existir contenido en este directorio.

FailedToCreateLogin=No se pudo crear el inicio de sesión {0}

LoginExists=El inicio de sesión {0} ya existe.

FailedToCreateDbUser=No se pudo crear el usuario {0}.

DbUserExists=El usuario de base de datos {0} ya existe.

FailedToSetupDatabase=No se pudo configurar la base de datos {0}.

FailedToCreateDatabase=No se pudo crear la base de datos {0}.

DbExists=La base de datos {0} ya existe.

SmoNotInstalled=No se pudo crear la base de datos. Asegúrese de que Objetos de administración de Microsoft SQL Server (versión 10 o superior) está instalado.

NoPasswordForExistingUserForPublish=No se especificó la contraseña de usuario de implementación y no se guardará en el archivo de configuración de publicación.

FailedToGetPasswordFromRegistry=No se puede recuperar la contraseña de {0} del Registro. Especifique la contraseña de administrador de base de datos e inténtelo de nuevo.

'@ 

