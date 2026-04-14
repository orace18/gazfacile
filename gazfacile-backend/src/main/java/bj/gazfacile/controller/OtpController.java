package bj.gazfacile.controller;

import bj.gazfacile.dto.OtpSendRequest;
import bj.gazfacile.dto.OtpVerifyRequest;
import bj.gazfacile.service.OtpFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping({"/api/otp", "/api/v1/otp"})
@RequiredArgsConstructor
public class OtpController {

    private final OtpFacade otpFacade;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendOtp(@Valid @RequestBody OtpSendRequest request) {
        String referenceId = otpFacade.initOtp(request.phoneNumber());
        return ResponseEntity.ok(Map.of("referenceId", referenceId));
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Boolean>> verifyOtp(@Valid @RequestBody OtpVerifyRequest request) {
        boolean verified = otpFacade.confirmOtp(request.phoneNumber(), request.otpCode());
        return ResponseEntity.ok(Map.of("verified", verified));
    }
}
