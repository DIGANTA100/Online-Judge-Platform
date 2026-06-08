package com.nimblejudge.submission;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/submissions")
public class SubmissionController {
  @PostMapping
  @ResponseStatus(HttpStatus.ACCEPTED)
  public SubmissionResponse submit(@Valid @RequestBody SubmissionRequest request) {
    return new SubmissionResponse(
      "sub_demo_10492",
      Verdict.QUEUED,
      "redis:judge:submissions",
      request.problemSlug(),
      request.language()
    );
  }

  public record SubmissionRequest(
    @NotBlank String problemSlug,
    @NotBlank String language,
    @NotBlank String source
  ) {}

  public record SubmissionResponse(
    String submissionId,
    Verdict verdict,
    String queue,
    String problemSlug,
    String language
  ) {}
}
