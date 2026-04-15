package bj.gazfacile.exception;

public class RateLimitOtpException extends RuntimeException {

    public RateLimitOtpException(String message) {
        super(message);
    }
}
