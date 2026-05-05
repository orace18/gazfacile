package bj.gazfacile.service;

import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FedaPayServiceTest {

    private static final String SECRET = "wh_sandbox_test_secret";

    @Test
    void verifierSignatureWebhook_shouldAcceptFedapayTimestampedHeader() throws Exception {
        FedaPayService service = service();
        String payload = "{\"name\":\"transaction.approved\",\"entity\":{\"id\":123,\"status\":\"approved\"}}";
        long timestamp = System.currentTimeMillis() / 1000;
        String signature = signature(timestamp, payload, SECRET);

        assertTrue(service.verifierSignatureWebhook(payload, "t=" + timestamp + ",s=" + signature));
    }

    @Test
    void verifierSignatureWebhook_shouldRejectSignatureWithoutTimestamp() {
        FedaPayService service = service();

        assertFalse(service.verifierSignatureWebhook("{}", "abc123"));
    }

    @Test
    void verifierSignatureWebhook_shouldRejectExpiredHeader() throws Exception {
        FedaPayService service = service();
        String payload = "{}";
        long timestamp = (System.currentTimeMillis() / 1000) - 301;
        String signature = signature(timestamp, payload, SECRET);

        assertFalse(service.verifierSignatureWebhook(payload, "t=" + timestamp + ",s=" + signature));
    }

    private FedaPayService service() {
        FedaPayService service = new FedaPayService();
        ReflectionTestUtils.setField(service, "webhookSecret", SECRET);
        return service;
    }

    private String signature(long timestamp, String payload, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] hash = mac.doFinal((timestamp + "." + payload).getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(hash);
    }
}
