package com.nimblejudge.judge;

import java.util.List;

public record JudgeWorkerPlan(
  String image,
  List<String> compileCommand,
  List<String> runCommand,
  boolean networkDisabled,
  int cpuLimitMs,
  int memoryLimitMb,
  int pidsLimit
) {
  public static JudgeWorkerPlan cpp20(int timeLimitMs, int memoryLimitMb) {
    return new JudgeWorkerPlan(
      "nimblejudge/cpp20-runner:latest",
      List.of("g++", "-std=c++20", "-O2", "main.cpp", "-o", "main"),
      List.of("./main"),
      true,
      timeLimitMs,
      memoryLimitMb,
      64
    );
  }
}
