package org.meveo.keycloak.client;

import com.google.common.collect.ImmutableList;

/**
 * @author Edward P. Legaspi
 * @since 10 Nov 2017
 **/
public class KeycloakConstants {

    public static final String ROLE_API_ACCESS = "apiAccess";
    public static final String ROLE_GUI_ACCESS = "guiAccess";
    public static final String ROLE_ADMINISTRATEUR = "administrateur";
    public static final String ROLE_SUPER_ADMINISTRATEUR = "superAdministrateur";
    public static final String ROLE_MANATY_PORTAL_ADMIN = "ManatyPortalAdmin";
    public static final String ROLE_USER_MANAGEMENT = "userManagement";
    public static final String ROLE_ENDPOINT_MANAGEMENT = "endpointManagement";
    public static final String ROLE_MARKETING_MANAGER = "marketingManager";
    public static final String ROLE_SIMPLE_USER = "SimpleUser";
    public static final String ROLE_SELF_USER_MANAGEMENT = "userSelfManagement";
    public static final ImmutableList<String> ROLE_KEYCLOAK_DEFAULT_EXCLUDED = ImmutableList.of("uma_authorization", "offline_access");
    public static final ImmutableList<String> ROLE_REALM_ADMIN_KEYCLOAK_DEFAULT = ImmutableList.of("SUPER_ADMIN", "CC_ADMIN", "CC_LEVEL_1", "CC_LEVEL_2", "PC_ADMIN", "PC_LEVEL_1", "PC_LEVEL_2", "SC_LEVEL_1");
}
