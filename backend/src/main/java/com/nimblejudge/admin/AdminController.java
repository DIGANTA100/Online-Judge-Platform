package com.nimblejudge.admin;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
  @GetMapping("/users")
  public List<AdminUserResponse> listUsers() {
    // DATABASE TODO:
    // Replace with paginated user query from PostgreSQL.
    return List.of(
      new AdminUserResponse("usr_001", "afd123", "afd123@gmail.com", "USER", "ACTIVE"),
      new AdminUserResponse("usr_003", "spam_probe", "probe@example.com", "USER", "FLAGGED")
    );
  }

  @GetMapping("/dashboard")
  public AdminDashboardResponse dashboard() {
    // AUTH TODO:
    // Require ADMIN session/JWT before returning platform-wide operational data.
    // DATABASE TODO:
    // Replace these demo values with aggregate queries from users, submissions,
    // reports, discussions, problems, and judge_jobs tables.
    return new AdminDashboardResponse("18420", "1284", "7", "18", "1.8s");
  }

  @GetMapping("/announcements")
  public List<AdminAnnouncementResponse> listAnnouncements() {
    // DATABASE TODO:
    // Read announcement drafts/published messages from PostgreSQL.
    return List.of(
      new AdminAnnouncementResponse("ann_demo_001", "Problemset maintenance", "ALL_USERS", "DRAFT"),
      new AdminAnnouncementResponse("ann_demo_002", "New editorial release", "PRACTICE_USERS", "QUEUED")
    );
  }

  @PostMapping("/announcements")
  @ResponseStatus(HttpStatus.CREATED)
  public AdminMutationResponse createAnnouncement(@Valid @RequestBody CreateAnnouncementRequest request) {
    // DATABASE TODO:
    // Insert announcement with created_by admin id and write audit_logs row.
    return new AdminMutationResponse(true, "ann_demo_created");
  }

  @PatchMapping("/users")
  public AdminMutationResponse updateUser(@Valid @RequestBody UpdateUserRequest request) {
    // DATABASE TODO:
    // Update user role/status in PostgreSQL and write audit_logs row.
    return new AdminMutationResponse(true, request.userId());
  }

  @PostMapping("/problems")
  @ResponseStatus(HttpStatus.CREATED)
  public AdminMutationResponse createProblem(@Valid @RequestBody CreateProblemRequest request) {
    // DATABASE TODO:
    // Insert problem statement, tags, limits, examples, and author id into PostgreSQL.
    // Store hidden tests in object storage and save blob references.
    return new AdminMutationResponse(true, "problem_demo_created");
  }

  public record AdminUserResponse(
    String id,
    String handle,
    String email,
    String role,
    String status
  ) {}

  public record AdminDashboardResponse(
    String activeUsers,
    String queuedSubmissions,
    String openReports,
    String draftProblems,
    String averageQueueTime
  ) {}

  public record AdminAnnouncementResponse(
    String id,
    String title,
    String audience,
    String status
  ) {}

  public record CreateAnnouncementRequest(
    @NotBlank String title,
    @NotBlank String body,
    String audience
  ) {}

  public record UpdateUserRequest(
    @NotBlank String userId,
    String role,
    String status
  ) {}

  public record CreateProblemRequest(
    @NotBlank String title,
    @NotBlank String difficulty,
    @NotBlank String statement
  ) {}

  public record AdminMutationResponse(boolean success, String id) {}
}
