package bj.gazfacile.controller;

import bj.gazfacile.dto.SubscriptionPlanDTO;
import bj.gazfacile.model.enums.PlanType;
import bj.gazfacile.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plans")
@RequiredArgsConstructor
public class SubscriptionPlanController {

    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<List<SubscriptionPlanDTO>> getPlans(
            @RequestParam(required = false) PlanType type) {
        return ResponseEntity.ok(subscriptionService.getPlans(type));
    }

    @GetMapping("/{code}")
    public ResponseEntity<SubscriptionPlanDTO> getPlan(@PathVariable String code) {
        return ResponseEntity.ok(subscriptionService.getPlanByCode(code));
    }
}
