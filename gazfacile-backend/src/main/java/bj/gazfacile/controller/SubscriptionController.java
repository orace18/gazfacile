package bj.gazfacile.controller;

import bj.gazfacile.dto.PaiementResponseDTO;
import bj.gazfacile.dto.SubscribeRequestDTO;
import bj.gazfacile.dto.SubscriptionDTO;
import bj.gazfacile.service.PaiementService;
import bj.gazfacile.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final PaiementService paiementService;

    @GetMapping("/current")
    public ResponseEntity<SubscriptionDTO> getCurrent(Authentication auth) {
        String telephone = auth.getName();
        return subscriptionService.getCurrentSubscription(telephone)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @PostMapping("/subscribe")
    public ResponseEntity<PaiementResponseDTO> subscribe(
            Authentication auth,
            @Valid @RequestBody SubscribeRequestDTO dto) {
        String telephone = auth.getName();
        var paiementInit = subscriptionService.subscribe(telephone, dto.planCode());
        var response = paiementService.initierPaiement(paiementInit);
        return ResponseEntity.ok(response);
    }
}
