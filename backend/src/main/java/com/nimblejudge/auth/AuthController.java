package com.nimblejudge.auth;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public AuthResponse signup(@Valid @RequestBody SignupRequest request) {
    return new AuthResponse("demo.jwt.access.token", "demo-refresh-token", 900, request.handle());
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest request) {
    if (!request.email().equals("afd123@gmail.com") || !request.password().equals("12345678")) {
      throw new InvalidCredentialsException();
    }

    return new AuthResponse("demo.jwt.access.token", "demo-refresh-token", 900, request.email());
  }

  @PostMapping("/forgot-password")
  public PasswordResetResponse forgotPassword(@Valid @RequestBody PasswordResetRequest request) {
    return new PasswordResetResponse(
      true,
      "If an account exists for this email, a secure password reset link will be sent."
    );
  }

  public record SignupRequest(
    @NotBlank String handle,
    @Email @NotBlank String email,
    @NotBlank String password
  ) {}

  public record LoginRequest(
    @Email @NotBlank String email,
    @NotBlank String password
  ) {}

  public record PasswordResetRequest(
    @Email @NotBlank String email
  ) {}

  public record AuthResponse(
    String accessToken,
    String refreshToken,
    int expiresInSeconds,
    String subject
  ) {}

  public record PasswordResetResponse(
    boolean accepted,
    String message
  ) {}
}
