/*
 * (C) Copyright 2015-2016 Opencell SAS (http://opencellsoft.com/) and contributors.
 * (C) Copyright 2009-2014 Manaty SARL (http://manaty.net/) and contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 * This program is not suitable for any direct or indirect application in MILITARY industry
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.meveo.admin.action.admin;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FilenameUtils;
import org.jboss.seam.international.status.builder.BundleKey;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.meveo.admin.action.BaseBean;
import org.meveo.admin.action.CustomFieldBean;
import org.meveo.admin.exception.BusinessException;
import org.meveo.admin.util.ResourceBundle;
import org.meveo.admin.web.interceptor.ActionMethod;
import org.meveo.commons.utils.*;
import org.meveo.elresolver.ELException;
import org.meveo.keycloak.client.KeycloakAdminClientConfig;
import org.meveo.keycloak.client.KeycloakAdminClientService;
import org.meveo.keycloak.client.KeycloakConstants;
import org.meveo.keycloak.client.KeycloakUtils;
import org.meveo.model.BusinessEntity;
import org.meveo.model.admin.DetailedSecuredEntity;
import org.meveo.model.admin.SecuredEntity;
import org.meveo.model.admin.User;
import org.meveo.model.hierarchy.HierarchyLevel;
import org.meveo.model.hierarchy.UserHierarchyLevel;
import org.meveo.model.security.Role;
import org.meveo.model.shared.Name;
import org.meveo.security.CurrentUser;
import org.meveo.security.MeveoUser;
import org.meveo.service.admin.impl.RoleService;
import org.meveo.service.admin.impl.UserService;
import org.meveo.service.base.PersistenceService;
import org.meveo.service.base.local.IPersistenceService;
import org.meveo.service.hierarchy.impl.UserHierarchyLevelService;
import org.meveo.service.security.SecuredBusinessEntityService;
import org.meveo.service.validation.ValidationService;
import org.primefaces.event.FileUploadEvent;
import org.primefaces.event.SelectEvent;
import org.primefaces.model.*;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.meveo.keycloak.client.KeycloakUtils.getKeycloakClient;

/**
 * Standard backing bean for {@link User} (extends {@link BaseBean} that provides almost all common methods to handle entities filtering/sorting in datatable, their create, edit,
 * view, delete operations). It works with Manaty custom JSF components.
 */
@Named
@ViewScoped
public class UserBean extends CustomFieldBean<User> {

    private static final long serialVersionUID = 1L;

    /** Injected @{link User} service. Extends {@link PersistenceService}. */
    @Inject
    protected UserService userService;

    @Inject
    private RoleService roleService;

    @Inject
    private UserHierarchyLevelService userHierarchyLevelService;

    @Inject
    private SecuredBusinessEntityService securedBusinessEntityService;

    /** paramBeanFactory */
    @Inject
    private ParamBeanFactory paramBeanFactory;

    @EJB
    private KeycloakAdminClientService keycloakAdminClientService;

    @Inject
    private ValidationService validationService;


    @Inject
    private MailerSessionFactory maillerSessionFactory;


    @Inject
    private MailerConfigurationService mailerConfigurationService;

    @Inject
    private transient ResourceBundle bundle;

    private String sender;

    private String host;

    private Integer port;

    private String userName;

    private String password;

    private boolean transportLayerSecurity;

