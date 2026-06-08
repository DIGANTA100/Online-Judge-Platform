package com.nimblejudge.problem;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/problems")
public class ProblemController {
  private static final List<ProblemDto> PROBLEMS = List.of(
    new ProblemDto("median-patrol", "Median Patrol", "MEDIUM", List.of("binary search", "prefix sums")),
    new ProblemDto("graph-relay", "Graph Relay", "HARD", List.of("max flow", "dp")),
    new ProblemDto("compiler-garden", "Compiler Garden", "EASY", List.of("strings", "maps"))
  );

  @GetMapping
  public List<ProblemDto> listProblems() {
    return PROBLEMS;
  }

  @GetMapping("/{slug}")
  public ProblemDto getProblem(@PathVariable String slug) {
    return PROBLEMS.stream()
      .filter(problem -> problem.slug().equals(slug))
      .findFirst()
      .orElseThrow(() -> new ProblemNotFoundException(slug));
  }

  public record ProblemDto(String slug, String title, String difficulty, List<String> tags) {}
}
