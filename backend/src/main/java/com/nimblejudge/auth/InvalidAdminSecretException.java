package com.nimblejudge.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidAdminSecretException extends RuntimeException {
  public InvalidAdminSecretException() {
    super("Invalid admin secret code");
  }
}
