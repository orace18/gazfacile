package bj.gazfacile.service;

import bj.gazfacile.dto.SendOtpResponse;
import bj.gazfacile.exception.RateLimitOtpException;
import bj.gazfacile.model.CpassOtpRef;
import bj.gazfacile.repository.CpassOtpRefRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OtpFacadeTest {

    @Mock private CPassOtpService cPassOtpService;
    @Mock private CpassOtpRefRepository cpassOtpRefRepository;
    @Mock private PhoneNumberService phoneNumberService;

    @InjectMocks private OtpFacade otpFacade;

    // ── BUG #3 : rate limiting ───────────────────────────────────────────────

    @Test
    void initOtp_shouldThrowRateLimit_whenRecentOtpExistsForNumber() {
        when(phoneNumberService.normaliserTelephoneLocal("0197000000")).thenReturn("0197000000");
        // Simule un OTP non utilisé créé il y a < 60s
        when(cpassOtpRefRepository.existsByPhoneNumberAndUsedFalseAndCreatedAtAfter(
                eq("0197000000"), any(Instant.class)
        )).thenReturn(true);

        assertThrows(RateLimitOtpException.class,
                () -> otpFacade.initOtp("0197000000"));

        // CPass ne doit PAS être appelé
        verifyNoInteractions(cPassOtpService);
    }

    @Test
    void initOtp_shouldSendOtp_whenNoRecentOtpExists() {
        when(phoneNumberService.normaliserTelephoneLocal("0197000000")).thenReturn("0197000000");
        when(phoneNumberService.normaliserTelephoneInternational("0197000000")).thenReturn("+2290197000000");
        when(cpassOtpRefRepository.existsByPhoneNumberAndUsedFalseAndCreatedAtAfter(
                eq("0197000000"), any(Instant.class)
        )).thenReturn(false);

        SendOtpResponse fakeResponse = new SendOtpResponse("ref-123", Instant.now().plusSeconds(300));
        when(cPassOtpService.sendOtp("+2290197000000")).thenReturn(fakeResponse);
        when(cpassOtpRefRepository.save(any(CpassOtpRef.class))).thenAnswer(inv -> inv.getArgument(0));

        String referenceId = otpFacade.initOtp("0197000000");

        assertEquals("ref-123", referenceId);
        verify(cPassOtpService).sendOtp("+2290197000000");

        ArgumentCaptor<CpassOtpRef> captor = ArgumentCaptor.forClass(CpassOtpRef.class);
        verify(cpassOtpRefRepository).save(captor.capture());
        assertEquals("0197000000", captor.getValue().getPhoneNumber());
        assertEquals("ref-123", captor.getValue().getReferenceId());
        assertFalse(captor.getValue().isUsed());
    }

    @Test
    void initOtp_shouldUseCorrectThreshold_sixtySecondsAgo() {
        when(phoneNumberService.normaliserTelephoneLocal("0197000000")).thenReturn("0197000000");

        ArgumentCaptor<Instant> thresholdCaptor = ArgumentCaptor.forClass(Instant.class);
        when(cpassOtpRefRepository.existsByPhoneNumberAndUsedFalseAndCreatedAtAfter(
                eq("0197000000"), thresholdCaptor.capture()
        )).thenReturn(true);

        assertThrows(RateLimitOtpException.class, () -> otpFacade.initOtp("0197000000"));

        Instant threshold = thresholdCaptor.getValue();
        Instant expectedMin = Instant.now().minusSeconds(OtpFacade.RATE_LIMIT_SECONDS + 1);
        Instant expectedMax = Instant.now().minusSeconds(OtpFacade.RATE_LIMIT_SECONDS - 1);
        assertTrue(threshold.isAfter(expectedMin) && threshold.isBefore(expectedMax),
                "Le threshold doit être ~60s dans le passé");
    }
}
