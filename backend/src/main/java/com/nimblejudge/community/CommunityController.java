package com.nimblejudge.community;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/community")
public class CommunityController {
  @GetMapping("/threads")
  public List<ThreadResponse> listThreads() {
    // DATABASE TODO:
    // Replace this demo list with:
    // return communityThreadRepository.findLatestThreads();
    return List.of(
      new ThreadResponse(
        "thread_median_patrol_hint",
        "Median Patrol: how do I prove the binary-search predicate?",
        "Problems",
        "bitwise_mira",
        18,
        842,
        true
      ),
      new ThreadResponse(
        "thread_round_128",
        "Nimble Round 128 post-contest discussion",
        "Contests",
        "rafi_dp",
        64,
        3920,
        false
      )
    );
  }

  @PostMapping("/threads")
  @ResponseStatus(HttpStatus.CREATED)
  public ThreadResponse createThread(@Valid @RequestBody CreateThreadRequest request) {
    // DATABASE TODO:
    // Save the thread using the authenticated user's id.
    // Example later:
    // CommunityThread thread = communityThreadRepository.save(
    //   new CommunityThread(request.title(), request.body(), request.topic(), currentUserId)
    // );
    return new ThreadResponse(
      "thread_demo_created",
      request.title(),
      request.topic(),
      "afd123",
      0,
      0,
      false
    );
  }

  @PostMapping("/comments")
  @ResponseStatus(HttpStatus.CREATED)
  public CommentResponse createComment(@Valid @RequestBody CreateCommentRequest request) {
    // DATABASE TODO:
    // Save the comment with thread id and authenticated author id.
    // Example later:
    // CommunityComment comment = communityCommentRepository.save(
    //   new CommunityComment(request.threadId(), request.body(), currentUserId)
    // );
    return new CommentResponse(
      "comment_demo_created",
      request.threadId(),
      request.body(),
      "afd123",
      Instant.now()
    );
  }

  public record CreateThreadRequest(
    @NotBlank String title,
    @NotBlank String body,
    @NotBlank String topic
  ) {}

  public record CreateCommentRequest(
    @NotBlank String threadId,
    @NotBlank String body
  ) {}

  public record ThreadResponse(
    String id,
    String title,
    String topic,
    String author,
    int replies,
    int views,
    boolean solved
  ) {}

  public record CommentResponse(
    String id,
    String threadId,
    String body,
    String author,
    Instant createdAt
  ) {}
}
