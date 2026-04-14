package bj.gazfacile.service;

import bj.gazfacile.dto.SendOtpResponse;
import bj.gazfacile.dto.VerifyOtpResponse;
import bj.gazfacile.exception.OtpExpiredException;
import bj.gazfacile.exception.OtpInvalidException;
import bj.gazfacile.model.CpassOtpRef;
import bj.gazfacile.repository.CpassOtpRefRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpFacade {

    private final CPassOtpService cPassOtpService;
    private final CpassOtpRefRepository cpassOtpRefRepository;
    private final PhoneNumberService phoneNumberService;

    public String initOtp(String phoneNumber) {
        String phoneNumberLocal = phoneNumberService.normaliserTelephoneLocal(phoneNumber);
        String phoneNumberInternational = phoneNumberService.normaliserTelephoneInternational(phoneNumberLocal);

        SendOtpResponse response = cPassOtpService.sendOtp(phoneNumberInternational);
        cpassOtpRefRepository.deleteAllByPhoneNumberAndUsedFalse(phoneNumberLocal);

        CpassOtpRef otpRef = CpassOtpRef.builder()
                .phoneNumber(phoneNumberLocal)
                .referenceId(response.referenceId())
                .expiresAt(response.expiresAt())
                .used(false)
                .createdAt(Instant.now())
                .build();

        cpassOtpRefRepository.save(otpRef);
        log.info("[OTP] Référence CPass créée pour {}", phoneNumberLocal);
        return response.referenceId();
    }

    public boolean confirmOtp(String phoneNumber, String otpCode) {
        String phoneNumberLocal = phoneNumberService.normaliserTelephoneLocal(phoneNumber);

        CpassOtpRef otpRef = cpassOtpRefRepository
                .findTopByPhoneNumberAndUsedFalseOrderByCreatedAtDesc(phoneNumberLocal)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Aucune demande OTP en attente pour ce numéro"
                ));

        if (otpRef.getExpiresAt() != null && Instant.now().isAfter(otpRef.getExpiresAt())) {
            otpRef.setUsed(true);
            cpassOtpRefRepository.save(otpRef);
            throw new OtpExpiredException("Le code OTP a expiré");
        }

        VerifyOtpResponse response;
        try {
            response = cPassOtpService.verifyOtp(otpRef.getReferenceId(), otpCode);
        } catch (OtpExpiredException | OtpInvalidException e) {
            otpRef.setUsed(true);
            cpassOtpRefRepository.save(otpRef);
            throw e;
        }

        if (response.verified()) {
            otpRef.setUsed(true);
            cpassOtpRefRepository.save(otpRef);
            return true;
        }

        return false;
    }
}
