package bj.gazfacile.service;

import bj.gazfacile.dto.AuthResponseDTO;
import bj.gazfacile.dto.PinLoginDTO;
import bj.gazfacile.model.User;
import bj.gazfacile.model.enums.Role;
import bj.gazfacile.repository.UserRepository;
import bj.gazfacile.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private WebAuthnService webAuthnService;

    @Mock
    private LoginAttemptService loginAttemptService;

    @Mock
    private GoogleTokenService googleTokenService;

    @Mock
    private PhoneNumberService phoneNumberService;

    @Mock
    private RefreshTokenService refreshTokenService;

    @Mock
    private TotpService totpService;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(authService, "refreshExpirationMs", 86_400_000L);
    }

    @Test
    void connexionParPin_shouldAcceptLegacyAdminCode() {
        String telephone = "0147946910";
        String codeAdminLegacy = "@Juscard38183";
        PinLoginDTO dto = new PinLoginDTO(telephone, codeAdminLegacy);

        User admin = User.builder()
                .id("admin-1")
                .telephone(telephone)
                .nom("Admin GazFacile")
                .roles(Set.of(Role.ADMIN))
                .pinHash("hash-admin")
                .actif(true)
                .build();

        when(phoneNumberService.normaliserTelephoneLocal(telephone)).thenReturn(telephone);
        when(loginAttemptService.estBloque(telephone)).thenReturn(false);
        when(userRepository.findByTelephone(telephone)).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches(codeAdminLegacy, "hash-admin")).thenReturn(true);
        when(jwtService.generateToken(admin)).thenReturn("access-token");
        when(refreshTokenService.creerToken("admin-1")).thenReturn("refresh-token");

        MockHttpServletResponse response = new MockHttpServletResponse();
        AuthResponseDTO resultat = authService.connexionParPin(dto, response);

        assertEquals("access-token", resultat.token());
        assertEquals(telephone, resultat.telephone());
        assertEquals(Set.of(Role.ADMIN), resultat.roles());
        assertNotNull(response.getHeader("Set-Cookie"));
        verify(loginAttemptService).reinitialiser(telephone);
    }

    @Test
    void connexionParPin_shouldRejectNonNumericPinForNonAdmin() {
        String telephone = "0199001122";
        PinLoginDTO dto = new PinLoginDTO(telephone, "@Juscard38183");

        User client = User.builder()
                .id("client-1")
                .telephone(telephone)
                .nom("Client Test")
                .roles(Set.of(Role.CLIENT))
                .pinHash("hash-client")
                .actif(true)
                .build();

        when(phoneNumberService.normaliserTelephoneLocal(telephone)).thenReturn(telephone);
        when(loginAttemptService.estBloque(telephone)).thenReturn(false);
        when(userRepository.findByTelephone(telephone)).thenReturn(Optional.of(client));

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> authService.connexionParPin(dto, new MockHttpServletResponse())
        );

        assertEquals(400, exception.getStatusCode().value());
        assertEquals("Le PIN doit comporter exactement 6 chiffres", exception.getReason());
        verify(passwordEncoder, never()).matches(dto.pin(), "hash-client");
    }
}
