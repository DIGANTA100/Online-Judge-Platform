package com.nimblejudge.judge;

public record JudgeJob(
  String submissionId,
  String problemSlug,
  String language,
  String sourceBlobKey,
  int timeLimitMs,
  int memoryLimitMb
) {}