    private String receivers;


    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }


    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isTransportLayerSecurity() {
        return transportLayerSecurity;
    }

    public void setTransportLayerSecurity(boolean transportLayerSecurity) {
        this.transportLayerSecurity = transportLayerSecurity;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getReceivers() {
        return receivers;
    }

    public void setReceivers(String receivers) {
        this.receivers = receivers;
    }


    @Inject
    @CurrentUser
    private MeveoUser meveoUser;

    private DualListModel<Role> rolesDM;

    private TreeNode userGroupRootNode;

    private TreeNode userGroupSelectedNode;
    private String providerFilePath;
    private String selectedFolder;
    private boolean currentDirEmpty;
    private String selectedFileName;
    private String newFilename;
    private String directoryName;
    private List<File> fileList;
    private UploadedFile file;
    private String securedEntityType;
    private Map<String, String> securedEntityTypes;
    private Map<String, BaseBean<? extends BusinessEntity>> accountBeanMap;
    private BusinessEntity selectedEntity;
    private BaseBean<?> selectedAccountBean;
    private String confirmResetMessage;
    private String email;
    private String subject;
    private String body;


    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");

    private boolean autoUnzipped;

    final private String ZIP_FILE_EXTENSION = ".zip";

    /**
     * Constructor. Invokes super constructor and provides class type of this bean for {@link BaseBean}.
     */
    public UserBean() {
        super(User.class);
    }

    @PostConstruct
    public void init() {
        host = mailerConfigurationService.getHost();
        port = mailerConfigurationService.getPort();
        userName = mailerConfigurationService.getUserName();
        password = mailerConfigurationService.getPassword();
        transportLayerSecurity = mailerConfigurationService.getTransportLayerSecurity();
        this.providerFilePath = paramBeanFactory.getInstance().getChrootDir(currentUser.getProviderCode());
        if (conversation.isTransient()) {
            conversation.begin();
            createMissingDirectories();
            setSelectedFolder(null);
        }
        initSelectionOptions();
    }

    @Override
    public User initEntity() {
        log.info("initEntity()");
        super.initEntity();

        if (entity.getName() == null) {
            entity.setName(new Name());
        }

        if (entity.getUserName() != null) {
            confirmResetMessage = "Are you sure you want to reset [" + entity.getUserName() + "] password?";
        }

        return entity;
    }

    public TreeNode getUserGroupRootNode() {
        log.info("getUserGroupRootNode()");
        if (userGroupRootNode == null) {
            userGroupRootNode = new DefaultTreeNode("Root", null);
            List<UserHierarchyLevel> roots;
            roots = userHierarchyLevelService.findRoots();
            if (CollectionUtils.isNotEmpty(roots)) {
                Collections.sort(roots);
            }
        }
        return userGroupRootNode;
    }

    public void setUserGroupRootNode(TreeNode rootNode) {
        this.userGroupRootNode = rootNode;
    }

    public TreeNode getUserGroupSelectedNode() {
        return userGroupSelectedNode;
    }

    public void setUserGroupSelectedNode(TreeNode selectedNode) {
        this.userGroupSelectedNode = selectedNode;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.meveo.admin.action.BaseBean#saveOrUpdate(boolean)
     */
    @Override
    @ActionMethod
    public String saveOrUpdate(boolean killConversation) throws BusinessException, ELException {
        if (!StringUtils.isBlank(getEntity().getUserName())) {
            getEntity().setUserName(getEntity().getUserName().trim());
        }
        log.debug("saving new user={}", entity.getUserName());
        boolean isNewUser = true;
        if (getObjectId() != null) {
            if (userService.isUsernameExists(entity.getUserName(), entity.getId())) {
                messages.error(new BundleKey("messages", "exception.UsernameAlreadyExistsException"));
                return null;
            }
            isNewUser = false;
        } else {
            if (userService.isUsernameExists(entity.getUserName())) {
                messages.error(new BundleKey("messages", "exception.UsernameAlreadyExistsException"));
                return null;
            }
        }

        if (this.getUserGroupSelectedNode() != null) {
            UserHierarchyLevel userHierarchyLevel = (UserHierarchyLevel) this.getUserGroupSelectedNode().getData();
        }

        boolean hasMarkingManager = false;
        for (Role role : rolesDM.getTarget()) {
            if (role.getName().equalsIgnoreCase(KeycloakConstants.ROLE_SIMPLE_USER)) {
                hasMarkingManager = true;
            }
        }
        if (!hasMarkingManager) {
            Role markingManager = roleService.findByName(KeycloakConstants.ROLE_SIMPLE_USER);
            rolesDM.getTarget().add(markingManager);
        }

        getEntity().getRoles().clear();
        getEntity().getRoles().addAll(roleService.refreshOrRetrieve(rolesDM.getTarget()));

        String viewPage = super.saveOrUpdate(killConversation);
        KeycloakAdminClientConfig keycloakAdminClientConfig = KeycloakUtils.loadConfig();
        Keycloak keycloak = getKeycloakClient(keycloakAdminClientService.getKeycloakSecurityContext(), keycloakAdminClientConfig);

        // Get realm
        RealmResource realmResource = keycloak.realm(keycloakAdminClientConfig.getRealm());
        UsersResource usersResource = realmResource.users();
        String userId = null;

        ClientRepresentation meveoWebClient = realmResource.clients().findByClientId(keycloakAdminClientConfig.getClientId()).get(0);
        boolean isAdmin = false;
        if (isNewUser) {
            UserRepresentation user = new UserRepresentation();
            user.setUsername(getEntity().getUserName());
            user.setFirstName(getEntity().getName() != null ? getEntity().getName().getFirstName() : null);
            user.setLastName(getEntity().getName() != null ? getEntity().getName().getLastName() : null);
            user.setEmail(getEntity().getEmail());
            user.setEnabled(true);
            Response response = usersResource.create(user);
            userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            // Define password credential
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setTemporary(true);
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(ParamBean.getInstance().getProperty("meveo.default.password", "meveo!"));
            usersResource.get(userId).resetPassword(credential);
            List<RoleRepresentation> rolesRepresentation = new ArrayList<>();
            if (getEntity() != null && !getEntity().getRoles().isEmpty()) {
                RoleRepresentation apiRole = realmResource.clients().get(meveoWebClient.getId())
                        .roles().get(KeycloakConstants.ROLE_API_ACCESS).toRepresentation();
                rolesRepresentation.add(apiRole);
                RoleRepresentation guiRole = realmResource.clients().get(meveoWebClient.getId())
                        .roles().get(KeycloakConstants.ROLE_GUI_ACCESS).toRepresentation();
                rolesRepresentation.add(guiRole);
                RoleRepresentation userSelfManagementRole = realmResource.clients().get(meveoWebClient.getId())
                        .roles().get(KeycloakConstants.ROLE_SELF_USER_MANAGEMENT).toRepresentation();
                rolesRepresentation.add(userSelfManagementRole);
                RoleRepresentation endpointManagementRole = realmResource.clients().get(meveoWebClient.getId())
                        .roles().get(KeycloakConstants.ROLE_ENDPOINT_MANAGEMENT).toRepresentation();
                rolesRepresentation.add(endpointManagementRole);
                RoleRepresentation marketingManagerRole = realmResource.clients().get(meveoWebClient.getId())
                        .roles().get(KeycloakConstants.ROLE_MARKETING_MANAGER).toRepresentation();
                rolesRepresentation.add(marketingManagerRole);
                for (Role role : getEntity().getRoles()) {
                    try {
                        if (KeycloakConstants.ROLE_ADMINISTRATEUR.equalsIgnoreCase(role.getName())
                                || KeycloakConstants.ROLE_SUPER_ADMINISTRATEUR.equalsIgnoreCase(role.getName())
                                || KeycloakConstants.ROLE_MANATY_PORTAL_ADMIN.equalsIgnoreCase(role.getName())) {
                            isAdmin = true;
                        }
                        String selectedRole = role.getName();
                        if (KeycloakConstants.ROLE_SIMPLE_USER.equalsIgnoreCase(selectedRole)) {
                            selectedRole = KeycloakConstants.ROLE_MARKETING_MANAGER;
                        }
                        RoleRepresentation externalRole = realmResource.clients().get(meveoWebClient.getId())
                                .roles().get(selectedRole).toRepresentation();

                        rolesRepresentation.add(externalRole);
                    } catch (NotFoundException e) {
                        log.error("Role not found {}", role.getName());
                    }
                }
                if (isAdmin) {
                    RoleRepresentation userManagementRole = realmResource.clients().get(meveoWebClient.getId())
                            .roles().get(KeycloakConstants.ROLE_USER_MANAGEMENT).toRepresentation();
                    rolesRepresentation.add(userManagementRole);
                }
            }
            Set<RoleRepresentation> uniqueRoles = new HashSet<>(rolesRepresentation);
            usersResource.get(userId).roles().clientLevel(meveoWebClient.getId()).add(new ArrayList<>(uniqueRoles));
        } else {
            UserRepresentation userRepresentation = getUserRepresentationByUsername(usersResource, getEntity().getUserName());
            userRepresentation.setFirstName(getEntity().getName() != null ? getEntity().getName().getFirstName() : null);
            userRepresentation.setLastName(getEntity().getName() != null ? getEntity().getName().getLastName() : null);
            userRepresentation.setEmail(getEntity().getEmail());
            userId = userRepresentation.getId();
            UserResource userResource = usersResource.get(userId);
            userResource.update(userRepresentation);

            // find realm roles and assign to the newly update user
            List<RoleRepresentation> rolesToAdd = new ArrayList<>();
            List<RoleRepresentation> rolesToDelete = realmResource.clients().get(meveoWebClient.getId()).roles().list();
            if (getEntity() != null && !getEntity().getRoles().isEmpty()) {
                for (Role role : getEntity().getRoles()) {
                    try {
                        if (KeycloakConstants.ROLE_ADMINISTRATEUR.equalsIgnoreCase(role.getName())
                                || KeycloakConstants.ROLE_SUPER_ADMINISTRATEUR.equalsIgnoreCase(role.getName())
                                || KeycloakConstants.ROLE_MANATY_PORTAL_ADMIN.equalsIgnoreCase(role.getName())) {
                            isAdmin = true;
                        }
                        RoleRepresentation tempRole = realmResource.clients().get(meveoWebClient.getId())
                                .roles().get(role.getName()).toRepresentation();
                        rolesToAdd.add(tempRole);
                        rolesToDelete = KeycloakUtils.removeRole(rolesToDelete, tempRole);
                    } catch (NotFoundException e) {
                        log.error("Role not found {}", role.getName());
                    }
                }
            }
            // add from posted data
            usersResource.get(userId).roles().clientLevel(meveoWebClient.getId()).add(rolesToAdd);
        }

        RolesResource rolesResource = realmResource.roles();
        List<RoleRepresentation> rolesRepresentation = new ArrayList<>();
        for (String roleName : KeycloakConstants.ROLE_REALM_ADMIN_KEYCLOAK_DEFAULT) {
            try {
                RoleRepresentation realmRole = rolesResource.get(roleName).toRepresentation();
                rolesRepresentation.add(realmRole);
            } catch (NotFoundException e) {
                log.error("Role not found {}", roleName);
            }
        }
        usersResource.get(userId).roles().realmLevel().add(rolesRepresentation);

        return viewPage;
    }

    @Override
    public void delete() throws BusinessException {
        String username = getEntity().getUserName();
        super.delete();
        KeycloakAdminClientConfig keycloakAdminClientConfig = KeycloakUtils.loadConfig();
        Keycloak keycloak = getKeycloakClient(keycloakAdminClientService.getKeycloakSecurityContext(), keycloakAdminClientConfig);

        // Get realm
        RealmResource realmResource = keycloak.realm(keycloakAdminClientConfig.getRealm());
        UsersResource usersResource = realmResource.users();
        UserRepresentation userRepresentation = getUserRepresentationByUsername(usersResource, username);

        // Create user (requires manage-users role)
        usersResource.delete(userRepresentation.getId());
    }

    @Override
    public String deleteWithBack() throws BusinessException {
        String username = getEntity().getUserName();
        KeycloakAdminClientConfig keycloakAdminClientConfig = KeycloakUtils.loadConfig();
        Keycloak keycloak = getKeycloakClient(keycloakAdminClientService.getKeycloakSecurityContext(), keycloakAdminClientConfig);

        // Get realm
        RealmResource realmResource = keycloak.realm(keycloakAdminClientConfig.getRealm());
        UsersResource usersResource = realmResource.users();
        UserRepresentation userRepresentation = getUserRepresentationByUsername(usersResource, username);

        // Create user (requires manage-users role)
        usersResource.delete(userRepresentation.getId());
        return super.deleteWithBack();
    }

    /**
     * @see org.meveo.admin.action.BaseBean#getPersistenceService()
     */
    @Override
    protected IPersistenceService<User> getPersistenceService() {
        return userService;
    }

    /**
     * @see org.meveo.admin.action.BaseBean#getFormFieldsToFetch()
     */
    @Override
    protected List<String> getFormFieldsToFetch() {
        return Arrays.asList("roles", "userLevel");
    }

    /**
     * @see org.meveo.admin.action.BaseBean#getListFieldsToFetch()
     */
    @Override
    protected List<String> getListFieldsToFetch() {
        return Arrays.asList("roles", "userLevel");
    }

    /**
     * Standard method for custom component with listType="pickList".
     */
    public DualListModel<Role> getDualListModel() {
        if (rolesDM == null) {
            List<Role> perksSource = null;
            if (meveoUser.hasRole(KeycloakConstants.ROLE_MANATY_PORTAL_ADMIN)) {
                List<Role> availiableRoles = roleService.list();
                perksSource = new ArrayList<>();
                for (Role role : availiableRoles) {
                    if (role.getName().equalsIgnoreCase(KeycloakConstants.ROLE_SUPER_ADMINISTRATEUR) || role.getName().equalsIgnoreCase(KeycloakConstants.
                            ROLE_MANATY_PORTAL_ADMIN) || role.getName().equalsIgnoreCase(KeycloakConstants.ROLE_SIMPLE_USER))  {
                        perksSource.add(role);
                    }
                }
            } else {
                perksSource = roleService.list();
            }
            List<Role> perksTarget = new ArrayList<Role>();
            if (getEntity().getRoles() != null) {
                perksTarget.addAll(getEntity().getRoles());
            }
            boolean hasMarkingManager = false;
            for (Role role : perksTarget) {
                if (role.getName().equalsIgnoreCase(KeycloakConstants.ROLE_SIMPLE_USER)) {
                    hasMarkingManager = true;
                }
            }
            if (!hasMarkingManager) {
                Role markingManager = roleService.findByName(KeycloakConstants.ROLE_SIMPLE_USER);
                perksTarget.add(markingManager);
            }
            perksSource.removeAll(perksTarget);
            rolesDM = new DualListModel<Role>(perksSource, perksTarget);
        }
        return rolesDM;
    }

    public void setDualListModel(DualListModel<Role> rolesDM) {
        this.rolesDM = rolesDM;
    }

    @Override
    protected String getDefaultSort() {
        return null;// "userName";
    }

    public String getFilePath() {
        return providerFilePath;

    }

    private String getFilePath(String name) {
        String result = getFilePath() + File.separator + name;
        if (selectedFolder != null) {
            result = getFilePath() + File.separator + selectedFolder + File.separator + name;
        }
        return result;
    }

    public void createMissingDirectories() {
        log.info("createMissingDirectories() * ");
        // log.info("Creating required dirs in "+getFilePath());
        String importDir = getFilePath() + File.separator + "imports" + File.separator + "customers" + File.separator;
        String customerDirIN = importDir + "input";
        String customerDirOUT = importDir + "output";
        String customerDirERR = importDir + "errors";
        String customerDirWARN = importDir + "warnings";
        String customerDirKO = importDir + "reject";
        importDir = getFilePath() + File.separator + "imports" + File.separator + "accounts" + File.separator;
        String accountDirIN = importDir + "input";
        String accountDirOUT = importDir + "output";
        String accountDirERR = importDir + "errors";
        String accountDirWARN = importDir + "warnings";
        String accountDirKO = importDir + "reject";
        importDir = getFilePath() + File.separator + "imports" + File.separator + "subscriptions" + File.separator;
        String subDirIN = importDir + "input";
        String subDirOUT = importDir + "output";
        String subDirERR = importDir + "errors";
        String subDirWARN = importDir + "warnings";
        String subDirKO = importDir + "reject";
        importDir = getFilePath() + File.separator + "imports" + File.separator + "catalog" + File.separator;
        String catDirIN = importDir + "input";
        String catDirOUT = importDir + "output";
        String catDirKO = importDir + "reject";
        importDir = getFilePath() + File.separator + "imports" + File.separator + "metering" + File.separator;
        String meterDirIN = importDir + "input";
        String meterDirOUT = importDir + "output";
        String meterDirKO = importDir + "reject";
        String invoicePdfDir = getFilePath() + File.separator + "invoices" + File.separator + "pdf";
        String invoiceXmlDir = getFilePath() + File.separator + "invoices" + File.separator + "xml";
        String jasperDir = getFilePath() + File.separator + "jasper";
        List<String> filePaths = Arrays.asList("", customerDirIN, customerDirOUT, customerDirERR, customerDirWARN, customerDirKO, accountDirIN, accountDirOUT, accountDirERR,
            accountDirWARN, accountDirKO, subDirIN, subDirOUT, subDirERR, subDirWARN, catDirIN, catDirOUT, catDirKO, subDirKO, meterDirIN, meterDirOUT, meterDirKO, invoicePdfDir,
            invoiceXmlDir, jasperDir);
        for (String custDirs : filePaths) {
            File subDir = new File(custDirs);
            if (!subDir.exists()) {
                subDir.mkdirs();
            }
        }
    }

    public UploadedFile getFile() {
        return file;
    }

    public void setFile(UploadedFile file) {
        this.file = file;
        log.info("set file to" + file.getFileName());
    }

    public void deleteSelectedFile() {
        String folder = getFilePath() + File.separator + (this.selectedFolder == null ? "" : this.selectedFolder);
        log.info("delete file" + folder + File.separator + selectedFileName);
        File file = new File(folder + File.separator + selectedFileName);
        if (file.exists()) {
            file.delete();
        }
        this.selectedFileName = null;
        buildFileList();
    }

    public StreamedContent getSelectedFile() {
        StreamedContent result = null;
        try {
            String folder = getFilePath() + File.separator + (this.selectedFolder == null ? "" : this.selectedFolder);
            result = new DefaultStreamedContent(new FileInputStream(new File(folder + File.separator + selectedFileName)), null, selectedFileName);
        } catch (FileNotFoundException e) {
            log.error("error generated while getting seleceted file", e);
        }
        return result;
    }

    public String getSelectedFolder() {
        return selectedFolder;
    }

    public boolean hasSelectedFolder() {
        return !StringUtils.isBlank(selectedFolder);
    }

    public void setSelectedFolder(String selectedFolder) {
        setSelectedFileName(null);
        if (selectedFolder == null) {
            log.debug("setSelectedFolder to null");
            this.selectedFolder = null;
        } else if ("..".equals(selectedFolder)) {
            if (this.selectedFolder.lastIndexOf(File.separator) > 0) {
                log.debug("setSelectedFolder to parent " + this.selectedFolder + " -> " + this.selectedFolder.substring(0, this.selectedFolder.lastIndexOf(File.separator)));
                this.selectedFolder = this.selectedFolder.substring(0, this.selectedFolder.lastIndexOf(File.separator));
            } else {
                this.selectedFolder = null;
            }
        } else {
            log.debug("setSelectedFolder " + selectedFolder);
            if (this.selectedFolder == null) {
                this.selectedFolder = File.separator + selectedFolder;
            } else {
                this.selectedFolder += File.separator + selectedFolder;
            }
        }
        buildFileList();
    }

    private void buildFileList() {
        String folder = getFilePath() + File.separator + (this.selectedFolder == null ? "" : this.selectedFolder);
        File file = new File(folder);
        log.debug("getFileList " + folder);

        File[] files = file.listFiles();

        fileList = files == null ? new ArrayList<File>() : new ArrayList<File>(Arrays.asList(files));
        currentDirEmpty = !StringUtils.isBlank(this.selectedFolder) && fileList.size() == 0;
    }

    public String getFileType(String fileName) {
        if (fileName != null && fileName.endsWith(".zip")) {
            return "zip";
        }
        return "text";
    }

    public String getLastModified(File file) {
        return sdf.format(new Date(file.lastModified()));
    }

    public String getSelectedFileName() {
        return selectedFileName;
    }

    public void setSelectedFileName(String selectedFileName) {
        log.debug("setSelectedFileName " + selectedFileName);
        this.selectedFileName = selectedFileName;
    }

    public String getNewFilename() {
        return newFilename;
    }

    public void setNewFilename(String newFilename) {
        this.newFilename = newFilename;
    }

    public String getDirectoryName() {
        return directoryName;
    }

    public void setDirectoryName(String directoryName) {
        this.directoryName = directoryName;
    }

    public boolean isCurrentDirEmpty() {
        return currentDirEmpty;
    }

    public List<File> getFileList() {
        return fileList;
    }

    public void handleFileUpload(FileUploadEvent event) {
        UploadedFile file = event.getFile();
        String filename = file.getFileName();
        log.debug("upload file={},autoUnziped {}", filename, autoUnzipped);
        // FIXME: use resource bundle
        try {
            InputStream fileInputStream = file.getInputstream();
            if (this.isAutoUnzipped()) {
                if (!filename.endsWith(ZIP_FILE_EXTENSION)) {
                    messages.info(filename + " isn't a valid zip file!");
                    copyFile(filename, fileInputStream);
                } else {
                    copyUnZippedFile(fileInputStream);
                }
            } else {
                copyFile(filename, fileInputStream);
            }
            messages.info(filename + " is uploaded to " + ((selectedFolder != null) ? selectedFolder : "Home"));
        } catch (IOException e) {
            log.error("Failed to upload a file {}", filename, e);
            messages.error("Error while uploading " + filename);
        }
    }

    public void upload(ActionEvent event) {
        if (file != null) {
            log.debug("upload file={}", file);
            try {
                copyFile(FilenameUtils.getName(file.getFileName()), file.getInputstream());

                messages.info(file.getFileName() + " is uploaded to " + ((selectedFolder != null) ? selectedFolder : "Home"));
            } catch (IOException e) {
                log.error("Failed to upload a file {}", file.getFileName(), e);
                messages.error("Error while uploading " + file.getFileName());
            }
        } else {
            log.info("upload file is null");

        }
    }

    public void createDirectory() {
        if (!StringUtils.isBlank(directoryName)) {
            String filePath = getFilePath(directoryName);
            File newDir = new File(filePath);
            if (!newDir.exists()) {
                if (newDir.mkdir()) {
                    buildFileList();
                    directoryName = "";
                }
            }
        }
    }

    public void deleteDirectory() {
        log.debug("deleteDirectory:" + selectedFolder);
        if (currentDirEmpty) {
            String filePath = getFilePath("");
            File currentDir = new File(filePath);
            if (currentDir.exists() && currentDir.isDirectory()) {
                if (currentDir.delete()) {
                    setSelectedFolder("..");
                    createMissingDirectories();
                    buildFileList();
                }
            }
        }
    }

    public void renameFile() {
        if (!StringUtils.isBlank(selectedFileName) && !StringUtils.isBlank(newFilename)) {
            String filePath = getFilePath(selectedFileName);
            String newFilePath = getFilePath(newFilename);
            File currentFile = new File(filePath);
            File newFile = new File(newFilePath);
            if (currentFile.exists() && currentFile.isFile() && !newFile.exists()) {
                if (currentFile.renameTo(newFile)) {
                    buildFileList();
                    selectedFileName = newFilename;
                    newFilename = "";
                }
            }
        }
    }

    public StreamedContent getDownloadZipFile() {
        String filename = selectedFolder == null ? "meveo-fileexplore" : selectedFolder.substring(selectedFolder.lastIndexOf(File.separator) + 1);
        String sourceFolder = getFilePath() + (selectedFolder == null ? "" : selectedFolder);
        try {
            byte[] filedata = FileUtils.createZipFile(sourceFolder);
            InputStream is = new ByteArrayInputStream(filedata);
            return new DefaultStreamedContent(is, "application/octet-stream", filename + ".zip");
        } catch (Exception e) {
            log.debug("Failed to zip a file", e);
        }
        return null;
    }

    private void copyUnZippedFile(InputStream in) {
        try {
            String folder = getFilePath("");
            FileUtils.unzipFile(folder, in);
            buildFileList();
        } catch (Exception e) {
            log.debug("error when upload zip file for new UI", e);
        }
    }

    public void copyFile(String fileName, InputStream in) {
        try {

            // write the inputStream to a FileOutputStream
            String filePath = getFilePath(fileName);
            OutputStream out = new FileOutputStream(new File(filePath));

            int read = 0;
            byte[] bytes = new byte[1024];

            while ((read = in.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }

            in.close();
            out.flush();
            out.close();

            log.debug("New file created!");
            buildFileList();
        } catch (IOException e) {
            log.error("Failed saving file. ", e);
        }
    }

    // Recursive function to create tree with node checked if selected
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private TreeNode createTree(HierarchyLevel hierarchyLevel, TreeNode rootNode, UserHierarchyLevel selectedHierarchyLevel) {
        TreeNode newNode = new DefaultTreeNode(hierarchyLevel, rootNode);
        List<UserHierarchyLevel> subTree = new ArrayList<UserHierarchyLevel>(hierarchyLevel.getChildLevels());
        newNode.setExpanded(true);
        if (selectedHierarchyLevel != null && selectedHierarchyLevel.getId().equals(hierarchyLevel.getId())) {
            newNode.setSelected(true);
        }
        if (CollectionUtils.isNotEmpty(subTree)) {
            Collections.sort(subTree);
            for (HierarchyLevel userGroupTree : subTree) {
                createTree(userGroupTree, newNode, selectedHierarchyLevel);
            }
        }
        return newNode;
    }

    public boolean isAutoUnzipped() {
        return autoUnzipped;
    }

    public void setAutoUnzipped(boolean autoUnzipped) {
        this.autoUnzipped = autoUnzipped;
    }

    public String getSecuredEntityType() {
        return this.securedEntityType;
    }

    public void setSecuredEntityType(String securedEntityType) {
        this.securedEntityType = securedEntityType;
    }

    public BusinessEntity getSelectedEntity() {
        return selectedEntity;
    }

    public void setSelectedEntity(BusinessEntity selectedEntity) {
        this.selectedEntity = selectedEntity;
    }

    public BaseBean<?> getSelectedAccountBean() {
        return selectedAccountBean;
    }

    public void setSelectedAccountBean(BaseBean<?> selectedAccountBean) {
        this.selectedAccountBean = selectedAccountBean;
    }

    public Map<String, String> getSecuredEntityTypes() {
        return this.securedEntityTypes;
    }

    public void setSecuredEntityTypes(Map<String, String> securedEntityTypes) {
        this.securedEntityTypes = securedEntityTypes;
    }

    public List<DetailedSecuredEntity> getSelectedSecuredEntities() {
        List<DetailedSecuredEntity> detailedSecuredEntities = new ArrayList<>();
        DetailedSecuredEntity detailedSecuredEntity = null;
        BusinessEntity businessEntity = null;
        if (entity != null && entity.getSecuredEntities() != null) {
            for (SecuredEntity securedEntity : entity.getSecuredEntities()) {
                detailedSecuredEntity = new DetailedSecuredEntity(securedEntity);
                businessEntity = securedBusinessEntityService.getEntityByCode(securedEntity.getEntityClass(), securedEntity.getCode());
                detailedSecuredEntity.setDescription(businessEntity.getDescription());
                detailedSecuredEntities.add(detailedSecuredEntity);
            }
        }
        return detailedSecuredEntities;
    }

    /**
     * This will allow the chosen secured entity to be removed from the user's securedEntities list.
     * 
     * @param selectedSecuredEntity The chosen securedEntity
     * @throws BusinessException
     */
    @ActionMethod
    public void deleteSecuredEntity(SecuredEntity selectedSecuredEntity) throws BusinessException, ELException {
        for (SecuredEntity securedEntity : entity.getSecuredEntities()) {
            if (securedEntity.equals(selectedSecuredEntity)) {
                entity.getSecuredEntities().remove(selectedSecuredEntity);
                break;
            }
        }
        super.saveOrUpdate(false);
    }

    /**
     * This will set the correct account bean based on the selected type(Seller, Customer, etc.)
     */
    public void updateSelectedAccountBean() {
        if (!StringUtils.isBlank(getSecuredEntityType())) {
            setSelectedAccountBean(accountBeanMap.get(getSecuredEntityType()));
        }
    }

    /**
     * This will add the selected business entity to the user's securedEntities list.
     * 
     * @param event
     * @throws BusinessException
     */
    @ActionMethod
    public void saveSecuredEntity(SelectEvent event) throws BusinessException, ELException {
        log.debug("saveSecuredEntity: {}", this.selectedEntity);
        if (this.selectedEntity != null) {
            List<SecuredEntity> securedEntities = getEntity().getSecuredEntities();
            for (SecuredEntity securedEntity : securedEntities) {
                if (securedEntity.equals(this.selectedEntity)) {
                    messages.info(new BundleKey("messages", "commons.uniqueField.code"));
                    return;
                }
            }
            getEntity().getSecuredEntities().add(new SecuredEntity(this.selectedEntity));
            super.saveOrUpdate(false);
        }
    }

    /**
     * This will set the correct account bean based on the selected type(Seller, Customer, etc.)
     */
    public void resetPassword() throws BusinessException {
        KeycloakAdminClientConfig keycloakAdminClientConfig = KeycloakUtils.loadConfig();
        Keycloak keycloak = getKeycloakClient(keycloakAdminClientService.getKeycloakSecurityContext(), keycloakAdminClientConfig);

        // Get realm
        RealmResource realmResource = keycloak.realm(keycloakAdminClientConfig.getRealm());
        UsersResource usersResource = realmResource.users();

        UserRepresentation userRepresentation = getUserRepresentationByUsername(usersResource, getEntity().getUserName());
        String userId = userRepresentation.getId();

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(true);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(ParamBean.getInstance().getProperty("meveo.default.password", "meveo!"));
        usersResource.get(userId).resetPassword(credential);
        String subject = "Reset Password";
        String body = "Your password is reset to meveo!";
        sendEmail(entity.getEmail(), subject, body);

    }

    public void sendEmail(String email, String subject, String body) {
        try {
            Session emailSession = maillerSessionFactory.getSession(host, port, transportLayerSecurity, userName, password);
            String sender = ParamBean.getInstance().getProperty("mail.sender", "pbach1982@gmail.com");
            Message emailMessage = new MimeMessage(emailSession);
            emailMessage.addRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            emailMessage.setFrom(new InternetAddress(sender));
            emailMessage.setSubject(subject);
            emailMessage.setText(body);

            Transport.send(emailMessage);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String getConfirmResetMessage() {
        return confirmResetMessage;
    }

    public void setConfirmResetMessage(String confirmResetMessage) {
        this.confirmResetMessage = confirmResetMessage;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    /**
     * This will initialize the dropdown values for selecting the entity types (Seller, Customer, etc) and the map of managed beans associated to each entity type.
     */
    private void initSelectionOptions() {
        log.debug("initSelectionOptions...");
        log.debug("this.securedEntityTypes: {}", this.securedEntityTypes);
        log.debug("this.accountBeanMap.", this.accountBeanMap);

        if (accountBeanMap == null || accountBeanMap.isEmpty()) {
            accountBeanMap = new HashMap<>();
            securedEntityTypes = new HashMap<>();
        }
        log.debug("this.securedEntityTypes: {}", this.securedEntityTypes);
        log.debug("this.accountBeanMap: {}", this.accountBeanMap);
        log.debug("initSelectionOptions done.");
    }

    /**
     * As the search function from keycloack doesn't perform exact search, we need to browse results to pick the exact username
     *
     * @param usersResource Users resource
     * @param username Username
     * @return User information
     * @throws BusinessException business exception.
     * @author akadid abdelmounaim
     * @lastModifiedVersion 5.0
     */
    private UserRepresentation getUserRepresentationByUsername(UsersResource usersResource, String username) throws BusinessException {
        UserRepresentation userRepresentation = null;
        List<UserRepresentation> userRepresentations = usersResource.search(username, null, null, null, null, null);
        for (UserRepresentation userRepresentationListItem : userRepresentations) {
            if (username.equalsIgnoreCase(userRepresentationListItem.getUsername())) {
                userRepresentation = userRepresentationListItem;
            }
        }

        if (userRepresentation == null) {
            throw new BusinessException("Unable to find user on keycloack.");
        }

        return userRepresentation;
    }


}